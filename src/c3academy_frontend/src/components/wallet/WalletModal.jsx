// src/components/wallet/WalletModal.jsx
import React, { useContext, useState, useEffect } from 'react';
import { WalletContext } from '../../context/WalletContext';
import { getSupportedWallets, walletInstallUrls } from '../../services/walletService';

const WalletModal = ({ isOpen, onClose }) => {
  const { connectWallet, connecting, error } = useContext(WalletContext);
  const [walletOptions, setWalletOptions] = useState([]);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [connectingId, setConnectingId] = useState(null);
  const [connectError, setConnectError] = useState(null);

  // Load daftar wallet yang didukung
  useEffect(() => {
    const loadWallets = async () => {
      setLoadingWallets(true);
      try {
        const supportedWallets = getSupportedWallets();
        setWalletOptions(supportedWallets);
      } catch (err) {
        console.error('Error loading wallet options:', err);
      } finally {
        setLoadingWallets(false);
      }
    };

    if (isOpen) {
      loadWallets();
      setConnectError(null);
      setConnectingId(null);
    }
  }, [isOpen]);

  // Handle jika user klik wallet
  const handleWalletClick = async (wallet) => {
    if (connectingId) return; // Jangan lakukan apa-apa jika sedang connecting

    setConnectError(null);
    
    if (wallet.isAvailable) {
      // Jika wallet tersedia, langsung connect
      setConnectingId(wallet.id);
      try {
        await connectWallet(wallet.id);
        onClose(); // Tutup modal setelah connect berhasil
      } catch (err) {
        console.error('Error connecting wallet:', err);
        setConnectError(err.message || 'Gagal menghubungkan wallet. Silakan coba lagi.');
        setConnectingId(null);
      }
    } else {
      // Jika wallet tidak tersedia, buka halaman untuk install
      window.open(wallet.installUrl || walletInstallUrls[wallet.id] || '#', '_blank');
    }
  };

  // Handle jika user klik di luar modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Jika modal tidak terbuka, tidak perlu render apapun
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 relative">
        {/* Tombol close */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Hubungkan Wallet Anda</h2>
        
        {loadingWallets ? (
          <div className="flex justify-center items-center py-8">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {walletOptions.map(wallet => (
              <div
                key={wallet.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  connectingId === wallet.id
                    ? 'border-indigo-500 bg-indigo-900 bg-opacity-20'
                    : 'border-gray-700 hover:border-indigo-400'
                }`}
                onClick={() => handleWalletClick(wallet)}
              >
                <div className="flex items-center">
                  <div className="bg-gray-800 p-2 rounded-full mr-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{wallet.name}</h3>
                    <p className="text-sm text-gray-400">
                      {connectingId === wallet.id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Menghubungkan...
                        </span>
                      ) : (
                        `Connect dengan ${wallet.name}`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {walletOptions.length === 0 && (
              <div className="text-center py-4 text-gray-400">
                Tidak ada wallet yang tersedia
              </div>
            )}
          </div>
        )}
        
        {/* Tampilkan pesan error jika ada */}
        {connectError && <p className="text-red-500 mb-4">{connectError}</p>}
        {error && !connectError && <p className="text-red-500 mb-4">{error}</p>}

        {/* Informasi tambahan */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Dengan menghubungkan wallet, Anda menyetujui <br />
          <a href="#" className="text-indigo-400 hover:text-indigo-300">Syarat & Ketentuan</a> dari C3Academy
        </div>
      </div>
    </div>
  );
};

export default WalletModal;