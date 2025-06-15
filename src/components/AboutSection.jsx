import React from 'react';
import { Star } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            About <span className="text-blue-400">Tech Marque</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                           At TechMarque, we don’t just build websites or write code — we build digital experiences that move businesses forward.


Whether you're a local shop stepping online for the first time, or a startup scaling for growth, TechMarque delivers tailored IT solutions that are smart, scalable, and beautifully simple
                        </p>
                        <p className="text-gray-300 mb-8 leading-relaxed">
From intuitive websites to custom software,
From digital marketing to business automation —
we bring your vision to life with technology that works for you.                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {[
                                { label: "Client Satisfaction", value: "100%" },
                                { label: "On-Time Delivery", value: "95%" },
                                { label: "Expert Team", value: "20+" },
                                { label: "Technologies", value: "50+" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-slate-800 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                                    <div className="text-gray-300 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Learn More About Us
                        </button>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-2xl">
                            <div className="bg-white p-6 rounded-xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Star className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">Our Mission</div>
                                        <div className="text-gray-600 text-sm">Driving Innovation</div>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    "To empower businesses with cutting-edge technology solutions that drive innovation, enhance efficiency, and create sustainable competitive advantages in the digital economy."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;