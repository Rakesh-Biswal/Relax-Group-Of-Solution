"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Gift, Star, X } from "lucide-react"

export default function ScratchCard({ discount, onReveal, onClose }) {
  const [isScratched, setIsScratched] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 200 })

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 48 // accounting for padding
        const height = Math.min(200, containerWidth * 0.66)
        setCanvasSize({ width: containerWidth, height })
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size with high DPI for better rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvasSize.width * dpr
    canvas.height = canvasSize.height * dpr
    canvas.style.width = `${canvasSize.width}px`
    canvas.style.height = `${canvasSize.height}px`
    ctx.scale(dpr, dpr)

    // Draw scratchable layer
    ctx.fillStyle = '#8B5CF6'
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    
    // Draw pattern
    ctx.fillStyle = '#7C3AED'
    const patternSize = Math.max(15, canvasSize.width / 20)
    for (let i = 0; i < canvasSize.width; i += patternSize) {
      for (let j = 0; j < canvasSize.height; j += patternSize) {
        ctx.fillRect(i, j, patternSize / 2, patternSize / 2)
      }
    }

    // Draw text
    ctx.fillStyle = '#FFFFFF'
    const fontSize = Math.max(16, canvasSize.width / 15)
    ctx.font = `bold ${fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.fillText('SCRATCH HERE', canvasSize.width / 2, canvasSize.height / 2 - 10)
    
    ctx.font = `${fontSize * 0.6}px Arial`
    ctx.fillText('to reveal your offer!', canvasSize.width / 2, canvasSize.height / 2 + 15)
  }, [canvasSize])

  const getEventPosition = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    let x, y
    
    if (e.type.includes('touch')) {
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0]
      x = touch.clientX - rect.left
      y = touch.clientY - rect.top
    } else {
      // Mouse event
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }
    
    return { x, y }
  }

  const handleScratch = (e) => {
    if (isScratched) return

    const { x, y } = getEventPosition(e)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Use a larger brush size for mobile
    const brushSize = e.type.includes('touch') ? 35 : 25
    
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, brushSize, 0, Math.PI * 2)
    ctx.fill()

    // Check if enough area is scratched
    checkScratchedArea()
  }

  const checkScratchedArea = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
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

  const handleMouseDown = (e) => {
    e.preventDefault()
    if (!isScratched) {
      setIsScratching(true)
      handleScratch(e) // Scratch on initial touch/click
    }
  }

  const handleMouseUp = () => {
    setIsScratching(false)
  }

  const handleMouseMove = (e) => {
    if (isScratching && !isScratched) {
      handleScratch(e)
    }
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (isScratching && !isScratched) {
      handleScratch(e)
    }
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
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden mx-4"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1"
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
            <div className="bg-white rounded-xl p-4 text-center relative overflow-hidden">
              {/* Revealed Content */}
              <AnimatePresence>
                {isScratched && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-col text-white p-4 z-10"
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
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchEnd={handleMouseUp}
                  onTouchMove={handleTouchMove}
                  onTouchCancel={handleMouseUp}
                  className="w-full rounded-lg cursor-crosshair touch-none select-none"
                  style={{ 
                    height: `${canvasSize.height}px`,
                    touchAction: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                />
                
                {/* Instructions Overlay */}
                {!isScratched && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-white text-center bg-black/30 rounded-lg px-4 py-2 backdrop-blur-sm"
                    >
                      <p className="text-sm font-semibold">👆 Scratch here!</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              {isScratched 
                ? "🎉 Discount applied to your total! Scroll down to see savings."
                : "👆 Use your finger or mouse to scratch the card!"
              }
            </p>
            
            {!isScratched && (
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center justify-center gap-2 text-purple-600 font-semibold text-sm"
              >
                <Star size={16} className="fill-purple-600" />
                Scratch to reveal your offer!
                <Star size={16} className="fill-purple-600" />
              </motion.div>
            )}

            {/* Mobile-specific instructions */}
            <div className="mt-4 text-xs text-gray-500">
              <p>💡 Tip: Use your finger to scratch on mobile devices</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0">
          {isScratched ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onClose}
            >
              Continue with {discount}% OFF! 🎉
            </motion.button>
          ) : (
            <button
              className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
              onClick={onClose}
            >
              Maybe Later
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}