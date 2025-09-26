
import React, { useEffect, useState } from 'react';


const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        if (!res.ok) throw new Error('Failed to fetch posts');
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

  // Get up to 6 posts for each category
  const getPostsByCategory = (category) =>
    posts.filter((post) => post.category && post.category.toLowerCase() === category).slice(0, 6);

  const categories = ['nature', 'travel', 'science'];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {categories.map((cat) => {
        const catPosts = getPostsByCategory(cat);
        return catPosts.length > 0 ? (
          <div key={cat}>
            <h2 className="text-xl font-bold mb-2 capitalize">{cat}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catPosts.map((post) => (
                <div key={post._id || post.title} className="bg-white rounded shadow p-4 mb-4 hover:shadow-lg transition">
                  {post.thumbnail && (
                    <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover rounded mb-2" />
                  )}
                  <div className="text-xs text-blue-500 mb-1">{post.category}</div>
                  <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                  {post.subtitle && <div className="text-gray-500 text-sm mb-1">{post.subtitle}</div>}
                  <p className="text-gray-700 mb-2 line-clamp-3">{post.content}</p>
                  {post.keywords && <div className="text-xs text-gray-400 mb-1">Keywords: {post.keywords}</div>}
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{post.authorGmail}</span>
                    <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div key={cat} className="bg-white rounded shadow p-4 mb-4 hover:shadow-lg transition">
            <h3>No posts found for {cat}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
