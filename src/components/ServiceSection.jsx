import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import {
    Code, Cloud, Shield, Users,
    Settings, Lock, Cpu, Link,
    CheckCircle, ArrowRight, Phone,
    Globe, Zap, Smartphone, Megaphone, Database
} from 'lucide-react';

const ServiceSection = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState('all');
    const [hoveredService, setHoveredService] = useState(null);

    // ✅ Sync URL with state
    useEffect(() => {
        if (category) {
            setActiveCategory(category);
        } else {
            setActiveCategory('all');
        }
    }, [category]);

    const iconComponents = {
        Code,
        Cloud,
        Shield,
        Users,
        Settings,
        Lock,
        Cpu,
        Link,
        Globe,
        Zap,
        Smartphone,
        Megaphone,
        Database
    };

    // ✅ Safe filtering
    const filteredServices =
        activeCategory === 'all'
            ? services
            : services.filter(service => service.category === activeCategory);

    const categories = ['all', ...new Set(services.map(s => s.category))];

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        navigate(cat === 'all' ? '/services' : `/services/${cat}`);
    };

    const handleLearnMore = (slug) => {
        navigate(`/services/detail/${slug}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0f1839] to-[#0a0e27]">

            {/* HERO */}
            <section className="py-24 text-center px-4">
                <h1 className="text-5xl font-bold text-white mb-6">
                    Our <span className="text-zavame-teal">Services</span>
                </h1>

                <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                    Explore our complete range of digital services designed to grow your business.
                </p>

                <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-3 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white rounded-full flex items-center gap-2 mx-auto"
                >
                    Get Free Consultation <Phone size={18} />
                </button>
            </section>

            {/* CATEGORY FILTER */}
            <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 rounded-full text-sm transition ${activeCategory === cat
                            ? 'bg-zavame-teal text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-zavame-teal/20'
                            }`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* SERVICES GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-20">

                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => {
                        const Icon = iconComponents[service.icon];

                        return (
                            <div
                                key={service.id}
                                onMouseEnter={() => setHoveredService(service.id)}
                                onMouseLeave={() => setHoveredService(null)}
                                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-zavame-teal transition"
                            >
                                <div className="mb-4">
                                    {Icon && <Icon className="text-zavame-teal" size={26} />}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-sm mb-4">
                                    {service.shortDescription}
                                </p>

                                <div className="space-y-2 mb-6">
                                    {service.features.slice(0, 3).map((f, i) => (
                                        <div key={i} className="flex gap-2 text-sm text-gray-300">
                                            <CheckCircle size={14} className="text-zavame-teal" />
                                            {f}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleLearnMore(service.slug)}
                                    className="text-zavame-teal flex items-center gap-1 text-sm"
                                >
                                    Learn More <ArrowRight size={14} />
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center text-gray-400">
                        No services found
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="text-center pb-20">
                <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-4 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white rounded-full"
                >
                    Start Your Project
                </button>
            </div>
        </div>
    );
};

export default ServiceSection;