import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services, serviceCategories } from '../data/services';
import {
    Code, Cloud, Shield, Users,
    Settings, Lock, Cpu, Link,
    CheckCircle, ArrowRight, Phone, ChevronLeft, Globe2
} from 'lucide-react';

const ServiceCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const iconComponents = {
        Code: Code,
        Cloud: Cloud,
        Shield: Shield,
        Users: Users,
        Settings: Settings,
        Lock: Lock,
        Cpu: Cpu,
        Link: Link,
        Globe: Globe2
    };

    const currentCategory = serviceCategories.find(cat => cat.slug === category);
    const categoryServices = services.filter(service => service.category === category);

    const handleLearnMore = (slug) => {
        navigate(`/services/detail/${slug}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0f1839 50%, #0a0e27 100%)' }}>
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-40 left-10 w-72 h-72 bg-zavame-teal/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-40 right-10 w-96 h-96 bg-zavame-blue/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            {/* Category Hero Section */}
            <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.button
                            onClick={() => navigate('/services')}
                            className="flex items-center justify-center mx-auto text-zavame-teal hover:text-zavame-teal-light mb-8 transition-all duration-300 group"
                            whileHover={{ x: -5 }}
                        >
                            <ChevronLeft size={18} />
                            <span className="text-sm font-medium">Back to All Services</span>
                        </motion.button>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            {currentCategory?.name || 'Services'}
                        </motion.h1>
                        <motion.p
                            className="text-lg text-gray-400 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {currentCategory?.description || 'Comprehensive solutions for your business needs'}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Category Services Grid */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8" ref={ref}>
                <div className="max-w-7xl mx-auto">
                    {categoryServices.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            {categoryServices.map((service) => {
                                const IconComponent = iconComponents[service.icon];
                                return (
                                    <motion.div
                                        key={service.id}
                                        variants={cardVariants}
                                        className="group relative"
                                    >
                                        {/* Glow */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-br from-zavame-teal/20 to-zavame-blue/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

                                        <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 group-hover:border-zavame-teal/30 transition-all duration-500 hover:bg-white/[0.07] h-full flex flex-col">
                                            <motion.div
                                                className="mb-6 inline-flex p-3 bg-zavame-teal/10 rounded-xl group-hover:bg-zavame-teal/20 transition-colors duration-300"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                            >
                                                <IconComponent className="text-zavame-teal" size={28} />
                                            </motion.div>

                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-zavame-teal transition-colors duration-300">
                                                {service.title}
                                            </h3>

                                            <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-grow">
                                                {service.shortDescription}
                                            </p>

                                            <div className="space-y-2.5 mb-6">
                                                {service.features.slice(0, 3).map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center gap-2.5">
                                                        <CheckCircle className="text-zavame-teal flex-shrink-0" size={14} />
                                                        <span className="text-gray-300 text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                                {service.features.length > 3 && (
                                                    <div className="text-xs text-gray-500 pl-6">
                                                        +{service.features.length - 3} more features
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                <button
                                                    onClick={() => handleLearnMore(service.slug)}
                                                    className="text-zavame-teal hover:text-zavame-teal-light font-semibold flex items-center gap-2 group/btn transition-all text-sm"
                                                >
                                                    Learn More
                                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                                <div className="text-xs text-zavame-teal/50 font-medium">
                                                    {service.pricing}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h3 className="text-xl font-medium text-gray-400">No services found in this category</h3>
                            <motion.button
                                onClick={() => navigate('/services')}
                                className="mt-4 text-zavame-teal hover:text-zavame-teal-light font-medium flex items-center justify-center mx-auto gap-1"
                                whileHover={{ x: -5 }}
                            >
                                <ChevronLeft size={16} />
                                <span>Browse all services</span>
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Category Benefits Section */}
                    {categoryServices.length > 0 && (
                        <motion.div
                            className="mt-24 bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center tracking-tight">
                                Why Choose Our <span className="text-zavame-teal">{currentCategory?.name}</span> Services?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {[
                                    "Expertise in the latest technologies",
                                    "Proven track record of success",
                                    "Custom solutions for your business",
                                    "Competitive pricing",
                                    "Dedicated support",
                                    "Industry best practices"
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-zavame-teal/20 transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.08 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-zavame-teal/15 text-zavame-teal rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <h3 className="text-sm font-semibold text-white">{benefit}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            Our team delivers exceptional results through {benefit.toLowerCase()} in every project.
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CTA Section */}
                    <motion.div
                        className="mt-24 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
                            Ready to transform your business?
                        </h2>
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
                            Get in touch with our experts to discuss how our {currentCategory?.name?.toLowerCase()} services can help you achieve your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-zavame-teal/30 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Free Consultation
                                <Phone size={18} />
                            </motion.button>
                            <motion.button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-4 border-2 border-zavame-teal/40 text-zavame-teal hover:bg-zavame-teal/10 rounded-full font-semibold transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServiceCategory;