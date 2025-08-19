'use client'
import React, { useState } from 'react';
import { Globe, Plane, Package, MapPin, Users, Award, Target, Heart, TrendingUp, Clock, Shield, Zap, CheckCircle, Star } from 'lucide-react';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '220+', label: 'Countries Served', icon: Globe },
    { number: '50M+', label: 'Packages Delivered', icon: Package },
    { number: '15+', label: 'Years Experience', icon: Clock },
    { number: '10K+', label: 'Happy Clients', icon: Users },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every delivery matters. We ensure accuracy in tracking, timing, and handling of your precious cargo.',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Building lasting relationships through transparency, reliability, and unwavering commitment to security.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to revolutionize global logistics and delivery experiences.',
      color: 'green'
    },
    {
      icon: Heart,
      title: 'Care',
      description: 'Your packages are treated with the same care and attention we would give our own belongings.',
      color: 'purple'
    }
  ];

  const timeline = [
    { 
      title: 'Divine Inspiration', 
      description: 'Founded with the belief that every delivery is an Amanah (trust) from Allah, connecting hearts across the globe with integrity and purpose.' 
    },
    { 
      title: 'Unity in Diversity', 
      description: 'Building bridges between communities worldwide, embodying the Islamic principle of Ummah - one global family united in service.' 
    },
    { 
      title: 'Technological Excellence', 
      description: 'Embracing innovation as a means to serve humanity better, following the Islamic teaching of continuous improvement (Ihsan) in all endeavors.' 
    },
    { 
      title: 'Global Brotherhood', 
      description: 'Expanding our network with the vision of connecting every corner of the earth, inspired by the unity of Tauheed - one Creator, one purpose.' 
    },
    { 
      title: 'Future Vision', 
      description: 'Leading with wisdom and compassion, creating a legacy of trust and excellence that reflects the timeless values of Islam in modern logistics.' 
    }
  ];

  const captain = {
    name: 'Muhammad Aquib',
    role: 'Founder & Chief Executive Officer',
    image: '/aquib.jpg',
    description: 'A visionary leader driven by the principles of Islam, Muhammad Aquib founded The Trace Express with the divine inspiration to serve humanity through excellence in logistics. Guided by the concept of Tauheed (Unity of Allah), he believes that every delivery is an Amanah (sacred trust) that connects people across the globe.',
    philosophy: 'Alhamdulillahi Rabbil Alameen - All praise is due to Allah, the Lord of all worlds. Our journey began with a simple yet profound belief: that business should be a means of worship, serving Allah by serving His creation with utmost integrity, compassion, and excellence.',
    vision: 'To build a global network that embodies the Islamic values of justice, trust, and brotherhood, making every package delivery a testament to the unity and mercy that Islam teaches us.'
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
            About <span className="text-red-500">The Trace Express</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting the world through innovative logistics solutions, one delivery at a time. 
            Discover the story behind our commitment to excellence and global reach.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="relative z-10 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Foundation</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Built on strong principles that guide every decision and every delivery we make.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="bg-gray-100 rounded-xl md:rounded-2xl p-2">
              {['mission', 'vision', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-semibold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'mission' && (
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 animate-fadeIn">
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 md:mb-6">Our Mission</h3>
                <p className="text-base md:text-lg text-gray-600 text-center leading-relaxed">
                  To revolutionize global logistics by providing seamless, secure, and swift delivery solutions 
                  that connect businesses and individuals worldwide. We strive to make distance irrelevant and 
                  delivery expectations reality through innovation, reliability, and exceptional service.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 animate-fadeIn">
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 md:mb-6">Our Vision</h3>
                <p className="text-base md:text-lg text-gray-600 text-center leading-relaxed">
                  To become the world's most trusted and innovative logistics partner, setting new standards 
                  for delivery excellence while fostering sustainable practices. We envision a future where 
                  every package delivered strengthens global connections and drives economic growth across all communities.
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 animate-fadeIn">
                {values.map((value, index) => (
                  <div key={index} className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mb-3 md:mb-4`}>
                      <value.icon className={`w-6 h-6 md:w-8 md:h-8 text-${value.color}-500`} />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{value.title}</h4>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Spiritual Journey</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Guided by divine wisdom and Islamic principles, our path reflects the mercy and guidance of Allah in every step we take.
            </p>
          </div>

          {/* Mobile Timeline (Stack Layout) */}
          <div className="block md:hidden space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 ml-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {/* Mobile Timeline Dot */}
                <div className="absolute left-0 top-4 w-4 h-4 bg-gradient-to-r from-green-500 to-red-500 rounded-full border-2 border-white shadow-lg"></div>
                {/* Mobile Timeline Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-2 top-8 w-0.5 h-8 bg-gradient-to-b from-green-500 to-red-500"></div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Timeline (Alternating Layout) */}
          <div className="hidden md:block relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-red-500 to-blue-500"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Desktop Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-green-500 to-red-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Captain Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Captain</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The visionary leader whose divine inspiration and unwavering faith guide our mission to serve humanity.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Captain Image */}
                <div className="text-center md:text-left">
                  <div className="relative inline-block">
                    <div className="w-64 h-64 mx-auto md:mx-0 rounded-full overflow-hidden shadow-2xl border-4 border-red-500">
                      <img 
                        src={captain.image}
                        alt={captain.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-full blur-xl scale-110"></div>
                  </div>
                </div>

                {/* Captain Info */}
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{captain.name}</h3>
                  <p className="text-xl text-red-500 font-semibold mb-6">{captain.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{captain.description}</p>
                  
                  <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Foundation</h4>
                    <p className="text-gray-700 leading-relaxed italic">"{captain.philosophy}"</p>
                  </div>

                  {/* <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Vision</h4>
                    <p className="text-gray-700 leading-relaxed italic">"{captain.vision}"</p>
                  </div> */}
                </div>
              </div>

              {/* Islamic Values Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Core Islamic Values</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">Amanah (Trust)</h5>
                    <p className="text-gray-600 text-sm">Every package is a sacred trust that we honor with our lives.</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">Ummah (Unity)</h5>
                    <p className="text-gray-600 text-sm">Connecting the global Muslim brotherhood and all humanity.</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">Ihsan (Excellence)</h5>
                    <p className="text-gray-600 text-sm">Striving for perfection as if Allah is watching over us.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Ready to Experience Excellence?</h2>
          <p className="text-lg md:text-xl text-red-100 mb-6 md:mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust The Trace Express with their most important deliveries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
           <a href='/'> <button className="bg-white text-red-500 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base">
              Track Your Package
            </button>
            </a>
            <a href='/contactus'><button className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-white hover:text-red-500 transition-all duration-200 text-sm md:text-base">
              Contact Us Today
            </button>
            </a>
          </div>
        </div>
      </section>

              <Footer />    
    </div>
  );
};

export default AboutUs;