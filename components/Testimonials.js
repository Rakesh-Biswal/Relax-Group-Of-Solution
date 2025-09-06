"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ArrowLeft, ArrowRight, Play, Pause } from "lucide-react"

const testimonials = [
  { 
    by: "Rakesh Sharma", 
    role: "Software Engineer, Bangalore",
    text: "Seamless experience from start to finish. The team packed, moved, and placed everything perfectly! Their attention to detail saved us so much time and stress during our relocation.",
    rating: 5,
    image: "/images/testimonials/rakesh.jpg"
  },
  { 
    by: "Anita Patel", 
    role: "Business Owner, Mumbai",
    text: "Absolutely phenomenal service! They were on-time, extremely careful with our fragile items, and the pricing was completely transparent. Highly recommended for anyone looking for professional movers.",
    rating: 5,
    image: "/images/testimonials/anita.jpg"
  },
  { 
    by: "Vikram Singh", 
    role: "Doctor, Delhi",
    text: "Outstanding support throughout our moving journey. The team was professional, courteous, and went above and beyond to ensure our antique furniture was handled with extra care. 5-star service!",
    rating: 5,
    image: "/images/testimonials/vikram.jpg"
  },
  { 
    by: "Priya Mehta", 
    role: "Architect, Hyderabad",
    text: "What impressed me most was their systematic approach. Every item was cataloged, properly packed, and arrived without a single scratch. The unpacking service was equally excellent.",
    rating: 5,
    image: "/images/testimonials/priya.jpg"
  },
  { 
    by: "Arjun Kumar", 
    role: "Professor, Chennai",
    text: "After trying multiple moving companies, we finally found Relax Packers. Their professional attitude, modern equipment, and customer-first approach make them stand out from the competition.",
    rating: 5,
    image: "/images/testimonials/arjun.jpg"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const timer = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
    }

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [isPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
    }
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
    }
  }

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
    }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="container section mt-20 md:mt-28 lg:mt-36" ref={sectionRef}>
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-full mb-4">
          <Star size={18} className="text-amber-600" />
          <span className="text-sm font-semibold text-amber-700">Customer Stories</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover why thousands of families and businesses trust Relax Packers for their moving needs
        </p>
      </motion.div>

      {/* Main Testimonial Card */}
      <motion.div 
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background Elements */}
        <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-3xl -z-10 blur-xl"></div>
        
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="p-8 md:p-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-amber-200 opacity-50">
                <Quote size={48} />
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Customer Image */}
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-1 shadow-lg">
                    <div className="w-full h-full rounded-2xl bg-gray-200 overflow-hidden">
                      {/* Placeholder for customer image */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {currentTestimonial.by.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {Array.from({ length: currentTestimonial.rating }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Star size={20} className="text-amber-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    "{currentTestimonial.text}"
                  </motion.p>

                  {/* Customer Info */}
                  <motion.div 
                    className="text-right"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="text-lg font-semibold text-gray-800">
                      {currentTestimonial.by}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentTestimonial.role}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </motion.button>

          <motion.button
            onClick={toggleAutoplay}
            className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white hover:from-amber-600 hover:to-orange-600 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight size={20} className="text-gray-700" />
          </motion.button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-amber-500 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Trust Badge */}
      <motion.div 
        className="text-center mt-12 md:mt-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl shadow-sm">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-amber-400 fill-current" />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            4.9/5 from 1,200+ reviews
          </span>
        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute left-0 right-0 -z-10 opacity-5">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}