"use client"

import { useEffect, useState } from 'react'
import Image from "next/image"
import { X } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-64 h-64 bg-gray-100 rounded-lg"></div>
})

// Import Lottie animation data (you'll need to add these files)
import deliveryTruck from '../../public/animations/delivery-truck.json'
import shiftingLocation from '../../public/animations/TrackMap.json'
import location from '../../public/animations/location.json'
import UnBoxing from '../../public/animations/UnBoxing.json'

export default function IntroAnimation({ onSkip }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [animationData, setAnimationData] = useState(deliveryTruck)

  const messages = [
    { text: "Move household products safely", animation: deliveryTruck },
    { text: "Shift your Home in Minutes", animation: shiftingLocation },
    { text: "Send Your Courier/Parcel Instantly", animation: location },
    { text: "Track Your Delivery in Real-time", animation: UnBoxing },
  ]

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => {
        const next = (prev + 1) % messages.length
        setAnimationData(messages[next].animation)
        return next
      })
    }, 800) // reduced from 1000ms to 800ms

    const introTimer = setTimeout(() => {
      onSkip && onSkip()
    }, 2200) // reduced from 4000ms to 3200ms

    return () => {
      clearInterval(messageTimer)
      clearTimeout(introTimer)
    }
  }, [messages.length, onSkip])


  const skipIntro = () => {
    onSkip && onSkip()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={skipIntro}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors bg-white px-3 py-1 rounded-full shadow-sm"
        >
          <X size={16} />
          Skip
        </button>
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-lg bg-blue-100 opacity-30"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                top: `${15 + i * 15}%`,
                left: `${5 + i * 10}%`,
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
          {[...Array(5)].map((_, i) => (
            <div
              key={i + 5}
              className="absolute rounded-lg bg-amber-100 opacity-30"
              style={{
                width: `${30 + i * 15}px`,
                height: `${30 + i * 15}px`,
                top: `${10 + i * 10}%`,
                right: `${5 + i * 8}%`,
                animation: `float 8s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-2 w-full max-w-xs md:max-w-md">
            <div className="w-full aspect-square relative overflow-hidden">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                className="w-full h-full object-contain"
              />
            </div>
          </div>



          <div className="mb-6">
            <Image
              src="/images/relax-logo.png"
              width={200}
              height={40}
              alt="Relax Packers & Movers logo"
              className="mx-auto intro-logo"
              priority
            />
          </div>

          <div className="h-16 overflow-hidden mb-2">
            <div
              className="text-2xl md:text-3xl font-bold text-gray-800 message-slide"
              key={currentMessage}
            >
              {messages[currentMessage].text}
            </div>
          </div>

          <p className="text-gray-600 text-sm md:text-base max-w-md">
            Professional packing, moving, and delivery solutions
          </p>

          <div className="mt-6 flex space-x-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentMessage ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .intro-logo {
          animation: fadeIn 1s ease-out;
        }
        
        .message-slide {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}