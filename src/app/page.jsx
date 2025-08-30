'use client';
import React, { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import the WhatsApp icon
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

      {/* WhatsApp Widget */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center">
        <span className="text-white text-sm mb-2">Chat with us</span>
        <a 
          href="https://wa.me/8419958646" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition duration-300 flex items-center justify-center"
        >
          <FaWhatsapp className="w-12 h-12" />
        </a>
      </div>
    </div>
  );
};

export default MainHomepage;
