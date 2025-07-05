import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Calendar, User, Tag } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const ProjectsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTech, setSelectedTech] = useState('All');

    const categories = ['All', 'Web Development', 'Healthcare', 'Fintech', 'IoT', 'Education', 'E-commerce', 'Mobile Apps'];
    const technologies = ['All', 'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL'];

    const filteredProjects = projectsData.filter(project => {
        const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
        const techMatch = selectedTech === 'All' || project.technologies.includes(selectedTech);
        return categoryMatch && techMatch;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Our <span className="text-blue-400">Projects</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover our portfolio of innovative solutions that have transformed businesses across various industries. Each project represents our commitment to excellence and cutting-edge technology.
                    </p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Filter className="text-gray-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technology</label>
                            <select
                                value={selectedTech}
                                onChange={(e) => setSelectedTech(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {technologies.map(tech => (
                                    <option key={tech} value={tech}>{tech}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {selectedCategory === 'All' ? 'All Projects' : selectedCategory}
                            <span className="text-gray-500 ml-2">({filteredProjects.length})</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    {project.featured && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Tag className="text-blue-600" size={16} />
                                        <span className="text-sm font-medium text-blue-600">{project.category}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            <span>{project.client}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{project.year}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                            <ExternalLink size={16} />
                                            View Project
                                        </button>
                                        <button className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                                            <Github size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <Filter size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                            <p className="text-gray-600">Try adjusting your filters to see more projects.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Let's discuss how we can bring your vision to life with our expertise and innovative solutions.
                    </p>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors text-lg"
                    >
                        Start Your Project
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;