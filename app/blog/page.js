"use client"
import React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, MapPin, Calendar, Clock, Truck, Package, Home, Shield, Users, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const operationStages = [
    {
        id: "packing",
        name: "Professional Packing",
        icon: Package,
        description: "Careful wrapping and securing of your belongings",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: "loading",
        name: "Safe Loading",
        icon: Truck,
        description: "Strategic loading for maximum protection",
        color: "from-green-500 to-emerald-500"
    },
    {
        id: "transport",
        name: "Secure Transport",
        icon: Shield,
        description: "GPS-tracked vehicles with experienced drivers",
        color: "from-orange-500 to-red-500"
    },
    {
        id: "delivery",
        name: "Timely Delivery",
        icon: Home,
        description: "Careful unloading and setup at your new location",
        color: "from-purple-500 to-pink-500"
    }
]

const dailyOperations = [
    {
        id: 1,
        title: "Expert Furniture Wrapping",
        description: "Our team carefully wraps and protects your furniture with premium materials",
        image: "/images/bikepack.jpg",
        stage: "packing",
        location: "Mumbai, Maharashtra",
        date: "2024-01-15",
        time: "09:30 AM",
        team: ["Raj Kumar", "Priya Singh", "Amit Patel"],
        tools: ["Bubble Wrap", "Corner Guards", "Stretch Film"],
        duration: "2 hours",
        itemsProtected: "15 furniture pieces"
    },
    {
        id: 2,
        title: "Strategic Truck Loading",
        description: "Optimized loading pattern for maximum space utilization and safety",
        image: "/images/packing-real.jpg",
        stage: "loading",
        location: "Delhi, NCR",
        date: "2024-01-15",
        time: "02:15 PM",
        team: ["Sanjay Mehta", "Rohit Sharma"],
        tools: ["Loading Ramps", "Furniture Dollies", "Ratchet Straps"],
        duration: "1.5 hours",
        itemsProtected: "Complete 3BHK household"
    },
    {
        id: 3,
        title: "Secure Vehicle Transport",
        description: "GPS-tracked vehicle with experienced driver ensuring safe transit",
        image: "/images/relax-truck.jpg",
        stage: "transport",
        location: "Highway - Mumbai to Pune",
        date: "2024-01-15",
        time: "04:00 PM",
        team: ["Vikram Singh", "Navigation System"],
        tools: ["GPS Tracker", "Safety Equipment", "Climate Control"],
        duration: "3 hours",
        itemsProtected: "All client belongings"
    },
    {
        id: 4,
        title: "Careful Unloading Process",
        description: "Systematic unloading with damage prevention protocols",
        image: "/images/relax-ondelivery-image.jpg",
        stage: "delivery",
        location: "Pune, Maharashtra",
        date: "2024-01-15",
        time: "07:30 PM",
        team: ["Sameer Joshi", "Anita Desai"],
        tools: ["Hand Trucks", "Moving Blankets", "Unloading Ramps"],
        duration: "2 hours",
        itemsProtected: "Delicate items first"
    },
    {
        id: 5,
        title: "Electronic Equipment Protection",
        description: "Specialized packing for sensitive electronic devices and appliances",
        image: "/images/electronic-packaging.jpg",
        stage: "packing",
        location: "Bangalore, Karnataka",
        date: "2024-01-14",
        time: "11:00 AM",
        team: ["Karthik Nair", "Deepa Reddy"],
        tools: ["Anti-static Wrap", "Custom Crates", "Foam Padding"],
        duration: "3 hours",
        itemsProtected: "TV, Computer, Kitchen Appliances"
    },
    {
        id: 6,
        title: "Final Quality Check",
        description: "Comprehensive inspection before dispatch ensuring everything is secure",
        image: "/images/relax-packing-image.jpg",
        stage: "loading",
        location: "Chennai, Tamil Nadu",
        date: "2024-01-14",
        time: "05:45 PM",
        team: ["Quality Team", "Operations Manager"],
        tools: ["Checklist", "Digital Tablet", "Camera"],
        duration: "45 minutes",
        itemsProtected: "Complete shipment verification"
    },
    {
        id: 7,
        title: "Happy Customer Handover",
        description: "Final delivery and setup at customer's new home with satisfaction confirmation",
        image: "/images/relax-packers-ai-image-2.jpg",
        stage: "delivery",
        location: "Hyderabad, Telangana",
        date: "2024-01-14",
        time: "06:30 PM",
        team: ["Customer Service", "Moving Team"],
        tools: ["Feedback Tablet", "Documentation", "Setup Tools"],
        duration: "1.5 hours",
        itemsProtected: "Customer satisfaction"
    }
]

const stats = [
    { number: "50+", label: "Daily Operations", icon: Truck },
    { number: "500+", label: "Items Protected Daily", icon: Shield },
    { number: "25+", label: "Cities Covered", icon: MapPin },
    { number: "98%", label: "Customer Satisfaction", icon: Users }
]

