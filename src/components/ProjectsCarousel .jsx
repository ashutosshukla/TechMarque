import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight, Eye, Github, Heart, Star, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const ProjectsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [setHoveredCard] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState(0);
    const sliderRef = useRef(null);
    const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const [cardsPerView, setCardsPerView] = useState(3);
    const [isMobile, setIsMobile] = useState(false);
    const maxIndex = Math.max(0, projectsData.length - cardsPerView);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setCardsPerView(mobile ? 1 : 3);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isAutoPlay || isDragging) return;
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const maxIdx = isMobile ? projectsData.length - 1 : maxIndex;
                return prevIndex >= maxIdx ? 0 : prevIndex + 1;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlay, isDragging, maxIndex, isMobile]);

    const goToNext = () => {
        setCurrentIndex(prevIndex => {
            const maxIdx = isMobile ? projectsData.length - 1 : maxIndex;
            return prevIndex >= maxIdx ? 0 : prevIndex + 1;
        });
    };

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => {
            const maxIdx = isMobile ? projectsData.length - 1 : maxIndex;
            return prevIndex <= 0 ? maxIdx : prevIndex - 1;
        });
    };

    const handleStart = (e) => {
        setIsDragging(true);
        setIsAutoPlay(false);
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        setDragStart({ x: clientX, y: 0 });
    };

    const handleMove = (e) => {
        if (!isDragging) return;
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = clientX - dragStart.x;
        setDragOffset(deltaX);
    };

    const handleEnd = () => {
        if (!isDragging) return;
        const threshold = 100;
        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0) goToPrevious();
            else goToNext();
        }
        setIsDragging(false);
        setDragOffset(0);
        setTimeout(() => setIsAutoPlay(true), 3000);
    };

    const ProjectCard = ({ project, isActive = false }) => (
        <div
            className={`flex-shrink-0 transition-all duration-500 ${isMobile
                ? 'w-full px-4'
                : `w-96 mx-4 ${isActive ? 'scale-100 z-10' : 'scale-95 opacity-60'}`
                }`}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-zavame-teal/30 transition-all duration-500 group">
                {/* Image Section */}
                <div className={`relative overflow-hidden ${isMobile ? 'h-56' : 'h-72'}`}>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zavame-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-zavame-teal transition-colors duration-300">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-1 text-zavame-teal">
                            <Star size={14} fill="currentColor" />
                            <span className="text-sm font-semibold">{project.rating}</span>
                        </div>
                    </div>

                    <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-1 text-xs bg-zavame-teal/10 text-zavame-teal rounded-full border border-zavame-teal/20">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {project.duration}
                        </div>
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zavame-teal hover:text-zavame-teal-light flex items-center gap-1 transition-colors"
                            >
                                <Eye size={12} />
                                View
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section
            className="py-24 overflow-hidden relative"
            style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0d1230 50%, #0a0e27 100%)' }}
            ref={sectionRef}
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-80 h-80 bg-zavame-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zavame-blue/5 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <motion.div
                className="text-center mb-14 px-4 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <motion.span
                    className="inline-block px-4 py-2 rounded-full bg-zavame-teal/10 border border-zavame-teal/30 text-zavame-teal text-sm font-medium mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Our Work
                </motion.span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Featured <span className="text-zavame-teal">Projects</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    Explore our cutting-edge projects that push the boundaries of technology and innovation.
                </p>
            </motion.div>

            {/* Slider Container */}
            <div className="relative">
                {/* Navigation Buttons - Desktop Only */}
                {!isMobile && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-zavame-teal/20 hover:text-zavame-teal transition-all duration-300 border border-white/10 hover:border-zavame-teal/30"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-zavame-teal/20 hover:text-zavame-teal transition-all duration-300 border border-white/10 hover:border-zavame-teal/30"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </>
                )}

                {/* Cards Container */}
                <div className={`overflow-hidden ${isMobile ? 'mx-4' : ''}`}>
                    <div
                        ref={sliderRef}
                        className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
                        style={{
                            transform: `translateX(${isMobile ? (-currentIndex * 100) + '%' : ((-currentIndex * 416) + dragOffset) + 'px'})`,
                        }}
                        onMouseDown={handleStart}
                        onMouseMove={handleMove}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={handleStart}
                        onTouchMove={handleMove}
                        onTouchEnd={handleEnd}
                    >
                        {projectsData.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isActive={!isMobile && index >= currentIndex && index < currentIndex + cardsPerView}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-10 gap-2">
                {Array.from({ length: isMobile ? projectsData.length : maxIndex + 1 }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-zavame-teal w-8'
                            : 'bg-white/20 w-2 hover:bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProjectsSlider;