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
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mb-8 sticky top-8 z-10">
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
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Related Courses</h3>
                  <div className="space-y-4">
                    {relatedCourses.map(relatedCourse => (
                      <a 
                        key={relatedCourse.id} 
                        href={`/courses/${relatedCourse.id}`}
                        className="flex items-start p-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                      >
                        <div className="bg-gradient-to-br from-indigo-800 to-purple-700 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                          <div className="text-lg font-bold text-white opacity-70">
                            {relatedCourse.title.split(' ').map(word => word[0]).join('')}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">{relatedCourse.title}</h4>
                          <div className="flex items-center text-sm">
                            <div className="text-yellow-400 flex items-center mr-2">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {relatedCourse.rating}
                            </div>
                            <div className="text-gray-400">{relatedCourse.duration}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};

export default CourseDetailsPage;