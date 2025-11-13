'use client'
import { motion } from 'framer-motion'

const testimonials = [
{
name: "Priya Das",
text: "Excellent service! My parcel reached within 4 hours. Highly recommended!",
rating: 5,
location: "Homemaker",
avatar: "👩" // Female emoji
},
{
name: "Rohit Kumar",
text: "Affordable and reliable. I use Relax Packers for all my deliveries.",
rating: 4,
location: "Business Owner",
avatar: "👨" // Male emoji
},
{
name: "Anjali Mishra",
text: "Friendly staff, quick response, and safe handling of fragile goods.",
rating: 4,
location: "IT Professional",
avatar: "👩‍💼" // Professional woman emoji
},
]

// Star Rating Component
function StarRating({ rating }) {
const fullStars = Math.floor(rating)
const hasHalfStar = rating % 1 !== 0

return (
<div className="flex items-center justify-center gap-1 mb-4">
{[...Array(5)].map((_, index) => {
if (index < fullStars) {
return (
<span key={index} className="text-yellow-500 text-xl">★</span>
)
} else if (index === fullStars && hasHalfStar) {
return (
<span key={index} className="text-yellow-500 text-xl relative">
<span className="absolute">☆</span>
<span className="absolute overflow-hidden" style={{ width: '50%' }}>★</span>
</span>
)
} else {
return (
<span key={index} className="text-gray-300 text-xl">☆</span>
)
}
})}
<span className="ml-2 text-sm text-gray-600 font-semibold">{rating}</span>
</div>
)
}

export default function Testimonials({ districtName }) {
return (
<section id="testimonials" className="py-20 bg-gray-50">
<div className="max-w-6xl mx-auto px-6 text-center">
<motion.h2
className="text-3xl font-bold mb-4"
style={{ color: '#a4723d' }}
initial={{ opacity: 0, y: -20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
>
What Our Customers in {districtName} Say
</motion.h2>
<motion.p
className="text-gray-600 mb-12"
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.2 }}
>
 feedback from satisfied customers across {districtName}
</motion.p>

    <div className="grid md:grid-cols-3 gap-10">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -7, scale: 1.03 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow relative"
        >
          {/* Profile Avatar - NEW */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl shadow-md"
            style={{ backgroundColor: '#f8f5f1', border: '3px solid #a4723d' }}
          >
            {t.avatar}
          </motion.div>

          {/* Rating Stars */}
          <StarRating rating={t.rating} />
          
          {/* Testimonial Text */}
          <p className="text-gray-700 italic mb-4 leading-relaxed">
            &quot;{t.text}&quot;
          </p>
          
          {/* Customer Info */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-lg" style={{ color: '#a4723d' }}>
              {t.name}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {t.location}, {districtName}
            </p>
          </div>
          
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-4xl text-[#a4723d] opacity-10">
            &ldquo;
          </div>
        </motion.div>
      ))}
    </div>
    
    {/* Trust Badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="mt-12 inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md"
    >
      <span className="text-2xl">⭐</span>
      <div className="text-left">
        <div className="font-bold text-lg" style={{ color: '#a4723d' }}>4.9/5</div>
        <div className="text-xs text-gray-600">Based on 5000+ reviews in {districtName}</div>
      </div>
    </motion.div>
  </div>
</section>
)
}