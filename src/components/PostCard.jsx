import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


const PostCard = () => {
  const navigate = useNavigate();
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

  if (loading) return <div><Spinner /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {categories.map((cat) => {
        const catPosts = getPostsByCategory(cat);
        return catPosts.length > 0 ? (
          <div key={cat} className='w-full'>
            <h2 className="text-xl font-bold mb-2 capitalize">{cat}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {catPosts.map((post) => {

                const blogNameSlug = (post.blogName || post.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                return (
                  <div
                    key={post._id || post.title}
                    className="bg-white rounded-xl  shadow p-4 mb-4 hover:shadow-lg transition flex flex-col"
                    onClick={() => navigate(`/viewpost/${post._id}/${blogNameSlug}`)}
                  >
                    {post.thumbnail && (
                      <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                        <img src={post.thumbnail} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="absolute top-5 right-5 bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10 capitalize pointer-events-none">
                      {post.category}
                    </div>
                    <h3 className="text-xl font-extrabold mb-2 text-gray-900 leading-tight line-clamp-2">{post.title}</h3>
                    {post.subtitle && <div className="text-gray-500 text-base mb-2 font-medium line-clamp-1">{post.subtitle}</div>}
                  
                  
                    <div className='flex flex-1'>
                      <div className="text-gray-700 mb-3 text-sm line-clamp-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }} />
                      <button
                        className="flex mr-2 cursor-pointer text-gray-600 hover:text-gray-800 font-medium"
                        onClick={e => { e.stopPropagation(); navigate(`/viewpost/${post._id}`); }}
                      >
                        Read More
                      </button>
                    </div>


                    {post.keywords && <div className="text-xs text-gray-400 mb-2 hidden">Keywords: <span className="font-medium text-gray-500">{post.keywords}</span></div>}

                    <div className="flex justify-between items-center text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
                      <span className="font-semibold text-gray-500">{post.authorGmail}</span>
                      <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          <div key={cat} className="bg-white text-center rounded shadow p-4 mb-4 hover:shadow-lg transition">
            <h3>No posts found for {cat}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
