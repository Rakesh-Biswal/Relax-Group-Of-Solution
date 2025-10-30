"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Clock, Users, Award, Star, MapPin, Phone, Heart, Target, Globe, Calculator, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"

// Animation component
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay }}
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
        const increment = number / 40
        let current = 0
        const counter = setInterval(() => {
          current += increment
          if (current >= number) {
            setCount(number)
            clearInterval(counter)
          } else {
            setCount(Math.floor(current))
          }
        }, 20)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, number, delay])

  return (
    <motion.div
      ref={ref}
      className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Icon className="text-white" size={32} />
      </div>
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
        {count}+
      </div>
      <div className="text-gray-700 font-semibold text-lg">{label}</div>
    </motion.div>
  )
}

const TeamMember = ({ name, role, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      className="text-center group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -12 }}
    >
      <div className="relative mb-6">
        <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-500 shadow-xl">
          <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
            <Users size={56} className="text-gray-400" />
          </div>
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          {role.split(' ')[0]}
        </div>
      </div>
      <h3 className="font-bold text-gray-800 text-xl mb-2">{name}</h3>
      <p className="text-gray-600 font-medium">{role}</p>
    </motion.div>
  )
}

export default function AboutUs() {
  const values = [
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Comprehensive insurance and careful handling of your valuable possessions",
      features: ["Full Insurance Coverage", "GPS Tracking", "Secure Packaging"]
    },
    {
      icon: Clock,
      title: "Punctuality",
      description: "99% on-time delivery record with real-time tracking updates",
      features: ["Real-time Tracking", "On-time Guarantee", "24/7 Monitoring"]
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Personalized service and dedicated support for every client",
      features: ["Dedicated Manager", "24/7 Support", "Custom Solutions"]
    },
    {
      icon: Target,
      title: "Precision",
      description: "Meticulous planning and execution for flawless relocation",
      features: ["Detailed Planning", "Quality Control", "Professional Team"]
    }
  ]

  const teamMembers = [
    { name: "Badal Behera", role: "Founder & CEO" },
    { name: "Rakesh Biswal", role: "Tech & Marketing Lead" },
    { name: "Amit Patel", role: "Operations Head" },
    { name: "Sneha Reddy", role: "Customer Success Manager" }
  ]

  const milestones = [
    { year: "2010", title: "Company Founded", description: "Started with a vision to revolutionize moving services" },
    { year: "2014", title: "1000+ Families", description: "Served over 1000 happy families across Odisha" },
    { year: "2018", title: "Pan-India Expansion", description: "Expanded services to 100+ cities nationwide" },
    { year: "2023", title: "Award Recognition", description: "Recognized as Best Packers & Movers in Eastern India" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Back Button */}
      <motion.div
        className="container pt-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => window.history.back()}
          className="group flex items-center gap-3 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection delay={0.2}>
              <div className="text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-slate-700">Trusted Since 2010</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 lg:mb-8 leading-tight">
                  We Move Your
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    World Safely
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 lg:mb-10 leading-relaxed font-light max-w-2xl">
                  Professional packers and movers dedicated to making your relocation experience seamless, secure, and stress-free across India.
                </p>

                <motion.div
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-md">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="text-yellow-500 fill-current" size={18} />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-md">
                    <Award className="text-blue-600" size={18} />
                    <span className="font-semibold text-slate-700 text-sm">Award Winning 2023</span>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="relative">
              <motion.div
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mx-auto max-w-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Main Image Container */}
                <div className="w-full aspect-square max-h-[500px] bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300 rounded-full blur-2xl"></div>
                  </div>
                  
                  <div className="text-white text-center relative z-10 p-8">
                    <motion.div
                      className="w-32 h-32 mx-auto mb-6 relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      {/* Replace with your actual logo - recommended size 128x128 pixels */}
                      <div className="w-full h-full bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">Relax</div>
                          <div className="text-white/80 text-sm">Packers & Movers</div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.h2
                      className="text-2xl sm:text-3xl font-bold mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      Relax Packers & Movers
                    </motion.h2>
                    <motion.p
                      className="text-blue-100 text-base sm:text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      Your Peace of Mind, Our Priority
                    </motion.p>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="text-green-600" size={20} />
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Insured</div>
                      <div className="text-xs text-slate-600">Full Coverage</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="text-blue-600" size={20} />
                    <div>
                      <div className="font-bold text-slate-800 text-sm">24/7</div>
                      <div className="text-xs text-slate-600">Support</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Excellence in Numbers
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Our commitment to quality service reflected through our achievements
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <StatsCard number={10000} label="Happy Families" icon={Users} delay={0.1} />
            <StatsCard number={500} label="Cities Covered" icon={MapPin} delay={0.3} />
            <StatsCard number={99} label="Success Rate" icon={Target} delay={0.5} />
            <StatsCard number={24} label="Hour Support" icon={Clock} delay={0.7} />
          </div>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <AnimatedSection delay={0.2}>
              <div className="lg:sticky lg:top-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6 lg:mb-8">
                  Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
                </h2>
                
                <div className="space-y-4 sm:space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed">
                  <p className="text-lg sm:text-xl text-slate-700 font-light">
                    Founded in 2010 with a vision to transform the relocation industry in India, Relax Packers & Movers has grown from a local service provider to a trusted national brand.
                  </p>
                  
                  <p>
                    Our founder, <strong>Badal Behera</strong>, recognized the stress and challenges families face during relocation. He envisioned a service that not only moves belongings but also transports peace of mind.
                  </p>
                  
                  <p>
                    Under the technical leadership of <strong>Rakesh Biswal</strong>, we've integrated cutting-edge technology to provide real-time tracking, instant quotes, and seamless customer experiences.
                  </p>

                  <p>
                    Today, we operate across 500+ cities with a dedicated team of professionals, maintaining our core values of reliability, transparency, and customer-centric service.
                  </p>
                </div>

                {/* Milestones */}
                <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0">
                        {milestone.year}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg sm:text-xl mb-1 sm:mb-2">{milestone.title}</h4>
                        <p className="text-slate-600 text-sm sm:text-base">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="space-y-6 sm:space-y-8">
                {/* Mission Card */}
                <motion.div
                  className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Target size={40} className="mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h3>
                  <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                    To revolutionize the relocation experience by providing seamless, secure, and affordable moving solutions that exceed customer expectations, backed by technology and trusted by families across India.
                  </p>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Globe size={40} className="mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Vision</h3>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    To become India's most trusted and technologically advanced packers and movers, setting new standards in reliability, customer service, and innovation in the relocation industry.
                  </p>
                </motion.div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">Why Choose Us?</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      "Advanced GPS Tracking System",
                      "Comprehensive Insurance Coverage",
                      "Professional Packing Materials",
                      "Trained & Verified Staff",
                      "24/7 Customer Support",
                      "Transparent Pricing"
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3 sm:gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                        <span className="text-slate-700 font-medium text-sm sm:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-white/80 backdrop-blur-sm">
        <div className="container px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light">
              The principles that guide every decision and define our commitment to excellence
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group text-center p-6 sm:p-8 bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl sm:text-2xl mb-3 sm:mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">{value.description}</p>
                <div className="space-y-2">
                  {value.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Leadership Team
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Meet the passionate professionals dedicated to your seamless moving experience
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.name}
                name={member.name}
                role={member.role}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center text-white" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Ready for a Stress-Free Move?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto font-light">
              Join thousands of satisfied families who trust Relax Packers & Movers for their relocation journey.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <motion.a
                href="tel:+919777012315"
                className="flex items-center justify-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base sm:text-lg">Call: +91 97770 12315</span>
              </motion.a>
              
              <motion.a
                href="/dashboard/pricing"
                className="flex items-center justify-center gap-3 sm:gap-4 bg-white text-slate-800 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calculator size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base sm:text-lg">Get Instant Quote</span>
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}