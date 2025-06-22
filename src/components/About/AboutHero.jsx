import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Users, Award, Code2, ShieldCheck, Clock } from 'lucide-react';

// Animation variants
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.6
        }
    }
};

const fadeInFromLeft = {
    hidden: {
        opacity: 0,
        x: -50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const fadeInFromRight = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const popIn = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const slideInFromLeft = {
    hidden: {
        opacity: 0,
        x: -30
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const slideInFromRight = {
    hidden: {
        opacity: 0,
        x: 30
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const statItem = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const AboutHero = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const stats = [
        { icon: <Users size={24} className="text-blue-400" />, value: "200+", label: "Satisfied Clients" },
        { icon: <Code2 size={24} className="text-blue-400" />, value: "500+", label: "Projects Completed" },
        { icon: <Globe size={24} className="text-blue-400" />, value: "15+", label: "Countries Served" },
        { icon: <Award size={24} className="text-blue-400" />, value: "25+", label: "Industry Awards" }
    ];

    const features = [
        {
            icon: <ShieldCheck className="text-blue-400" size={20} />,
            title: "Enterprise-Grade Security",
            desc: "Military-grade encryption and compliance with all major industry standards"
        },
        {
            icon: <Clock className="text-blue-400" size={20} />,
            title: "Proven Methodology",
            desc: "Our agile development process ensures on-time, on-budget delivery"
        },
        {
            icon: <Users className="text-blue-400" size={20} />,
            title: "Dedicated Teams",
            desc: "Get direct access to senior engineers and strategists"
        },
        {
            icon: <Code2 className="text-blue-400" size={20} />,
            title: "Future-Proof Solutions",
            desc: "Architected for scalability with cutting-edge technologies"
        }
    ];

    const additionalStats = [
        { value: "95%", label: "Client Retention" },
        { value: "4.9/5", label: "Customer Satisfaction" },
        { value: "24/7", label: "Support Availability" }
    ];

    return (
        <motion.section
            ref={ref}
            className="relative bg-slate-900 overflow-hidden"
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
        >
            {/* Background elements with animations */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1.5 }}
                className="absolute top-20 left-10 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-20 right-10 w-60 h-60 bg-blue-400 rounded-full filter blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <motion.div
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div
                            variants={fadeInFromLeft}
                            className="inline-flex items-center px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700/50"
                        >
                            <span className="text-blue-400 font-medium">About TechMarque</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInFromLeft}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        >
                            Building <span className="text-blue-400">Digital Foundations</span> for Tomorrow's Success
                        </motion.h1>

                        <motion.p
                            variants={fadeInFromLeft}
                            className="text-xl text-gray-300 leading-relaxed"
                        >
                            At TechMarque, we're more than just a technology company - we're architects of digital transformation.
                            Since 2015, we've been helping businesses navigate the complex digital landscape with innovative solutions
                            that drive real results.
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-2 gap-4 pt-4"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={popIn}
                                    className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-900/30 p-2 rounded-lg">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                                            <div className="text-gray-400 text-sm">{stat.label}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        variants={fadeInFromRight}
                        className="relative"
                    >
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-1">
                            <div className="bg-slate-900 rounded-xl p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">Why Businesses Choose TechMarque</h3>

                                <div className="space-y-6">
                                    {features.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + 0.3 }}
                                            className="flex gap-4"
                                        >
                                            <div className="mt-1">
                                                <div className="bg-blue-900/30 p-2 rounded-lg">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold">{item.title}</h4>
                                                <p className="text-gray-400 text-sm">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="mt-8 pt-6 border-t border-slate-800"
                                >
                                    <div className="flex flex-wrap gap-4">
                                        {additionalStats.map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                variants={statItem}
                                                className="text-center px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700"
                                            >
                                                <div className="text-blue-400 font-medium">{stat.value}</div>
                                                <div className="text-gray-300 text-xs">{stat.label}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default AboutHero;