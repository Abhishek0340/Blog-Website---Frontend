import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from "react-helmet";
import DashboardLayout from './DashboardLayout';


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

const categories = ['Nature', 'Travel', 'Science'];

const Post = () => {
  const [form, setForm] = useState(initialState);
  const [thumbFile, setThumbFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const editorRef = useRef();

  useEffect(() => {
    const email = localStorage.getItem('authEmail');
    if (email) setForm(prev => ({ ...prev, authorGmail: email }));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = () => {
    const html = editorRef.current.innerHTML;
    const words = html.replace(/<[^>]+>/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3)
      .slice(0, 20);
    setForm(prev => ({ ...prev, description: html, keywords: words.join(', ') }));
  };

  // Toggle formatting
  const execCommand = (command) => {
    if (command === "bold" || command === "italic" || command === "underline") {
      const isActive = document.queryCommandState(command);
      document.execCommand(command, false, null); 
    } else {
      document.execCommand(command, false, null);
    }
  };

  const handleThumbChange = e => {
    const file = e.target.files[0];
    setThumbFile(file);
    setForm(prev => ({ ...prev, thumbnail: file ? URL.createObjectURL(file) : '' }));
  };

  const handleImagesChange = e => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setForm(prev => ({ ...prev, images: files.map(f => URL.createObjectURL(f)) }));
  };

  const handleImageUrlAdd = () => {
    const url = prompt('Enter image URL:');
    if (url) setForm(prev => ({ ...prev, images: [...prev.images, url] }));
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
      authorGmail: form.authorGmail
    };

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Blog post submitted!');
        setForm(initialState);
        editorRef.current.innerHTML = '';
        setThumbFile(null);
        setImageFiles([]);
      } else alert(data.error || 'Failed to submit post.');
    } catch {
      alert('Error connecting to backend.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Create a Post | Blog Website</title>
        <meta name="description" content="Create and share your blog post on Blog Website. Add title, description, category, and images." />
      </Helmet>

      <DashboardLayout>
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded p-10 mt-10 border border-gray-200">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">
            Create a New Blog Post
          </h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-2 text-gray-700" htmlFor="blogName">Blog Name</label>
              <input type="text" id="blogName" name="blogName" value={form.blogName} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" required />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Description</label>
              <div className="mb-2 flex gap-2 flex-wrap">
                <button type="button" onClick={() => execCommand('bold')} className="px-2 py-1 bg-gray-200 rounded font-bold">B</button>
                <button type="button" onClick={() => execCommand('italic')} className="px-2 py-1 bg-gray-200 rounded italic">I</button>
                <button type="button" onClick={() => execCommand('underline')} className="px-2 py-1 bg-gray-200 rounded underline">U</button>
                <button type="button" onClick={() => execCommand('insertUnorderedList')} className="px-2 py-1 bg-gray-200 rounded">• List</button>
                <button type="button" onClick={() => execCommand('insertOrderedList')} className="px-2 py-1 bg-gray-200 rounded">1. List</button>
                <button type="button" onClick={() => {
                  const url = prompt('Enter link URL:');
                  if (url) document.execCommand('createLink', false, url);
                }} className="px-2 py-1 bg-gray-200 rounded">Link</button>
                <button type="button" onClick={() => execCommand('removeFormat')} className="px-2 py-1 bg-red-200 rounded">Clear</button>
              </div>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorChange}
                className="border border-gray-300 p-2 rounded min-h-[150px] bg-white"
              />
            </div>

            {/* Author, Category, Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-gray-700" htmlFor="authorName">Author Name</label>
                <input type="text" id="authorName" name="authorName" value={form.authorName} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-900" required />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700" htmlFor="category">Category</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" required>
                  <option value="">Select category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700" htmlFor="date">Date</label>
              <input type="date" id="date" name="date" value={form.date} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" required />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Thumbnail</label>
              <input type="file" accept="image/*" onChange={handleThumbChange} className="mb-2" />
              <input type="url" placeholder="Or paste image URL" value={form.thumbnail} name="thumbnail" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              {form.thumbnail && <img src={form.thumbnail} alt="Thumbnail" className="mt-2 rounded-lg w-32 h-20 object-cover" />}
            </div>

            {/* Other Images */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Other Related Images</label>
              <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="mb-2" />
              <button type="button" onClick={handleImageUrlAdd} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow">Add Image URL</button>
              <div className="flex flex-wrap gap-3 mt-3">
                {form.images.map((img, idx) => <img key={idx} src={img} alt={`Related ${idx}`} className="rounded-lg w-24 h-16 object-cover" />)}
              </div>
            </div>

            <button type="submit" className="mt-8 px-8 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg text-lg tracking-wide">Submit Blog</button>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Post;




// import { Helmet } from "react-helmet";
// import DashboardLayout from './DashboardLayout';

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

// const categories = ['Nature', 'Travel', 'Science'];

// const Post = () => {
//   const [form, setForm] = useState(initialState);
//   const [thumbFile, setThumbFile] = useState(null);
//   const [imageFiles, setImageFiles] = useState([]);
//   const editorRef = useRef();

//   useEffect(() => {
//     const email = localStorage.getItem('authEmail');
//     if (email) setForm(prev => ({ ...prev, authorGmail: email }));
//   }, []);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditorChange = () => {
//     const html = editorRef.current.innerHTML;
//     const words = html.replace(/<[^>]+>/g, '')
//       .split(/\s+/)
//       .filter(w => w.length > 3)
//       .slice(0, 20);
//     setForm(prev => ({ ...prev, description: html, keywords: words.join(', ') }));
//   };

//   const execCommand = command => document.execCommand(command, false, null);

//   const handleThumbChange = e => {
//     const file = e.target.files[0];
//     setThumbFile(file);
//     setForm(prev => ({ ...prev, thumbnail: file ? URL.createObjectURL(file) : '' }));
//   };

//   const handleImagesChange = e => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);
//     setForm(prev => ({ ...prev, images: files.map(f => URL.createObjectURL(f)) }));
//   };

//   const handleImageUrlAdd = () => {
//     const url = prompt('Enter image URL:');
//     if (url) setForm(prev => ({ ...prev, images: [...prev.images, url] }));
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
//       authorGmail: form.authorGmail
//     };

//     try {
//       const res = await fetch('http://localhost:5000/api/posts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(postData)
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert('Blog post submitted!');
//         setForm(initialState);
//         editorRef.current.innerHTML = '';
//         setThumbFile(null);
//         setImageFiles([]);
//       } else alert(data.error || 'Failed to submit post.');
//     } catch {
//       alert('Error connecting to backend.');
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Create a Post | Blog Website</title>
//         <meta name="description" content="Create and share your blog post on Blog Website. Add title, description, category, and images." />
//       </Helmet>

//       <DashboardLayout>
//         <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded p-10 mt-10 border border-gray-200">
//           <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">
//             Create a New Blog Post
//           </h2>

//           <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700" htmlFor="blogName">Blog Name</label>
//               <input type="text" id="blogName" name="blogName" value={form.blogName} onChange={handleChange}
//                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" required />
//             </div>

//             {/* Lightweight Rich Text Editor */}
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700">Description</label>
//               <div className="mb-2 flex gap-2">
//                 <button type="button" onClick={() => execCommand('bold')} className="px-2 py-1 bg-gray-200 rounded">B</button>
//                 <button type="button" onClick={() => execCommand('italic')} className="px-2 py-1 bg-gray-200 rounded">I</button>
//                 <button type="button" onClick={() => execCommand('underline')} className="px-2 py-1 bg-gray-200 rounded">U</button>
//                 <button type="button" onClick={() => execCommand('insertUnorderedList')} className="px-2 py-1 bg-gray-200 rounded">• List</button>
//                 <button type="button" onClick={() => execCommand('insertOrderedList')} className="px-2 py-1 bg-gray-200 rounded">1. List</button>
//                 <button type="button" onClick={() => {
//                   const url = prompt('Enter link URL:');
//                   if (url) document.execCommand('createLink', false, url);
//                 }} className="px-2 py-1 bg-gray-200 rounded">Link</button>
//               </div>
//               <div
//                 ref={editorRef}
//                 contentEditable
//                 onInput={handleEditorChange}
//                 className="border border-gray-300 p-2 rounded min-h-[150px] bg-white"
//               />
//             </div>

//             {/* Author, Category, Date */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700" htmlFor="authorName">Author Name</label>
//                 <input type="text" id="authorName" name="authorName" value={form.authorName} onChange={handleChange}
//                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-900" required />
//               </div>
//               <div>
//                 <label className="block font-semibold mb-2 text-gray-700" htmlFor="category">Category</label>
//                 <select id="category" name="category" value={form.category} onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" required>
//                   <option value="">Select category</option>
//                   {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block font-semibold mb-2 text-gray-700" htmlFor="date">Date</label>
//               <input type="date" id="date" name="date" value={form.date} onChange={handleChange}
//                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" required />
//             </div>

//             {/* Thumbnail */}
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700">Thumbnail</label>
//               <input type="file" accept="image/*" onChange={handleThumbChange} className="mb-2"/>
//               <input type="url" placeholder="Or paste image URL" value={form.thumbnail} name="thumbnail" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
//               {form.thumbnail && <img src={form.thumbnail} alt="Thumbnail" className="mt-2 rounded-lg w-32 h-20 object-cover"/>}
//             </div>

//             {/* Other Images */}
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700">Other Related Images</label>
//               <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="mb-2"/>
//               <button type="button" onClick={handleImageUrlAdd} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow">Add Image URL</button>
//               <div className="flex flex-wrap gap-3 mt-3">
//                 {form.images.map((img, idx) => <img key={idx} src={img} alt={`Related ${idx}`} className="rounded-lg w-24 h-16 object-cover"/>)}
//               </div>
//             </div>

//             <button type="submit" className="mt-8 px-8 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg text-lg tracking-wide">Submit Blog</button>
//           </form>
//         </div>
//       </DashboardLayout>
//     </>
//   );
// };

// export default Post;





// // import React, { useState } from 'react';
// // import { Helmet } from "react-helmet";
// // import DashboardLayout from './DashboardLayout';

// // const initialState = {
// //   blogName: '',
// //   subtitle: '',
// //   description: '',
// //   keywords: '',
// //   authorName: '',
// //   authorGmail: '',
// //   category: '',
// //   date: '',
// //   thumbnail: '',
// //   images: [],
// // };

// // const categories = ['Nature', 'Travel', 'Science'];

// // const Post = () => {
// //   const [form, setForm] = useState(initialState);
// //   const [imageFiles, setImageFiles] = useState([]);
// //   const [thumbFile, setThumbFile] = useState(null);

// //   // Fetch author info from localStorage
// //   React.useEffect(() => {
// //    const email = localStorage.getItem('authEmail');
// //     if ( email) {
// //       setForm(prev => ({
// //         ...prev,
// //         authorGmail: email
// //       }));
// //     }
// //   }, []);

// //   const handleChange = e => {
// //     const { name, value } = e.target;
// //     if (name === 'description') {
// //       // Extract keywords from description (simple split, filter, and join)
// //       const words = value
// //         .replace(/[.,!?;:()\[\]{}"']/g, '')
// //         .split(/\s+/)
// //         .filter(w => w.length > 3)
// //         .slice(0, 20); // Limit to 20 keywords
// //       setForm(prev => ({
// //         ...prev,
// //         description: value,
// //         keywords: words.join(', ')
// //       }));
// //     } else {
// //       setForm(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleThumbChange = e => {
// //     const file = e.target.files[0];
// //     setThumbFile(file);
// //     setForm(prev => ({ ...prev, thumbnail: file ? URL.createObjectURL(file) : '' }));
// //   };

// //   const handleImagesChange = e => {
// //     const files = Array.from(e.target.files);
// //     setImageFiles(files);
// //     setForm(prev => ({ ...prev, images: files.map(f => URL.createObjectURL(f)) }));
// //   };

// //   const handleImageUrlAdd = () => {
// //     const url = prompt('Enter image URL:');
// //     if (url) {
// //       setForm(prev => ({ ...prev, images: [...prev.images, url] }));
// //     }
// //   };

// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     // Prepare post data
// //     const postData = {
// //       title: form.blogName,
// //       content: form.description,
// //       author: form.authorName, // Should be user ID if available
// //       category: form.category,
// //       createdAt: form.date,
// //       thumbnail: form.thumbnail,
// //       images: form.images,
// //       keywords: form.keywords,
// //       subtitle: form.subtitle,
// //       authorGmail: form.authorGmail
// //     };
// //     try {
// //       const res = await fetch('http://localhost:5000/api/posts', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(postData)
// //       });
// //       const data = await res.json();
// //       if (res.ok) {
// //         alert('Blog post submitted!');
// //         setForm(initialState);
// //         setImageFiles([]);
// //         setThumbFile(null);
// //       } else {
// //         alert(data.error || 'Failed to submit post.');
// //       }
// //     } catch (err) {
// //       alert('Error connecting to backend.');
// //     }
// //   };

// //   return (
// //     <>
// //       <Helmet>
// //         <title>Create a Post | Blog Website</title>
// //         <meta name="description" content="Create and share your blog post on Blog Website. Add title, description, category, and images." />
// //         <meta name="keywords" content="create post, blog, write, share, category, images" />
// //         <meta property="og:title" content="Create a Post | Blog Website" />
// //         <meta property="og:description" content="Create and share your blog post on Blog Website. Add title, description, category, and images." />
// //         <meta property="og:type" content="article" />
// //         <meta property="og:url" content="https://yourblogwebsite.com/post" />
// //         <meta property="og:image" content="/public/og-image.png" />
// //       </Helmet>
// //       <DashboardLayout>
// //         <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded  p-10 mt-10 border border-gray-200">
// //           <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">Create a New Blog Post</h2>
// //           <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700" htmlFor="blogName">Blog Name</label>
// //             <input
// //               type="text"
// //               id="blogName"
// //               name="blogName"
// //               value={form.blogName}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
// //               required
// //             />
// //           </div>
// //           <div className='hidden'>
// //             <label className="block font-semibold mb-2 text-gray-700" htmlFor="subtitle">Subtitle <span className="text-gray-400">(optional)</span></label>
// //             <input
// //               type="text"
// //               id="subtitle"
// //               name="subtitle"
// //               value={form.subtitle}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
// //             />
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700" htmlFor="description">Description</label>
// //             <textarea
// //               id="description"
// //               name="description"
// //               value={form.description}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
// //               rows={5}
// //               required
// //             />
// //           </div>
// //           <div className='hidden'>
// //             <label className="block font-semibold mb-2 text-gray-700" htmlFor="keywords">Keywords <span className="text-gray-400">(comma separated)</span></label>
// //             <input
// //               type="text"
// //               id="keywords"
// //               name="keywords"
// //               value={form.keywords}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
// //             />
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block font-semibold mb-2 text-gray-700" htmlFor="authorName">Author Name</label>
// //               <input
// //                 type="text"
// //                 id="authorName"
// //                 name="authorName"
// //                 value={form.authorName}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-900 cursor-not-allowed"
// //                 required
// //               />
// //             </div>
// //             <div className='hidden'>
// //               <label className="block font-semibold mb-2 text-gray-700" htmlFor="authorGmail">Author Gmail</label>
// //               <input
// //                 type="email"
// //                 id="authorGmail"
// //                 name="authorGmail"
// //                 value={form.authorGmail}
// //                 readOnly
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-100 text-gray-900 cursor-not-allowed"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700" htmlFor="category">Blog Category</label>
// //             <select
// //               id="category"
// //               name="category"
// //               value={form.category}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
// //               required
// //             >
// //               <option value="">Select category</option>
// //               {categories.map(cat => (
// //                 <option key={cat} value={cat}>{cat}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700" htmlFor="date">Date</label>
// //             <input
// //               type="date"
// //               id="date"
// //               name="date"
// //               value={form.date}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Thumbnail</label>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleThumbChange}
// //               className="mb-2"
// //             />
// //             <input
// //               type="url"
// //               placeholder="Or paste image URL"
// //               value={form.thumbnail}
// //               name="thumbnail"
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
// //             />
// //             {form.thumbnail && (
// //               <img src={form.thumbnail} alt="Thumbnail preview" className="mt-2 rounded-lg w-32 h-20 object-cover border border-gray-300 shadow" />
// //             )}
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Other Related Images</label>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               multiple
// //               onChange={handleImagesChange}
// //               className="mb-2"
// //             />
// //             <button
// //               type="button"
// //               onClick={handleImageUrlAdd}
// //               className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow"
// //             >
// //               Add Image URL
// //             </button>
// //             <div className="flex flex-wrap gap-3 mt-3">
// //               {form.images.map((img, idx) => (
// //                 <img key={idx} src={img} alt={`Related ${idx}`} className="rounded-lg w-24 h-16 object-cover border border-gray-300 shadow" />
// //               ))}
// //             </div>
// //           </div>
// //           <button
// //             type="submit"
// //             className="mt-8 px-8 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg text-lg tracking-wide"
// //           >
// //             Submit Blog
// //           </button>
// //         </form>
// //       </div>
// //     </DashboardLayout>
// //     </>
// //   );
// // };

// // export default Post;
