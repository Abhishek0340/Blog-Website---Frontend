import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { MdSearch } from "react-icons/md";


const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const adRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (adRef.current) {
      adRef.current.innerHTML = "";

      const atOptions = {
        key: "e388e44e3a6868b0a1513fbf73d52e60",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      };

      const conf = document.createElement("script");
      const script = document.createElement("script");
      conf.type = "text/javascript";
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
      script.type = "text/javascript";
      script.src = `https://www.highperformanceformat.com/${atOptions.key}/invoke.js`;

      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <>
      <header className="w-full">
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left column: text */}
              <div className="order-2 md:order-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                  TrendyBlogs
                </h1>
                <p className="mt-4 mb-4 text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto md:mx-0">
                  Explore fresh posts in Nature, Travel, Science, Technology, and Finance — read, learn, and share your insights.
                  From the wonders of nature to the latest in tech and financial trends, TrendyBlogs brings you knowledge that matters.
                </p>

                {/* Search form */}
                <form
                  role="search"
                  className="mt-6 max-w-md mx-auto md:mx-0 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm border border-gray-100"
                  onSubmit={(e) => e.preventDefault()}
                  aria-label="Search TrendyBlogs"
                >
                  <input
                    type="search"
                    placeholder="Search topics, e.g. Technology, Science, Web Technology..."
                    className="flex-1 bg-transparent px-4 py-2 text-gray-700 placeholder-gray-400 rounded-full focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-2 py-2 rounded-full  text-indigo-700 font-medium hover:bg-indigo-100 focus:outline-none"
                  >
                    <MdSearch />
                  </button>
                </form>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                  {['Nature', 'Travel', 'Science', 'Technology', 'Finance'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => navigate(`/category/${tag.toLowerCase()}`)}
                      className="px-4 py-2 rounded-full cursor-pointer border-gray-200 text-gray-700 font-medium hover:from-blue-200 hover:to-white hover:text-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

              </div>

              {/* Right column: image */}
              <div className="order-1 md:order-2 flex items-center justify-center">
                <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                    {/* Loading placeholder */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl"></div>
                    )}

                    <img
                      src={"https://i.ibb.co/bMPyvh9f/trendyblogs-hero-image.png"}
                      alt="People reading articles and writing notes — TrendyBlogs"
                      className={`object-cover w-full h-full transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      loading="eager"
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative shapes */}
          <div
            className="pointer-events-none absolute -bottom-10 -left-20 w-72 h-72 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full opacity-40 blur-3xl hidden lg:block"
            aria-hidden="true"
          ></div>
          <div
            className="pointer-events-none absolute -top-10 -right-16 w-56 h-56 bg-gradient-to-br from-cyan-100 to-transparent rounded-full opacity-40 blur-3xl hidden lg:block"
            aria-hidden="true"
          ></div>
        </div>
      </header>

      {/* Adsterra banner */}
      <div
        ref={adRef}
        className="my-6 flex justify-center items-center px-2"
      >
        <div
          className="w-full max-w-[970px] min-h-[60px] md:min-h-[90px] bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm flex justify-center items-center"
        >
        
        </div>
      </div>

    </>
  );
};

export default Hero;