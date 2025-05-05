
// File: src/components/wallet/WalletSelector.jsx

import React from 'react';
import useWallet from '../../hooks/useWallet';

const WalletSelector = ({ onSelect }) => {
  const { supportedWallets, selectedWalletType, setSelectedWalletType } = useWallet();
  
  const handleSelect = (walletId) => {
    setSelectedWalletType(walletId);
    if (onSelect) onSelect(walletId);
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
      <h3 className="text-lg font-medium text-white mb-3">Pilih Wallet</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {supportedWallets.map((wallet) => (
          <button
            key={wallet.id}
            className={`flex items-center p-3 rounded-lg transition-all ${
              selectedWalletType === wallet.id 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => handleSelect(wallet.id)}
          >
            <div className="w-6 h-6 mr-2 flex-shrink-0">
              <img src={wallet.icon} alt={wallet.name} className="w-full h-full" />
            </div>
            <span>{wallet.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletSelector;