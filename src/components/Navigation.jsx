import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold text-white">
                        Tech<span className="text-blue-400">Marque</span>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {['Home', 'Services', 'About', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                                className="text-white hover:text-blue-400 transition-colors duration-200"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {['Home', 'Services', 'About', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
                                        setIsOpen(false);
                                    }}
                                    className="block px-3 py-2 text-white hover:text-blue-400 transition-colors duration-200"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;