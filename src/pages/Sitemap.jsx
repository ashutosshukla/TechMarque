import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Shield, Users, Smartphone, Zap, Megaphone, ArrowRight, Home, Info, Briefcase, Mail, BookOpen } from 'lucide-react';
import { services, serviceCategories } from '../data/services';
import { projectsData } from '../data/projectsData';

const Sitemap = () => {
    const sitemapData = [
        {
            title: "Main Pages",
            icon: <Home className="text-zavame-teal" />,
            links: [
                { name: "Home", path: "/", icon: <Home size={14} /> },
                { name: "About Us", path: "/about", icon: <Info size={14} /> },
                { name: "Services", path: "/services", icon: <Zap size={14} /> },
                { name: "Projects", path: "/projects", icon: <Briefcase size={14} /> },
                { name: "Blog", path: "/blog", icon: <BookOpen size={14} /> },
                { name: "Contact", path: "/contact", icon: <Mail size={14} /> }
            ]
        },
        {
            title: "Service Categories",
            icon: <Globe className="text-zavame-blue" />,
            links: serviceCategories.map(cat => ({
                name: cat.name,
                path: `/services/${cat.slug}`,
                icon: <ArrowRight size={14} />
            }))
        },
        {
            title: "Detailed Services",
            icon: <Zap className="text-zavame-coral" />,
            links: services.map(service => ({
                name: service.title,
                path: `/services/detail/${service.slug}`,
                icon: <ArrowRight size={14} />
            }))
        },
        {
            title: "Featured Projects",
            icon: <Briefcase className="text-zavame-teal-light" />,
            links: projectsData.filter(p => p.featured).map(project => ({
                name: project.title,
                path: "/projects", // They all go to projects page for now as there is no project detail page in App.jsx
                icon: <ArrowRight size={14} />
            }))
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0e27] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Site <span className="text-zavame-teal">Map</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Find everything you need. A complete overview of our website structure and direct links to all our services and solutions.
                    </p>
                </motion.div>

                {/* Sitemap Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sitemapData.map((section, idx) => ( section.links.length > 0 &&
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="glass-card rounded-2xl p-8 glass-card-hover border border-white/5"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider text-sm">
                                    {section.title}
                                </h2>
                            </div>

                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link 
                                            to={link.path}
                                            className="group flex items-center gap-3 text-gray-400 hover:text-zavame-teal transition-colors duration-300"
                                        >
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {link.icon}
                                            </span>
                                            <span className="text-sm font-medium -ml-4 group-hover:ml-0 transition-all duration-300">
                                                {link.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* SEO Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center border-t border-white/5 pt-10"
                >
                    <p className="text-gray-500 text-sm">
                        Technical XML Sitemap available at <a href="/sitemap.xml" className="text-zavame-teal hover:underline">/sitemap.xml</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Sitemap;
