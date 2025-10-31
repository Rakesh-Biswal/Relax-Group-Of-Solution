"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, MapPin, Calculator, ArrowRight, Sparkles, Shield, Clock, Star, Check, Navigation, Fuel, Users, ArrowLeft, RotateCcw } from "lucide-react"
import Header from '@/components/Header' // Adjust import path as needed
import Footer from '@/components/Footer' // Adjust import path as needed

// Vehicle data with pricing per 100km
const vehicleData = [
    {
        size: "12 ft",
        capacity: "1-2 BHK",
        pricePer100km: 10000,
        description: "Perfect for small apartments",
        features: ["1-2 BHK Homes", "Small Office", "Basic Furniture"],
        icon: "🚐"
    },
    {
        size: "18 ft",
        capacity: "2-3 BHK",
        pricePer100km: 15000,
        description: "Ideal for medium families",
        features: ["2-3 BHK Homes", "Medium Office", "Complete Furniture"],
        icon: "🚚"
    },
    {
        size: "22 ft",
        capacity: "3-4 BHK",
        pricePer100km: 19000,
        description: "Great for large families",
        features: ["3-4 BHK Homes", "Large Office", "All Household Items"],
        icon: "🚛"
    },
    {
        size: "32 ft",
        capacity: "Villa/Office",
        pricePer100km: 25000,
        description: "Best for villas & offices",
        features: ["Villas", "Corporate Offices", "Complete Relocation"],
        icon: "🚛🔰"
    }
]

