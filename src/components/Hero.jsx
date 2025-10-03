import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = ["Stories", "Adventures", "Insights", "Discoveries"];

  // Rotate taglines every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <section
      className="relative w-full flex items-center justify-center min-h-screen text-gray-900 overflow-hidden"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp15280119.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* White + Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-blue-100/70 to-gray-200/80"></div>

      {/* Floating Gradient Circles for Modern Touch */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-bounce"></div>

      {/* Content */}
      <div className="relative max-w-5xl w-full px-6 md:px-12 text-center md:text-left z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Explore{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-sky-500 text-transparent bg-clip-text animate-gradient">
            TrendyBlogs
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto md:mx-0 leading-relaxed">
          Dive into exciting{" "}
          <span className="text-blue-600 font-bold animate-pulse">
            {taglines[taglineIndex]}
          </span>{" "}
          in Nature, Travel & Science.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start">
          <Link
            to="/login"
            className="bg-blue-600 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:bg-blue-700 transition transform hover:scale-110 hover:shadow-2xl"
          >
            Start Exploring
          </Link>
          <Link
            to="/about"
            className="border-2 border-blue-600 text-blue-600 rounded-full px-8 py-3 text-lg font-semibold hover:bg-blue-600 hover:text-white transition transform hover:scale-110 hover:shadow-2xl"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
