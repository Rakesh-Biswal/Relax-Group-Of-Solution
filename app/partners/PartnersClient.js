"use client"

import { useEffect, useState } from "react"
import { Building2, CheckCircle2, MapPin, X } from "lucide-react"

const CATEGORIES = [
  { id: "steel", label: "Steel & manufacturing" },
  { id: "cement", label: "Cement & construction" },
  { id: "banking", label: "Banking & finance" },
  { id: "corporate", label: "Corporate groups" },
  { id: "logistics", label: "Logistics" },
  { id: "household", label: "Consumer brands" },
]

const PARTNERS = {
  steel: [
    { name: "Tata Steel", since: "2018", projects: "150+", text: "Employee relocation and plant equipment transportation.", services: ["Employee relocation", "Plant equipment", "Office shifting"], locations: ["Jamshedpur", "Kolkata", "Mumbai"], featured: true },
    { name: "JSW Steel", since: "2019", projects: "120+", text: "Corporate relocation and industrial moves.", services: ["Corporate relocation", "Industrial moving", "Machinery transport"], locations: ["Vijayanagar", "Mumbai", "Chennai"], featured: true },
    { name: "SAIL", since: "2017", projects: "95+", text: "Steel plant employee relocation across India.", services: ["Employee transfer", "Plant relocation", "Equipment moving"], locations: ["Bokaro", "Bhilai", "Durgapur"] },
    { name: "ArcelorMittal", since: "2020", projects: "65+", text: "Expatriate relocation and office set-up.", services: ["Expat relocation", "Office setup", "Technical equipment"], locations: ["Delhi", "Mumbai", "Bangalore"] },
  ],
  cement: [
    { name: "Konark Cement", since: "2016", projects: "200+", text: "Plant equipment and employee relocation.", services: ["Plant equipment", "Employee housing", "Office infrastructure"], locations: ["Odisha", "Kolkata", "Hyderabad"], featured: true },
    { name: "UltraTech Cement", since: "2019", projects: "135+", text: "Factory relocation and staff transfers.", services: ["Factory relocation", "Staff transfer", "Machinery moving"], locations: ["Mumbai", "Ahmedabad", "Pune"] },
    { name: "Ambuja Cement", since: "2018", projects: "110+", text: "Logistics for manufacturing facilities.", services: ["Plant shifting", "Employee relocation", "Equipment transport"], locations: ["Mumbai", "Delhi", "Chennai"] },
  ],
  banking: [
    { name: "State Bank of India", since: "2015", projects: "300+", text: "Branch network expansion and employee transfers.", services: ["Branch setup", "Employee transfer", "ATM relocation"], locations: ["Pan India"], featured: true },
    { name: "HDFC Bank", since: "2017", projects: "180+", text: "Corporate office and branch relocation.", services: ["Office relocation", "Branch setup", "Data centre moving"], locations: ["Mumbai", "Delhi", "Bangalore"] },
    { name: "ICICI Bank", since: "2018", projects: "150+", text: "Banking infrastructure and staff relocation.", services: ["Bank shifting", "Staff relocation", "Equipment moving"], locations: ["Mumbai", "Delhi", "Hyderabad"] },
    { name: "Axis Bank", since: "2019", projects: "120+", text: "Branch and office relocations.", services: ["Branch relocation", "Office setup", "Employee transfer"], locations: ["Mumbai", "Gurgaon", "Chennai"] },
  ],
  corporate: [
    { name: "Reliance Industries", since: "2016", projects: "250+", text: "Relocation across diverse business verticals.", services: ["Corporate relocation", "Employee transfer", "Office setup"], locations: ["Mumbai", "Delhi", "Bangalore"], featured: true },
    { name: "Aditya Birla Group", since: "2017", projects: "190+", text: "Relocation services across group companies.", services: ["Group relocation", "Staff transfer", "Office moving"], locations: ["Mumbai", "Kolkata", "Pune"] },
    { name: "Mahindra Group", since: "2018", projects: "140+", text: "Automotive and IT business relocation.", services: ["Factory relocation", "IT office moving", "Employee transfer"], locations: ["Mumbai", "Chennai", "Bangalore"] },
  ],
  logistics: [
    { name: "DHL Supply Chain", since: "2019", projects: "85+", text: "Integrated logistics support.", services: ["Warehouse relocation", "Supply chain", "Inventory moving"], locations: ["Pan India"], featured: true },
    { name: "Blue Dart", since: "2018", projects: "75+", text: "Express logistics collaboration.", services: ["Express logistics", "Document transfer", "Small packages"], locations: ["Major cities"] },
  ],
  household: [
    { name: "Hindustan Unilever", since: "2017", projects: "160+", text: "Corporate offices and manufacturing units.", services: ["Office relocation", "Factory moving", "Staff transfer"], locations: ["Mumbai", "Kolkata", "Bangalore"], featured: true },
    { name: "ITC Limited", since: "2018", projects: "130+", text: "Multi-division relocation services.", services: ["Hotel relocation", "Office moving", "Factory shifting"], locations: ["Kolkata", "Delhi", "Bengaluru"] },
    { name: "P&G India", since: "2019", projects: "95+", text: "Corporate and manufacturing relocation.", services: ["Corporate office", "Manufacturing unit", "R&D centre"], locations: ["Mumbai", "Hyderabad", "Goa"] },
  ],
}

