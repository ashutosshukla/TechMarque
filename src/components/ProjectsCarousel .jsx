import React, { useState, useEffect, useRef } from 'react';
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

    const [cardsPerView, setCardsPerView] = useState(3);
    const [isMobile, setIsMobile] = useState(false);
    const maxIndex = Math.max(0, projectsData.length - cardsPerView);

    // Check if mobile view
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

    // Auto-slide functionality
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

    // Handle navigation
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

    // Touch/Mouse event handlers
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
            if (dragOffset > 0) {
                goToPrevious();
            } else {
                goToNext();
            }
        }

        setIsDragging(false);
        setDragOffset(0);
        setTimeout(() => setIsAutoPlay(true), 3000);
    };


    const ProjectCard = ({ project, isActive = false }) => (
        <div
            className={`flex-shrink-0 transition-all duration-500 ${isMobile
                ? 'w-full px-4'
                : `w-96 mx-4 ${isActive ? 'scale-105 z-10' : 'scale-95 opacity-75'}`
                }`}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group">

                {/* Image Section */}
                <div className={`relative overflow-hidden ${isMobile ? 'h-64' : 'h-80'}`}>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />

                </div>

                {/* Content Section */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-1 text-blue-600">
                            <Star size={16} fill="currentColor" />
                            <span className="text-sm font-semibold">{project.rating}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {project.description}
                    </p>


                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">

                            </div>
                            <div className="flex items-center gap-1">

                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {project.duration}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            {/* Header */}
            <div className="text-center mb-12 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    Featured <span className="text-blue-600">Projects</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Explore our cutting-edge projects that push the boundaries of technology and innovation.
                </p>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Navigation Buttons - Desktop Only */}
                {!isMobile && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-slate-600 p-3 rounded-full hover:bg-gray-50 transition-all duration-200 transform hover:scale-110 shadow-md"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-slate-600 p-3 rounded-full hover:bg-gray-50 transition-all duration-200 transform hover:scale-110 shadow-md"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Cards Container */}
                <div
                    className={`overflow-hidden ${isMobile ? 'mx-4' : ''}`}
                >
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
            <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: isMobile ? projectsData.length : maxIndex + 1 }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-blue-600 w-8'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>

        </section>
    );
};

export default ProjectsSlider;