// import React, { useState, useRef, useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import { useLocation, useNavigate } from 'react-router-dom';
// import DashboardLayout from './DashboardLayout';
// import JoditEditor from "jodit-react";

// const initialState = {
//   blogName: '',
//   subtitle: '',
//   description: '',
//   keywords: '',
//   authorName: '',
//   authorGmail: '',
//   category: '',
//   date: '',
//   thumbnail: '',
//   images: [],
// };

// const categories = ['Nature', 'Travel', 'Science', 'Technology'];

// const Post = () => {
//   const [form, setForm] = useState(initialState);
//   const [thumbFile, setThumbFile] = useState(null);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editPostId, setEditPostId] = useState(null);
//   const editorRef = useRef(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const email = localStorage.getItem('authEmail');
//     const today = new Date().toISOString().split('T')[0];

//     if (email) {
//       fetch(`https://blog-website-backend-wcn7.onrender.com/api/userinfo?email=${email}`)
//         .then(res => res.json())
//         .then(data => {
//           if (!data.error && !(location.state && location.state.editPost)) {
//             setForm(prev => ({
//               ...prev,
//               authorName: data.username || '',
//               authorGmail: data.email || email,
//               date: today
//             }));
//           }
//         })
//         .catch(err => console.error("Error fetching user info:", err));
//     }

//     if (location.state && location.state.editPost) {
//       const post = location.state.editPost;
//       setIsEditing(true);
//       setEditPostId(post._id);

//       setForm({
//         blogName: post.title || '',
//         subtitle: post.subtitle || '',
//         description: post.content || '',
//         keywords: post.keywords || '',
//         authorName: post.author || '',
//         authorGmail: post.authorGmail || email || '',
//         category: post.category || '',
//         date: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : today,
//         thumbnail: post.thumbnail || '',
//         images: post.images || [],
//       });
//     }
//   }, [location.state]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditorChange = (newContent) => {
//     const words = newContent.replace(/<[^>]+>/g, '')
//       .split(/\s+/)
//       .filter(w => w.length > 3)
//       .slice(0, 20);

//     setForm(prev => ({
//       ...prev,
//       description: newContent,
//       keywords: prev.keywords || words.join(', ')
//     }));
//   };

//   const handleThumbChange = e => {
//     const file = e.target.files[0];
//     setThumbFile(file);
//     setForm(prev => ({ ...prev, thumbnail: file ? URL.createObjectURL(file) : '' }));
//   };

//   const handleImagesChange = e => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);
//     setForm(prev => ({
//       ...prev,
//       images: [
//         ...files.map(f => URL.createObjectURL(f)),
//         ...((prev.imageUrls || '').split(/\n|,/).map(u => u.trim()).filter(Boolean))
//       ]
//     }));
//   };

//   const handleImageUrlsChange = e => {
//     const value = e.target.value;
//     setForm(prev => ({
//       ...prev,
//       imageUrls: value,
//       images: [
//         ...imageFiles.map(f => URL.createObjectURL(f)),
//         ...value.split(/\n|,/).map(u => u.trim()).filter(Boolean)
//       ]
//     }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const postData = {
//       title: form.blogName,
//       content: form.description,
//       author: form.authorName,
//       category: form.category,
//       createdAt: form.date,
//       thumbnail: form.thumbnail,
//       images: form.images,
//       keywords: form.keywords,
//       subtitle: form.subtitle,
//       authorGmail: form.authorGmail,
//     };

//     try {
//       let res;
//       if (isEditing) {
//         res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${editPostId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(postData),
//         });
//       } else {
//         res = await fetch('https://blog-website-backend-wcn7.onrender.com/api/posts', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(postData),
//         });
//       }

//       const data = await res.json();

//       if (res.ok) {
//         alert(isEditing ? 'Blog post updated successfully!' : 'Blog post submitted!');
//         if (isEditing) {
//           navigate('/managepost');
//         } else {
//           setForm(initialState);
//           if (editorRef.current) editorRef.current.value = '';
//           setThumbFile(null);
//           setImageFiles([]);
//         }
//       } else {
//         alert(data.error || `Failed to ${isEditing ? 'update' : 'submit'} post.`);
//       }
//     } catch (err) {
//       alert('Error connecting to backend.');
//     }
//   };

//   const handleCancel = () => {
//     if (isEditing) {
//       navigate('/managepost');
//     } else {
//       setForm(initialState);
//       if (editorRef.current) editorRef.current.value = '';
//       setThumbFile(null);
//       setImageFiles([]);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{isEditing ? 'Edit Post' : 'Create a Post'} | trendyblogs</title>
//         <meta name="description" content={isEditing ? 'Edit your blog post on trendyblogs.' : 'Create and share your blog post on trendyblogs. Add title, description, category, and images.'} />
//       </Helmet>
//       <DashboardLayout>
//         <div className='p-6'>
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             {isEditing ? 'Edit Blog Post' : 'Create a New Blog Post'}
//           </h1>
//           <div className="w-full max-w-7xl mx-auto rounded border p-4 border-gray-200 ">
//             <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

//               {/* Blog Name */}
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700" htmlFor="blogName">Blog Name</label>
//                 <input
//                   type="text"
//                   id="blogName"
//                   name="blogName"
//                   value={form.blogName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
//                   required
//                   placeholder='Enter Blog Name..'
//                 />
//               </div>

//               {/* Subtitle */}
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700" htmlFor="subtitle">Subtitle</label>
//                 <input
//                   type="text"
//                   id="subtitle"
//                   name="subtitle"
//                   value={form.subtitle}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
//                   placeholder='Enter Blog Subtitle..'
//                 />
//               </div>

//               {/* Rich Text Editor */}
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700">Description</label>
//                 <JoditEditor 
//                   ref={editorRef}
//                   value={form.description}
//                   tabIndex={1}
//                   config={{
//                     readonly: false,
//                     height: 300,
//                     toolbarSticky: true,
//                     askBeforePasteHTML: false,
//                     buttons: [
//                       "bold","italic","underline","strikethrough","|",
//                       "align","font","fontsize","brush","|",
//                       "ul","ol","outdent","indent","|",
//                       "link","unlink","image","video","table","hr","eraser","undo","redo","fullsize","source",
//                     ],
//                     uploader: { insertImageAsBase64URI: true },
//                   }}
//                   onBlur={newContent => handleEditorChange(newContent)} // stable typing
//                 />
//               </div>

//               {/* Keywords */}
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700" htmlFor="keywords">Keywords</label>
//                 <input
//                   type="text"
//                   id="keywords"
//                   name="keywords"
//                   value={form.keywords}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
//                   placeholder="e.g. travel, adventure, nature"
//                 />
//               </div>

//               {/* Author, Category */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="">
//                   <label className="block font-semibold mb-2 text-gray-700" htmlFor="authorName">Author Name</label>
//                   <input
//                     type="text"
//                     id="authorName"
//                     name="authorName"
//                     value={form.authorName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
//                     required
//                     placeholder='Enter Your Name..'
//                     readOnly
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2 text-gray-700" htmlFor="category">Category</label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
//                     required
//                   >
//                     <option value="">Select category</option>
//                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                   </select>
//                 </div>
//               </div>

//               <div className="hidden">
//                 <label className="block font-semibold mb-2 text-gray-700" htmlFor="date">Date</label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={form.date}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
//                   required
//                 />
//               </div>

//               {/* Thumbnail */}
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700">Thumbnail</label>
//                 <input type="file" accept="image/*" onChange={handleThumbChange} className="mb-2" />
//                 <input
//                   type="url"
//                   placeholder="Or paste image URL"
//                   value={form.thumbnail}
//                   name="thumbnail"
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//                 {form.thumbnail && <img src={form.thumbnail} alt="Thumbnail" className="mt-2 rounded-lg w-32 h-20 object-cover" />}
//               </div>

//               {/* Other Images */}
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700">Other Related Images</label>
//                 <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="mb-2" />
//                 <textarea
//                   placeholder="Paste image URLs here, separated by comma or new line"
//                   value={form.imageUrls || ''}
//                   onChange={handleImageUrlsChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
//                   rows={2}
//                 />
//                 <div className="flex flex-wrap gap-3 mt-3">
//                   {form.images.map((img, idx) => <img key={idx} src={img} alt={`Related ${idx}`} className="rounded-lg w-24 h-16 object-cover" />)}
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   className="mt-2 px-6 py-2 cursor-pointer bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg text-lg tracking-wide"
//                 >
//                   {isEditing ? 'Update Blog' : 'Submit Blog'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="mt-2 px-6 py-2 cursor-pointer bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-600 transition shadow-lg text-lg tracking-wide"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </DashboardLayout>
//     </>
//   );
// };

// export default Post;


import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import JoditEditor from "jodit-react";

const initialState = {
  blogName: '',
  subtitle: '',
  description: '',
  keywords: '',
  authorName: '',
  authorGmail: '',
  category: '',
  date: '',
  thumbnail: '',
  images: [],
};

const categories = ['Nature', 'Travel', 'Science', 'Technology'];

const Post = () => {
  const [form, setForm] = useState(initialState);
  const [thumbFile, setThumbFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const editorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('authEmail');
    const today = new Date().toISOString().split('T')[0];

    if (email) {
      fetch(`https://blog-website-backend-wcn7.onrender.com/api/userinfo?email=${email}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error && !(location.state && location.state.editPost)) {
            setForm(prev => ({
              ...prev,
              authorName: data.username || '',
              authorGmail: data.email || email,
              date: today
            }));
          }
        })
        .catch(err => console.error("Error fetching user info:", err));
    }

    if (location.state && location.state.editPost) {
      const post = location.state.editPost;
      setIsEditing(true);
      setEditPostId(post._id);

      setForm({
        blogName: post.title || '',
        subtitle: post.subtitle || '',
        description: post.content || '',
        keywords: post.keywords || '',
        authorName: post.author || '',
        authorGmail: post.authorGmail || email || '',
        category: post.category || '',
        date: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : today,
        thumbnail: post.thumbnail || '',
        images: post.images || [],
      });
    }
  }, [location.state]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = newContent => {
    const words = newContent.replace(/<[^>]+>/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3)
      .slice(0, 20);

    setForm(prev => ({
      ...prev,
      description: newContent,
      keywords: prev.keywords || words.join(', ')
    }));
  };

  const handleThumbChange = e => {
    const file = e.target.files[0];
    setThumbFile(file);
    setForm(prev => ({ ...prev, thumbnail: file ? URL.createObjectURL(file) : '' }));
  };

  const handleImagesChange = e => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setForm(prev => ({
      ...prev,
      images: [
        ...files.map(f => URL.createObjectURL(f)),
        ...((prev.imageUrls || '').split(/\n|,/).map(u => u.trim()).filter(Boolean))
      ]
    }));
  };

  const handleImageUrlsChange = e => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      imageUrls: value,
      images: [
        ...imageFiles.map(f => URL.createObjectURL(f)),
        ...value.split(/\n|,/).map(u => u.trim()).filter(Boolean)
      ]
    }));
  };

  // 🧠 AI Auto-generate blog content
  const handleAIGenerate = async () => {
    if (!form.blogName) {
      alert("Please enter a topic or blog name first!");
      return;
    }
    setLoadingAI(true);
    try {
      const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: form.blogName }),
      });
      const data = await res.json();

      if (res.ok) {
        const titleMatch = data.text.match(/Title:\s*(.*)/i);
        const subtitleMatch = data.text.match(/Subtitle:\s*(.*)/i);
        const descMatch = data.text.match(/Description:\s*([\s\S]*)/i);
        const keywordsMatch = data.text.match(/Keywords:\s*(.*)/i);

        setForm(prev => ({
          ...prev,
          blogName: titleMatch ? titleMatch[1].trim() : prev.blogName,
          subtitle: subtitleMatch ? subtitleMatch[1].trim() : prev.subtitle,
          description: descMatch ? descMatch[1].trim() : prev.description,
          keywords: keywordsMatch ? keywordsMatch[1].trim() : prev.keywords,
          thumbnail: data.thumbnailUrl || prev.thumbnail,
        }));
        alert("AI content generated successfully!");
      } else {
        alert(data.error || "AI generation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating blog content");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const postData = {
      title: form.blogName,
      content: form.description,
      author: form.authorName,
      category: form.category,
      createdAt: form.date,
      thumbnail: form.thumbnail,
      images: form.images,
      keywords: form.keywords,
      subtitle: form.subtitle,
      authorGmail: form.authorGmail,
    };

    try {
      let res;
      if (isEditing) {
        res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${editPostId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
      } else {
        res = await fetch('https://blog-website-backend-wcn7.onrender.com/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
      }

      const data = await res.json();

      if (res.ok) {
        alert(isEditing ? 'Blog updated successfully!' : 'Blog submitted!');
        navigate(isEditing ? '/managepost' : '/');
      } else {
        alert(data.error || "Failed to submit post");
      }
    } catch (err) {
      alert("Error connecting to backend");
    }
  };

  const handleCancel = () => {
    if (isEditing) navigate('/managepost');
    else setForm(initialState);
  };

  return (
    <>
      <Helmet>
        <title>{isEditing ? "Edit Blog Post" : "Create a New Blog Post"} | trendyblogs</title>
        <meta
          name="description"
          content={
            isEditing
              ? "Edit your existing blog post on trendyblogs. Update content, categories, thumbnails, and keywords easily."
              : "Create and publish your own blog on trendyblogs. Add title, subtitle, content, category, images, and more to share your story."
          }
        />
        <meta
          name="keywords"
          content="create blog, edit blog, trendyblogs, write blog, post editor, blogging platform, publish article"
        />
        <meta property="og:title" content={isEditing ? "Edit Blog Post | trendyblogs" : "Create a New Blog Post | trendyblogs"} />
        <meta
          property="og:description"
          content={
            isEditing
              ? "Update your blog post content, images, and metadata on trendyblogs."
              : "Start blogging on trendyblogs — create and share your own posts across multiple categories."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/post" />
      </Helmet>

      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {isEditing ? 'Edit Blog Post' : 'Create a New Blog Post'}
          </h1>
          <div className="w-full max-w-7xl mx-auto rounded border p-4 border-gray-200">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

              {/* Blog Name */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Blog Name / Topic</label>
                <input
                  type="text"
                  name="blogName"
                  value={form.blogName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter blog topic..."
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleAIGenerate}
                disabled={loadingAI}
                className={`hidden px-6 py-2 font-semibold rounded-xl text-white transition ${loadingAI ? 'bg-gray-400 cursor-wait' : 'bg-green-700 hover:bg-green-800'
                  }`}
              >
                {loadingAI ? 'Generating...' : '✨ Auto-Generate Blog'}
              </button>

              {/* Subtitle */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Editor */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Description</label>
                <JoditEditor
                  ref={editorRef}
                  value={form.description}
                  tabIndex={1}
                  onBlur={handleEditorChange}
                  config={{ height: 300 }}
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={form.keywords}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Author, Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    value={form.authorName}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Thumbnail</label>
                <input type="file" accept="image/*" onChange={handleThumbChange} className="mb-2" />
                <input
                  type="url"
                  placeholder="Or paste image URL"
                  value={form.thumbnail}
                  name="thumbnail"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {form.thumbnail && (
                  <img src={form.thumbnail} alt="Thumbnail" className="mt-2 rounded-lg w-32 h-20 object-cover" />
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 font-bold"
                >
                  {isEditing ? 'Update Blog' : 'Submit Blog'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Post;
