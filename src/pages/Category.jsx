
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import Spinner from '../components/Spinner';


const Category = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com");
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
  }, [name]);

  // Remove duplicates by _id
  let filteredPosts = posts.filter(post => post.category && post.category.toLowerCase() === name.toLowerCase());
  const seenIds = new Set();
  filteredPosts = filteredPosts.filter(post => {
    if (!post._id) return true;
    if (seenIds.has(post._id)) return false;
    seenIds.add(post._id);
    return true;
  });
  if (search) {
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.content && post.content.toLowerCase().includes(search.toLowerCase()))
    );
  }
  if (sort === 'az') {
    filteredPosts = [...filteredPosts].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'za') {
    filteredPosts = [...filteredPosts].sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === 'oldest') {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <>
      <Helmet>
        <title>{name ? `${name} Category | trendyblogs` : "Category | trendyblogs"}</title>
        <meta name="description" content={name ? `Browse posts in the ${name} category on trendyblogs.` : "Browse posts by category on trendyblogs."} />
        <meta name="keywords" content={`category, ${name}, blog, posts`} />
        <meta property="og:title" content={name ? `${name} Category | trendyblogs` : "Category | trendyblogs"} />
        <meta property="og:description" content={name ? `Browse posts in the ${name} category on trendyblogs.` : "Browse posts by category on trendyblogs."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yourblogwebsite.com/category/${name}`} />
        <meta property="og:image" content="/public/og-image.png" />
      </Helmet>
      <Navbar />
      <div className="min-h-screen  flex flex-col bg-gray-50">
        {/* Sticky header with gradient and controls */}
        <div className=" top-0 z-10  w-full bg-gradient-to-r from-white via-white to-gray-100 shadow-md py-6 px-4 mb-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 capitalize">{name} Posts</h1>
              <p className="text-base text-gray-600">Browse the latest posts in <span className="font-bold">{name}</span> category.</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id='search'
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700 bg-white shadow"
              />
            </div>
          </div>
        </div>
        <main className="flex-1  mx-auto px-4 pb-10">
          {loading ? (
            <div><Spinner /></div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {filteredPosts
                .filter((post, idx, arr) =>
                  post._id ? arr.findIndex(p => p._id === post._id) === idx : true
                )
                .map((post, idx) => (
                  <div key={post._id || idx} className="bg-white rounded-xl shadow p-4 mb-4 hover:shadow-lg transition flex flex-col">
                    {post.thumbnail && (
                      <img src={post.thumbnail} alt={post.title}
                        className="w-full h-40 object-fill rounded mb-2" />
                    )}
                    <div className="text-xs text-blue-500 mb-1">{post.category}</div>
                    <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                    {post.subtitle && <div className="text-gray-500 text-sm mb-1 hidden">{post.subtitle}</div>}
                    <p className="text-gray-700 mb-2 line-clamp-3">
                      {post.content.replace(/<[^>]+>/g, '')}
                    </p>
                    <button
                      className="flex cursor-pointer text-gray-600 hover:text-gray-800 font-medium"
                      onClick={e => { e.stopPropagation(); navigate(`/viewpost/${post._id}`); }}
                    >
                      Read More
                    </button>
                    {post.keywords && <div className="text-xs text-gray-400 mb-1 hidden">Keywords: {post.keywords}</div>}
                    <div className="flex justify-between text-xs text-gray-400 mt-auto">
                      <span>{post.authorGmail}</span>
                      <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
                    </div>

                  </div>
                ))}
            </div>
          ) : (
            <div className="flex text-left flex-col items-center justify-center py-16">
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" className="mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-lg text-gray-500 font-semibold">No posts found for this category.</p>
              <p className="text-gray-400 mt-2">Check back later or explore other categories!</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Category;
