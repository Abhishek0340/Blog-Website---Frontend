import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import JoditEditor from "jodit-react";

const initialState = {
  blogName: "",
  subtitle: "",
  description: "",
  keywords: "",
  authorName: "",
  authorGmail: "",
  category: "",
  date: "",
  thumbnail: "",
  images: [],
};

const categories = [
  "Nature",
  "Travel",
  "Science",
  "Technology",
  "Finance",
  "Smart Future",
];

const Post = () => {
  const [form, setForm] = useState(initialState);
  const [thumbFile, setThumbFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  const [thumbnailMode, setThumbnailMode] = useState("url");
  const [thumbnailUrlInput, setThumbnailUrlInput] = useState("");

  const editorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // FETCH USER + EDIT MODE
  useEffect(() => {
    const storedEmail = localStorage.getItem("authEmail");
    const today = new Date().toISOString().split("T")[0];

    const fetchUser = async () => {
      if (storedEmail) {
        try {
          const res = await fetch(
            `https://blog-website-backend-wcn7.onrender.com/api/userinfo?email=${storedEmail}`
          );
          const data = await res.json();
          if (!data.error) {
            setForm((prev) => ({
              ...prev,
              authorName: data.username,
              authorGmail: data.email,
              date: today,
            }));
          }
        } catch (error) {
          console.error("User fetch error:", error);
        }
      }
    };

    // EDIT MODE
    if (location.state?.editPost) {
      const post = location.state.editPost;
      setIsEditing(true);
      setEditPostId(post._id);

      setForm({
        blogName: post.title || "",
        subtitle: post.subtitle || "",
        description: post.content || "",
        keywords: post.keywords || "",
        authorName: post.author || "",
        authorGmail: post.authorGmail || "",
        category: post.category || "",
        date: post.createdAt
          ? new Date(post.createdAt).toISOString().split("T")[0]
          : today,
        thumbnail: post.thumbnail || "",
        images: post.images || [],
      });

      setThumbnailUrlInput(post.thumbnail || "");
    } else {
      fetchUser();
    }
  }, [location.state]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // DESCRIPTION + AUTO KEYWORDS
  const handleEditorChange = (newContent) => {
    const words = newContent
      .replace(/<[^>]+>/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .slice(0, 20);

    setForm((prev) => ({
      ...prev,
      description: newContent,
      keywords: prev.keywords || words.join(", "),
    }));
  };

  // THUMBNAIL FILE
  const handleThumbnailFile = (e) => {
    const file = e.target.files?.[0];
    setThumbFile(file);

    setForm((prev) => ({
      ...prev,
      thumbnail: file ? URL.createObjectURL(file) : "",
    }));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: form.blogName,
      subtitle: form.subtitle,
      content: form.description,
      keywords: form.keywords,
      author: form.authorName,
      authorGmail: form.authorGmail,
      category: form.category,
      createdAt: form.date,
      thumbnail: form.thumbnail,
      images: form.images,
    };

    try {
      let res;
      if (isEditing) {
        res = await fetch(
          `https://blog-website-backend-wcn7.onrender.com/api/posts/${editPostId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
          }
        );
      } else {
        res = await fetch(
          "https://blog-website-backend-wcn7.onrender.com/api/posts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
          }
        );
      }

      const data = await res.json();

      if (res.ok) {
        alert(isEditing ? "Blog updated successfully!" : "Blog submitted!");
        navigate("/dashboard/posts");
      } else {
        alert("Error: " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>{isEditing ? "Edit Post" : "Create Post"}</title>
      </Helmet>

      <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BLOG NAME */}
          <input
            type="text"
            name="blogName"
            value={form.blogName}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full px-4 py-2 border rounded"
            required
          />

          {/* SUBTITLE */}
          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="w-full px-4 py-2 border rounded"
          />

          {/* KEYWORDS */}
          <input
            type="text"
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            placeholder="Enter keywords, comma separated"
            className="w-full px-4 py-2 border rounded"
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* THUMBNAIL */}
          <div>
            <label className="font-semibold">Thumbnail</label>

            <div className="flex items-center gap-4 mt-2 mb-3">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="thumbMode"
                  value="url"
                  checked={thumbnailMode === "url"}
                  onChange={() => setThumbnailMode("url")}
                  className="mr-2"
                />
                Use URL
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="thumbMode"
                  value="file"
                  checked={thumbnailMode === "file"}
                  onChange={() => setThumbnailMode("file")}
                  className="mr-2"
                />
                Upload File
              </label>
            </div>

            {/* URL MODE */}
            {thumbnailMode === "url" && (
              <input
                type="text"
                placeholder="Paste image URL"
                value={thumbnailUrlInput}
                onChange={(e) => {
                  setThumbnailUrlInput(e.target.value);
                  setForm((prev) => ({ ...prev, thumbnail: e.target.value }));
                }}
                className="w-full px-4 py-2 border rounded"
              />
            )}

            {/* FILE MODE */}
            {thumbnailMode === "file" && (
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailFile}
                className="w-full"
              />
            )}

            {/* Preview */}
            {form.thumbnail && (
              <img
                src={form.thumbnail}
                alt="Preview"
                className="mt-3 w-32 h-20 object-cover rounded"
              />
            )}
          </div>

          {/* CONTENT EDITOR */}
          <JoditEditor
            ref={editorRef}
            value={form.description}
            onChange={handleEditorChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Update Post" : "Publish Post"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Post;
