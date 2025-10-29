// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Spinner from "./Spinner";

// // const PostCard = () => {
// //   const navigate = useNavigate();
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
// //         if (!res.ok) throw new Error("Failed to fetch posts");
// //         const data = await res.json();
// //         setPosts(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPosts();
// //   }, []);

// //   const getPostsByCategory = (category) =>
// //     posts
// //       .filter((post) => post.category && post.category.toLowerCase() === category)
// //       .slice(0, 3);

// //   const categories = ["nature", "travel", "science", "technology"];

// //   if (loading) return <div><Spinner /></div>;
// //   if (error) return <div className="text-center text-red-500">{error}</div>;

// //   return (
// //     <div className="w-full">
// //       {categories.map((cat) => {
// //         const catPosts = getPostsByCategory(cat);
// //         return catPosts.length > 0 ? (
// //           <section key={cat} className="mb-12">
// //             {/* Category Heading */}
// //             <h2 className="text-2xl font-bold mb-4 capitalize text-gray-800 border-l-4 border-indigo-500 pl-3">
// //               {cat}
// //             </h2>

// //             {/* Cards Grid */}
// //             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //               {catPosts.map((post) => {
// //                 const blogNameSlug = (post.blogName || post.title || "")
// //                   .toLowerCase()
// //                   .replace(/[^a-z0-9]+/g, "-")
// //                   .replace(/^-+|-+$/g, "");

// //                 return (
// //                   <div
// //                     key={post._id || post.title}
// //                     className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer overflow-hidden group"
// //                     onClick={() =>
// //                       navigate(`/viewpost/${post._id}/${blogNameSlug}`)
// //                     }
// //                   >
// //                     {/* Thumbnail (unchanged) */}
// //                     {post.thumbnail && (
// //                       <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
// //                         <img
// //                           src={post.thumbnail}
// //                           alt={post.title}
// //                           className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
// //                         />
// //                       </div>
// //                     )}

// //                     {/* Category badge (fixed position) */}
// //                     <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10 capitalize">
// //                       {post.category}
// //                     </div>

// //                     {/* Content */}
// //                     <div className="px-4 pb-4 flex flex-col flex-1">
// //                       <h3 className="text-lg font-extrabold mb-2 text-gray-900 leading-tight line-clamp-2">
// //                         {post.title}
// //                       </h3>

// //                       {post.subtitle && (
// //                         <p className="text-gray-600 text-sm mb-3 font-medium line-clamp-1">
// //                           {post.subtitle}
// //                         </p>
// //                       )}

// //                       <div
// //                         className="text-gray-700 text-sm mb-4 line-clamp-3 prose prose-sm max-w-none"
// //                         dangerouslySetInnerHTML={{
// //                           __html: post.content,
// //                         }}
// //                       />

// //                       {/* Read More */}
// //                       <button
// //                         className="mt-auto text-indigo-600 font-medium hover:text-indigo-800 transition"
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           navigate(`/viewpost/${post._id}`);
// //                         }}
// //                       >
// //                         Read More →
// //                       </button>

// //                       {/* Footer */}
// //                       <div className="flex justify-between items-center text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
// //                         <span className="font-semibold text-gray-500 truncate">
// //                           {post.authorGmail || "Unknown Author"}
// //                         </span>
// //                         <span>
// //                           {post.createdAt
// //                             ? new Date(post.createdAt).toLocaleDateString()
// //                             : ""}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </section>
// //         ) : null;
// //       })}
// //     </div>
// //   );
// // };

// // export default PostCard;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Spinner from "./Spinner";

// const PostCard = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
//         if (!res.ok) throw new Error("Failed to fetch posts");
//         const data = await res.json();
//         setPosts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const getPostsByCategory = (category) =>
//     posts
//       .filter((post) => post.category && post.category.toLowerCase() === category)
//       .slice(0, 3);

//   const categories = ["nature", "travel", "science", "technology"];

//   if (loading) return <div><Spinner /></div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="w-full">
//       {categories.map((cat) => {
//         const catPosts = getPostsByCategory(cat);
//         return catPosts.length > 0 ? (
//           <section key={cat} className="mb-16">
//             {/* Category Heading */}
//             <h2 className="text-3xl font-extrabold mb-6 capitalize text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
//               {cat}
//             </h2>

