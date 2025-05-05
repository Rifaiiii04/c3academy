// src/utils/walletPolyfill.js
/**
 * Polyfill untuk support wallet ICP
 * File ini membantu pengembangan tanpa perlu menginstal extension wallet sesungguhnya
 * HANYA DIGUNAKAN UNTUK DEVELOPMENT
 */

// URL instalasi wallet
export const walletInstallUrls = {
    plug: 'https://plugwallet.ooo/',
    stoic: 'https://www.stoicwallet.com/',
    infinity: 'https://infinityswap.one/',
    bitfinity: 'https://wallet.bitfinity.network/'
  };
  
  // Deteksi ketersediaan wallet secara manual
  export const detectWallets = () => {
    const wallets = {
      plug: false,
      stoic: false,
      infinity: false,
      bitfinity: false
    };
  
    // Cek Plug Wallet
    if (window.ic && window.ic.plug) {
      wallets.plug = true;
    }
  
    // Cek Stoic Wallet
    if (window.StoicIdentity) {
      wallets.stoic = true;
    }
  
    // Cek Infinity Wallet
    if (window.infinityWallet) {
      wallets.infinity = true;
    }
  
    // Cek Bitfinity Wallet
    if (window.bitfinityWallet) {
      wallets.bitfinity = true;
    }
  
    return wallets;
  };
  
  // Polyfill untuk wallet yang mungkin belum terdeteksi
  export const setupWalletPolyfills = () => {
    // Tambahkan dummy plug wallet jika tidak ada
    if (!window.ic || !window.ic.plug) {
      console.warn('Plug Wallet not detected, using polyfill for development');
      window.ic = window.ic || {};
      window.ic.plug = {
        isConnected: false,
        
        isConnected: () => {
          return window.ic.plug.isConnected;
        },
        
        requestConnect: async (options) => {
          console.log('Plug Wallet connected (polyfill)', options);
          window.ic.plug.isConnected = true;
          return true;
        },
        
        disconnect: async () => {
          console.log('Plug Wallet disconnected (polyfill)');
          window.ic.plug.isConnected = false;
          return true;
        },
        
        requestBalance: async () => {
          console.log('Requesting Plug balance (polyfill)');
          return [
            {
              amount: Math.floor(Math.random() * 100),
              currency: 'ICP'
            }
          ];
        },
        
        requestTransfer: async (params) => {
          console.log('Requesting Plug transfer (polyfill)', params);
          return 'tx-' + Math.random().toString(16).substring(2, 30);
        },
        
        createActor: async () => {
          return {};
        },
        
        agent: {
          getPrincipal: async () => ({
            toText: () => `icp-principal-${Math.random().toString(36).substring(2, 15)}`
          })
        }
      };
    }
  
    // Tambahkan Stoic wallet jika tidak ada
    if (!window.StoicIdentity) {
      console.warn('Stoic Identity not detected, using polyfill for development');
      window.StoicIdentity = {
        isConnected: false,
        
        load: async () => {
          if (window.StoicIdentity.isConnected) {
            return {
              getPrincipal: () => ({
                toText: () => `icp-principal-${Math.random().toString(36).substring(2, 15)}`
              })
            };
          }
          // Return null jika tidak terhubung
          return null;
        },
        
        connect: async () => {
          console.log('Stoic Wallet connected (polyfill)');
          window.StoicIdentity.isConnected = true;
          return {
            getPrincipal: () => ({
              toText: () => `icp-principal-${Math.random().toString(36).substring(2, 15)}`
            })
          };
        },
        
        disconnect: () => {
          console.log('Stoic Wallet disconnected (polyfill)');
          window.StoicIdentity.isConnected = false;
        }
      };
    }
  
    // Tambahkan dummy infinity wallet jika tidak ada
    if (!window.infinityWallet) {
      console.warn('Infinity Wallet not detected, using polyfill for development');
      window.infinityWallet = {
        isConnected: false,
        
        enable: async () => {
          window.infinityWallet.isConnected = true;
          console.log('Infinity Wallet connected (polyfill)');
          return true;
        },
        
        disconnect: async () => {
          window.infinityWallet.isConnected = false;
          console.log('Infinity Wallet disconnected (polyfill)');
          return true;
        },
        
        getPrincipal: async () => {
          return {
            toText: () => `icp-principal-${Math.random().toString(36).substring(2, 15)}`
          };
        },
        
        getBalance: async () => {
          return {
            amount: Math.floor(Math.random() * 100)
          };
        }
      };
    }
  
    // Tambahkan dummy bitfinity wallet jika tidak ada
    if (!window.bitfinityWallet) {
      console.warn('Bitfinity Wallet not detected, using polyfill for development');
      window.bitfinityWallet = {
        isConnected: false,
        
        enable: async () => {
          window.bitfinityWallet.isConnected = true;
          console.log('Bitfinity Wallet connected (polyfill)');
          return true;
        },
        
        disconnect: async () => {
          window.bitfinityWallet.isConnected = false;
          console.log('Bitfinity Wallet disconnected (polyfill)');
          return true;
        },
        
        getPrincipal: async () => {
          return {
            toText: () => `icp-principal-${Math.random().toString(36).substring(2, 15)}`
          };
        },
        
        getBalance: async () => {
          return {
            amount: Math.floor(Math.random() * 100)
          };
        }
      };
    }
  };
  
  // Tambahkan skrip untuk dimasukkan ke App.jsx
  export const initializeWallets = () => {
    // Verifikasi apakah ini lingkungan development
    if (process.env.NODE_ENV === 'development') {
      console.log('Initializing wallet polyfills for development environment');
      setupWalletPolyfills();
    }
    
    // Logging wallet yang tersedia
    console.log('Available wallets:', detectWallets());
  };
  
  // Export fungsi untuk digunakan oleh aplikasi
  export default {
    detectWallets,
    setupWalletPolyfills,
    initializeWallets,
    walletInstallUrls
  };