import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        services: [
            { name: 'Web Development', path: '/services/Web Development' },
            { name: 'Ecommerce', path: '/services/ecommerce' },
            { name: 'Custom Software', path: '/services/software' },
            { name: 'SEO', path: '/services/seo' },
            { name: 'Social Media', path: '/services/marketing' },
            { name: 'Graphic Design', path: '/services/creative' },
        ],
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Projects', path: '/projects' },
            // { name: 'Blog', path: '/blog' },
            { name: 'Contact', path: '/contact' },
        ]
    };

    return (
        <footer
            className="relative overflow-hidden border-t border-white/5"
            style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #070b1e 100%)' }}
        >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zavame-teal/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-5 group">
                            <img
                                src="/Zavame.svg"
                                alt="Zavame"
                                className="h-8 w-8 rounded-lg group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-xl font-bold text-white">
                                Zavame<span className="text-zavame-teal">.</span>
                            </span>
                        </Link>

                        <p className="text-gray-400 mb-6 max-w-sm text-sm leading-relaxed">
                            Empowering businesses through innovative IT solutions and digital transformation strategies. Your trusted partner in technology excellence.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="mailto:zavame.jaipur@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-zavame-teal transition-colors text-sm group">
                                <Mail size={14} className="group-hover:scale-110 transition-transform" />
                                zavame.jaipur@gmail.com
                            </a>

                            <a href="tel:+919783598702" className="flex items-center gap-2 text-gray-400 hover:text-zavame-teal transition-colors text-sm group">
                                <Phone size={14} className="group-hover:scale-110 transition-transform" />
                                +91 9783598702
                            </a>

                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin size={14} />
                                Civil Lines, Jaipur
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-6">
                            <a
                                href="https://www.instagram.com/zavame_technologies?igsh=MWc0ZjZpdm5iOWI1MA%3D%3D&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/5 hover:bg-zavame-teal/20 text-gray-400 hover:text-zavame-teal transition-all"
                            >
                                <Instagram size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-zavame-teal transition-colors text-sm flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-zavame-teal transition-colors text-sm flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Get Started</h4>
                        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                            Ready to bring your next project to life? Let's talk.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-zavame-teal to-zavame-blue text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-zavame-teal/30 transition-all duration-300 hover:scale-105"
                        >
                            Start a Project
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        &copy; {currentYear} Zavame Technologies. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/sitemap" className="text-gray-500 hover:text-zavame-teal transition-colors text-xs">
                            Sitemap
                        </Link>
                        <a href="#" className="text-gray-500 hover:text-zavame-teal transition-colors text-xs">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-zavame-teal transition-colors text-xs">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;