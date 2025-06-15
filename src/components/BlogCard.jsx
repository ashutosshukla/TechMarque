// components/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Tag } from 'lucide-react';

const BlogCard = ({ blog }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {blog.featuredImage && (
                <div className="relative h-48 overflow-hidden"> 
                    <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${blog.featuredImage}`}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {blog.category}
                        </span>
                    </div>
                </div>
            )}
            
            <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{blog.views}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${blog.slug}`}>
                        {blog.title}
                    </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                </p>

                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                        <Tag size={16} className="text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;