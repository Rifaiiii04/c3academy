// src/context/CourseContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { WalletContext } from './WalletContext';
import { 
  getAllCourses, 
  getCourseById,
  enrollInCourse,
  isEnrolledInCourse,
  getEnrolledCourses,
  getRelatedCourses 
} from '../services/courseService';

// Create the Course Context
export const CourseContext = createContext();

/**
 * CourseProvider component - Provides course-related state and functions to the application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const CourseProvider = ({ children }) => {
  const { isConnected, wallet } = useContext(WalletContext);
  
  // State for courses
  const [courses, setCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [courseFilters, setCourseFilters] = useState({
    category: 'all',
    level: 'all',
    searchQuery: '',
    sortBy: 'popularity'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  
  // Load courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all courses
        const allCourses = await getAllCourses();
        setCourses(allCourses);
        
        // Set featured courses (first 4)
        setFeaturedCourses(allCourses.slice(0, 4));
        
        // Set popular courses (sorted by students)
        const popular = [...allCourses].sort((a, b) => b.students - a.students).slice(0, 4);
        setPopularCourses(popular);
        
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (e) {
            console.error('Failed to parse cart from localStorage:', e);
            setCart([]);
          }
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  // Fetch user's enrolled courses when wallet connects
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (isConnected && wallet) {
        try {
          setLoading(true);
          const enrolledCourses = await getEnrolledCourses(wallet.address);
          setUserCourses(enrolledCourses);
        } catch (err) {
          console.error('Error fetching user courses:', err);
        } finally {
          setLoading(false);
        }
      } else {
        // Reset user courses when wallet disconnects
        setUserCourses([]);
      }
    };
    
    fetchUserCourses();
  }, [isConnected, wallet]);
  
  // Filter courses based on current filters
  const filterCourses = async (filters = {}) => {
    try {
      setLoading(true);
      
      // Merge current filters with new filters
      const updatedFilters = { ...courseFilters, ...filters };
      setCourseFilters(updatedFilters);
      
      // Apply filters
      const filteredCourses = await getAllCourses(updatedFilters);
      setCourses(filteredCourses);
    } catch (err) {
      console.error('Error filtering courses:', err);
      setError('Failed to filter courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Get a single course by ID
  const getCourse = async (courseId) => {
    try {
      setLoading(true);
      return await getCourseById(courseId);
    } catch (err) {
      console.error(`Error fetching course ${courseId}:`, err);
      throw new Error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };
  
  // Enroll in a course
  const enrollCourse = async (courseId) => {
    if (!isConnected || !wallet) {
      throw new Error('Wallet not connected');
    }
    
    try {
      setLoading(true);
      
      // Check if already enrolled
      const enrolled = await isEnrolledInCourse(courseId, wallet.address);
      if (enrolled) {
        return { success: true, alreadyEnrolled: true };
      }
      
      // Process enrollment
      const result = await enrollInCourse(courseId, wallet.address);
      
      // Update user courses
      const updatedUserCourses = await getEnrolledCourses(wallet.address);
      setUserCourses(updatedUserCourses);
      
      return { success: true, result };
    } catch (err) {
      console.error(`Error enrolling in course ${courseId}:`, err);
      throw new Error(err.message || 'Failed to enroll in course');
    } finally {
      setLoading(false);
    }
  };
  
  // Check if user is enrolled in a course
  const checkEnrollment = async (courseId) => {
    if (!isConnected || !wallet) {
      return false;
    }
    
    try {
      return await isEnrolledInCourse(courseId, wallet.address);
    } catch (err) {
      console.error(`Error checking enrollment for course ${courseId}:`, err);
      return false;
    }
  };
  
  // Add a course to cart
  const addToCart = (course) => {
    // Check if already in cart
    if (cart.some(item => item.id === course.id)) {
      return; // Already in cart
    }
    
    const updatedCart = [...cart, course];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Remove a course from cart
  const removeFromCart = (courseId) => {
    const updatedCart = cart.filter(item => item.id !== courseId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Clear the cart
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };
  
  // Check if a course is in the cart
  const isInCart = (courseId) => {
    return cart.some(item => item.id === courseId);
  };
  
  // Get related courses
  const getRelated = async (courseId, limit = 3) => {
    try {
      return await getRelatedCourses(courseId, limit);
    } catch (err) {
      console.error(`Error fetching related courses for ${courseId}:`, err);
      return [];
    }
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  
  // Context value
  const value = {
    courses,
    featuredCourses,
    popularCourses,
    userCourses,
    loading,
    error,
    courseFilters,
    cart,
    cartTotal,
    filterCourses,
    getCourse,
    enrollCourse,
    checkEnrollment,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getRelated
  };
  
  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

/**
 * Custom hook for using the Course context
 * @returns {Object} Course context value
 */
export const useCourses = () => {
  const context = useContext(CourseContext);
  
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  
  return context;
};