import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import {
    Code, Cloud, Shield, Users,
    Settings, Lock, Cpu, Link, Globe,
    CheckCircle, ArrowRight, Phone, ChevronLeft, ShoppingCart,
    Zap, Smartphone, Megaphone, Database, Calendar, Briefcase
} from 'lucide-react';

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Find the service by slug
    const service = services.find(s => s.slug === slug);

    if (!service) {
        return (
            <motion.div
                className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center">
                    <motion.h2
                        className="text-4xl font-bold text-white mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Service Not Found
                    </motion.h2>
                    <motion.button
                        onClick={() => navigate('/services')}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Back to Services
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    // Map icon names to components
    const iconComponents = {
        Code, Cloud, Shield, Users,
        Settings, Lock, Cpu, Link, Globe, ShoppingCart,
        Zap, Smartphone, Megaphone, Database
    };
    const IconComponent = iconComponents[service.icon];

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
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
                    {/* Back Button */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-emerald-400 hover:text-cyan-400 font-medium mb-8 group transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ x: -5 }}
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="ml-2">Back to Services</span>
                    </motion.button>

                    {/* Hero Content */}
                    <div className="text-center">
                        {/* Icon */}
                        <motion.div
                            className="inline-flex items-center justify-center mb-8"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="relative p-6 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-500/30 backdrop-blur-xl">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"
                                />
                                {IconComponent && (
                                    <IconComponent className="text-emerald-400 relative z-10" size={56} />
                                )}
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {service.title}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {service.shortDescription}
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            {/* Service Details Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <motion.div
                            className="lg:col-span-2 space-y-12"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Overview */}
                            <motion.div variants={itemVariants}>
                                <h2 className="text-4xl font-bold text-white mb-6">Service Overview</h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {service.detailedDescription}
                                </p>
                            </motion.div>

                            {/* Key Features */}
                            <motion.div variants={itemVariants}>
                                <h3 className="text-3xl font-bold text-white mb-8">Key Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {service.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="group p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl border border-emerald-500/30 rounded-xl hover:border-emerald-500/60 transition-all duration-300"
                                            whileHover={{
                                                scale: 1.05,
                                                boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
                                            }}
                                        >
                                            <div className="flex items-start gap-4">
                                                <motion.div
                                                    className="p-2 bg-emerald-500/20 rounded-lg flex-shrink-0"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <CheckCircle className="text-emerald-400" size={24} />
                                                </motion.div>
                                                <span className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors">
                                                    {feature}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Process */}
                            {service.process && (
                                <motion.div variants={itemVariants}>
                                    <h3 className="text-3xl font-bold text-white mb-8">Our Process</h3>
                                    <div className="space-y-6">
                                        {service.process.map((step, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-start gap-6 group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ x: 10 }}
                                            >
                                                {/* Step Number */}
                                                <div className="relative flex-shrink-0">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/50">
                                                        {index + 1}
                                                    </div>
                                                    {index < service.process.length - 1 && (
                                                        <div className="absolute top-12 left-6 w-0.5 h-12 bg-gradient-to-b from-emerald-500 to-transparent" />
                                                    )}
                                                </div>
                                                {/* Content */}
                                                <div className="pt-2 flex-grow">
                                                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                                        {step}
                                                    </h4>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* Service Details Card */}
                            <motion.div
                                className="relative group p-8 bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500/60 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-2xl font-bold text-white">Service Details</h3>

                                    {/* Pricing */}
                                    <motion.div
                                        className="flex items-start gap-4"
                                        whileHover={{ x: 5 }}
                                    >
                                        <ShoppingCart className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <p className="text-sm text-gray-400 uppercase tracking-wide">Pricing</p>
                                            <p className="text-2xl font-bold text-emerald-400">{service.pricing}</p>
                                        </div>
                                    </motion.div>

                                    {/* Timeline */}
                                    <motion.div
                                        className="flex items-start gap-4"
                                        whileHover={{ x: 5 }}
                                    >
                                        <Calendar className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <p className="text-sm text-gray-400 uppercase tracking-wide">Timeline</p>
                                            <p className="text-lg font-semibold text-cyan-400">{service.timeline}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Technologies Card */}
                            <motion.div
                                className="relative group p-8 bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500/60 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Zap className="text-emerald-400" size={24} />
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {service.technologies.map((tech, index) => (
                                            <motion.span
                                                key={index}
                                                className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/40 hover:border-emerald-500/60 transition-all cursor-default"
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(16, 185, 129, 0.3)' }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Card */}
                            <motion.div
                                className="relative group p-8 bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 backdrop-blur-xl border border-emerald-500/50 rounded-2xl hover:border-emerald-500/70 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                                    <p className="text-gray-300 mb-6">
                                        Let's discuss how this service can help your business achieve its goals.
                                    </p>
                                    <motion.button
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) || setIsContactOpen(true)}
                                        className="w-full group/btn relative px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Contact Us
                                            <Phone size={20} className="group-hover/btn:animate-pulse" />
                                        </span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Services CTA */}
            <motion.section
                className="relative py-20 px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl sm:text-5xl font-bold text-white mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Explore More Services
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 mb-10"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Discover our full range of digital solutions tailored to your business needs.
                    </motion.p>
                    <motion.button
                        onClick={() => navigate('/services')}
                        className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-full overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            View All Services
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                    </motion.button>
                </div>
            </motion.section>
        </div>
    );
};

export default ServiceDetail;