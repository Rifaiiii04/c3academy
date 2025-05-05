// src/components/common/Navbar.jsx
import React, { useState, useContext } from "react";
import ConnectWallet from "../wallet/ConnectWallet";
import WalletModal from "../wallet/WalletModal";
import WalletStatus from "../wallet/WalletStatus";
import SearchBar from "./SearchBar";
import { WalletContext } from "../../context/WalletContext";

const Navbar = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletStatusOpen, setIsWalletStatusOpen] = useState(false);
  const { isConnected } = useContext(WalletContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Categories", path: "/categories" },
    { name: "MyCourses", path: "/my-courses" },
    { name: "Cart", path: "/cart" },
  ];

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const toggleWalletStatus = () => {
    setIsWalletStatusOpen(!isWalletStatusOpen);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 text-xl font-bold">
                C3Academy
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>
            <ConnectWallet openWalletModal={openWalletModal} />

            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 pb-3 pt-2">
          <div className="px-2 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="px-4 pt-4">
            <SearchBar />
          </div>
          {isConnected && (
            <div className="px-4 pt-4">
              <button
                className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={toggleWalletStatus}
              >
                Status Wallet
              </button>
            </div>
          )}
        </div>
      )}

      {/* Wallet Status Drawer/Modal */}
      {isConnected && isWalletStatusOpen && (
        <div className="fixed inset-0 overflow-hidden z-20" onClick={toggleWalletStatus}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-gray-900 shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-xl font-medium text-white">Wallet Info</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-gray-800 rounded-md text-gray-400 hover:text-white focus:outline-none"
                          onClick={toggleWalletStatus}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <WalletStatus />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Connect Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;