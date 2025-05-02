// src/hooks/useWallet.js
import { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

/**
 * Custom hook to access the WalletContext
 * 
 * Provides all wallet-related data and functions from the WalletContext
 * including connection state, balance, and transaction functions.
 * 
 * @returns {Object} All values and functions from the WalletContext
 * 
 * @example
 * // In a component:
 * const { 
 *   isConnected, 
 *   wallet, 
 *   balance,
 *   connectWallet 
 * } = useWallet();
 */
const useWallet = () => {
  const context = useContext(WalletContext);
  
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};

export default useWallet;

/**
 * Individual hooks for specific wallet functionality
 * These hooks can be used when you only need a specific part of the wallet context
 */

/**
 * Hook to access wallet connection state
 * @returns {Object} Wallet connection state and functions
 */
export const useWalletConnection = () => {
  const { 
    isConnected, 
    wallet, 
    connecting, 
    error,
    connectWallet, 
    disconnectWallet 
  } = useContext(WalletContext);
  
  if (isConnected === undefined) {
    throw new Error('useWalletConnection must be used within a WalletProvider');
  }
  
  return { 
    isConnected, 
    wallet, 
    connecting, 
    error,
    connectWallet, 
    disconnectWallet 
  };
};

/**
 * Hook to access wallet balance
 * @returns {Object} Wallet balance and related functions
 */
export const useWalletBalance = () => {
  const { 
    isConnected,
    balance, 
    getBalance 
  } = useContext(WalletContext);
  
  if (balance === undefined) {
    throw new Error('useWalletBalance must be used within a WalletProvider');
  }
  
  return { 
    isConnected,
    balance, 
    getBalance 
  };
};

/**
 * Hook to access transaction functionality
 * @returns {Object} Transaction functions
 */
export const useTransactions = () => {
  const { 
    isConnected,
    wallet,
    sendTransaction 
  } = useContext(WalletContext);
  
  if (!sendTransaction) {
    throw new Error('useTransactions must be used within a WalletProvider');
  }
  
  /**
   * Helper function to check if a user can afford a transaction
   * @param {number} amount - Amount to check
   * @returns {boolean} Whether the user has enough balance
   */
  const canAfford = (amount) => {
    if (!isConnected || !wallet) return false;
    return balance >= amount;
  };
  
  return { 
    isConnected,
    wallet,
    sendTransaction,
    canAfford
  };
};

/**
 * Helper hook for connect wallet button
 * @returns {Object} Values and functions needed for a connect wallet button
 */
export const useConnectButton = () => {
  const { 
    isConnected, 
    wallet, 
    connecting, 
    connectWallet, 
    disconnectWallet 
  } = useContext(WalletContext);
  
  if (isConnected === undefined) {
    throw new Error('useConnectButton must be used within a WalletProvider');
  }
  
  // Format wallet address for display
  const formatAddress = () => {
    if (!wallet || !wallet.address) return '';
    return `${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`;
  };
  
  return {
    isConnected,
    connecting,
    displayAddress: formatAddress(),
    connectWallet,
    disconnectWallet
  };
};