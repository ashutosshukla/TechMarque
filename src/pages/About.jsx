// AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AboutHero from '../components/About/AboutHero';
import AboutSection from '../components/About/AboutSection';

const About = () => {
    return (
        <div className="bg-slate-900">
            <AboutHero />

            {/* Transition element with animation */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 64 }}
                transition={{ duration: 0.8 }}
                className="relative bg-gradient-to-b from-blue-900/20 to-transparent -mt-16 z-0"
            ></motion.div>

            <AboutSection />

            {/* Animated CTA section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800 py-16"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to start your digital transformation?
                    </h2>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                        Contact Our Team
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default About;