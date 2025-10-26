"use client"

import { motion } from "framer-motion"
import { ArrowRight , Phone} from "lucide-react"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic'

// Dynamically import Lottie
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-gray-400 text-sm">Loading animation...</div>
  </div>
})

// Import Lottie animations
import TrackMap from '../public/animations/TrackMap.json'
import DeliveryTruck from '../public/animations/delivery-truck.json'

export default function HeroAnimated() {
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const animationTimer = useRef(null)

  const animations = [
    { data: TrackMap, text: "Live Tracking" },
    { data: DeliveryTruck, text: "Fast Delivery" }
  ]

  useEffect(() => {
    animationTimer.current = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % animations.length)
    }, 4000) // Switch every 4 seconds

    return () => {
      if (animationTimer.current) clearInterval(animationTimer.current)
    }
  }, [animations.length])

  return (
    <section className="container section">
      <div className="rounded-[18px] border border-border p-4 md:p-6 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800">
              Book Packers in 10 minutes
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-600 max-w-md mx-auto md:mx-0">
              Instant scheduling, live tracking, and insured moving with Relax.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">

              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hello Relax Packers & Movers,  I just visited Your Website & am interested in your transportation services. Please provide me with more details about the service demo and shifting process."
                  );
                  window.open(`https://wa.me/919777012315?text=${message}`, "_blank");
                }}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm md:text-base font-medium transition-colors duration-200 flex items-center gap-2 mx-auto md:mx-0"
              >
                WhatsApp Now <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  window.open('tel:+919777012315', '_self');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm md:text-base font-medium transition-colors duration-200 flex items-center gap-2 justify-center mx-auto md:mx-0"
              >
                Call Now <Phone size={16} />
              </button>

            </div>



          </div>

          {/* Animated Lottie Container */}
          <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnimation}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Lottie
                  animationData={animations[currentAnimation].data}
                  loop={true}
                  autoplay={true}
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 text-center">
                  <span className="text-xs font-semibold text-gray-700 bg-white/80 px-2 py-1 rounded-full">
                    {animations[currentAnimation].text}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <PromoCarousel />
      </div>
    </section>
  )
}

function PromoCarousel() {
  const slides = [
    {
      title: "Door-to-Door Safe Moving",
      desc: "Verified experts. Packing to placement, end-to-end.",
      image: "./images/packing-real.jpg",
    },
    {
      title: "Trusted by 10,000+ Families",
      desc: "On-time delivery. Damage-free promise.",
      image: "./images/relax-packers-ai-image-2.jpg",
    },
    {
      title: "Instant Quotes, Live Tracking",
      desc: "Transparent pricing and updates at every mile.",
      image: "./images/location-tracking.png",
    },
    {
      title: "Affordable & Transparent Pricing",
      desc: "No hidden charges. Pay only what you see.",
      image: "./images/bikepack.jpg",
    },
    {
      title: "Professional Packing Materials",
      desc: "High-quality boxes, wraps & cushioning for safe transit.",
      image: "./images/relax-truck.jpg",
    },
    {
      title: "24/7 Customer Support",
      desc: "Always available to assist you during your move.",
      image: "./images/relax-customer-service-image.png",
    },
  ]

  return (
    <div className="mt-4 md:mt-6">
      <motion.div
        className="relative overflow-hidden rounded-[16px] md:rounded-[20px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <AutoSlides slides={slides} />
      </motion.div>
    </div>
  )
}

function AutoSlides({ slides }) {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer.current)
  }, [slides.length])

  const current = slides[index]

  return (
    <div className="relative">
      <div className="h-[180px] md:h-[220px] lg:h-[280px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={current.image || "/placeholder.svg"}
              alt={current.title}
              fill
              className="object-cover rounded-[16px] md:rounded-[20px]"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-[16px] md:rounded-[20px]" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white">
              <div className="text-sm md:text-lg lg:text-xl font-extrabold leading-tight drop-shadow-md">
                {current.title}
              </div>
              <div className="text-xs md:text-sm lg:text-base opacity-95 mt-1 md:mt-2 drop-shadow-md">
                {current.desc}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}