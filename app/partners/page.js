"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react";
import { Building2, Shield, Award, Users, Target, Globe, Handshake, Star, ChevronRight, MapPin, Clock, CheckCircle } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const partnerCategories = [
  {
    id: "steel",
    name: "Steel & Manufacturing",
    icon: Building2,
    description: "Leading steel and manufacturing corporations",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "cement",
    name: "Cement & Construction",
    icon: Award,
    description: "Top cement and construction material companies",
    color: "from-gray-600 to-gray-800"
  },
  {
    id: "banking",
    name: "Banking & Finance",
    icon: Shield,
    description: "Major banking and financial institutions",
    color: "from-green-500 to-blue-500"
  },
  {
    id: "corporate",
    name: "Corporate Houses",
    icon: Users,
    description: "Diverse corporate business groups",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "logistics",
    name: "Logistics Partners",
    icon: Globe,
    description: "Strategic logistics and supply chain partners",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "household",
    name: "Household Brands",
    icon: Target,
    description: "Leading consumer and household brands",
    color: "from-teal-500 to-green-500"
  }
]

const partnersData = {
  steel: [
    {
      id: 1,
      name: "Tata Steel",
      logo: "/partners/tata-steel.png",
      since: "2018",
      projects: "150+",
      description: "Strategic partner for employee relocation and plant equipment transportation",
      services: ["Employee Relocation", "Plant Equipment", "Office Shifting"],
      locations: ["Jamshedpur", "Kolkata", "Mumbai"],
      featured: true
    },
    {
      id: 2,
      name: "JSW Steel",
      logo: "/partners/jsw-steel.png",
      since: "2019",
      projects: "120+",
      description: "Exclusive logistics partner for corporate relocation and industrial moves",
      services: ["Corporate Relocation", "Industrial Moving", "Machinery Transport"],
      locations: ["Vijayanagar", "Mumbai", "Chennai"],
      featured: true
    },
    {
      id: 3,
      name: "SAIL",
      logo: "/partners/sail.png",
      since: "2017",
      projects: "95+",
      description: "Trusted partner for steel plant employee relocation across India",
      services: ["Employee Transfer", "Plant Relocation", "Equipment Moving"],
      locations: ["Bokaro", "Bhilai", "Durgapur"]
    },
    {
      id: 4,
      name: "ArcelorMittal",
      logo: "/partners/arcelor.png",
      since: "2020",
      projects: "65+",
      description: "International standard relocation services for global steel giant",
      services: ["Expat Relocation", "Office Setup", "Technical Equipment"],
      locations: ["Delhi", "Mumbai", "Bangalore"]
    }
  ],
  cement: [
    {
      id: 1,
      name: "Konark Cement",
      logo: "/partners/konark.png",
      since: "2016",
      projects: "200+",
      description: "Long-standing partnership for plant equipment and employee relocation",
      services: ["Plant Equipment", "Employee Housing", "Office Infrastructure"],
      locations: ["Orissa", "Kolkata", "Hyderabad"],
      featured: true
    },
    {
      id: 2,
      name: "UltraTech Cement",
      logo: "/partners/ultratech.png",
      since: "2019",
      projects: "135+",
      description: "Preferred relocation partner for India's largest cement company",
      services: ["Factory Relocation", "Staff Transfer", "Machinery Moving"],
      locations: ["Mumbai", "Ahmedabad", "Pune"]
    },
    {
      id: 3,
      name: "Ambuja Cement",
      logo: "/partners/ambuja.png",
      since: "2018",
      projects: "110+",
      description: "Reliable logistics partner for cement manufacturing facilities",
      services: ["Plant Shifting", "Employee Relocation", "Equipment Transport"],
      locations: ["Mumbai", "Delhi", "Chennai"]
    }
  ],
  banking: [
    {
      id: 1,
      name: "State Bank of India",
      logo: "/partners/sbi.png",
      since: "2015",
      projects: "300+",
      description: "Official relocation partner for branch network expansion and employee transfers",
      services: ["Branch Setup", "Employee Transfer", "ATM Relocation"],
      locations: ["Pan India", "Major Metros"],
      featured: true
    },
    {
      id: 2,
      name: "HDFC Bank",
      logo: "/partners/hdfc.png",
      since: "2017",
      projects: "180+",
      description: "Exclusive partner for corporate office and branch relocation services",
      services: ["Office Relocation", "Branch Setup", "Data Center Moving"],
      locations: ["Mumbai", "Delhi", "Bangalore"]
    },
    {
      id: 3,
      name: "ICICI Bank",
      logo: "/partners/icici.png",
      since: "2018",
      projects: "150+",
      description: "Trusted relocation services for banking infrastructure and staff",
      services: ["Bank Shifting", "Staff Relocation", "Equipment Moving"],
      locations: ["Mumbai", "Delhi", "Hyderabad"]
    },
    {
      id: 4,
      name: "Axis Bank",
      logo: "/partners/axis.png",
      since: "2019",
      projects: "120+",
      description: "Strategic partner for seamless branch and office relocations",
      services: ["Branch Relocation", "Office Setup", "Employee Transfer"],
      locations: ["Mumbai", "Gurgaon", "Chennai"]
    }
  ],
  corporate: [
    {
      id: 1,
      name: "Reliance Industries",
      logo: "/partners/reliance.png",
      since: "2016",
      projects: "250+",
      description: "Comprehensive relocation partner for diverse business verticals",
      services: ["Corporate Relocation", "Employee Transfer", "Office Setup"],
      locations: ["Mumbai", "Delhi", "Bangalore"],
      featured: true
    },
    {
      id: 2,
      name: "Aditya Birla Group",
      logo: "/partners/birla.png",
      since: "2017",
      projects: "190+",
      description: "Preferred relocation services across multiple group companies",
      services: ["Group Relocation", "Staff Transfer", "Office Moving"],
      locations: ["Mumbai", "Kolkata", "Pune"]
    },
    {
      id: 3,
      name: "Mahindra Group",
      logo: "/partners/mahindra.png",
      since: "2018",
      projects: "140+",
      description: "Strategic partner for automotive and IT business relocation",
      services: ["Factory Relocation", "IT Office Moving", "Employee Transfer"],
      locations: ["Mumbai", "Chennai", "Bangalore"]
    }
  ],
  logistics: [
    {
      id: 1,
      name: "DHL Supply Chain",
      logo: "/partners/dhl.png",
      since: "2019",
      projects: "85+",
      description: "Strategic alliance for integrated logistics solutions",
      services: ["Warehouse Relocation", "Supply Chain", "Inventory Moving"],
      locations: ["Pan India"],
      featured: true
    },
    {
      id: 2,
      name: "Blue Dart",
      logo: "/partners/bluedart.png",
      since: "2018",
      projects: "75+",
      description: "Collaborative partnership for express logistics support",
      services: ["Express Logistics", "Document Transfer", "Small Package"],
      locations: ["Major Cities"]
    }
  ],
  household: [
    {
      id: 1,
      name: "Hindustan Unilever",
      logo: "/partners/hul.png",
      since: "2017",
      projects: "160+",
      description: "Relocation partner for corporate offices and manufacturing units",
      services: ["Office Relocation", "Factory Moving", "Staff Transfer"],
      locations: ["Mumbai", "Kolkata", "Bangalore"],
      featured: true
    },
    {
      id: 2,
      name: "ITC Limited",
      logo: "/partners/itc.png",
      since: "2018",
      projects: "130+",
      description: "Multi-division relocation services for FMCG major",
      services: ["Hotel Relocation", "Office Moving", "Factory Shifting"],
      locations: ["Kolkata", "Delhi", "Bengaluru"]
    },
    {
      id: 3,
      name: "P&G India",
      logo: "/partners/pg.png",
      since: "2019",
      projects: "95+",
      description: "Preferred partner for corporate and manufacturing relocation",
      services: ["Corporate Office", "Manufacturing Unit", "R&D Center"],
      locations: ["Mumbai", "Hyderabad", "Goa"]
    }
  ]
}

