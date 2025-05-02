// src/components/common/Loader.jsx
import React from 'react';

/**
 * Loader component for displaying loading states
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Size of the loader (small, medium, large)
 * @param {string} [props.variant='primary'] - Color variant (primary, secondary, white)
 * @param {string} [props.type='spinner'] - Loader type (spinner, dots, pulse)
 * @param {string} [props.label] - Optional text label
 * @param {string} [props.className] - Additional CSS classes
 */
const Loader = ({ 
  size = 'medium', 
  variant = 'primary', 
  type = 'spinner',
  label,
  className = '',
  ...rest
}) => {
  // Size mappings
  const sizeClasses = {
    small: type === 'spinner' ? 'h-4 w-4' : 'h-2 w-2',
    medium: type === 'spinner' ? 'h-8 w-8' : 'h-3 w-3',
    large: type === 'spinner' ? 'h-12 w-12' : 'h-4 w-4',
  };
  
  // Variant (color) mappings
  const variantClasses = {
    primary: 'text-indigo-500',
    secondary: 'text-purple-500',
    white: 'text-white',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500',
  };

  // Spinner Loader
  if (type === 'spinner') {
    return (
      <div className={`flex items-center justify-center ${className}`} {...rest}>
        <div className={`animate-spin ${sizeClasses[size]} ${variantClasses[variant]}`}>
          <svg 
            className="w-full h-full" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        {label && <span className={`ml-3 ${variantClasses[variant]}`}>{label}</span>}
      </div>
    );
  }
  
  // Dots Loader
  if (type === 'dots') {
    return (
      <div className={`flex items-center justify-center ${className}`} {...rest}>
        <div className="flex space-x-2">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full animate-pulse`}
              style={{ animationDelay: `${dot * 0.15}s` }}
            ></div>
          ))}
        </div>
        {label && <span className={`ml-3 ${variantClasses[variant]}`}>{label}</span>}
      </div>
    );
  }
  
  // Pulse Loader
  if (type === 'pulse') {
    return (
      <div className={`flex items-center justify-center ${className}`} {...rest}>
        <div 
          className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full animate-ping`}
          style={{ animationDuration: '1.5s' }}
        ></div>
        {label && <span className={`ml-3 ${variantClasses[variant]}`}>{label}</span>}
      </div>
    );
  }
  
  // Progress Bar Loader
  if (type === 'bar') {
    return (
      <div className={`w-full ${className}`} {...rest}>
        {label && <div className={`mb-2 text-sm ${variantClasses[variant]}`}>{label}</div>}
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse-slow"
            style={{ width: '100%', animationDuration: '2s' }}
          ></div>
        </div>
      </div>
    );
  }
  
  // Default fallback (should never happen due to defaultProps)
  return (
    <div className={`animate-spin ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...rest}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {label && <span className={`ml-3 ${variantClasses[variant]}`}>{label}</span>}
    </div>
  );
};

export default Loader;