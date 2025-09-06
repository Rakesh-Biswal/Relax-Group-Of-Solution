"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Award, MapPin, Users, Star, Truck, Shield } from "lucide-react"

export default function Partners() {
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

  // Realistic partner logos (you would replace these with actual client logos)
  const partners = [
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVfTSEgAJMQfItAPgWrbJQNQLL1Ad2i65PJg&s", name: "Tata Motors" },
    { img: "https://3.bp.blogspot.com/-NBvFXfmip_s/XKrDY5YYPyI/AAAAAAAACf0/IVjmdqwDXhIC38pF_xqa60_yD1BUCedxwCLcBGAs/w800/lowongan-kerja-pt-asian-paints-indonesia.jpg", name: "Asian Paints" },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAefWfTotpDjbSgzHbYFKyu0dB2se-lU3TA&s", name: "Mahindra Logistics" },
    { img: "https://images.moneycontrol.com/static-mcnews/2020/02/Godrej-Properties.jpg?impolicy=website&width=1600&height=900", name: "Godrej Properties" },
    { img: "https://jswmi.in/jswm/storage/2020/04/jsw-logo-jv.png", name: "JSW Steel" },
  ]

  const stats = [
    { icon: MapPin, value: "50+", label: "Cities Covered" },
    { icon: Users, value: "10K+", label: "Successful Moves" },
  ]

  return (
    <section className="container section mt-20 md:mt-28 lg:mt-36" ref={sectionRef}>
      {/* Section Header */}
      <motion.div 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full mb-4">
          <Shield size={18} className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Trusted Partnerships</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Trusted by Top Brands
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join hundreds of prestigious companies who rely on Relax Packers & Movers 
          for their transportation and relocation needs across India
        </p>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 md:mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.3, duration: 0.8 }
        } : {}}
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconComponent size={24} className="text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Partners Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={isVisible ? { 
          opacity: 1,
          transition: { delay: 0.6, duration: 0.8 }
        } : {}}
      >
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            className="group relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={isVisible ? { 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              transition: { 
                delay: index * 0.1 + 0.8,
                duration: 0.6,
                ease: "easeOut"
              }
            } : {}}
            whileHover={{ 
              y: -6,
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            {/* 3D Card Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10" />
            
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl transition-all duration-300 h-full flex items-center justify-center transform-style-preserve-3d">
              
              {/* Partner Logo */}
              <div className="relative w-full h-16 md:h-20 flex items-center justify-center">
                <Image
                  src={partner.img || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                />
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/5 group-hover:to-purple-600/5 rounded-2xl transition-all duration-300" />
              </div>

              {/* Partner Name Tooltip */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                  {partner.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Text */}
      <motion.div 
        className="text-center mt-8 md:mt-12"
        initial={{ opacity: 0 }}
        animate={isVisible ? { 
          opacity: 1,
          transition: { delay: 1.4, duration: 0.8 }
        } : {}}
      >
        <p className="text-gray-600 text-sm md:text-base font-medium">
          <span className="text-[var(--color-primary)] font-semibold">1,200+</span> successful corporate partnerships across India
        </p>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute left-0 right-0 -z-10 opacity-5">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <style jsx global>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .shadow-2xl {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03);
        }
        
        @media (max-width: 768px) {
          .xl\:grid-cols-6 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .xl\:grid-cols-6 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}