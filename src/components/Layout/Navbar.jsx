'use client'
import React from 'react';
import { Globe, Plane } from 'lucide-react';

const Navbar = ({ currentPage = 'home' }) => {
  return (
    <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Globe className="w-8 h-8 text-red-500" />
              <Plane className="w-4 h-4 text-red-500 absolute -top-1 -right-1 transform rotate-45" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">The Trace Express</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className={`transition-colors font-medium ${
                currentPage === 'home' 
                  ? 'text-red-500 font-semibold' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              Home
            </a>
            <a 
              href="/aboutus" 
              className={`transition-colors font-medium ${
                currentPage === 'about' 
                  ? 'text-red-500 font-semibold' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              About
            </a>
            <a 
              href="/contactus" 
              className={`transition-colors font-medium ${
                currentPage === 'contact' 
                  ? 'text-red-500 font-semibold' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;