// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { CourseProvider } from './context/CourseContext';

// Import pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import CoursePage from './pages/CoursePage';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import ConnectWallet from './pages/ConnectWallet';
import MyCourses from './pages/MyCourses';
import NotFound from './pages/NotFound';

// Import global styles
import './styles/globals.css';

const App = () => {
  return (
    <WalletProvider>
      <CourseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="/learn/:courseId/:lessonId?" element={<CoursePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<Courses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </CourseProvider>
    </WalletProvider>
  );
};

export default App;