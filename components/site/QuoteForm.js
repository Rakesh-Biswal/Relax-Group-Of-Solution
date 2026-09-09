"use client"

import { useState } from "react"
import { CheckCircle2, MessageCircle, Phone } from "lucide-react"
import { SITE, whatsappLink } from "@/lib/site"

const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "Villa / Independent house", "Office", "Car / Bike only", "Other"]

const COPY = {
  en: {
    title: "Request a quotation",
    subtitle: "We reply on WhatsApp, usually within 30 minutes.",
    name: "Full name",
    phone: "Mobile number",
    from: "Moving from",
    to: "Moving to",
    type: "Property type",
    date: "Preferred date",
    notes: "Additional details",
    notesPh: "Floor, lift access, fragile items, vehicle, storage…",
    select: "Select",
    submit: "Send request on WhatsApp",
    or: "or call",
    successTitle: "Request prepared",
    successText: "WhatsApp has opened with your details. If it did not, use the button below.",
    reopen: "Open WhatsApp",
    another: "Submit another request",
    privacy: "Your details are used only to prepare your quotation.",
    errors: {
      name: "Please enter your name.",
      phone: "Enter a valid 10-digit Indian mobile number.",
      from: "Please enter the pickup location.",
      to: "Please enter the destination.",
      type: "Please choose a property type.",
    },
  },
  or: {
    title: "କୋଟେସନ୍ ପାଇଁ ଅନୁରୋଧ",
    subtitle: "ଆମେ ସାଧାରଣତଃ ୩୦ ମିନିଟ୍ ମଧ୍ୟରେ WhatsApp ରେ ଉତ୍ତର ଦେଉ ।",
    name: "ପୂରା ନାମ",
    phone: "ମୋବାଇଲ୍ ନମ୍ବର",
    from: "କେଉଁଠାରୁ",
    to: "କେଉଁଠାକୁ",
    type: "ଘରର ପ୍ରକାର",
    date: "ପସନ୍ଦର ତାରିଖ",
    notes: "ଅତିରିକ୍ତ ବିବରଣୀ",
    notesPh: "ମହଲା, ଲିଫ୍ଟ, ଭଙ୍ଗୁର ଜିନିଷ, ଗାଡ଼ି…",
    select: "ବାଛନ୍ତୁ",
    submit: "WhatsApp ରେ ପଠାନ୍ତୁ",
    or: "କିମ୍ବା କଲ୍ କରନ୍ତୁ",
    successTitle: "ଅନୁରୋଧ ପ୍ରସ୍ତୁତ",
    successText: "ଆପଣଙ୍କ ବିବରଣୀ ସହିତ WhatsApp ଖୋଲିଛି । ନ ଖୋଲିଥିଲେ ତଳ ବଟନ୍ ବ୍ୟବହାର କରନ୍ତୁ ।",
    reopen: "WhatsApp ଖୋଲନ୍ତୁ",
    another: "ଆଉ ଏକ ଅନୁରୋଧ",
    privacy: "ଆପଣଙ୍କ ବିବରଣୀ କେବଳ କୋଟେସନ୍ ପାଇଁ ବ୍ୟବହୃତ ହେବ ।",
    errors: {
      name: "ଦୟାକରି ନାମ ଲେଖନ୍ତୁ ।",
      phone: "ସଠିକ୍ ୧୦ ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଦିଅନ୍ତୁ ।",
      from: "ଦୟାକରି ପିକଅପ୍ ସ୍ଥାନ ଲେଖନ୍ତୁ ।",
      to: "ଦୟାକରି ଗନ୍ତବ୍ୟ ସ୍ଥାନ ଲେଖନ୍ତୁ ।",
      type: "ଦୟାକରି ଘରର ପ୍ରକାର ବାଛନ୍ତୁ ।",
    },
  },
}

const EMPTY = { name: "", phone: "", from: "", to: "", type: "", date: "", notes: "" }

