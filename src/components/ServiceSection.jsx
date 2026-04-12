import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import {
    Code, Cloud, Shield, Users,
    Settings, Lock, Cpu, Link,
    CheckCircle, ArrowRight, Phone, ChevronLeft,
    Globe, Zap, Smartphone, Megaphone, Database
} from 'lucide-react';

const ServiceSection = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(category || 'all');
    const [hoveredService, setHoveredService] = useState(null);

    useEffect(() => {
        console.log('Current category:', activeCategory);
        console.log('Filtered services:', services.filter(service =>
            activeCategory === 'all' || service.category === activeCategory
        ));
    }, [activeCategory]);

    const iconComponents = {
        Code: Code,
        Cloud: Cloud,
        Shield: Shield,
        Users: Users,
        Settings: Settings,
        Lock: Lock,
        Cpu: Cpu,
        Link: Link,
        Globe: Globe,
        Zap: Zap,
        Smartphone: Smartphone,
        Megaphone: Megaphone,
        Database: Database
    };

    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    const categories = ['all', ...new Set(services.map(s => s.category))];

    const handleCategoryChange = (categorySlug) => {
        setActiveCategory(categorySlug);
        navigate(`/services/${categorySlug}`);
    };

    const handleLearnMore = (slug) => {
        navigate(`/services/detail/${slug}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0f1839 50%, #0a0e27 100%)' }}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-zavame-teal/8 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-32 right-10 w-96 h-96 bg-zavame-blue/8 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
            </div>

            {/* Hero Section */}
            <motion.section
                className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.div
                            className="inline-block mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="px-4 py-2 rounded-full bg-zavame-teal/10 border border-zavame-teal/30 backdrop-blur-sm">
                                <p className="text-zavame-teal text-sm font-medium">💡 World-Class Digital Solutions</p>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Our <span className="bg-gradient-to-r from-zavame-teal to-zavame-blue bg-clip-text text-transparent">Digital Services</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Comprehensive IT solutions designed to accelerate your business growth. From cloud infrastructure to cutting-edge web and mobile applications.
                        </motion.p>

                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.button
                                className="group relative px-8 py-4 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white font-semibold rounded-full overflow-hidden hover:shadow-2xl hover:shadow-zavame-teal/40 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Free Consultation
                                    <Phone size={18} className="group-hover:animate-pulse" />
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Category Filter */}
                    <motion.div
                        className="flex flex-wrap gap-3 justify-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 backdrop-blur-sm ${activeCategory === cat
                                        ? 'bg-gradient-to-r from-zavame-teal to-zavame-blue text-white shadow-lg shadow-zavame-teal/30'
                                        : 'bg-white/5 border border-white/10 text-gray-300 hover:border-zavame-teal/40 hover:bg-zavame-teal/10 hover:text-zavame-teal'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Services Grid */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {filteredServices.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredServices.map((service, index) => {
                                const IconComponent = iconComponents[service.icon];

                                if (!IconComponent) {
                                    console.error(`Missing icon for: ${service.icon}`);
                                    return null;
                                }

                                return (
                                    <motion.div
                                        key={service.id}
                                        variants={cardVariants}
                                        onMouseEnter={() => setHoveredService(service.id)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        className="relative group"
                                    >
                                        {/* Glow */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-br from-zavame-teal/20 to-zavame-blue/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

                                        {/* Card */}
                                        <div className="relative h-full bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 group-hover:border-zavame-teal/30 transition-all duration-300 flex flex-col">
                                            {/* Icon */}
                                            <div className="mb-6 inline-block">
                                                <motion.div
                                                    className="p-3 bg-zavame-teal/10 rounded-xl group-hover:bg-zavame-teal/20 transition-all duration-300"
                                                    animate={hoveredService === service.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <IconComponent className="text-zavame-teal group-hover:text-zavame-teal-light transition-colors duration-300" size={28} />
                                                </motion.div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-zavame-teal transition-colors duration-300">
                                                {service.title}
                                            </h3>

                                            <p className="text-gray-400 mb-6 leading-relaxed flex-grow text-sm">
                                                {service.shortDescription}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-2.5 mb-8">
                                                {service.features.slice(0, 3).map((feature, featureIndex) => (
                                                    <motion.div
                                                        key={featureIndex}
                                                        className="flex items-start gap-2.5"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: featureIndex * 0.1 }}
                                                    >
                                                        <CheckCircle className="text-zavame-teal flex-shrink-0 mt-0.5" size={14} />
                                                        <span className="text-gray-300 text-sm">{feature}</span>
                                                    </motion.div>
                                                ))}
                                                {service.features.length > 3 && (
                                                    <div className="text-gray-500 text-xs pl-6">
                                                        +{service.features.length - 3} more features
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                <motion.button
                                                    onClick={() => handleLearnMore(service.slug)}
                                                    className="text-zavame-teal hover:text-zavame-teal-light font-semibold flex items-center gap-2 group/btn transition-all text-sm"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    Learn More
                                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                                                </motion.button>
                                                {service.pricing && (
                                                    <div className="text-xs text-zavame-teal/60 font-medium">
                                                        {service.pricing}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-300 mb-6">No services found in this category</h3>
                            <motion.button
                                onClick={() => handleCategoryChange('all')}
                                className="px-8 py-4 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white font-semibold rounded-full hover:shadow-lg hover:shadow-zavame-teal/40 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Browse All Services
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="relative py-20 px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-lg text-gray-400 mb-10">
                        Let's discuss how our digital solutions can drive your success.
                    </p>
                    <motion.button
                        className="group relative px-10 py-5 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white font-bold text-lg rounded-full overflow-hidden hover:shadow-2xl hover:shadow-zavame-teal/40 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Start Your Project
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                    </motion.button>
                </div>
            </motion.section>
        </div>
    );
};

export default ServiceSection;