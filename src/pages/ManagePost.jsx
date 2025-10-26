// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import DashboardLayout from './DashboardLayout';
// // import Spinner from '../components/Spinner';
// // import { CiEdit } from "react-icons/ci";
// // import { RiDeleteBin2Line } from "react-icons/ri";

// // const ManagePost = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const userEmail = localStorage.getItem('authEmail');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       setLoading(true);
// //       setError('');
// //       try {
// //         const res = await fetch('https://blog-website-backend-wcn7.onrender.com/api/posts');
// //         const data = await res.json();
// //         if (res.ok) {
// //           setPosts(data.filter(post => post.authorGmail === userEmail));
// //         } else {
// //           setError(data.error || 'Failed to fetch posts.');
// //         }
// //       } catch (err) {
// //         setError('Error connecting to backend.');
// //       }
// //       setLoading(false);
// //     };
// //     fetchPosts();
// //   }, [userEmail]);

// //   const handleEdit = (post) => {

// //     navigate('/post', { state: { editPost: post } });
// //     setEditPost(post._id);
// //     setEditForm({ ...post });
// //   };

// //   const handleEditChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleEditSave = async () => {
// //     try {
// //       const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts${editPost}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(editForm)
// //       });
// //       const data = await res.json();
// //       if (res.ok) {
// //         setPosts(posts.map(p => (p._id === editPost ? { ...editForm, _id: editPost } : p)));
// //         setEditPost(null);
// //       } else {
// //         alert(data.error || 'Failed to update post.');
// //       }
// //     } catch (err) {
// //       alert('Error connecting to backend.');
// //     }

// //   };


// //   const handleDelete = async (id) => {
// //   if (!window.confirm('Are you sure you want to delete this post?')) return;
// //   try {
// //     const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${id}`, {
// //       method: 'DELETE'
// //     });

// //     if (res.ok) {
// //       setPosts(posts.filter(p => p._id !== id));
// //     } else {
// //       const data = await res.json();
// //       alert(data.error || 'Failed to delete post.');
// //     }
// //   } catch (err) {
// //     alert('Error connecting to backend.');
// //   }
// // };

// //   return (
// //     <DashboardLayout>
// //       <div className='p-6'>
// //         <h1 className="text-2xl font-bold text-gray-800 mb-6">
// //           Manage your Blog Posts!
// //         </h1>
// //         <div className="w-full mx-auto rounded border border-gray-200">
// //           {loading ? (
// //             <div className="text-center text-gray-500"><Spinner /></div>
// //           ) : error ? (
// //             <div className="text-center text-red-500">{error}</div>
// //           ) : posts.length === 0 ? (
// //             <div className="text-center text-gray-500">No posts found for your account.</div>
// //           ) : (
// //             <div className="overflow-x-auto">
// //               <table className="w-full bg-white  rounded-md border-gray-200">
// //                 <thead>
// //                   <tr className='border-gray-200'>
// //                     <th className="px-2 py-2 border-b border-gray-200">Title</th>
// //                     <th className="px-2 py-2 border-b border-gray-200">Category</th>
// //                     <th className="px-2 py-2 border-b border-gray-200">Date</th>
// //                     <th className="px-4 py-2 border-b border-gray-200">Description</th>
// //                     <th className="px-2 py-2 border-b border-gray-200">Keywords</th>
// //                     <th className="px-2 py-2 border-b border-gray-200">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className='border-gray-200'>
// //                   {posts.map(post => (
// //                     <tr key={post._id} className='border-gray-200'>
// //                       <td className="px-2 py-2 border-b text-sm border-gray-200">{post.title}</td>
// //                       <td className="px-2 py-2 border-b text-sm border-gray-200">{post.category}</td>
// //                       <td className="px-2 py-2 border-b text-sm border-gray-200">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</td>
// //                       <td className="px-2 py-2 border-b text-sm border-gray-200">{post.content.replace(/<[^>]+>/g, '').length > 50 ? post.content.substring(0, 50) + "..." : post.content}</td>
// //                       <td className="px-2 py-2 border-b text-sm border-gray-200">{post.keywords}</td>
// //                       <td className="px-2 py-2 border-b border-gray-200">
// //                         <button 
// //                           onClick={() => handleEdit(post)} 
// //                           className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
// //                         >
// //                           <CiEdit />
// //                         </button>
// //                         <button 
// //                           onClick={() => handleDelete(post._id)} 
// //                           className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
// //                         >
// //                           <RiDeleteBin2Line />
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // };

// // export default ManagePost;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "./DashboardLayout";
// import Spinner from "../components/Spinner";
// import { CiEdit } from "react-icons/ci";
// import { RiDeleteBin2Line } from "react-icons/ri";

// const ManagePost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editPost, setEditPost] = useState(null);
//   const [editForm, setEditForm] = useState({});
//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("authEmail");
//   const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ detect admin

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
//         const data = await res.json();

//         if (!res.ok) {
//           setError(data.error || "Failed to fetch posts.");
//           setLoading(false);
//           return;
//         }

//         // ✅ Admin sees all posts, user sees only their own
//         const filteredPosts = isAdmin
//           ? data
//           : data.filter((post) => post.authorGmail === userEmail);

//         setPosts(filteredPosts);
//       } catch (err) {
//         setError("Error connecting to backend.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [userEmail, isAdmin]);

