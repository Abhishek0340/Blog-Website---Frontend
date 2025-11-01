import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const PostCard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
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

  const getPostsByCategory = (category) =>
    posts
      .filter((post) => post.category && post.category.toLowerCase() === category)
      .slice(0, 3);

  const categories = ["nature", "travel", "science", "technology"];

  if (loading) return <div className=""><Spinner /></div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-full  py-10 px-5 sm:px-10 lg:px-10">
      {categories.map((cat) => {
        const catPosts = getPostsByCategory(cat);
        return catPosts.length > 0 ? (
          <section key={cat} className="mb-16">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 capitalize">
                {cat}
              </h2>
              <div className="w-20 h-[2px] bg-blue-500 rounded-full"></div>
            </div>

            {/* Grid Layout */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {catPosts.map((post) => {
                const blogNameSlug = (post.blogName || post.title || "")
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");

                return (
                  <div
                    key={post._id || post.title}
                    className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
                    onClick={() =>
                      navigate(`/viewpost/${post._id}/${blogNameSlug}`)
                    }
                  >
                    {/* Image */}
                    {post.thumbnail && (
                      <div className="w-full h-52 overflow-hidden bg-gray-100">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />

                      </div>
                    )}

                    <div className=" text-white items-center -mt-7 ">
                      <span className="text-xs ">
                        {post.authorGmail || "Unknown Author"}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      {post.subtitle && (
                        <p className="text-gray-500 text-sm mb-3 italic line-clamp-1">
                          {post.subtitle}
                        </p>
                      )}



                      <div
                        className="text-gray-700 text-sm mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/viewpost/${post._id}`);
                        }}
                        className="text-blue-600 w-full bg-blue-50 text-sm font-medium hover:underline"
                      >
                        Read More
                      </button>



                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null;
      })}
    </div>
  );
};

export default PostCard;
