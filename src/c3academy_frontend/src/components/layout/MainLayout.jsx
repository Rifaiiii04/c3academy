// src/components/layout/MainLayout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

/**
 * MainLayout component - Provides the main application layout with navbar and footer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {boolean} [props.showFooter=true] - Whether to show the footer
 * @param {string} [props.className] - Additional CSS classes for the main content area
 */
const MainLayout = ({ 
  children, 
  showFooter = true, 
  className = '',
  ...rest 
}) => {
  const location = useLocation();
  
  // Check if current page is home to handle specific styling
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main 
        className={`flex-grow ${className}`} 
        {...rest}
      >
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;