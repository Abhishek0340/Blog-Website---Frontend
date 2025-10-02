import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const TermsAndConditions = () => (
  <>
  <Navbar />
  
  <div className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-4">Terms &amp; Conditions</h1>
    <p className="mb-4">
      Welcome to trendyblogs! These terms and conditions outline the rules and regulations for the use of our website.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
    <p className="mb-4">
      By accessing this website, you accept these terms and conditions in full. Do not continue to use trendyblogs if you do not accept all of the terms and conditions stated on this page.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property Rights</h2>
    <p className="mb-4">
      Unless otherwise stated, trendyblogs and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">3. User Content</h2>
    <p className="mb-4">
      You grant trendyblogs a non-exclusive, worldwide, irrevocable license to use, reproduce, adapt, publish, translate, and distribute your content in any existing or future media.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">4. Restrictions</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Publishing any website material in any other media without permission</li>
      <li>Selling, sublicensing, or commercializing any website material</li>
      <li>Using this website in any way that is damaging or impacts user access</li>
      <li>Engaging in any data mining, data harvesting, or similar activities</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
    <p className="mb-4">
      In no event shall trendyblogs, nor any of its officers, directors, or employees, be held liable for anything arising out of or in any way connected with your use of this website.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
    <p className="mb-4">
      We reserve the right to revise these terms at any time. By using this website, you are expected to review these terms on a regular basis.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
    <p>
      If you have any questions about these Terms &amp; Conditions, please contact us at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.
    </p>
  </div>

  <Footer />
  </>
);

export default TermsAndConditions;