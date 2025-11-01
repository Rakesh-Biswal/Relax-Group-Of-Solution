"use client"

import { motion } from "framer-motion"
import {
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  IndianRupee
} from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear())

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Truck size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold">Relax Packers</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for stress-free packing and moving services across India.
              Professional, reliable, and insured moving solutions since 2012.
            </p>

            {/* Business Credentials */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-green-400" />
                <span className="text-sm text-gray-300">GSTIN: 21BUQPN8897R1Z8</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={18} className="text-amber-400" />
                <span className="text-sm text-gray-300">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <IndianRupee size={18} className="text-blue-400" />
                <span className="text-sm text-gray-300">PAN: BUQPN8897r</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ArrowRight size={18} className="text-blue-400" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Home Relocation",
                "Office Shifting",
                "Intercity Moving",
                "Local Moving",
                "Packing Services",
                "Storage Solutions",
                "Vehicle Transportation",
                "International Moving"
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <MapPin size={18} className="text-red-400" />
              Our Network Across India
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Odisha",
                "Maharashtra",
                "Delhi",
                "Karnataka",
                "Telangana",
                "Tamil Nadu",
                "West Bengal",
                "Gujarat",
                "Rajasthan",
                "Uttar Pradesh",
                "Bihar",
                "Punjab",
                "Haryana",
                "Chhattisgarh",
                "Andhra Pradesh",
                "Jharkhand",
                "Assam",
                "Goa",
                "Himachal Pradesh",
                "Kerala"
              ].map((city, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  <span className="text-sm text-gray-300">{city}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
              <p className="text-xs text-blue-300 text-center">
                🚚 Serving 50+ Cities Across India
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Phone size={18} className="text-green-400" />
              Contact Info
            </h4>

            {/* Head Office */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-white mb-2">Head Office</h5>
              <div className="flex items-start gap-3 mb-3">
                <MapPin size={16} className="text-red-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  TANGARHUDA, SATINAGAR,<br />
                  KHATA NO- 313/143 PLOT NO- 945/1260, PO-MARKAT NAGAR,<br />
                  PS- BIDANASI, Cuttack, Cuttack, Odisha, 753014
                </p>
              </div>
            </div>

            {/* Branch Offices */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-white mb-3">
                Our Branches Across Odisha
              </h5>
              <div className="space-y-2">
                {/* Cuttack */}
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://share.google/bTbiOIYbTVBuuliw8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-300 transition-colors"
                  >
                    📍 Tulsipur, Bijiupatnaik Chhak, Cuttack, Odisha 753008
                  </a>
                </div>

                {/* Bhubaneswar */}
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://share.google/VGUxX1pvIDQhuOyFK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-300 transition-colors"
                  >
                    📍 Sai Mandir, Tankapani Rd, Laxmi Vihar, Baragarh, Bhubaneswar, Odisha 751002
                  </a>
                </div>

                {/* Dhenkanal */}
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://share.google/GnGoirDZpN3VuEjUj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-300 transition-colors"
                  >
                    📍 Main Road, Dhenkanal, Odisha
                  </a>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>📍 Shanti Nagar, Jagdalpur, Chhattisgarh</span>
                </div>

                {/* Remaining Branches */}
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>📍 Sital Vihar, Angul, Odisha</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>📍 Matha Sai, Balasore, Odisha</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>📍 Brahmanipali, Balangir, Odisha</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>📍 Similiguda, Koraput, Odisha</span>
                </div>
              </div>
            </div>


            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-green-400" />
                <div>
                  <p className="text-sm text-gray-300">+91 97770 12315</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400" />
                <p className="text-sm text-gray-300">bookrelaxpackers@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-amber-400" />
                <p className="text-sm text-gray-300">24/7 Customer Support</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: "text-blue-400", href: "https://www.facebook.com/share/1XKoaHzW7t/" },
                  { icon: Twitter, color: "text-cyan-400", href: "#" },
                  { icon: Instagram, color: "text-pink-400", href: "https://www.instagram.com/relax_packers_2315?utm_source=qr&igsh=ejZ0aXFpMzRsMnRq" },
                  { icon: Linkedin, color: "text-blue-500", href: "#" }
                ].map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200 ${social.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <h4 className="text-lg font-semibold mb-6 text-center flex items-center justify-center gap-2">
            <Award size={20} className="text-amber-400" />
            Awards & Recognition
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { year: "2023", award: "Best Packers Award", by: "Times Business" },
              { year: "2022", award: "Customer Excellence", by: "Business Today" },
              { year: "2021", award: "Most Trusted Movers", by: "Economic Times" },
              { year: "2020", award: "Service Quality Award", by: "India Today" }
            ].map((award, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-2xl font-bold text-amber-400 mb-2">{award.year}</div>
                <div className="text-sm font-semibold text-white mb-1">{award.award}</div>
                <div className="text-xs text-gray-400">by {award.by}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear} Relax Packers & Movers. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Shipping Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Refund Policy
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 flex items-center gap-2 justify-center md:justify-end">
                <Users size={14} />
                <span>Over 12,890+ Happy Families Moved</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}