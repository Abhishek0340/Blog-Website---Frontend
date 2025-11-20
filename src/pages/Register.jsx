import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner"


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (!form.terms) {
      setError("You must accept the Terms and Conditions.");
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      if (data.user) {
        // ✅ Save backend user response
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", "true");
      }

      navigate("/login");
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | trendyblogs</title>
        <meta
          name="description"
          content="Create your trendyblogs account to publish and explore amazing blogs on various topics. Join the community of writers and readers today."
        />
        <meta
          name="keywords"
          content="register, sign up, trendyblogs, blog registration, blogging platform, create account"
        />
        <meta property="og:title" content="Sign Up | trendyblogs" />
        <meta
          property="og:description"
          content="Join trendyblogs to share your thoughts, publish blogs, and connect with a vibrant writing community."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/register" />
        <link rel="canonical" href="https://trendyblogs.site/register" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />
      <div className=" flex flex-col items-center bg-gray-50 px-4">
        {/* Signup Form Container */}
        <div className="w-full max-w-md mt-10 mb-10 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-5">
            Sign Up
          </h2>

          {error && (
            <div className="text-red-600 text-center mb-4 text-sm">{error}</div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-gray-700 font-medium text-base"
              >
                User Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                minLength={2}
                pattern="^[A-Za-z\s]+$"
                title="Name should only contain letters and spaces."
                placeholder="Enter your user name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-900 text-base focus:outline-none focus:border-gray-700"
              />
            </div>

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
                autoComplete="email"
                required
                pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
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
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Enter your password (min 6 characters)"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-900 text-base focus:outline-none focus:border-gray-700"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="w-5 h-5 accent-gray-900"
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I accept the{" "}
                <Link
                  to="#"
                  className="text-gray-900 underline hover:text-gray-700"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
  type="submit"
  disabled={loading}
  className="w-full bg-gray-900 text-white font-medium text-base py-2 rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors"
>
  {loading ? <Spinner /> : "Sign Up"}
</button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-gray-900 font-medium hover:text-gray-700 transition-colors text-sm"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
