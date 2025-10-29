import React from "react";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <header className="w-full ">
      <div className="relative overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Left column: text */}
            <div className="order-2 md:order-1 text-center md:text-left">


              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                TrendyBlogs
              </h1>

              <p className="mt-4 mb-4 text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto md:mx-0">
                Fresh posts on design, development, and lifestyle. Read, learn, and share.
              </p>



              {/* Small search / explore box */}
              <form
                role="search"
                className="mt-6 max-w-md mx-auto md:mx-0 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm border border-gray-100"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Search TrendyBlogs"
              >
                <input
                  type="search"
                  placeholder="Search topics, e.g. React, CSS, Product Design"
                  className="flex-1 bg-transparent px-4 py-2 text-gray-700 placeholder-gray-400 rounded-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100 focus:outline-none"
                >
                  Search
                </button>
              </form>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2 text-sm">
                {['Design', 'Development', 'Lifestyle', 'Trending', 'Tutorials'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-white/70 border border-gray-100 text-gray-700 shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column: image / illustration */}
            <div className="order-1 md:order-2 flex items-center justify-center">
              <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5">
                {/* Responsive image with preserved aspect ratio */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src={'https://i.ibb.co/bMPyvh9f/trendyblogs-hero-image.png'}
                    alt="People reading articles and writing notes — TrendyBlogs"
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />

                  {/* Decorative overlay */}
                  <div className="absolute left-4 bottom-4 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-medium text-gray-800 shadow">
                    Nature • Travel • Science • Technology
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Subtle decorative shapes for larger screens */}
        <div className="pointer-events-none absolute -bottom-10 -left-20 w-72 h-72 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full opacity-40 blur-3xl hidden lg:block" aria-hidden="true"></div>
        <div className="pointer-events-none absolute -top-10 -right-16 w-56 h-56 bg-gradient-to-br from-cyan-100 to-transparent rounded-full opacity-40 blur-3xl hidden lg:block" aria-hidden="true"></div>

      </div>
    </header>
  );
};

export default Hero;
