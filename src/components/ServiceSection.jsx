import React, { useState } from 'react';
import { Code, Cloud, Shield, Users, CheckCircle, ArrowRight, X, Star, Clock, DollarSign, Phone } from 'lucide-react';

const ServiceSection = () => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 1,
            icon: <Code className="text-blue-400" size={48} />,
            title: "Custom Software Development",
            description: "Tailored solutions built with cutting-edge technologies to meet your unique business requirements and drive digital transformation.",
            features: ["Web Applications", "Mobile Apps", "API Development", "System Integration"],
            detailedDescription: "Our custom software development services provide end-to-end solutions tailored to your specific business needs. We leverage the latest technologies and best practices to build robust, scalable, and maintainable applications that drive your business forward.",
            technologies: ["React", "Node.js", "Python", "Java", "C#", ".NET", "MongoDB", "PostgreSQL"],
            pricing: "Starting from $5,000",
            timeline: "4-12 weeks",
            benefits: [
                "Fully customized to your business needs",
                "Scalable architecture for future growth",
                "Modern tech stack and best practices",
                "Ongoing support and maintenance",
                "Integration with existing systems"
            ],
            process: [
                "Requirements Analysis & Planning",
                "UI/UX Design & Prototyping",
                "Development & Testing",
                "Deployment & Launch",
                "Support & Maintenance"
            ]
        },
        {
            id: 2,
            icon: <Cloud className="text-blue-400" size={48} />,
            title: "Cloud Solutions",
            description: "Scalable cloud infrastructure and migration services to optimize performance, reduce costs, and enhance business agility.",
            features: ["Cloud Migration", "AWS/Azure Services", "DevOps", "Infrastructure Management"],
            detailedDescription: "Transform your business with our comprehensive cloud solutions. We help organizations migrate to the cloud, optimize infrastructure, and implement DevOps practices to achieve greater scalability, reliability, and cost-effectiveness.",
            technologies: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitLab CI/CD"],
            pricing: "Starting from $3,000",
            timeline: "2-8 weeks",
            benefits: [
                "Reduced infrastructure costs",
                "Improved scalability and flexibility",
                "Enhanced security and compliance",
                "24/7 monitoring and support",
                "Automated backup and disaster recovery"
            ],
            process: [
                "Cloud Readiness Assessment",
                "Migration Strategy & Planning",
                "Infrastructure Setup & Migration",
                "Testing & Optimization",
                "Ongoing Management & Support"
            ]
        },
        {
            id: 3,
            icon: <Shield className="text-blue-400" size={48} />,
            title: "Cybersecurity",
            description: "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
            features: ["Security Audits", "Penetration Testing", "Compliance", "Risk Assessment"],
            detailedDescription: "Protect your organization from cyber threats with our comprehensive cybersecurity services. We provide proactive security measures, vulnerability assessments, and compliance solutions to safeguard your digital assets and maintain business continuity.",
            technologies: ["SIEM Tools", "Vulnerability Scanners", "Firewall Management", "Encryption", "Multi-factor Authentication", "Security Frameworks"],
            pricing: "Starting from $2,500",
            timeline: "1-6 weeks",
            benefits: [
                "Comprehensive threat protection",
                "Regulatory compliance assurance",
                "Reduced security risks",
                "24/7 security monitoring",
                "Incident response and recovery"
            ],
            process: [
                "Security Assessment & Gap Analysis",
                "Risk Identification & Prioritization",
                "Security Implementation & Configuration",
                "Testing & Validation",
                "Ongoing Monitoring & Updates"
            ]
        },
        {
            id: 4,
            icon: <Users className="text-blue-400" size={48} />,
            title: "IT Consulting",
            description: "Strategic technology guidance to align your IT infrastructure with business objectives and drive sustainable growth.",
            features: ["Technology Strategy", "Digital Transformation", "Process Optimization", "Technical Training"],
            detailedDescription: "Our IT consulting services help organizations make informed technology decisions and optimize their IT investments. We provide strategic guidance, process improvements, and technical expertise to align your technology with business goals.",
            technologies: ["Enterprise Architecture", "Business Intelligence", "Process Automation", "Change Management", "Project Management"],
            pricing: "Starting from $150/hour",
            timeline: "1-12 weeks",
            benefits: [
                "Strategic technology roadmap",
                "Improved operational efficiency",
                "Cost optimization and ROI",
                "Risk mitigation and compliance",
                "Enhanced team capabilities"
            ],
            process: [
                "Current State Assessment",
                "Strategy Development & Planning",
                "Implementation Roadmap",
                "Change Management & Training",
                "Ongoing Support & Optimization"
            ]
        }
    ];

    const openModal = (service) => {
        setSelectedService(service);
    };

    const closeModal = () => {
        setSelectedService(null);
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
                            Comprehensive IT solutions designed to accelerate your business growth and digital transformation journey.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {service.description}
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
                                        onClick={() => openModal(service)}
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
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">{selectedService.title}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            <div className="flex items-center gap-4">
                                {selectedService.icon}
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900">{selectedService.title}</h3>
                                    <p className="text-gray-600">{selectedService.detailedDescription}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="text-blue-600" size={20} />
                                        <span className="font-semibold text-slate-900">Pricing</span>
                                    </div>
                                    <p className="text-blue-600 font-bold">{selectedService.pricing}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="text-green-600" size={20} />
                                        <span className="font-semibold text-slate-900">Timeline</span>
                                    </div>
                                    <p className="text-green-600 font-bold">{selectedService.timeline}</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="text-purple-600" size={20} />
                                        <span className="font-semibold text-slate-900">Quality</span>
                                    </div>
                                    <p className="text-purple-600 font-bold">Premium</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Benefits</h4>
                                    <div className="space-y-3">
                                        {selectedService.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                                <span className="text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Our Process</h4>
                                    <div className="space-y-3">
                                        {selectedService.process.map((step, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                                    {index + 1}
                                                </div>
                                                <span className="text-gray-700">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-4">Technologies We Use</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedService.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-gray-200">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full font-semibold transition-colors">
                                    Get Started
                                </button>
                                <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-full font-semibold transition-colors">
                                    Request Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceSection;