import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, AlertTriangle, CheckCircle, Send } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const phone = '919783598702';
        const text = `*New Contact Form Message*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Company:* ${encodeURIComponent(formData.company || 'N/A')}%0A*Message:* ${encodeURIComponent(formData.message)}`;
        const whatsappUrl = `https://wa.me/${phone}?text=${text}`;

        window.open(whatsappUrl, '_blank');

        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });

        setTimeout(() => setSubmitSuccess(false), 5000);
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
            className="py-24 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0d1230 50%, #0a0e27 100%)' }}
            ref={ref}
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-zavame-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-0 w-72 h-72 bg-zavame-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full bg-zavame-teal/10 border border-zavame-teal/30 text-zavame-teal text-sm font-medium mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                    >
                        Contact Us
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Get In <span className="text-zavame-teal">Touch</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Ready to transform your business with innovative IT solutions? Let's discuss your project.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-zavame-teal/20 transition-all duration-300"
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Send us a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2 text-sm">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-zavame-teal/50 focus:border-zavame-teal/50 transition-all duration-300 text-white placeholder-gray-500 text-sm outline-none"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2 text-sm">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-zavame-teal/50 focus:border-zavame-teal/50 transition-all duration-300 text-white placeholder-gray-500 text-sm outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 font-medium mb-2 text-sm">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-zavame-teal/50 focus:border-zavame-teal/50 transition-all duration-300 text-white placeholder-gray-500 text-sm outline-none"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 font-medium mb-2 text-sm">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-zavame-teal/50 focus:border-zavame-teal/50 transition-all duration-300 text-white placeholder-gray-500 resize-none text-sm outline-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            <div>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white hover:shadow-lg hover:shadow-zavame-teal/30 hover:scale-[1.02] text-sm"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={16} />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>

                        {submitSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3"
                            >
                                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                                <div>
                                    <h4 className="font-medium text-green-300 text-sm">Message sent successfully!</h4>
                                    <p className="text-xs text-green-400/70 mt-0.5">We'll get back to you within 24 hours.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: <Phone className="text-zavame-teal" size={18} />,
                                        label: 'Phone',
                                        content: <a href="tel:+919783598702" className="text-gray-300 hover:text-zavame-teal transition-colors text-sm">+91 9783598702</a>
                                    },
                                    {
                                        icon: <Mail className="text-zavame-teal" size={18} />,
                                        label: 'Email',
                                        content: <a href="mailto:zavame.jaipur@gmail.com" className="text-gray-300 hover:text-zavame-teal transition-colors text-sm">zavame.jaipur@gmail.com</a>
                                    },
                                    {
                                        icon: <MapPin className="text-zavame-teal" size={18} />,
                                        label: 'Address',
                                        content: <span className="text-gray-300 text-sm">Civil Lines, Jaipur</span>
                                    }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="w-10 h-10 bg-zavame-teal/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-zavame-teal/20 transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white text-sm">{item.label}</div>
                                            {item.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gradient-to-br from-zavame-teal/10 to-zavame-blue/10 p-6 sm:p-8 rounded-2xl text-white border border-zavame-teal/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-zavame-teal/20 p-2 rounded-lg">
                                    <Clock className="text-zavame-teal" size={20} />
                                </div>
                                <h3 className="text-xl font-bold">Business Hours</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                                    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                                    { day: 'Sunday', time: 'Closed' },
                                ].map((item, idx) => (
                                    <div key={idx} className={`flex justify-between py-2.5 ${idx < 2 ? 'border-b border-white/10' : ''}`}>
                                        <span className="text-gray-400 text-sm">{item.day}</span>
                                        <span className="font-medium text-white text-sm">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="text-zavame-coral mt-0.5 flex-shrink-0" size={16} />
                                    <div>
                                        <div className="font-semibold mb-1 text-sm">24/7 Emergency Support</div>
                                        <div className="text-xs text-gray-400">For critical issues, we provide round-the-clock support to ensure your business operations continue smoothly.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;