'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    question: "How much do your packers and movers services cost?",
    answer: "Our pricing depends on the distance, volume of goods, and type of service required. We offer transparent pricing with no hidden charges. Contact us for a free quote tailored to your specific needs."
  },
  {
    question: "Do you provide packing materials?",
    answer: "Yes! We provide high-quality packing materials including boxes, bubble wrap, packing paper, tape, and specialized materials for fragile items. All materials are included in our comprehensive service packages."
  },
  {
    question: "How long does the moving process take?",
    answer: "Local moves within the same city typically take 4-8 hours. Interstate moves can take 2-5 days depending on the distance. We provide same-day delivery options for urgent local relocations."
  },
  {
    question: "Is my household goods insured during transit?",
    answer: "Absolutely! We offer comprehensive insurance coverage for all your belongings during transit. In the rare event of damage or loss, our insurance policy ensures you're fully compensated."
  },
  {
    question: "Can you help with unpacking at the new location?",
    answer: "Yes, we offer complete unpacking services. Our team will carefully unpack your items, place them in designated rooms, and even help with basic furniture assembly if needed."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept multiple payment methods including cash, UPI, bank transfer, credit/debit cards, and digital wallets. Payment can be made after successful delivery of your goods."
  },
  {
    question: "Do you move plants and pets?",
    answer: "We can relocate indoor plants with proper care. However, for pet relocation, we recommend specialized pet transport services. We can provide trusted referrals for pet moving services."
  },
  {
    question: "How far in advance should I book your services?",
    answer: "We recommend booking at least 2-3 days in advance for local moves and 5-7 days for interstate relocations. However, we also accommodate last-minute bookings based on availability."
  },
]

function FAQItem({ faq, index, isOpen, toggleOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => toggleOpen(index)}
        className="w-full py-6 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-lg"
      >
        <span className="text-lg font-semibold text-gray-900 pr-8">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold flex-shrink-0"
          style={{ color: '#a4723d' }}
        >
          {isOpen ? '−' : '+'}
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ({ districtName }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#a4723d' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about our packers and movers services in {districtName}
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center p-8 bg-gradient-to-r from-[#f8f5f1] to-white rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#a4723d' }}>
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is ready to help you with any queries about your move in {districtName}
          </p>
          <a
            href={`https://wa.me/919777012315?text=Hi, I have a question about your services in ${districtName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition hover:scale-105"
          >
            <span className="text-xl">💬</span>
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}