// src/pages/ConnectWallet.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletContext } from '../context/WalletContext';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';

const ConnectWallet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, wallet, connecting, connectWallet, error } = useContext(WalletContext);
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Get return path from location state or default to home
  const returnPath = location.state?.returnPath || '/';
  const action = location.state?.action || null;

  // Redirect if already connected
  useEffect(() => {
    if (isConnected && wallet) {
      navigate(returnPath, { replace: true });
    }
  }, [isConnected, wallet, navigate, returnPath]);

  // Handle wallet connection
  const handleConnectWallet = async (walletType) => {
    setSelectedWallet(walletType);
    try {
      await connectWallet(walletType);
      // After successful connection, navigate back
      navigate(returnPath, { replace: true });
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  // Available wallet types
  const walletOptions = [
    { id: 'plug', name: 'Plug Wallet', icon: 'plug-icon.svg' },
    { id: 'stoic', name: 'Stoic Wallet', icon: 'stoic-icon.svg' },
    { id: 'infinity', name: 'Infinity Wallet', icon: 'infinity-icon.svg' }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <Card.Header>
            <h1 className="text-2xl font-bold text-white text-center">Connect Your Wallet</h1>
          </Card.Header>
          
          <Card.Body>
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-3 mb-6 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <p className="text-gray-300 mb-6 text-center">
              {action === 'enroll' 
                ? 'Connect your wallet to enroll in this course.'
                : 'Connect your wallet to access all features of C3Academy.'}
            </p>
            
            <div className="space-y-4">
              {walletOptions.map(wallet => (
                <div 
                  key={wallet.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-center
                    ${selectedWallet === wallet.id && connecting 
                      ? 'bg-indigo-900 bg-opacity-20 border-indigo-500' 
                      : 'border-gray-700 hover:border-indigo-400'}`}
                  onClick={() => handleConnectWallet(wallet.id)}
                >
                  <div className="bg-gray-800 p-2 rounded-full mr-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{wallet.name}</h3>
                    <p className="text-sm text-gray-400">Connect with {wallet.name}</p>
                  </div>
                  {selectedWallet === wallet.id && connecting && (
                    <Loader size="small" variant="primary" type="spinner" />
                  )}
                </div>
              ))}
            </div>
          </Card.Body>
          
          <Card.Footer>
            <div className="flex justify-center">
              <button 
                className="text-gray-400 hover:text-white text-sm"
                onClick={() => navigate(returnPath)}
              >
                Cancel and Go Back
              </button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ConnectWallet;