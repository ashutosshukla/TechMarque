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
    Globe,
    Settings,
    Lock,
    Cpu,
    Link,
    ShoppingCart,
} from 'lucide-react';

const Services = () => {
    const navigate = useNavigate();

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
        <section
            id="services"
            className="py-20 bg-slate-50"
        >
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
                        const IconComponent = iconComponents[service.icon];
                        if (!IconComponent) {
                            console.error(`Icon component not found for: ${service.icon}`);
                            return null;
                        }

                        return (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
                            >
                                <div className="mb-6">
                                    <IconComponent className="text-blue-500" size={40} />
                                </div>

                                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 mb-6 leading-relaxed hidden md:block">
                                    {service.shortDescription}
                                </p>

                                <div className="space-y-3">
                                    {service.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-start gap-3">
                                            <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleLearnMore(service.slug)}
                                    className="mt-8 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors duration-200"
                                >
                                    Learn More
                                    <ArrowRight size={16} />
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