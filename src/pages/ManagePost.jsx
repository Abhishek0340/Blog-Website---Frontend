import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Spinner from '../components/Spinner';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userEmail = localStorage.getItem('authEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://blog-website-backend-wcn7.onrender.com/api/posts');
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
    // Navigate to Post page with post data for editing
    navigate('/post', { state: { editPost: post } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${id}`, {
        method: 'DELETE'
      });
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
      <div className='p-6'>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Manage your Blog Posts!
        </h1>
        <div className="w-full mx-auto rounded border border-gray-200">
          {loading ? (
            <div className="text-center text-gray-500"><Spinner /></div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500">No posts found for your account.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white border-gray-200 rounded-md border-gray-200">
                <thead>
                  <tr className='border-gray-200'>
                    <th className="px-2 py-2 border-b border-gray-200">Title</th>
                    <th className="px-2 py-2 border-b border-gray-200">Category</th>
                    <th className="px-2 py-2 border-b border-gray-200">Date</th>
                    <th className="px-4 py-2 border-b border-gray-200">Description</th>
                    <th className="px-2 py-2 border-b border-gray-200">Keywords</th>
                    <th className="px-2 py-2 border-b border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className='border-gray-200'>
                  {posts.map(post => (
                    <tr key={post._id} className='border-gray-200'>
                      <td className="px-2 py-2 border-b text-sm border-gray-200">{post.title}</td>
                      <td className="px-2 py-2 border-b text-sm border-gray-200">{post.category}</td>
                      <td className="px-2 py-2 border-b text-sm border-gray-200">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</td>
                      <td className="px-2 py-2 border-b text-sm border-gray-200">{post.content.replace(/<[^>]+>/g, '').length > 50 ? post.content.substring(0, 50) + "..." : post.content}</td>
                      <td className="px-2 py-2 border-b text-sm border-gray-200">{post.keywords}</td>
                      <td className="px-2 py-2 border-b border-gray-200">
                        <button 
                          onClick={() => handleEdit(post)} 
                          className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          <CiEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(post._id)} 
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <RiDeleteBin2Line />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagePost;