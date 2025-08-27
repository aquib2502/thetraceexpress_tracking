'use client'
import React, { useState, useEffect } from 'react';
import { Globe, Plane, Package, MapPin, Users, Award, Target, Heart, TrendingUp, Clock, Shield, Zap, CheckCircle, Star, Truck, Eye, DollarSign, Headphones, Send, MousePointer } from 'lucide-react';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for lazy loading animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '220+', label: 'Countries Served', icon: Globe },
    { number: '50M+', label: 'Packages Delivered', icon: Package },
    { number: '15+', label: 'Years Experience', icon: Clock },
    { number: '10K+', label: 'Happy Clients', icon: Users },
  ];

  const services = [
    {
      icon: Truck,
      title: 'Domestic Express & Economy',
      description: 'Door-to-door pickup, same/next-day options, COD/Prepaid services across India.',
      features: ['Same Day Delivery', 'Next Day Delivery', 'COD Available', 'Door-to-Door Pickup'],
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Globe,
      title: 'International Shipping',
      description: 'Documents, parcels, samples, and commercial cargo to major global destinations.',
      features: ['220+ Countries', 'Air Cargo', 'Express Documents', 'Commercial Cargo'],
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'from-purple-500 to-pink-600'
    },
    {
      icon: Package,
      title: 'E-commerce Logistics',
      description: 'Automated order syncing, packaging guidance, branded tracking, returns management.',
      features: ['Order Integration', 'Branded Tracking', 'Returns Management', 'Packaging Support'],
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Special Handling',
      description: 'Fragile goods, high-value items, temperature-sensitive shipments with extra care.',
      features: ['Fragile Care', 'High-Value Security', 'Temperature Control', 'Custom Solutions'],
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'from-amber-500 to-orange-600'
    }
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: 'On-Time Performance',
      description: 'Optimized routes and priority handling ensure your packages arrive exactly when promised.',
      color: 'cyan'
    },
    {
      icon: Eye,
      title: 'End-to-End Visibility',
      description: 'Live tracking, proactive status alerts, and delivery proof keep you informed every step.',
      color: 'emerald'
    },
    {
      icon: Shield,
      title: 'Secure Handling',
      description: 'Tamper-evident packaging and verified partners ensure your shipments stay safe.',
      color: 'purple'
    },
    {
      icon: DollarSign,
      title: 'Clear Pricing',
      description: 'No hidden fees, no surprises—only transparent value and competitive rates.',
      color: 'amber'
    },
    {
      icon: Headphones,
      title: 'Human Support',
      description: 'A real team of experts who answer fast and solve problems with a personal touch.',
      color: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400/20 to-orange-600/20 rounded-full blur-3xl animate-float"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({length: 144}).map((_, i) => (
              <div key={i} className="border border-white/10 rounded-sm"></div>
            ))}
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({length: 30}).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8" data-animate id="hero">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 sm:mb-12">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Customer-First Logistics
            </span>
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-35 lg:h-35 mx-auto bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25 transform hover:scale-110 transition-transform duration-500 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse-slow"></div>
              <Plane className="w-14 h-14 sm:w-20 sm:h-20 lg:w-22 lg:h-22 text-white relative z-10" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl  lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              The Trace Express
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-slate-300 max-w-6xl mx-auto leading-relaxed px-4">
            We're a customer-first Domestic & International Courier company built on three promises: 
            <span className="font-bold text-cyan-400"> speed, safety, and transparency</span>. 
            Whether you're sending time-critical documents across town or bulk parcels overseas, 
            we combine smart routing, reliable carrier partnerships, and dedicated support to deliver—on time, every time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" data-animate id="stats">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 sm:p-8 lg:p-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 hover:border-white/30"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${
                  index === 0 ? 'from-cyan-500 to-blue-600' :
                  index === 1 ? 'from-purple-500 to-pink-600' :
                  index === 2 ? 'from-emerald-500 to-teal-600' :
                  'from-amber-500 to-orange-600'
                } rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}>
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">{stat.number}</div>
                <div className="text-sm sm:text-base lg:text-lg text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" data-animate id="services">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
              What <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">We Do</span>
            </h2>
            <p className="text-xl sm:text-2xl lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive logistics solutions tailored to meet your every shipping need
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 border border-white/20 hover:border-white/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 bg-gradient-to-br ${service.gradient}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${service.iconColor} rounded-2xl flex items-center justify-center mr-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-slate-300 font-medium mb-6 sm:mb-8 leading-relaxed text-lg sm:text-xl">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-base sm:text-lg text-slate-200">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" data-animate id="why-choose">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible['why-choose'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Five core principles that make us your most reliable logistics partner
            </p>
          </div>

          {/* First Row - 2 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12 max-w-5xl mx-auto">
            {whyChooseUs.slice(0, 2).map((item, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 border border-white/20 hover:border-white/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-${item.color}-500/30`}>
                  <item.icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-${item.color}-400`} />
                </div>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">{item.title}</h4>
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Second Row - 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {whyChooseUs.slice(2, 5).map((item, index) => (
              <div 
                key={index + 2} 
                className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 border border-white/20 hover:border-white/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                style={{animationDelay: `${(index + 2) * 0.1}s`}}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-${item.color}-500/30`}>
                  <item.icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-${item.color}-400`} />
                </div>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">{item.title}</h4>
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision Section */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" data-animate id="mission-vision">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible['mission-vision'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Foundation</span>
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              The mission and vision that drives everything we do
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12 sm:mb-16 lg:mb-20">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-3 sm:p-4 border border-white/20">
              {['mission', 'vision'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 sm:px-12 sm:py-6 lg:px-16 lg:py-8 rounded-xl lg:rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === 'mission' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/20 transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center mb-8 sm:mb-12">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center border border-cyan-500/30">
                    <Target className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-8 lg:mb-12">Our Mission</h3>
                <p className="text-xl sm:text-2xl lg:text-xl text-slate-300 text-center leading-relaxed">
                  To make shipping effortless for businesses and individuals by providing dependable logistics, 
                  fair pricing, and exceptional care for every parcel. We believe every package carries someone's trust, 
                  and we honor that responsibility with unwavering commitment to excellence.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/20 transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center mb-8 sm:mb-12">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-full flex items-center justify-center border border-purple-500/30">
                    <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-6 sm:mb-8 lg:mb-12">Our Vision</h3>
                <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 text-center leading-relaxed">
                  A world where sending anything, anywhere, is as easy as a click—powered by technology, 
                  delivered with a human touch. We envision seamless global connectivity where distance 
                  becomes irrelevant and trust in logistics services is absolute.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-xl border-t border-white/20" data-animate id="cta">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold  text-white mb-6 sm:mb-8 lg:mb-12">
            Ready to Experience <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Excellence?</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-xl text-slate-300 mb-10 sm:mb-12 lg:mb-16 leading-relaxed max-w-5xl mx-auto">
            Join thousands of satisfied customers who trust The Trace Express with their most important deliveries. 
            Reliable and fast Domestic & International Courier Service delivering parcels safely and on time across India and worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 justify-center max-w-2xl mx-auto">
            <a href='/'>
              <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-10 py-5 sm:px-12 sm:py-6 lg:px-16 lg:py-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-2 hover:scale-105 text-lg sm:text-xl lg:text-2xl">
                <Send className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 inline mr-3" />
                Track Your Package
              </button>
            </a>
            <a href='/contactus'>
              <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold px-10 py-5 sm:px-12 sm:py-6 lg:px-16 lg:py-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-lg sm:text-xl lg:text-2xl">
                <MousePointer className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 inline mr-3" />
                Contact Us Today
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(-10px) rotate(240deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(-120deg);
          }
          66% {
            transform: translateY(-25px) rotate(-240deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #06b6d4, #3b82f6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #0891b2, #2563eb);
        }

        /* Backdrop filter support for older browsers */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible,
        input:focus-visible,
        select:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }

        /* Prevent layout shift during loading */
        .tracking-container {
          min-height: 400px;
        }

        /* Ensure proper text contrast on all backgrounds */
        .text-contrast-enhance {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        /* Responsive font scaling */
        @media (max-width: 640px) {
          .text-responsive-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }

        @media (min-width: 1024px) {
          .text-responsive-xl {
            font-size: 2rem;
            line-height: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;