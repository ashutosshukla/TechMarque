
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your website domain
const DOMAIN = 'https://zavame.com';

// Static routes from App.jsx
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/projects', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/sitemap', priority: '0.5', changefreq: 'monthly' },
];

const serviceSlugs = [
    "web-development",
    "ecommerce-website",
    "custom-software-development",
    "search-engine-optimization",
    "social-media-marketing",
    "graphic-designing",
    "crm-development"
];

const categorySlugs = [
    "web",
    "ecommerce",
    "software",
    "seo",
    "marketing",
    "creative",
    "crm"
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  // Add service categories
  categorySlugs.forEach(slug => {
    sitemap += `
  <url>
    <loc>${DOMAIN}/services/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Add service details
  serviceSlugs.forEach(slug => {
    sitemap += `
  <url>
    <loc>${DOMAIN}/services/detail/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Ensure public directory exists
  const publicPath = path.join(__dirname, '../public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  // Write sitemap to public folder
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

// Run the generator
generateSitemap();

export default generateSitemap;