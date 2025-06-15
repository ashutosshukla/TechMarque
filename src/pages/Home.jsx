import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import ProjectsCarousel from '../components/ProjectsCarousel ';
import Services from './Services';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Services />
            <AboutSection />
            <ProjectsCarousel />
            <ContactSection />
        </div>
    );
};

export default Home;