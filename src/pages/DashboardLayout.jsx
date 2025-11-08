import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaRegUser } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import Spinner from "../components/Spinner";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const userSidebarLinks = [
    { name: "Dashboard", to: "/dashboard", icon: <MdOutlineDashboard /> },
    { name: "Create Post", to: "/post", icon: <IoCreateOutline /> },
    { name: "Manage Posts", to: "/managepost", icon: <BiRepost /> },
    { name: "Profile", to: "/profile", icon: <FaRegUser /> },
  ];

  const adminSidebarLinks = [
    { name: "Dashboard", to: "/dashboard", icon: <MdOutlineDashboard /> },
    { name: "Create Post", to: "/post", icon: <IoCreateOutline /> },
    { name: "Manage Posts", to: "/managepost", icon: <BiRepost /> },
    { name: "All Users", to: "/users", icon: <FaUsersCog /> },
    { name: "Profile", to: "/profile", icon: <FaRegUser /> },
  ];

  const sidebarLinks = isAdmin ? adminSidebarLinks : userSidebarLinks;

  useEffect(() => {
    const storedEmail = localStorage.getItem("authEmail");
    if (storedEmail) {
      fetch(`https://blog-website-backend-wcn7.onrender.com/api/userinfo?email=${storedEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-50">
        {/* Fixed Sidebar (icon-only) */}
        <aside className="sticky top-0  left-0 min-h-screen w-16 bg-white  flex flex-col items-center py-5 shadow-sm">
          {/* User Initial */}
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg font-bold text-gray-600 mb-8">
            <Link to='/profile'>{user ? user.username.charAt(0).toUpperCase() : ""}</Link>  
          </div>

          {/* Sidebar Icons */}
          <nav className="flex flex-col items-center gap-6">
            {sidebarLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center justify-center text-2xl p-2 rounded-xl transition-all group ${
                  location.pathname === link.to
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                {/* Tooltip */}
                <span className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1   bg-white min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Normal (scrollable) Footer */}
      <Footer />
    </>
  );
};

export default DashboardLayout;
