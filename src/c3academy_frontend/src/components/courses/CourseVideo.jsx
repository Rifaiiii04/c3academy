
// src/components/courses/CourseVideo.jsx
import React, { useState } from 'react';

const CourseVideo = ({ lesson, course }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="relative">
        <div className="bg-black aspect-video flex items-center justify-center">
          {/* Video placeholder */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 w-full h-full flex items-center justify-center">
            {!isPlaying && (
              <button
                className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 rounded-full p-4"
                onClick={togglePlayback}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            {isPlaying && (
              <div className="text-white text-lg font-bold">
                [Video Playing]
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-70 p-3">
          <div className="flex items-center justify-between text-white mb-1">
            <button onClick={togglePlayback}>
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <div className="text-sm">0:00 / {lesson?.duration || '00:00'}</div>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2">{lesson?.title || 'Introduction to the Course'}</h2>
        <div className="text-sm text-gray-400 mb-4">
          Part of <span className="text-indigo-400">{course?.title || 'Course Name'}</span>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-300 hover:text-white">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Restart
          </button>
          <button className="flex items-center text-gray-300 hover:text-white">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
            Speed
          </button>
          <button className="flex items-center text-gray-300 hover:text-white">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Notes
          </button>
          <button className="flex items-center text-gray-300 hover:text-white">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
