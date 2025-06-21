import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, LogOut, ChevronDown } from 'lucide-react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openServices, setOpenServices] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Service categories data
    const serviceCategories = [
        {
            name: 'Development',
            path: '/services/development',  // Matches route /services/:category
            // services: [
            //     {
            //         name: 'Custom Software',
            //         path: '/services/detail/custom-software-development' // Must match service.slug exactly
            //     },
            //     {
            //         name: 'Web Development',
            //         path: '/services/detail/web-development'
            //     }
            // ]
        },
        {
            name: 'Cloud',
            path: '/services/cloud',
            // services: [
            //     { name: 'Cloud Migration', path: '/services/detail/cloud-migration' },
            //     { name: 'DevOps', path: '/services/detail/devops' }
            // ]
        },
        {
            name: 'Security',
            path: '/services/security',
            // services: [
            //     { name: 'Security Audits', path: '/services/detail/security-audits' },
            //     { name: 'Penetration Testing', path: '/services/detail/penetration-testing' }
            // ]
        },
        {
            name: 'Innovation',
            path: '/services/innovation',
            // services: [
            //     { name: 'AI/ML Solutions', path: '/services/detail/ai-ml-solutions' },
            //     { name: 'Blockchain', path: '/services/detail/blockchain-development' }
            // ]
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check admin authentication status
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsAdmin(!!token);
    }, [location]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleAdminLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        setIsAdmin(false);
        navigate('/');
    };

    const navItems = [
        { name: 'Home', path: '/' },
        {
            name: 'Services',
            path: '/services',
            subItems: serviceCategories
        },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
    ];

    const isActive = (path) => {
        // For blog routes, consider both /blog and /blog/* as active
        if (path === '/blog') {
            return location.pathname === '/blog' || location.pathname.startsWith('/blog/');
        }
        return location.pathname === path;
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link
                        to="/"
                        className={`text-2xl font-bold transition-colors ${scrolled ? 'text-slate-900' : 'text-white'
                            }`}
                    >
                        TechMarque
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.subItems ? (
                                    <>
                                        <button
                                            className={`flex items-center gap-1 transition-colors font-medium ${isActive(item.path)
                                                ? scrolled
                                                    ? 'text-blue-600'
                                                    : 'text-blue-400'
                                                : scrolled
                                                    ? 'text-slate-700 hover:text-blue-600'
                                                    : 'text-gray-300 hover:text-white'
                                                }`}
                                            onClick={() => setOpenServices(!openServices)}
                                        >
                                            {item.name}
                                            <ChevronDown size={16} className={`transition-transform ${openServices ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className={`absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 ${openServices ? 'block' : 'hidden'}`}>
                                            {item.subItems.map((category) => (
                                                <div key={category.name} className="px-4 py-2 hover:bg-gray-100">
                                                    <Link
                                                        to={category.path}
                                                        className="block font-medium text-gray-800"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                    {/* <div className="mt-1 space-y-1">
                                                        {category.services.map((service) => (
                                                            
                                                            <Link
                                                                key={service?.name}
                                                                to={service?.path}
                                                                className="block px-4 py-1 text-sm text-gray-600 hover:text-blue-600"
                                                            >
                                                                {service?.name}
                                                            </Link>
                                                        ))}
                                                    </div> */}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`transition-colors font-medium ${isActive(item.path)
                                            ? scrolled
                                                ? 'text-blue-600'
                                                : 'text-blue-400'
                                            : scrolled
                                                ? 'text-slate-700 hover:text-blue-600'
                                                : 'text-gray-300 hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Admin Section */}
                        <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-300">
                            {isAdmin ? (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        to="/admin/dashboard"
                                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${location.pathname.startsWith('/admin')
                                            ? 'bg-blue-600 text-white'
                                            : scrolled
                                                ? 'text-slate-700 hover:bg-gray-100 hover:text-blue-600'
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <Shield size={16} />
                                        <span className="text-sm font-medium">Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={handleAdminLogout}
                                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${scrolled
                                            ? 'text-red-600 hover:bg-red-50'
                                            : 'text-red-400 hover:bg-white/10 hover:text-red-300'
                                            }`}
                                        title="Logout"
                                    >
                                        <LogOut size={16} />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/admin/login"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${location.pathname === '/admin/login'
                                        ? 'bg-blue-600 text-white'
                                        : scrolled
                                            ? 'text-slate-700 hover:bg-gray-100 hover:text-blue-600'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Shield size={16} />
                                    <span className="text-sm font-medium">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <button
                        className={`md:hidden p-2 transition-colors ${scrolled ? 'text-slate-900' : 'text-white'
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`block px-3 py-2 text-base font-medium transition-colors ${isActive(item.path)
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Mobile Admin Section */}
                            <div className="border-t border-gray-200 mt-2 pt-2">
                                {isAdmin ? (
                                    <div className="space-y-1">
                                        <Link
                                            to="/admin/dashboard"
                                            className={`flex items-center space-x-2 px-3 py-2 text-base font-medium transition-colors ${location.pathname.startsWith('/admin')
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-slate-700 hover:text-blue-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Shield size={16} />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={handleAdminLogout}
                                            className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 w-full text-left"
                                        >
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/admin/login"
                                        className={`flex items-center space-x-2 px-3 py-2 text-base font-medium transition-colors ${location.pathname === '/admin/login'
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-slate-700 hover:text-blue-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Shield size={16} />
                                        <span>Admin Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;