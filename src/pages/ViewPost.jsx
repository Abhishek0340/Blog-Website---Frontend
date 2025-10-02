import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

function imageifyHtml(html) {
  if (!html) return '';
  // Regex to match image URLs (ending with jpg, jpeg, png, gif, webp, svg)
  const imgUrlRegex = /((https?:\/\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp|svg)))/gi;
  // Replace plain image URLs with <img> tags
  return html.replace(
    imgUrlRegex,
    (url) =>
      `<img src="${url}" alt="image" style="max-width:100%;margin:12px 0;border-radius:12px;box-shadow:0 2px 8px #0001;" />`
  );
}

const ViewPost = () => {
  const { id, blogName } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com");
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        const found = data.find((p) => p._id === id);
        setPost(found);

        // Find related articles by category (excluding current post)
        if (found && found.category) {
          const relatedArticles = data.filter(
            (p) => p.category === found.category && p._id !== id
          );
          setRelated(relatedArticles);
        }

        if (!blogName && found) {
          const blogNameSlug = (found.blogName || found.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          navigate(`/viewpost/${id}/${blogNameSlug}`, { replace: true });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, blogName, navigate]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 flex flex-col items-center mb-10 px-4">
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-red-500 mt-20">Error: {error}</div>
        ) : post ? (
          <div className="w-full flex flex-col md:flex-row gap-8 mx-auto max-w-6xl">
            {/* Main Article */}
            <article className="flex-1 p-2">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-snug">
                {post.title}
              </h1>
              {/* Thumbnail */}
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-1/3 object-fill md:h-96 rounded-xl shadow mb-6"
                />
              )}
              {/* Category + Date */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ''}
                </span>
              </div>
              {/* Subtitle */}
              {post.subtitle && (
                <p className="text-lg text-gray-600 mb-4 italic border-l-4 border-indigo-500 pl-4">
                  {post.subtitle}
                </p>
              )}
              {/* Author */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-max h-full rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">
                  <span className="hidden">{post.author}</span>
                </div>
                <span className="text-sm hidden text-gray-700 font-medium">
                  {post.authorGmail}
                </span>
              </div>
              {/* Content */}
              <div
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: imageifyHtml(post.content) }}
              />
              {/* Extra Images */}
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {post.images.map((item, idx) => (
                    <img
                      key={idx}
                      src={item}
                      alt={`extra-img-${idx}`}
                      className="w-full rounded-xl shadow"
                      style={{ maxHeight: 320, objectFit: 'contain', background: '#fff' }}
                    />
                  ))}
                </div>
              )}
              {/* Keywords */}
              {post.keywords && (
                <div className="mt-6">
                  <h3 className="text-sm text-gray-500 font-semibold mb-1">Keywords:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.split(',').map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
                      >
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
            {/* Related Articles Sidebar */}
            <aside className="w-full md:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Related Articles</h2>
                <div className="flex flex-col gap-4">
                  {related.length === 0 && (
                    <div className="text-gray-500 text-sm">No related articles found.</div>
                  )}
                  {related.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-3 items-center bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition"
                      onClick={() => navigate(`/viewpost/${item._id}/${(item.blogName || item.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`)}
                    >
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <span className="text-sm font-semibold text-gray-700 line-clamp-2">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="text-gray-500 mt-20">Post not found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewPost;