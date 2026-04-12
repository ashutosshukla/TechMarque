import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '../data/services';
import {
    Code,
    Cloud,
    Shield,
    Users,
    CheckCircle,
    ArrowRight,
    Globe,
    Settings,
    Lock,
    Cpu,
    Link,
    ShoppingCart,
} from 'lucide-react';

const Services = () => {
    const navigate = useNavigate();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const handleLearnMore = (slug) => {
        navigate(`/services/detail/${slug}`);
    };

    const iconComponents = {
        Code: Code,
        Cloud: Cloud,
        Shield: Shield,
        Users: Users,
        Globe: Globe,
        Settings: Settings,
        Lock: Lock,
        Cpu: Cpu,
        Link: Link,
        ShoppingCart: ShoppingCart
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <section
            id="services"
            className="py-24 relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0a0e27 0%, #0d1230 50%, #0a0e27 100%)',
            }}
            ref={ref}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-zavame-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-0 w-72 h-72 bg-zavame-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="px-4 py-2 rounded-full bg-zavame-teal/10 border border-zavame-teal/30 text-zavame-teal text-sm font-medium">
                            What We Do
                        </span>
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Our <span className="text-zavame-teal">Services</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive IT solutions designed to accelerate your business growth and digital transformation journey.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {services.slice(0, 4).map((service, index) => {
                        const IconComponent = iconComponents[service.icon];
                        if (!IconComponent) {
                            console.error(`Icon component not found for: ${service.icon}`);
                            return null;
                        }

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className="group relative"
                            >
                                {/* Glow effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-zavame-teal/20 to-zavame-blue/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

                                <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 group-hover:border-zavame-teal/30 transition-all duration-500 hover:bg-white/[0.07] h-full">
                                    <div className="mb-6">
                                        <motion.div
                                            className="inline-flex p-3 bg-zavame-teal/10 rounded-xl group-hover:bg-zavame-teal/20 transition-colors duration-300"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <IconComponent className="text-zavame-teal" size={28} />
                                        </motion.div>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-zavame-teal transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-400 mb-6 leading-relaxed hidden md:block text-sm">
                                        {service.shortDescription}
                                    </p>

                                    <div className="space-y-2.5">
                                        {service.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start gap-3">
                                                <CheckCircle className="text-zavame-teal flex-shrink-0 mt-0.5" size={14} />
                                                <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleLearnMore(service.slug)}
                                        className="mt-8 text-zavame-teal hover:text-zavame-teal-light font-medium flex items-center gap-2 transition-all duration-300 group/btn text-sm"
                                    >
                                        Learn More
                                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;