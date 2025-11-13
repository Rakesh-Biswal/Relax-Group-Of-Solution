'use client'
import { motion } from 'framer-motion'

const features = [
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
]

export default function FeaturesSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-visible">
      {/* Decorative accent */}
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
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.10, boxShadow: "0 8px 32px -8px #a4723d55" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.5, delay: i * 0.10 }}
              className="p-7 px-4 rounded-2xl shadow-md hover:shadow-2xl transition flex flex-col items-center relative"
              style={{ background: "#f9f7ee", minHeight: 180 }}
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

              {/* "OUTSTANDING" badge for first card */}
              {i === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
                  className="absolute -top-5 right-6 px-3 py-1 bg-yellow-700 text-white text-xs rounded-full shadow-lg font-semibold"
                  style={{ letterSpacing: "0.08em", zIndex: 2 }}
                >
                  OUTSTANDING
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}