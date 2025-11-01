"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Phone, Clock, Truck, ChevronRight, Play, Pause, Star, ExternalLink, X, ChevronLeft } from "lucide-react"
import Image from "next/image"

const branches = [
  {
    id: 1,
    name: "Bhubaneswar Main Office",
    address: "Tulsipur, Bijiupatnaik Chhak, Cuttack, Odisha, 753008",
    coordinates: { x: 30, y: 50 },
    phone: "+91 9777012315",
    hours: "24/7",
    services: ["Full Service", "Storage", "Vehicle Transport"],
    established: "2010",
    rating: 4.9,
    reviews: 1247,
    image: "/images/bhubaneswar-office.jpg"
  },
  {
    id: 2,
    name: "Baragarh Branch",
    address: "Sai Mandir, Tankapani Rd, Laxmi Vihar, Baragarh, Bhubaneswar",
    coordinates: { x: 40, y: 35 },
    phone: "+91 9777012316",
    hours: "6 AM - 10 PM",
    services: ["Packing", "Local Moving"],
    established: "2012",
    rating: 4.8,
    reviews: 892,
    image: "/images/baragarh-branch.jpg"
  },
  {
    id: 3,
    name: "Dhenkanal Office",
    address: "Main Road, Dhenkanal, Odisha",
    coordinates: { x: 60, y: 45 },
    phone: "+91 9777012317",
    hours: "7 AM - 9 PM",
    services: ["House Shifting", "Office Moving"],
    established: "2014",
    rating: 4.7,
    reviews: 567,
    image: "/images/dhenkanal-office.jpg"
  },
  {
    id: 4,
    name: "Angul Branch",
    address: "Sital Vihar, Angul, Odisha",
    coordinates: { x: 70, y: 40 },
    phone: "+91 9777012318",
    hours: "6 AM - 10 PM",
    services: ["Industrial Moving", "Packing"],
    established: "2015",
    rating: 4.8,
    reviews: 423,
    image: "/images/angul-branch.jpg"
  },
  {
    id: 5,
    name: "Balasore Office",
    address: "Matha Sai, Balasore, Odisha",
    coordinates: { x: 45, y: 70 },
    phone: "+91 9777012319",
    hours: "24/7",
    services: ["Full Service", "International"],
    established: "2016",
    rating: 4.9,
    reviews: 678,
    image: "/images/balasore-office.jpg"
  },
  {
    id: 6,
    name: "Balangir Branch",
    address: "Brahmanipali, Balangir, Odisha",
    coordinates: { x: 35, y: 25 },
    phone: "+91 9777012320",
    hours: "7 AM - 9 PM",
    services: ["Local Moving", "Storage"],
    established: "2017",
    rating: 4.6,
    reviews: 334,
    image: "/images/balangir-branch.jpg"
  },
  {
    id: 7,
    name: "Koraput Office",
    address: "Similiguda, Koraput, Odisha",
    coordinates: { x: 80, y: 65 },
    phone: "+91 9777012321",
    hours: "6 AM - 10 PM",
    services: ["House Shifting", "Vehicle Transport"],
    established: "2018",
    rating: 4.7,
    reviews: 289,
    image: "/images/koraput-office.jpg"
  }
]

