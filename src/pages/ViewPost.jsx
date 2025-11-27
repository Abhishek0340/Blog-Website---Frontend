import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet";
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";

function imageifyHtml(html) {
  if (!html) return "";
  const imgUrlRegex = /((https?:\/\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp|svg)))/gi;
  return html.replace(
    imgUrlRegex,
    (url) =>
      `<img src="${url}" alt="image" style="max-width:100%;margin:18px 0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);" />`
  );
}

const ViewPost = () => {
  const { blogName } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const adRef = useRef(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");

    const fetchPost = async () => {
      try {
        const res = await fetch("https://blog-website-backend-wcn7.onrender.com/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();

        const found = data.find((p) => {
          const slug = (p.blogName || p.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          return slug === blogName;
        });

        if (!found) throw new Error("Post not found");
        setPost(found);

        if (found.category) {
          const relatedArticles = data.filter(
            (p) => p.category === found.category && p._id !== found._id
          );
          setRelated(relatedArticles);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [blogName]);

  // ============================
  // ✅ SOCIAL ADS SCRIPT
  // ============================
  useEffect(() => {
    console.log("🟦 Social Ads: Injecting script...");

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//pl28095812.effectivegatecpm.com/cb/72/bc/cb72bcd46376fddc905cab7f7f53326e.js";
    script.async = true;

    script.onload = () => {
      console.log("🟩 Social Ads: Script loaded successfully!");
    };

    script.onerror = () => {
      console.error("❌ Social Ads: Failed to load script!");
    };

    document.body.appendChild(script);
    console.log("🟨 Social Ads: Script appended to <body>");

    return () => {
      console.log("🟧 Social Ads: Cleaning up script...");
      document.body.removeChild(script);
    };
  }, []);

  // ============================
  // Existing Adsterra Banner
  // ============================
  useEffect(() => {
    if (adRef.current) {
      adRef.current.innerHTML = "";
      const atOptions = {
        key: "66e5d9ce942dd691e7337e5af6e1aeaa",
        format: "iframe",
        height: 60,
        width: 468,
        params: {},
      };

      const conf = document.createElement("script");
      const script = document.createElement("script");
      conf.type = "text/javascript";
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
      script.type = "text/javascript";
      script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;

      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    }
  }, [related]);

  return (
    <>
      <Helmet>
        <title>
          {post
            ? `${post.title} | trendyblogs`
            : "View Post | trendyblogs"}
        </title>

        {post && (
          <meta
            name="description"
            content={
              post.subtitle ||
              `Read "${post.title}" on trendyblogs.`
            }
          />
        )}

        {post && (
          <meta
            property="og:title"
            content={`${post.title} | trendyblogs`}
          />
        )}

        {post && (
          <meta
            property="og:description"
            content={
              post.subtitle ||
              `Read "${post.title}" on trendyblogs.`
            }
          />
        )}

        <meta property="og:type" content="article" />

        {post && (
          <meta
            property="og:url"
            content={`https://trendyblogs.site/blog/${(post.blogName ||
              post.title ||
              "")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")}`}
          />
        )}

        {/* ❗ ONLY ONE CANONICAL TAG — FIXED */}
        {post && (
          <link
            rel="canonical"
            href={`https://trendyblogs.site/blog/${(post.blogName ||
              post.title ||
              "")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")}`}
          />
        )}
      </Helmet>


      <Navbar />
      <div className="flex flex-col items-center px-4 sm:px-6">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500 mt-10">{error}</div>
        ) : post ? (
          <div className="w-full flex flex-col lg:flex-row gap-0">
            {/* ===== Main Article ===== */}
            <article className="flex-1 bg-white p-4 sm:p-10">
              <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-4 leading-snug">
                {post.title}
              </h1>

              {post.thumbnail && (
                <div className="w-full mb-4 mt-4">
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-auto max-h-[450px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                </div>
              )}

              {post.subtitle && (
                <p className="text-lg text-gray-700 mb-9 italic border-l-4 border-blue-500 pl-4">
                  {post.subtitle}
                </p>
              )}

              <div
                className="prose prose-lg font-medium m-2 max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: imageifyHtml(post.content) }}
              />

              {/* ===== Social Share Buttons ===== */}
              <div className="mt-10">
                <p className="font-semibold text-gray-700 mb-3">Share this post:</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      post.title + " " + window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-all"
                  >
                    <FaWhatsapp size={18} /> WhatsApp
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-all"
                  >
                    <FaTwitter size={18} /> Twitter
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all"
                  >
                    <FaFacebookF size={18} /> Facebook
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-all"
                  >
                    <FaLinkedinIn size={18} /> LinkedIn
                  </a>

                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400 text-white text-sm font-medium hover:bg-blue-500 transition-all"
                  >
                    <FaTelegramPlane size={18} /> Telegram
                  </a>
                </div>
              </div>

              {post.keywords && (
                <div className="mt-10">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase">
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.split(",").map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ===== Related Articles ===== */}
            <aside className="w-full lg:w-80 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Related Articles
              </h2>

              <div className="flex flex-col gap-4">
                {related.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">
                    No related articles found.
                  </p>
                ) : (
                  related.map((item) => {
                    const slug = (item.blogName || item.title || "")
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    return (
                      <div
                        key={item._id}
                        onClick={() => navigate(`/blog/${slug}`)}
                        className="group flex items-center gap-4 p-2 hover:bg-gray-50 cursor-pointer transition"
                      >
                        {item.thumbnail && (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
                          />
                        )}
                        <div>
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Adsterra Banner */}
              <div
                ref={adRef}
                className="flex justify-center items-center my-5  rounded-lg overflow-hidden"
                style={{ minHeight: "60px" }}
              ></div>
            </aside>
          </div>
        ) : (
          <div className="text-gray-500 mt-20">Post not found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewPost;
