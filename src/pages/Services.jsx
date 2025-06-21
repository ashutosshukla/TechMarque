import React from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import {
    Code,
    Cloud,
    Shield,
    Users,
    CheckCircle,
    ArrowRight,
    Globe,       // Add any additional icons used in services
    Settings,    // that might be referenced in your data
    Lock,
    Cpu,
    Link
} from 'lucide-react';

const Services = () => {
    const navigate = useNavigate();

    const handleLearnMore = (slug) => {
        navigate(`/services/${slug}`);
    };

    // Map all possible icon names to their components
    const iconComponents = {
        Code: Code,
        Cloud: Cloud,
        Shield: Shield,
        Users: Users,
        Globe: Globe,
        Settings: Settings,
        Lock: Lock,
        Cpu: Cpu,
        Link: Link
    };

    return (
        <section id="services" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Our <span className="text-blue-600">Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive IT solutions designed to accelerate your business growth and digital transformation journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.slice(0, 4).map((service, index) => {
                        // Get the correct icon component from the mapping
                        const IconComponent = iconComponents[service.icon];
                        if (!IconComponent) {
                            console.error(`Icon component not found for: ${service.icon}`);
                            return null;
                        }

                        return (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;