const SUMMARY = [
  { value: "500+", label: "Corporate accounts" },
  { value: "2,000+", label: "Projects completed" },
  { value: "50+", label: "Cities covered" },
  { value: "98%", label: "Client retention" },
]

export default function PartnersClient() {
  const [category, setCategory] = useState("steel")
  const [selected, setSelected] = useState(null)
  const list = PARTNERS[category] || []

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => e.key === "Escape" && setSelected(null)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [selected])

  return (
    <>
      <div className="grid grid-cols-2 rounded-lg border border-line bg-white lg:grid-cols-4">
        {SUMMARY.map((s, i) => (
          <div key={s.label} className={`border-line px-4 py-6 text-center ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}>
            <div className="text-3xl font-semibold tracking-tight text-ink">{s.value}</div>
            <div className="mt-1 text-[13px] font-medium uppercase tracking-wider text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Client categories">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${category === c.id ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-body hover:border-navy-200"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.name}>
            <button type="button" onClick={() => setSelected(p)} className="card flex h-full w-full flex-col p-6 text-left transition-all hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-float">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-surface-3 text-navy-700">
                  <Building2 size={20} />
                </div>
                {p.featured && <span className="badge badge-navy">Key account</span>}
              </div>
              <h3 className="mt-4 text-[17px] font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-body">{p.text}</p>
              <dl className="mt-4 flex gap-6 border-t border-line pt-3 text-xs">
                <div>
                  <dt className="text-muted">Since</dt>
                  <dd className="font-semibold text-ink">{p.since}</dd>
                </div>
                <div>
                  <dt className="text-muted">Projects</dt>
                  <dd className="font-semibold text-ink">{p.projects}</dd>
                </div>
              </dl>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/70 sm:items-center sm:p-6" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-t-lg bg-white shadow-float sm:rounded-lg" role="dialog" aria-modal="true" aria-label={selected.name} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div>
                <div className="text-lg font-semibold text-ink">{selected.name}</div>
                <div className="text-xs text-muted">
                  Client since {selected.since} · {selected.projects} projects
                </div>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink hover:bg-surface-2" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-5 px-6 py-5">
              <p className="text-sm leading-relaxed text-body">{selected.text}</p>
              <div>
                <div className="text-[13px] font-semibold text-ink">Services provided</div>
                <ul className="mt-2 space-y-1.5">
                  {selected.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-body">
                      <CheckCircle2 size={15} className="text-brand-600" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-ink">Locations</div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {selected.locations.map((l) => (
                    <li key={l} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1 text-xs text-body">
                      <MapPin size={11} /> {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
