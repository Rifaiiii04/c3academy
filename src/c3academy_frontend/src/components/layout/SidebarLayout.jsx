// src/components/layout/SidebarLayout.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

/**
 * SidebarLayout component - Provides a layout with sidebar and main content area
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content
 * @param {React.ReactNode} props.sidebar - Sidebar content
 * @param {string} [props.sidebarPosition='left'] - Position of sidebar (left, right)
 * @param {boolean} [props.collapsible=false] - Whether sidebar can be collapsed on mobile
 * @param {boolean} [props.showFooter=true] - Whether to show the footer
 * @param {string} [props.className] - Additional CSS classes for the main content area
 * @param {string} [props.sidebarClassName] - Additional CSS classes for the sidebar
 */
const SidebarLayout = ({
  children,
  sidebar,
  sidebarPosition = 'left',
  collapsible = false,
  showFooter = true,
  className = '',
  sidebarClassName = '',
  ...rest
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with Sidebar */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Mobile Toggle Button */}
        {collapsible && (
          <button
            className="md:hidden flex items-center justify-center p-4 text-gray-400 hover:text-white"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            <span className="ml-2">Menu</span>
          </button>
        )}
        
        {/* Sidebar - Left Position */}
        {sidebarPosition === 'left' && (
          <aside 
            className={`
              ${collapsible ? (isSidebarOpen ? 'block' : 'hidden md:block') : 'block'}
              w-full md:w-1/4 lg:w-1/5 bg-gray-800 border-r border-gray-700
              ${sidebarClassName}
            `}
          >
            {sidebar}
          </aside>
        )}
        
        {/* Main Content */}
        <main 
          className={`flex-grow ${className}`}
          {...rest}
        >
          {children}
        </main>
        
        {/* Sidebar - Right Position */}
        {sidebarPosition === 'right' && (
          <aside 
            className={`
              ${collapsible ? (isSidebarOpen ? 'block' : 'hidden md:block') : 'block'}
              w-full md:w-1/4 lg:w-1/5 bg-gray-800 border-l border-gray-700
              ${sidebarClassName}
            `}
          >
            {sidebar}
          </aside>
        )}
      </div>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

/**
 * SidebarLayout.Section component - A section within the sidebar
 */
SidebarLayout.Section = ({ 
  title, 
  children, 
  className = '',
  ...rest 
}) => {
  return (
    <div className={`border-b border-gray-700 ${className}`} {...rest}>
      {title && (
        <h3 className="text-lg font-medium text-white p-4">{title}</h3>
      )}
      <div className="px-4 pb-4">
        {children}
      </div>
    </div>
  );
};

/**
 * SidebarLayout.Item component - An item within a sidebar section
 */
SidebarLayout.Item = ({ 
  icon, 
  label, 
  active = false, 
  onClick,
  className = '',
  ...rest 
}) => {
  return (
    <div 
      className={`
        flex items-center py-2 px-3 rounded-lg cursor-pointer
        ${active 
          ? 'bg-indigo-900 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }
        ${className}
      `}
      onClick={onClick}
      {...rest}
    >
      {icon && (
        <span className="mr-3">{icon}</span>
      )}
      <span>{label}</span>
      {active && (
        <span className="ml-auto">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </div>
  );
};

export default SidebarLayout;