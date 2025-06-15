import React from 'react';
import BlogList from '../components/BlogList';

const Blog = () => {
    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Our <span className="text-blue-400">Blog</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                        Stay updated with the latest insights, trends, and innovations in technology and business solutions.
                    </p>
                </div>
            </div>

            {/* Blog List */}
            <BlogList />
        </div>
    );
};

export default Blog;