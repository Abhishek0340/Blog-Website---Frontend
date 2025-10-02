import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 Not Found | trendyblogs</title>
        <meta name="description" content="Page not found on trendyblogs." />
      </Helmet>
      <Navbar />
    
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="mb-8">
          <circle cx="80" cy="80" r="78" stroke="#E5E7EB" strokeWidth="4" fill="#F3F4F6"/>
          <ellipse cx="80" cy="110" rx="40" ry="10" fill="#E5E7EB"/>
          <circle cx="60" cy="70" r="8" fill="#9CA3AF"/>
          <circle cx="100" cy="70" r="8" fill="#9CA3AF"/>
          <path d="M60 100 Q80 120 100 100" stroke="#9CA3AF" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <text x="80" y="50" textAnchor="middle" fontSize="32" fill="#9CA3AF" fontWeight="bold">404</text>
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>

    
      <Footer />
    </>
  );
};

export default NotFound;