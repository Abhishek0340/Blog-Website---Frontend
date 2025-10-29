

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Spinner from "../components/Spinner";

// // Function to auto-convert image URLs into <img> tags
// function imageifyHtml(html) {
//   if (!html) return "";
//   const imgUrlRegex = /((https?:\/\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp|svg)))/gi;
//   return html.replace(
//     imgUrlRegex,
//     (url) =>
//       `<img src="${url}" alt="image" style="max-width:100%;margin:12px 0;border-radius:12px;box-shadow:0 2px 8px #0001;" />`
//   );
// }

// const ViewPost = () => {
//   const { id, blogName } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // ✅ Detect if current user is admin
//     setIsAdmin(localStorage.getItem("isAdmin") === "true");

//     const fetchPost = async () => {
//       try {
//         const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
//         if (!res.ok) throw new Error("Failed to fetch posts");
//         const data = await res.json();

//         const found = data.find((p) => p._id === id);
//         if (!found) throw new Error("Post not found");
//         setPost(found);

//         // Related posts by category
//         if (found && found.category) {
//           const relatedArticles = data.filter(
//             (p) => p.category === found.category && p._id !== id
//           );
//           setRelated(relatedArticles);
//         }

//         // Generate SEO-friendly slug if missing
//         if (!blogName && found) {
//           const blogNameSlug = (found.blogName || found.title || "")
//             .toLowerCase()
//             .replace(/[^a-z0-9]+/g, "-")
//             .replace(/^-+|-+$/g, "");
//           navigate(`/viewpost/${id}/${blogNameSlug}`, { replace: true });
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id, blogName, navigate]);

