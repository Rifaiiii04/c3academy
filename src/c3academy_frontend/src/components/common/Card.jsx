// src/components/common/Card.jsx
import React from 'react';

/**
 * Reusable Card component with various style options
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.hover=true] - Whether to apply hover effects
 * @param {boolean} [props.bordered=true] - Whether to show border
 * @param {string} [props.variant='default'] - Card style variant (default, primary, secondary)
 * @param {boolean} [props.interactive=false] - Whether card is clickable/interactive
 * @param {Function} [props.onClick] - Click handler function
 */
const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  bordered = true, 
  variant = 'default',
  interactive = false,
  onClick,
  ...rest
}) => {
  // Base styles for all cards
  const baseStyles = "bg-gray-800 rounded-xl overflow-hidden";
  
  // Border styles
  const borderStyles = bordered ? "border border-gray-700" : "";
  
  // Hover styles
  const hoverStyles = hover ? "transform transition-all duration-300 hover:shadow-lg" : "";
  
  // Interactive styles (clickable cards)
  const interactiveStyles = interactive 
    ? "cursor-pointer hover:-translate-y-1 hover:border-indigo-500" 
    : "";
  
  // Variant-specific styles
  const variantStyles = {
    default: "",
    primary: "bg-gradient-to-br from-indigo-800 to-purple-800",
    secondary: "bg-gray-700"
  };
  
  return (
    <div 
      className={`${baseStyles} ${borderStyles} ${hoverStyles} ${interactiveStyles} ${variantStyles[variant]} ${className}`}
      onClick={interactive && onClick ? onClick : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * Card.Header component for the card's header section
 */
Card.Header = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-6 border-b border-gray-700 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card.Body component for the card's main content
 */
Card.Body = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-6 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card.Footer component for the card's footer section
 */
Card.Footer = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-6 border-t border-gray-700 bg-gray-900 bg-opacity-50 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;