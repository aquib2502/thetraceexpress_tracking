'use client'
import React, { useState, useEffect } from 'react';
import { Search, Globe, Plane, Package, MapPin, Calendar, Truck, CheckCircle, Clock, AlertCircle, ArrowRight, Star, Shield, Zap, Users, TrendingUp, Sparkles } from 'lucide-react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import axios from 'axios';

const TraceExpress = () => {
  const [trackingType, setTrackingType] = useState('AWB No.');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ countries: 0, tracking: 0, delivery: 0 });
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
    
    // Animate stats with requestAnimationFrame for better performance
    const animateStats = () => {
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedStats({
          countries: Math.round(220 * easeOut),
          tracking: Math.round(24 * easeOut),
          delivery: Math.round(99.9 * easeOut)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    const timer = setTimeout(animateStats, 800);
    return () => clearTimeout(timer);
  }, []);

   const handleTrack = async () => {
  if (!trackingNumber.trim()) return;

  setIsLoading(true);
  setTrackingResult(null);

  try {
    const trimmedTrackingNumber = trackingNumber.trim().toUpperCase();

    // If tracking number starts with "TTE", use internal tracking API
    if (trimmedTrackingNumber.startsWith("TTE")) {
      const apiUrl = "http://localhost:5000/api/tracking/getTracking";

      const response = await axios.post(apiUrl, {
        orderId: trimmedTrackingNumber,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000, // 15 seconds timeout for safety
      });

      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Tracking failed from internal API");
      }

      const trackingData = result.tracking?.[0];
      if (!trackingData) {
        throw new Error("No tracking information found for this order.");
      }

      const details = trackingData.trackDetails?.[0] || {};
      const events = trackingData.Event || [];

      // Map and sort events
      const timeline = events
        .map((e) => ({
          status: e.EventDescription || "Event",
          date: `${e.EventDate || ""} ${e.EventTime || ""}`.trim(),
          location: e.Location || "N/A",
          completed: true,
          state: e.EventCode?.toLowerCase() || "unknown",
          remark: e.Remark || "",
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Format consistent tracking result
      setTrackingResult({
        status: details.Status || "IN TRANSIT",
        trackingNumber: details.Awbno || trimmedTrackingNumber,
        type: trackingType,
        consignee: details.Consignee || "N/A",
        origin: details.Sector || "N/A",
        destination: details.Destination || "N/A",
        originCity: details.Sector || "N/A",
        destinationCity: details.Destination || "N/A",
        shipDate: details.Shipdate || "N/A",
        receiverName: details.ReceiverName || details.Consignee || "N/A",
        timeline,
        forwardingUrl: null,
      });

    } else {
      // 🔹 External Bombino API
      const searchByMap = {
        "AWB No.": "tracking_no",
        "Forwarding No.": "forwarding_no",
        "Reference No.": "reference_no",
      };

      const searchBy = searchByMap[trackingType] || "tracking_no";
      const apiUrl = `https://admin.bombinoexp.com/api/External_Api/get_tracking_data?tracking_no=${encodeURIComponent(trimmedTrackingNumber)}&search_by=${searchBy}`;

      const response = await axios.get(apiUrl, { timeout: 15000 });

      const data = response.data;

      if (!data?.docket_events?.docket_info) {
        throw new Error("No tracking information found for this number.");
      }

      const docketInfo = data.docket_events.docket_info;
      const events = data.docket_events.docket_events || {};

      const timeline = Object.entries(events)
        .map(([_, event]) => ({
          status: event.event_description,
          date: `${event.event_date} ${event.event_time}`,
          location: event.event_location,
          completed: true,
          state: event.event_state,
          remark: event.event_remark,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setTrackingResult({
        status: docketInfo.Status || "IN TRANSIT",
        trackingNumber: docketInfo.AWBNo || trimmedTrackingNumber,
        type: trackingType,
        consignee: docketInfo.Consignee || "N/A",
        origin: docketInfo.Origin || "N/A",
        destination: docketInfo.Destination || "N/A",
        originCity: docketInfo.origin_city || docketInfo.Origin || "N/A",
        destinationCity:
          docketInfo.destination_city || docketInfo.Destination || "N/A",
        shipDate: docketInfo.ShipDate || "N/A",
        receiverName: docketInfo.receiver_name || "N/A",
        timeline,
        forwardingUrl: docketInfo.forwardingUrl || null,
      });
    }
  } catch (error) {
    console.error("Tracking API Error:", error);

    let message = "Unable to fetch tracking information.";
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        message = "Request timed out. Please try again later.";
      } else if (error.response) {
        message =
          error.response.data?.message ||
          `Server error (${error.response.status})`;
      } else if (error.request) {
        message = "Network error — no response received from the server.";
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    setTrackingResult({
      error: true,
      message,
      trackingNumber: trackingNumber,
      type: trackingType,
    });
  } finally {
    setIsLoading(false);
  }
};


  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'In Transit':
      case 'Out for Delivery':
        return <Truck className="w-5 h-5 text-cyan-400" />;
      case 'Order Confirmed':
        return <Package className="w-5 h-5 text-purple-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl opacity-70 animate-float-slow"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl opacity-60 animate-float-slower"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl opacity-50 animate-float-slowest"></div>
        
        {/* Twinkling particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-twinkle"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-twinkle-delayed"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-80 animate-twinkle-slow"></div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className={`space-y-8 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-500/20 rounded-full px-4 py-2 text-cyan-300 text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Trusted by 10M+ customers worldwide</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Track Your{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    Express
                  </span>{' '}
                  <br className="hidden sm:block" />
                  Shipments
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg">
                  Experience seamless global logistics with real-time tracking, secure delivery, and worldwide coverage. 
                  Your packages, our priority.
                </p>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {[
                  { value: `${animatedStats.countries}+`, label: 'Countries', icon: Globe, color: 'from-cyan-400 to-blue-500' },
                  { value: `${animatedStats.tracking}/7`, label: 'Tracking', icon: Clock, color: 'from-purple-400 to-pink-500' },
                  { value: `${animatedStats.delivery}%`, label: 'Delivery', icon: CheckCircle, color: 'from-emerald-400 to-cyan-500' }
                ].map((stat, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white/70" />
                      </div>
                      <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-slate-400 font-medium mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Tracking Form */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8 hover:bg-white/15 transition-all duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Track Your Package</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Enhanced Dropdown */}
                  <div className="relative">
                    <select 
                      value={trackingType}
                      onChange={(e) => setTrackingType(e.target.value)}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition-all duration-300 text-white font-semibold cursor-pointer hover:bg-white/15"
                    >
                      <option value="AWB No." className="bg-slate-800 text-white">AWB Number</option>
                      <option value="Forwarding No." className="bg-slate-800 text-white">Forwarding Number</option>
                      <option value="Reference No." className="bg-slate-800 text-white">Reference Number</option>
                    </select>
                  </div>

                  {/* Enhanced Input Field */}
                  <div className="relative">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter your tracking number"
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition-all duration-300 text-white font-semibold placeholder-slate-400 hover:bg-white/15"
                      onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                    />
                  </div>

                  {/* Enhanced Track Button */}
                  <button
                    onClick={handleTrack}
                    disabled={isLoading || !trackingNumber.trim()}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="text-lg">Tracking...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-lg">Track Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Globe Image */}
            <div className={`hidden lg:flex relative items-center justify-center transition-all duration-1000 ease-out delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="relative">
                <div className="relative w-[500px] h-[500px] group">
                  <img 
                    src="/airplane_globe.jpg" 
                    alt="The Trace Express Globe with Airplane"
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Enhanced Glow Rings */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-pulse-slow"></div>
                    <div className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 animate-pulse-slower"></div>
                  </div>

                {/* Floating Elements */}
<div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center animate-float">
  <Package className="w-8 h-8 text-white" />
</div>
<div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full shadow-lg flex items-center justify-center animate-float-delayed">
  <Truck className="w-6 h-6 text-white" />
</div>
<div className="absolute top-1/4 -left-10 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg flex items-center justify-center animate-float-slow">
  <Star className="w-6 h-6 text-white" />
</div>
<div className="absolute bottom-1/4 -right-10 w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full shadow-lg flex items-center justify-center animate-float-slower">
  <Globe className="w-6 h-6 text-white" />
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tracking Results */}
      {trackingResult && (
  <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 fade-in-up">
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/40 shadow-2xl overflow-hidden">

        {/* Error State */}
        {trackingResult.error ? (
          <div className="text-center py-16 px-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-3xl font-bold text-slate-100 mb-4">
              Tracking Information Not Found
            </h3>
            <p className="text-slate-400 mb-8 text-lg">{trackingResult.message}</p>
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-slate-700/40">
              <p className="text-sm text-slate-400 mb-2">Searched for</p>
              <p className="font-bold text-slate-100 text-lg">{trackingResult.trackingNumber}</p>
              <p className="text-sm text-slate-400 mt-1">Type: {trackingResult.type}</p>
            </div>
          </div>
        ) : (
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-10 pb-8 border-b border-slate-700/50">
              <h3 className="text-3xl font-bold text-slate-100">Tracking Results</h3>
              <div className="px-5 py-2 rounded-full text-sm font-semibold shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase tracking-wide">
                {trackingResult.status}
              </div>
            </div>

            {/* Package Info */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'AWB Number', value: trackingResult.trackingNumber, icon: Package, color: 'cyan' },
                { label: 'Consignee', value: trackingResult.consignee || trackingResult.receiverName, icon: Users, color: 'blue' },
                { label: 'Origin', value: trackingResult.originCity || trackingResult.origin, icon: MapPin, color: 'emerald' },
                { label: 'Destination', value: trackingResult.destinationCity || trackingResult.destination, icon: MapPin, color: 'purple' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-700/40  hover:bg-slate-800/90 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 bg-${item.color}-500/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-${item.color}-500/30`}>
                      <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                    </div>
                    <p className="text-sm text-slate-400 font-semibold">{item.label}</p>
                  </div>
                  <p className="font-bold text-slate-100 text-lg group-hover:text-white transition-colors duration-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Ship Date */}
            {trackingResult.shipDate && (
              <div className="bg-gradient-to-r from-blue-900/60 to-purple-900/60 backdrop-blur-md rounded-2xl p-6 mb-10 border border-blue-700/40 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-700/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-blue-500/30">
                    <Calendar className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-300 font-semibold">Ship Date</p>
                    <p className="text-lg font-bold text-slate-100">{trackingResult.shipDate}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 backdrop-blur-md rounded-xl flex items-center justify-center border border-slate-600/40">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-slate-100">Tracking Timeline</h4>
              </div>

              {trackingResult.timeline && trackingResult.timeline.length > 0 ? (
                <div className="space-y-4">
                  {trackingResult.timeline.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-6 p-6 bg-slate-800/60 backdrop-blur-md rounded-2xl  hover:bg-slate-800/90 transition-all duration-300 group border border-slate-700/40 shadow-md">
                      <div className="flex-shrink-0 mt-2">
                        <div
                          className={`w-4 h-4 rounded-full shadow-md animate-pulse ${
                            event.state === 'delivered'
                              ? 'bg-emerald-500 shadow-emerald-500/50'
                              : event.state === 'redrs' || event.state === 'manifest'
                              ? 'bg-cyan-500 shadow-cyan-500/50'
                              : event.state === 'shipment_hold'
                              ? 'bg-red-500 shadow-red-500/50'
                              : 'bg-purple-500 shadow-purple-500/50'
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <p className="text-lg font-semibold text-slate-100 group-hover:text-white transition-colors duration-200">
                            {event.status}
                          </p>
                          <p className="text-sm text-slate-300 bg-slate-700/60 px-3 py-1 rounded-lg font-medium">
                            {event.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <p className="text-slate-300 font-medium">{event.location}</p>
                        </div>
                        {event.remark && (
                          <p className="text-sm text-slate-200 bg-slate-800/80 border border-slate-700 rounded-lg p-3 mt-2">
                            {event.remark}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-800/60 rounded-2xl border border-slate-700/40">
                  <Clock className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                  <p className="text-slate-200 text-lg font-medium">No tracking events available</p>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setTrackingResult(null);
                    setTrackingNumber('');
                  }}
                  className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900  text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Track Another Package</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
)}

      {/* Enhanced Features Section */}
      <section className={`relative z-10 py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-md border border-cyan-500/20 rounded-full px-6 py-3 text-cyan-300 text-sm font-bold mb-6">
              <Zap className="w-4 h-4" />
              <span>Why Choose Trace Express?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Delivering Excellence <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Worldwide</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience cutting-edge technology and unmatched reliability with our global shipping network that connects businesses and individuals across the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Coverage",
                description: "Worldwide shipping network covering 220+ countries and territories with local expertise.",
                color: "cyan"
              },
              {
                icon: Clock,
                title: "Real-Time Tracking",
                description: "Advanced tracking technology with live updates and instant notifications for complete visibility.",
                color: "blue"
              },
              {
                icon: Shield,
                title: "Secure Delivery",
                description: "Military-grade security measures and insurance options ensuring safe and timely deliveries.",
                color: "emerald"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 group hover:transform hover:scale-105"
              >
                <div className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-${feature.color}-500/30`}>
                  <feature.icon className={`w-10 h-10 text-${feature.color}-400`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-slate-200 transition-colors duration-200">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Stats Section */}
          <div className="mt-20 bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur-xl rounded-3xl p-12 text-white relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Millions</h3>
                <p className="text-slate-300 text-lg">Join thousands of businesses who trust us with their most important deliveries</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "10M+", label: "Packages Delivered", icon: Package },
                  { number: "50K+", label: "Happy Customers", icon: Users },
                  { number: "99.8%", label: "On-Time Delivery", icon: CheckCircle },
                  { number: "24/7", label: "Customer Support", icon: Clock }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300 border border-white/20">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{stat.number}</div>
                    <div className="text-slate-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
     {/* <Footer /> */}

      {/* Custom CSS for animations and styles */}
      <style jsx>{`
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
          }
          33% { 
            transform: translateY(-20px) translateX(10px);
          }
          66% { 
            transform: translateY(10px) translateX(-5px);
          }
        }
        
        @keyframes float-slower {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
          }
          50% { 
            transform: translateY(-15px) translateX(-10px);
          }
        }
        
        @keyframes float-slowest {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
          }
          25% { 
            transform: translateY(15px) translateX(5px);
          }
          75% { 
            transform: translateY(-10px) translateX(-15px);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        
        .animate-float-slowest {
          animation: float-slowest 12s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-twinkle-delayed {
          animation: twinkle-delayed 2.5s ease-in-out infinite 0.5s;
        }
        
        .animate-twinkle-slow {
          animation: twinkle-slow 3s ease-in-out infinite 1s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite 1s;
        }
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #2563eb);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Focus states for accessibility */
        button:focus-visible,
        input:focus-visible,
        select:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
        /* Backdrop blur support */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        /* Enhanced mobile responsiveness */
        @media (max-width: 768px) {
          .animate-float-slow,
          .animate-float-slower,
          .animate-float-slowest {
            animation-duration: 6s;
          }
        }
      `}</style>
    </>
  );
};

export default TraceExpress;