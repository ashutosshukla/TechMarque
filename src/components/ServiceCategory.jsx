import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services, serviceCategories } from '../data/services';
import {
    Code, Cloud, Shield, Users,
    Settings, Lock, Cpu, Link,
    CheckCircle, ArrowRight, Phone, ChevronLeft, Globe2
} from 'lucide-react';

const ServiceCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();

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

    // Find the current category details
    const currentCategory = serviceCategories.find(cat => cat.slug === category);

    // Filter services by category
    const categoryServices = services.filter(service => service.category === category);

    const handleLearnMore = (slug) => {
        navigate(`/services/detail/${slug}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Category Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/services')}
                            className="flex items-center justify-center mx-auto text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                        >
                            <ChevronLeft size={20} />
                            <span>Back to All Services</span>
                        </button>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            {currentCategory?.name || 'Services'}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {currentCategory?.description || 'Comprehensive solutions for your business needs'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {categoryServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryServices.map((service) => {
                                const IconComponent = iconComponents[service.icon];
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
                                            {service.features.slice(0, 3).map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center gap-3">
                                                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                            {service.features.length > 3 && (
                                                <div className="text-sm text-gray-500">
                                                    +{service.features.length - 3} more features
                                                </div>
                                            )}
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
                                onClick={() => navigate('/services')}
                                className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto gap-1"
                            >
                                <ChevronLeft size={16} />
                                <span>Browse all services</span>
                            </button>
                        </div>
                    )}

                    {/* Category Benefits Section */}
                    {categoryServices.length > 0 && (
                        <div className="mt-20 bg-gray-50 rounded-2xl p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                                Why Choose Our {currentCategory?.name} Services?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    "Expertise in the latest technologies",
                                    "Proven track record of success",
                                    "Custom solutions for your business",
                                    "Competitive pricing",
                                    "Dedicated support",
                                    "Industry best practices"
                                ].map((benefit, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                                                {index + 1}
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-800">{benefit}</h3>
                                        </div>
                                        <p className="text-gray-600">
                                            Our team delivers exceptional results through {benefit.toLowerCase()} in every project we undertake.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-20 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Ready to transform your business?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Get in touch with our experts to discuss how our {currentCategory?.name.toLowerCase()} services can help you achieve your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2">
                                Get Free Consultation
                                <Phone size={20} />
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold transition-colors"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceCategory;