"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, CheckCircle2, MapPin, Clock, RefreshCw, Search, Shield, Package, Download, Share2 } from "lucide-react"
import dynamic from 'next/dynamic'
import Header from '@/components/Header' // Adjust import path as needed
import Footer from '@/components/Footer' // Adjust import path as needed

// Dynamically import Lottie
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-gray-400">Loading tracking animation...</div>
  </div>
})

// Import Lottie animations
import TrackMap from '../../public/animations/TrackMap.json'
import Location from '../../public/animations/location.json'

const steps = [
  {
    key: "picked",
    label: "Picked Up",
    description: "Your shipment has been collected from the sender",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
    time: "09:30 AM",
    date: "Dec 15, 2024"
  },
  {
    key: "processing",
    label: "Processing",
    description: "Package is being sorted at our facility",
    icon: RefreshCw,
    color: "from-purple-500 to-pink-500",
    time: "11:45 AM",
    date: "Dec 15, 2024"
  },
  {
    key: "transit",
    label: "In Transit",
    description: "Shipment is on the way to destination",
    icon: Truck,
    color: "from-amber-500 to-orange-500",
    time: "02:15 PM",
    date: "Dec 15, 2024"
  },
  {
    key: "out",
    label: "Out for Delivery",
    description: "Driver is approaching delivery location",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
    time: "Today, 3:45 PM",
    date: "Dec 16, 2024"
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Package successfully delivered to recipient",
    icon: CheckCircle2,
    color: "from-teal-500 to-green-500",
    time: "Estimated",
    date: "Today, 4:30 PM"
  },
]

export default function ProfessionalTrackingPage() {
  const [trackingId, setTrackingId] = useState("RLX987654321")
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Sorting Facility, Mumbai")
  const [estimatedDelivery, setEstimatedDelivery] = useState("Today, 3:45 PM")
  const [activeAnimation, setActiveAnimation] = useState(0)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null)

  const locations = [
    "Mumbai Sorting Facility",
    "Pune Distribution Center",
    "Nagpur Transit Hub",
    "Hyderabad Warehouse",
    "Bangalore Delivery Center"
  ]

  const deliveryTimes = [
    "Today, 10:30 AM",
    "Today, 12:45 PM",
    "Today, 2:15 PM",
    "Today, 3:45 PM",
    "Delivered"
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false)
            return 100
          }
          return p + 0.5
        })
      }, 100)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  useEffect(() => {
    const interval = Math.floor(100 / steps.length)
    const currentStep = Math.min(steps.length - 1, Math.floor(progress / interval))
    setActiveAnimation(currentStep >= 2 ? 0 : 1)

    const locationIndex = Math.min(locations.length - 1, Math.floor(progress / (100 / locations.length)))
    const deliveryIndex = Math.min(deliveryTimes.length - 1, Math.floor(progress / (100 / deliveryTimes.length)))

    setCurrentLocation(locations[locationIndex])
    setEstimatedDelivery(deliveryTimes[deliveryIndex])
  }, [progress])

  const activeIndex = Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length))

  const resetAnimation = () => {
    setProgress(0)
    setIsPlaying(true)
  }

  const getDriverDistance = () => {
    return Math.max(0, 100 - progress).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2">
      {/* Use existing Header component */}
      <Header />

      <main ref={sectionRef} className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shipment Tracking
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your package in real-time with our advanced GPS technology and live updates
            </p>
          </motion.div>
        </div>

        {/* Main Tracking Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Tracking Info */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Tracking Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Tracking Details</h2>
                    <div className="flex items-center gap-4 text-blue-100">
                      <div className="flex items-center gap-2">
                        <Shield size={18} />
                        <span className="text-sm">Secured Shipment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span className="text-sm">Live Updates</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Tracking ID</p>
                    <p className="text-xl font-mono font-bold">{trackingId}</p>
                  </div>
                </div>
              </div>

              {/* Tracking Input */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your tracking number"
                    />
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={20} />
                    Track Shipment
                  </motion.button>
                </div>
              </div>

              {/* Live Status */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-lg font-semibold text-green-600">Live Tracking Active</span>
                  </div>
                  <button
                    onClick={resetAnimation}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <RefreshCw size={16} />
                    Restart Demo
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Package Picked Up</span>
                    <span>Estimated Delivery: {estimatedDelivery}</span>
                  </div>
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "tween", ease: "linear" }}
                    />
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white"
                        style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Visualization */}
              <div className="p-6">
                <div className="bg-gray-50 rounded-xl p-4 mb-6 h-80 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-xl">
                    <Lottie
                      animationData={activeAnimation === 0 ? TrackMap : Location}
                      loop
                      autoplay={isPlaying}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Location Overlay */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={20} className="text-blue-600" />
                      <span className="font-semibold text-gray-800">Current Location</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{currentLocation}</p>
                    <p className="text-xs text-gray-500">Distance: {getDriverDistance()} km remaining</p>
                  </div>

                  {/* Progress Truck */}
                  <motion.div
                    className="absolute bottom-8"
                    animate={{ left: `${progress}%` }}
                    transition={{ type: "tween", ease: "linear" }}
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <div className="bg-white p-3 rounded-full shadow-2xl border-4 border-blue-500">
                      <Truck size={28} className="text-blue-600" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Shipment Summary */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shipment Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold text-green-600">In Transit</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Est. Delivery</span>
                  <span className="font-semibold text-gray-900">{estimatedDelivery}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Package Weight</span>
                  <span className="font-semibold text-gray-900">15.5 kg</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Service Type</span>
                  <span className="font-semibold text-gray-900">Express</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
                  <Download size={24} className="text-gray-600 group-hover:text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Download Label</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
                  <Share2 size={24} className="text-gray-600 group-hover:text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Share Status</span>
                </button>
              </div>
            </motion.div>

            {/* Tracking Info */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tracking Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">Just now</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Update</span>
                  <span className="font-medium">In 15 minutes</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Updates</span>
                  <span className="font-medium">8 of 12 completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Timeline */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Journey</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                const isActive = index <= activeIndex
                const isCompleted = index < activeIndex

                return (
                  <motion.div
                    key={step.key}
                    className="flex items-start gap-6 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-gradient-to-br ' + step.color 
                        : isActive 
                        ? 'bg-blue-100 border-4 border-blue-500' 
                        : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 size={24} className="text-white" />
                      ) : (
                        <IconComponent size={24} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className={`text-lg font-semibold ${
                          isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </h4>
                        <div className="text-sm text-gray-500">
                          <span>{step.time}</span>
                          <span className="mx-2">•</span>
                          <span>{step.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      {isActive && index === activeIndex && (
                        <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          Current Status
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Demo Note */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Live Tracking Demo</h3>
          <p className="text-blue-700">
            This is a real-time simulation showing how our tracking system works. Actual tracking updates every 15 minutes with live GPS data.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}