import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServiceSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import ProjectsCarousel from '../components/ProjectsCarousel ';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <ProjectsCarousel />
            <ContactSection />
        </div>
    );
};

export default Home;