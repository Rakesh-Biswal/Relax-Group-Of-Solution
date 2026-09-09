"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Info, MessageCircle, Phone, Truck } from "lucide-react"
import { SITE, whatsappLink } from "@/lib/site"
import { formatINR } from "@/lib/format"

const VEHICLES = [
  { id: "14-17", size: "14–17 ft", capacity: "1–2 BHK", pricePer100km: 10000, note: "Small apartments, studio flats, small offices" },
  { id: "18-20", size: "18–20 ft", capacity: "2–3 BHK", pricePer100km: 15000, note: "Medium homes with full furniture" },
  { id: "22-24", size: "22–24 ft", capacity: "3–4 BHK", pricePer100km: 19000, note: "Large homes, complete household" },
  { id: "32", size: "32 ft", capacity: "Villa / Office", pricePer100km: 25000, note: "Villas, corporate offices, bulk moves" },
]

const INCLUDED = ["Professional packing", "Loading and unloading", "Transportation", "Basic transit cover", "Furniture disassembly", "Reassembly at destination"]

function discountFor(km) {
  if (km > 300) return 30
  if (km > 200) return 20
  if (km > 100) return 10
  return 0
}

export default function PricingCalculator() {
  const [vehicle, setVehicle] = useState(VEHICLES[0])
  const [form, setForm] = useState({ name: "", phone: "", from: "", to: "", distance: "" })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => {
    const v = e.target.value
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const km = Math.max(0, parseInt(form.distance, 10) || 0)
  const estimate = useMemo(() => {
    const base = Math.round((vehicle.pricePer100km / 100) * km)
    const rate = discountFor(km)
    const discount = Math.round((base * rate) / 100)
    return { base, rate, discount, total: base - discount }
  }, [vehicle, km])

  const validate = () => {
    const er = {}
    if (!km) er.distance = "Enter the approximate distance in kilometres."
    if (form.name.trim().length < 2) er.name = "Please enter your name."
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) er.phone = "Enter a valid 10-digit mobile number."
    return er
  }

  const onBook = () => {
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) return
    const lines = [
      "Quotation request (pricing calculator)",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.replace(/\D/g, "")}`,
      `Vehicle: ${vehicle.size} (${vehicle.capacity})`,
      `Distance: ${km} km`,
      `From: ${form.from.trim() || "Not specified"}`,
      `To: ${form.to.trim() || "Not specified"}`,
      "",
      `Base estimate: ${formatINR(estimate.base)}`,
      estimate.rate ? `Distance discount (${estimate.rate}%): -${formatINR(estimate.discount)}` : null,
      `Estimated total: ${formatINR(estimate.total)}`,
      "",
      "Please share the itemised quotation and confirm availability.",
    ].filter((l) => l !== null)
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer")
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-7">
        <div className="card">
          <div className="border-b border-line px-6 py-4">
            <h2 className="text-[16px] font-semibold text-ink">1. Vehicle size</h2>
            <p className="text-[13px] text-muted">Choose the capacity that matches your home or office.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2" role="radiogroup" aria-label="Vehicle size">
            {VEHICLES.map((v) => {
              const active = v.id === vehicle.id
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setVehicle(v)}
                  className={`flex items-start gap-3 rounded-md border p-4 text-left transition-colors ${active ? "border-navy-700 bg-navy-50/60 ring-2 ring-navy-700/15" : "border-line hover:border-navy-200"}`}
                >
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${active ? "bg-navy-900 text-white" : "bg-surface-3 text-muted"}`}>
                    <Truck size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[15px] font-semibold text-ink">{v.size}</span>
                      <span className="text-xs font-medium text-muted">{v.capacity}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted">{v.note}</div>
                    <div className="mt-2 text-[13px] font-semibold text-navy-700">{formatINR(v.pricePer100km)} per 100 km</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="card">
          <div className="border-b border-line px-6 py-4">
            <h2 className="text-[16px] font-semibold text-ink">2. Route and distance</h2>
            <p className="text-[13px] text-muted">Discounts of 10%, 20% and 30% apply automatically beyond 100, 200 and 300 km.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="pc-from">
                Moving from
              </label>
              <input id="pc-from" className="input" value={form.from} onChange={set("from")} placeholder="City / area" />
            </div>
            <div>
              <label className="label" htmlFor="pc-to">
                Moving to
              </label>
              <input id="pc-to" className="input" value={form.to} onChange={set("to")} placeholder="City / area" />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="pc-distance">
                Approximate distance (km)
              </label>
              <input
                id="pc-distance"
                type="number"
                min="1"
                inputMode="numeric"
                className={`input ${errors.distance ? "input-error" : ""}`}
                value={form.distance}
                onChange={set("distance")}
                placeholder="e.g. 420"
              />
              {errors.distance ? <p className="field-error">{errors.distance}</p> : <p className="help">Use the road distance between the two addresses.</p>}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="border-b border-line px-6 py-4">
            <h2 className="text-[16px] font-semibold text-ink">3. Your details</h2>
            <p className="text-[13px] text-muted">Required only if you want to send this estimate to us for a written quotation.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="pc-name">
                Full name
              </label>
              <input id="pc-name" className={`input ${errors.name ? "input-error" : ""}`} value={form.name} onChange={set("name")} autoComplete="name" />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label className="label" htmlFor="pc-phone">
                Mobile number
              </label>
              <input id="pc-phone" type="tel" inputMode="numeric" className={`input ${errors.phone ? "input-error" : ""}`} value={form.phone} onChange={set("phone")} autoComplete="tel" />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Estimate */}
      <div className="lg:col-span-5">
        <div className="card sticky top-24 overflow-hidden">
          <div className="bg-navy-900 px-6 py-5 text-white">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-200">Estimated total</div>
            <div className="mt-1 text-4xl font-semibold tracking-tight">{km ? formatINR(estimate.total) : "—"}</div>
            <div className="mt-1 text-[13px] text-slate-300">
              {vehicle.size} vehicle · {km ? `${km} km` : "distance not entered"}
            </div>
          </div>
          <dl className="px-6 py-4">
            <div className="dl-row border-b border-line">
              <dt>Rate</dt>
              <dd>{formatINR(vehicle.pricePer100km)} / 100 km</dd>
            </div>
            <div className="dl-row border-b border-line">
              <dt>Base amount</dt>
              <dd>{km ? formatINR(estimate.base) : "—"}</dd>
            </div>
            <div className="dl-row border-b border-line">
              <dt>Distance discount {estimate.rate ? `(${estimate.rate}%)` : ""}</dt>
              <dd className={estimate.rate ? "text-emerald-700" : ""}>{km && estimate.rate ? `− ${formatINR(estimate.discount)}` : "—"}</dd>
            </div>
            <div className="dl-row">
              <dt className="font-semibold text-ink">Estimated total</dt>
              <dd className="text-base font-semibold">{km ? formatINR(estimate.total) : "—"}</dd>
            </div>
          </dl>
          <div className="border-t border-line px-6 py-5">
            <div className="text-[13px] font-semibold text-ink">Included in this estimate</div>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-body sm:grid-cols-2">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0 text-brand-600" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line bg-surface-2 px-6 py-5">
            <button type="button" onClick={onBook} className="btn btn-whatsapp w-full">
              <MessageCircle size={16} /> Send estimate for written quotation
            </button>
            <a href={SITE.phoneHref} className="btn btn-outline mt-3 w-full">
              <Phone size={15} /> Call {SITE.phone}
            </a>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
              <Info size={14} className="mt-0.5 shrink-0" />
              This is an indicative estimate. Final pricing depends on actual volume, access at both addresses, packing requirements and applicable
              taxes, and is confirmed in a written quotation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
