"use client"

import { useState, useEffect, useRef } from "react"
import { Package, Send, Wrench } from "lucide-react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-400 text-sm">...</div>
    </div>
  ),
})

// Import Lottie animation data
import NewOffers from "../public/animations/NewOffers.json"
import trackMap from "../public/animations/TrackMap.json"
import Shipped from "../public/animations/delivery-truck.json"
import Congrats from "../public/animations/Congrats.json"
import Discount from "../public/animations/Discount.json"

const AnimatedOffers = ({ showLottie, lottieIndex, currentOfferIndex, lottieAnimations, textOffers }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-2 mb-4 min-h-[180px]">
      {showLottie ? (
        <>
          <div className="w-32 h-32 mx-auto">
            <Lottie
              animationData={lottieAnimations[lottieIndex].data}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </div>
          <div className="h-8 overflow-hidden mt-2">
            <div className="text-lg font-semibold text-amber-800 offer-slide" key={lottieIndex}>
              {lottieAnimations[lottieIndex].text}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-14 overflow-hidden mb-1">
            <div
              className="text-2xl font-black bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent offer-3d"
              key={currentOfferIndex}
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {textOffers[currentOfferIndex].text}
            </div>
          </div>
          <div className="h-6 overflow-hidden">
            <div className="text-sm font-medium text-amber-700/90 offer-slide-sub" key={currentOfferIndex}>
              {textOffers[currentOfferIndex].subtext}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function ServiceBoxes() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [showLottie, setShowLottie] = useState(true)
  const [lottieIndex, setLottieIndex] = useState(0)
  const [servicesVisible, setServicesVisible] = useState(true) // Changed to true for instant show
  const [featureVisible, setfeatureVisible] = useState(true) // Changed to true for instant show
  const router = useRouter()

  const lottieAnimations = [
    { data: Congrats, text: "Congratulations!" },
    { data: NewOffers, text: "New Offers Available!" },
    { data: trackMap, text: "Real-time Tracking" },
    { data: Shipped, text: "Fast Delivery" },
    { data: Discount, text: "Special Discounts" },
  ]

  const textOffers = [
    { text: "UP TO 25% OFF", subtext: "Premium Packing Services" },
    { text: "No GST", subtext: "On bill above ₹5,000" },
    { text: "INSTANT TRACKING", subtext: "Real-time delivery updates" },
    { text: "EXPERT TEAM", subtext: "Trained professionals" },
  ]

  // Remove the initial delay for services
  useEffect(() => {
    setServicesVisible(true)
  }, [])

  // Start Lottie animations immediately without delay
  useEffect(() => {
    if (!showLottie) return

    let i = 0
    setLottieIndex(i)

    const lottieTimer = setInterval(() => {
      i = (i + 1) % lottieAnimations.length
      setLottieIndex(i)
    }, 3000)

    return () => clearInterval(lottieTimer)
  }, [showLottie, lottieAnimations.length])

  // Text offers rotation
  useEffect(() => {
    let offerTimer

    if (!showLottie) {
      offerTimer = setInterval(() => {
        setCurrentOfferIndex((prev) => (prev + 1) % textOffers.length)
      }, 3000)
    }

    return () => {
      if (offerTimer) clearInterval(offerTimer)
    }
  }, [showLottie, textOffers.length])

  const toggleOfferMode = () => {
    setShowLottie((prev) => !prev)
  }

  const services = [
    {
      title: "Packers &\nMovers",
      icon: Package,
      color: "var(--color-primary)",
      highlight: true,
      onClick: () => { },
    },
    {
      title: "Courier\nShipping",
      icon: Send,
      color: "var(--color-accent)",
      onClick: () => alert("Feature coming very soon"),
    },
    {
      title: "Smart\nSolutions",
      icon: Wrench,
      color: "#0EA5E9",
      onClick: () => alert("Feature coming very soon"),
    },
  ]

  const Box = ({ title, icon: IconCmp, color, highlight, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-1 p-3 text-left rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${highlight
        ? "bg-gradient-to-br from-[var(--color-primary)] to-purple-600 text-white shadow-lg"
        : "bg-white/80 text-gray-800"
        }`}
      aria-label={title}
      style={{
        boxShadow: highlight ? "0 8px 20px -10px rgba(99, 102, 241, 0.4)" : "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${highlight ? "bg-white/20" : "bg-white/50"
          }`}
      >
        <IconCmp size={18} className={highlight ? "text-white" : ""} color={highlight ? "white" : color} />
      </div>
      <div className={`font-bold text-xs leading-3 ${highlight ? "text-white" : "text-gray-800"}`}>
        {title.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </div>
    </button>
  )

  return (
    <div className="w-full max-w-full mt-6 mb-8 mx-auto overflow-hidden">
      {/* Premium Offer Card with 3D Gradient Background */}
      <div className="relative bg-gradient-to-br from-amber-400/10 via-orange-300/15 to-red-400/10 rounded-2xl p-2 overflow-hidden border border-amber-200/50 shadow-lg w-full">
        {/* 3D Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20"
              style={{
                width: `${80 + i * 25}px`,
                height: `${80 + i * 25}px`,
                top: `${10 + i * 15}%`,
                left: `${i * 15}%`,
                animation: `float 12s ease-in-out infinite`,
                animationDelay: `${i * 1.2}s`,
                filter: "blur(12px)",
              }}
            ></div>
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={i + 5}
              className="absolute rounded-full bg-gradient-to-br from-red-400/15 to-pink-500/15"
              style={{
                width: `${70 + i * 20}px`,
                height: `${70 + i * 20}px`,
                top: `${5 + i * 12}%`,
                right: `${i * 10}%`,
                animation: `float 10s ease-in-out infinite reverse`,
                animationDelay: `${i * 1.5}s`,
                filter: "blur(10px)",
              }}
            ></div>
          ))}

          {/* Geometric shapes for 3D effect */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-amber-300/30 rounded-lg transform rotate-45 animate-pulse-slow"></div>
          <div className="absolute bottom-8 right-12 w-16 h-16 border-2 border-red-300/30 rounded-full animate-ping-slow"></div>
        </div>

        <div className="relative z-10 w-full">
          <button
            onClick={toggleOfferMode}
            className="absolute top-2 right-2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-2 text-amber-700 hover:bg-white/30 transition-all duration-200"
            title={showLottie ? "Switch to Text Offers" : "Switch to Animation Offers"}
          >
            <div className="w-4 h-4 flex items-center justify-center text-xs font-bold">{showLottie ? "T" : "A"}</div>
          </button>

          <AnimatedOffers
            showLottie={showLottie}
            lottieIndex={lottieIndex}
            currentOfferIndex={currentOfferIndex}
            lottieAnimations={lottieAnimations}
            textOffers={textOffers}
          />

          <div
            className={`relative bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-xl rounded-2xl p-4 border border-amber-200/60 shadow-[0_4px_20px_rgba(255,193,7,0.15)] transition-all duration-700 ease-out transform ${featureVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
              } hover:shadow-[0_6px_25px_rgba(255,193,7,0.25)] hover:scale-[1.02]`}
          >
            {/* Floating Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/10 to-amber-500/10 blur-2xl rounded-2xl animate-pulse-slow"></div>

            <h3
              className={`text-sm font-semibold text-amber-800 mb-2 text-center uppercase tracking-wider drop-shadow-sm transition-all duration-700 ${featureVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
            >
              🚀 Get Upto 30% off
            </h3>

            <div
              className={`flex flex-col items-center justify-center text-center transition-all duration-700 ${featureVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
            >
              <p className="text-[13px] text-gray-700 mb-3 italic leading-tight">
                Experience our <span className="font-semibold text-amber-700">Budget Calculator</span> —
                smartly designed to estimate your moving cost in seconds.
              </p>

              <button
                onClick={() => router.push("/pricing")}
                className="px-5 py-[6px] text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg shadow-md hover:shadow-[0_4px_12px_rgba(255,193,7,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Free Quote
              </button>
            </div>
          </div>


        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) translateX(10px) rotate(5deg) scale(1.05); }
          66% { transform: translateY(8px) translateX(-8px) rotate(-3deg) scale(0.95); }
          100% { transform: translateY(0px) translateX(0) rotate(0deg) scale(1); }
        }
        
        @keyframes slideUp {
          from { 
            transform: translateY(15px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from { 
            transform: translateY(-10px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes threeD {
          0% { 
            transform: perspective(500px) rotateX(10deg) translateY(10px) scale(0.9);
            opacity: 0;
            filter: blur(5px);
          }
          100% { 
            transform: perspective(500px) rotateX(0) translateY(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .offer-3d {
          animation: threeD 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform-style: preserve-3d;
          perspective: 500px;
        }
        
        .offer-slide, .offer-slide-sub {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  )
}