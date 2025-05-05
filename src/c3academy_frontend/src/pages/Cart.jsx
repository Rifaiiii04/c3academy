// src/pages/Cart.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { WalletContext } from '../context/WalletContext';

// Course provider address (where payments are sent)
const COURSE_PROVIDER_ADDRESS = '0x3a8d29c5DC4cBcA38C9a36726AC56065A4F7A0Fb';

const Cart = () => {
  const navigate = useNavigate();
  
  // Get all necessary functions and values from WalletContext 
  const { isConnected, wallet, balance, makeTransaction } = useContext(WalletContext);
  
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
        setError('Failed to load your cart. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  // Check if user has enough balance
  const hasEnoughBalance = isConnected && balance >= cartTotal;

  // Remove item from cart
  const removeFromCart = (courseId) => {
    const updatedCart = cartItems.filter(item => item.id !== courseId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!isConnected) {
      navigate('/connect-wallet', { 
        state: { returnPath: '/cart', action: 'checkout' }
      });
      return;
    }

    if (!hasEnoughBalance) {
      setError('Insufficient balance to complete purchase.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Use the makeTransaction function from WalletContext to actually reduce the balance
      const transactionResult = await makeTransaction(
        cartTotal,
        COURSE_PROVIDER_ADDRESS,
        `Purchase of ${cartItems.length} course${cartItems.length > 1 ? 's' : ''}`
      );
      
      if (!transactionResult || !transactionResult.success) {
        throw new Error(transactionResult?.error || 'Transaction failed');
      }
      
      // Save purchased courses to localStorage for demo purposes
      // This simulates enrolling in the courses
      const purchasedCourses = JSON.parse(localStorage.getItem('purchased_courses') || '[]');
      const updatedPurchasedCourses = [...purchasedCourses, ...cartItems];
      localStorage.setItem('purchased_courses', JSON.stringify(updatedPurchasedCourses));
      
      // Store enrollment details with transaction info
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      
      const newEnrollments = cartItems.map(course => ({
        courseId: course.id,
        course: course.title,
        walletAddress: wallet.address,
        enrollmentDate: new Date().toISOString(),
        transactionId: transactionResult.transaction.id,
        amount: course.price,
        currency: 'ICP'
      }));
      
      localStorage.setItem('enrollments', JSON.stringify([...enrollments, ...newEnrollments]));
      
      // Clear cart after successful checkout
      localStorage.setItem('cart', JSON.stringify([]));
      setCartItems([]);
      
      // Show success message
      setSuccessMessage('Your purchase was successful! You can now access your courses.');
      
      // Redirect to my-courses page after a delay
      setTimeout(() => {
        navigate('/my-courses');
      }, 3000);
    } catch (error) {
      console.error('Checkout failed:', error);
      setError('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="large" variant="primary" type="spinner" />
          </div>
        ) : cartItems.length === 0 ? (
          <Card>
            <Card.Body className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
              <p className="text-gray-300 mb-6">
                Looks like you haven't added any courses to your cart yet.
              </p>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold text-white">{cartItems.length} {cartItems.length === 1 ? 'Course' : 'Courses'} in Cart</h2>
                </Card.Header>
                
                <div className="divide-y divide-gray-700">
                  {cartItems.map(course => (
                    <div key={course.id} className="p-6 flex flex-col md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex items-start">
                          <div className="bg-gradient-to-br from-indigo-800 to-purple-700 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                            <div className="text-lg font-bold text-white opacity-70">
                              {course.title.split(' ').map(word => word[0]).join('')}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white mb-1">{course.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">By {course.instructor}</p>
                            <div className="flex items-center text-sm">
                              <div className="text-yellow-400 flex items-center mr-2">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {course.rating}
                              </div>
                              <div className="text-gray-400">{course.level}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center justify-between md:flex-col md:items-end">
                        <div className="text-xl font-bold text-white">{course.price} ICP</div>
                        <button 
                          className="text-red-400 hover:text-red-300 text-sm mt-2 flex items-center"
                          onClick={() => removeFromCart(course.id)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <div className="mt-8 flex justify-between">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/courses')}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setCartItems([]);
                    localStorage.setItem('cart', JSON.stringify([]));
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <Card.Header>
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                </Card.Header>
                
                <Card.Body>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white font-medium">{cartTotal} ICP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform Fee</span>
                      <span className="text-white font-medium">0 ICP</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4 flex justify-between">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-white font-bold">{cartTotal} ICP</span>
                    </div>
                  </div>
                  
                  {isConnected && (
                    <div className={`mb-6 p-3 rounded-lg ${hasEnoughBalance ? 'bg-green-900 bg-opacity-20 text-green-400' : 'bg-red-900 bg-opacity-20 text-red-400'}`}>
                      <div className="flex justify-between mb-1">
                        <span>Your Balance:</span>
                        <span className="font-bold">{balance} ICP</span>
                      </div>
                      {!hasEnoughBalance && (
                        <div className="text-sm">
                          Insufficient balance to complete purchase
                        </div>
                      )}
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-3 mb-4 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  {successMessage && (
                    <div className="bg-green-900 bg-opacity-20 border border-green-800 rounded-lg p-3 mb-4 text-green-400 text-sm">
                      {successMessage}
                    </div>
                  )}
                  
                  <Button
                    variant="primary"
                    fullWidth={true}
                    size="large"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0 || isProcessing || (isConnected && !hasEnoughBalance)}
                  >
                    {isProcessing ? (
                      <>
                        <Loader size="small" variant="white" type="spinner" />
                        <span className="ml-2">Processing...</span>
                      </>
                    ) : !isConnected ? (
                      'Connect Wallet to Checkout'
                    ) : !hasEnoughBalance ? (
                      'Insufficient Balance'
                    ) : (
                      `Complete Purchase (${cartTotal} ICP)`
                    )}
                  </Button>
                </Card.Body>
                
                <Card.Footer>
                  <div className="text-center text-gray-400 text-sm">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;