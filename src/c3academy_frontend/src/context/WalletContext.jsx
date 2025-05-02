// src/context/WalletContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

// Creating context
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Mock function to connect wallet
  const connectWallet = useCallback(async () => {
    setConnecting(true);
    setError(null);
    
    try {
      // Simulate API call to connect wallet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful connection
      const mockWalletData = {
        address: '0x' + Math.random().toString(16).slice(2, 42),
        type: 'ICP Wallet'
      };
      
      setWallet(mockWalletData);
      setBalance(Math.floor(Math.random() * 100));
      setIsConnected(true);
      
      // Store connection in localStorage (for demo purposes)
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletData', JSON.stringify(mockWalletData));
      
      return mockWalletData;
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      return null;
    } finally {
      setConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWallet(null);
    setIsConnected(false);
    setBalance(0);
    
    // Clear localStorage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletData');
  }, []);

  // Check if wallet was previously connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      const wasConnected = localStorage.getItem('walletConnected') === 'true';
      if (wasConnected) {
        const savedWalletData = JSON.parse(localStorage.getItem('walletData'));
        if (savedWalletData) {
          setWallet(savedWalletData);
          setBalance(Math.floor(Math.random() * 100)); // Mock balance
          setIsConnected(true);
        }
      }
    };
    
    checkWalletConnection();
  }, []);

  // Mock transaction function
  const sendTransaction = useCallback(async (amount, recipient) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    
    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update balance after transaction (simulate)
      setBalance(prevBalance => Math.max(0, prevBalance - amount));
      
      return {
        success: true,
        txHash: '0x' + Math.random().toString(16).slice(2, 66)
      };
    } catch (err) {
      throw new Error('Transaction failed');
    }
  }, [isConnected]);

  // Context value
  const value = {
    isConnected,
    wallet,
    balance,
    connecting,
    error,
    connectWallet,
    disconnectWallet,
    sendTransaction
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};