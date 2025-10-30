"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, Truck, Shield, Users, Award, ArrowLeft } from "lucide-react"

export default function ContactPage() {
  const [isOdia, setIsOdia] = useState(false)

  const contactInfo = {
    primaryPhone: "+91 97770 12315",
    secondaryPhone: "+91 96920 12315",
    email: "bookrelaxpackers@gmail.com",
    address: "KHATA NO- 313/143, PLOT NO- 945/1260, TANGARHUDA, SATINAGAR, MARKAT NAGAR",
    city: "Cuttack, Odisha - 753014",
    workingHours: "24/7 Customer Support",
    emergencySupport: "Available"
  }

  const branchOffices = [
    {
      city: "Bhubaneswar",
      phone: "+91 97770 12315",
      address: "Main Road, Bhubaneswar, Odisha",
      type: "Regional Office"
    },
    {
      city: "Puri",
      phone: "+91 97770 12315", 
      address: "Sea Beach Road, Puri, Odisha",
      type: "Branch Office"
    },
    {
      city: "Sambalpur",
      phone: "+91 97770 12315",
      address: "VSS Nagar, Sambalpur, Odisha",
      type: "Branch Office"
    },
    {
      city: "Rourkela",
      phone: "+91 97770 12315",
      address: "Udit Nagar, Rourkela, Odisha",
      type: "Service Center"
    }
  ]

  const services = [
    {
      icon: Truck,
      title: "Home Relocation",
      description: "Complete home shifting with professional packing"
    },
    {
      icon: Users,
      title: "Office Shifting",
      description: "Commercial relocation for businesses"
    },
    {
      icon: Shield,
      title: "Courier Services",
      description: "Secure parcel delivery across India"
    },
    {
      icon: Award,
      title: "Premium Services",
      description: "VIP and special item handling"
    }
  ]

  const content = {
    en: {
      title: "Contact Relax Packers & Movers",
      subtitle: "Your Trusted Moving Partner Across India",
      description: "Get in touch with India's most reliable packers and movers service. We're here to make your relocation experience smooth and stress-free.",
      contactHeader: "Get Immediate Assistance",
      headquarters: "Headquarters",
      branchOffices: "Branch Offices", 
      ourServices: "Our Services",
      callNow: "Call Now",
      whatsapp: "WhatsApp",
      sendEmail: "Send Email",
      visitOffice: "Visit Office",
      available24x7: "Available 24/7",
      emergencySupport: "Emergency Support",
      trustedBy: "Trusted by 10,000+ Families",
      serviceAreas: "Service Areas Across India"
    },
    or: {
      title: "ରିଲାକ୍ସ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ",
      subtitle: "ଭାରତର ବିଶ୍ୱସ୍ତ ମୁଭିଂ ପାର୍ଟନର",
      description: "ଭାରତର ସବୁଠାରୁ ବିଶ୍ୱସ୍ତ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ ସେବା ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ। ଆପଣଙ୍କ ଘରବଦଳ ଅନୁଭବକୁ ସୁଗମ ଏବଂ ଚିନ୍ତାମୁକ୍ତ କରିବା ପାଇଁ ଆମେ ଏଠାରେ ଅଛୁ |",
      contactHeader: "ତୁରନ୍ତ ସହାୟତା ପାଆନ୍ତୁ",
      headquarters: "ମୁଖ୍ୟାଳୟ",
      branchOffices: "ଶାଖା କାର୍ଯ୍ୟାଳୟ",
      ourServices: "ଆମର ସେବାସମୂହ",
      callNow: "ଏବେ କଲ୍ କରନ୍ତୁ",
      whatsapp: "ହ୍ୱାଟସଆପ୍",
      sendEmail: "ଇମେଲ ପଠାନ୍ତୁ",
      visitOffice: "ଅଫିସ୍ ଯାଆନ୍ତୁ",
      available24x7: "୨୪/୭ ଉପଲବ୍ଧ",
      emergencySupport: "ଜରୁରୀ ସହାୟତା",
      trustedBy: "୧୦,୦୦୦+ ପରିବାର ବିଶ୍ୱାସ କରନ୍ତି",
      serviceAreas: "ସମସ୍ତ ଭାରତରେ ସେବା"
    }
  }

  const currentContent = isOdia ? content.or : content.en

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Back Button */}
      <motion.div
        className="container pt-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={() => window.history.back()}
          className="group flex items-center gap-3 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300 mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{isOdia ? "ପୂର୍ବବର୍ତ୍ତୀ ପେଜ୍" : "Back to Previous"}</span>
        </motion.button>
      </motion.div>

      {/* Language Toggle */}
      <motion.div 
        className="container px-4 sm:px-6 lg:px-8 flex justify-end -mt-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button
          onClick={() => setIsOdia(!isOdia)}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-white/20 text-slate-700 hover:text-slate-900 transition-colors duration-300 font-medium"
        >
          <span>{isOdia ? "English" : "Odia"}</span>
          <div className={`w-8 h-4 rounded-full transition-all duration-300 ${isOdia ? 'bg-green-500' : 'bg-slate-300'}`}>
            <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 transform ${isOdia ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
          </div>
        </button>
      </motion.div>

      <div className="container py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MessageCircle size={20} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              {currentContent.available24x7}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            {currentContent.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4">
            {currentContent.subtitle}
          </p>

          <p className="text-slate-600 max-w-2xl mx-auto">
            {currentContent.description}
          </p>
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* Primary Contact Card */}
          <motion.div
            className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{currentContent.contactHeader}</h2>
                <p className="text-slate-600">{currentContent.trustedBy}</p>
              </div>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Phone Call */}
              <motion.a
                href={`tel:${contactInfo.primaryPhone}`}
                className="flex items-center gap-4 p-6 bg-green-50 rounded-2xl border border-green-200 hover:bg-green-100 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{currentContent.callNow}</h3>
                  <p className="text-slate-600 text-sm mb-2">{contactInfo.primaryPhone}</p>
                  <span className="text-xs text-green-600 font-semibold">{currentContent.available24x7}</span>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={`https://wa.me/${contactInfo.primaryPhone.replace('+', '').replace(/\s/g, '')}`}
                target="_blank"
                className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-200 hover:bg-blue-100 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{currentContent.whatsapp}</h3>
                  <p className="text-slate-600 text-sm mb-2">{contactInfo.primaryPhone}</p>
                  <span className="text-xs text-blue-600 font-semibold">Quick Response</span>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-6 bg-purple-50 rounded-2xl border border-purple-200 hover:bg-purple-100 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{currentContent.sendEmail}</h3>
                  <p className="text-slate-600 text-sm">{contactInfo.email}</p>
                </div>
              </motion.a>

              {/* Office Visit */}
              <motion.div
                className="flex items-center gap-4 p-6 bg-orange-50 rounded-2xl border border-orange-200 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{currentContent.visitOffice}</h3>
                  <p className="text-slate-600 text-sm">{currentContent.headquarters}</p>
                </div>
              </motion.div>
            </div>

            {/* Emergency Support */}
            <motion.div
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-lg">{currentContent.emergencySupport}</h3>
                  <p className="text-red-600 text-sm">
                    {isOdia 
                      ? "ଜରୁରୀ ଘରବଦଳ ଆବଶ୍ୟକ? ଏବେ କଲ୍ କରନ୍ତୁ"
                      : "Need emergency relocation? Call now for immediate assistance"
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Headquarters Information */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{currentContent.headquarters}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">{isOdia ? "ମୁଖ୍ୟାଳୟ ଠିକଣା" : "Head Office Address"}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {contactInfo.address}<br />
                    {contactInfo.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">{isOdia ? "କାର୍ଯ୍ୟ ସମୟ" : "Office Hours"}</h3>
                  <p className="text-slate-600 text-sm">
                    {isOdia ? "ସୋମବାର - ରବିବାର" : "Monday - Sunday"}<br />
                    {isOdia ? "ସକାଳ ୮ଟା - ରାତି ୮ଟା" : "8:00 AM - 8:00 PM"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">{isOdia ? "ଅତିରିକ୍ତ ନମ୍ବର" : "Additional Contact"}</h3>
                  <a href={`tel:${contactInfo.secondaryPhone}`} className="text-slate-600 hover:text-purple-600 transition-colors duration-200 text-sm">
                    {contactInfo.secondaryPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">{currentContent.serviceAreas}</h3>
              <div className="flex flex-wrap gap-2">
                {["Odisha", "Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata"].map((city, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Branch Offices Section */}
        <motion.div
          className="max-w-7xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">{currentContent.branchOffices}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branchOffices.map((office, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 text-center group hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{office.city}</h3>
                <p className="text-slate-600 text-sm mb-3">{office.type}</p>
                <a href={`tel:${office.phone}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  {office.phone}
                </a>
                <p className="text-slate-500 text-xs mt-2">{office.address}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Overview */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">{currentContent.ourServices}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 text-center group hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  )
}