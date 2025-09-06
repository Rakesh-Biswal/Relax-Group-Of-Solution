"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, CheckCircle2, MapPin, Clock, RefreshCw, Search, Shield, Package, Download, Share2 } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamically import Lottie
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-gray-400">Loading tracking animation...</div>
  </div>
})

// Import Lottie animations
import TrackMap from '../public/animations/TrackMap.json'
import Location from '../public/animations/location.json'

const steps = [
  {
    key: "picked",
    label: "Picked Up",
    description: "Your shipment has been collected from the sender",
    icon: Package,
    color: "from-blue-500 to-cyan-500"
  },
  {
    key: "processing",
    label: "Processing",
    description: "Package is being sorted at our facility",
    icon: RefreshCw,
    color: "from-purple-500 to-pink-500"
  },
  {
    key: "transit",
    label: "In Transit",
    description: "Shipment is on the way to destination",
    icon: Truck,
    color: "from-amber-500 to-orange-500"
  },
  {
    key: "out",
    label: "Out for Delivery",
    description: "Driver is approaching delivery location",
    icon: MapPin,
    color: "from-green-500 to-emerald-500"
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Package successfully delivered to recipient",
    icon: CheckCircle2,
    color: "from-teal-500 to-green-500"
  },
]

export default function TrackingShowcase() {
  const [trackingId, setTrackingId] = useState("RLX987654321")
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Sorting Facility, Mumbai")
  const [estimatedDelivery, setEstimatedDelivery] = useState("Today, 3:45 PM")
  const [activeAnimation, setActiveAnimation] = useState(0)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null) // 👀 track section visibility


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
          setIsPlaying(true) // start animation
          observer.disconnect() // only once
        }
      },
      { threshold: 0.3 } // 30% visible
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
    setActiveAnimation(currentStep >= 2 ? 0 : 1) // Show map during transit, location otherwise

    // Update location and ETA based on progress
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
    <section ref={sectionRef} className="container section mt-20 md:mt-28 lg:mt-36">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-full mb-4">
          <MapPin size={18} className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Live Shipment Tracking</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Real-Time Tracking
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Track your package in real-time with our advanced GPS technology and live updates
        </p>
      </motion.div>

      {/* Main Tracking Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Tracking Input Section */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Tracking ID"
                placeholder="Enter tracking number"
              />
            </div>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw size={20} />
              Track Shipment
            </motion.button>
          </div>
        </div>

        {/* Tracking Visualization */}
        <div className="p-6 md:p-8">
          {/* Live Status Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-600">Live Tracking</span>
            </div>
            <div className="flex items-center gap-4">

              <button
                onClick={resetAnimation}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                <RefreshCw size={14} />
                Restart Demo
              </button>
            </div>
          </div>

          {/* Animated Map Visualization */}
          <div className="relative bg-gray-50 rounded-xl p-4 mb-8 h-64 md:h-80">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <Lottie
                animationData={activeAnimation === 0 ? TrackMap : Location}
                loop
                autoplay={isPlaying} // 👈 plays only when section visible
                className="w-full h-full"
              />

            </div>

            {/* Overlay Information */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={20} className="text-blue-600" />
                <span className="font-semibold text-gray-800">Driver Location</span>
              </div>
              <p className="text-sm text-gray-600">{currentLocation}</p>
              <p className="text-xs text-gray-500 mt-1">{getDriverDistance()} km to destination</p>
            </div>

            {/* Progress Truck */}
            <motion.div
              className="absolute bottom-6"
              animate={{ left: `${progress}%` }}
              transition={{ type: "tween", ease: "linear" }}
              style={{ transform: 'translateX(-50%)' }}
            >
              <div className="bg-white p-2 rounded-full shadow-2xl border-2 border-blue-500">
                <Truck size={24} className="text-blue-600" />
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear" }}
              />

              {/* Milestone Markers */}
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-white"
                  style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {steps.map((step, i) => {
              const IconComponent = step.icon
              const isActive = i <= activeIndex
              const isCompleted = i < activeIndex

              return (
                <motion.div
                  key={step.key}
                  className="flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-300"
                  animate={{
                    borderColor: isActive ? step.color.split(' ')[0].replace('from-', '') : 'transparent',
                    backgroundColor: isActive ? `${step.color.split(' ')[0].replace('from-', '')}10` : 'transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isCompleted ? 'bg-gradient-to-br ' + step.color : 'bg-gray-200'
                    }`}>
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="text-white" />
                    ) : (
                      <IconComponent size={24} className={isActive ? 'text-gray-700' : 'text-gray-400'} />
                    )}
                  </div>

                  <h4 className={`font-semibold text-sm mb-1 ${isActive ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                    {step.label}
                  </h4>

                  <p className="text-xs text-gray-500 leading-tight">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

      </motion.div>

      {/* Footer Note */}
      <motion.p
        className="text-center text-gray-600 mt-6 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span className="font-semibold text-blue-600">Live demo</span> showing real-time tracking simulation.
        Actual tracking updates every 15 minutes in production.
      </motion.p>

      {/* Background Elements */}
      <div className="absolute left-0 right-0 -z-10 opacity-5">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-32 h-32 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}