const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 🌍 live frontend domain
const domain = 'https://trendyblogs.site';

// 🖥️  backend API base URL (for fetching posts)
const backendApi = 'https://blog-website-backend-wcn7.onrender.com/api/posts';

// Define your static routes
const staticRoutes = [
  '/', '/login', '/register', '/dashboard', '/post', '/managepost',
  '/profile', '/users', '/support', '/terms-and-conditions', '/privacy-policy'
];

(async () => {
  try {
    // ✅ Fetch all posts from backend
    const { data: posts } = await axios.get(backendApi);

    // Generate post URLs
    const postUrls = posts.map(post => {
      const slug = encodeURIComponent(
        post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
      return `
  <url>
    <loc>${domain}/blog/${slug}</loc>
    <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    // Static route URLs
    const staticUrls = staticRoutes.map(route => `
  <url>
    <loc>${domain}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`);

    // Combine everything
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join('\n')}
${postUrls.join('\n')}
</urlset>`;

    // Output path (frontend/public)
    const outputDir = path.join(__dirname, 'public');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputPath = path.join(outputDir, 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);

    console.log('✅ Sitemap generated successfully at:', outputPath);
  } catch (err) {
    console.error('❌ Error generating sitemap:', err.message);
  }
})();
