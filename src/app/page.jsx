'use client'
import React, { useEffect } from 'react';
import TraceExpress from '../components/HomePage/HomePage.jsx';
import AboutUs from '../components/AboutUs/AboutUs.jsx';
import ContactUs from '../components/ContactUs/ContactUs.jsx';

const MainHomepage = () => {
  // Smooth scrolling function for navigation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Expose scrollToSection to window for navbar access
  useEffect(() => {
    window.scrollToSection = scrollToSection;
    
    // Cleanup function
    return () => {
      delete window.scrollToSection;
    };
  }, []);

  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

    <div className="min-h-screen">
      {/* Home/Tracking Section */}
      <section id="home">
        <TraceExpress />
      </section>

      {/* About Us Section */}
      <section id="about">
        <AboutUs />
      </section>

      {/* Contact Us Section */}
      <section id="contact">
        <ContactUs />
      </section>
    </div>
    </div>
  );
};

export default MainHomepage;