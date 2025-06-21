import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, Tag, ArrowLeft, Share2, Heart, Bookmark, Clock } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);

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

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return readTime;
    };

    const getImageUrl = () => {
        if (blog?.featuredImage) {
            if (typeof blog.featuredImage === 'object' && blog.featuredImage.url) {
                return blog.featuredImage.url;
            }
            if (typeof blog.featuredImage === 'string') {
                if (blog.featuredImage.startsWith('http')) {
                    return blog.featuredImage;
                }
                return `${API_URL}${blog.featuredImage}`;
            }
        }
        return null;
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const toggleLike = () => {
        setLiked(!liked);
       
    };

    if (loading) {
        return (
            <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                    <p className="text-gray-600 font-medium">Loading amazing content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center items-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">😔</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-6">Error: {error}</p>
                    <Link 
                        to="/blog" 
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center items-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                    <div className="text-gray-400 text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Found</h2>
                    <p className="text-gray-600 mb-6">This blog post doesn't exist or has been moved.</p>
                    <Link 
                        to="/blog" 
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Explore Other Posts
                    </Link>
                </div>
            </div>
        );
    }

    const imageUrl = getImageUrl();
    const readTime = calculateReadTime(blog.content);

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="relative">
                {imageUrl && (
                    <div className="h-96 md:h-[500px] relative overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Floating Action Buttons */}
                        <div className="absolute top-6 right-6 flex gap-3">
                            <button
                                onClick={handleShare}
                                className="bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                {/* Back Button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <header className="mb-12 relative">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                            {blog.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock size={16} />
                            <span className="text-sm">{readTime} min read</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={18} />
                            <span>{blog.views.toLocaleString()} views</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 shadow-sm">
                        <p className="text-xl text-gray-700 leading-relaxed font-light italic">
                            {blog.excerpt}
                        </p>
                    </div>
                </header>

                {/* Article Content */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                    
                    <div className="relative z-10">
                        <div 
                            className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-slate-900 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>
                </div>

                {/* Engagement Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={toggleLike}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                                    liked 
                                        ? 'bg-red-100 text-red-600 shadow-md' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                                }`}
                            >
                                <Heart size={20} className={liked ? 'fill-current' : ''} />
                                <span className="font-medium">{blog.likes + (liked ? 1 : 0)}</span>
                            </button>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                                <Eye size={20} />
                                <span className="font-medium">{blog.views.toLocaleString()} views</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-gray-500 text-sm">Written by</p>
                            <p className="font-bold text-gray-800">{blog.author}</p>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8">
                        <div className="flex items-start gap-6 flex-wrap">
                            <div className="flex items-center gap-2 text-gray-600 min-w-fit">
                                <Tag size={20} />
                                <span className="font-semibold text-lg">Topics:</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                    <p className="text-blue-100 mb-6">Discover more amazing content on our blog!</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        Explore More Posts
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;