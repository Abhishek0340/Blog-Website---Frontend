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


const App = () => {
  return (
    <>
      <Helmet>
        <title>trendyblogs - Share and Discover Posts</title>
        <meta name="description" content="A modern trendyblogs to share, discover, and read posts on various categories. Join our community and start blogging today!" />
        <meta name="keywords" content="blog, posts, categories, community, writing, reading, discover" />
        <meta property="og:title" content="trendyblogs - Share and Discover Posts" />
        <meta property="og:description" content="A modern trendyblogs to share, discover, and read posts on various categories." />    
        <meta property="og:url" content="https://yourblogwebsite.com" />
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