import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Helmet from "react-helmet";

const PrivacyPolicy = () => (
  <>
  <Helmet>
  <title>Privacy Policy | trendyblogs</title>
  <meta
    name="description"
    content="Read the trendyblogs Privacy Policy to understand how we collect, use, and protect your personal information when you visit our website."
  />
  <meta
    name="keywords"
    content="privacy policy, data protection, user privacy, trendyblogs policy, personal information, cookies, data security"
  />
  <meta property="og:title" content="Privacy Policy | trendyblogs" />
  <meta
    property="og:description"
    content="Learn how trendyblogs safeguards your privacy and handles your personal information responsibly."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://trendyblogs.site/privacy-policy" />
</Helmet>

    <Navbar />
    <div className=" mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At trendyblogs, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address, and any other information you voluntarily provide when you interact with our site.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Information</h2>
      <p className="mb-4">
        We use your information to improve our website, send newsletters, respond to inquiries, and enhance user experience.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
      <p className="mb-4">
        Our website may use cookies to personalize your experience and analyze site traffic. You can disable cookies through your browser settings.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services that collect, monitor, and analyze information to improve our service. These third parties have their own privacy policies.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
      <p className="mb-4">
        We implement security measures to protect your personal information, but please be aware that no method of transmission over the Internet is 100% secure.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. Any changes will be posted on this page.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.
      </p>
    </div>
    <Footer />
  </>
);

export default PrivacyPolicy;