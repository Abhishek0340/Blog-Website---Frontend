import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Support = () => (
  <>
  <Navbar />
  
  <div className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-4">Support</h1>
    <p>
      Need help? Contact our support team at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.
    </p>
  </div>

  <Footer />
  </>
);

export default Support;