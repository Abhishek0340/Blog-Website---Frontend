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
import TermsAndConditions from './pages/TermsAndConditions';
import Support from './pages/Support';
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AllUsers from "./Admin/AllUsers"


const App = () => {
  return (
    <>
      <Helmet>
        <title>trendyblogs | Share and Discover Trending Posts</title>
        <meta
          name="description"
          content="Welcome to trendyblogs — a modern blogging platform to share, read, and discover posts across multiple categories. Join our community of writers and readers today!"
        />
        <meta
          name="keywords"
          content="trendyblogs, blog, blogging platform, trending posts, share articles, read blogs, write blog, community"
        />
        <meta property="og:title" content="trendyblogs | Share and Discover Trending Posts" />
        <meta
          property="og:description"
          content="Explore, write, and share blogs on trendyblogs. Join our growing blogging community today."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trendyblogs.site/" />
      </Helmet>

      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/viewpost/:id/:blogName" element={<ViewPost />} />
          <Route path="/viewpost/:id" element={<ViewPost />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/support" element={<Support />} />

          // Protected Routes
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <AllUsers />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
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