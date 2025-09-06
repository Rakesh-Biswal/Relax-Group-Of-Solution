"use client"

import Image from "next/image"
import { ChevronRight, ArrowRight, Calendar, Clock, Package, Truck, Shield, CheckCircle, Home, X, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const blogPosts = [
  { 
    title: "Easy Online Booking Process", 
    img: "/images/relax-booking-image.png",
    excerpt: "Learn how to book our packing and moving services in just 3 simple steps through our user-friendly platform",
    date: "June 15, 2024",
    readTime: "3 min read",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
    steps: [
      "Select your moving requirements",
      "Get instant pricing quote",
      "Confirm booking with secure payment"
    ]
  },
  { 
    title: "Professional Packing Techniques", 
    img: "/images/relax-packing-image.jpg",
    excerpt: "Discover our expert packing methods that ensure complete protection for your valuable belongings",
    date: "June 12, 2024",
    readTime: "5 min read",
    icon: Package,
    color: "from-green-500 to-emerald-500",
    steps: [
      "Quality packing materials usage",
      "Fragile items special handling",
      "Systematic labeling and inventory"
    ]
  },
  { 
    title: "Safe Loading & Transportation", 
    img: "/images/packing-real.jpg",
    excerpt: "See how we carefully load and transport your items using specialized equipment and secure methods",
    date: "June 8, 2024",
    readTime: "4 min read",
    icon: Truck,
    color: "from-amber-500 to-orange-500",
    steps: [
      "Professional loading equipment",
      "Secure vehicle arrangement",
      "Weather-proof transportation"
    ]
  },
  { 
    title: "Damage-Free Moving Process", 
    img: "/images/bikepack.jpg",
    excerpt: "Understand our comprehensive safety measures that guarantee damage-free relocation of your possessions",
    date: "June 5, 2024",
    readTime: "6 min read",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    steps: [
      "Trained moving professionals",
      "Safety protocols implementation",
      "Real-time monitoring system"
    ]
  },
  { 
    title: "Timely Delivery & Unpacking", 
    img: "/images/relax-ondelivery-image.jpg",
    excerpt: "Learn about our efficient delivery system and careful unpacking process that completes your moving journey",
    date: "June 2, 2024",
    readTime: "4 min read",
    icon: Home,
    color: "from-red-500 to-rose-500",
    steps: [
      "On-time delivery guarantee",
      "Careful unpacking service",
      "Setup assistance available"
    ]
  }
]

export default function BlogRow() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const openImageModal = (imageSrc, title) => {
    setSelectedImage({ src: imageSrc, title })
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeImageModal = () => {
    setSelectedImage(null)
    // Re-enable body scroll
    document.body.style.overflow = 'auto'
  }

  // Close modal when clicking outside image
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal()
    }
  }

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal()
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedImage])

  const BlogCard = ({ post, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = post.icon

    return (
      <motion.article
        className="group cursor-pointer h-full"
        initial={{ opacity: 0, y: 50, rotateX: 5 }}
        animate={isVisible ? { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: { 
            delay: index * 0.15,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        } : {}}
        whileHover={{ 
          y: -12,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group-hover:shadow-3xl transition-all duration-500 h-full flex flex-col transform-style-preserve-3d">
          
          {/* Image Container with 3D Effect */}
          <div className="relative h-60 md:h-72 overflow-hidden">
            {/* Image with parallax effect */}
            <motion.div 
              className="absolute inset-0 cursor-pointer"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.6 }}
              onClick={() => openImageModal(post.img, post.title)}
            >
              <Image 
                src={post.img || "/placeholder.svg"} 
                alt={post.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              
              {/* View Image Overlay */}
              <motion.div 
                className="absolute inset-0 bg-black/40 opacity-0 flex items-center justify-center z-40"
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                  <ZoomIn size={24} className="text-white" />
                </div>
              </motion.div>
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            
            {/* Hover Overlay */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-0 z-20`}
              animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Icon Badge */}
            <motion.div 
              className={`absolute top-5 left-5 bg-gradient-to-br ${post.color} text-white p-3 rounded-2xl shadow-lg z-30`}
              animate={isHovered ? { 
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.6 }
              } : {}}
            >
              <IconComponent size={24} />
            </motion.div>

          </div>

          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Title */}
            <motion.h3 
              className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2"
              animate={isHovered ? { 
                color: "var(--color-primary)",
                transition: { duration: 0.3 }
              } : {}}
            >
              {post.title}
            </motion.h3>
            
            {/* Excerpt */}
            <p className="text-gray-600 text-base mb-5 flex-1 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Process Steps */}
            <div className="mb-5 space-y-2">
              {post.steps.map((step, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: index * 0.15 + (i * 0.1) + 0.5,
                      duration: 0.4
                    }
                  } : {}}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>

            {/* Meta Information and CTA */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Clock size={14} />
                {post.readTime}
              </div>
              
              <motion.button 
                className="flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm group-hover:text-[var(--color-primary-dark)] transition-colors duration-300"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openImageModal(post.img, post.title)}
              >
                View Image
                <ZoomIn size={16} className="group-hover:scale-110 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <>
      <section className="container section md:mt-28 lg:mt-36" ref={sectionRef}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Moving Process
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how we transform your moving experience with our professional, step-by-step approach 
            that ensures complete safety and satisfaction
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} index={index} />
          ))}
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute left-0 right-0 -z-10 opacity-5">
          <div className="absolute -top-20 left-1/4 w-40 h-40 bg-[var(--color-primary)] rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <style jsx global>{`
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          
          .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          @media (max-width: 768px) {
            .xl\:grid-cols-5 {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 640px) {
            .xl\:grid-cols-5 {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
                onClick={closeImageModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={32} />
              </motion.button>

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-800">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Image Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold text-center">
                    {selectedImage.title}
                  </h3>
                </div>
              </div>

              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}