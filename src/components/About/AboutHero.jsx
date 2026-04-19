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
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const fadeInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const popIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const statItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
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
        { icon: <Users size={24} className="text-zavame-teal" />, value: "10+", label: "Satisfied Clients" },
        { icon: <Code2 size={24} className="text-zavame-teal" />, value: "50+", label: "Projects Completed" },
        { icon: <Globe size={24} className="text-zavame-teal" />, value: "3", label: "Countries Served" },
    ];

    const features = [
        {
            icon: <ShieldCheck className="text-zavame-teal" size={20} />,
            title: "Enterprise-Grade Security",
            desc: "Military-grade encryption and compliance with all major industry standards"
        },
        {
            icon: <Clock className="text-zavame-teal" size={20} />,
            title: "Proven Methodology",
            desc: "Our agile development process ensures on-time, on-budget delivery"
        },
        {
            icon: <Users className="text-zavame-teal" size={20} />,
            title: "Dedicated Teams",
            desc: "Get direct access to senior engineers and strategists"
        },
        {
            icon: <Code2 className="text-zavame-teal" size={20} />,
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
            className="relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0d1230 50%, #0a0e27 100%)' }}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
        >
            {/* Background elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.5 }}
                className="absolute top-20 left-10 w-40 h-40 bg-zavame-teal rounded-full filter blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-20 right-10 w-60 h-60 bg-zavame-blue rounded-full filter blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column */}
                    <motion.div
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div
                            variants={fadeInFromLeft}
                            className="inline-flex items-center px-4 py-2 bg-zavame-teal/10 rounded-full border border-zavame-teal/30"
                        >
                            <span className="text-zavame-teal font-medium text-sm">About Zavame</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInFromLeft}
                            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight"
                        >
                            Building <span className="text-zavame-teal">Digital Foundations</span> for Tomorrow's Success
                        </motion.h1>

                        <motion.p
                            variants={fadeInFromLeft}
                            className="text-lg text-gray-400 leading-relaxed"
                        >
                            At Zavame, we're more than just a technology company - we're architects of digital transformation.
                            Since 2015, we've been helping businesses navigate the complex digital landscape with innovative solutions
                            that drive real results.
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-2 gap-3 sm:gap-4 pt-4"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={popIn}
                                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-zavame-teal/20 transition-all duration-300"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-zavame-teal/10 p-2 rounded-lg">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</div>
                                            <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
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
                        <div className="bg-gradient-to-br from-zavame-teal/30 to-zavame-blue/30 rounded-2xl p-[1px]">
                            <div className="bg-zavame-navy/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Why Businesses Choose Zavame</h3>

                                <div className="space-y-5">
                                    {features.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + 0.3 }}
                                            className="flex gap-4 group"
                                        >
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="bg-zavame-teal/10 p-2 rounded-lg group-hover:bg-zavame-teal/20 transition-colors">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-sm sm:text-base">{item.title}</h4>
                                                <p className="text-gray-400 text-xs sm:text-sm mt-1">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="mt-8 pt-6 border-t border-white/10"
                                >
                                    <div className="flex flex-wrap gap-3">
                                        {additionalStats.map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                variants={statItem}
                                                className="text-center px-4 py-2.5 bg-white/5 rounded-lg border border-white/10 hover:border-zavame-teal/20 transition-all duration-300"
                                            >
                                                <div className="text-zavame-teal font-bold text-sm">{stat.value}</div>
                                                <div className="text-gray-400 text-xs mt-0.5">{stat.label}</div>
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