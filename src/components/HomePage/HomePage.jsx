'use client'
import React, { useState } from 'react';
import { Search, Globe, Plane, Package, MapPin, Calendar, Truck, CheckCircle, Clock, AlertCircle, FootprintsIcon } from 'lucide-react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const TraceExpress = () => {
  const [trackingType, setTrackingType] = useState('AWB No.');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    
    setIsLoading(true);
    setTrackingResult(null);
    
    try {
      // Map tracking type to API parameter
      const searchByMap = {
        'AWB No.': 'tracking_no',
        'Forwarding No.': 'forwarding_no',
        'Reference No.': 'reference_no'
      };
      
      const searchBy = searchByMap[trackingType] || 'tracking_no';
      const apiUrl = `https://admin.bombinoexp.com/api/External_Api/get_tracking_data?tracking_no=${encodeURIComponent(trackingNumber)}&search_by=${searchBy}`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tracking data');
      }
      
      const data = await response.json();
      
      // Check if tracking data exists
      if (!data.docket_events || !data.docket_events.docket_info) {
        throw new Error('No tracking information found');
      }
      
      const docketInfo = data.docket_events.docket_info;
      const events = data.docket_events.docket_events;
      
      // Convert events to timeline format
      const timeline = Object.entries(events)
        .map(([datetime, event]) => ({
          status: event.event_description,
          date: `${event.event_date} ${event.event_time}`,
          location: event.event_location,
          completed: true,
          state: event.event_state,
          remark: event.event_remark
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort chronologically
      
      // Format the result
      setTrackingResult({
        status: docketInfo.Status,
        trackingNumber: docketInfo.AWBNo,
        type: trackingType,
        consignee: docketInfo.Consignee,
        origin: docketInfo.Origin,
        destination: docketInfo.Destination,
        originCity: docketInfo.origin_city,
        destinationCity: docketInfo.destination_city,
        shipDate: docketInfo.ShipDate,
        receiverName: docketInfo.receiver_name,
        timeline: timeline,
        forwardingUrl: docketInfo.forwardingUrl
      });
      
    } catch (error) {
      console.error('Tracking API Error:', error);
      // Show error state
      setTrackingResult({
        error: true,
        message: error.message || 'Unable to fetch tracking information. Please check your tracking number and try again.',
        trackingNumber: trackingNumber,
        type: trackingType
      });
    } finally {
      setIsLoading(false);
    }
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Transit':
      case 'Out for Delivery':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'Order Confirmed':
        return <Package className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
    <Navbar />
      {/* Background World Map Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-300 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-gray-300 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-gray-300 rounded-full"></div>
        {/* Gradient lines */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-gray-50 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 mt-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left lg:pr-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Track Your <span className="text-red-500">Express</span> Shipments
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience seamless global logistics with real-time tracking, secure delivery, and worldwide coverage. 
                Your packages, our priority.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-2xl font-bold text-red-500">220+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-2xl font-bold text-blue-500">24/7</div>
                  <div className="text-sm text-gray-600">Tracking</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-2xl font-bold text-green-500">99.9%</div>
                  <div className="text-sm text-gray-600">Delivery</div>
                </div>
              </div>

              {/* Tracking Form */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Your Package</h3>
                
                <div className="space-y-3">
                  {/* Dropdown */}
                  <select 
                    value={trackingType}
                    onChange={(e) => setTrackingType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 font-medium backdrop-blur-sm"
                  >
                    <option value="AWB No.">AWB No.</option>
                    <option value="Forwarding No.">Forwarding No.</option>
                    <option value="Reference No.">Reference No.</option>
                  </select>

                  {/* Input Field */}
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 font-medium backdrop-blur-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                  />

                  {/* Track Button */}
                  <button
                    onClick={handleTrack}
                    disabled={isLoading || !trackingNumber.trim()}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Tracking...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Track Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Globe Image */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative">
                {/* Main Globe Image */}
                <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
                  <img 
                    src="/airplane_globe.jpg" 
                    alt="The Trace Express Globe with Airplane"
                    className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
                  />
                  
                  {/* Animated Glow Rings */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-blue-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500/15 to-red-500/15 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-8 rounded-full bg-gradient-to-r from-red-500/10 to-blue-500/10 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
                  <div className="absolute top-1/4 -left-8 w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
                  <div className="absolute bottom-1/4 -right-8 w-5 h-5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2s' }}></div>
                </div>

                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 rounded-full blur-3xl scale-150 -z-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div> */}
      </section>

      {/* Tracking Results */}
      {trackingResult && (
        <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              
              {/* Error State */}
              {trackingResult.error ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Tracking Information Not Found</h3>
                  <p className="text-gray-600 mb-6">{trackingResult.message}</p>
                  <div className="bg-gray-50 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-sm text-gray-500 mb-1">Searched for</p>
                    <p className="font-semibold text-gray-900">{trackingResult.trackingNumber}</p>
                    <p className="text-sm text-gray-500">Type: {trackingResult.type}</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Success State */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">Tracking Results</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        trackingResult.status === 'DELIVERED' ? 'bg-green-500' : 
                        trackingResult.status === 'IN TRANSIT' ? 'bg-blue-500' : 
                        'bg-yellow-500'
                      }`}></div>
                      <span className={`text-lg font-semibold ${
                        trackingResult.status === 'DELIVERED' ? 'text-green-600' : 
                        trackingResult.status === 'IN TRANSIT' ? 'text-blue-600' : 
                        'text-yellow-600'
                      }`}>{trackingResult.status}</span>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">AWB Number</p>
                      <p className="font-semibold text-gray-900">{trackingResult.trackingNumber}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Consignee</p>
                      <p className="font-semibold text-gray-900">{trackingResult.consignee || trackingResult.receiverName}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Origin</p>
                      <p className="font-semibold text-gray-900">{trackingResult.originCity || trackingResult.origin}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Destination</p>
                      <p className="font-semibold text-gray-900">{trackingResult.destinationCity || trackingResult.destination}</p>
                    </div>
                  </div>

                  {/* Ship Date */}
                  {trackingResult.shipDate && (
                    <div className="bg-blue-50 rounded-xl p-4 mb-8">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-blue-600 font-medium">Ship Date: {trackingResult.shipDate}</span>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">Tracking Timeline</h4>
                    {trackingResult.timeline && trackingResult.timeline.length > 0 ? (
                      <div className="space-y-4">
                        {trackingResult.timeline.map((event, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex-shrink-0 mt-1">
                              <div className={`w-3 h-3 rounded-full ${
                                event.state === 'delivered' ? 'bg-green-500' : 
                                event.state === 'redrs' || event.state === 'manifest' ? 'bg-blue-500' : 
                                event.state === 'shipment_hold' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold text-gray-900">{event.status}</p>
                                <p className="text-sm text-gray-500">{event.date}</p>
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <p className="text-gray-600">{event.location}</p>
                              </div>
                              {event.remark && (
                                <p className="text-sm text-gray-500 mt-1 italic">{event.remark}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No tracking events available</p>
                      </div>
                    )}
                  </div>

                  {/* Additional Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => window.print()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                      >
                        Print Details
                      </button>
                      <button 
                        onClick={() => {
                          setTrackingResult(null);
                          setTrackingNumber('');
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                      >
                        Track Another Package
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose The Trace Express?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Delivering excellence across the globe with cutting-edge technology and unmatched reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Coverage</h3>
              <p className="text-gray-600">Worldwide shipping network covering 220+ countries and territories.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600">Live updates and notifications for complete shipment visibility.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Delivery</h3>
              <p className="text-gray-600">Advanced security measures ensuring safe and timely deliveries.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    
    </div>
  );
};

export default TraceExpress;