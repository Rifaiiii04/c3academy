// src/hooks/useCourses.js
import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';

/**
 * Custom hook to access the CourseContext
 * 
 * Provides all course-related data and functions from the CourseContext
 * including course listings, filtering, cart operations, and enrollment.
 * 
 * @returns {Object} All values and functions from the CourseContext
 * 
 * @example
 * // In a component:
 * const { 
 *   featuredCourses, 
 *   addToCart, 
 *   enrollCourse 
 * } = useCourses();
 */
const useCourses = () => {
  const context = useContext(CourseContext);
  
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  
  return context;
};

export default useCourses;

/**
 * Individual hooks for specific course functionality
 * These hooks can be used when you only need a specific part of the course context
 */

/**
 * Hook to access course listings
 * @returns {Object} Course listings and loading state
 */
export const useCourseListings = () => {
  const { 
    courses, 
    featuredCourses, 
    popularCourses,
    loading,
    error,
    filterCourses,
    courseFilters
  } = useContext(CourseContext);
  
  if (!courseFilters) {
    throw new Error('useCourseListings must be used within a CourseProvider');
  }
  
  return { 
    courses, 
    featuredCourses, 
    popularCourses,
    loading,
    error,
    filterCourses,
    courseFilters
  };
};

/**
 * Hook to access cart functionality
 * @returns {Object} Cart state and operations
 */
export const useCart = () => {
  const { 
    cart, 
    cartTotal, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    isInCart 
  } = useContext(CourseContext);
  
  if (cart === undefined) {
    throw new Error('useCart must be used within a CourseProvider');
  }
  
  return { 
    cart, 
    cartTotal, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    isInCart 
  };
};

/**
 * Hook to access enrollment functionality
 * @returns {Object} Enrollment state and operations
 */
export const useEnrollment = () => {
  const { 
    userCourses, 
    enrollCourse, 
    checkEnrollment 
  } = useContext(CourseContext);
  
  if (userCourses === undefined) {
    throw new Error('useEnrollment must be used within a CourseProvider');
  }
  
  return { 
    userCourses, 
    enrollCourse, 
    checkEnrollment 
  };
};

/**
 * Hook to access course details functionality
 * @returns {Object} Course details functions
 */
export const useCourseDetails = () => {
  const { 
    getCourse, 
    getRelated 
  } = useContext(CourseContext);
  
  if (!getCourse) {
    throw new Error('useCourseDetails must be used within a CourseProvider');
  }
  
  return { 
    getCourse, 
    getRelated 
  };
};