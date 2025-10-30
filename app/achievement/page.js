"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Truck, MapPin, Users, Star, Award, Shield, Calendar, Clock, ArrowLeft } from "lucide-react"

function useCountUp(to = 0, duration = 2000) {
  const [n, setN] = useState(0)

  useEffect(() => {
    let raf
    let startTs = null
    
    const step = (ts) => {
      if (!startTs) startTs = ts
      const progress = Math.min(1, (ts - startTs) / duration)
      const currentValue = Math.floor(progress * to)
      setN(currentValue)
      
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])

  return n
}

export default function AchievementsPage() {
  const [isVisible, setIsVisible] = useState(true) // Always visible

  const moves = useCountUp(12890, 1800)
  const cities = useCountUp(42, 1600)
  const partners = useCountUp(85, 1400)
  const rating = useCountUp(49, 1200)
  const years = useCountUp(12, 1000)
  const hours = useCountUp(24, 800)

  const stats = [
    {
      value: moves,
      label: "Successful Moves",
      suffix: "+",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
      description: "Happy families relocated safely",
      startColor: "#3b82f6",
      endColor: "#06b6d4"
    },
    {
      value: cities,
      label: "Cities Covered",
      suffix: "+",
      icon: MapPin,
      color: "from-green-500 to-emerald-500",
      description: "Across India with reliable service",
      startColor: "#22c55e",
      endColor: "#10b981"
    },
    {
      value: partners,
      label: "Partner Fleets",
      suffix: "+",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Professional vehicles & crew",
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
      description: "Trusted service excellence",
      startColor: "#ef4444",
      endColor: "#f43f5e"
    },
    {
      value: hours,
      label: "Support",
      suffix: "/7",
      icon: Clock,
      color: "from-indigo-500 to-blue-500",
      description: "Round the clock assistance",
      startColor: "#6366f1",
      endColor: "#3b82f6"
    }
  ]

  const achievements = [
    {
      year: "2023",
      title: "Best Packers & Movers Award",
      description: "Recognized as the most reliable moving service in Eastern India",
      icon: Award
    },
    {
      year: "2022",
      title: "ISO 9001 Certified",
      description: "Achieved international quality management certification",
      icon: Shield
    },
    {
      year: "2021",
      title: "50+ Cities Expansion",
      description: "Successfully expanded our services to 50+ cities across India",
      icon: MapPin
    },
    {
      year: "2020",
      title: "10,000+ Moves",
      description: "Completed over 10,000 successful relocations",
      icon: Truck
    }
  ]

  const StatItem = ({ stat, index }) => {
    const IconComponent = stat.icon

    return (
      <motion.div
        className="group relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6,
            delay: index * 0.1
          }
        }}
        whileHover={{ 
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 group-hover:shadow-3xl transition-all duration-300 h-full text-center relative overflow-hidden">
          {/* Icon Container */}
          <motion.div 
            className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-6 shadow-2xl relative`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              transition: { duration: 0.6 }
            }}
          >
            <IconComponent size={32} className="text-white" />
          </motion.div>

          {/* Animated Number */}
          <motion.div 
            className="text-4xl md:text-5xl font-bold mb-3 font-sans"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: index * 0.1 + 0.4 }
            }}
            style={{ 
              background: `linear-gradient(135deg, ${stat.startColor}, ${stat.endColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {stat.value}
            <span className="text-2xl">{stat.suffix}</span>
          </motion.div>

          {/* Label */}
          <motion.h3 
            className="text-xl font-bold text-gray-800 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: index * 0.1 + 0.5 } }}
          >
            {stat.label}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-gray-600 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: index * 0.1 + 0.6 } }}
          >
            {stat.description}
          </motion.p>

          {/* Progress Bar */}
          <motion.div 
            className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden backdrop-blur-sm"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ 
              opacity: 1,
              scaleX: 1,
              transition: { delay: index * 0.1 + 0.7, duration: 0.8 }
            }}
          >
            <motion.div 
              className="h-full rounded-full relative overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: 1,
                transition: { delay: index * 0.1 + 0.9, duration: 1.2 }
              }}
              style={{ 
                background: `linear-gradient(90deg, ${stat.startColor}, ${stat.endColor})`,
                transformOrigin: "left"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Back Button */}
      <motion.div
        className="container pt-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          onClick={() => window.history.back()}
          className="group flex items-center gap-3 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300 mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Previous</span>
        </motion.button>
      </motion.div>

      <section className="container pb-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 md:mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Award size={20} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Our Legacy of Excellence</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Achievements
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Celebrating over a decade of trust, excellence, and countless successful relocations across India. 
            Our numbers reflect our commitment to quality service and customer satisfaction.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Achievements Timeline */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-slate-800 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Milestone <span className="text-blue-600">Achievements</span>
          </motion.h2>
          
          <div className="space-y-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={index}
                  className="flex items-start gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.6, delay: 0.6 + index * 0.1 }
                  }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={28} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {achievement.year}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800">{achievement.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{achievement.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.8 }
          }}
        >
          {[
            { icon: Shield, text: "Fully Insured", color: "text-green-600" },
            { icon: Award, text: "Award Winning", color: "text-amber-600" },
            { icon: Users, text: "Verified Partners", color: "text-blue-600" },
            { icon: Star, text: "Premium Service", color: "text-purple-600" }
          ].map((badge, index) => {
            const IconComponent = badge.icon
            return (
              <motion.div 
                key={index}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.4, delay: 0.9 + index * 0.1 }
                }}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                <IconComponent size={22} className={badge.color} />
                <span className="font-semibold text-slate-700">{badge.text}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  )
}