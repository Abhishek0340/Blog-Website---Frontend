
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

function imageifyHtml(html) {
  if (!html) return "";
  const imgUrlRegex = /((https?:\/\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp|svg)))/gi;
  return html.replace(
    imgUrlRegex,
    (url) =>
      `<img src="${url}" alt="image" style="max-width:100%;margin:18px 0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);" />`
  );
}

const ViewPost = () => {
  const { id, blogName } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");

    const fetchPost = async () => {
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        const found = data.find((p) => p._id === id);
        if (!found) throw new Error("Post not found");
        setPost(found);

        if (found && found.category) {
          const relatedArticles = data.filter(
            (p) => p.category === found.category && p._id !== id
          );
          setRelated(relatedArticles);
        }

        if (!blogName && found) {
          const slug = (found.blogName || found.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          navigate(`/viewpost/${id}/${slug}`, { replace: true });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, blogName, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`https://blog-website-backend-wcn7.onrender.com/api/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Post deleted successfully.");
        navigate("/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete post.");
      }
    } catch {
      alert("Error deleting post. Please try again.");
    }
  };

  const handleEdit = () => navigate("/post", { state: { editPost: post } });

  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center  px-4 sm:px-6  ">
        {loading ? (
          <Spinner />

        ) : post ? (
          <div className="w-full  flex flex-col lg:flex-row gap-0">
            {/* ===== Main Article ===== */}
            <article className="flex-1 bg-white p-4 sm:p-10 ">
              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-4 leading-snug">
                {post.title}
              </h1>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="flex gap-3 mb-5">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}

              {/* Thumbnail */}
              {post.thumbnail && (
                <div className="w-full mb-8">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full rounded-xl shadow-sm object-fill max-h-[350px] transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              )}


              {/* Subtitle */}
              {post.subtitle && (
                <p className="text-lg text-gray-700 mb-9 italic border-l-4 border-blue-500 pl-4">
                  {post.subtitle}
                </p>
              )}

              {/* Author */}
              <div className="text-right -mt-15   text-white -ml-8 text-sm">
                {post.authorGmail || "Unknown Author"}
              </div>

              {/* Content */}
              <div
                className="prose prose-lg font-medium m-2 max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: imageifyHtml(post.content) }}
              />

              {/* Extra Images */}
              {post.images?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {post.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`extra-${i}`}
                      className="rounded-lg shadow-sm object-cover w-full"
                    />
                  ))}
                </div>
              )}

              {/* Keywords */}
              {post.keywords && (
                <div className="mt-10">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase">
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.split(",").map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ===== Related Articles ===== */}
            <aside className="w-full lg:w-80 bg-white p-6  shadow border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Related Articles
              </h2>

              <div className="flex flex-col gap-4">
                {related.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">
                    No related articles found.
                  </p>
                ) : (
                  related.map((item) => (
                    <div
                      key={item._id}
                      onClick={() =>
                        navigate(
                          `/viewpost/${item._id}/${(item.blogName || item.title || "")
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "")}`
                        )
                      }
                      className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      </div>
                    </div>
                  ))
                )}
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
