// src/utils/validators.js
/**
 * Utility functions for validating data in the C3Academy application
 */

/**
 * Check if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param {*} value - Value to check
 * @returns {boolean} True if the value is empty, false otherwise
 * 
 * @example
 * isEmpty(''); // true
 * isEmpty(null); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty('text'); // false
 */
export const isEmpty = (value) => {
    if (value === null || value === undefined) {
      return true;
    }
    
    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }
    
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
    
    if (typeof value === 'object' && Object.keys(value).length === 0 && !(value instanceof Date)) {
      return true;
    }
    
    return false;
  };
  
  /**
   * Validate an email address
   * @param {string} email - Email address to validate
   * @returns {boolean} True if the email is valid, false otherwise
   * 
   * @example
   * isValidEmail('test@example.com'); // true
   * isValidEmail('invalid-email'); // false
   */
  export const isValidEmail = (email) => {
    if (isEmpty(email)) return false;
    
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate a wallet address (basic validation for common formats)
   * @param {string} address - Wallet address to validate
   * @param {string} [type='any'] - Type of wallet ('eth', 'icp', 'any')
   * @returns {boolean} True if the wallet address is valid, false otherwise
   * 
   * @example
   * isValidWalletAddress('0x1234567890abcdef1234567890abcdef12345678', 'eth'); // true
   * isValidWalletAddress('invalid-address'); // false
   */
  export const isValidWalletAddress = (address, type = 'any') => {
    if (isEmpty(address)) return false;
    
    // Ethereum address format (0x followed by 40 hex characters)
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    
    // ICP principal ID format (simplified check for demo)
    const icpRegex = /^[a-zA-Z0-9-]{25,63}$/;
    
    switch (type) {
      case 'eth':
        return ethRegex.test(address);
      case 'icp':
        return icpRegex.test(address);
      case 'any':
      default:
        return ethRegex.test(address) || icpRegex.test(address);
    }
  };
  
  /**
   * Validate a password strength
   * @param {string} password - Password to validate
   * @param {Object} [options] - Validation options
   * @param {number} [options.minLength=8] - Minimum password length
   * @param {boolean} [options.requireUppercase=true] - Require at least one uppercase letter
   * @param {boolean} [options.requireLowercase=true] - Require at least one lowercase letter
   * @param {boolean} [options.requireNumbers=true] - Require at least one number
   * @param {boolean} [options.requireSymbols=true] - Require at least one symbol
   * @returns {Object} Validation result with isValid flag and error messages
   * 
   * @example
   * validatePassword('Abcd1234!'); // { isValid: true, errors: [] }
   * validatePassword('weak'); // { isValid: false, errors: ['Password must be at least 8 characters long', ...] }
   */
  export const validatePassword = (password, options = {}) => {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSymbols = true
    } = options;
    
    const errors = [];
    
    if (isEmpty(password)) {
      errors.push('Password is required');
      return { isValid: false, errors };
    }
    
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (requireNumbers && !/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (requireSymbols && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one symbol');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  /**
   * Check if a string is a valid URL
   * @param {string} url - URL to validate
   * @returns {boolean} True if the URL is valid, false otherwise
   * 
   * @example
   * isValidUrl('https://example.com'); // true
   * isValidUrl('invalid-url'); // false
   */
  export const isValidUrl = (url) => {
    if (isEmpty(url)) return false;
    
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };
  
  /**
   * Validate that a value is a number within a specified range
   * @param {number} value - Value to validate
   * @param {number} [min=-Infinity] - Minimum allowed value
   * @param {number} [max=Infinity] - Maximum allowed value
   * @returns {boolean} True if the value is a number within the range, false otherwise
   * 
   * @example
   * isValidNumber(5, 0, 10); // true
   * isValidNumber(-5, 0, 10); // false
   * isValidNumber('not a number'); // false
   */
  export const isValidNumber = (value, min = -Infinity, max = Infinity) => {
    if (value === undefined || value === null) return false;
    
    const num = Number(value);
    
    if (isNaN(num)) return false;
    
    return num >= min && num <= max;
  };
  
  /**
   * Validate a transaction hash (for blockchain transactions)
   * @param {string} hash - Transaction hash to validate
   * @param {string} [blockchain='any'] - Type of blockchain ('eth', 'icp', 'any')
   * @returns {boolean} True if the transaction hash is valid, false otherwise
   * 
   * @example
   * isValidTransactionHash('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'); // true
   * isValidTransactionHash('invalid-hash'); // false
   */
  export const isValidTransactionHash = (hash, blockchain = 'any') => {
    if (isEmpty(hash)) return false;
    
    // Ethereum transaction hash format (0x followed by 64 hex characters)
    const ethRegex = /^0x[a-fA-F0-9]{64}$/;
    
    // ICP transaction hash format (simplified check for demo)
    const icpRegex = /^[a-fA-F0-9]{64}$/;
    
    switch (blockchain) {
      case 'eth':
        return ethRegex.test(hash);
      case 'icp':
        return icpRegex.test(hash);
      case 'any':
      default:
        return ethRegex.test(hash) || icpRegex.test(hash);
    }
  };
  
  /**
   * Validate a date
   * @param {Date|string} date - Date to validate
   * @param {Object} [options] - Validation options
   * @param {Date|string} [options.min] - Minimum allowed date
   * @param {Date|string} [options.max] - Maximum allowed date
   * @returns {boolean} True if the date is valid and within the range, false otherwise
   * 
   * @example
   * isValidDate('2023-05-15'); // true
   * isValidDate('2023-05-15', { min: '2023-01-01', max: '2023-12-31' }); // true
   * isValidDate('invalid-date'); // false
   */
  export const isValidDate = (date, options = {}) => {
    if (isEmpty(date)) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if valid date
    if (isNaN(dateObj.getTime())) return false;
    
    // Check min date
    if (options.min) {
      const minDate = typeof options.min === 'string' ? new Date(options.min) : options.min;
      if (dateObj < minDate) return false;
    }
    
    // Check max date
    if (options.max) {
      const maxDate = typeof options.max === 'string' ? new Date(options.max) : options.max;
      if (dateObj > maxDate) return false;
    }
    
    return true;
  };
  
  /**
   * Validate form inputs
   * @param {Object} inputs - Form inputs
   * @param {Object} validations - Validation rules
   * @returns {Object} Validation results with isValid flag and errors for each field
   * 
   * @example
   * const inputs = { email: 'test@example.com', password: 'weak' };
   * const validations = {
   *   email: { required: true, email: true },
   *   password: { required: true, minLength: 8 }
   * };
   * validateForm(inputs, validations);
   * // { isValid: false, errors: { email: [], password: ['Password must be at least 8 characters long'] } }
   */
  export const validateForm = (inputs, validations) => {
    const errors = {};
    let isValid = true;
    
    // Process each field
    Object.keys(validations).forEach(field => {
      const value = inputs[field];
      const rules = validations[field];
      const fieldErrors = [];
      
      // Required validation
      if (rules.required && isEmpty(value)) {
        fieldErrors.push(`${field} is required`);
      }
      
      // Email validation
      if (rules.email && !isEmpty(value) && !isValidEmail(value)) {
        fieldErrors.push(`${field} must be a valid email address`);
      }
      
      // Min length validation
      if (rules.minLength && !isEmpty(value) && value.length < rules.minLength) {
        fieldErrors.push(`${field} must be at least ${rules.minLength} characters long`);
      }
      
      // Max length validation
      if (rules.maxLength && !isEmpty(value) && value.length > rules.maxLength) {
        fieldErrors.push(`${field} must not exceed ${rules.maxLength} characters`);
      }
      
      // Number validation
      if (rules.number && !isEmpty(value) && !isValidNumber(value, rules.min, rules.max)) {
        fieldErrors.push(`${field} must be a valid number`);
        
        // Range validation (if it's a number)
        if (isValidNumber(value)) {
          if (rules.min !== undefined && Number(value) < rules.min) {
            fieldErrors.push(`${field} must be greater than or equal to ${rules.min}`);
          }
          
          if (rules.max !== undefined && Number(value) > rules.max) {
            fieldErrors.push(`${field} must be less than or equal to ${rules.max}`);
          }
        }
      }
      
      // URL validation
      if (rules.url && !isEmpty(value) && !isValidUrl(value)) {
        fieldErrors.push(`${field} must be a valid URL`);
      }
      
      // Date validation
      if (rules.date && !isEmpty(value) && !isValidDate(value, { min: rules.minDate, max: rules.maxDate })) {
        fieldErrors.push(`${field} must be a valid date`);
        
        // Date range validation (if it's a valid date)
        if (isValidDate(value)) {
          if (rules.minDate && !isValidDate(value, { min: rules.minDate })) {
            const minDateStr = typeof rules.minDate === 'string' ? rules.minDate : rules.minDate.toLocaleDateString();
            fieldErrors.push(`${field} must be after ${minDateStr}`);
          }
          
          if (rules.maxDate && !isValidDate(value, { max: rules.maxDate })) {
            const maxDateStr = typeof rules.maxDate === 'string' ? rules.maxDate : rules.maxDate.toLocaleDateString();
            fieldErrors.push(`${field} must be before ${maxDateStr}`);
          }
        }
      }
      
      // Custom validation
      if (rules.custom && typeof rules.custom === 'function') {
        const customResult = rules.custom(value, inputs);
        if (customResult !== true) {
          fieldErrors.push(customResult || `${field} is invalid`);
        }
      }
      
      // Set errors for this field
      errors[field] = fieldErrors;
      
      // Update overall validity
      if (fieldErrors.length > 0) {
        isValid = false;
      }
    });
    
    return { isValid, errors };
  };
  
  export default {
    isEmpty,
    isValidEmail,
    isValidWalletAddress,
    validatePassword,
    isValidUrl,
    isValidNumber,
    isValidTransactionHash,
    isValidDate,
    validateForm
  };