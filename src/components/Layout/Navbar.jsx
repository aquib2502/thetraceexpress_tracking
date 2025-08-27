'use client'
import React, { useState, useEffect } from 'react';
import { Globe, Plane, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = ({ currentPage = 'home', isMainPage = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Only track sections if on main page
      if (isMainPage) {
        const sections = ['home', 'about', 'contact'];
        const scrollPosition = window.scrollY + 100; // Offset for navbar

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMainPage]);

  // Handle navigation - prioritize scrolling if sections exist, otherwise navigate
  const handleNavigation = (page, href) => {
    // First check if the target section exists on current page
    const element = document.getElementById(page);
    
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
      router.push(href);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/aboutus', label: 'About', page: 'about' },
    { href: '/contactus', label: 'Contact', page: 'contact' },
  ];

  // Determine which section should be highlighted
  const getActiveState = (page) => {
    if (isMainPage) {
      return activeSection === page;
    } else {
      return currentPage === page;
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4 lg:py-6">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => handleNavigation('home', '/')}
          >
            <div className="relative transform group-hover:scale-110 transition-transform duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
              
              {/* Globe icon */}
              <div className="relative w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Globe className="w-5 h-5 text-white" />
                <Plane className="w-3 h-3 text-white absolute -top-1 -right-1 transform rotate-45 animate-pulse" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                The Trace Express
              </h1>
              <span className="text-xs text-slate-400 font-medium tracking-wider hidden sm:block">
                GLOBAL LOGISTICS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <button 
                key={link.page}
                onClick={() => handleNavigation(link.page, link.href)}
                className={`relative px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 group ${
                  getActiveState(link.page)
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/25 border border-cyan-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-md'
                }`}
              >
                {/* Active indicator */}
                {getActiveState(link.page) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-sm"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative z-10">{link.label}</span>
                
                {/* Bottom border for active state */}
                {getActiveState(link.page) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
            
            {/* CTA Button */}
            <button 
              onClick={() => handleNavigation('home', '/')}
              className="ml-4 lg:ml-6 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl text-sm lg:text-base transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105"
            >
              Track Package
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.page}
                  onClick={() => handleNavigation(link.page, link.href)}
                  className={`w-full text-left block px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                    getActiveState(link.page)
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/25 border border-cyan-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Mobile CTA */}
              <button 
                onClick={() => handleNavigation('home', '/')}
                className="w-full lg:cursor-pointer mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
              >
                Track Package
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-2px) rotate(45deg);
          }
        }

        .animate-pulse {
          animation: float-subtle 3s ease-in-out infinite;
        }

        /* Ensure backdrop blur works across browsers */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </header>
  );
};

export default Navbar;