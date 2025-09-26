import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <>
      <style>{`
        .navbar {
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #ececec;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          align-items: center;
          padding: 0.7rem 1.5rem;
        }
        .navbar-logo {
          font-weight: 700;
          font-size: 1.8rem;
          color: #222;
          text-decoration: none;
        }
        .navbar-links {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
        }
        .navbar-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #444;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.08rem;
          border-radius: 6px;
          padding: 0.45rem 1rem;
          transition: background 0.18s, color 0.18s;
        }
        .navbar-link:hover {
          background: #f5f5f5;
          color: #222;
        }
        .navbar-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .navbar-btn {
          background: #f5f5f5;
          color: #222;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1.2rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.18s, color 0.18s;
        }
        .navbar-btn:hover {
          background: #222;
          color: #fff;
        }
        .navbar-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 2rem;
          color: #222;
          cursor: pointer;
        }
        @media (max-width: 900px) {
          .navbar-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .navbar-toggle {
            display: block;
          }
          .navbar-links,
          .navbar-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 0.8rem;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            position: absolute;
            top: 60px;
            left: 0;
            width: 100vw;
            padding: 1rem;
            transition: max-height 0.35s, opacity 0.25s;
            z-index: 100;
          }
          .navbar-links,
          .navbar-actions {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
          }
          .open {
            max-height: 600px;
            opacity: 1;
            pointer-events: auto;
          }

          /* 👇 Fix order for mobile */
          .navbar-actions {
            order: 2;
            width: 100%;
            flex-direction: column;
            margin-top: 30%;
          }
          .navbar-links {
            order: 1;
          }

          /* Make buttons full-width in mobile */
          .navbar-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <header className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            Blogify
          </Link>

          {/* Desktop / Mobile Links */}
          <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={`navbar-actions ${menuOpen ? "open" : ""}`}>
            {isAuthenticated ? (
              <>
                <button className="navbar-btn">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
                <button
                  className="navbar-btn"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    window.location.href = "/login";
                  }}
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <button className="navbar-btn">
                  <Link to='/login'>Login</Link>
                </button>
                <button className="navbar-btn">
                  <Link to='/register'>Register</Link>
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;


