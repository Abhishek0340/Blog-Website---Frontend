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

const categories = ['Nature', 'Travel', 'Science', 'Technology', 'Finance'];

const Post = () => {
  const [form, setForm] = useState(initialState);
  const [thumbFile, setThumbFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const editorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 Fetch user info same as Profile.jsx
  useEffect(() => {
    const storedEmail = localStorage.getItem("authEmail");
    const today = new Date().toISOString().split("T")[0];

    const fetchUser = async () => {
      if (storedEmail) {
        try {
          const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/userinfo?email=${storedEmail}`);
          const data = await res.json();

          if (!data.error) {
            setForm(prev => ({
              ...prev,
              authorName: data.username,
              authorGmail: data.email,
              date: today
            }));
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    // EDIT MODE
    if (location.state && location.state.editPost) {
      const post = location.state.editPost;
      setIsEditing(true);
      setEditPostId(post._id);

      setForm({
        blogName: post.title || "",
        subtitle: post.subtitle || "",
        description: post.content || "",
        keywords: post.keywords || "",
        authorName: post.author || "",
        authorGmail: post.authorGmail || "",
        category: post.category || "",
        date: post.createdAt
          ? new Date(post.createdAt).toISOString().split("T")[0]
          : today,
        thumbnail: post.thumbnail || "",
        images: post.images || []
      });
    } else {
      fetchUser(); 
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
      </Helmet>

      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {isEditing ? 'Edit Blog Post' : 'Create a New Blog Post'}
          </h1>

          <div className="w-full max-w-7xl mx-auto rounded border p-4 border-gray-200">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Blog Name</label>
                <input
                  type="text"
                  name="blogName"
                  value={form.blogName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Description</label>
                <JoditEditor
                  ref={editorRef}
                  value={form.description}
                  onBlur={handleEditorChange}
                  config={{ height: 300 }}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={form.keywords}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Author Name</label>
                <input
                  type="text"
                  name="authorName"
                  value={form.authorName}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbChange}
                />
                {form.thumbnail && (
                  <img src={form.thumbnail} alt="Thumbnail" className="mt-2 rounded-lg w-32 h-20 object-cover" />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 text-white rounded-xl font-bold"
                >
                  {isEditing ? 'Update Blog' : 'Submit Blog'}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-500 text-white rounded-xl font-bold"
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
