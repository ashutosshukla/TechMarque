import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServiceSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <ContactSection />
        </div>
    );
};

export default Home;