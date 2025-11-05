import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Post from "./pages/Post";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagePost from "./pages/ManagePost";
import ViewPost from "./pages/ViewPost";
import TermsAndConditions from "./pages/TermsAndConditions";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AllUsers from "./Admin/AllUsers";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* ✅ General Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/support" element={<Support />} />
          
          {/* ✅ SEO-friendly blog route */}
          <Route path="/blog/:blogName" element={<ViewPost />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/managepost"
            element={
              <ProtectedRoute>
                <ManagePost />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
