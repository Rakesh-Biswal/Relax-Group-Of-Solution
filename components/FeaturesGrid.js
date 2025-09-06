"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Shield, Clock, IndianRupee, Package, CheckCircle, Truck, Users, HeadphonesIcon } from "lucide-react"
import Lottie from "lottie-react"
import ContactAnimation from "../public/animations/Contact.json"

const items = [
  {
    icon: Shield,
    title: "Fully Insured Protection",
    sub: "Your belongings are covered with complete insurance protection",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Clock,
    title: "Punctual Service Guarantee",
    sub: "On-time delivery with precise scheduling and reliable service",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    sub: "No hidden costs with clear, upfront quotes for your move",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Package,
    title: "Professional Packing",
    sub: "Expert packing with premium materials for maximum safety",
    color: "from-purple-500 to-pink-500"
  },
]

export default function FeaturesGrid() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const IconContainer = ({ icon: Icon, color }) => (
    <div className="relative">
      {/* Main icon with 3D effect */}
      <div className={`relative z-10 bg-gradient-to-br ${color} rounded-2xl p-3 shadow-lg transform rotate-0 group-hover:rotate-6 transition-transform duration-300`}>
        <Icon size={28} className="text-white" />
      </div>

      {/* 3D depth effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl opacity-50 blur-sm transform translate-y-1 scale-95 group-hover:translate-y-2 transition-all duration-300`}></div>

      {/* Floating particles */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float-1 transition-opacity duration-500" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float-2 transition-opacity duration-500" />
    </div>
  )

  return (
    <section className="container section pt-16 md:pt-24" ref={sectionRef}>
      <motion.h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Why Trust Relax Packers?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="relative group"
            initial={{ opacity: 0, y: 30, rotateY: 15 }}
            animate={isVisible ? {
              opacity: 1,
              y: 0,
              rotateY: 0,
              transition: {
                delay: i * 0.1,
                duration: 0.7,
                ease: "easeOut"
              }
            } : {}}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            {/* Background glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${it.color} rounded-2xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-10 -z-10`} />

            <div className="relative bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">

              {/* 3D Animated Icon */}
              <div className="mb-5 md:mb-6">
                <IconContainer icon={it.icon} color={it.color} />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-tight">
                {it.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                {it.sub}
              </p>

              {/* Hover Effect Elements */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${it.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Trust Indicators */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12"
        initial={{ opacity: 0 }}
        animate={isVisible ? {
          opacity: 1,
          transition: { delay: 0.8, duration: 0.6 }
        } : {}}
      >
        {[
          { icon: Users, text: "10,000+ Happy Families", color: "text-blue-500" },
          { icon: Truck, text: "500+ Cities Covered", color: "text-green-500" },
          { icon: CheckCircle, text: "99% Satisfaction Rate", color: "text-amber-500" },
          { icon: HeadphonesIcon, text: "24/7 Support", color: "text-purple-500" }
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-3 md:p-4 text-center">
            <item.icon size={20} className={`mx-auto mb-2 ${item.color}`} />
            <p className="text-xs md:text-sm font-medium text-gray-700">{item.text}</p>
          </div>
        ))}
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div
        className="text-center md:mt-14"
        initial={{ opacity: 0 }}
        animate={isVisible ? {
          opacity: 1,
          transition: { delay: 1.0, duration: 1 }
        } : {}}
      >

        {/* Lottie Animation instead of Button */}
        <div className="w-70 h-70 mx-auto cursor-pointer">
          <Lottie
            animationData={ContactAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(4px); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(6px) translateX(-4px); }
        }
        
        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 3s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}