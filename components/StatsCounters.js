"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Truck, MapPin, Users, Star, Award, Shield, Calendar, Clock } from "lucide-react"

function useCountUp(to = 0, duration = 2000, startOnView = false, trigger = false) {
  const [n, setN] = useState(0)
  const [isCounting, setIsCounting] = useState(false)
  const startTs = useRef(null)

  useEffect(() => {
    if (startOnView && !trigger) return
    if (!isCounting) {
      setIsCounting(true)
      startTs.current = null
      setN(0)
    }

    let raf
    const step = (ts) => {
      if (!startTs.current) startTs.current = ts
      const progress = Math.min(1, (ts - startTs.current) / duration)
      const currentValue = Math.floor(progress * to)
      setN(currentValue)
      
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, startOnView, trigger, isCounting])

  return n
}

export default function StatsCounters() {
  const [isVisible, setIsVisible] = useState(false)
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

  const moves = useCountUp(12890, 1800, true, isVisible)
  const cities = useCountUp(42, 1600, true, isVisible)
  const partners = useCountUp(85, 1400, true, isVisible)
  const rating = useCountUp(49, 1200, true, isVisible)
  const years = useCountUp(12, 1000, true, isVisible)
  const hours = useCountUp(24, 800, true, isVisible)

  const stats = [
    {
      value: moves,
      label: "Delivered",
      suffix: "+",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
      description: "Happy families relocated",
      startColor: "#3b82f6",
      endColor: "#06b6d4"
    },
    {
      value: cities,
      label: "City Covered",
      suffix: "+",
      icon: MapPin,
      color: "from-green-500 to-emerald-500",
      description: "Across India",
      startColor: "#22c55e",
      endColor: "#10b981"
    },
    {
      value: partners,
      label: "Partner Fleets",
      suffix: "+",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Professional vehicles",
      startColor: "#a855f7",
      endColor: "#ec4899"
    },
    {
      value: (rating / 10).toFixed(1),
      label: "Customer Rating",
      suffix: "/5",
      icon: Star,
      color: "from-amber-500 to-orange-500",
      description: "Average satisfaction score",
      startColor: "#f59e0b",
      endColor: "#f97316"
    },
    {
      value: years,
      label: "Years Experience",
      suffix: "+",
      icon: Calendar,
      color: "from-red-500 to-rose-500",
      description: "Trusted service",
      startColor: "#ef4444",
      endColor: "#f43f5e"
    },
    {
      value: hours,
      label: "Support",
      suffix: "/7",
      icon: Clock,
      color: "from-indigo-500 to-blue-500",
      description: "Round the clock",
      startColor: "#6366f1",
      endColor: "#3b82f6"
    }
  ]

  const StatItem = ({ stat, index }) => {
    const IconComponent = stat.icon

    return (
      <motion.div
        className="group relative"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isVisible ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            delay: index * 0.1,
            duration: 0.7,
            ease: "easeOut"
          }
        } : {}}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3 }
        }}
      >
        {/* Background Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-10 -z-10`} />
        
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300 h-full text-center">
          {/* Icon Container */}
          <motion.div 
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              transition: { duration: 0.6 }
            }}
          >
            <IconComponent size={28} className="text-white" />
          </motion.div>

          {/* Animated Number */}
          <motion.div 
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { 
              opacity: 1,
              transition: { delay: index * 0.1 + 0.5, duration: 0.5 }
            } : {}}
            style={{ 
              background: `linear-gradient(to right, ${stat.startColor}, ${stat.endColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {stat.value}
            <span className="text-lg">{stat.suffix}</span>
          </motion.div>

          {/* Label */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {stat.label}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {stat.description}
          </p>

          {/* Animated Progress Bar */}
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden"
            initial={{ width: 0 }}
            animate={isVisible ? { 
              width: "100%",
              transition: { delay: index * 0.1 + 0.8, duration: 1.2 }
            } : {}}
          >
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${(typeof stat.value === 'number' ? stat.value : parseFloat(stat.value)) / (stat.label.includes('Rating') ? 10 : 100) * 100}%`,
                background: `linear-gradient(to right, ${stat.startColor}, ${stat.endColor})`
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="container section mt-20 md:mt-28 lg:mt-36" ref={sectionRef}>
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full mb-4">
          <Award size={18} className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Our Achievements</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Numbers That Speak Volumes
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Trusted by thousands of families and businesses across India for reliable and professional moving services
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6 mt-12 md:mt-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { 
          opacity: 1,
          transition: { delay: 1.2, duration: 0.8 }
        } : {}}
      >
        {[
          { icon: Shield, text: "Fully Insured", color: "text-green-600" },
          { icon: Award, text: "Award Winning", color: "text-amber-600" },
          { icon: Users, text: "Verified Partners", color: "text-blue-600" }
        ].map((badge, index) => {
          const IconComponent = badge.icon
          return (
            <div key={index} className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-md border border-gray-100">
              <IconComponent size={20} className={badge.color} />
              <span className="text-sm font-semibold text-gray-700">{badge.text}</span>
            </div>
          )
        })}
      </motion.div>

      {/* Background Elements */}
      <div className="absolute left-0 right-0 -z-10 opacity-5">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}