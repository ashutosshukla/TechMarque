import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Get In <span className="text-blue-600">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to transform your business with innovative IT solutions? Let's discuss your project and explore how we can help you achieve your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Phone className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Phone</div>
                                        <div className="text-gray-600">+1 (555) 123-4567</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Mail className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Email</div>
                                        <div className="text-gray-600">info@techflowsolutions.com</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <MapPin className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Address</div>
                                        <div className="text-gray-600">123 Tech Street, Silicon Valley, CA 94000</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-white/10 rounded-lg">
                                <div className="font-semibold mb-2">24/7 Emergency Support</div>
                                <div className="text-sm">For critical issues, we provide round-the-clock support to ensure your business operations continue smoothly.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;