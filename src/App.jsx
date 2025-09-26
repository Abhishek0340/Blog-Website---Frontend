import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Category from './pages/Category';
import Post from './pages/Post';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagePost from "./pages/ManagePost";
import ViewPost from './pages/ViewPost';


const App = () => {
  return (
    <>
      <Helmet>
        <title>Blog Website - Share and Discover Posts</title>
        <meta name="description" content="A modern blog website to share, discover, and read posts on various categories. Join our community and start blogging today!" />
        <meta name="keywords" content="blog, posts, categories, community, writing, reading, discover" />
        <meta property="og:title" content="Blog Website - Share and Discover Posts" />
        <meta property="og:description" content="A modern blog website to share, discover, and read posts on various categories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourblogwebsite.com" />
        <meta property="og:image" content="/public/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Website - Share and Discover Posts" />
        <meta name="twitter:description" content="A modern blog website to share, discover, and read posts on various categories." />
        <meta name="twitter:image" content="/public/og-image.png" />
      </Helmet>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/viewpost/:id" element={<ViewPost />} />
          
          // Protected Routes
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/post" element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          } />
          <Route path="/managepost" element={
            <ProtectedRoute>
              <ManagePost />
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </>
  );
};

export default App;