export default function BlogPage() {
    const [activeStage, setActiveStage] = useState("all")
    const [selectedOperation, setSelectedOperation] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [autoPlay, setAutoPlay] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [imageLoad, setImageLoad] = useState({})

    const filteredOperations = activeStage === "all"
        ? dailyOperations
        : dailyOperations.filter(op => op.stage === activeStage)

    const handleOperationClick = (operation, index) => {
        setSelectedOperation(operation)
        setCurrentIndex(index)
        setIsModalOpen(true)
    }

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % filteredOperations.length
        setCurrentIndex(nextIndex)
        setSelectedOperation(filteredOperations[nextIndex])
    }

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + filteredOperations.length) % filteredOperations.length
        setCurrentIndex(prevIndex)
        setSelectedOperation(filteredOperations[prevIndex])
    }

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || !isModalOpen) return

        const interval = setInterval(handleNext, 5000)
        return () => clearInterval(interval)
    }, [autoPlay, isModalOpen, currentIndex])

    const handleImageLoad = (id) => {
        setImageLoad(prev => ({ ...prev, [id]: true }))
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            <Header />

            <main className="container mx-auto px-4 py-8 mt-20">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full mb-6">
                            <Truck size={20} />
                            <span className="font-semibold">Daily Operations Blog</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                            Behind The Scenes
                            <span className="block">With Relax Movers</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Witness our daily commitment to excellence through real-time photos of packing, loading, transport, and delivery operations.
                        </p>
                    </motion.div>
                </section>

                {/* Live Stats */}
                <section className="mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="text-white" size={24} />
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </section>

                {/* Operation Stages Navigation */}
                <section className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Operation Stages</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Follow the journey of your belongings from careful packing to safe delivery
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <motion.button
                                onClick={() => setActiveStage("all")}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeStage === "all"
                                        ? "bg-gradient-to-r from-gray-800 to-blue-600 text-white shadow-lg transform scale-105"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Package size={20} />
                                All Operations
                            </motion.button>

                            {operationStages.map((stage) => {
                                const IconComponent = stage.icon
                                return (
                                    <motion.button
                                        key={stage.id}
                                        onClick={() => setActiveStage(stage.id)}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeStage === stage.id
                                                ? `bg-gradient-to-r ${stage.color} text-white shadow-lg transform scale-105`
                                                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <IconComponent size={20} />
                                        {stage.name}
                                    </motion.button>
                                )
                            })}
                        </div>
                    </motion.div>
                </section>

                {/* Operations Grid */}
                <section className="mb-16">
                    <motion.div
                        key={activeStage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredOperations.map((operation, index) => (
                            <motion.article
                                key={operation.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500"
                                onClick={() => handleOperationClick(operation, index)}
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={operation.image}
                                        alt={operation.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Stage Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                                        {operationStages.find(s => s.id === operation.stage)?.name}
                                    </div>

                                    {/* Hover Overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                            <ZoomIn className="text-white" size={24} />
                                        </div>
                                    </motion.div>
                                </div>


                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                        {operation.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {operation.description}
                                    </p>

                                    {/* Details */}
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} />
                                            <span>{operation.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>{formatDate(operation.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            <span>{operation.time} • {operation.duration}</span>
                                        </div>
                                    </div>

                                    {/* Team Preview */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {operation.team.slice(0, 3).map((member, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                                                        title={member}
                                                    >
                                                        {member.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                ))}
                                                {operation.team.length > 3 && (
                                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold border-2 border-white">
                                                        +{operation.team.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <ArrowRight size={16} className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Experience Professional Moving?
                        </h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust Relax Packers & Movers for their relocation needs
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Your Move Today
                            </motion.button>
                            <motion.button
                                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Service Details
                            </motion.button>
                        </div>
                    </motion.div>
                </section>
            </main>

            {/* Operation Detail Modal */}
            <AnimatePresence>
                {isModalOpen && selectedOperation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${operationStages.find(s => s.id === selectedOperation.stage)?.color
                                            } rounded-2xl flex items-center justify-center`}>
                                            {React.createElement(operationStages.find(s => s.id === selectedOperation.stage)?.icon, {
                                                className: "text-white",
                                                size: 28
                                            })}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">{selectedOperation.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin size={14} />
                                                {selectedOperation.location}
                                                <span>•</span>
                                                <Calendar size={14} />
                                                {formatDate(selectedOperation.date)}
                                                <span>•</span>
                                                <Clock size={14} />
                                                {selectedOperation.time}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Main Image */}
                                <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-blue-400 to-cyan-500 h-80 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <Truck size={64} className="mx-auto mb-4 opacity-90" />
                                        <p className="text-xl font-semibold">{selectedOperation.title}</p>
                                        <p className="text-blue-100 mt-2">{selectedOperation.description}</p>
                                    </div>

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Auto-play Control */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setAutoPlay(!autoPlay); }}
                                        className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                                    >
                                        {autoPlay ? <Pause size={20} /> : <Play size={20} />}
                                    </button>
                                </div>

                                {/* Operation Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                                <Users size={18} className="text-blue-500" />
                                                Team Members
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedOperation.team.map((member, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-blue-50 text-blue-600 px-3 py-2 rounded-xl text-sm font-medium"
                                                    >
                                                        {member}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                                <Package size={18} className="text-green-500" />
                                                Tools & Equipment
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedOperation.tools.map((tool, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-green-50 text-green-600 px-3 py-2 rounded-xl text-sm font-medium"
                                                    >
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <h4 className="font-bold text-gray-800 mb-2">Operation Duration</h4>
                                            <p className="text-2xl font-bold text-gray-800">{selectedOperation.duration}</p>
                                        </div>

                                        <div className="bg-blue-50 rounded-xl p-4">
                                            <h4 className="font-bold text-gray-800 mb-2">Items Protected</h4>
                                            <p className="text-lg text-blue-600 font-semibold">{selectedOperation.itemsProtected}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                                    <h4 className="font-bold text-gray-800 mb-3">Process Description</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedOperation.description} Our team follows strict protocols to ensure every item is handled with care and precision.
                                        From initial assessment to final delivery, we maintain the highest standards of safety and efficiency.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />

            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-10"></div>
            </div>
        </div>
    )
}