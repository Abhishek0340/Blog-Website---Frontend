const fs = require('fs');
const path = require('path');


const routes = [
  '/',
  '/login',
  '/register',
  '/dashboard',
  '/profile',
  '/category',
  '/post'
];

const domain = 'https://yourdomain.com'; 

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map(
    route => `  <url>\n    <loc>${domain}${route}</loc>\n    <priority>0.7</priority>\n  </url>`
  )
  .join('\n')}\n</urlset>\n`;

const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log('Sitemap generated at', outputPath);