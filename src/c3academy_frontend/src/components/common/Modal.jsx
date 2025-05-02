// src/components/common/Modal.jsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * Modal component for displaying content in a dialog
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.size='medium'] - Modal size (small, medium, large, fullscreen)
 * @param {boolean} [props.closeOnOutsideClick=true] - Whether clicking outside closes the modal
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button
 * @param {string} [props.className] - Additional CSS classes
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'medium',
  closeOnOutsideClick = true,
  showCloseButton = true,
  className = '',
  ...rest
}) => {
  const modalRef = useRef(null);
  
  // Size classes for the modal container
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
    fullscreen: 'max-w-full m-4'
  };
  
  // Handle Escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Handle clicks outside of modal
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Don't render anything if modal is closed
  if (!isOpen) return null;
  
  // Portal modal to the end of the document body
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300"
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <div 
        ref={modalRef}
        className={`bg-gray-900 rounded-xl border border-gray-700 shadow-xl w-full ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        {showCloseButton && (
          <button
            aria-label="Close"
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={onClose}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

/**
 * Modal Header component
 */
Modal.Header = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-6 border-b border-gray-700 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Modal Body component
 */
Modal.Body = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-6 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Modal Footer component
 */
Modal.Footer = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-6 border-t border-gray-700 bg-gray-900 rounded-b-xl flex justify-end space-x-4 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Modal;