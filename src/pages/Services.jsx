import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
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
import { containerVariants, itemVariants, fadeInFromLeft, fadeInFromRight } from '../utils/animations';

const Services = () => {
    const navigate = useNavigate();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

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

    return (
        <motion.section
            ref={ref}
            id="services"
            className="py-20 bg-slate-50"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
                        variants={itemVariants}
                    >
                        Our <span className="text-blue-600">Services</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Comprehensive IT solutions designed to accelerate your business growth and digital transformation journey.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
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
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                                variants={index % 2 === 0 ? fadeInFromLeft : fadeInFromRight}
                                whileHover={{ y: -10 }}
                            >
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent className="text-blue-400" size={48} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 mb-6 leading-relaxed hidden md:block">
                                    {service.shortDescription}
                                </p>

                                <div className="space-y-2">
                                    {service.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center gap-3">
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleLearnMore(service.slug)}
                                    className="mt-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                                >
                                    Learn More
                                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Services;