export default function QuoteForm({ compact = false, title, className = "" }) {
  const [lang, setLang] = useState("en")
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)
  const t = COPY[lang]

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = t.errors.name
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) er.phone = t.errors.phone
    if (form.from.trim().length < 3) er.from = t.errors.from
    if (form.to.trim().length < 3) er.to = t.errors.to
    if (!form.type) er.type = t.errors.type
    return er
  }

  const buildMessage = () =>
    [
      "New relocation enquiry (website)",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.replace(/\D/g, "")}`,
      `Property: ${form.type}`,
      `From: ${form.from.trim()}`,
      `To: ${form.to.trim()}`,
      form.date ? `Preferred date: ${form.date}` : null,
      form.notes.trim() ? `Details: ${form.notes.trim()}` : null,
      "",
      `Submitted: ${new Date().toLocaleString("en-IN")}`,
    ]
      .filter((l) => l !== null)
      .join("\n")

  const onSubmit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) return
    const url = whatsappLink(buildMessage())
    window.open(url, "_blank", "noopener,noreferrer")
    setSent(url)
  }

  const reset = () => {
    setForm(EMPTY)
    setErrors({})
    setSent(null)
  }

  const inputCls = (k) => `input ${errors[k] ? "input-error" : ""}`

  return (
    <div className={`card shadow-float ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
        <div>
          <h3 className="text-lg font-semibold text-ink">{title || t.title}</h3>
          <p className="mt-0.5 text-[13px] text-muted">{t.subtitle}</p>
        </div>
        <div className="flex shrink-0 rounded-md border border-line p-0.5 text-xs font-semibold" role="group" aria-label="Language">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded px-2.5 py-1 ${lang === "en" ? "bg-navy-900 text-white" : "text-muted hover:text-ink"}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("or")}
            className={`rounded px-2.5 py-1 ${lang === "or" ? "bg-navy-900 text-white" : "text-muted hover:text-ink"}`}
          >
            ଓଡ଼ିଆ
          </button>
        </div>
      </div>

      {sent ? (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="mt-4 text-lg font-semibold text-ink">{t.successTitle}</h4>
          <p className="mx-auto mt-2 max-w-sm text-sm text-body">{t.successText}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={sent} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <MessageCircle size={16} /> {t.reopen}
            </a>
            <button type="button" onClick={reset} className="btn btn-outline">
              {t.another}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="px-6 py-5">
          <div className={`grid grid-cols-1 gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
            <div>
              <label className="label" htmlFor="qf-name">
                {t.name}
              </label>
              <input id="qf-name" className={inputCls("name")} value={form.name} onChange={set("name")} autoComplete="name" />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label className="label" htmlFor="qf-phone">
                {t.phone}
              </label>
              <input
                id="qf-phone"
                type="tel"
                inputMode="numeric"
                className={inputCls("phone")}
                value={form.phone}
                onChange={set("phone")}
                autoComplete="tel"
                placeholder="10-digit mobile"
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
            <div>
              <label className="label" htmlFor="qf-from">
                {t.from}
              </label>
              <input id="qf-from" className={inputCls("from")} value={form.from} onChange={set("from")} placeholder="City / area" />
              {errors.from && <p className="field-error">{errors.from}</p>}
            </div>
            <div>
              <label className="label" htmlFor="qf-to">
                {t.to}
              </label>
              <input id="qf-to" className={inputCls("to")} value={form.to} onChange={set("to")} placeholder="City / area" />
              {errors.to && <p className="field-error">{errors.to}</p>}
            </div>
            <div>
              <label className="label" htmlFor="qf-type">
                {t.type}
              </label>
              <select id="qf-type" className={inputCls("type")} value={form.type} onChange={set("type")}>
                <option value="">{t.select}</option>
                {PROPERTY_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.type && <p className="field-error">{errors.type}</p>}
            </div>
            <div>
              <label className="label" htmlFor="qf-date">
                {t.date} <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id="qf-date" type="date" className="input" value={form.date} onChange={set("date")} min={new Date().toISOString().slice(0, 10)} />
            </div>
            <div className={compact ? "" : "sm:col-span-2"}>
              <label className="label" htmlFor="qf-notes">
                {t.notes} <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea id="qf-notes" rows={compact ? 2 : 3} className="input resize-none" value={form.notes} onChange={set("notes")} placeholder={t.notesPh} />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              <MessageCircle size={16} /> {t.submit}
            </button>
            <span className="text-center text-sm text-muted sm:text-left">
              {t.or}{" "}
              <a href={SITE.phoneHref} className="inline-flex items-center gap-1 font-semibold text-navy-700 hover:text-navy-900">
                <Phone size={13} /> {SITE.phone}
              </a>
            </span>
          </div>
          <p className="mt-4 text-xs text-muted">{t.privacy}</p>
        </form>
      )}
    </div>
  )
}
