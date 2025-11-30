import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

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
      toast.error("All fields are required.");
      return;
    }

    if (!form.terms) {
      setError("You must accept the Terms and Conditions.");
      toast.error("You must accept the Terms and Conditions.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Registration failed.");
        toast.error(data.error || "Registration failed.");
        return;
      }

      if (data.user) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", "true");
      }

      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Server error. Please try again later.");
      toast.error("Server error. Please try again later.");
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
      </Helmet>

      <Navbar />
      <div className="flex flex-col items-center bg-gray-50 px-4">
        <div className="w-full max-w-md mt-10 mb-10 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-5">
            Sign Up
          </h2>

          {error && (
            <div className="text-red-600 text-center mb-4 text-sm">{error}</div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-700 font-medium text-base">
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
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-700 font-medium text-base">
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
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-md border bg-gray-100 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-gray-700 font-medium text-base">
                Create Password
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
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md border bg-gray-100 text-gray-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I accept the{" "}
                <Link to="#" className="text-gray-900 underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-md flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-900 font-medium text-sm">
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