//   const handleEdit = (post) => {
//     navigate("/post", { state: { editPost: post } });
//     setEditPost(post._id);
//     setEditForm({ ...post });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async () => {
//     try {
//       const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${editPost}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editForm),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setPosts(
//           posts.map((p) =>
//             p._id === editPost ? { ...editForm, _id: editPost } : p
//           )
//         );
//         setEditPost(null);
//       } else {
//         alert(data.error || "Failed to update post.");
//       }
//     } catch (err) {
//       alert("Error connecting to backend.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     try {
//       const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${id}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         setPosts(posts.filter((p) => p._id !== id));
//       } else {
//         const data = await res.json();
//         alert(data.error || "Failed to delete post.");
//       }
//     } catch (err) {
//       alert("Error connecting to backend.");
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">
//           {isAdmin ? "Manage All Blog Posts 👑" : "Manage Your Blog Posts"}
//         </h1>

//         <div className="w-full mx-auto rounded border border-gray-200">
//           {loading ? (
//             <div className="text-center text-gray-500">
//               <Spinner />
//             </div>
//           ) : error ? (
//             <div className="text-center text-red-500">{error}</div>
//           ) : posts.length === 0 ? (
//             <div className="text-center text-gray-500">
//               {isAdmin
//                 ? "No posts found in the system."
//                 : "No posts found for your account."}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full bg-white rounded-md border-gray-200">
//                 <thead>
//                   <tr className="border-gray-200">
//                     <th className="px-2 py-2 border-b border-gray-200">Title</th>
//                     <th className="px-2 py-2 border-b border-gray-200">Category</th>
//                     <th className="px-2 py-2 border-b border-gray-200">Date</th>
//                     <th className="px-4 py-2 border-b border-gray-200">Description</th>
//                     <th className="px-2 py-2 border-b border-gray-200">Keywords</th>
//                     {isAdmin && (
//                       <th className="px-2 py-2 border-b border-gray-200">Author</th>
//                     )}
//                     <th className="px-2 py-2 border-b border-gray-200">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="border-gray-200">
//                   {posts.map((post) => (
//                     <tr key={post._id} className="border-gray-200">
//                       <td className="px-2 py-2 border-b text-sm border-gray-200">
//                         {post.title}
//                       </td>
//                       <td className="px-2 py-2 border-b text-sm border-gray-200">
//                         {post.category}
//                       </td>
//                       <td className="px-2 py-2 border-b text-sm border-gray-200">
//                         {post.createdAt
//                           ? new Date(post.createdAt).toLocaleDateString()
//                           : ""}
//                       </td>
//                       <td className="px-2 py-2 border-b text-sm border-gray-200">
//                         {post.content.replace(/<[^>]+>/g, "").length > 50
//                           ? post.content.substring(0, 50) + "..."
//                           : post.content}
//                       </td>
//                       <td className="px-2 py-2 border-b text-sm border-gray-200">
//                         {post.keywords}
//                       </td>
//                       {isAdmin && (
//                         <td className="px-2 py-2 border-b text-sm border-gray-200">
//                           {post.authorGmail || "Unknown"}
//                         </td>
//                       )}
//                       <td className="px-2 py-2 border-b border-gray-200 text-center">
//                         <button
//                           onClick={() => handleEdit(post)}
//                           className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                         >
//                           <CiEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(post._id)}
//                           className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                         >
//                           <RiDeleteBin2Line />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default ManagePost;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Spinner from "../components/Spinner";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("authEmail");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch posts.");
          setLoading(false);
          return;
        }

        const filteredPosts = isAdmin
          ? data
          : data.filter((post) => post.authorGmail === userEmail);

        setPosts(filteredPosts);
      } catch (err) {
        setError("Error connecting to backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userEmail, isAdmin]);

  const handleEdit = (post) => {
    navigate("/post", { state: { editPost: post } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete post.");
      }
    } catch (err) {
      alert("Error connecting to backend.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              {isAdmin ? "Manage All Blog Posts 👑" : "Manage Your Blog Posts"}
            </h1>
            <p className="text-gray-500 mt-1">
              {isAdmin
                ? "View, edit, or remove any post from the system."
                : "Manage your published blog posts below."}
            </p>
          </div>
          <button
            onClick={() => navigate("/post")}
            className="bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold px-5 py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-600 transition"
          >
            ➕ Create New Post
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center text-gray-500 py-20">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">
            {isAdmin
              ? "No posts found in the system."
              : "No posts found for your account."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Thumbnail */}
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No Image
                  </div>
                )}

                <div className="flex flex-col flex-grow p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
                      {post.category || "Uncategorized"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.content.replace(/<[^>]+>/g, "").substring(0, 100)}...
                  </p>

                  {/* Keywords */}
                  {post.keywords && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.keywords
                        .split(",")
                        .slice(0, 3)
                        .map((kw, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{kw.trim()}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Author info for admin */}
                  {isAdmin && (
                    <div className="text-xs text-gray-500 mb-3">
                      Author:{" "}
                      <span className="font-medium text-gray-700">
                        {post.authorGmail || "Unknown"}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-3">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition"
                    >
                      <CiEdit className="text-xl" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="flex items-center gap-1 text-red-600 font-medium hover:text-red-800 transition"
                    >
                      <RiDeleteBin2Line className="text-xl" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagePost;
