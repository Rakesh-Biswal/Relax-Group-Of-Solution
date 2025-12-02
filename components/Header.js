"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { MapPin, ChevronDown, Menu, X, Download } from "lucide-react"
import { Home, DollarSign, Info, FileText, Award, Map, Users, MessageSquare } from "lucide-react";
import IntroAnimation from './ui/IntroAnimation'
import Link from 'next/link'

export default function Header() {
  const [showIntro, setShowIntro] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const menuItems = [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    { label: "Get Free Quote", href: "/pricing", icon: <DollarSign size={18} /> },
    { label: "Download Quotation / Receipt", href: "/download-quotation", icon: <Download size={18} /> },
    { label: "About Us", href: "/about", icon: <Info size={18} /> },
    { label: "Our Blogs", href: "/blog", icon: <Award size={18} /> },
    { label: "Our Achievements", href: "/achievement", icon: <Award size={18} /> },
    { label: "Live Tracking", href: "/tracking", icon: <Map size={18} /> },
    { label: "Our Trusted Partners", href: "/partners", icon: <Users size={18} /> },
    { label: "Feedback", href: "/feedback", icon: <MessageSquare size={18} /> },
    { label: "Terms & Conditions", href: "/terms", icon: <FileText size={18} /> },
  ];

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = event.target
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      {/* {showIntro && (
        <IntroAnimation onSkip={() => setShowIntro(false)} />
      )} */}

      <header className={` z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}>
        <div className="container pt-3 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/relax-nav-logo.png"
                width={160}
                height={32}
                alt="Relax Packers & Movers logo"
                priority
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-accent)] font-medium transition-all duration-300 ease-in-out transform hover:scale-105 relative group"
                >
                  {item.icon} {/* Icon added here */}
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>


            {/* Mobile Menu Button - Hidden on desktop */}
            <div className="mobile-menu-container md:hidden">
              <button
                className="h-12 w-12 rounded-2xl bg-[var(--color-accent)] text-white flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-accent-dark)] shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen(!isMenuOpen)
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Location Button - Always visible */}
          <button className="mt-3 w-full flex items-center gap-3 bg-[#F1F5F9] px-3 py-3 rounded-[14px] hover:bg-[#E2E8F0] transition-colors duration-300 border border-gray-200">
            <MapPin size={18} className="text-[var(--color-accent)]" />
            <div className="text-left min-w-0">
              <div className="text-[13px] font-extrabold leading-none">
                Want to Relocate/ Shipping Service
              </div>
              <div className="text-xs subtle truncate">
                Call Us at +91 9777012315
              </div>
            </div>
            <ChevronDown size={18} className="ml-auto text-[#64748B] transition-transform duration-300 hover:rotate-180" />
          </button>
        </div>

        {/* Mobile Menu Overlay - Absolute positioned */}
        <div className={`
          md:hidden fixed inset-0 z-50 transition-all duration-500 ease-in-out
          ${isMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
          }
        `}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className={`
            absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-gray-200 transform transition-all duration-500 ease-out
            ${isMenuOpen
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-95'
            }
          `}>
            {/* Menu Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Navigation Menu</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="h-10 w-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="p-2 max-h-96 overflow-y-auto">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-4 text-gray-700 hover:text-[var(--color-accent)] hover:bg-gray-50 transition-all duration-300 font-medium
        ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''} rounded-xl mx-2`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  <div>{item.icon}</div> {/* Icon added here */}
                  <span className="font-semibold text-[15px]">{item.label}</span>
                </Link>
              ))}
            </nav>


            {/* Menu Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Need immediate assistance?</p>
                <a
                  href="tel:+919777012315"
                  className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-[var(--color-accent-dark)] shadow-lg hover:shadow-xl"
                >
                  <MapPin size={16} />
                  Call Now: +91 9777012315
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>


    </>
  )
}