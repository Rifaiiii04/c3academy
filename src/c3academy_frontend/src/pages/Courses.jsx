// src/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import { courses } from '../data/dummyCourses';
import { categories } from '../data/dummyCategories';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CourseCard from '../components/courses/CourseCard';

const Courses = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(true);

  // Levels for filtering
  const levels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  useEffect(() => {
    // Simulate API call to fetch courses
    const fetchCourses = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Apply filters
        let filtered = [...courses];
        
        // Filter by category
        if (selectedCategory !== 'all') {
          filtered = filtered.filter(course => 
            course.tags.includes(selectedCategory.toLowerCase())
          );
        }
        
        // Filter by level
        if (selectedLevel !== 'all') {
          filtered = filtered.filter(course => 
            course.level.toLowerCase() === selectedLevel.toLowerCase()
          );
        }
        
        // Filter by search query
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(course => 
            course.title.toLowerCase().includes(query) || 
            course.description.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query) ||
            course.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        // Sort courses
        switch (sortBy) {
          case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            // In a real app, this would sort by date
            // For demo, we'll reverse the array to simulate newest first
            filtered.reverse();
            break;
          case 'popularity':
          default:
            filtered.sort((a, b) => b.students - a.students);
            break;
        }
        
        setFilteredCourses(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [selectedCategory, selectedLevel, searchQuery, sortBy]);

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setLoading(true);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setLoading(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setLoading(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center mb-6">Browse All Courses</h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
            Explore our full catalog of blockchain development courses and start learning today.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                className="bg-gray-800 text-white w-full rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700 transition-all"
                placeholder="Search courses by name, instructor, or keywords..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6">Filters</h2>
              
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center cursor-pointer py-2 px-3 rounded-lg ${selectedCategory === 'all' ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => handleCategoryChange('all')}
                  >
                    <span className="flex-1">All Categories</span>
                    {selectedCategory === 'all' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {categories.map(category => (
                    <div 
                      key={category.id}
                      className={`flex items-center cursor-pointer py-2 px-3 rounded-lg ${selectedCategory === category.name.toLowerCase() ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      onClick={() => handleCategoryChange(category.name.toLowerCase())}
                    >
                      <span className="flex-1">{category.name}</span>
                      <span className="text-sm text-gray-400">{category.courses}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Level Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Level</h3>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center cursor-pointer py-2 px-3 rounded-lg ${selectedLevel === 'all' ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => handleLevelChange('all')}
                  >
                    <span className="flex-1">All Levels</span>
                    {selectedLevel === 'all' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {levels.map(level => (
                    <div 
                      key={level.id}
                      className={`flex items-center cursor-pointer py-2 px-3 rounded-lg ${selectedLevel === level.id ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      onClick={() => handleLevelChange(level.id)}
                    >
                      <span className="flex-1">{level.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter - In a real app, this would be a slider */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Price Range</h3>
                <div className="px-3">
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span>0 ICP</span>
                    <span>50 ICP</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
              
              {/* Reset Filters */}
              <button 
                className="w-full py-2 px-4 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-all"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                  setSortBy('popularity');
                  setLoading(true);
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Course Listings */}
          <div className="md:col-span-3">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-300">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </div>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="text-gray-400 mr-2">Sort by:</label>
                <select 
                  id="sort"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Course Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters.</p>
                <button 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                    setSearchQuery('');
                    setSortBy('popularity');
                    setLoading(true);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
            
            {/* Pagination - In a real app, this would be functional */}
            {!loading && filteredCourses.length > 0 && (
              <div className="flex justify-center mt-12">
                <nav className="inline-flex rounded-md shadow">
                  <a href="#" className="px-4 py-2 bg-gray-800 text-gray-400 rounded-l-md border-r border-gray-700 hover:bg-gray-700">
                    Previous
                  </a>
                  <a href="#" className="px-4 py-2 bg-indigo-900 text-white border-r border-gray-700">
                    1
                  </a>
                  <a href="#" className="px-4 py-2 bg-gray-800 text-gray-400 border-r border-gray-700 hover:bg-gray-700">
                    2
                  </a>
                  <a href="#" className="px-4 py-2 bg-gray-800 text-gray-400 border-r border-gray-700 hover:bg-gray-700">
                    3
                  </a>
                  <a href="#" className="px-4 py-2 bg-gray-800 text-gray-400 rounded-r-md hover:bg-gray-700">
                    Next
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Courses;