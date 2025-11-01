"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react";
import { Star, Quote, ThumbsUp, Heart, Sparkles, Calendar, MapPin, Package, Clock, Shield, Truck, User, ChevronDown, ChevronUp, Send, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const feedbackData = [
  {
    id: 1,
    customerName: "Priya Sharma",
    location: "Mumbai to Bangalore",
    rating: 5,
    date: "2 weeks ago",
    serviceType: "House Shifting",
    feedback: "Absolutely outstanding service! The team handled our entire 3 BHK shifting with such care. Everything reached perfectly without a single scratch. Highly recommended!",
    highlights: ["On-time delivery", "Careful packing", "Professional team"],
    likes: 24,
    verified: true,
    animation: "slideUp"
  },
  {
    id: 2,
    customerName: "Rajesh Kumar",
    location: "Delhi to Hyderabad",
    rating: 5,
    date: "1 month ago",
    serviceType: "Office Relocation",
    feedback: "Relax Packers made our office relocation seamless. They worked after hours to minimize business disruption. Everything was set up perfectly at the new location.",
    highlights: ["After-hours service", "Quick setup", "Minimal disruption"],
    likes: 18,
    verified: true,
    animation: "scaleIn"
  },
  {
    id: 3,
    customerName: "Anita Patel",
    location: "Chennai to Pune",
    rating: 4,
    date: "3 weeks ago",
    serviceType: "International Moving",
    feedback: "Great experience with international relocation. Their documentation support was excellent. Customs clearance was handled smoothly without any issues.",
    highlights: ["Documentation support", "Customs clearance", "International expertise"],
    likes: 15,
    verified: true,
    animation: "slideLeft"
  },
  {
    id: 4,
    customerName: "Vikram Singh",
    location: "Kolkata to Delhi",
    rating: 5,
    date: "2 months ago",
    serviceType: "Vehicle Transportation",
    feedback: "My car was transported safely without any damage. GPS tracking was active throughout the journey. Regular updates provided. Excellent service!",
    highlights: ["GPS tracking", "Regular updates", "Zero damage"],
    likes: 32,
    verified: true,
    animation: "slideRight"
  },
  {
    id: 5,
    customerName: "Meera Nair",
    location: "Bangalore to Chennai",
    rating: 5,
    date: "1 week ago",
    serviceType: "Packing Service",
    feedback: "Professional packing team with high-quality materials. They packed my delicate items with extra care. Nothing was broken during transit. Thank you!",
    highlights: ["Quality materials", "Delicate handling", "Zero breakage"],
    likes: 28,
    verified: true,
    animation: "flip"
  },
  {
    id: 6,
    customerName: "Arjun Mehta",
    location: "Hyderabad to Mumbai",
    rating: 4,
    date: "3 days ago",
    serviceType: "Storage Services",
    feedback: "Used their storage facility for 2 months. Clean, secure, and well-maintained. All items were in perfect condition when retrieved. Good service!",
    highlights: ["Clean facility", "Secure storage", "Perfect condition"],
    likes: 12,
    verified: true,
    animation: "bounce"
  }
]

const stats = [
  { number: "10,000+", label: "Happy Families", icon: Heart },
  { number: "98%", label: "Success Rate", icon: ThumbsUp },
  { number: "500+", label: "Cities Covered", icon: MapPin },
  { number: "24/7", label: "Customer Support", icon: Clock }
]

const serviceTypes = [
  "House Shifting",
  "Office Relocation",
  "International Moving",
  "Vehicle Transport",
  "Packing Services",
  "Storage Solutions"
]

export default function FeedbackPage() {
  const [expandedFeedback, setExpandedFeedback] = useState(null)
  const [filter, setFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    serviceType: "",
    rating: 5,
    feedback: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const filteredFeedback = filter === "all" 
    ? feedbackData 
    : feedbackData.filter(item => item.serviceType === filter)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", location: "", serviceType: "", rating: 5, feedback: "" })
    
    setTimeout(() => setSubmitted(false), 5000)
  }

  const toggleFeedback = (id) => {
    setExpandedFeedback(expandedFeedback === id ? null : id)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        <Star
          size={16}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      </motion.div>
    ))
  }

  const getAnimationProps = (type) => {
    switch (type) {
      case "slideUp":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 }
        }
      case "scaleIn":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5 }
        }
      case "slideLeft":
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6 }
        }
      case "slideRight":
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6 }
        }
      case "flip":
        return {
          initial: { opacity: 0, rotateY: 90 },
          animate: { opacity: 1, rotateY: 0 },
          transition: { duration: 0.8 }
        }
      case "bounce":
        return {
          initial: { opacity: 0, y: -50 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 10 
            }
          }
        }
      default:
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 }
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full mb-6">
              <Sparkles size={20} />
              <span className="font-semibold">Customer Voices</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-6">
              Hear From Our
              <span className="block">Happy Customers</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover why thousands of families and businesses trust Relax Packers & Movers for their relocation needs
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
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
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
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

        {/* Filter Section */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              All Reviews
            </button>
            {serviceTypes.map((service) => (
              <button
                key={service}
                onClick={() => setFilter(service)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === service
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {service}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Feedback Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredFeedback.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  layout
                  {...getAnimationProps(feedback.animation)}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => toggleFeedback(feedback.id)}
                >
                  {/* Feedback Card */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{feedback.customerName}</h3>
                          <div className="flex items-center gap-1">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                      </div>
                      {feedback.verified && (
                        <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                          <Shield size={12} />
                          Verified
                        </div>
                      )}
                    </div>

                    {/* Service Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {feedback.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package size={14} />
                        {feedback.serviceType}
                      </div>
                    </div>

                    {/* Feedback Excerpt */}
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {feedback.feedback}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {feedback.highlights.slice(0, 2).map((highlight, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                      {feedback.highlights.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          +{feedback.highlights.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {feedback.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        {feedback.likes} likes
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedFeedback === feedback.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 bg-gray-50"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Quote className="text-blue-500" size={20} />
                            <h4 className="font-semibold text-gray-800">Full Review</h4>
                          </div>
                          
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {feedback.feedback}
                          </p>

                          <div className="space-y-2">
                            <h5 className="font-semibold text-gray-800 text-sm">Service Highlights:</h5>
                            <div className="flex flex-wrap gap-2">
                              {feedback.highlights.map((highlight, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                                >
                                  {highlight}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Share Your Experience?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Help others make the right choice by sharing your moving journey with Relax Packers & Movers
            </p>
            <motion.button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} />
              Share Your Feedback
            </motion.button>
          </motion.div>
        </section>
      </main>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Share Your Experience</h3>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Route/Location
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Mumbai to Delhi"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Type
                      </label>
                      <select
                        required
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select service type</option>
                        {serviceTypes.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Rating
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className="p-1"
                          >
                            <Star
                              size={24}
                              className={star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Feedback
                      </label>
                      <textarea
                        required
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        rows={4}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Share your moving experience..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Submit Feedback
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  )
}