
// src/components/wallet/WalletStatus.jsx
import React, { useContext } from 'react';
import { WalletContext } from '../../context/WalletContext';

const WalletStatus = () => {
  const { isConnected, wallet, balance } = useContext(WalletContext);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-white">Wallet Status</h3>
        <span className="bg-green-500 rounded-full h-2 w-2"></span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Address:</span>
          <span className="text-white font-mono">{wallet.address.substring(0, 8)}...{wallet.address.substring(38)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Balance:</span>
          <span className="text-white font-medium">{balance} ICP</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Wallet Type:</span>
          <span className="text-white">{wallet.type}</span>
        </div>
      </div>
    </div>
  );
};

export default WalletStatus;