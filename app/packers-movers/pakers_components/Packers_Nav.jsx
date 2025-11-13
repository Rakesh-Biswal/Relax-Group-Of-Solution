'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

function Packers_Nav() {
  const [isDistrictOpen, setIsDistrictOpen] = useState(false)

  // All 30 districts of Odisha
  const districts = [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak",
    "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam",
    "Gajapati", "Jharsuguda", "Jajpur", "Jagatsinghpur", "Khordha",
    "Keonjhar", "Kalahandi", "Kandhamal", "Koraput", "Kendrapara",
    "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nuapada", "Nayagarh",
    "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
  ]

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scaleY: 0,
      originY: 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scaleY: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.02,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scaleY: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          {/* Logo + Name with Hover Effect */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/packers-movers">
              <Image
                src="/images/relax-nav-logo.png"
                alt="Relax Packers & Movers Logo"
                width={200}
                height={45}
                className="rounded-full cursor-pointer"
              />
            </Link>
          </motion.div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-6 font-medium text-gray-700">
            {/* Home Link */}
            <motion.div
              whileHover={{ scale: 1.1, color: '#a4723d' }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/packers-movers#home" className="hover:text-[#a4723d] transition">
                Home
              </Link>
            </motion.div>

            {/* District Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDistrictOpen(true)}
              onMouseLeave={() => setIsDistrictOpen(false)}
            >
              <motion.button 
                className="hover:text-[#a4723d] transition flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                District
                <motion.svg
                  animate={{ rotate: isDistrictOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {isDistrictOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                    style={{ maxHeight: '400px', overflowY: 'auto' }}
                  >
                    <div className="py-2">
                      {districts.map((district, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          whileHover={{ 
                            x: 8, 
                            backgroundColor: '#f8f5f1',
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Link
                            href={`/packers-movers/${district.toLowerCase()}`}
                            className="block px-4 py-2 text-gray-700 hover:text-[#a4723d] transition"
                            onClick={() => setIsDistrictOpen(false)}
                          >
                            {district}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Link */}
            <motion.div
              whileHover={{ scale: 1.1, color: '#a4723d' }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/packers-movers#about" className="hover:text-[#a4723d] transition">
                About
              </Link>
            </motion.div>

            {/* Contact Link */}
            <motion.div
              whileHover={{ scale: 1.1, color: '#a4723d' }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/packers-movers#contact" className="hover:text-[#a4723d] transition">
                Contact
              </Link>
            </motion.div>

            {/* Services Link */}
            <motion.div
              whileHover={{ scale: 1.1, color: '#a4723d' }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/packers-movers#services" className="hover:text-[#a4723d] transition">
                Services
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Packers_Nav
