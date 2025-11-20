import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" w-full border-t mt-2 border-gray-200 py-12 text-gray-700">
      <div className="
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        gap-12
      ">

        {/* About */}
        <div>
          <Link to="/" className="block">
            <img
              className="w-36 md:w-44"
              src="https://i.ibb.co/jZ4sVWWt/image-logo.png"
              alt="trendyblogs - logo"
            />
          </Link>
          <p className="text-sm text-gray-600 mt-4 leading-6">
           Explore fresh posts in Nature, Travel, Science, Technology, and Finance — read, learn, and share your insights. From the wonders of nature to the latest in tech and financial trends, TrendyBlogs brings you knowledge that matters.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-black transition">Home</Link></li>
            <li><Link to="/categories" className="hover:text-black transition">Categories</Link></li>
            <li><Link to="/contact" className="hover:text-black transition">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-black transition">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-black transition">Terms &amp; Conditions</Link></li>
            <li><Link to="/support" className="hover:text-black transition">Support</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} trendyblogs — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