export default function PricingCalculator() {
    const [selectedVehicle, setSelectedVehicle] = useState(vehicleData[0])
    const [distance, setDistance] = useState("")
    const [fromLocation, setFromLocation] = useState("")
    const [toLocation, setToLocation] = useState("")
    const [isCalculating, setIsCalculating] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [calculatedPrice, setCalculatedPrice] = useState(0)
    const [routeAnimation, setRouteAnimation] = useState(false)

    const calculatePrice = () => {
        const km = parseInt(distance) || 0
        const pricePerKm = selectedVehicle.pricePer100km / 100
        return Math.round(pricePerKm * km)
    }

    const handleCalculate = (e) => {
        e.preventDefault()
        if (!distance) return

        setIsCalculating(true)
        setShowResult(false)
        setRouteAnimation(true)

        // Simulate calculation and API call
        setTimeout(() => {
            const price = calculatePrice()
            setCalculatedPrice(price)
            setIsCalculating(false)
            setShowResult(true)
            setRouteAnimation(false)
        }, 2000)
    }

    const handleReset = () => {
        setShowResult(false)
        setDistance("")
        setFromLocation("")
        setToLocation("")
        setCalculatedPrice(0)
    }

    const formatIndianRupees = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
            {/* Header Component */}
            <Header />

            {/* Main Content */}
            <section className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    

                    {/* Calculator Form */}
                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div
                                key="form"
                                className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                        <Calculator className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Calculate Ur Budget</h2>
                                        <p className="text-gray-600">Powered By Relax Group</p>
                                    </div>
                                </div>

                                <form onSubmit={handleCalculate} className="space-y-6">
                                    {/* Vehicle Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            <Truck size={16} className="inline mr-2" />
                                            Select Vehicle Size
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {vehicleData.map((vehicle) => (
                                                <motion.button
                                                    key={vehicle.size}
                                                    type="button"
                                                    onClick={() => setSelectedVehicle(vehicle)}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${selectedVehicle.size === vehicle.size
                                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                                        }`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-2xl">{vehicle.icon}</span>
                                                        <Check
                                                            size={16}
                                                            className={`text-blue-500 transition-all ${selectedVehicle.size === vehicle.size ? 'opacity-100' : 'opacity-0'
                                                                }`}
                                                        />
                                                    </div>
                                                    <div className="font-bold text-gray-800">{vehicle.size}</div>
                                                    <div className="text-sm text-gray-600">{vehicle.capacity}</div>
                                                    <div className="text-xs text-blue-600 font-semibold mt-1">
                                                        {formatIndianRupees(vehicle.pricePer100km)} / 100km
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Distance Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Navigation size={16} className="inline mr-2" />
                                            Enter Distance (KM)
                                        </label>
                                        <input
                                            type="number"
                                            value={distance}
                                            onChange={(e) => setDistance(e.target.value)}
                                            placeholder="Enter distance in kilometers"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                            min="1"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            💡 Minimum 1km required for calculation
                                        </p>
                                    </div>

                                    {/* Location Inputs */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <MapPin size={16} className="inline mr-2" />
                                                Moving From (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={fromLocation}
                                                onChange={(e) => setFromLocation(e.target.value)}
                                                placeholder="Current location"
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <MapPin size={16} className="inline mr-2" />
                                                Moving To (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={toLocation}
                                                onChange={(e) => setToLocation(e.target.value)}
                                                placeholder="Destination"
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Calculate Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={!distance || isCalculating}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isCalculating ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Calculating Your Budget...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-3">
                                                <Sparkles size={20} />
                                                Get Accurate Budget
                                            </div>
                                        )}
                                    </motion.button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Result Header */}
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="text-white" size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Moving Budget</h2>
                                    <p className="text-gray-600">All-inclusive pricing with complete service package</p>
                                </div>

                                {/* Route Visualization */}
                                {(fromLocation || toLocation) && (
                                    <motion.div
                                        className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="text-center flex-1">
                                            <div className="text-sm text-gray-600 mb-2">From</div>
                                            <div className="font-semibold text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
                                                {fromLocation || "Not specified"}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center mx-4">
                                            <motion.div
                                                animate={{ x: [0, 10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <ArrowRight size={24} className="text-blue-500" />
                                            </motion.div>
                                        </div>

                                        <div className="text-center flex-1">
                                            <div className="text-sm text-gray-600 mb-2">To</div>
                                            <div className="font-semibold text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
                                                {toLocation || "Not specified"}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Price Display */}
                                <div className="text-center mb-8">
                                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                        {formatIndianRupees(calculatedPrice)}
                                    </div>
                                    <p className="text-gray-600 text-lg">Total Estimated Cost</p>
                                </div>

                                {/* Vehicle Info */}
                                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-3xl">{selectedVehicle.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg">{selectedVehicle.size} Vehicle</h4>
                                            <p className="text-gray-600">{selectedVehicle.capacity} • {selectedVehicle.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-800">Distance</div>
                                            <div className="text-blue-600 font-bold">{distance} KM</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-800">Rate</div>
                                            <div className="text-green-600 font-bold">{formatIndianRupees(selectedVehicle.pricePer100km)} / 100km</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Inclusions */}
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                                    <h4 className="font-bold text-green-800 text-lg mb-4 flex items-center gap-2">
                                        <Check size={20} className="text-green-600" />
                                        Complete Service Package Included
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Check size={16} className="text-green-500" />
                                            <span>Professional Packing</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check size={16} className="text-green-500" />
                                            <span>Loading & Unloading</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check size={16} className="text-green-500" />
                                            <span>Transportation</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check size={16} className="text-green-500" />
                                            <span>Basic Insurance</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check size={16} className="text-green-500" />
                                            <span>Furniture Disassembly</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check size={16} className="text-green-500" />
                                            <span>Reassembly Service</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Important Notes */}
                                {parseInt(distance) < 100 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
                                        <div className="flex items-start gap-3">
                                            <Shield size={20} className="text-yellow-600 mt-0.5" />
                                            <div>
                                                <h5 className="font-semibold text-yellow-800 mb-2">Important Notice</h5>
                                                <p className="text-yellow-700 text-sm">
                                                    For distances under 100km, we recommend contacting our HR manager for exact pricing.
                                                    The shown amount is an estimate and may vary based on specific requirements and location accessibility.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <motion.button
                                        onClick={handleReset}
                                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-300"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <RotateCcw size={20} />
                                        Reset
                                    </motion.button>
                                    <motion.button
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div
                                            onClick={() => {
                                                const phone = "919777012315"; // Relax Packers & Movers WhatsApp number (with country code)
                                                const message = encodeURIComponent(
                                                    "Hello Relax Packers & Movers ,\nI'm interested in your shifting/relocation service. Please share the quotation and process details."
                                                );
                                                window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                                            }}
                                            className="flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <Truck size={20} />
                                            Book Now
                                        </div>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Route Animation Overlay */}
                    <AnimatePresence>
                        {routeAnimation && (
                            <motion.div
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 max-w-md w-full mx-4"
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: -20 }}
                                >
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Truck className="text-white" size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Calculating Your Route</h3>
                                        <p className="text-gray-600 mb-6">Analyzing the best moving solution for you...</p>

                                        {/* Animated Route */}
                                        <div className="relative h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
                                            <motion.div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2, ease: "easeInOut" }}
                                            />
                                        </div>

                                        {/* Moving Truck Animation */}
                                        <motion.div
                                            className="flex items-center justify-center gap-4 text-2xl"
                                            initial={{ x: -100 }}
                                            animate={{ x: 100 }}
                                            transition={{
                                                duration: 2,
                                                ease: "easeInOut",
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                        >
                                            {fromLocation && (
                                                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                    {fromLocation}
                                                </span>
                                            )}
                                            <span>🚛</span>
                                            <ArrowRight size={20} className="text-gray-400" />
                                            {toLocation && (
                                                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                                    {toLocation}
                                                </span>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Footer Component */}
            <Footer />

        </div>
    )
}