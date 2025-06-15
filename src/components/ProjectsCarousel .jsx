import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, ArrowRight } from 'lucide-react';

const ProjectsCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [showProjectsPage, setShowProjectsPage] = useState(false);

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with React, Node.js, and MongoDB, featuring real-time inventory management and payment processing.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
            category: "Web Development",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            client: "RetailCorp",
            duration: "4 months",
            featured: true
        },
        {
            id: 2,
            title: "Healthcare Management System",
            description: "Comprehensive healthcare platform with patient management, appointment scheduling, and telemedicine capabilities.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
            category: "Healthcare",
            technologies: ["Vue.js", "Python", "PostgreSQL", "AWS"],
            client: "MedTech Solutions",
            duration: "6 months",
            featured: true
        },
        {
            id: 3,
            title: "Financial Analytics Dashboard",
            description: "Real-time financial dashboard with advanced analytics, reporting, and data visualization for investment firms.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            category: "Fintech",
            technologies: ["Angular", "Java", "Spring Boot", "D3.js"],
            client: "InvestPro",
            duration: "3 months",
            featured: true
        },
        {
            id: 4,
            title: "IoT Smart Home System",
            description: "Complete IoT solution for smart home automation with mobile app control and AI-powered energy optimization.",
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
            category: "IoT",
            technologies: ["React Native", "Python", "AWS IoT", "TensorFlow"],
            client: "SmartLiving Inc",
            duration: "5 months",
            featured: true
        },
        {
            id: 5,
            title: "Learning Management System",
            description: "Advanced LMS with video streaming, interactive quizzes, progress tracking, and AI-powered personalized learning paths.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
            category: "Education",
            technologies: ["Next.js", "GraphQL", "Firebase", "WebRTC"],
            client: "EduTech Academy",
            duration: "4 months",
            featured: true
        }
    ];

    useEffect(() => {
        if (isAutoPlaying && !showProjectsPage) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % projects.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, projects.length, showProjectsPage]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleViewProject = () => {
        setShowProjectsPage(true);
    };

    const handleViewAllProjects = () => {
        setShowProjectsPage(true);
    };

    const handleBackToCarousel = () => {
        setShowProjectsPage(false);
    };

    if (showProjectsPage) {
        return <ProjectsPage onBack={handleBackToCarousel} />;
    }

    return (
        <section className="py-20 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Featured <span className="text-blue-400">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Explore our portfolio of successful projects that showcase our expertise in delivering cutting-edge solutions across various industries.
                    </p>
                    <button
                        onClick={handleViewAllProjects}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                        View All Projects
                        <ArrowRight size={20} />
                    </button>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Main Carousel */}
                    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out h-full"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {projects.map((project, index) => (
                                <div key={project.id} className="w-full flex-shrink-0 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 z-20 flex items-center">
                                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                            <div className="max-w-2xl">
                                                <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                                                    {project.category}
                                                </div>
                                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                                    {project.title}
                                                </h3>
                                                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                                                    <span><strong>Client:</strong> {project.client}</span>
                                                    <span><strong>Duration:</strong> {project.duration}</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={handleViewProject}
                                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                                                    >
                                                        <ExternalLink size={16} />
                                                        View Project
                                                    </button>
                                                    <button className="flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold transition-colors">
                                                        <Github size={16} />
                                                        Source Code
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-30"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-30"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-blue-400 w-8'
                                    : 'bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    {[
                        { number: '100+', label: 'Projects Completed' },
                        { number: '15+', label: 'Industries Served' },
                        { number: '98%', label: 'Client Satisfaction' },
                        { number: '50+', label: 'Technologies Used' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-slate-800 rounded-xl">
                            <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                            <div className="text-gray-300">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsCarousel;