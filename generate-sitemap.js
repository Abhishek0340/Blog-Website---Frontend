const fs = require('fs');
const path = require('path');

const routes = [
  '/',                        // Home
  '/login',                   // Login
  '/register',                // Register
  '/dashboard',               // User/Admin Dashboard
  '/post',                    // Create/Edit Post
  '/managepost',              // Manage Posts
  '/category/:name',          // Category Page
  '/viewpost/:id',            // View Post (ID only)
  '/viewpost/:id/:blogName',  // View Post with SEO-friendly slug
  '/profile',                 // User Profile
  '/users',                   // Admin Users List
  '/support',                 // Support Page
  '/terms-and-conditions',    // Terms & Conditions
  '/privacy-policy',          // Privacy Policy
  '/*',                     // Not Found Page
];

//  domain with your live site URL
const domain = 'https://trendyblogs.site';

// Generate XML sitemap content
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${domain}${route.replace(/:.*?\b/g, '')}</loc>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// Ensure 'public' directory exists
const outputDir = path.join(__dirname, 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Write the sitemap file
const outputPath = path.join(outputDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log('✅ Sitemap generated successfully at:', outputPath);
