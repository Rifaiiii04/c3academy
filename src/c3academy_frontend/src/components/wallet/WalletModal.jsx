
// src/components/wallet/WalletModal.jsx
import React, { useContext, useState } from 'react';
import { WalletContext } from '../../context/WalletContext';

const WalletModal = ({ isOpen, onClose }) => {
  const { connectWallet, connecting, error } = useContext(WalletContext);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    { id: 'plug', name: 'Plug Wallet', icon: 'plug-icon.svg' },
    { id: 'stoic', name: 'Stoic Wallet', icon: 'stoic-icon.svg' },
    { id: 'infinity', name: 'Infinity Wallet', icon: 'infinity-icon.svg' }
  ];

  const handleConnect = async () => {
    if (!selectedWallet) return;
    
    await connectWallet();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Connect Your Wallet</h2>
        
        <div className="space-y-4 mb-6">
          {walletOptions.map(wallet => (
            <div
              key={wallet.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedWallet === wallet.id
                  ? 'border-indigo-500 bg-indigo-900 bg-opacity-20'
                  : 'border-gray-700 hover:border-indigo-400'
              }`}
              onClick={() => setSelectedWallet(wallet.id)}
            >
              <div className="flex items-center">
                <div className="bg-gray-800 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">{wallet.name}</h3>
                  <p className="text-sm text-gray-400">Connect with your {wallet.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <button
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
          onClick={handleConnect}
          disabled={!selectedWallet || connecting}
        >
          {connecting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            'Connect'
          )}
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
