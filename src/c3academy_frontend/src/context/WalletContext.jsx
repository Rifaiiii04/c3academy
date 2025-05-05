// src/context/WalletContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { 
  connectWallet as connectWalletService, 
  disconnectWallet as disconnectWalletService,
  isWalletConnected as isWalletConnectedService
} from '../services/walletService';

// Membuat context
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Fungsi untuk menghasilkan random balance sekitar 100 (90-110)
  const generateRandomBalance = useCallback(() => {
    return 90 + Math.floor(Math.random() * 20);
  }, []);

  // Fungsi untuk connect wallet
  const connectWallet = useCallback(async (type = 'plug') => {
    setConnecting(true);
    setError(null);
    
    try {
      // Panggil service untuk connect ke wallet
      const walletData = await connectWalletService(type);
      
      // Tambahkan random balance ke wallet data
      const randomBalance = generateRandomBalance();
      const walletWithBalance = {
        ...walletData,
        balance: randomBalance
      };
      
      setWallet(walletWithBalance);
      setBalance(randomBalance);
      setIsConnected(true);
      setWalletType(type);
      
      // Simpan data wallet termasuk balance ke localStorage
      localStorage.setItem('walletData', JSON.stringify(walletWithBalance));
      localStorage.setItem('walletType', type);
      localStorage.setItem('walletBalance', randomBalance.toString());
      
      return walletWithBalance;
    } catch (err) {
      setError(err.message || 'Gagal terhubung ke wallet. Silakan coba lagi.');
      return null;
    } finally {
      setConnecting(false);
    }
  }, [generateRandomBalance]);

  // Fungsi untuk disconnect wallet
  const disconnectWallet = useCallback(async () => {
    try {
      await disconnectWalletService();
      
      setWallet(null);
      setIsConnected(false);
      setWalletType(null);
      setBalance(0);
      setTransactions([]);
      
      // Hapus data dari localStorage
      localStorage.removeItem('walletData');
      localStorage.removeItem('walletType');
      localStorage.removeItem('walletBalance');
      localStorage.removeItem('walletTransactions');
      
      return true;
    } catch (err) {
      setError(err.message || 'Gagal memutuskan koneksi wallet.');
      return false;
    }
  }, []);

  // Fungsi untuk melakukan transaksi
  const makeTransaction = useCallback(async (amount, recipient, description = '') => {
    if (!isConnected || !wallet) {
      setError('Wallet tidak terhubung.');
      return false;
    }

    if (amount <= 0) {
      setError('Jumlah transaksi harus lebih dari 0.');
      return false;
    }

    if (amount > balance) {
      setError('Saldo tidak mencukupi.');
      return false;
    }

    try {
      // Di sini Anda bisa menambahkan logika untuk mengirim transaksi ke blockchain
      // Untuk contoh ini, kita hanya akan mengurangi balance

      // Mengurangi balance
      const newBalance = balance - amount;
      setBalance(newBalance);

      // Update wallet object
      const updatedWallet = {
        ...wallet,
        balance: newBalance
      };
      setWallet(updatedWallet);

      // Catat transaksi
      const transaction = {
        id: Date.now().toString(),
        amount,
        recipient,
        description,
        timestamp: new Date().toISOString(),
        type: 'outgoing'
      };

      const updatedTransactions = [transaction, ...transactions];
      setTransactions(updatedTransactions);

      // Update localStorage
      localStorage.setItem('walletData', JSON.stringify(updatedWallet));
      localStorage.setItem('walletBalance', newBalance.toString());
      localStorage.setItem('walletTransactions', JSON.stringify(updatedTransactions));

      return {
        success: true,
        transaction
      };
    } catch (err) {
      setError(err.message || 'Transaksi gagal. Silakan coba lagi.');
      return {
        success: false,
        error: err.message
      };
    }
  }, [isConnected, wallet, balance, transactions]);

  // Cek koneksi wallet ketika aplikasi dimuat
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await isWalletConnectedService();
        
        if (isConnected) {
          const savedWalletData = JSON.parse(localStorage.getItem('walletData'));
          const savedWalletType = localStorage.getItem('walletType');
          const savedBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
          const savedTransactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
          
          if (savedWalletData) {
            setWallet(savedWalletData);
            setWalletType(savedWalletType);
            setBalance(savedBalance);
            setTransactions(savedTransactions);
            setIsConnected(true);
          }
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      }
    };
    
    checkConnection();
  }, []);

  // Set up listener untuk perubahan akun
  useEffect(() => {
    if (!isConnected || !walletType) return;

    // Fungsi untuk handle perubahan akun
    const handleAccountChange = async () => {
      try {
        const isStillConnected = await isWalletConnectedService();
        
        if (!isStillConnected) {
          // Wallet sudah terputus
          await disconnectWallet();
        }
      } catch (err) {
        console.error('Error handling account change:', err);
      }
    };

    // Set up listener berdasarkan tipe wallet
    let intervalId;
    
    // Periksa ketersediaan API onConnectionUpdate
    try {
      if (walletType === 'plug' && window.ic && window.ic.plug && 
          typeof window.ic.plug.onConnectionUpdate === 'function') {
        // Gunakan listener jika tersedia
        window.ic.plug.onConnectionUpdate(handleAccountChange);
        
      } else {
        // Gunakan polling sebagai fallback untuk semua wallet
        intervalId = setInterval(handleAccountChange, 5000);
      }
    } catch (err) {
      console.error('Error setting up wallet connection listener:', err);
      // Fallback ke polling jika terjadi error
      intervalId = setInterval(handleAccountChange, 5000);
    }

    // Cleanup listener
    return () => {
      try {
        if (walletType === 'plug' && window.ic && window.ic.plug && 
            typeof window.ic.plug.onConnectionUpdate === 'function') {
          window.ic.plug.onConnectionUpdate(null);
        }
      } catch (err) {
        console.error('Error cleaning up wallet listener:', err);
      }
      
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isConnected, walletType, disconnectWallet]);

  // Context value
  const value = {
    isConnected,
    wallet,
    connecting,
    error,
    walletType,
    balance,
    transactions,
    connectWallet,
    disconnectWallet,
    makeTransaction
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};