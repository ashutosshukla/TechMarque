// components/Dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Users, TrendingUp, Save, X } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        status: 'draft',
        author: 'Admin',
        featuredImage: null
    });

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
        if (window.confirm('Are you sure you want to delete this blog?')) {
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
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const handleCreateNew = () => {
        setEditingBlog(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: '',
            tags: '',
            status: 'draft',
            author: 'Admin',
            featuredImage: null
        });
        setShowModal(true);
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            tags: blog.tags ? blog.tags.join(', ') : '',
            status: blog.status,
            author: blog.author,
            featuredImage: null
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('excerpt', formData.excerpt);
        submitData.append('content', formData.content);
        submitData.append('category', formData.category);
        submitData.append('tags', formData.tags);
        submitData.append('status', formData.status);
        submitData.append('author', formData.author);
        
        if (formData.featuredImage) {
            submitData.append('featuredImage', formData.featuredImage);
        }

        try {
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
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to save blog');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'featuredImage') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
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
                    <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
                    <p className="text-gray-600">Manage your blog content</p>
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
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">
                                        {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                                    </h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
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
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category._id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Excerpt *
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
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
                                        rows={12}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

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
                                            placeholder="react, javascript, web"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
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
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image
                                    </label>
                                    <input
                                        type="file"
                                        name="featuredImage"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                    >
                                        <Save size={20} />
                                        {editingBlog ? 'Update Blog' : 'Create Blog'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;