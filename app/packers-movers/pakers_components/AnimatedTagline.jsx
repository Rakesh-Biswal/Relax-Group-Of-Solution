'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimatedTagline({ taglines }) {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % taglines.length), 2200)
    return () => clearTimeout(timer)
  }, [index, taglines.length])
  
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={taglines[index]}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        style={{ display: 'inline-block' }}
      >
        {taglines[index]}
      </motion.span>
    </AnimatePresence>
  )
}