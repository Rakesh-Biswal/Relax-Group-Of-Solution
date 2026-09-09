"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Circle, MapPin, MessageCircle, Package, Phone, RefreshCw, Search, Truck, Warehouse } from "lucide-react"
import { SITE, whatsappLink } from "@/lib/site"

const STAGES = [
  { key: "picked", label: "Picked up", text: "Consignment collected and inventory signed at origin.", Icon: Package },
  { key: "hub", label: "At hub", text: "Consignment consolidated at the dispatch hub.", Icon: Warehouse },
  { key: "transit", label: "In transit", text: "Vehicle en route to destination city.", Icon: Truck },
  { key: "out", label: "Out for delivery", text: "Vehicle within the destination area.", Icon: MapPin },
  { key: "delivered", label: "Delivered", text: "Unloaded, unpacked and handover signed.", Icon: CheckCircle2 },
]

const LOCATIONS = ["Cuttack dispatch hub", "NH-16, Balasore", "Kolkata transit hub", "Destination city", "Delivered"]

export default function TrackingClient() {
  const [query, setQuery] = useState("")
  const [reference, setReference] = useState("RLX987654321")
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const ref = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlaying(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false)
          return 100
        }
        return p + 0.5
      })
    }, 80)
    return () => clearInterval(timer.current)
  }, [playing])

  const activeIndex = Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length))
  const location = LOCATIONS[Math.min(LOCATIONS.length - 1, Math.floor((progress / 100) * LOCATIONS.length))]

  const onSearch = (e) => {
    e.preventDefault()
    const q = query.trim().toUpperCase()
    if (!q) return
    setReference(q)
    setProgress(0)
    setPlaying(true)
  }

  const restart = () => {
    setProgress(0)
    setPlaying(true)
  }

  return (
    <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        <form onSubmit={onSearch} className="card p-5 sm:p-6">
          <label className="label" htmlFor="track-ref">
            Quotation, receipt or consignment reference
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input id="track-ref" className="input pl-10 font-mono uppercase" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. RQ0042 or RLX987654321" />
            </div>
            <button type="submit" className="btn btn-primary">
              Track
            </button>
          </div>
          <p className="help">Status stages below are a demonstration of how updates appear. Live vehicle location is shared by your coordinator.</p>
        </form>

        <div className="card overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">Reference</div>
              <div className="font-mono text-lg font-semibold text-ink">{reference}</div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`badge ${activeIndex === STAGES.length - 1 ? "badge-green" : "badge-navy"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${activeIndex === STAGES.length - 1 ? "bg-emerald-500" : "animate-pulse bg-navy-700"}`} />
                {STAGES[activeIndex].label}
              </span>
              <button type="button" onClick={restart} className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-navy-900">
                <RefreshCw size={13} /> Replay demo
              </button>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-6">
            <div className="relative h-2 overflow-hidden rounded-full bg-surface-3">
              <div className="absolute inset-y-0 left-0 rounded-full bg-navy-800 transition-[width] duration-100" style={{ width: `${progress}%` }} />
            </div>
            <ol className="mt-6 grid grid-cols-5 gap-2">
              {STAGES.map((s, i) => {
                const done = i < activeIndex
                const current = i === activeIndex
                return (
                  <li key={s.key} className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                        done ? "border-navy-900 bg-navy-900 text-white" : current ? "border-brand-500 bg-brand-50 text-brand-600" : "border-line bg-white text-slate-300"
                      }`}
                    >
                      {done ? <CheckCircle2 size={16} /> : <s.Icon size={16} />}
                    </div>
                    <div className={`mt-2 text-[11px] font-semibold leading-tight sm:text-xs ${done || current ? "text-ink" : "text-muted"}`}>{s.label}</div>
                  </li>
                )
              })}
            </ol>
            <div className="mt-6 flex flex-col gap-3 rounded-md border border-line bg-surface-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-navy-700 shadow-card">
                  <Truck size={17} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">Last known location</div>
                  <div className="text-sm font-medium text-ink">{location}</div>
                </div>
              </div>
              <div className="text-sm text-muted">{Math.max(0, 100 - Math.round(progress))}% of route remaining</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="border-b border-line px-5 py-4 sm:px-6">
            <h2 className="text-[16px] font-semibold text-ink">Status history</h2>
          </div>
          <ol className="px-5 py-2 sm:px-6">
            {STAGES.map((s, i) => {
              const done = i < activeIndex
              const current = i === activeIndex
              return (
                <li key={s.key} className="grid grid-cols-[auto_1fr] gap-4 py-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full ${done ? "bg-navy-900 text-white" : current ? "bg-brand-500 text-white" : "bg-surface-3 text-slate-400"}`}>
                      {done ? <CheckCircle2 size={14} /> : <Circle size={10} className={current ? "fill-white" : ""} />}
                    </div>
                    {i < STAGES.length - 1 && <div className="mt-1 h-full w-px bg-line" />}
                  </div>
                  <div className="pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[15px] font-semibold ${done || current ? "text-ink" : "text-muted"}`}>{s.label}</span>
                      {current && <span className="badge badge-brand">Current</span>}
                    </div>
                    <p className="mt-1 text-sm text-body">{s.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <aside className="space-y-6 lg:col-span-4">
        <div className="card p-6">
          <h3 className="text-[16px] font-semibold text-ink">Consignment summary</h3>
          <dl className="mt-3">
            <div className="dl-row border-b border-line">
              <dt>Service</dt>
              <dd>Household relocation</dd>
            </div>
            <div className="dl-row border-b border-line">
              <dt>Route</dt>
              <dd>Cuttack → Kolkata</dd>
            </div>
            <div className="dl-row border-b border-line">
              <dt>Vehicle</dt>
              <dd>20 ft closed body</dd>
            </div>
            <div className="dl-row border-b border-line">
              <dt>Transit cover</dt>
              <dd className="text-emerald-700">Active</dd>
            </div>
            <div className="dl-row">
              <dt>Coordinator</dt>
              <dd>Assigned</dd>
            </div>
          </dl>
        </div>
        <div className="card p-6">
          <h3 className="text-[16px] font-semibold text-ink">Need a live update?</h3>
          <p className="mt-2 text-sm leading-relaxed text-body">Message your reference number and a coordinator will share the current vehicle location and expected delivery window.</p>
          <a href={whatsappLink(`Hello, please share the current status of consignment ${reference}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-4 w-full">
            <MessageCircle size={16} /> WhatsApp coordinator
          </a>
          <a href={SITE.phoneHref} className="btn btn-outline mt-3 w-full">
            <Phone size={15} /> {SITE.phone}
          </a>
        </div>
      </aside>
    </div>
  )
}
