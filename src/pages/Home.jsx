import React from 'react';
import HeroSection from '../components/HeroSection';
import ContactSection from '../components/ContactSection';
import Services from './Services';
import AboutHero from '../components/About/AboutHero';
import StackedProjectsCards from '../components/ProjectsCarousel ';
import ModernProjectsGrid from '../components/ProjectsCarousel ';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Services />
            <AboutHero />
            <ModernProjectsGrid />
            <ContactSection />
        </div>
    );
};

export default Home;