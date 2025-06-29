import React from 'react';
import HeroSection from '../components/HeroSection';
import ContactSection from '../components/ContactSection';
import Services from './Services';
import AboutHero from '../components/About/AboutHero';
import ProjectsMarquee from '../components/ProjectsCarousel ';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Services />
            <AboutHero />
            <ProjectsMarquee />
            <ContactSection />
        </div>
    );
};

export default Home;