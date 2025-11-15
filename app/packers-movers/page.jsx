'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../../components/Header"
import Pakers_HeroSection from "./pakers_components/Packers_Hero"
import Footer from "../../components/Footer"
import { Player } from '@lottiefiles/react-lottie-player'

const taglines = [
  "Delivering Happiness Across Odisha",
  "Lightning Fast. Ultra Safe.",
  "Odisha’s Local Delivery Experts",
  "Unwrapping Joy, One Parcel at a Time",
]

// Card ad images
const adImages = [
  { src: "/images/relax-customer-service-image.png", alt: "Ad 1" },
  { src: "/images/relax-truck.jpg", alt: "Ad 2" },
  { src: "/images/relax-packing-image.jpg", alt: "Ad 3" },
  { src: "/images/packing-real.jpg", alt: "Ad 4" },
]

function AnimatedTagline() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % taglines.length), 2200)
    return () => clearTimeout(timer)
  }, [index])
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={taglines[index]}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        style={{ display: 'inline-block' }}
      >
        {taglines[index]}
      </motion.span>
    </AnimatePresence>
  )
}

// Carousel for card ads
function AdCarousel() {
  const [index, setIndex] = useState(0)
  const total = adImages.length

  // Autoplay every 2 seconds
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
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#a4723d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#a4723d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-3 z-30">
        {adImages.map((img, i) => (
          <button
            key={img.src}
            className={`w-3 h-3 rounded-full border-2 ${i === index ? "bg-yellow-700 border-yellow-700" : "bg-gray-400 border-gray-400"}`}
            style={{ border: "none" }}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section id="home" className="pb-20 relative" style={{ backgroundColor: '#f8f5f1' }}>
        {/* Animated Delivery Lottie (truck, left) */}
        {/* <div className="absolute left-6 top-0 hidden md:block" style={{ zIndex: 0 }}>
          <Player
            autoplay
            loop
            src="https://assets10.lottiefiles.com/packages/lf20_zbqh2bdp.json"
            style={{ height: '190px', width: '190px' }}
          />
        </div> */}

        {/* Animated Delivery Boy gives product (right) */}
        {/* <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute right-10 top-10 hidden md:block"
          style={{ zIndex: 1 }}
        >
          <Player
            autoplay
            loop
            src="https://assets1.lottiefiles.com/packages/lf20_tzptyq2g.json"
            style={{ height: '180px', width: '180px' }}
          />
        </motion.div> */}

        {/* Custom Hero Content */}
        <Pakers_HeroSection />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Animated, Dynamic Tagline */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <AnimatedTagline />
          </motion.h1>

          {/* Animated Subtext */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Reliable shipping services for individuals, businesses, and e-commerce clients.
            Experience speed, safety, and satisfaction—every single time.
          </motion.p>

          {/* --- Carousel Ads Section --- */}
          <AdCarousel />

          {/* Animated CTA Button with pulse */}
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.08,
              boxShadow: '0 4px 16px 0 rgba(164,114,61,0.2)'
            }}
            className="inline-block text-white px-8 py-3 rounded-lg shadow-md font-semibold transition"
            style={{ backgroundColor: '#a4723d' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            Book Your Delivery Now
          </motion.a>
        </div>
      </section>

      {/* 24x7 Delivery Banner */}
      <section className="py-10 text-center text-white" style={{ backgroundColor: '#a4723d' }}>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Call 24×7 for Instant Pickup & Delivery
        </motion.h2>
        <motion.p
          className="text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          📞 +91 98765 43210
        </motion.p>
      </section>

      {/* What Makes Us Unique */}
      <section id="about" className="py-24 bg-white relative overflow-visible">
        {/* Decorative accent, optional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: -140, y: -40 }}
          animate={{ opacity: 0.14, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.3, type: "spring" }}
          className="absolute left-0 top-0 w-60 h-40 bg-yellow-700 rounded-full blur-2xl pointer-events-none"
        />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            className="text-3xl font-bold mb-14"
            style={{ color: '#a4723d' }}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            What Makes Us Stand Out
          </motion.h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
            {[
              {
                title: "Same-Day Delivery",
                desc: "Fast pickup and delivery across all major districts within hours.",
                icon: "🚚"
              },
              {
                title: "Real-Time Tracking",
                desc: "Track your parcels live with our advanced GPS system.",
                icon: "📍"
              },
              {
                title: "Affordable Pricing",
                desc: "Get transparent and budget-friendly pricing for every shipment.",
                icon: "💸"
              },
              {
                title: "Secure Payments",
                desc: "Pay with confidence—PCI-compliant, encrypted transactions.",
                icon: "🔒"
              },
              {
                title: "Free Returns",
                desc: "Worry-free returns for select shipments and e-commerce products.",
                icon: "↩️"
              },
              {
                title: "Dedicated Support",
                desc: "Friendly help desks and instant chat for all your needs.",
                icon: "🤝"
              },
              {
                title: "Verified Vendors",
                desc: "Partnered only with trusted, certified e-commerce sellers.",
                icon: "✔️"
              },
              {
                title: "Eco Packaging",
                desc: "Recyclable, sustainable packaging for every parcel.",
                icon: "🌱"
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.10, boxShadow: "0 8px 32px -8px #a4723d55", rotate: 8 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.5, delay: i * 0.10 }}
                className="p-7 px-4 rounded-2xl shadow-md hover:shadow-2xl transition flex flex-col items-center"
                style={{ background: "#f9f7ee", minHeight: 180, position: 'relative' }}
              >
                {/* Animated badge icon */}
                <motion.div
                  className="w-14 h-14 mb-3 text-3xl flex items-center justify-center rounded-full bg-white shadow border-2 border-yellow-700"
                  initial={{ y: -12, scale: 1.10, opacity: 0 }}
                  whileHover={{ scale: 1.24, rotate: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", delay: 0.27 * i, duration: 0.7 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#a4723d' }}>
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>

                {/* "OUTSTANDING" badge for wow effect, only on first card */}
                {i === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
                    className="absolute -top-5 right-6 px-3 py-1 bg-yellow-700 text-white text-xs rounded-full shadow-lg font-semibold"
                    style={{ letterSpacing: "0.08em", zIndex: 2 }}
                  >OUTSTANDING</motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#a4723d' }}>
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Priya Das",
                text: "Excellent service! My parcel reached within 4 hours. Highly recommended!",
              },
              {
                name: "Rohit Kumar",
                text: "Affordable and reliable. I use Relax Packers for all my e-commerce deliveries.",
              },
              {
                name: "Anjali Mishra",
                text: "Friendly staff, quick response, and safe handling of fragile goods.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -7, scale: 1.03 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <p className="text-gray-700 italic mb-4">“{t.text}”</p>
                <h4 className="font-semibold" style={{ color: '#a4723d' }}>
                  - {t.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured On */}
      <section id="featured" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10" style={{ color: '#a4723d' }}>
            Featured On
          </h2>
          <div className="flex flex-wrap justify-center gap-10 grayscale opacity-80">
            {["Times of India", "Odisha News", "Startup Odisha", "ET Now"].map((name, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.11, opacity: 1, color: "#a4723d" }}
                initial={{ opacity: 0.7, y: 15 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-lg font-semibold"
                style={{ color: '#a4723d' }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
