"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Truck, Shield, Clock, Users, Award, Star, MapPin, Phone, Mail, Heart, Target, Globe, Calculator } from "lucide-react"

// Animation component
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const StatsCard = ({ number, label, icon: Icon, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const increment = number / 50
        let current = 0
        const counter = setInterval(() => {
          current += increment
          if (current >= number) {
            setCount(number)
            clearInterval(counter)
          } else {
            setCount(Math.floor(current))
          }
        }, 30)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, number, delay])

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="text-white" size={28} />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {count}+
      </div>
      <div className="text-gray-600 font-semibold">{label}</div>
    </motion.div>
  )
}

const TeamMember = ({ name, role, image, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      className="text-center group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
    >
      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1 group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
          {/* Replace with actual image */}
          <Users size={48} />
        </div>
      </div>
      <h3 className="font-bold text-gray-800 text-lg mb-1">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </motion.div>
  )
}

export default function AboutUs() {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Your belongings are handled with utmost care and protected with comprehensive insurance coverage."
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "We pride ourselves on punctuality with a 99% on-time delivery record across all our services."
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "Building lasting relationships through exceptional service and personalized moving experiences."
    },
    {
      icon: Target,
      title: "Precision",
      description: "Meticulous planning and execution for seamless, hassle-free relocation experiences."
    }
  ]

  const teamMembers = [
    { name: "Badal Behera", role: "Founder & CEO" },
    { name: "Rakesh Biswal", role: "Software Developer & Marketing Lead" },
    { name: "Amit Patel", role: "Logistics Head" },
    { name: "Sneha Reddy", role: "Customer Success" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Truck size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">Since 2010</span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                  Your Trusted Moving
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Partner</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  For over a decade, Relax Packers & Movers has been transforming relocation experiences across India with professionalism, care, and reliability.
                </p>

                <motion.div
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <Star className="text-yellow-500" size={16} />
                    <span className="text-sm font-semibold">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <Award className="text-blue-500" size={16} />
                    <span className="text-sm font-semibold">Award Winning</span>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative">
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Replace with actual image */}
                <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <Truck size={64} className="mx-auto mb-4" />
                    <p className="text-lg font-semibold">Relax Packers & Movers</p>
                    <p className="text-blue-100">Your Trusted Moving Partner</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-500" size={20} />
                    <span className="font-semibold text-sm">Insured</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="text-blue-500" size={20} />
                    <span className="font-semibold text-sm">24/7 Support</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Numbers That Speak
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our journey in numbers - delivering excellence across India
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatsCard number={5000} label="Happy Families" icon={Users} delay={0} />
            <StatsCard number={250} label="Cities Covered" icon={MapPin} delay={200} />
            <StatsCard number={98} label="Success Rate" icon={Target} delay={400} />
            <StatsCard number={24} label="Hours Support" icon={Clock} delay={600} />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Story</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded in 2010, Relax Packers & Movers began with a simple mission: to make relocation stress-free for every Indian family. What started as a small local service in Odisha has grown into a trusted national brand.
                </p>
                
                <p>
                  Our founder, Rajesh Kumar, recognized the anxiety and challenges families face during relocation. He envisioned a service that not only moves belongings but also peace of mind from one location to another.
                </p>
                
                <p>
                  Today, we operate across 250+ cities with a team of 150+ trained professionals, maintaining our core values of reliability, transparency, and customer-centric service.
                </p>
              </div>

              <motion.div
                className="flex items-center gap-4 mt-8 p-6 bg-blue-50 rounded-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Target className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Our Mission</h3>
                  <p className="text-gray-600">To provide seamless, reliable, and affordable relocation services that exceed customer expectations.</p>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Globe className="mb-4" size={32} />
                  <h3 className="font-bold text-lg mb-2">Pan-India Presence</h3>
                  <p className="text-blue-100">Serving customers across 250+ cities with reliable network</p>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Award className="mb-4" size={32} />
                  <h3 className="font-bold text-lg mb-2">Award Winning</h3>
                  <p className="text-purple-100">Recognized as Best Packers & Movers 2023</p>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Shield className="mb-4" size={32} />
                  <h3 className="font-bold text-lg mb-2">Fully Insured</h3>
                  <p className="text-green-100">Complete insurance coverage for your valuable items</p>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Users className="mb-4" size={32} />
                  <h3 className="font-bold text-lg mb-2">Expert Team</h3>
                  <p className="text-orange-100">150+ trained professionals ensuring quality service</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every service we deliver
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-gray-800 text-xl mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate professionals behind your seamless moving experience
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container">
          <AnimatedSection className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Move With Confidence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Relax Packers & Movers for their relocation needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="tel:+919777012315"
                className="flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                Call Now: +91 97770 12315
              </motion.a>
              
              <motion.a
                href="/dashboard/pricing"
                className="flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calculator size={20} />
                Get Free Quote
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}