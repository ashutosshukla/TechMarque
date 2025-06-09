import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-2xl font-bold mb-4">
                            TechFlow<span className="text-blue-400">Solutions</span>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Empowering businesses through innovative IT solutions and digital transformation strategies. Your trusted partner in technology excellence.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Software Development</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Cloud Solutions</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Cybersecurity</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">IT Consulting</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
                    <p>&copy; 2025 TechFlow Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;