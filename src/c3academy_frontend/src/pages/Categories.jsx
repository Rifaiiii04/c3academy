// src/pages/Categories.jsx
import React from 'react';
import { categories } from '../data/dummyCategories';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center mb-6">Browse Categories</h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Explore our course categories to find the perfect learning path for your blockchain journey.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-br from-indigo-800 to-purple-700 flex items-center justify-center p-8">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{category.name}</h2>
                <div className="text-gray-400 mb-4">{category.courses} courses</div>
                
                <p className="text-gray-300 mb-6">
                  {getCategoryDescription(category.name)}
                </p>
                
                <a 
                  href={`/categories/${category.id}`}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-300 inline-block"
                >
                  Explore Courses
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Category Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16 my-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Most Popular Category</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              ICP Ecosystem courses are our most popular. Learn how to build on the Internet Computer Protocol.
            </p>
          </div>
          
          <div className="flex justify-center">
            <a 
              href="/categories/7"
              className="bg-white text-indigo-900 py-3 px-8 rounded-lg transition-all duration-300 font-medium hover:bg-gray-100"
            >
              Explore ICP Courses
            </a>
          </div>
        </div>
      </div>
      
      {/* Why Learn By Category Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Learn By Category?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Structuring your learning path by category helps you build comprehensive skills in blockchain development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="bg-indigo-900 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Focused Learning</h3>
            <p className="text-gray-300 text-center">
              Concentrate on specific blockchain topics to build expertise in areas that matter most to your goals.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="bg-purple-900 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Structured Path</h3>
            <p className="text-gray-300 text-center">
              Follow a logical progression from foundational concepts to advanced techniques within each category.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="bg-indigo-900 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Career Advancement</h3>
            <p className="text-gray-300 text-center">
              Develop specialized skills that align with specific blockchain career paths and industry demands.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Helper function to generate category descriptions
const getCategoryDescription = (categoryName) => {
  switch (categoryName) {
    case 'Blockchain Basics':
      return 'Learn the fundamental concepts of blockchain technology, including consensus mechanisms, cryptography, and distributed ledger technologies.';
    case 'Smart Contracts':
      return 'Master the art of writing, testing, and deploying secure smart contracts on various blockchain platforms.';
    case 'DeFi':
      return 'Explore decentralized finance protocols and learn how to build applications for lending, borrowing, and trading.';
    case 'NFTs':
      return 'Discover how to create, mint, and trade non-fungible tokens, and build marketplaces for digital assets.';
    case 'Web3':
      return 'Build the next generation of decentralized applications with modern web technologies and blockchain integration.';
    case 'Cryptocurrency':
      return 'Understand the technical aspects of cryptocurrencies, token economics, and blockchain-based payment systems.';
    case 'ICP Ecosystem':
      return 'Learn to develop on the Internet Computer Protocol with canister development, Motoko programming, and dApp creation.';
    case 'dApp Development':
      return 'Create fully decentralized applications with front-end interfaces, smart contracts, and blockchain integration.';
    default:
      return 'Explore courses in this category to enhance your blockchain development skills.';
  }
};

export default Categories;