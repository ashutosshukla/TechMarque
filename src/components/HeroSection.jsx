import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, Cloud, Smartphone, Globe, Share2, Code2 } from 'lucide-react';

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const servicePills = [
        { label: 'Cloud Solutions', slug: 'custom-software-development' },
        { label: 'Web Development', slug: 'web-development' },
        { label: 'Ecommerce', slug: 'ecommerce-website' },
        { label: 'Mobile Apps', slug: 'custom-software-development' },
        { label: 'Social Media', slug: 'social-media-marketing' },
    ];

    return (
        <motion.section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0a0e27 0%, #0f1839 50%, #0d1624 100%)',
            }}
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-blue-400/10 rounded-full blur-3xl"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.2, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
            </div>

            {/* Grid Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.05) 25%, rgba(34, 211, 238, 0.05) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.05) 75%, rgba(34, 211, 238, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.05) 25%, rgba(34, 211, 238, 0.05) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.05) 75%, rgba(34, 211, 238, 0.05) 76%, transparent 77%, transparent)',
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                    { Icon: Cloud, top: '15%', left: '8%', delay: 0 },
                    { Icon: Smartphone, top: '25%', right: '12%', delay: 0.5 },
                    { Icon: Globe, top: '65%', left: '10%', delay: 1 },
                    { Icon: Share2, top: '70%', right: '8%', delay: 1.5 },
                    { Icon: Code2, top: '45%', right: '20%', delay: 0.8 },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-emerald-400/30"
                        style={{ top: item.top, left: item.left, right: item.right }}
                        animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                    >
                        <item.Icon size={48} />
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pt-20 md:pt-24 pb-16"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            >
                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Your Vision,
                        <motion.span
                            className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2 sm:mt-4"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Our Digital Expertise
                        </motion.span>
                    </h1>
                </motion.div>

                {/* Subheading */}
                <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    100+ projects delivered • 100+ satisfied clients • Expert team in cloud solutions, web & mobile development, social media & digital marketing
                </motion.p>

                {/* Service Pills — each navigates to its detail page */}
                <motion.div
                    className="flex flex-wrap gap-3 justify-center mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {servicePills.map((service, i) => (
                        <motion.span
                            key={i}
                            onClick={() => navigate(`/services/detail/${service.slug}`)}
                            className="px-4 py-2 rounded-full bg-gray-800/50 border border-emerald-500/30 text-gray-300 text-sm backdrop-blur-sm hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            {service.label}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.button
                        onClick={() => navigate('/services')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Our Services
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>

                    <motion.button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 border-2 border-emerald-500/50 text-emerald-400 font-semibold rounded-full hover:bg-emerald-500/10 transition-all duration-300 hover:border-emerald-400 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get In Touch
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-gray-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {[
                        { number: '100+', label: 'Projects Completed' },
                        { number: '100+', label: 'Happy Clients' },
                        { number: '5+', label: 'Years Experience' },
                        { number: '24/7', label: 'Client Support' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="group"
                            whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="text-emerald-400/60 drop-shadow-lg" size={32} />
            </motion.div>
        </motion.section>
    );
};

export default HeroSection;