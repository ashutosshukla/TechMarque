import React from 'react';
import HeroSection from '../components/HeroSection';
import ContactSection from '../components/ContactSection';
import Services from './Services';
import AboutHero from '../components/About/AboutHero';
import ProjectsMarquee from '../components/ProjectsCarousel ';
import ProjectsSlider from '../components/ProjectsCarousel ';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <div>
            <SEO
                title="Zavame - Professional Web Development & Digital Solutions"
                description="Transform your ideas into digital reality with Zavame's expert web development, mobile app development, and UI/UX design services. Professional solutions for modern businesses."
                canonicalUrl="/"
                keywords="web development, mobile app development, UI UX design, digital solutions, React development, Node.js, zavame, professional web design"
                ogImage="https://zavame.com/og-home-image.jpg"
            />
            <HeroSection />
            <Services />
            <AboutHero />
            <ProjectsSlider />
            <ContactSection />
        </div>
    );
};

export default Home;