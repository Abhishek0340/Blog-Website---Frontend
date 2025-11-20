import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../pages/DashboardLayout";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet";

const AllFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/feedback");
        setFeedback(res.data || []);
      } catch (err) {
        setError("Error loading feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Feedback | trendyblogs</title>
        <meta
          name="description"
          content="View all user feedback submitted on trendyblogs. Admins can review names, emails, and messages from users."
        />
        <meta
          name="keywords"
          content="trendyblogs feedback, user feedback, admin feedback page, manage feedback"
        />
        <meta property="og:title" content="All Feedback | trendyblogs" />
        <meta
          property="og:description"
          content="Review all feedback submitted by users on the trendyblogs platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/feedback" />
        <link rel="canonical" href="https://trendyblogs.site/feedback" />
        <meta name="robots" content="index, follow" />
        <link
          rel="alternate"
          href={`https://trendyblogs.site${window.location.pathname}`}
          hreflang="en"
        />
      </Helmet>

      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            💬 All Feedback Messages
          </h1>

          {loading ? (
            <div className="flex justify-center text-gray-500">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : feedback.length === 0 ? (
            <div className="text-center text-gray-500">No feedback found.</div>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full rounded-lg shadow-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Name</th>
                      <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Message</th>
                      <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {feedback.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-2 text-sm font-medium text-gray-800">
                          {item.name}
                        </td>

                        <td className="px-4 py-2 text-sm text-gray-600">
                          {item.email}
                        </td>

                        <td className="px-4 py-2 text-sm text-gray-700">
                          {item.message}
                        </td>

                        <td className="px-4 py-2 text-sm text-gray-500">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List View */}
              <div className="block sm:hidden space-y-4">
                {feedback.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
                  >
                    <p className="text-gray-800 font-semibold text-base">
                      👤 {item.name}
                    </p>

                    <p className="text-gray-600 text-sm">📧 {item.email}</p>

                    <p className="text-gray-700 text-sm">
                      💬 {item.message}
                    </p>

                    <p className="text-gray-500 text-sm">
                      📅{" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AllFeedback;
