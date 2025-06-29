import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Calendar, Eye, Heart, Star } from 'lucide-react';

const ProjectsMarquee = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Next-generation e-commerce platform with AI-powered recommendations and real-time analytics.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
            category: "Web Development",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            client: "RetailCorp",
            duration: "4 months",
            views: "2.5k",
            likes: "187",
            rating: 4.9,
            color: "from-blue-600 to-purple-600",
            featured: true
        },
        {
            id: 2,
            title: "Healthcare Management System",
            description: "Comprehensive healthcare platform with telemedicine and patient management capabilities.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
            category: "Web Development",
            technologies: ["Vue.js", "Python", "PostgreSQL", "AWS"],
            client: "MedTech Solutions",
            duration: "6 months",
            views: "1.8k",
            likes: "142",
            rating: 4.8,
            color: "from-emerald-600 to-teal-600",
            featured: false
        },
        {
            id: 3,
            title: "AI Trading Bot",
            description: "Intelligent trading system using machine learning for market prediction and automated trading.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            category: "AI/ML",
            technologies: ["Python", "TensorFlow", "FastAPI", "Redis"],
            client: "FinanceAI",
            duration: "3 months",
            views: "3.2k",
            likes: "298",
            rating: 4.9,
            color: "from-amber-600 to-orange-600",
            featured: true
        },
        {
            id: 4,
            title: "Smart Home IoT App",
            description: "Revolutionary mobile app for smart home automation with voice control and energy optimization.",
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
            category: "Mobile",
            technologies: ["React Native", "Firebase", "AWS IoT", "TensorFlow"],
            client: "SmartLiving Inc",
            duration: "5 months",
            views: "4.1k",
            likes: "356",
            rating: 4.7,
            color: "from-rose-600 to-pink-600",
            featured: false
        },
        {
            id: 5,
            title: "DeFi Platform",
            description: "Decentralized finance platform with yield farming, staking, and cross-chain capabilities.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
            category: "Blockchain",
            technologies: ["Solidity", "Web3.js", "React", "Hardhat"],
            client: "CryptoFuture",
            duration: "8 months",
            views: "5.7k",
            likes: "423",
            rating: 4.8,
            color: "from-indigo-600 to-purple-600",
            featured: true
        },
        {
            id: 6,
            title: "Learning Management System",
            description: "AI-powered educational platform with personalized learning paths and real-time collaboration.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
            category: "AI/ML",
            technologies: ["Next.js", "GraphQL", "Firebase", "OpenAI"],
            client: "EduTech Academy",
            duration: "4 months",
            views: "2.9k",
            likes: "201",
            rating: 4.6,
            color: "from-cyan-600 to-blue-600",
            featured: false
        }
    ];

    const handleViewProject = (projectId) => {
        console.log('View project:', projectId);
    };

    const ProjectCard = ({ project, className = "" }) => (
        <div
            className={`flex-shrink-0 w-80 mx-4 group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${className}`}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            {/* Featured Badge */}
            {project.featured && (
                <div className="absolute top-3 right-3 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                        FEATURED
                    </div>
                </div>
            )}

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-30`}></div>

                {/* Overlay on Hover */}
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredCard === project.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <button
                        onClick={() => handleViewProject(project.id)}
                        className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <Eye size={18} />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <Github size={18} />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <Heart size={18} />
                    </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 bg-gradient-to-r ${project.color} text-white text-xs font-semibold rounded-full shadow-lg`}>
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-semibold">{project.rating}</span>
                    </div>
                </div>

                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Eye size={12} />
                            {project.views}
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart size={12} />
                            {project.likes}
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {project.duration}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => handleViewProject(project.id)}
                    className={`w-full bg-gradient-to-r ${project.color} text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 text-sm group`}
                >
                    View Project
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );

    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-gray-100 overflow-hidden">
            {/* Header */}
            <div className="text-center mb-12 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Featured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore our cutting-edge projects that push the boundaries of technology and innovation.
                </p>
            </div>

            {/* First Marquee Row - Left to Right */}
            <div className="relative mb-8">
                <div className="flex animate-marquee-left">
                    {/* First set of cards */}
                    {projects.map((project) => (
                        <ProjectCard key={`left-1-${project.id}`} project={project} />
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {projects.map((project) => (
                        <ProjectCard key={`left-2-${project.id}`} project={project} />
                    ))}
                </div>
            </div>

            {/* Second Marquee Row - Right to Left */}
            <div className="relative">
                <div className="flex animate-marquee-right">
                    {/* First set of cards */}
                    {projects.map((project) => (
                        <ProjectCard key={`right-1-${project.id}`} project={project} />
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {projects.map((project) => (
                        <ProjectCard key={`right-2-${project.id}`} project={project} />
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 px-4">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    View All Projects
                </button>
            </div>

            <style jsx>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                
                .animate-marquee-left {
                    animation: marquee-left 30s linear infinite;
                }
                
                .animate-marquee-right {
                    animation: marquee-right 30s linear infinite;
                }
                
                .animate-marquee-left:hover,
                .animate-marquee-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default ProjectsMarquee;