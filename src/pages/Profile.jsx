import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Spinner from "../components/Spinner";
import {Helmet} from "react-helmet";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("authEmail");

    if (storedEmail) {
      fetch(`https://blog-website-backend-wcn7.onrender.com/api/userinfo?email=${storedEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setUser(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>My Profile | trendyblogs</title>
        <meta
          name="description"
          content="View and manage your trendyblogs profile information including your username and email. Keep your blogging account details up to date."
        />
        <meta
          name="keywords"
          content="profile, user account, trendyblogs, dashboard, blogger profile, user info"
        />
        <meta property="og:title" content="My Profile | trendyblogs" />
        <meta
          property="og:description"
          content="Access your profile on trendyblogs to view your account details and manage your blogging preferences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/profile" />
        <link rel="canonical" href="https://trendyblogs.site/profile" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <DashboardLayout>
        <div className="p-6 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            View your account information
          </p>
        </div>
        <div className=" p-6 w-full  flex items-center justify-center ">
          <div className="bg-white w-full     ">

            {loading ? (
              <div className="text-center text-gray-500">
                <Spinner />
              </div>
            ) : user ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3  rounded-md border border-gray-200">
                  <span className="text-gray-600 font-medium">Username</span>
                  <span className="text-blue-600 font-semibold">
                    {user.username}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3  rounded-md border border-gray-200">
                  <span className="text-gray-600 font-medium">Email</span>
                  <span className="text-blue-600 font-semibold">
                    {user.email}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No user data found. Please log in again.
              </p>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
