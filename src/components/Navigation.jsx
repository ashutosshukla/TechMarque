import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openServices, setOpenServices] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const serviceCategories = [
        { name: 'Web Development', path: '/services/detail/web-development' },
        { name: 'Ecommerce Website', path: '/services/detail/ecommerce-website' },
        { name: 'Custom Software Dev', path: '/services/detail/custom-software-development' },
        { name: 'Search Engine Optimization', path: '/services/detail/search-engine-optimization' },
        { name: 'Social Media Marketing', path: '/services/detail/social-media-marketing' },
        { name: 'Graphic Designing', path: '/services/detail/graphic-designing' },
    ];

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services', subItems: serviceCategories },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsAdmin(!!localStorage.getItem('adminToken'));
    }, [location]);

    useEffect(() => {
        setIsOpen(false);
        setOpenServices(false);
        setMobileServicesOpen(false);
    }, [location]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenServices(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleAdminLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        setIsAdmin(false);
        navigate('/');
    };

    const isActive = (path) => {
        if (path === '/services') return location.pathname.startsWith('/services');
        return location.pathname === path;
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#080c1f]/95 backdrop-blur-2xl shadow-xl shadow-black/30 border-b border-white/5'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* ── Logo ── */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <span className="text-white font-black text-sm">Z</span>
                        </div>
                        <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                            Zavame<span className="text-emerald-400">.</span>
                        </span>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) =>
                            item.subItems ? (
                                <div key={item.name} className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setOpenServices((v) => !v)}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                                ? 'text-emerald-400 bg-emerald-400/10'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {item.name}
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-300 ${openServices ? 'rotate-180 text-emerald-400' : ''}`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {openServices && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                                className="absolute left-0 top-full mt-2 w-64 rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/40"
                                                style={{ background: 'linear-gradient(135deg, #0f1535 0%, #0a0e27 100%)' }}
                                            >
                                                {/* dropdown header */}
                                                <div className="px-4 py-3 border-b border-white/5">
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Our Services</p>
                                                </div>
                                                <div className="p-2">
                                                    {item.subItems.map((cat, idx) => (
                                                        <motion.div
                                                            key={cat.name}
                                                            initial={{ opacity: 0, x: -8 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.04 }}
                                                        >
                                                            <Link
                                                                to={cat.path}
                                                                onClick={() => setOpenServices(false)}
                                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors flex-shrink-0" />
                                                                {cat.name}
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                            ? 'text-emerald-400 bg-emerald-400/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.name}
                                    {isActive(item.path) && (
                                        <motion.div
                                            layoutId="desktop-underline"
                                            className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-emerald-400"
                                        />
                                    )}
                                </Link>
                            )
                        )}
                    </div>

                    {/* ── Desktop Right Side ── */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Admin */}
                        {isAdmin ? (
                            <div className="flex items-center gap-1 pr-3 border-r border-white/10">
                                <Link
                                    to="/admin/dashboard"
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname.startsWith('/admin')
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Shield size={14} />
                                    <span>Dashboard</span>
                                </Link>
                                <button
                                    onClick={handleAdminLogout}
                                    title="Logout"
                                    className="p-2 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                                >
                                    <LogOut size={14} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/admin/login"
                                className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200"
                                title="Admin Login"
                            >
                                <Shield size={15} />
                            </Link>
                        )}

                        {/* CTA */}
                        <Link
                            to="/contact"
                            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        onClick={() => setIsOpen((v) => !v)}
                        className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isOpen ? 'close' : 'open'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden border-t border-white/5"
                        style={{ background: 'linear-gradient(180deg, #0d1230 0%, #0a0e27 100%)' }}
                    >
                        <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                >
                                    {item.subItems ? (
                                        <div>
                                            <button
                                                onClick={() => setMobileServicesOpen((v) => !v)}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                                        ? 'text-emerald-400 bg-emerald-400/10'
                                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {item.name}
                                                <ChevronDown
                                                    size={15}
                                                    className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-emerald-400' : ''}`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {mobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden mt-1 ml-3 pl-3 border-l border-emerald-500/20 space-y-0.5"
                                                    >
                                                        {item.subItems.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                to={sub.path}
                                                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-200"
                                                            >
                                                                <span className="w-1 h-1 rounded-full bg-emerald-500/40 flex-shrink-0" />
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                                    ? 'text-emerald-400 bg-emerald-400/10'
                                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}

                            {/* Divider */}
                            <div className="h-px bg-white/5 my-3" />

                            {/* Mobile CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28 }}
                            >
                                <Link
                                    to="/contact"
                                    className="block w-full text-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                                >
                                    Get Quote
                                </Link>
                            </motion.div>

                            {/* Mobile Admin */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.34 }}
                                className="pt-1"
                            >
                                {isAdmin ? (
                                    <div className="flex gap-2">
                                        <Link
                                            to="/admin/dashboard"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-white/8 transition-all duration-200"
                                        >
                                            <Shield size={14} />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleAdminLogout}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all duration-200"
                                        >
                                            <LogOut size={14} />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/admin/login"
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200"
                                    >
                                        <Shield size={14} />
                                        Admin Login
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navigation;