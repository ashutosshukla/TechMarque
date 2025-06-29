import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInFromLeft, fadeInFromRight, popIn, scaleUp, containerVariants, itemVariants } from '../utils/animations';

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.section
            id="home"
            className="relative min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-16 sm:pt-0"
            style={{
                scrollMarginTop: '4rem',
            }}
        >
            {/* Animated Background Elements - Faster animations */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                />
            </div>

            {/* Floating Code Elements - Faster float animation */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-blue-400/20 font-mono text-sm"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            transform: `translateY(${scrollY * 0.1}px)`
                        }}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                            y: [0, -15, 0]
                        }}
                        transition={{
                            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
                        }}
                    >
                        {['</>', '{}', '[]', '()', '::', '=>'][i]}
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-8 sm:mt-0"
            >
                <motion.div
                    className="transform transition-all duration-300 ease-out"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        Transforming Ideas Into
                        <motion.span
                            className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2 sm:mt-4"
                        >
                            Digital Solutions
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        We craft cutting-edge IT solutions that drive innovation, streamline operations, and accelerate your business growth in the digital age.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    >
                        <motion.button
                            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                        >
                            Explore Our Services
                            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={20} />
                        </motion.button>

                        <motion.button
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                        >
                            Get In Touch
                        </motion.button>
                    </motion.div>

                    {/* Stats - Faster animations */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
                    >
                        {[
                            { number: '100+', label: 'Projects Completed' },
                            { number: '50+', label: 'Happy Clients' },
                            { number: '5+', label: 'Years Experience' },
                            { number: '24/7', label: 'Support' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="transform hover:scale-110 transition-all duration-200"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.15 }
                                }}
                            >
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                                <div className="text-gray-300 text-xs sm:text-sm md:text-base">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator - Faster bounce */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{
                    y: [0, -8, 0]
                }}
                transition={{
                    y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <ChevronDown className="text-white/60" size={32} />
            </motion.div>
        </motion.section>
    );
};

export default HeroSection;