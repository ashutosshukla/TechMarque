import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Users, TrendingUp, Save, X, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        status: 'draft',
        author: 'Admin',
        featuredImage: null,
        metaTitle: '',
        metaDescription: '',
        keywords: ''
    });
    const [errors, setErrors] = useState({});

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (token) {
            fetchStats();
            fetchBlogs();
            fetchCategories();
        }
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/blogs`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/api/categories`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog? This will also delete the associated image from Cloudinary.')) {
            try {
                const response = await fetch(`${API_URL}/api/admin/blogs/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    fetchBlogs();
                    fetchStats();
                } else {
                    const error = await response.json();
                    alert(error.error || 'Failed to delete blog');
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
                alert('Failed to delete blog');
            }
        }
    };

    const handleCreateNew = () => {
        setEditingBlog(null);
        setImagePreview(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: '',
            tags: '',
            status: 'draft',
            author: 'Admin',
            featuredImage: null,
            metaTitle: '',
            metaDescription: '',
            keywords: ''
        });
        setErrors({});
        setShowModal(true);
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setImagePreview(blog.featuredImage?.url || null);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            tags: blog.tags ? blog.tags.join(', ') : '',
            status: blog.status,
            author: blog.author,
            featuredImage: null,
            metaTitle: blog.seo?.metaTitle || '',
            metaDescription: blog.seo?.metaDescription || '',
            keywords: blog.seo?.keywords ? blog.seo.keywords.join(', ') : ''
        });
        setErrors({});
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                setErrors(prev => ({...prev, featuredImage: 'File size must be less than 10MB'}));
                return;
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({...prev, featuredImage: 'Only JPEG, PNG, GIF, and WebP files are allowed'}));
                return;
            }

            setErrors(prev => ({...prev, featuredImage: ''}));
            setFormData(prev => ({ ...prev, featuredImage: file }));
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, featuredImage: null }));
        setImagePreview(editingBlog?.featuredImage?.url || null);
        const fileInput = document.querySelector('input[name="featuredImage"]');
        if (fileInput) fileInput.value = '';
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';
        if (!formData.category) newErrors.category = 'Category is required';
        
        if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
        if (formData.excerpt.length > 300) newErrors.excerpt = 'Excerpt must be less than 300 characters';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setUploading(true);
        
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title.trim());
            submitData.append('excerpt', formData.excerpt.trim());
            submitData.append('content', formData.content.trim());
            submitData.append('category', formData.category);
            submitData.append('tags', formData.tags);
            submitData.append('status', formData.status);
            submitData.append('author', formData.author);
            submitData.append('metaTitle', formData.metaTitle);
            submitData.append('metaDescription', formData.metaDescription);
            submitData.append('keywords', formData.keywords);
            
            if (formData.featuredImage) {
                submitData.append('featuredImage', formData.featuredImage);
            }

            const url = editingBlog 
                ? `${API_URL}/api/admin/blogs/${editingBlog._id}`
                : `${API_URL}/api/admin/blogs`;
            
            const method = editingBlog ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: submitData
            });

            if (response.ok) {
                setShowModal(false);
                fetchBlogs();
                fetchStats();
                setImagePreview(null);
                alert(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to save blog');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Admin Login Required</h2>
                    <p>Please log in to access the dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">TechMarque Blog Dashboard</h1>
                    <p className="text-gray-600">Manage your blog content with Cloudinary integration</p>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'overview'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('blogs')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'blogs'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                All Blogs
                            </button>
                        </nav>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-100">
                                        <FileText className="text-blue-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">Total Blogs</p>
                                        <p className="text-2xl font-bold">{stats.totalBlogs || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-green-100">
                                        <Eye className="text-green-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">Published</p>
                                        <p className="text-2xl font-bold">{stats.publishedBlogs || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-yellow-100">
                                        <Edit className="text-yellow-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">Drafts</p>
                                        <p className="text-2xl font-bold">{stats.draftBlogs || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-purple-100">
                                        <TrendingUp className="text-purple-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">Total Views</p>
                                        <p className="text-2xl font-bold">{stats.totalViews || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Blogs */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium">Recent Blogs</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stats.recentBlogs?.map((blog) => (
                                            <tr key={blog._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        blog.status === 'published' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : blog.status === 'draft'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {blog.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {blog.views}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDate(blog.createdAt)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'blogs' && (
                    <div>
                        {/* Create New Blog Button */}
                        <div className="mb-6">
                            <button 
                                onClick={handleCreateNew}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Create New Blog
                            </button>
                        </div>

                        {/* Blogs Table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {blogs.map((blog) => (
                                            <tr key={blog._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {blog.featuredImage?.url ? (
                                                        <img 
                                                            src={blog.featuredImage.url} 
                                                            alt={blog.title}
                                                            className="h-12 w-12 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <ImageIcon size={20} className="text-gray-400" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                        {blog.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {blog.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        blog.status === 'published' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : blog.status === 'draft'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {blog.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {blog.views}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDate(blog.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(blog)}
                                                            className="text-blue-600 hover:text-blue-900 p-1"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteBlog(blog._id)}
                                                            className="text-red-600 hover:text-red-900 p-1"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for Create/Edit Blog */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">
                                        {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                                    </h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                        disabled={uploading}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title * <span className="text-xs text-gray-500">({formData.title.length}/100)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            maxLength={100}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.title ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.category ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category._id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Excerpt * <span className="text-xs text-gray-500">({formData.excerpt.length}/300)</span>
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        required
                                        maxLength={300}
                                        rows={3}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.excerpt ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Brief description of your blog post..."
                                    />
                                    {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
                                </div>

                                {/* Featured Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image
                                        <span className="text-xs text-gray-500 ml-2">
                                            (Max 10MB - JPEG, PNG, GIF, WebP)
                                        </span>
                                    </label>
                                    
                                    {imagePreview ? (
                                        <div className="mb-4">
                                            <div className="relative inline-block">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="h-32 w-48 object-cover rounded-lg border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {formData.featuredImage ? 'New image selected' : 'Current image'}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">No image selected</p>
                                        </div>
                                    )}
                                    
                                    <input
                                        type="file"
                                        name="featuredImage"
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                        onChange={handleFileChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.featuredImage ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.featuredImage && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.featuredImage}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Content *
                                    </label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                        rows={15}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.content ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Write your blog content here... You can use Markdown formatting."
                                    />
                                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                                </div>

                                {/* Metadata */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tags (comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            name="tags"

                                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g. react, javascript, web development"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* SEO Section */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                name="metaTitle"
                                value={formData.metaTitle}
                                onChange={handleInputChange}
                                maxLength={60}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="SEO title for search engines"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.metaTitle.length}/60 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleInputChange}
                                maxLength={160}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Brief description for search engines"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.metaDescription.length}/160 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Keywords (comma separated)
                            </label>
                            <input
                                type="text"
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g. react tutorial, web development, javascript"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        disabled={uploading}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                {editingBlog ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                {editingBlog ? 'Update Blog' : 'Create Blog'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading...</span>
                    </div>
                )}

                {/* Empty State */}
                {!loading && blogs.length === 0 && activeTab === 'blogs' && (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating your first blog post.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={handleCreateNew}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                            >
                                <Plus size={20} />
                                Create New Blog
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;