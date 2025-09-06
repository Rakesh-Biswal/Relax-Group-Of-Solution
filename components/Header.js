"use client"

import { useState } from 'react'
import Image from "next/image"
import { MapPin, ChevronDown, User } from "lucide-react"
import IntroAnimation from './ui/IntroAnimation'

export default function Header() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && (
        <IntroAnimation onSkip={() => setShowIntro(false)} />
      )}

      <header className="container pt-3 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/relax-logo.png" width={160} height={32} alt="Relax Packers & Movers logo" priority />
          </div>
          <div className="h-9 w-9 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center">
            <User size={18} aria-hidden="true" />
            <span className="sr-only">Account</span>
          </div>
        </div>

        <button className="mt-3 w-full flex items-center gap-3 bg-[#F1F5F9] px-3 py-3 rounded-[14px]">
          <MapPin size={18} className="text-[var(--color-accent)]" />
          <div className="text-left min-w-0">
            <div className="text-[13px] font-extrabold leading-none">
              Pan-India Service
            </div>
            <div className="text-xs subtle truncate">
              Packers & Movers with Pan-India Delivery & Courier Network
            </div>
          </div>
          <ChevronDown size={18} className="ml-auto text-[#64748B]" />
        </button>

      </header>
    </>
  )
}