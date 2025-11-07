import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const TermsAndConditions = () => (
  <>
    <Helmet>
      <title>Terms & Conditions | trendyblogs</title>
      <meta
        name="description"
        content="Read the Terms and Conditions of trendyblogs. Understand the rules and regulations for using our blogging platform."
      />
      <meta
        name="keywords"
        content="terms and conditions, trendyblogs policy, user agreement, website rules, legal terms"
      />
      <meta property="og:title" content="Terms & Conditions | trendyblogs" />
      <meta
        property="og:description"
        content="Review the Terms and Conditions of trendyblogs to understand your rights and responsibilities while using our blogging platform."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://trendyblogs.site/terms-and-conditions"
      />
      <link rel="canonical" href="https://trendyblogs.site/terms-and-conditions" />
      <meta name="robots" content="index, follow" />
    </Helmet>

    <Navbar />

    {/* Main Section */}
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-white to-blue-50 px-6 py-16">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Terms &amp; Conditions 📜
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Welcome to <span className="font-semibold">trendyblogs</span>! These
          terms and conditions outline the rules and regulations for using our
          website. Please read them carefully before proceeding.
        </p>

        <div className="space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this website, you accept these terms and conditions
              in full. Do not continue to use trendyblogs if you do not agree
              with all the terms and conditions stated on this page.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise stated, trendyblogs and/or its licensors own the
              intellectual property rights for all material on this website. All
              intellectual property rights are reserved. You may view and/or
              print pages from trendyblogs for your personal use subject to
              restrictions set in these terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. User Content
            </h2>
            <p>
              You grant trendyblogs a non-exclusive, worldwide, irrevocable
              license to use, reproduce, adapt, publish, translate, and
              distribute your content in any existing or future media.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Restrictions
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Publishing any website material in other media without permission</li>
              <li>Selling, sublicensing, or commercializing any website material</li>
              <li>Using this website in a way that may damage or impair access</li>
              <li>Engaging in data mining, scraping, or similar activities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall trendyblogs, nor any of its officers, directors,
              or employees, be held liable for anything arising out of or in any
              way connected with your use of this website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right to revise these terms at any time. By using
              this website, you are expected to review these terms regularly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms &amp; Conditions,
              please contact us at{" "}
              <a
                href="mailto:support@trendyblogs.site"
                className="text-blue-600 font-medium underline hover:text-blue-800"
              >
                support@trendyblogs.site
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 border-t border-gray-200 pt-6 text-sm">
          <p>© {new Date().getFullYear()} trendyblogs. All rights reserved.</p>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default TermsAndConditions;
