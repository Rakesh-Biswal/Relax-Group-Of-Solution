'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const adImages = [
  { src: "/images/relax-customer-service-image.png", alt: "Customer Service" },
  { src: "/images/relax-truck.jpg", alt: "Delivery Truck" },
  { src: "/images/relax-packing-image.jpg", alt: "Professional Packing" },
  { src: "/images/packing-real.jpg", alt: "Safe Handling" },
]

export default function AdCarousel() {
  const [index, setIndex] = useState(0)
  const total = adImages.length

  useEffect(() => {
    const timer = setTimeout(() => setIndex(i => (i + 1) % total), 2000)
    return () => clearTimeout(timer)
  }, [index, total])

  function prev() { setIndex(i => (i - 1 + total) % total) }
  function next() { setIndex(i => (i + 1) % total) }

  return (
    <div className="relative flex items-center justify-center w-full mb-8 max-w-4xl mx-auto select-none">
      {/* Left Arrow */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-0 z-20 bg-white/80 hover:bg-white transition rounded-full h-12 w-12 flex items-center justify-center shadow-md"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#a4723d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Image Carousel */}
      <div className="flex-1 flex justify-center items-center">
        <div
          className="relative w-[90vw] max-w-[800px] h-[38vw] max-h-[340px] bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
          style={{
            minWidth: 350,
            minHeight: 220,
            aspectRatio: "16/7"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={adImages[index].src}
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -70 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
              <Image
                src={adImages[index].src}
                alt={adImages[index].alt}
                fill
                className="rounded-xl object-cover"
                style={{ objectFit: "cover" }}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Right Arrow */}
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-0 z-20 bg-white/80 hover:bg-white transition rounded-full h-12 w-12 flex items-center justify-center shadow-md"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="#a4723d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-3 z-30">
        {adImages.map((img, i) => (
          <button
            key={img.src}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-yellow-700" : "bg-gray-400"}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}