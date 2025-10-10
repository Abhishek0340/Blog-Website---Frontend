import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FaRegUser } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";



const DashboardLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const [username, setUsername] = useState('Loading...');
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);


  const sidebarLinks = [
    { name: 'Dashboard', to: '/dashboard', icon: <MdOutlineDashboard />},
    { name: 'Create Post', to: '/post', icon: <IoCreateOutline /> },
    { name: 'Manage Posts', to: '/managepost', icon: <BiRepost /> },
    { name: 'Profile', to: '/profile', icon: <FaRegUser /> }
  ];


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
      <Navbar />

      <div className="flex min-h-screen  relative">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full md:h-auto z-20 bg-white border-r border-gray-200  transform transition-transform duration-300 
          w-3xs md:w-56
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8 mt-8">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500 mb-2">
              {user ? user.username.charAt(0).toUpperCase() : ''}
            </div>
            <span className="font-semibold text-gray-700">
              {user ? user.username : ''}
            </span>
            <span className="text-xs hidden text-gray-400">Admin</span>
          </div>


          {/* Sidebar Links */}
          <nav className="flex flex-col gap-2 mt-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-gray-100 hover:text-blue-700 ${location.pathname === link.to
                  ? 'bg-gray-100 text-blue-700 font-bold'
                  : ''
                  }`}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
            onClick={() => setDrawerOpen(false)}
          ></div>
        )}

        {/* Toggle button */}
        <button
          className="md:hidden fixed top-20 left-4 z-30 bg-white border border-gray-300 rounded-full p-2 shadow text-2xl text-gray-700"
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label="Toggle drawer"
        >
          {drawerOpen ? '✖' : '☰'}
        </button>

        {/* Main Content */}
        <main
          className="flex-1 px-4 py-4 overflow-y-auto "
          style={{ minHeight: 'calc(100vh - 4rem)' }}
        >
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DashboardLayout;
