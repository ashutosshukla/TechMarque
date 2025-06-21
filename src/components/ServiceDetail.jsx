import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import {
    Code, Cloud, Shield, Users,
    Settings, Lock, Cpu, Link, Globe,
    CheckCircle, ArrowRight, Phone, ChevronLeft,ShoppingCart
} from 'lucide-react';

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the service by slug
    const service = services.find(s => s.slug === slug);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Service not found</h2>
                    <button
                        onClick={() => navigate('/services')}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Services
                    </button>
                </div>
            </div>
        );
    }

    // Map icon names to components
    const iconComponents = {
        Code, Cloud, Shield, Users,
        Settings, Lock, Cpu, Link, Globe,ShoppingCart
    };
    const IconComponent = iconComponents[service.icon];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ChevronLeft size={20} />
                            <span className="ml-2">Back </span>
                        </button>
                    </div>
                    <div className="text-center mt-8">
                        <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-lg">
                            {IconComponent && <IconComponent className="text-blue-400" size={48} />}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-6">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                            {service.shortDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Service Overview</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {service.detailedDescription}
                            </p>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {service.process && (
                                <>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Process</h3>
                                    <div className="space-y-4 mb-12">
                                        {service.process.map((step, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-800">{step}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Service Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Pricing</h4>
                                        <p className="text-lg font-semibold text-blue-600">{service.pricing}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
                                        <p className="text-lg font-semibold text-gray-800">{service.timeline}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {service.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Get Started</h3>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                    Contact Us
                                    <Phone size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;