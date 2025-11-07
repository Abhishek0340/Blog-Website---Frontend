import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "./DashboardLayout";
import { FiFileText, FiTag, FiMessageSquare, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [stats, setStats] = useState({ posts: 0, categories: 0, users: 0, comments: 0 });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // ✅ Detect if admin from localStorage
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all posts
        const postsRes = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
        const postsData = await postsRes.json();

        const categoriesSet = new Set(postsData.map((p) => p.category));

        // Dummy placeholders for users/comments for now
        setStats({
          posts: postsData.length,
          categories: categoriesSet.size,
          users: 0,
          comments: 0,
        });
        setRecentPosts(postsData.slice(-3).reverse());
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{isAdmin ? "Admin Dashboard | trendyblogs" : "User Dashboard | trendyblogs"}</title>
        <meta
          name="description"
          content={
            isAdmin
              ? "Access the trendyblogs admin dashboard to manage users, posts, and categories efficiently."
              : "Welcome to your trendyblogs dashboard. View stats, manage your posts, and explore recent updates."
          }
        />
        <meta
          name="keywords"
          content={
            isAdmin
              ? "admin dashboard, manage blogs, user management, post management, trendyblogs admin"
              : "user dashboard, blog management, recent posts, trendyblogs user panel"
          }
        />
        <meta property="og:title" content={isAdmin ? "Admin Dashboard | trendyblogs" : "User Dashboard | trendyblogs"} />
        <meta
          property="og:description"
          content={
            isAdmin
              ? "Manage users, posts, and categories from the trendyblogs admin dashboard."
              : "Check your recent posts, stats, and manage content easily on your trendyblogs dashboard."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/dashboard" />
        <link rel="canonical" href="https://trendyblogs.site/dashboard" />
        <meta name="robots" content="index, follow" />
      </Helmet>


      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {isAdmin ? "Welcome Admin 👑" : "Welcome to your Dashboard!"}
          </h1>

          {/* ======= Stats Cards ======= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
              <FiFileText className="text-blue-600 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Total Posts</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "..." : stats.posts}
                </h2>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
              <FiTag className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "..." : stats.categories}
                </h2>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
              <FiMessageSquare className="text-yellow-600 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Comments</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "..." : stats.comments}
                </h2>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
              <FiUsers className="text-purple-600 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Users</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "..." : stats.users}
                </h2>
              </div>
            </div>
          </div>

          {/* ======= Admin-Only Section ======= */}
          {isAdmin && (
            <div className=" rounded-lg p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                👑 Admin Controls
              </h3>
              <div className="flex flex-wrap gap-3">
                <button className=" text-black bg-purple-300 px-4 py-2 rounded  transition">
                  <Link to="/users">👥 Manage Users</Link>
                </button>
                <button className="bg-blue-300  text-black px-4 py-2 rounded  transition">
                  <Link to="/post">➕ Create Post</Link>
                </button>
                <button className="bg-green-300 text-black px-4 py-2 rounded  transition">
                  <Link to="/managepost">🗂 Manage All Posts</Link>
                </button>
              </div>
            </div>
          )}

          {/* ======= Recent Posts ======= */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Posts
            </h3>
            {loading ? (
              <div className="text-gray-500">
                <Spinner />
              </div>
            ) : recentPosts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentPosts.map((post) => (
                  <li
                    key={post._id}
                    className="py-3 flex justify-between items-center"
                  >
                    <span className="text-gray-700">{post.title}</span>
                    <span className="text-sm text-gray-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No posts found.</p>
            )}
          </div>

          {/* ======= Quick Actions ======= */}
          {!isAdmin && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  <Link to="/post">➕ Add New Post</Link>
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                  <Link to="/managepost">🗂 Manage Posts</Link>
                </button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">
                  <Link to="/managepost">📑 View All Posts</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
