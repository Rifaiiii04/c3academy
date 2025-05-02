// src/pages/MyCourses.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { WalletContext } from '../context/WalletContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const MyCourses = () => {
  const navigate = useNavigate();
  const { isConnected, wallet } = useContext(WalletContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not connected
    if (!isConnected) {
      navigate('/connect-wallet', { 
        state: { returnPath: '/my-courses' }
      });
      return;
    }

    // Load enrolled courses
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call to get enrolled courses
        // For demo, we'll check localStorage for any "purchased" courses
        const purchasedCoursesStr = localStorage.getItem('purchased_courses');
        let purchasedCourses = [];
        
        if (purchasedCoursesStr) {
          purchasedCourses = JSON.parse(purchasedCoursesStr);
        }
        
        // If no purchased courses, simulate some dummy data
        if (!purchasedCourses || purchasedCourses.length === 0) {
          // Check if we have any dummy courses in the session
          const dummyCoursesStr = localStorage.getItem('cart');
          if (dummyCoursesStr) {
            const dummyCourses = JSON.parse(dummyCoursesStr);
            if (dummyCourses && dummyCourses.length > 0) {
              // Use the cart items as enrolled courses for demo
              purchasedCourses = dummyCourses;
            }
          }
        }
        
        // Add progress data to each course
        const coursesWithProgress = purchasedCourses.map(course => {
          // Check if we have saved progress for this course
          const progressKey = `course_progress_${course.id}`;
          const savedProgress = localStorage.getItem(progressKey);
          
          let progress = 0;
          if (savedProgress) {
            progress = parseInt(savedProgress, 10);
          } else {
            // If no saved progress, set default based on course id for demo purposes
            // This ensures consistent progress display for each course
            progress = course.id % 5 === 0 ? 100 : // Completed courses
                      course.id % 3 === 0 ? 75 :  // Mostly done
                      course.id % 2 === 0 ? 45 :  // In progress
                      15;                         // Just started
            
            // Save progress to localStorage for consistency
            localStorage.setItem(progressKey, progress.toString());
          }
          
          return {
            ...course,
            progress
          };
        });
        
        setEnrolledCourses(coursesWithProgress || []);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        setError('Failed to load your courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [isConnected, navigate, wallet]);

  const continueLearning = (courseId) => {
    navigate(`/learn/${courseId}`);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <Button
            variant="primary"
            onClick={() => navigate('/courses')}
          >
            Browse More Courses
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="large" variant="primary" type="spinner" />
          </div>
        ) : error ? (
          <Card>
            <Card.Body className="text-center py-8">
              <div className="text-red-400 mb-4">{error}</div>
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </Card.Body>
          </Card>
        ) : enrolledCourses.length === 0 ? (
          <Card>
            <Card.Body className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">You haven't enrolled in any courses yet</h2>
              <p className="text-gray-300 mb-6">
                Browse our courses and start your blockchain journey today.
              </p>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
              <Card key={course.id} className="h-full flex flex-col">
                <div className="relative">
                  <div className="bg-gradient-to-br from-indigo-800 to-purple-700 h-40 flex items-center justify-center">
                    <div className="text-2xl font-bold text-white opacity-70">
                      {course.title.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                </div>
                
                <Card.Body className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                  
                  <div className="text-sm text-gray-400 mb-3">
                    By <span className="text-indigo-400">{course.instructor}</span>
                  </div>
                  
                  {/* Progress bar - now showing consistent progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </Card.Body>
                
                <Card.Footer className="mt-auto">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => continueLearning(course.id)}
                  >
                    {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyCourses;