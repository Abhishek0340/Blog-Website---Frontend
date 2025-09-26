import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editPost, setEditPost] = useState(null);
  const [editForm, setEditForm] = useState({});
  const userEmail = localStorage.getItem('authEmail');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.filter(post => post.authorGmail === userEmail));
        } else {
          setError(data.error || 'Failed to fetch posts.');
        }
      } catch (err) {
        setError('Error connecting to backend.');
      }
      setLoading(false);
    };
    fetchPosts();
  }, [userEmail]);

  const handleEdit = (post) => {
    setEditPost(post._id);
    setEditForm({ ...post });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${editPost}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(posts.map(p => (p._id === editPost ? { ...editForm, _id: editPost } : p)));
        setEditPost(null);
      } else {
        alert(data.error || 'Failed to update post.');
      }
    } catch (err) {
      alert('Error connecting to backend.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(p => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete post.');
      }
    } catch (err) {
      alert('Error connecting to backend.');
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded p-10 mt-10 border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">Manage Your Posts</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts found for your account.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Title</th>
                  <th className="px-4 py-2 border-b">Category</th>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Description</th>
                  <th className="px-4 py-2 border-b">Keywords</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post._id}>
                    {editPost === post._id ? (
                      <>
                        <td className="px-4 py-2 border-b"><input name="title" value={editForm.title} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" /></td>
                        <td className="px-4 py-2 border-b"><input name="category" value={editForm.category} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" /></td>
                        <td className="px-4 py-2 border-b"><input name="createdAt" value={editForm.createdAt ? new Date(editForm.createdAt).toISOString().slice(0,10) : ''} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" type="date" /></td>
                        <td className="px-4 py-2 border-b"><input name="content" value={editForm.content} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" /></td>
                        <td className="px-4 py-2 border-b"><input name="keywords" value={editForm.keywords} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" /></td>
                        <td className="px-4 py-2 border-b">
                          <button onClick={handleEditSave} className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                          <button onClick={() => setEditPost(null)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2 border-b">{post.title}</td>
                        <td className="px-4 py-2 border-b">{post.category}</td>
                        <td className="px-4 py-2 border-b">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</td>
                        <td className="px-4 py-2 border-b">{post.content}</td>
                        <td className="px-4 py-2 border-b">{post.keywords}</td>
                        <td className="px-4 py-2 border-b">
                          <button onClick={() => handleEdit(post)} className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                          <button onClick={() => handleDelete(post._id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagePost;
