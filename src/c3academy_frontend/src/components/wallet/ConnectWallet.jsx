// src/components/wallet/ConnectWallet.jsx
import React, { useContext } from 'react';
import { WalletContext } from '../../context/WalletContext';

const ConnectWallet = () => {
  const { isConnected, wallet, balance, connecting, connectWallet, disconnectWallet } = useContext(WalletContext);

  if (isConnected) {
    return (
      <div className="flex items-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-2 mr-3 text-xs">
          <span className="font-bold">{balance} ICP</span>
        </div>
        <div className="relative group">
          <button
            className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
            onClick={() => disconnectWallet()}
          >
            <span className="mr-2">{wallet.address.substring(0, 6)}...{wallet.address.substring(38)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={() => disconnectWallet()}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center"
      onClick={() => connectWallet()}
      disabled={connecting}
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
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Connect Wallet
        </>
      )}
    </button>
  );
};

export default ConnectWallet;
