'use client'
import React from 'react';
import { Globe, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  // Handle navigation - prioritize scrolling if sections exist, otherwise navigate
  const handleNavigation = (sectionId, fallbackUrl) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // If section exists, scroll to it
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      // If section doesn't exist, navigate to the page
      router.push(fallbackUrl);
    }
  };

  return (
    <footer className="relative z-10 bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Globe className="w-8 h-8 text-red-500" />
                <Plane className="w-4 h-4 text-red-500 absolute -top-1 -right-1 transform rotate-45" />
              </div>
              <h1 className="text-2xl font-bold">The Trace Express</h1>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for global logistics and express delivery services. 
              Connecting the world, one package at a time.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('home', '/')}
                  className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Track Package
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('about', '/aboutus')}
                  className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact', '/contactus')}
                  className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Customer Support
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📞 +91 8419958646</li>
              <li>
                <a 
                  href="mailto:thetraceexpress@gmail.com"
                  className="hover:text-blue-300"
                >
                  📧 thetraceexpress@gmail.com
                </a>
              </li>
              <li>📍 Marol , Andheri (East)<br />Mumbai, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2024 The Trace Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;