//   // ✅ Delete post (Admin only)
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     try {
//       const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         alert("Post deleted successfully.");
//         navigate("/admin/dashboard");
//       } else {
//         const data = await res.json();
//         alert(data.error || "Failed to delete post.");
//       }
//     } catch (err) {
//       alert("Error deleting post. Please try again.");
//     }
//   };

//   // ✅ Edit post (Admin or author)
//   const handleEdit = () => {
//     navigate("/post", { state: { editPost: post } });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-50 flex flex-col items-center mb-10 px-4">
//         {loading ? (
//           <Spinner />
//         ) : error ? (
//           <div className="text-red-500 mt-20">Error: {error}</div>
//         ) : post ? (
//           <div className="w-full flex flex-col md:flex-row gap-8 mx-auto max-w-6xl">
//             {/* ===== Main Article ===== */}
//             <article className="flex-1 p-2">
//               {/* Title */}
//               <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-snug">
//                 {post.title}
//               </h1>

//               {/* Admin Controls */}
//               {isAdmin && (
//                 <div className="flex gap-3 mb-4">
//                   <button
//                     onClick={handleEdit}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     ✏️ Edit Post
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     🗑️ Delete Post
//                   </button>
//                 </div>
//               )}

//               {/* Thumbnail */}
//               {post.thumbnail && (
//   <div className="w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden shadow mb-6">
//     <img
//       src={post.thumbnail}
//       alt={post.title}
//       className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
//     />
//   </div>
// )}
//               {/* Category + Date */}
//               <div className="flex items-center justify-between mb-4">
//                 <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//                   {post.category}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   {post.createdAt
//                     ? new Date(post.createdAt).toLocaleDateString()
//                     : ""}
//                 </span>
//               </div>

//               {/* Subtitle */}
//               {post.subtitle && (
//                 <p className="text-lg text-gray-600 mb-4 italic border-l-4 border-indigo-500 pl-4">
//                   {post.subtitle}
//                 </p>
//               )}

//               {/* Author */}
//               <div className="flex items-center gap-2 mb-6">
//                 <div className="w-max h-full rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">
//                   <span className="hidden">{post.author}</span>
//                 </div>
//                 <span className="text-sm hidden text-gray-700 font-medium">
//                   {post.authorGmail}
//                 </span>
//               </div>

//               {/* Content */}
//               <div
//                 className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8"
//                 dangerouslySetInnerHTML={{
//                   __html: imageifyHtml(post.content),
//                 }}
//               />

//               {/* Extra Images */}
//               {post.images && post.images.length > 0 && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//                   {post.images.map((item, idx) => (
//                     <img
//                       key={idx}
//                       src={item}
//                       alt={`extra-img-${idx}`}
//                       className="w-full rounded-xl shadow"
//                       style={{
//                         maxHeight: 320,
//                         objectFit: "contain",
//                         background: "#fff",
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* Keywords */}
//               {post.keywords && (
//                 <div className="mt-6">
//                   <h3 className="text-sm text-gray-500 font-semibold mb-1">
//                     Keywords:
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {post.keywords.split(",").map((kw, i) => (
//                       <span
//                         key={i}
//                         className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
//                       >
//                         {kw.trim()}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </article>

//             {/* ===== Related Articles Sidebar ===== */}
//             <aside className="w-full md:w-80 flex-shrink-0">
//               <div className="sticky top-24">
//                 <h2 className="text-lg font-bold mb-4 text-gray-800">
//                   Related Articles
//                 </h2>
//                 <div className="flex flex-col gap-4">
//                   {related.length === 0 && (
//                     <div className="text-gray-500 text-sm">
//                       No related articles found.
//                     </div>
//                   )}
//                   {related.map((item) => (
//                     <div
//                       key={item._id}
//                       className="flex gap-3 items-center bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition"
//                       onClick={() =>
//                         navigate(
//                           `/viewpost/${item._id}/${(item.blogName || item.title || "")
//                             .toLowerCase()
//                             .replace(/[^a-z0-9]+/g, "-")
//                             .replace(/^-+|-+$/g, "")}`
//                         )
//                       }
//                     >
//                       {item.thumbnail && (
//                         <img
//                           src={item.thumbnail}
//                           alt={item.title}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       )}
//                       <span className="text-sm font-semibold text-gray-700 line-clamp-2">
//                         {item.title}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </aside>
//           </div>
//         ) : (
//           <div className="text-gray-500 mt-20">Post not found.</div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ViewPost;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

function imageifyHtml(html) {
  if (!html) return "";
  const imgUrlRegex = /((https?:\/\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp|svg)))/gi;
  return html.replace(
    imgUrlRegex,
    (url) =>
      `<img src="${url}" alt="image" style="max-width:100%;margin:18px 0;border-radius:16px;box-shadow:0 3px 12px #0002;" />`
  );
}

const ViewPost = () => {
  const { id, blogName } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");

    const fetchPost = async () => {
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        const found = data.find((p) => p._id === id);
        if (!found) throw new Error("Post not found");
        setPost(found);

        if (found && found.category) {
          const relatedArticles = data.filter(
            (p) => p.category === found.category && p._id !== id
          );
          setRelated(relatedArticles);
        }

        if (!blogName && found) {
          const slug = (found.blogName || found.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          navigate(`/viewpost/${id}/${slug}`, { replace: true });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, blogName, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Post deleted successfully.");
        navigate("/admin/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete post.");
      }
    } catch {
      alert("Error deleting post. Please try again.");
    }
  };

  const handleEdit = () => navigate("/post", { state: { editPost: post } });

  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center  ">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500 text-lg font-semibold mt-20">{error}</div>
        ) : post ? (
          <div className="w-full flex flex-col md:flex-row gap-1">
            {/* ===== Main Article ===== */}
            <article className="flex-1 bg-white  shadow-[0_4px_40px_rgba(0,0,0,0.06)]  md:p-12">
              {/* Title */}
              <h1 className="text-xl md:text-3xl font-['Playfair_Display'] font-bold mb-5 text-gray-900 leading-snug tracking-tight">
                {post.title}
              </h1>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={handleEdit}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}

              {/* Thumbnail */}
              {post.thumbnail && (
                <div className="w-full aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden shadow-lg mb-8">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </div>
              )}

              {/* Category + Date */}
              <div className="flex justify-between items-center mb-6">
                <span className="bg-gradient-to-r hidden from-gray-900 to-gray-700 text-white text-xs uppercase tracking-wide px-4 py-1.5 rounded-full shadow-sm">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500 font-medium italic">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>

              {/* Subtitle */}
              {post.subtitle && (
                <p className="text-lg text-gray-600 mb-6 italic border-l-4 border-indigo-500 pl-5 font-['Inter']">
                  {post.subtitle}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center mb-10 text-gray-700 text-sm font-medium">
                <span className="text-gray-400">By</span>&nbsp;
                {post.authorGmail || "Unknown Author"}
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-['Inter'] tracking-wide"
                dangerouslySetInnerHTML={{
                  __html: imageifyHtml(post.content),
                }}
              />

              {/* Extra Images */}
              {post.images?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                  {post.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`extra-${i}`}
                      className="w-full rounded-2xl shadow-md bg-white object-contain"
                      style={{ maxHeight: 320 }}
                    />
                  ))}
                </div>
              )}

              {/* Keywords */}
              {post.keywords && (
                <div className="mt-10">
                  <h3 className="text-sm text-gray-500 font-semibold mb-3 uppercase tracking-wide">
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.split(",").map((kw, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ===== Related Articles ===== */}
            <aside className="w-full md:w-80 flex-shrink-0">
              <div className=" top-24    p-6">
                <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-5 text-gray-900 border-b border-gray-200 pb-2">
                  Related Articles
                </h2>

                <div className="flex flex-col gap-5">
                  {related.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">
                      No related articles found.
                    </p>
                  ) : (
                    related.map((item) => (
                      <div
                        key={item._id}
                        onClick={() =>
                          navigate(
                            `/viewpost/${item._id}/${(item.blogName || item.title || "")
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/^-+|-+$/g, "")}`
                          )
                        }
                        className="group flex gap-4 items-center   p-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        {item.thumbnail && (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600">
                            {item.title}
                          </h4>
                          <p className="text-xs hidden text-gray-500 mt-1 font-['Inter']">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="text-gray-500 mt-20">Post not found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewPost;
