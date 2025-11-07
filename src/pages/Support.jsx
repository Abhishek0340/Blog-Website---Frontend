// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Helmet } from "react-helmet";

// const Support = () => (
//   <>
//     <Helmet>
//       <title>Support | trendyblogs</title>
//       <meta
//         name="description"
//         content="Need help with trendyblogs? Contact our support team for assistance with your account, posts, or technical issues."
//       />
//       <meta
//         name="keywords"
//         content="support, help, trendyblogs, contact, technical support, customer service"
//       />
//       <meta property="og:title" content="Support | trendyblogs" />
//       <meta
//         property="og:description"
//         content="Get assistance from the trendyblogs support team. We’re here to help you with your blogging experience."
//       />
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content="https://trendyblogs.site/support" />
//     </Helmet>

//     <Navbar />
    
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-4">Support</h1>
//       <p className="text-gray-700 leading-relaxed">
//         Need help? Our support team is here for you. Contact us at{" "}
//         <a
//           href="mailto:support@example.com"
//           className="text-blue-600 underline hover:text-blue-800"
//         >
//           support@example.com
//         </a>{" "}
//         for any assistance with your account, blog posts, or other inquiries.
//       </p>
//     </div>

//     <Footer />
//   </>
// );

// export default Support;


import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Support = () => (
  <>
    <Helmet>
      <title>Support | trendyblogs</title>
      <meta
        name="description"
        content="Need help with trendyblogs? Contact our support team for assistance with your account, posts, or technical issues."
      />
      <meta
        name="keywords"
        content="support, help, trendyblogs, contact, technical support, customer service"
      />
      <meta property="og:title" content="Support | trendyblogs" />
      <meta
        property="og:description"
        content="Get assistance from the trendyblogs support team. We’re here to help you with your blogging experience."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://trendyblogs.site/support" />
      <link rel="canonical" href="https://trendyblogs.site/support" />
      <meta name="robots" content="index, follow" />
    </Helmet>

    <Navbar />

    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-white to-blue-50 px-6 py-16">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Need Help? We’re Here for You 💬
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed text-center mb-10">
          Whether you’re having trouble with your account, blog posts, or
          technical issues — our friendly support team is ready to help. Just
          drop us an email, and we’ll get back to you shortly!
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              📧 Email Support
            </h2>
            <a
              href="mailto:support@trendyblogs.site"
              className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors"
            >
              support@trendyblogs.site
            </a>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              🕒 Response Time
            </h2>
            <p className="text-gray-600">Typically within 24–48 hours</p>
          </div>
        </div>

        <div className="mt-12 hidden border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>
            Prefer self-help? Visit our{" "}
            <a
              href="/faq"
              className="text-blue-600 underline hover:text-blue-800"
            >
              FAQ Page
            </a>{" "}
            for quick answers to common questions.
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default Support;
