// src/components/wallet/WalletStatus.jsx
import React, { useContext, useEffect } from 'react';
import { WalletContext } from '../../context/WalletContext';

const WalletStatus = () => {
  const { isConnected, wallet, balance, walletType, updateBalance } = useContext(WalletContext);

  // Update balance secara periodik
  useEffect(() => {
    if (!isConnected) return;

    // Update balance setiap 30 detik
    const intervalId = setInterval(() => {
      updateBalance();
    }, 30000);

    // Cleanup interval ketika component unmount
    return () => clearInterval(intervalId);
  }, [isConnected, updateBalance]);

  if (!isConnected || !wallet) {
    return null;
  }

  // Fungsi untuk format alamat wallet
  const formatAddress = (address) => {
    if (!address) return '';
    
    if (address.startsWith('0x')) {
      // Format untuk alamat Ethereum
      return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
    } else {
      // Format untuk ICP principal ID
      return `${address.substring(0, 8)}...${address.substring(address.length - 5)}`;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-white">Status Wallet</h3>
        <div className="flex items-center">
          <span className="bg-green-500 rounded-full h-2 w-2 mr-2"></span>
          <span className="text-green-400 text-sm">Terhubung</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Alamat:</span>
          <span className="text-white font-mono text-sm">{formatAddress(wallet.address)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Balance:</span>
          <span className="text-white font-medium">{balance} ICP</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Tipe Wallet:</span>
          <span className="text-white capitalize">{walletType || wallet.type}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className="text-green-400">Aktif</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
          onClick={() => window.open('https://dashboard.internetcomputer.org/account', '_blank')}
        >
          Lihat di Explorer
        </button>
      </div>
    </div>
  );
};

export default WalletStatus;