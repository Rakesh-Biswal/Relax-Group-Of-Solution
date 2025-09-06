"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Send, Phone, MapPin, User, Truck } from "lucide-react"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: ""
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      // Prepare Brevo email payload
      const emailPayload = {
        sender: {
          name: "Relax Packers Website",
          email: "rb2306114@gmail.com"
        },
        to: [
          {
            email: "bookrelaxpackers@gmail.com",
            name: "Relax Packers Team"
          }
        ],
        subject: `New Moving Inquiry from ${formData.name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .detail { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚚 New Moving Inquiry</h1>
                <p>You have received a new moving request from your website</p>
              </div>
              <div class="content">
                <div class="detail">
                  <strong>👤 Customer Name:</strong> ${formData.name}
                </div>
                <div class="detail">
                  <strong>📞 Phone Number:</strong> ${formData.phone}
                </div>
                <div class="detail">
                  <strong>🏙️ City:</strong> ${formData.city}
                </div>
                <div class="footer">
                  <p>This inquiry was submitted through relaxpackers.com</p>
                  <p>📍 Relax Packers & Movers - Your Trusted Moving Partner</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
          New Moving Inquiry from ${formData.name}
          Phone: ${formData.phone}
          City: ${formData.city}
          
          This inquiry was submitted through relaxpackers.com
          Relax Packers & Movers - Your Trusted Moving Partner
        `
      }

      // Send email using Brevo API
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
        },
        body: JSON.stringify(emailPayload),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({
          name: "",
          phone: "",
          city: ""
        })
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container section mt-20 md:mt-28 lg:mt-36">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full mb-4">
          <Truck size={18} className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Get Free Quote</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Start Your Moving Journey
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get a free, no-obligation quote for your relocation. Our team will contact you within 30 minutes.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background Elements */}
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-3xl -z-10 blur-xl"></div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <form onSubmit={onSubmit} className="p-8 md:p-10">
            <div className="space-y-6 mb-6">
              {/* Name Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <User size={20} className="absolute left-4 top-11 text-gray-400" />
              </motion.div>

              {/* Phone Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <Phone size={20} className="absolute left-4 top-11 text-gray-400" />
              </motion.div>

              {/* City Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  City *
                </label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <MapPin size={20} className="absolute left-4 top-11 text-gray-400" />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending Inquiry...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Get Free Quote
                </>
              )}
            </motion.button>

            {/* Status Message */}
            {status && (
              <motion.div
                className={`mt-4 p-4 rounded-xl text-center ${status === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {status === "success"
                  ? "✅ Thank you! We've received your inquiry and will contact you within 30 minutes."
                  : "❌ Something went wrong. Please try again or call us directly."
                }
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        className="text-center mt-12 md:mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="text-gray-600 mb-4">Prefer to talk directly?</p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="tel:+919777012315"
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-md border border-gray-100 cursor-pointer"
          >
            <Phone size={20} className="text-blue-600" />
            <span className="font-semibold text-gray-800">+91 97770 12315</span>
          </a>

        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute left-0 right-0 -z-10 opacity-5">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}