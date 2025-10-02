// import React from "react";
// import { Link } from "react-router-dom";


// const Hero = () => {
// 	return (

// 		<section className="w-full text-black  py-16 flex items-center justify-center relative"
// 			style={{
// 				backgroundImage:
// 					"url('https://wallpapercave.com/wp/wp15280119.webp')",
// 				backgroundSize: 'cover',
// 				backgroundPosition: 'center',
// 				backgroundRepeat: 'no-repeat',
// 				backgroundColor: '#fff',
// 			}}
// 		>
// 			{/* Remove overlay for now to debug image visibility */}
// 			<div className="relative max-w-3xl mx-auto text-center px-4">
// 				<h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 mb-4 drop-shadow-lg">
// 					Welcome to trendyblogs
// 				</h1>
// 				<p className="text-lg md:text-xl text-gray-900 mb-8 drop-shadow">
// 					Discover inspiring stories, expert insights, and the latest trends in Nature, Travel, and Science. Join our community and start sharing your own adventures today!
// 				</p>
// 				<Link
// 					to="/register"
// 					className="inline-block bg-white text-black rounded-lg px-8 py-3 text-lg font-semibold shadow transition"
// 				>
// 					Get Started
// 				</Link>
// 			</div>
// 		</section>
// 	);
// };

// export default Hero;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const taglines = ["Stories", "Adventures", "Insights", "Discoveries"];

  // Rotate taglines every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="w-full text-white py-20 flex items-center justify-center relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/0R7BGnhG/wp14963393-minimal-nature-phone-wallpapers.webp')",
        backgroundSize: "cover",
        backgroundPosition: `center ${scrollOffset * 0.3}px`,
        backgroundRepeat: "no-repeat",
        
        minHeight: "70vh",
      }}
    >
      <div className="relative max-w-4xl mx-auto text-center px-6 bg-white/20 rounded-xl p-10">
        <h1
          className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-default"
        >
          Explore the World with TrendyBlogs
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 drop-shadow-md">
          Dive into captivating{" "}
          <span className="inline-block transition-opacity duration-500 opacity-100 animate-fadeIn text-yellow-900">
            {taglines[taglineIndex]}
          </span>{" "}
          in Nature, Travel, and Science. Share your journey with us!
        </p>
        <Link
          to="/register"
          className="inline-block  text-black rounded-full px-10 py-4 text-xl font-semibold shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-110 hover:shadow-xl"
        >
          Start Your Adventure
        </Link>
      </div>
    </section>
  );
};

export default Hero;
