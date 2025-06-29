import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', company: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section
            id="contact"
            className="py-20 bg-slate-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Get In <span className="text-blue-400">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Ready to transform your business with innovative IT solutions? Let's discuss your project.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700 hover:transform hover:-translate-y-1 transition-transform duration-200">
                        <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 font-medium mb-2">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 font-medium mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${isSubmitting ? 'bg-blue-700' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </div>
                        </form>

                        {submitSuccess && (
                            <div className="mt-6 p-4 bg-green-900/50 border border-green-800 rounded-lg flex items-start gap-3">
                                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-green-100">Message sent successfully!</h4>
                                    <p className="text-sm text-green-300">We'll get back to you within 24 hours.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700 hover:transform hover:-translate-y-1 transition-transform duration-200">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-blue-400" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Phone</div>
                                        <a href="tel:+916377553223" className="text-gray-300 hover:text-blue-400 transition-colors">+91 6377553223</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-blue-400" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Email</div>
                                        <a href="mailto:info@techmarquejaipur.com" className="text-gray-300 hover:text-blue-400 transition-colors">info@techmarquejaipur.com</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-blue-400" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Address</div>
                                        <div className="text-gray-300">303, Ambay enclave, Jagatpura, Jaipur</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 p-8 rounded-2xl text-white shadow-lg border border-blue-800/50 hover:transform hover:-translate-y-1 transition-transform duration-200">
                            <div className="flex items-center gap-3 mb-6">
                                <Clock className="text-blue-300" size={24} />
                                <h3 className="text-2xl font-bold">Business Hours</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b border-blue-700/50">
                                    <span className="text-gray-300">Monday - Friday</span>
                                    <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-blue-700/50">
                                    <span className="text-gray-300">Saturday</span>
                                    <span className="font-medium text-white">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-300">Sunday</span>
                                    <span className="font-medium text-white">Closed</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800/50 hover:transform hover:-translate-y-1 transition-transform duration-200">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={18} />
                                    <div>
                                        <div className="font-semibold mb-1">24/7 Emergency Support</div>
                                        <div className="text-sm text-blue-200">For critical issues, we provide round-the-clock support to ensure your business operations continue smoothly.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;