//             {/* Cards Grid */}
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
//               {catPosts.map((post) => {
//                 const blogNameSlug = (post.blogName || post.title || "")
//                   .toLowerCase()
//                   .replace(/[^a-z0-9]+/g, "-")
//                   .replace(/^-+|-+$/g, "");

//                 return (
//                   <div
//                     key={post._id || post.title}
//                     className="relative bg-white/80 backdrop-blur-lg border border-gray-200/40 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer overflow-hidden group hover:-translate-y-1"
//                     onClick={() =>
//                       navigate(`/viewpost/${post._id}/${blogNameSlug}`)
//                     }
//                   >
//                     {/* Thumbnail (unchanged) */}
//                     {post.thumbnail && (
//                       <div className="w-full h-48 mb-4 overflow-hidden rounded-t-2xl bg-gray-100 flex items-center justify-center">
//                         <img
//                           src={post.thumbnail}
//                           alt={post.title}
//                           className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     )}

//                     {/* Category badge */}
//                     <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10 capitalize">
//                       {post.category}
//                     </div>

//                     {/* Content */}
//                     <div className="px-5 pb-5 flex flex-col flex-1">
//                       <h3 className="text-lg font-bold mb-2 text-gray-900 leading-snug line-clamp-2">
//                         {post.title}
//                       </h3>

//                       {post.subtitle && (
//                         <p className="text-gray-600 text-sm mb-3 font-medium line-clamp-1">
//                           {post.subtitle}
//                         </p>
//                       )}

//                       <div
//                         className="text-gray-700 text-sm mb-4 line-clamp-3 prose prose-sm max-w-none"
//                         dangerouslySetInnerHTML={{
//                           __html: post.content,
//                         }}
//                       />

//                       {/* Read More */}
//                       <button
//                         className="mt-auto text-indigo-600 font-semibold hover:text-pink-500 transition"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate(`/viewpost/${post._id}`);
//                         }}
//                       >
//                         Read More →
//                       </button>

//                       {/* Footer */}
//                       <div className="flex justify-between items-center text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
//                         <span className="font-semibold text-gray-500 truncate">
//                           {post.authorGmail || "Unknown Author"}
//                         </span>
//                         <span>
//                           {post.createdAt
//                             ? new Date(post.createdAt).toLocaleDateString()
//                             : ""}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         ) : null;
//       })}
//     </div>
//   );
// };

// export default PostCard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const PostCard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getPostsByCategory = (category) =>
    posts
      .filter((post) => post.category && post.category.toLowerCase() === category)
      .slice(0, 3);

  const categories = ["nature", "travel", "science", "technology"];

  if (loading) return <div><Spinner /></div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-full">
      {categories.map((cat) => {
        const catPosts = getPostsByCategory(cat);
        return catPosts.length > 0 ? (
          <section key={cat} className="mb-20">
            {/* Category Title */}
            <div className="flex items-center mb-6">
              <h2 className="text-4xl font-serif font-bold text-gray-800 capitalize tracking-tight">
                {cat}
              </h2>
              <div className="flex-grow ml-4 border-b border-gray-300 opacity-50"></div>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {catPosts.map((post) => {
                const blogNameSlug = (post.blogName || post.title || "")
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");

                return (
                  <div
                    key={post._id || post.title}
                    className="group relative flex flex-col cursor-pointer overflow-hidden rounded-3xl bg-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
                    onClick={() =>
                      navigate(`/viewpost/${post._id}/${blogNameSlug}`)
                    }
                  >
                    {/* Image (unchanged) */}
                    {post.thumbnail && (
                      <div className="w-full h-52 overflow-hidden rounded-t-3xl bg-gray-100">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Floating Category Badge */}
                    <span className="absolute top-4 left-4 bg-black/70 text-white text-xs uppercase tracking-wide px-3 py-1 rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>

                    {/* Text Section */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {post.subtitle && (
                        <p className="text-gray-600 text-sm mb-3 italic font-serif line-clamp-1">
                          {post.subtitle}
                        </p>
                      )}

                      <div
                        className="text-gray-700 text-sm mb-4 line-clamp-3 font-light"
                        dangerouslySetInnerHTML={{
                          __html: post.content,
                        }}
                      />

                      <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500 font-medium truncate">
                          {post.authorGmail || "Unknown Author"}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/viewpost/${post._id}`);
                          }}
                          className="text-indigo-600 text-sm font-semibold hover:underline hover:text-indigo-800 transition"
                        >
                          Read →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null;
      })}
    </div>
  );
};

export default PostCard;
