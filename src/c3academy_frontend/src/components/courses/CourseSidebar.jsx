
// src/components/courses/CourseSidebar.jsx
import React from 'react';

const CourseSidebar = ({ course, currentLessonIndex = 0 }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Course Content</h2>
        <div className="text-sm text-gray-400 mt-1">
          {course?.chapters?.length || 0} chapters • {course?.duration || '0 hours'} total
        </div>
      </div>

      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {course?.chapters?.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className={`border-b border-gray-700 ${chapterIndex === currentLessonIndex ? 'bg-gray-700' : ''}`}>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">
                  {chapterIndex + 1}. {chapter.title}
                </h3>
                <div className="text-sm text-gray-400">{chapter.duration}</div>
              </div>
              <div className="flex items-center mt-2">
                {chapter.preview ? (
                  <div className="text-xs bg-indigo-900 text-indigo-400 py-1 px-2 rounded mr-2">
                    Preview
                  </div>
                ) : null}
                {chapterIndex < currentLessonIndex ? (
                  <div className="flex items-center text-green-500 text-xs">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </div>
                ) : chapterIndex === currentLessonIndex ? (
                  <div className="flex items-center text-indigo-400 text-xs">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    In Progress
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex justify-between">
          <button 
            className="text-gray-300 hover:text-white flex items-center"
            disabled={currentLessonIndex === 0}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button 
            className="text-gray-300 hover:text-white flex items-center"
            disabled={currentLessonIndex === (course?.chapters?.length || 0) - 1}
          >
            Next
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;