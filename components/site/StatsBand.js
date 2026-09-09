"use client"

import { useEffect, useRef, useState } from "react"
import { STATS } from "@/lib/site"

function useCountUp(target, active, duration = 1400, decimals = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min(1, (ts - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Number((eased * target).toFixed(decimals)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration, decimals])
  return value
}

function Stat({ stat, active }) {
  const value = useCountUp(stat.value, active, 1400, stat.decimals || 0)
  const display = stat.decimals ? value.toFixed(stat.decimals) : new Intl.NumberFormat("en-IN").format(Math.round(value))
  return (
    <div className="px-2 py-6 text-center sm:px-6">
      <div className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {display}
        <span className="text-brand-600">{stat.suffix}</span>
      </div>
      <div className="mt-1.5 text-[13px] font-medium uppercase tracking-wider text-muted">{stat.label}</div>
    </div>
  )
}

export default function StatsBand({ stats = STATS, className = "" }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`grid grid-cols-2 rounded-lg border border-line bg-white lg:grid-cols-4 ${className}`}>
      {stats.map((s, i) => (
        <div key={s.label} className={`border-line ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}>
          <Stat stat={s} active={active} />
        </div>
      ))}
    </div>
  )
}