const achievements = [
  { number: "500+", label: "Corporate Partners", icon: Handshake },
  { number: "2000+", label: "Projects Completed", icon: Award },
  { number: "50+", label: "Cities Covered", icon: MapPin },
  { number: "98%", label: "Client Satisfaction", icon: Star }
]

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState("steel")
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredPartner, setHoveredPartner] = useState(null)

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner)
    setIsModalOpen(true)
  }

  const CategoryIcon = partnerCategories.find(cat => cat.id === activeCategory)?.icon || Building2

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-6">
              <Handshake size={20} />
              <span className="font-semibold">Strategic Alliances</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-6">
              Our Esteemed
              <span className="block">Partners</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trusted by India's leading corporations and institutions for seamless relocation and logistics solutions
            </p>
          </motion.div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {achievement.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Category Navigation */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {partnerCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} />
                  {category.name}
                </motion.button>
              )
            })}
          </motion.div>
        </section>

        {/* Active Category Header */}
        <motion.section
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-r ${
              partnerCategories.find(cat => cat.id === activeCategory)?.color
            } rounded-2xl flex items-center justify-center`}>
              <CategoryIcon className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {partnerCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {partnerCategories.find(cat => cat.id === activeCategory)?.description}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Partners Grid */}
        <section className="mb-16">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {partnersData[activeCategory]?.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 cursor-pointer group ${
                  partner.featured 
                    ? 'border-blue-500 shadow-2xl transform hover:scale-105' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-2xl'
                }`}
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
                onClick={() => handlePartnerClick(partner)}
              >
                <div className="p-6">
                  {/* Partner Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                      <Building2 className="text-gray-600" size={24} />
                    </div>
                    {partner.featured && (
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                        <Star size={14} className="fill-blue-600" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Partner Info */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {partner.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      Since {partner.since}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={14} />
                      {partner.projects} projects
                    </div>
                  </div>

                  {/* Services Preview */}
                  <div className="flex flex-wrap gap-2">
                    {partner.services.slice(0, 2).map((service, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                    {partner.services.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        +{partner.services.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Hover Action */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredPartner === partner.id ? 1 : 0,
                      y: hoveredPartner === partner.id ? 0 : 10
                    }}
                    className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100"
                  >
                    <span className="text-blue-600 text-sm font-semibold">View Details</span>
                    <ChevronRight size={16} className="text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become Our Partner
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join India's leading corporations who trust Relax Packers & Movers for their relocation needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Partner With Us
              </motion.button>
              <motion.button
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Brochure
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Partner Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                      <Building2 className="text-gray-600" size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedPartner.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        Partner since {selectedPartner.since}
                        {selectedPartner.featured && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                              <Star size={12} className="fill-blue-600" />
                              Featured Partner
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedPartner.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {selectedPartner.projects}
                    </div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {selectedPartner.since}
                    </div>
                    <div className="text-sm text-gray-600">Years of Partnership</div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-500" />
                    Services Provided
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPartner.services.map((service, index) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {service}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-red-500" />
                    Service Locations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartner.locations.map((location, index) => (
                      <motion.span
                        key={location}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-blue-50 text-blue-600 px-3 py-2 rounded-xl text-sm font-medium"
                      >
                        {location}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  )
}