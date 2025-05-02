// src/pages/CoursePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../data/dummyCourses';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CourseVideo from '../components/courses/CourseVideo';
import CourseSidebar from '../components/courses/CourseSidebar';
import { WalletContext } from '../context/WalletContext';

const CoursePage = () => {
  const { courseId, lessonId = 0 } = useParams();
  const { isConnected } = useContext(WalletContext);
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requiresEnrollment, setRequiresEnrollment] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch course and lesson
    const fetchCourseAndLesson = async () => {
      try {
        // In a real app, this would be an API call
        const foundCourse = courses.find(c => c.id === parseInt(courseId));
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (foundCourse) {
          setCourse(foundCourse);
          
          // Get current lesson
          const lessonIndex = parseInt(lessonId);
          if (foundCourse.chapters && foundCourse.chapters.length > 0) {
            if (lessonIndex >= 0 && lessonIndex < foundCourse.chapters.length) {
              setCurrentLesson({
                ...foundCourse.chapters[lessonIndex],
                index: lessonIndex
              });
              
              // Check if lesson requires enrollment
              // First lesson (usually intro) might be free
              if (lessonIndex > 0 && !foundCourse.chapters[lessonIndex].preview) {
                // In a real app, this would check if the user is enrolled
                setRequiresEnrollment(!isConnected);
              }
            } else {
              setCurrentLesson({
                ...foundCourse.chapters[0],
                index: 0
              });
            }
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course and lesson:', error);
        setLoading(false);
      }
    };
    
    fetchCourseAndLesson();
  }, [courseId, lessonId, isConnected]);

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
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{course.title}</h1>
          <div className="text-gray-400">
            <span>Instructor: {course.instructor}</span>
          </div>
        </div>
        
        {requiresEnrollment ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Enroll to Continue Learning</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              This lesson requires enrollment. Connect your wallet to purchase this course and get full access to all lessons.
            </p>
            <div className="flex justify-center">
              <a 
                href={`/courses/${courseId}`}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-8 rounded-lg transition-all duration-300 font-medium"
              >
                Enroll Now
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CourseVideo 
                lesson={currentLesson} 
                course={course}
              />
              
              <div className="mt-6 bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">About this lesson</h2>
                <p className="text-gray-300 mb-4">
                  {currentLesson?.description || 
                    `In this lesson, you'll learn about the key concepts of ${course.title} and how to implement them in your own projects. The instructor explains the fundamental principles and provides practical examples to help you understand the material.`
                  }
                </p>
                
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-lg font-medium text-white mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Lesson Slides (PDF)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Code Examples (GitHub)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Exercise Files
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-lg font-medium text-white mb-3">Discussion</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <textarea 
                      className="w-full bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ask a question or share your thoughts..." 
                      rows="3"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CourseSidebar 
                course={course}
                currentLessonIndex={currentLesson?.index || 0}
              />
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CoursePage;