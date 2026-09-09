"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users, X } from "lucide-react"

const STAGES = [
  { id: "all", label: "All" },
  { id: "packing", label: "Packing" },
  { id: "loading", label: "Loading" },
  { id: "transport", label: "Transport" },
  { id: "delivery", label: "Delivery" },
]

const ENTRIES = [
  { id: 1, title: "Furniture wrapping, 3 BHK household", text: "Sofa sets, wardrobes and dining furniture wrapped in stretch film with corner guards before crating.", image: "/images/bikepack.jpg", stage: "packing", location: "Cuttack, Odisha", date: "2024-01-15", time: "09:30", team: ["Raj Kumar", "Priya Singh", "Amit Patel"], materials: ["Bubble wrap", "Corner guards", "Stretch film"], duration: "2 hours", items: "15 furniture pieces" },
  { id: 2, title: "Truck loading with load plan", text: "Heavy items positioned over the axle, fragile boxes secured on top tier with ratchet straps.", image: "/images/packing-real.jpg", stage: "loading", location: "Bhubaneswar, Odisha", date: "2024-01-15", time: "14:15", team: ["Sanjay Mehta", "Rohit Sharma"], materials: ["Loading ramps", "Furniture dollies", "Ratchet straps"], duration: "1.5 hours", items: "Complete 3 BHK household" },
  { id: 3, title: "Interstate transit, GPS-tracked vehicle", text: "20 ft closed-body vehicle on NH-16 with coordinator updates every four hours.", image: "/images/relax-truck.jpg", stage: "transport", location: "NH-16, Cuttack to Kolkata", date: "2024-01-15", time: "16:00", team: ["Vikram Singh (driver)", "Route coordinator"], materials: ["GPS tracker", "Tarpaulin cover", "Safety kit"], duration: "3 hours", items: "All client belongings" },
  { id: 4, title: "Unloading and placement", text: "Room-wise unloading using the labelled inventory, followed by furniture reassembly.", image: "/images/relax-ondelivery-image.jpg", stage: "delivery", location: "Kolkata, West Bengal", date: "2024-01-15", time: "19:30", team: ["Sameer Joshi", "Anita Desai"], materials: ["Hand trucks", "Moving blankets", "Tool kit"], duration: "2 hours", items: "Fragile items first" },
  { id: 5, title: "Electronics and appliance packing", text: "Television, refrigerator and computer equipment packed in anti-static wrap and custom foam.", image: "/images/electronic-packaging.jpg", stage: "packing", location: "Rourkela, Odisha", date: "2024-01-14", time: "11:00", team: ["Karthik Nair", "Deepa Reddy"], materials: ["Anti-static wrap", "Custom crates", "Foam padding"], duration: "3 hours", items: "TV, computer, kitchen appliances" },
  { id: 6, title: "Pre-dispatch inventory check", text: "Every box counted against the inventory and photographed before the vehicle is sealed.", image: "/images/relax-packing-image.jpg", stage: "loading", location: "Sambalpur, Odisha", date: "2024-01-14", time: "17:45", team: ["Quality team", "Operations manager"], materials: ["Checklist", "Tablet", "Camera"], duration: "45 minutes", items: "Complete shipment verification" },
  { id: 7, title: "Handover and feedback", text: "Final walkthrough with the customer, signed delivery note and feedback recorded.", image: "/images/relax-packers-ai-image-2.jpg", stage: "delivery", location: "Hyderabad, Telangana", date: "2024-01-14", time: "18:30", team: ["Customer service", "Moving team"], materials: ["Delivery note", "Feedback form"], duration: "1.5 hours", items: "Customer sign-off" },
]

const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })

export default function JournalClient() {
  const [stage, setStage] = useState("all")
  const [index, setIndex] = useState(null)
  const list = stage === "all" ? ENTRIES : ENTRIES.filter((e) => e.stage === stage)
  const current = index === null ? null : list[index]

  useEffect(() => {
    if (current === null) return
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null)
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % list.length)
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + list.length) % list.length)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [current, list.length])

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by stage">
        {STAGES.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={stage === s.id}
            type="button"
            onClick={() => {
              setStage(s.id)
              setIndex(null)
            }}
            className={`rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${stage === s.id ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-body hover:border-navy-200"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => (
          <article key={e.id} className="card group overflow-hidden">
            <button type="button" onClick={() => setIndex(i)} className="block w-full text-left">
              <div className="relative aspect-[4/3] bg-surface-2">
                <Image src={e.image} alt={e.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="badge badge-neutral absolute left-3 top-3 bg-white/95">{STAGES.find((s) => s.id === e.stage)?.label}</span>
              </div>
              <div className="p-5">
                <h3 className="h-card">{e.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{e.text}</p>
                <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} /> {e.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} /> {fmtDate(e.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} /> {e.duration}
                  </div>
                </dl>
              </div>
            </button>
          </article>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/70 p-0 sm:items-center sm:p-6" onClick={() => setIndex(null)}>
          <div
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-lg bg-white shadow-float sm:rounded-lg"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <div className="truncate text-[16px] font-semibold text-ink">{current.title}</div>
                <div className="text-xs text-muted">
                  {current.location} · {fmtDate(current.date)} · {current.time}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)} className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink hover:bg-surface-2" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" onClick={() => setIndex((i) => (i + 1) % list.length)} className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink hover:bg-surface-2" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
                <button type="button" onClick={() => setIndex(null)} className="ml-1 flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink hover:bg-surface-2" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="scroll-thin grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-5">
              <div className="relative aspect-[4/3] bg-surface-2 lg:col-span-3 lg:aspect-auto lg:min-h-[420px]">
                <Image src={current.image} alt={current.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              </div>
              <div className="p-6 lg:col-span-2">
                <p className="text-sm leading-relaxed text-body">{current.text}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-line p-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">Duration</dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">{current.duration}</dd>
                  </div>
                  <div className="rounded-md border border-line p-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">Scope</dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">{current.items}</dd>
                  </div>
                </dl>
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                    <Users size={14} /> Crew
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {current.team.map((m) => (
                      <li key={m} className="rounded-md bg-surface-3 px-2.5 py-1 text-xs text-ink">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5">
                  <div className="text-[13px] font-semibold text-ink">Materials and equipment</div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {current.materials.map((m) => (
                      <li key={m} className="rounded-md border border-line px-2.5 py-1 text-xs text-body">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 text-xs text-muted">
                  Entry {index + 1} of {list.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
