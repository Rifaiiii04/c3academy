// src/services/walletService.js
/**
 * Wallet Service - Handles ICP wallet interactions
 * This is a mock implementation for demonstration purposes
 */

// Mock wallet connectors available for ICP
const supportedWallets = [
    { id: 'plug', name: 'Plug Wallet', icon: 'plug-icon.svg' },
    { id: 'stoic', name: 'Stoic Wallet', icon: 'stoic-icon.svg' },
    { id: 'infinity', name: 'Infinity Wallet', icon: 'infinity-icon.svg' },
    { id: 'bitfinity', name: 'Bitfinity Wallet', icon: 'bitfinity-icon.svg' }
  ];
  
  /**
   * Connect to a wallet
   * @param {string} walletType - Type of wallet to connect
   * @returns {Promise<Object>} Wallet connection data
   */
  const connectWallet = async (walletType = 'plug') => {
    // In a real implementation, this would use the actual wallet API
    // For now, we'll simulate a connection delay and return mock data
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({
            address: '0x' + Math.random().toString(16).slice(2, 42),
            type: walletType,
            balance: Math.floor(Math.random() * 200), // Random balance between 0-200 ICP
            connected: true
          });
        } else {
          reject(new Error('Failed to connect wallet. Please try again.'));
        }
      }, 1500); // Simulate network delay
    });
  };
  
  /**
   * Disconnect the wallet
   * @returns {Promise<void>}
   */
  const disconnectWallet = async () => {
    // In a real implementation, this would use the actual wallet API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };
  
  /**
   * Get wallet balance
   * @param {string} address - Wallet address
   * @returns {Promise<number>} Wallet balance in ICP
   */
  const getBalance = async (address) => {
    // In a real implementation, this would query the ICP ledger
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * 200));
      }, 800);
    });
  };
  
  /**
   * Send a transaction
   * @param {string} fromAddress - Sender wallet address
   * @param {string} toAddress - Recipient wallet address or course ID for enrollment
   * @param {number} amount - Amount of ICP to send
   * @returns {Promise<Object>} Transaction result
   */
  const sendTransaction = async (fromAddress, toAddress, amount) => {
    // In a real implementation, this would submit a transaction to the ICP ledger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.05) { // 95% success rate for transactions
          resolve({
            success: true,
            transactionId: '0x' + Math.random().toString(16).slice(2, 66),
            amount,
            fromAddress,
            toAddress,
            timestamp: new Date().toISOString()
          });
        } else {
          reject(new Error('Transaction failed. Please try again.'));
        }
      }, 2000); // Simulate longer delay for transactions
    });
  };
  
  /**
   * Verify if a wallet is connected
   * @returns {Promise<boolean>} True if wallet is connected
   */
  const isWalletConnected = async () => {
    // In a real implementation, this would check the wallet connection status
    return new Promise((resolve) => {
      const wasConnected = localStorage.getItem('walletConnected') === 'true';
      resolve(wasConnected);
    });
  };
  
  /**
   * Get supported wallet types
   * @returns {Array<Object>} List of supported wallet types
   */
  const getSupportedWallets = () => {
    return supportedWallets;
  };
  
  export {
    connectWallet,
    disconnectWallet,
    getBalance,
    sendTransaction,
    isWalletConnected,
    getSupportedWallets
  };