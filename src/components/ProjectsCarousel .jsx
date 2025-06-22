import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight, Calendar, User, Eye, Heart, Star, Play, Pause } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
            ease: "easeOut"
        }
    }
};

const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 1
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -15,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 25,
            mass: 0.8
        }
    }
};

const ModernProjectsGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    const categories = ['All', 'Web Development', 'Mobile', 'AI/ML', 'Blockchain'];

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Next-generation e-commerce platform with AI-powered recommendations and real-time analytics.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
            category: "Web Development",
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
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

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    // Auto-cycling effect
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [filteredProjects.length, isAutoPlaying]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentSlide(0); // Reset to first slide when category changes
    };

    const handleViewProject = (projectId) => {
        console.log('View project:', projectId);
    };

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Get current set of cards to display (3 cards at a time)
    const getDisplayedProjects = () => {
        const displayCount = 3;
        const projects = [];
        for (let i = 0; i < displayCount; i++) {
            const index = (currentSlide + i) % filteredProjects.length;
            projects.push(filteredProjects[index]);
        }
        return projects;
    };

    const displayedProjects = getDisplayedProjects();

    return (
        <motion.section
            ref={ref}
            className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-100 min-h-screen relative overflow-hidden"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <motion.h2
                        className="text-6xl md:text-7xl font-bold text-gray-900 mb-6"
                        variants={itemVariants}
                    >
                        Featured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
                        variants={itemVariants}
                    >
                        Explore our cutting-edge projects that push the boundaries of technology and innovation.
                    </motion.p>

                    {/* Category Filter */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mb-8"
                        variants={itemVariants}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'
                                    }`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Auto-play Controls */}
                    <motion.div
                        className="flex justify-center items-center gap-4 mb-8"
                        variants={itemVariants}
                    >
                        <motion.button
                            onClick={toggleAutoPlay}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                            {isAutoPlaying ? 'Pause' : 'Play'}
                        </motion.button>

                        {/* Slide Indicators */}
                        <div className="flex gap-2">
                            {filteredProjects.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? 'bg-purple-600'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    layout
                >
                    <AnimatePresence mode="wait">
                        {displayedProjects.map((project, index) => (
                            <motion.div
                                key={`${project.id}-${currentSlide}`}
                                layout
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500"
                                onHoverStart={() => setHoveredCard(project.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Featured Badge */}
                                {project.featured && (
                                    <motion.div
                                        className="absolute top-4 right-4 z-20"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                                            FEATURED
                                        </div>
                                    </motion.div>
                                )}

                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40`}></div>

                                    {/* Overlay on Hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredCard === project.id ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.button
                                            onClick={() => handleViewProject(project.id)}
                                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Eye size={20} />
                                        </motion.button>
                                        <motion.button
                                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Github size={20} />
                                        </motion.button>
                                        <motion.button
                                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Heart size={20} />
                                        </motion.button>
                                    </motion.div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 bg-gradient-to-r ${project.color} text-white text-sm font-semibold rounded-full shadow-lg`}>
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="text-sm font-semibold">{project.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                            <motion.span
                                                key={techIndex}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-gray-200 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Eye size={14} />
                                                {project.views}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart size={14} />
                                                {project.likes}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {project.duration}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <motion.button
                                        onClick={() => handleViewProject(project.id)}
                                        className={`w-full bg-gradient-to-r ${project.color} text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300`}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        View Project
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Statistics Section */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                    variants={containerVariants}
                >
                    {[
                        { number: '100+', label: 'Projects Completed' },
                        { number: '50+', label: 'Happy Clients' },
                        { number: '25+', label: 'Technologies' },
                        { number: '99%', label: 'Success Rate' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                scale: 1.05,
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </motion.section>
    );
};

export default ModernProjectsGrid;