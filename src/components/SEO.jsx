// components/SEO.jsx
import React from 'react';

const SEO = ({
  title = 'Zavame - Professional Web Development Services',
  description = 'Zavame offers professional web development, mobile development, and UI/UX design services. Transform your ideas into digital reality.',
  keywords = 'web development, mobile development, UI UX design, React development, Node.js, zavame',
  canonicalUrl,
  ogImage = 'https://zavame.com/og-image.jpg',
  twitterHandle = '@zavame',
  author = 'Zavame',
  type = 'website'
}) => {
  const siteUrl = 'https://zavame.com';
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <>
      {/* React 19 automatically hoists these to <head> */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Zavame" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Zavame",
          "url": "https://zavame.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://zavame.com/logo.png",
            "width": "300",
            "height": "100"
          },
          "description": "Professional web development, mobile app development, and UI/UX design services",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://twitter.com/zavame",
            "https://linkedin.com/company/zavame",
            "https://github.com/zavame"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-XXX-XXX-XXXX",
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "founder": {
            "@type": "Person",
            "name": "Zavame Team"
          },
          "foundingDate": "2020",
          "numberOfEmployees": "10-50",
          "priceRange": "$$",
          "serviceArea": {
            "@type": "Place",
            "name": "Worldwide"
          }
        })
      }} />

      {/* Website Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Zavame",
          "url": "https://zavame.com",
          "description": description,
          "publisher": {
            "@type": "Organization",
            "name": "Zavame"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://zavame.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }} />
    </>
  );
};

export default SEO;