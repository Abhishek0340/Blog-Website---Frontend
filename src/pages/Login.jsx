import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    try {
      const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      // Store user data in localStorage
      localStorage.setItem("authToken", "true");
      localStorage.setItem("authEmail", data.user.email);
      localStorage.setItem("authUsername", data.user.username);
      localStorage.setItem("isAdmin", data.user.isAdmin ? "true" : "false");

      // ✅ Redirect based on role
      if (data.user.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | trendyblogs</title>
        <meta
          name="description"
          content="Login to trendyblogs to access your dashboard, manage your posts, and explore the latest trending blogs."
        />
        <meta
          name="keywords"
          content="login, trendyblogs, blog login, user login, account access, blog dashboard"
        />
        <meta property="og:title" content="Login | trendyblogs" />
        <meta
          property="og:description"
          content="Sign in to trendyblogs to manage your account, publish new posts, and stay updated with the latest blogs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/login" />
        <link rel="canonical" href="https://trendyblogs.site/login" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navbar />
      <div className="flex flex-col items-center bg-gray-50 px-4">
        {/* Login Form Container */}
        <div className="w-full max-w-md mt-10 mb-10 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-5">
            Login
          </h2>

          {error && (
            <div className="text-red-600 text-center mb-4 text-sm">{error}</div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-gray-700 font-medium text-base"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                title="Please enter a valid email address."
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-900 text-base focus:outline-none focus:border-gray-700"
              />

            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-gray-700 font-medium text-base"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                minLength={6}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-900 text-base focus:outline-none focus:border-gray-700"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-medium text-base py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-4">
            <Link
              to="/register"
              className="text-gray-900 font-medium hover:text-gray-700 transition-colors text-sm"
            >
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
