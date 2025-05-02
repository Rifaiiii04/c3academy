// src/utils/formatters.js
/**
 * Utility functions for formatting data in the C3Academy application
 */

/**
 * Format a cryptocurrency amount with an optional symbol
 * @param {number} amount - Amount to format
 * @param {string} [symbol='ICP'] - Currency symbol
 * @param {boolean} [showSymbol=true] - Whether to show the currency symbol
 * @returns {string} Formatted amount
 * 
 * @example
 * formatCrypto(25.5); // "25.50 ICP"
 * formatCrypto(25.5, 'ETH', false); // "25.50"
 */
export const formatCrypto = (amount, symbol = 'ICP', showSymbol = true) => {
    if (amount === undefined || amount === null) return '0.00';
    
    // Format with 2 decimal places
    const formattedAmount = Number(amount).toFixed(2);
    
    // Return with or without symbol
    return showSymbol ? `${formattedAmount} ${symbol}` : formattedAmount;
  };
  
  /**
   * Format a date into a readable string
   * @param {Date|string} date - Date to format
   * @param {string} [format='medium'] - Format type ('short', 'medium', 'long', 'relative')
   * @returns {string} Formatted date
   * 
   * @example
   * formatDate('2023-05-15'); // "May 15, 2023"
   * formatDate('2023-05-15', 'short'); // "5/15/2023"
   * formatDate('2023-05-15', 'long'); // "Monday, May 15, 2023"
   * formatDate('2023-05-15', 'relative'); // "2 months ago"
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
   * Format a duration in minutes to a readable string (e.g., "2h 30m")
   * @param {number} minutes - Duration in minutes
   * @param {boolean} [verbose=false] - Whether to use verbose format
   * @returns {string} Formatted duration
   * 
   * @example
   * formatDuration(150); // "2h 30m"
   * formatDuration(150, true); // "2 hours 30 minutes"
   */
  export const formatDuration = (minutes, verbose = false) => {
    if (!minutes && minutes !== 0) return '';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (verbose) {
      const hourText = hours === 1 ? 'hour' : 'hours';
      const minuteText = remainingMinutes === 1 ? 'minute' : 'minutes';
      
      if (hours === 0) {
        return `${remainingMinutes} ${minuteText}`;
      } else if (remainingMinutes === 0) {
        return `${hours} ${hourText}`;
      } else {
        return `${hours} ${hourText} ${remainingMinutes} ${minuteText}`;
      }
    } else {
      if (hours === 0) {
        return `${remainingMinutes}m`;
      } else if (remainingMinutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h ${remainingMinutes}m`;
      }
    }
  };
  
  /**
   * Format a number with commas for thousands
   * @param {number} number - Number to format
   * @param {number} [decimals=0] - Number of decimal places
   * @returns {string} Formatted number
   * 
   * @example
   * formatNumber(1234); // "1,234"
   * formatNumber(1234.5678, 2); // "1,234.57"
   */
  export const formatNumber = (number, decimals = 0) => {
    if (number === undefined || number === null) return '0';
    
    return Number(number).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  /**
   * Format a percentage
   * @param {number} value - Value to format as percentage
   * @param {number} [decimals=1] - Number of decimal places
   * @returns {string} Formatted percentage
   * 
   * @example
   * formatPercent(0.1234); // "12.3%"
   * formatPercent(0.1234, 2); // "12.34%"
   */
  export const formatPercent = (value, decimals = 1) => {
    if (value === undefined || value === null) return '0%';
    
    return `${(value * 100).toFixed(decimals)}%`;
  };
  
  /**
   * Format a file size in bytes to a readable string
   * @param {number} bytes - File size in bytes
   * @param {number} [decimals=2] - Number of decimal places
   * @returns {string} Formatted file size
   * 
   * @example
   * formatFileSize(1500); // "1.46 KB"
   * formatFileSize(1500000); // "1.43 MB"
   */
  export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  };
  
  /**
   * Truncate text to a specified length with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} [maxLength=50] - Maximum length
   * @returns {string} Truncated text
   * 
   * @example
   * truncateText("This is a long text that needs to be truncated", 20); // "This is a long text..."
   */
  export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    
    if (text.length <= maxLength) return text;
    
    return text.slice(0, maxLength) + '...';
  };
  
  /**
   * Format a wallet address by showing only the beginning and end
   * @param {string} address - Wallet address
   * @param {number} [startChars=6] - Number of characters to show at the start
   * @param {number} [endChars=4] - Number of characters to show at the end
   * @returns {string} Formatted wallet address
   * 
   * @example
   * formatWalletAddress("0x1234567890abcdef1234567890abcdef12345678"); // "0x1234...5678"
   */
  export const formatWalletAddress = (address, startChars = 6, endChars = 4) => {
    if (!address) return '';
    
    if (address.length <= startChars + endChars) return address;
    
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  };
  
  export default {
    formatCrypto,
    formatDate,
    formatDuration,
    formatNumber,
    formatPercent,
    formatFileSize,
    truncateText,
    formatWalletAddress
  };