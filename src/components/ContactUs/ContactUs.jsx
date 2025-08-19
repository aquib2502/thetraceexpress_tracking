'use client'
import React, { useState } from 'react';
import { Globe, Plane, Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, Headphones, Building, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';

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
  const [activeTab, setActiveTab] = useState('general');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const offices = [
    {
      city: 'New York',
      country: 'USA',
      address: '123 Express Boulevard, Manhattan, NY 10001',
      phone: '+1 (555) 123-TRACE',
      email: 'ny@traceexpress.com',
      timezone: 'GMT-5',
      isHeadquarters: true
    },
    {
      city: 'London',
      country: 'UK',
      address: '45 Logistics Lane, Westminster, London SW1A 1AA',
      phone: '+44 20 7946 0958',
      email: 'london@traceexpress.com',
      timezone: 'GMT+0'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '88 Maritime Square, Harbourfront, Singapore 099253',
      phone: '+65 6789 1234',
      email: 'singapore@traceexpress.com',
      timezone: 'GMT+8'
    },
    {
      city: 'Mumbai',
      country: 'India',
      address: '456 Trade Center, Bandra Kurla Complex, Mumbai 400051',
      phone: '+91 22 6789 5432',
      email: 'mumbai@traceexpress.com',
      timezone: 'GMT+5:30'
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant support from our experts',
      availability: '24/7 Available',
      action: 'Start Chat',
      color: 'blue'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      availability: 'Mon-Fri, 9AM-6PM',
      action: 'Call Now',
      color: 'green'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed queries via email',
      availability: 'Response within 2 hours',
      action: 'Send Email',
      color: 'red'
    },
    {
      icon: Headphones,
      title: 'Emergency Line',
      description: 'For urgent delivery issues',
      availability: '24/7 Emergency',
      action: 'Emergency Call',
      color: 'orange'
    }
  ];

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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'normal'
      });
    }, 2000);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-300 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-gray-300 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-gray-300 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-gray-50 to-transparent"></div>
      </div>
    <Navbar />
      

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* <div className="mb-8">
            <img 
              src="/airplane_globe.jpg" 
              alt="The Trace Express Globe"
              className="w-32 h-32 mx-auto object-contain drop-shadow-2xl animate-pulse"
            />
          </div> */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In <span className="text-red-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions? Need support? Want to partner with us? We're here to help you 
            with all your logistics needs. Reach out to our global team today.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Preferred Support</h2>
            <p className="text-lg text-gray-600">Multiple ways to connect with our expert team</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group cursor-pointer transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-${option.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className={`w-8 h-8 text-${option.color}-500`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <p className="text-sm text-gray-500 mb-4">{option.availability}</p>
                <button className={`w-full bg-${option.color}-500 hover:bg-${option.color}-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}>
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency Level</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                      >
                        <option value="low">Low Priority</option>
                        <option value="normal">Normal</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. Our team will get back to you within 2 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">24/7 Support Hotline</p>
                      <p className="opacity-90">+1-800-TRACE-EX</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Support</p>
                      <p className="opacity-90">support@traceexpress.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Global Headquarters</p>
                      <p className="opacity-90">123 Express Boulevard<br />Manhattan, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <p className="opacity-90">24/7 Operations<br />Support: Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Need Quick Help?</h3>
                <div className="space-y-3">
                  <a href="/track" className="block p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                    📦 Track Your Package
                  </a>
                  <a href="/shipping-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                    💰 Calculate Shipping Costs
                  </a>
                  <a href="/branch-locator" className="block p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                    📍 Find Nearest Branch
                  </a>
                  <a href="/help" className="block p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                    ❓ Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      {/* <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Global Presence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with our regional offices worldwide for localized support and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative ${office.isHeadquarters ? 'ring-2 ring-red-500' : ''}`}>
                {office.isHeadquarters && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Headquarters
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                  <span className="text-sm text-gray-500">{office.timezone}</span>
                </div>
                <p className="text-red-500 font-semibold mb-4">{office.country}</p>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200">
              Contact Our Support Team
            </button>
          </div> */}
        </div>
      </section>

     <Footer />
    </div>
  );
};

export default ContactUs;