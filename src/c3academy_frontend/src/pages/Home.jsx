// src/pages/Home.jsx
import React, { useContext } from 'react';
import { courses } from '../data/dummyCourses';
import { categories } from '../data/dummyCategories';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CourseGrid from '../components/courses/CourseGrid';
import { WalletContext } from '../context/WalletContext';

const Home = () => {
  const { isConnected } = useContext(WalletContext);

  // Featured courses (first 4)
  const featuredCourses = courses.slice(0, 4);
  
  // Popular courses (last 4, different from featured)
  const popularCourses = courses.slice(2, 6);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 pt-16 pb-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Learn Blockchain Development
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Master blockchain technologies and smart contract development with courses payable in ICP cryptocurrency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-8 rounded-lg transition-all duration-300 font-medium">
                Explore Courses
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-lg transition-all duration-300 font-medium">
                How It Works
              </button>
            </div>
          </div>
        </div>
        
        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#111827" fillOpacity="1" d="M0,128L60,149.3C120,171,240,213,360,224C480,235,600,213,720,181.3C840,149,960,107,1080,90.7C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-indigo-900 bg-opacity-50 rounded-full">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Expert-Led Courses</div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-900 bg-opacity-50 rounded-full">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-indigo-900 bg-opacity-50 rounded-full">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Secure ICP Payments</div>
            </div>
          </div>
        </div>
        
        {/* Featured Courses */}
        <CourseGrid 
          courses={featuredCourses}
          title="Featured Courses"
          showViewAll={true}
        />
        
        {/* Category Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Browse Categories</h2>
            <a href="/categories" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map(category => (
              <a 
                key={category.id}
                href={`/categories/${category.id}`}
                className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{category.name}</h3>
                    <div className="text-gray-400 text-sm">{category.courses} courses</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Popular Courses */}
        <CourseGrid 
          courses={popularCourses}
          title="Most Popular"
          showViewAll={true}
        />
        
        {/* How it Works Section */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 my-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">How C3Academy Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Learn blockchain development with cryptocurrency payments. Simple, secure, and decentralized.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-800 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Browse Courses</h3>
              <p className="text-gray-300">
                Explore our extensive library of blockchain and Web3 development courses.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-800 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
              <p className="text-gray-300">
                Connect your ICP wallet securely with just a few clicks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-800 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Learning</h3>
              <p className="text-gray-300">
                Get instant access to your courses and learn at your own pace.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center my-16">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Blockchain Journey?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-8 rounded-lg transition-all duration-300 font-medium">
              Explore Courses
            </button>
            {!isConnected && (
              <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-lg transition-all duration-300 font-medium">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;