import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    ShoppingCart,
    Stethoscope,
    GraduationCap,
    Building2,
    Plane,
    Utensils,
    Factory,
    Landmark,
} from 'lucide-react';

const industries = [
    {
        id: 1,
        name: 'Retail & E-Commerce',
        icon: ShoppingCart,
        description: 'Custom online stores, inventory management systems, and omnichannel retail solutions that drive sales and enhance customer experiences.',
        gradient: 'from-emerald-500 to-teal-600',
        accent: '#10b981',
    },
    {
        id: 2,
        name: 'Healthcare',
        icon: Stethoscope,
        description: 'HIPAA-compliant health platforms, telemedicine apps, patient portals, and medical record management systems.',
        gradient: 'from-blue-500 to-cyan-600',
        accent: '#3b82f6',
    },
    {
        id: 3,
        name: 'Education',
        icon: GraduationCap,
        description: 'E-learning platforms, student management systems, virtual classrooms, and educational mobile apps for modern learning.',
        gradient: 'from-violet-500 to-purple-600',
        accent: '#8b5cf6',
    },
    {
        id: 4,
        name: 'Real Estate',
        icon: Building2,
        description: 'Property listing portals, CRM platforms, virtual tour integrations, and lead management solutions for developers and agents.',
        gradient: 'from-amber-500 to-orange-600',
        accent: '#f59e0b',
    },
    {
        id: 5,
        name: 'Travel & Hospitality',
        icon: Plane,
        description: 'Booking engines, hotel management systems, travel planning apps, and tourism platforms with seamless payment integration.',
        gradient: 'from-rose-500 to-pink-600',
        accent: '#f43f5e',
    },
    {
        id: 6,
        name: 'Food & Restaurant',
        icon: Utensils,
        description: 'Online ordering systems, restaurant management platforms, delivery tracking, and loyalty program solutions.',
        gradient: 'from-orange-500 to-red-500',
        accent: '#f97316',
    },
    {
        id: 7,
        name: 'Manufacturing',
        icon: Factory,
        description: 'ERP systems, supply chain management, IoT-enabled monitoring, and production tracking dashboards.',
        gradient: 'from-slate-500 to-zinc-600',
        accent: '#64748b',
    },
    {
        id: 8,
        name: 'Finance & Banking',
        icon: Landmark,
        description: 'Fintech solutions, payment gateways, banking apps, and secure financial management platforms.',
        gradient: 'from-teal-500 to-emerald-600',
        accent: '#14b8a6',
    },
];

const IndustriesSection = () => {
    const [activeId, setActiveId] = useState(1);
    const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const activeIndustry = industries.find((i) => i.id === activeId);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0d1230 50%, #0a0e27 100%)' }}
        >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-zavame-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full bg-zavame-teal/10 border border-zavame-teal/30 text-zavame-teal text-sm font-medium mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        Industries We Serve
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Empowering <span className="text-zavame-teal">Every Industry</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        From startups to enterprises, we deliver tailored digital solutions across diverse sectors.
                    </p>
                </motion.div>

                {/* Expanding Columns — Desktop */}
                <div className="hidden lg:block">
                    <div className="industries-columns">
                        {industries.map((industry, index) => {
                            const isActive = activeId === industry.id;
                            const Icon = industry.icon;

                            return (
                                <motion.div
                                    key={industry.id}
                                    className={`industries-column ${isActive ? 'industries-column--active' : ''}`}
                                    onMouseEnter={() => setActiveId(industry.id)}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    style={{ '--accent': industry.accent }}
                                >
                                    {/* Background gradient overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-b ${industry.gradient} transition-opacity duration-500 ${isActive ? 'opacity-20' : 'opacity-5'}`}
                                    />

                                    {/* Glow border on active */}
                                    <div
                                        className="absolute inset-0 rounded-2xl transition-all duration-500"
                                        style={{
                                            boxShadow: isActive
                                                ? `0 0 30px ${industry.accent}20, inset 0 0 30px ${industry.accent}10`
                                                : 'none',
                                            border: isActive
                                                ? `1px solid ${industry.accent}40`
                                                : '1px solid rgba(255,255,255,0.06)',
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col">
                                        {/* Icon */}
                                        <motion.div
                                            className="industries-icon"
                                            animate={{
                                                scale: isActive ? 1.15 : 1,
                                                rotate: isActive ? 0 : 0,
                                            }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500"
                                                style={{
                                                    background: isActive
                                                        ? `linear-gradient(135deg, ${industry.accent}30, ${industry.accent}10)`
                                                        : 'rgba(255,255,255,0.05)',
                                                    border: `1px solid ${isActive ? industry.accent + '40' : 'rgba(255,255,255,0.08)'}`,
                                                }}
                                            >
                                                <Icon
                                                    size={26}
                                                    style={{ color: isActive ? industry.accent : '#9ca3af' }}
                                                    className="transition-colors duration-500"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Title — always visible */}
                                        <h3
                                            className={`text-lg font-bold mt-4 mb-3 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}
                                        >
                                            {industry.name}
                                        </h3>

                                        {/* Description — animate in on active */}
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.p
                                                    key={industry.id}
                                                    className="text-gray-300 text-sm leading-relaxed flex-1"
                                                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                                    transition={{ duration: 0.35 }}
                                                >
                                                    {industry.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>

                                        {/* Bottom accent line */}
                                        <motion.div
                                            className="mt-auto pt-4"
                                            animate={{ scaleX: isActive ? 1 : 0 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                            style={{ originX: 0 }}
                                        >
                                            <div
                                                className="h-0.5 rounded-full"
                                                style={{ background: `linear-gradient(90deg, ${industry.accent}, transparent)` }}
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Grid */}
                <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {industries.map((industry, index) => {
                        const Icon = industry.icon;
                        const isActive = activeId === industry.id;

                        return (
                            <motion.div
                                key={industry.id}
                                className="relative rounded-xl p-5 cursor-pointer overflow-hidden"
                                onClick={() => setActiveId(industry.id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                                style={{
                                    background: isActive ? `rgba(255,255,255,0.06)` : 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${isActive ? industry.accent + '40' : 'rgba(255,255,255,0.06)'}`,
                                    boxShadow: isActive ? `0 0 20px ${industry.accent}15` : 'none',
                                }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-b ${industry.gradient} transition-opacity duration-300 ${isActive ? 'opacity-10' : 'opacity-0'}`} />
                                <div className="relative z-10">
                                    <Icon
                                        size={28}
                                        className="mb-3 transition-colors duration-300"
                                        style={{ color: isActive ? industry.accent : '#6b7280' }}
                                    />
                                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                        {industry.name}
                                    </h3>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.p
                                                className="text-gray-400 text-xs mt-2 leading-relaxed"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {industry.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .industries-columns {
                    display: flex;
                    gap: 8px;
                    height: 420px;
                }

                .industries-column {
                    position: relative;
                    flex: 1;
                    min-width: 0;
                    padding: 28px 20px;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(8px);
                    cursor: pointer;
                    overflow: hidden;
                    transition: flex 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .industries-column--active {
                    flex: 3;
                }

                .industries-column:hover .industries-icon {
                    transform: translateY(-4px);
                }

                .industries-icon {
                    transition: transform 0.3s ease;
                }
            `}</style>
        </section>
    );
};

export default IndustriesSection;
