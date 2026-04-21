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
      <meta property="og:site_name" content="Zavame" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Zavame Technologies",
          "url": "https://zavame.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://zavame.com/Zavame.svg"
          },
          "description": "Professional web development, mobile app development, and UI/UX design services",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Civil Lines",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "postalCode": "302006",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 9783598702",
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.instagram.com/zavame_technologies"
          ]
        })
      }} />

      {/* Website Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Zavame",
          "url": "https://zavame.com",
          "description": description
        })
      }} />
    </>
  );
    </>
  );
};

export default SEO;