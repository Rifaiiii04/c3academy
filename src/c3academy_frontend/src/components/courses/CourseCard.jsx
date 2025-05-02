// src/components/courses/CourseCard.jsx
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-indigo-500 transform hover:-translate-y-1">
      <div className="relative">
        <div className="bg-gradient-to-br from-indigo-800 to-purple-700 h-40 flex items-center justify-center">
          <div className="text-2xl font-bold text-white opacity-70">
            {course.title.split(' ').map(word => word[0]).join('')}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 rounded-md py-1 px-2 text-xs text-white">
              {course.level}
            </div>
            <div className="bg-purple-600 rounded-md py-1 px-2 text-xs text-white">
              {course.duration}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="text-sm text-gray-400">By <span className="text-indigo-400">{course.instructor}</span></div>
        </div>
        
        <div className="flex items-center mb-4 text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-yellow-400 ml-1">{course.rating}</span>
            <span className="text-gray-400 ml-2">({course.students} students)</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-white font-bold">
            {course.price} <span className="text-xs text-indigo-400">{course.currency}</span>
          </div>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm py-2 px-4 rounded-lg transition-all duration-300">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
