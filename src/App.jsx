import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/FooterSection';
import './styles/globals.css';

// Lazy load non-critical routes
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/Dashboard/AdminDashboard'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const ServiceSection = lazy(() => import('./components/ServiceSection'));
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));
const ServiceCategory = lazy(() => import('./components/ServiceCategory'));
const Sitemap = lazy(() => import('./pages/Sitemap'));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0e27' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
      <span className="text-gray-400 text-sm">Loading...</span>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceSection />} />
            <Route path="/services/:category" element={<ServiceCategory />} />
            <Route path="/services/detail/:slug" element={<ServiceDetail />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
};

export default App;