"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Gift, Star, X } from "lucide-react"

export default function ScratchCard({ discount, onReveal, onClose }) {
  const [isScratched, setIsScratched] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw scratchable layer
    ctx.fillStyle = '#8B5CF6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw pattern
    ctx.fillStyle = '#7C3AED'
    for (let i = 0; i < canvas.width; i += 20) {
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.fillRect(i, j, 10, 10)
      }
    }

    // Draw text
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2 - 10)
    
    ctx.font = '16px Arial'
    ctx.fillText('to reveal your offer!', canvas.width / 2, canvas.height / 2 + 20)
  }, [])

  const handleScratch = (e) => {
    if (isScratched) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.fill()

    // Check if enough area is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparentPixels = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++
    }

    const scratchedPercent = (transparentPixels / (pixels.length / 4)) * 100

    if (scratchedPercent > 30 && !isScratched) {
      setIsScratched(true)
      setIsScratching(false)
      setTimeout(() => onReveal(), 500)
    }
  }

  const handleMouseDown = () => {
    if (!isScratched) setIsScratching(true)
  }

  const handleMouseUp = () => {
    setIsScratching(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={containerRef}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Gift size={32} className="text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
          <p className="text-purple-100">You've unlocked a special discount offer!</p>
        </div>

        {/* Scratch Card */}
        <div className="p-6">
          <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-1 mb-4">
            <div className="bg-white rounded-xl p-6 text-center relative overflow-hidden">
              {/* Revealed Content */}
              <AnimatePresence>
                {isScratched && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-col text-white p-4"
                  >
                    <Sparkles size={48} className="mb-4" />
                    <h4 className="text-2xl font-bold mb-2">You Got {discount}% OFF!</h4>
                    <p className="text-green-100 text-sm">
                      {discount === 10 && "Perfect for long-distance moves!"}
                      {discount === 20 && "Amazing discount for your journey!"}
                      {discount === 30 && "Incredible savings for your big move!"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scratchable Canvas */}
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleScratch}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleScratch}
                className="w-full h-48 rounded-lg cursor-crosshair touch-none"
                style={{ touchAction: 'none' }}
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              {isScratched 
                ? "🎉 Discount applied to your total! Scroll down to see savings."
                : "👆 Scratch the card to reveal your special discount!"
              }
            </p>
            
            {!isScratched && (
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center justify-center gap-2 text-purple-600 font-semibold"
              >
                <Star size={16} className="fill-purple-600" />
                Scratch to reveal your offer!
                <Star size={16} className="fill-purple-600" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}