// src/utils/formatters.js
/**
 * Utility functions for formatting data in the C3Academy application
 */

/**
 * Format a wallet address by showing only the beginning and end
 * @param {string} address - Wallet address
 * @param {number} [startChars=6] - Number of characters to show at the start
 * @param {number} [endChars=4] - Number of characters to show at the end
 * @returns {string} Formatted wallet address
 * 
 * @example
 * formatWalletAddress("0x1234567890abcdef1234567890abcdef12345678"); // "0x1234...5678"
 * formatWalletAddress("2vxsx-fae-unga-wjqif-mj2hc-gpube-h6lpj-6qzla-zdjed-hatpm-kqe"); // "2vxsx-...m-kqe"
 */
export const formatWalletAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  
  if (address.length <= startChars + endChars) return address;
  
  // Handle ICP Principal IDs which might contain dashes
  if (address.includes('-')) {
    // For ICP principal IDs, we'll handle them specially
    const parts = address.split('-');
    
    if (parts.length <= 2) {
      // Simple case with just one dash
      return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
    } else {
      // For Principal IDs with multiple sections
      return `${parts[0]}...${parts[parts.length - 1]}`;
    }
  }
  
  // Standard format for other addresses
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Format a date into a readable string
 * @param {Date|string} date - Date to format
 * @param {string} [format='medium'] - Format type ('short', 'medium', 'long', 'relative')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if valid date
  if (isNaN(dateObj.getTime())) return '';
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString();
      
    case 'medium':
      return dateObj.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
    case 'long':
      return dateObj.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
    case 'relative':
      return formatRelativeTime(dateObj);
      
    default:
      return dateObj.toLocaleDateString();
  }
};

/**
 * Format a date relative to the current time (e.g., "5 days ago")
 * @param {Date} date - Date to format
 * @returns {string} Relative time string
 * 
 * @private
 */
const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

/**
 * Truncate text to a specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} [maxLength=50] - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength) + '...';
};

export default {
  formatDate,
  truncateText,
  formatWalletAddress
};