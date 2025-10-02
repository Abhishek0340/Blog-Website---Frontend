import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiGrid, FiLogOut } from "react-icons/fi";

const navLinks = [
  { name: "Home", to: "/", icon: "🏠" },
  { name: "Nature", to: "/category/nature", icon: "🌳" },
  { name: "Travel", to: "/category/travel", icon: "✈️" },
  { name: "Science", to: "/category/science", icon: "🔬" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-3 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            srcSet="https://i.ibb.co/jZ4sVWWt/image-logo.png"
            alt="trendyblogs - logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Links */}
        <nav className={`hidden md:flex flex-1 justify-center gap-4`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition"
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
              >
                <FiGrid className="text-lg" />
                Dashboard
              </Link>
              <button
                className="flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.location.href = "/login";
                }}
              >
                <FiLogOut className="text-lg" />
                
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-3xl text-gray-900 focus:outline-none"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-full w-full bg-white shadow-md flex flex-col items-stretch gap-2 px-6 py-4 transition-all duration-300 z-40 ${
            menuOpen ? "max-h-[600px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
          } md:hidden`}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition"
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiGrid className="text-lg" />
                  Dashboard
                </Link>
                <button
                  className="flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    window.location.href = "/login";
                  }}
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


