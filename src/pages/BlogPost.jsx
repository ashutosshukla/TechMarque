import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, Tag, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/blogs/${slug}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Blog post not found');
                }
                throw new Error('Failed to fetch blog post');
            }
            
            const data = await response.json();
            setBlog(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-20 min-h-screen flex flex-col justify-center items-center">
                <div className="text-red-600 text-xl mb-4">Error: {error}</div>
                <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="pt-20 min-h-screen flex flex-col justify-center items-center">
                <div className="text-gray-600 text-xl mb-4">Blog post not found</div>
                <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                {/* Featured Image */}
                {blog.featuredImage && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={`${API_URL}${blog.featuredImage}`}
                            alt={blog.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>
                )}

                {/* Article Header */}
                <header className="mb-8">
                    <div className="mb-4">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                            {blog.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={18} />
                            <span>{blog.views} views</span>
                        </div>
                    </div>

                    <p className="text-xl text-gray-700 leading-relaxed">
                        {blog.excerpt}
                    </p>
                </header>

                {/* Article Content */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div 
                        className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-slate-900"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Tag size={18} />
                                <span className="font-medium">Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default BlogPost;