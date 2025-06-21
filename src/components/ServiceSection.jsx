import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import {
    Code, Cloud, Shield, Users,
    Settings, Lock, Cpu, Link,
    CheckCircle, ArrowRight, Phone, ChevronLeft,
    Globe
} from 'lucide-react';

const ServiceSection = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(category || 'all');

    // Debugging: Log current category and services
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
        Globe: Globe
    };

    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    const handleCategoryChange = (categorySlug) => {
        setActiveCategory(categorySlug);
        // Ensure this matches your route in App.js
        navigate(`/services/${categorySlug}`);
    };

    const handleLearnMore = (slug) => {
        // Ensure this matches your route in App.js
        navigate(`/services/detail/${slug}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Our <span className="text-blue-600">Services</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Comprehensive IT solutions designed to accelerate your business growth.
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center gap-2">
                                Get Free Consultation
                                <Phone size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredServices.map((service) => {
                                const IconComponent = iconComponents[service.icon];

                                if (!IconComponent) {
                                    console.error(`Missing icon for: ${service.icon}`);
                                    return null;
                                }

                                return (
                                    <div
                                        key={service.id}
                                        className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="text-blue-400" size={48} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {service.shortDescription}
                                        </p>

                                        <div className="space-y-2 mb-6">
                                            {service.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center gap-3">
                                                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => handleLearnMore(service.slug)}
                                                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                                            >
                                                Learn More
                                                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <div className="text-sm text-gray-500">
                                                {service.pricing}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium text-gray-600">No services found in this category</h3>
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Browse all services
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ServiceSection;