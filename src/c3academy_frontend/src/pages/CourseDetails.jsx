// src/pages/CourseDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../data/dummyCourses';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CourseDetails from '../components/courses/CourseDetails';
import { WalletContext } from '../context/WalletContext';
import WalletModal from '../components/wallet/WalletModal';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { isConnected } = useContext(WalletContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch course details
    const fetchCourse = async () => {
      try {
        // In a real app, this would be an API call
        const foundCourse = courses.find(c => c.id === parseInt(courseId));
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setCourse(foundCourse || null);
        
        // Find related courses with similar tags
        if (foundCourse) {
          const related = courses
            .filter(c => 
              c.id !== foundCourse.id && 
              c.tags.some(tag => foundCourse.tags.includes(tag))
            )
            .slice(0, 3);
          
          setRelatedCourses(related);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId]);

  const handleEnrollClick = () => {
    if (!isConnected) {
      setIsWalletModalOpen(true);
    } else {
      // In a real app, this would handle the enrollment process
      console.log('Enrolling in course:', courseId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Course Not Found</h2>
            <p className="text-gray-400 mb-8">The course you're looking for doesn't exist or has been removed.</p>
            <a href="/courses" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium">
              Browse All Courses
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseDetails course={course} />
          </div>
          
          <div className="lg:col-span-1">
            {/* Course Purchase Card */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mb-8 sticky top-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-white">{course.price} {course.currency}</div>
                </div>
                
                <button 
                  onClick={handleEnrollClick}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium mb-4"
                >
                  {isConnected ? 'Enroll Now' : 'Connect Wallet to Enroll'}
                </button>
                
                <div className="text-sm text-gray-400 text-center mb-6">
                  30-day money-back guarantee
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-gray-300">
                      <span className="font-medium">{course.duration}</span> of on-demand video
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-gray-300">
                      <span className="font-medium">{course.chapters?.length || 0}</span> coding exercises
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-gray-300">
                      Full lifetime access
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-gray-300">
                      Access on mobile and desktop
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-gray-300">
                      Certificate of completion
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-6 border-t border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Share this course</h3>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19