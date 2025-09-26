import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        const found = data.find((p) => p._id === id);
        setPost(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // ✅ helper function to detect image URLs
  const isImageUrl = (url) => {
    return /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(url);
  };

  return (
    <>
      <Navbar />
      <div className=" bg-gray-50 flex flex-col items-center py-10 px-4">
        {loading ? (
          <div className="text-lg text-blue-600 font-semibold animate-pulse mt-20">
            Loading...
          </div>
        ) : error ? (
          <div className="text-red-500 mt-20">Error: {error}</div>
        ) : post ? (
          <article className="w-full mx-auto p-2">
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-snug">
              {post.title}
            </h1>

            {/* Thumbnail */}
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-72 md:h-96 object-cover rounded-2xl shadow mb-6"
              />
            )}

            {/* Category + Date */}
            <div className="flex items-center justify-between mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ''}
              </span>
            </div>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-lg text-gray-600 mb-4 italic border-l-4 border-indigo-500 pl-4">
                {post.subtitle}
              </p>
            )}

            {/* Author */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-max h-full rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">
                <span className="hidden">{post.author}</span>
              </div>
              <span className="text-sm hidden text-gray-700 font-medium">
                {post.authorGmail}
              </span>
            </div>

            {/* ✅ Content (rich text) */}
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ✅ Extra Images / Links */}
            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {post.images.map((item, idx) =>
                  isImageUrl(item) ? (
                    <img
                      key={idx}
                      src={item}
                      alt={`Post image ${idx}`}
                      className="w-full h-64 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <a
                      key={idx}
                      href={item}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-words"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            )}

            {/* Keywords */}
            {post.keywords && (
              <div className="mt-6">
                <h3 className="text-sm text-gray-500 font-semibold mb-1">Keywords:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.split(',').map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
                    >
                      {kw.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ) : (
          <div className="text-gray-500 mt-20">Post not found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewPost;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const ViewPost = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/posts");
//         if (!res.ok) throw new Error('Failed to fetch posts');
//         const data = await res.json();
//         const found = data.find((p) => p._id === id);
//         setPost(found);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   return (
//     <>
//       <Navbar />
//       <div className=" bg-gray-50 flex flex-col items-center py-10 px-4">
//         {loading ? (
//           <div className="text-lg text-blue-600 font-semibold animate-pulse mt-20">
//             Loading...
//           </div>
//         ) : error ? (
//           <div className="text-red-500 mt-20">Error: {error}</div>
//         ) : post ? (
          
//           <article className="w-full  mx-auto p-2">
            
//             {/* Title */}
//             <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-snug">
//               {post.title}
//             </h1>

//             {/* Thumbnail */}
//             {post.thumbnail && (
//               <img
//                 src={post.thumbnail}
//                 alt={post.title}
//                 className="w-full h-72 md:h-96 object-cover rounded-2xl shadow mb-6"
//               />
//             )}

//             {/* Category + Date */}
//             <div className="flex items-center justify-between mb-4">
//               <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//                 {post.category}
//               </span>
//               <span className="text-sm text-gray-500">
//                 {post.createdAt
//                   ? new Date(post.createdAt).toLocaleDateString()
//                   : ''}
//               </span>
//             </div>


//             {/* Subtitle */}
//             {post.subtitle && (
//               <p className="text-lg text-gray-600 mb-4 italic border-l-4 border-indigo-500 pl-4">
//                 {post.subtitle}
//               </p>
//             )}

//             {/* Author */}
//             <div className="flex items-center gap-2 mb-6">
//               <div className="w-max  h-full rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">
//                <span className='hidden'>{post.author }</span> 
//               </div>
//               <span className="text-sm hidden text-gray-700 font-medium">
//                  {post.authorGmail }
//               </span>
//             </div>

//             {/* Content */}
//             <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8">
//               {post.content}
//             </div>

//             {/* Keywords */}
//             {post.keywords && (
//               <div className="mt-6">
//                 <h3 className="text-sm text-gray-500 font-semibold mb-1">Keywords:</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {post.keywords.split(',').map((kw, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
//                     >
//                       {kw.trim()}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </article>
//         ) : (
//           <div className="text-gray-500 mt-20">Post not found.</div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ViewPost;
