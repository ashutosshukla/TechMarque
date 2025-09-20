// scripts/generateSitemap.js
// Dynamic sitemap generator for build process
import fs from 'fs';
import path from 'path';

// Your website domain
const DOMAIN = 'https://zavame.com';

// Static routes from your App.js
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/projects', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

// Dynamic routes - you would fetch these from your CMS/database
const dynamicRoutes = {
  services: [
    { slug: 'web-development', priority: '0.7' },
    { slug: 'mobile-development', priority: '0.7' },
    { slug: 'ui-ux-design', priority: '0.7' },
  ],
  serviceDetails: [
    { slug: 'react-development', priority: '0.6' },
    { slug: 'nodejs-development', priority: '0.6' },
    { slug: 'python-development', priority: '0.6' },
  ],
  blogPosts: [
    { slug: 'getting-started-with-react', date: '2025-01-10', priority: '0.6' },
    { slug: 'best-practices-web-development', date: '2025-01-05', priority: '0.6' },
  ]
};

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
  dynamicRoutes.services.forEach(service => {
    sitemap += `
  <url>
    <loc>${DOMAIN}/services/${service.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${service.priority}</priority>
  </url>`;
  });

  // Add service details
  dynamicRoutes.serviceDetails.forEach(service => {
    sitemap += `
  <url>
    <loc>${DOMAIN}/services/detail/${service.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${service.priority}</priority>
  </url>`;
  });

  // Add blog posts
  dynamicRoutes.blogPosts.forEach(post => {
    sitemap += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>${post.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Write sitemap to public folder
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

// Run the generator
generateSitemap();

export default generateSitemap;