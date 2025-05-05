// src/services/courseService.js
/**
 * Course Service - Handles course data and enrollment functionality
 * This is a mock implementation for demonstration purposes
 */

import { courses } from '../data/dummyCourses';
import { sendTransaction } from './walletService';

// Course provider address (where payments are sent)
const COURSE_PROVIDER_ADDRESS = '0x3a8d29c5DC4cBcA38C9a36726AC56065A4F7A0Fb';

/**
 * Get all available courses
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} List of courses
 */
const getAllCourses = async (filters = {}) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredCourses = [...courses];
  
  // Apply category filter
  if (filters.category && filters.category !== 'all') {
    filteredCourses = filteredCourses.filter(course => 
      course.tags.includes(filters.category.toLowerCase())
    );
  }
  
  // Apply level filter
  if (filters.level && filters.level !== 'all') {
    filteredCourses = filteredCourses.filter(course => 
      course.level.toLowerCase() === filters.level.toLowerCase()
    );
  }
  
  // Apply search query filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query) ||
      course.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredCourses.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo, we'll just reverse the array to simulate newest first
        filteredCourses.reverse();
        break;
      case 'popularity':
      default:
        filteredCourses.sort((a, b) => b.students - a.students);
        break;
    }
  }
  
  return filteredCourses;
};

/**
 * Get course by ID
 * @param {number} courseId - Course ID
 * @returns {Promise<Object|null>} Course data or null if not found
 */
const getCourseById = async (courseId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const course = courses.find(c => c.id === parseInt(courseId));
  return course || null;
};

/**
 * Enroll in a course
 * @param {number} courseId - Course ID
 * @param {string} walletAddress - User's wallet address
 * @returns {Promise<Object>} Enrollment result
 */
const enrollInCourse = async (courseId, walletAddress) => {
  const course = await getCourseById(courseId);
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  // Process payment via wallet service
  try {
    // Get current wallet data from localStorage
    const walletData = JSON.parse(localStorage.getItem('walletData') || '{}');
    const currentBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
    
    // Check if user has enough balance
    if (currentBalance < course.price) {
      throw new Error('Insufficient balance to enroll in this course');
    }
    
    const transactionResult = await sendTransaction(
      walletAddress, 
      COURSE_PROVIDER_ADDRESS, 
      course.price
    );
    
    // Update wallet balance in localStorage
    const newBalance = currentBalance - course.price;
    localStorage.setItem('walletBalance', newBalance.toString());
    
    // Update wallet data
    const updatedWalletData = {
      ...walletData,
      balance: newBalance
    };
    localStorage.setItem('walletData', JSON.stringify(updatedWalletData));
    
    // Record enrollment
    const enrollmentResult = {
      courseId,
      course: course.title,
      walletAddress,
      enrollmentDate: new Date().toISOString(),
      transactionId: transactionResult.transactionId,
      amount: course.price,
      currency: 'ICP'
    };
    
    // Store enrollment in localStorage
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push(enrollmentResult);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    return enrollmentResult;
  } catch (error) {
    throw new Error(`Enrollment failed: ${error.message}`);
  }
};

/**
 * Check if user is enrolled in a course
 * @param {number} courseId - Course ID
 * @param {string} walletAddress - User's wallet address
 * @returns {Promise<boolean>} Whether user is enrolled
 */
const isEnrolledInCourse = async (courseId, walletAddress) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Check localStorage for demo purposes
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
  return enrollments.some(
    e => e.courseId === parseInt(courseId) && e.walletAddress === walletAddress
  );
};

/**
 * Get user's enrolled courses
 * @param {string} walletAddress - User's wallet address
 * @returns {Promise<Array>} List of enrolled courses
 */
const getEnrolledCourses = async (walletAddress) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Check localStorage for demo purposes
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
  const userEnrollments = enrollments.filter(e => e.walletAddress === walletAddress);
  
  // Get full course details for each enrollment
  const enrolledCourses = await Promise.all(
    userEnrollments.map(async enrollment => {
      const course = await getCourseById(enrollment.courseId);
      return {
        ...course,
        enrollmentDate: enrollment.enrollmentDate,
        transactionId: enrollment.transactionId
      };
    })
  );
  
  return enrolledCourses;
};

/**
 * Get related courses 
 * @param {number} courseId - Course ID to find related courses for
 * @param {number} limit - Maximum number of courses to return
 * @returns {Promise<Array>} List of related courses
 */
const getRelatedCourses = async (courseId, limit = 3) => {
  const course = await getCourseById(courseId);
  
  if (!course) {
    return [];
  }
  
  // Find courses with similar tags
  const relatedCourses = courses
    .filter(c => 
      c.id !== parseInt(courseId) && 
      c.tags.some(tag => course.tags.includes(tag))
    )
    .slice(0, limit);
  
  return relatedCourses;
};

export {
  getAllCourses,
  getCourseById,
  enrollInCourse,
  isEnrolledInCourse,
  getEnrolledCourses,
  getRelatedCourses
};