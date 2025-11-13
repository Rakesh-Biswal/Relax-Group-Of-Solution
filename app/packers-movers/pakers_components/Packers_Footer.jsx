'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function Packer_Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null)

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    services: [
      { name: 'Four-Wheeler Delivery', href: '#services' },
      { name: 'Express Shipping', href: '#express' },
      { name: 'Package Tracking', href: '#tracking' },
      { name: 'Bulk Orders', href: '#bulk' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Terms & Conditions', href: '#terms' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'FAQs', href: '#faq' }
    ]
  }

  const socialIcons = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <footer className="relative bg-white border-t border-gray-100 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-indigo-50 opacity-60" />
      
      {/* Glowing Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: '#4F46E5' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: '#4F46E5' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-[#4F46E5] bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Relax Packers
            </motion.h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fastest & safest delivery across Odisha. Your trusted partner for reliable shipping solutions.
            </p>
            
            {/* Newsletter */}
            <div className="relative">
              <motion.input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                className="absolute right-1 top-1 px-4 py-1.5 rounded-md text-white text-sm font-medium"
                style={{ backgroundColor: '#4F46E5' }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#4F46E5] transition relative group"
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-[#4F46E5]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#4F46E5] transition relative group"
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-[#4F46E5]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#4f46e5] transition relative group"
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-[#4F46E5]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider with Glow */}
        <motion.div
          className="relative h-px bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute inset-0 blur-sm"
            style={{ backgroundColor: '#4F46E5' }}
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.p
            className="text-gray-600 text-sm"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} Relax Packers & Movers. All rights reserved.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            className="flex gap-4"
            variants={itemVariants}
          >
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-xl overflow-hidden"
                onHoverStart={() => setHoveredSocial(index)}
                onHoverEnd={() => setHoveredSocial(null)}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  borderColor: '#4F46E5'
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {/* Glowing Background on Hover */}
                {hoveredSocial === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: '#4F46E5' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 0.2,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Glow Effect */}
                {hoveredSocial === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full blur-lg"
                    style={{ backgroundColor: '#4F46E5' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1.5, 
                      opacity: 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <span className="relative z-10">{social.icon}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative px-6 py-2 rounded-full text-white font-medium overflow-hidden"
            style={{ backgroundColor: '#4F46E5' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1, 
                opacity: 0.2,
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              ↑ Back to Top
            </span>
            
            {/* Glow on Hover */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: '#4F46E5' }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  )
}

export default Packer_Footer
