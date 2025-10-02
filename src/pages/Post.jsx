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

const categories = ['Nature', 'Travel', 'Science', 'Technology',];

const Post = () => {
  const [form, setForm] = useState(initialState);
  const [thumbFile, setThumbFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const editorRef = useRef();

  useEffect(() => {
    const email = localStorage.getItem('authEmail');
    const today = new Date().toISOString().split('T')[0];
    setForm(prev => ({
      ...prev,
      authorGmail: email || '',
      date: today
    }));
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
    setForm(prev => ({ ...prev, description: html, keywords: prev.keywords || words.join(', ') }));
  };

  // Toggle formatting (updated to accept value)
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
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

  // Handle pasted image URLs
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
        <title>Create a Post | trendyblogs</title>
        <meta name="description" content="Create and share your blog post on trendyblogs. Add title, description, category, and images." />
      </Helmet>

      <DashboardLayout>
          <div className='p-6'>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create a New Blog Post
          </h1>

        <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded border p-4 border-gray-200 ">
    
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Keywords (editable) */}
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
                {/* Headings */}

                <button type="button" onClick={() => execCommand('formatBlock', '<H1>')} className="px-2 py-1  bg-gray-200 rounded font-bold text-xl">H1</button>
                <button type="button" onClick={() => execCommand('formatBlock', '<H2>')} className="px-2 py-1  bg-gray-200 rounded font-bold text-lg">H2</button>
                <button type="button" onClick={() => execCommand('formatBlock', '<H3>')} className="px-2 py-1  bg-gray-200 rounded font-bold">H3</button>

                {/* Paragraph */}
                <button type="button" onClick={() => execCommand('formatBlock', '<p>')} className="px-2 py-1 hidden bg-gray-200 rounded">P</button>
                {/* Blockquote */}
                <button type="button" onClick={() => execCommand('formatBlock', '<blockquote>')} className="px-2 hidden py-1 bg-gray-200 rounded italic">❝ Quote</button>
                {/* Link */}
                <button type="button" onClick={() => {
                  const url = prompt("Enter URL:");
                  if (url) execCommand('createLink', url);
                }} className="px-2 py-1 bg-gray-200 rounded text-blue-600 underline">🔗 Link</button>
                {/* Remove Link */}
                <button type="button" onClick={() => execCommand('unlink')} className="px-2 py-1 bg-gray-200 rounded">❌ Unlink</button>
                {/* Image */}
                <button type="button" onClick={() => {
                  const url = prompt("Enter Image URL:");
                  if (url) execCommand('insertImage', url);
                }} className="px-2 py-1 bg-gray-200 rounded">🖼️ Image</button>
                {/* Horizontal Line */}
                <button type="button" onClick={() => execCommand('insertHorizontalRule')} className="px-2 py-1 bg-gray-200 rounded">― HR</button>
                {/* Text Alignment */}
                <button type="button" onClick={() => execCommand('justifyLeft')} className="px-2 py-1 bg-gray-200 rounded">⬅ Left</button>
                <button type="button" onClick={() => execCommand('justifyCenter')} className="px-2 py-1 bg-gray-200 rounded">↔ Center</button>
                <button type="button" onClick={() => execCommand('justifyRight')} className="px-2 py-1 bg-gray-200 rounded">➡ Right</button>
                <button type="button" onClick={() => execCommand('justifyFull')} className="px-2 py-1 bg-gray-200 rounded">☰ Justify</button>
                <button type="button" onClick={() => execCommand('removeFormat')} className="px-2 py-1 bg-red-200 rounded">Clear</button>
              </div>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorChange}
                className="border border-gray-300 p-2 rounded min-h-[150px] bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700" htmlFor="keywords">Keywords <span className="text-gray-400"></span></label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
                placeholder="e.g. travel, adventure, nature"
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
              <textarea
                placeholder="Paste image URLs here, separated by comma or new line"
                value={form.imageUrls || ''}
                onChange={handleImageUrlsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                rows={2}
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {form.images.map((img, idx) => <img key={idx} src={img} alt={`Related ${idx}`} className="rounded-lg w-24 h-16 object-cover" />)}
              </div>
            </div>

            <button type="submit" className="mt-2 px-2 py-2 cursor-pointer bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg text-lg tracking-wide">Submit Blog</button>
          </form>
        </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Post;


