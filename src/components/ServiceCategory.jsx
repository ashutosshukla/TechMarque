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
        Code,
        Cloud,
        Shield,
        Users,
        Settings,
        Lock,
        Cpu,
        Link,
        Globe: Globe2
    };

    const currentCategory = serviceCategories.find(
        cat => cat.slug.toLowerCase() === category?.toLowerCase()
    );

    const categoryServices = services.filter(
        service => service.category.toLowerCase() === category?.toLowerCase()
    );

    const handleLearnMore = (slug) => {
        navigate(`/services/${slug}`); // ✅ FIXED
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
        <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0f1839 50%, #0a0e27 100%)' }}>

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-40 left-10 w-72 h-72 bg-zavame-teal/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-40 right-10 w-96 h-96 bg-zavame-blue/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            {/* Hero */}
            <section className="relative py-24 px-4 text-center">
                <motion.button
                    onClick={() => navigate('/services')}
                    className="text-zavame-teal mb-6 flex items-center justify-center mx-auto gap-1"
                >
                    <ChevronLeft size={18} /> Back to Services
                </motion.button>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {currentCategory?.name || 'Services'}
                </h1>

                <p className="text-gray-400 max-w-2xl mx-auto">
                    {currentCategory?.description || 'Explore our services'}
                </p>
            </section>

            {/* Services Grid */}
            <section ref={ref} className="px-4 pb-16">
                <div className="max-w-7xl mx-auto">

                    {categoryServices.length > 0 ? (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            {categoryServices.map(service => {
                                const IconComponent = iconComponents[service.icon] || Code;

                                return (
                                    <motion.div key={service.id} variants={cardVariants} className="group relative">

                                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-zavame-teal/30 transition h-full flex flex-col">

                                            <IconComponent className="text-zavame-teal mb-4" size={28} />

                                            <h3 className="text-white font-bold text-lg mb-2">
                                                {service.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-4 flex-grow">
                                                {service.shortDescription}
                                            </p>

                                            <div className="space-y-2 mb-4">
                                                {service.features.slice(0, 3).map((f, i) => (
                                                    <div key={i} className="flex gap-2 text-sm text-gray-300">
                                                        <CheckCircle size={14} className="text-zavame-teal" />
                                                        {f}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                                                <button
                                                    onClick={() => handleLearnMore(service.slug)}
                                                    className="text-zavame-teal text-sm flex items-center gap-1"
                                                >
                                                    Learn More <ArrowRight size={14} />
                                                </button>

                                                <span className="text-xs text-gray-400">
                                                    {service.pricing || "Custom Pricing"}
                                                </span>
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <div className="text-center text-gray-400">
                            No services found
                        </div>
                    )}

                    {/* CTA */}
                    <div className="text-center mt-20">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Ready to get started?
                        </h2>
                        <button
                            onClick={() => navigate('/contact')}
                            className="bg-zavame-teal px-6 py-3 rounded-full text-white flex items-center gap-2 mx-auto"
                        >
                            Contact Us <Phone size={16} />
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default ServiceCategory;