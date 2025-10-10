import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-50 via-blue-100 to-cyan-100 overflow-hidden">
      
      {/* Soft Floating Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-indigo-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-96 h-96 bg-cyan-400/40 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/40 backdrop-blur-md"></div>

      {/* Main Content */}
      <div className="relative z-10 px-6 max-w-3xl  p-10 rounded-3xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
            TrendyBlogs
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
          Dive into a world of stories, ideas, and inspiration — crafted just for you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-110"
          >
            Start Exploring
          </Link>
          <Link
            to="/about"
            className="border-2 border-indigo-600 text-indigo-600 rounded-full px-8 py-3 text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Subtle glow at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-200 via-transparent to-transparent"></div>
    </section>
  );
};

export default Hero;
