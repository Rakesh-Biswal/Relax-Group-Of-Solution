"use client"

import { useState } from "react"
import { toast } from "sonner"
import { BadgeCheck, Loader2, Send, Star } from "lucide-react"
import { Stars } from "@/components/site/Blocks"
import { TESTIMONIALS } from "@/lib/site"

const SERVICES = ["Household relocation", "Office relocation", "Vehicle transport", "Packing service", "Storage"]

const RATING_SUMMARY = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
]

export default function FeedbackClient() {
  const [filter, setFilter] = useState("all")
  const [form, setForm] = useState({ name: "", phone: "", route: "", service: "", rating: 5, text: "" })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const list = filter === "all" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.service === filter)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const er = {}
    if (form.name.trim().length < 2) er.name = "Please enter your name."
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) er.phone = "Enter the 10-digit mobile number used for your booking."
    if (!form.service) er.service = "Select the service you used."
    if (form.text.trim().length < 20) er.text = "Please write at least a couple of sentences."
    setErrors(er)
    if (Object.keys(er).length) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setForm({ name: "", phone: "", route: "", service: "", rating: 5, text: "" })
    toast.success("Thank you. Your feedback has been recorded and will be reviewed before publishing.")
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="card grid grid-cols-1 gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="text-center sm:pr-6 sm:text-left">
            <div className="text-5xl font-semibold tracking-tight text-ink">4.9</div>
            <div className="mt-1 flex justify-center sm:justify-start">
              <Stars rating={5} size={16} />
            </div>
            <div className="mt-1 text-xs text-muted">1,200+ verified reviews</div>
          </div>
          <ul className="space-y-1.5">
            {RATING_SUMMARY.map((r) => (
              <li key={r.stars} className="flex items-center gap-3 text-xs text-muted">
                <span className="w-8 shrink-0 text-right font-medium text-ink">{r.stars} ★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="w-8 shrink-0">{r.pct}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter reviews">
          {["all", ...SERVICES].map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={filter === s}
              onClick={() => setFilter(s)}
              className={`rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${filter === s ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-body hover:border-navy-200"}`}
            >
              {s === "all" ? "All services" : s}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {list.map((t) => (
            <li key={t.name} className="card flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[15px] font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-muted">{t.route}</div>
                </div>
                <span className="badge badge-green">
                  <BadgeCheck size={12} /> Verified
                </span>
              </div>
              <div className="mt-3">
                <Stars rating={t.rating} />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-body">“{t.text}”</p>
              <div className="mt-4 border-t border-line pt-3 text-xs text-muted">{t.service}</div>
            </li>
          ))}
          {list.length === 0 && <li className="col-span-full rounded-lg border border-dashed border-line p-10 text-center text-sm text-muted">No reviews in this category yet.</li>}
        </ul>
      </div>

      <aside className="lg:col-span-4">
        <form onSubmit={submit} className="card sticky top-24" noValidate>
          <div className="border-b border-line px-6 py-5">
            <h2 className="text-[16px] font-semibold text-ink">Share your experience</h2>
            <p className="text-[13px] text-muted">Reviews are verified against your booking before they are published.</p>
          </div>
          <div className="space-y-4 p-6">
            <div>
              <label className="label" htmlFor="fb-name">
                Full name
              </label>
              <input id="fb-name" className={`input ${errors.name ? "input-error" : ""}`} value={form.name} onChange={set("name")} />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label className="label" htmlFor="fb-phone">
                Mobile number used for booking
              </label>
              <input id="fb-phone" type="tel" inputMode="numeric" className={`input ${errors.phone ? "input-error" : ""}`} value={form.phone} onChange={set("phone")} />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
            <div>
              <label className="label" htmlFor="fb-route">
                Route
              </label>
              <input id="fb-route" className="input" value={form.route} onChange={set("route")} placeholder="e.g. Cuttack to Pune" />
            </div>
            <div>
              <label className="label" htmlFor="fb-service">
                Service used
              </label>
              <select id="fb-service" className={`input ${errors.service ? "input-error" : ""}`} value={form.service} onChange={set("service")}>
                <option value="">Select</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && <p className="field-error">{errors.service}</p>}
            </div>
            <div>
              <div className="label">Rating</div>
              <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" role="radio" aria-checked={form.rating === n} onClick={() => setForm((f) => ({ ...f, rating: n }))} className="p-0.5" aria-label={`${n} star${n > 1 ? "s" : ""}`}>
                    <Star size={22} className={n <= form.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label" htmlFor="fb-text">
                Your feedback
              </label>
              <textarea id="fb-text" rows={4} className={`input resize-none ${errors.text ? "input-error" : ""}`} value={form.text} onChange={set("text")} />
              {errors.text && <p className="field-error">{errors.text}</p>}
            </div>
          </div>
          <div className="border-t border-line bg-surface-2 px-6 py-4">
            <button type="submit" disabled={submitting} className="btn btn-primary w-full">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              Submit feedback
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}
