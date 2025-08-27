'use client'
import React, { useState, useEffect } from 'react';
import { Globe, Plane, Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, Headphones, Building, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
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

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('XjGainrcZeRNoYkr_'); // Replace with your EmailJS public key
  }, []);

  const faqs = [
    {
      question: 'How can I track my package?',
      answer: 'You can track your package using your AWB number, forwarding number, or reference number on our homepage tracking tool. You\'ll get real-time updates on your shipment\'s location and delivery status.'
    },
    {
      question: 'What are your delivery timeframes?',
      answer: 'Delivery times vary by destination: Express (1-2 days), Standard (3-5 days), Economy (5-7 days). We offer same-day delivery in major cities and next-day delivery for most domestic shipments.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to 220+ countries worldwide. Our global network ensures secure, tracked deliveries with customs clearance support and local delivery partnerships.'
    },
    {
      question: 'What if my package is damaged or lost?',
      answer: 'All shipments are insured. Report any issues within 24 hours of delivery. We\'ll investigate immediately and provide compensation or replacement according to our insurance policy.'
    },
    {
      question: 'How do I calculate shipping costs?',
      answer: 'Shipping costs depend on weight, dimensions, destination, and service type. Use our online calculator or contact our team for accurate quotes and bulk shipping discounts.'
    },
    {
      question: 'Can I change delivery address after shipping?',
      answer: 'Address changes are possible before the package reaches the destination facility. Contact our support team immediately with your tracking number to request address modifications.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration
const templateParams = {
  from_name: formData.name,
  email: formData.email, // Use "email" instead of "from_email"
  phone: formData.phone,
  subject: formData.subject,
  message: formData.message,
  urgency: formData.urgency,
  to_email: 'aquibhingwala@gmail.com'
};





      await emailjs.send(
        'service_215smxe', // Replace with your EmailJS service ID
        'template_zsrh7mk', // Replace with your EmailJS template ID
        templateParams
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'normal'
      });

    } catch (error) {
      console.error('Email sending failed:', error);

      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400/20 to-orange-600/20 rounded-full blur-3xl animate-float"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({length: 25}).map((_, i) => (
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
      <section className="relative z-10 pt-32 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8" data-animate id="hero">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 sm:mb-12">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm mb-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              24/7 Global Support
            </span>
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25 transform hover:scale-110 transition-transform duration-500 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse-slow"></div>
              <MessageSquare className="w-16 h-16 sm:w-20 sm:h-20 text-white relative z-10" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Get In
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Touch
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Have questions? Need support? Want to partner with us? We're here to help you 
            with all your logistics needs. Reach out to our global team today.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8" data-animate id="contact">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
              <h2 className="text-3xl lg:text-3xl font-bold text-white mb-8">Send Us a Message</h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 text-white placeholder-slate-400"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 text-white placeholder-slate-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 text-white placeholder-slate-400"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Urgency Level</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 text-white"
                      >
                        <option value="low" className="bg-slate-800 text-white">Low Priority</option>
                        <option value="normal" className="bg-slate-800 text-white">Normal</option>
                        <option value="high" className="bg-slate-800 text-white">High Priority</option>
                        <option value="urgent" className="bg-slate-800 text-white">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 text-white placeholder-slate-400"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 text-white placeholder-slate-400 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                  <p className="text-slate-300 mb-6">
                    Thank you for contacting us. Our team will get back to you within 2 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
                <h2 className="text-3xl lg:text-3xl font-bold text-white mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">24/7 Support Hotline</p>
                      <p className="text-slate-300">+91 8419958646</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Email Support</p>
                      <p className="text-slate-300">thetraceexpress@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Global Headquarters</p>
                      <p className="text-slate-300">Marol, Andheri (East)<br />Mumbai, India</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Business Hours</p>
                      <p className="text-slate-300">24/7 Operations<br />Support: Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Need Quick Help?</h3>
                <div className="space-y-3">
                  <a href="/" className="block p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:text-cyan-400 text-slate-300 transition-all duration-300 transform hover:-translate-y-1">
                    📦 Track Your Package
                  </a>
                  <a href="#" className="block p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:text-cyan-400 text-slate-300 transition-all duration-300 transform hover:-translate-y-1">
                    💰 Calculate Shipping Costs
                  </a>
                  <a href="#" className="block p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:text-cyan-400 text-slate-300 transition-all duration-300 transform hover:-translate-y-1">
                    📍 Find Nearest Branch
                  </a>
                  <a href="#" className="block p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:text-cyan-400 text-slate-300 transition-all duration-300 transform hover:-translate-y-1">
                    ❓ Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8" data-animate id="faq">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl lg:text-xl text-slate-300 max-w-3xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                >
                  <span className="font-bold text-white text-lg">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-6 h-6 text-cyan-400 transform transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400 transform transition-transform duration-300" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-5">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
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

        /* Backdrop filter support */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Enhanced focus states */
        button:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }

        /* Custom scrollbar */
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
      `}</style>
    </div>
  );
};

export default ContactUs;