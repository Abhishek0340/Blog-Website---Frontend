import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/register?isAdmin=true");
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          setError(data.error || "Failed to fetch users.");
        }
      } catch (err) {
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin, navigate]);

  return (
    <>
      <Helmet>
        <title>All Registered Users | trendyblogs</title>
        <meta
          name="description"
          content="View and manage all registered users on trendyblogs. Admins can see usernames, emails, roles, and registration dates in the dashboard."
        />
        <meta
          name="keywords"
          content="trendyblogs, admin dashboard, users, manage users, registered users, admin panel"
        />
        <meta property="og:title" content="All Registered Users | trendyblogs" />
        <meta
          property="og:description"
          content="Access the trendyblogs admin dashboard to view and manage all registered users efficiently."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/users" />
        <link rel="canonical" href="https://trendyblogs.site/users" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href={`https://trendyblogs.site${window.location.pathname}`} hreflang="en" />
      </Helmet>

      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">👥 All Registered Users</h1>

          {loading ? (
            <div className="flex justify-center text-gray-500">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center text-gray-500">No registered users found.</div>
          ) : (
            <div className="overflow-x-auto ">
              <table className="min-w-full    rounded-lg shadow-sm">
                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="min-w-full rounded-lg shadow-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Username</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Role</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-4 py-2 text-sm font-medium text-gray-800">{user.username}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                          <td className="px-4 py-2 text-sm">
                            {user.isAdmin ? (
                              <span className="text-purple-600 font-semibold">Admin</span>
                            ) : (
                              <span className="text-gray-700">User</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List */}
                <div className="block sm:hidden space-y-4">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className=" rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
                    >
                      <p className="text-gray-800 font-semibold text-base">
                        👤 {user.username}
                      </p>
                      <p className="text-gray-600 text-sm">📧 {user.email}</p>
                      <p className="text-sm">
                        🏷️{" "}
                        {user.isAdmin ? (
                          <span className="text-purple-600 font-semibold">Admin</span>
                        ) : (
                          <span className="text-gray-700">User</span>
                        )}
                      </p>
                      <p className="text-gray-500 text-sm">
                        📅 {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                      </p>
                    </div>
                  ))}
                </div>

              </table>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AllUsers;
