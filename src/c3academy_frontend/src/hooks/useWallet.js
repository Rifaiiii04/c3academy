// src/hooks/useWallet.js
import { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import { formatWalletAddress } from '../utils/formatters';

/**
 * Custom hook to access the WalletContext
 * 
 * Provides all wallet-related data and functions from the WalletContext
 * including connection state and transaction functions.
 * 
 * @returns {Object} All values and functions from the WalletContext
 * 
 * @example
 * // In a component:
 * const { 
 *   isConnected, 
 *   wallet, 
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
  
  return { 
    isConnected,
    wallet,
    sendTransaction
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
  const displayAddress = wallet ? formatWalletAddress(wallet.address) : '';
  
  return {
    isConnected,
    connecting,
    displayAddress,
    connectWallet,
    disconnectWallet
  };
};