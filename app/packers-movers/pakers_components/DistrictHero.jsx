'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
// import LottiePlayer from './LottiePlayer'

export default function DistrictHero({ districtName, description, phone }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-[#f8f5f1] to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-[#a4723d] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#a4723d] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Animated Delivery Boy gives product (right) */}
      {/* <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-10 top-10 hidden md:block"
        style={{ zIndex: 1 }}
      >
        <LottiePlayer
          src="https://assets1.lottiefiles.com/packages/lf20_tzptyq2g.json"
          style={{ height: '180px', width: '180px' }}
        />
      </motion.div> */}

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Available 24/7 Across Odisha</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-900">Fastest & Safest</span>
            <br />
            <span className="bg-gradient-to-r from-[#a4723d] to-[#c8935a] bg-clip-text text-transparent">
              Delivery Across {districtName}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            {description || `At Relax Packers and Movers in ${districtName}, we believe that Customers come first and we ensure swift delivery of goods at customers' desired locations on time. We have served more than 15,000+ customers and have shifted them safely.`}
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            {[
              { icon: '🚚', text: 'Four-Wheeler Transport' },
              { icon: '⚡', text: 'Same-Day Delivery Available' },
              { icon: '📍', text: 'GPS Real-Time Tracking' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - With Phone Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href={`tel:+91${phone}`}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(164, 114, 61, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#a4723d] text-white font-semibold rounded-lg shadow-lg hover:bg-[#8d5f2f] transition flex items-center gap-2"
            >
              📞 Call and Book Your Delivery Now
              <span>→</span>
            </motion.a>

            <motion.a
              href="/tracking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#a4723d] font-semibold rounded-lg shadow-lg border-2 border-[#a4723d] hover:bg-[#f8f5f1] transition"
            >
              Track Order
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex items-center gap-8 flex-wrap"
          >
            <div>
              <div className="text-3xl font-bold text-[#a4723d]">5000+</div>
              <div className="text-sm text-gray-600">Deliveries Completed</div>
            </div>
            <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
            <div>
              <div className="text-3xl font-bold text-[#a4723d]">30</div>
              <div className="text-sm text-gray-600">Districts Covered</div>
            </div>
            <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
            <div>
              <div className="text-3xl font-bold text-[#a4723d]">98%</div>
              <div className="text-sm text-gray-600">On-Time Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          {/* Floating Card */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative w-full h-96 rounded-3xl shadow-2xl overflow-hidden">
              <Image
                src="/images/packing-real.jpg"
                alt="Four Wheeler Delivery Truck"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Secured Transport</div>
                    <div className="text-sm text-gray-600">Insured & GPS Tracked</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-8 -right-8 w-20 h-20 border-4 border-[#a4723d] border-dashed rounded-full opacity-30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-8 -left-8 w-16 h-16 border-4 border-[#a4723d] border-dashed rounded-full opacity-30"
          />
        </motion.div>
      </div>
    </section>
  )
}