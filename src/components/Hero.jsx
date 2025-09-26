

import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
			return (
					<section
						className="w-full text-black  py-16 flex items-center justify-center relative"
						style={{
							backgroundImage:
								"url('https://wallpapercave.com/wp/wp15280119.webp')",
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundColor: '#fff',
						}}
					>
						{/* Remove overlay for now to debug image visibility */}
						<div className="relative max-w-3xl mx-auto text-center px-4">
							<h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 mb-4 drop-shadow-lg">Welcome to Blogify</h1>
							<p className="text-lg md:text-xl text-gray-900 mb-8 drop-shadow">
								Discover inspiring stories, expert insights, and the latest trends in Nature, Travel, and Science. Join our community and start sharing your own adventures today!
							</p>
							<Link
								to="/register"
								className="inline-block bg-gray-900 text-white rounded-lg px-8 py-3 text-lg font-semibold shadow hover:bg-gray-800 transition"
							>
								Get Started
							</Link>
						</div>
					</section>
	);
};

export default Hero;