export default function BranchExplorer() {
  const [currentBranch, setCurrentBranch] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [viewMode, setViewMode] = useState("list") // "list" or "detail"
  const intervalRef = useRef(null)

  const startTour = () => {
    setIsPlaying(true)
    setCurrentBranch(0)
    setViewMode("detail")
  }

  const stopTour = () => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentBranch((prev) => {
          const next = prev + 1
          if (next >= branches.length) {
            stopTour()
            return 0
          }
          return next
        })
      }, 4000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  const handleBranchClick = (branch, index) => {
    setCurrentBranch(index)
    setSelectedBranch(branch)
    setViewMode("detail")
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedBranch(null)
    stopTour()
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ))
  }

  // Mobile View - Branch List
  const MobileBranchList = () => (
    <div className="lg:hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h3 className="text-xl font-bold mb-2">Our Branches</h3>
        <p className="text-blue-100 text-sm">7 locations serving across Odisha</p>
      </div>

      <div className="space-y-4 p-4 max-h-[500px] overflow-y-auto">
        {branches.map((branch, index) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => handleBranchClick(branch, index)}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-white text-center">
                  <div className="text-lg font-bold">R</div>
                  <div className="text-xs">Branch</div>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-800 text-lg leading-tight">{branch.name}</h4>
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    <Star size={12} className="fill-green-600" />
                    {branch.rating}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                  <MapPin size={14} />
                  <span className="truncate">{branch.address.split(',')[0]}</span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {branch.hours}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={12} />
                    {branch.phone}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {branch.services.slice(0, 2).map((service) => (
                    <span key={service} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                      {service}
                    </span>
                  ))}
                  {branch.services.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{branch.services.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Auto Tour Button for Mobile */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          onClick={startTour}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={20} />
          Start Auto Tour
        </motion.button>
      </div>
    </div>
  )

  // Mobile View - Branch Detail
  const MobileBranchDetail = () => {
    const branch = selectedBranch || branches[currentBranch]
    
    return (
      <div className="lg:hidden h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={handleBackToList}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h3 className="text-xl font-bold">Branch Details</h3>
              <p className="text-blue-100 text-sm">Explore this location</p>
            </div>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Auto Tour Active</span>
              <button 
                onClick={stopTour}
                className="ml-auto bg-white/30 hover:bg-white/40 px-2 py-1 rounded text-xs font-medium transition-colors"
              >
                Stop
              </button>
            </div>
          )}
        </div>

        {/* Branch Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Branch Image/Header */}
          <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold mb-1">{branch.name}</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(branch.rating)}
                </div>
                <span className="text-sm">({branch.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Branch Info */}
          <div className="p-4 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <Phone size={20} className="text-blue-600 mx-auto mb-2" />
                <a href={`tel:${branch.phone}`} className="text-blue-600 font-semibold text-sm block">
                  Call Now
                </a>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <Clock size={20} className="text-green-600 mx-auto mb-2" />
                <span className="text-green-600 font-semibold text-sm">{branch.hours}</span>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-red-500" />
                Address
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">{branch.address}</p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Services Offered</h4>
              <div className="flex flex-wrap gap-2">
                {branch.services.map((service, index) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Established */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm">Serving since</p>
              <p className="text-2xl font-bold text-gray-800">{branch.established}</p>
            </div>

            {/* Navigation */}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const prev = currentBranch > 0 ? currentBranch - 1 : branches.length - 1
                  setCurrentBranch(prev)
                  setSelectedBranch(branches[prev])
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => {
                  const next = currentBranch < branches.length - 1 ? currentBranch + 1 : 0
                  setCurrentBranch(next)
                  setSelectedBranch(branches[next])
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop View - Map with Sidebar (existing code)
  const DesktopView = () => (
    <div className="hidden lg:flex flex-col lg:flex-row h-[600px]">
      {/* Map Container - 2/3 on desktop */}
      <div className="lg:w-2/3 w-full relative bg-gray-100 border-r border-gray-200">
        {/* ... existing desktop map code ... */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold">Interactive Map View</p>
            <p className="text-sm">Available on desktop for better experience</p>
          </div>
        </div>
      </div>

      {/* Business Details Panel */}
      <div className="lg:w-1/3 w-full bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6">
          {/* ... existing desktop details code ... */}
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/images/relax-nav-logo.png" 
                width={32} 
                height={32} 
                alt="Relax Packers & Movers"
                className="rounded"
              />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">Desktop Map View</h4>
            <p className="text-gray-600 text-sm">Switch to desktop for interactive map experience</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Image 
                src="/images/relax-nav-logo.png" 
                width={32} 
                height={32} 
                alt="Relax Packers & Movers"
                className="rounded"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Our Branches Network</h3>
              <p className="text-sm text-gray-600">7 locations across Odisha</p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={isPlaying ? stopTour : startTour}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Stop Tour' : 'Auto Tour'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[600px]">
        {/* Mobile View */}
        <div className="lg:hidden h-full">
          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <MobileBranchList />
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <MobileBranchDetail />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block h-full">
          <DesktopView />
        </div>
      </div>
    </div>
  )
}