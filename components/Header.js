"use client"

import { useState } from 'react'
import Image from "next/image"
import { MapPin, ChevronDown, Menu, X } from "lucide-react"
import IntroAnimation from './ui/IntroAnimation'
import Link from 'next/link'

export default function Header() {
  const [showIntro, setShowIntro] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Our Pricing", href: "/dashboard/pricing" },
    { label: "About Us", href: "/dashboard/about" },
    { label: "Terms & Con..", href: "/dashboard/terms" }
  ]

  return (
    <>
      {/* {showIntro && (
        <IntroAnimation onSkip={() => setShowIntro(false)} />
      )} */}

      <header className="container pt-3 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/relax-logo.png" width={160} height={32} alt="Relax Packers & Movers logo" priority />
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[var(--color-accent)] font-medium transition-all duration-300 ease-in-out transform hover:scale-105 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button - Hidden on desktop */}
          <button 
            className="md:hidden h-9 w-9 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-accent-dark)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu - Slide down animation */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isMenuOpen ? 'max-h-48 opacity-100 mt-3' : 'max-h-0 opacity-0'}
        `}>
          <nav className="bg-white rounded-[14px] shadow-lg border border-gray-100 py-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:text-[var(--color-accent)] hover:bg-gray-50 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animationDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button className="mt-3 w-full flex items-center gap-3 bg-[#F1F5F9] px-3 py-3 rounded-[14px] hover:bg-[#E2E8F0] transition-colors duration-300">
          <MapPin size={18} className="text-[var(--color-accent)]" />
          <div className="text-left min-w-0">
            <div className="text-[13px] font-extrabold leading-none">
              Pan-India Service
            </div>
            <div className="text-xs subtle truncate">
              Packers & Movers with Pan-India Delivery & Courier Network
            </div>
          </div>
          <ChevronDown size={18} className="ml-auto text-[#64748B] transition-transform duration-300 hover:rotate-180" />
        </button>
      </header>
    </>
  )
}