
// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className = '',
  icon = null
}) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-300 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    outline: "bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };
  
  const sizeStyles = {
    small: "text-xs py-2 px-3",
    medium: "text-sm py-2 px-4",
    large: "text-base py-3 px-6"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const widthStyles = fullWidth ? "w-full" : "";
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;