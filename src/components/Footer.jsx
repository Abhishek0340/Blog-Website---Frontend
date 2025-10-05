import React from "react";
import { AiOutlineMail } from "react-icons/ai"; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white w-full  border-t border-gray-200 py-10 text-gray-700 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">    
            <Link to='/'>
                  <img className="w-1/2" 
                  srcSet="https://i.ibb.co/jZ4sVWWt/image-logo.png" 
                  alt="trendyblogs - logo"  />   
            </Link>  
         </h2>
          <p className="text-sm text-gray-600">
            Explore blogs on Nature, Travel, and Science with unique perspectives.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
            <li><Link to="/categories" className="hover:text-gray-900">Categories</Link></li>
            <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-gray-900">Terms &amp; Conditions</Link></li>
            <li><Link to="/support" className="hover:text-gray-900">Support</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className=''>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Newsletter</h3>
          <form className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-800 flex-1 min-w-0 focus:ring-2 focus:ring-gray-400 outline-none"
            />
            <button className="flex items-center justify-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition shrink-0">
              <AiOutlineMail className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} trendyblogs -  All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
