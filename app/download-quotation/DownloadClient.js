"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle2, Download, FileText, Loader2, Mail, MessageCircle, Phone, Receipt } from "lucide-react"
import { SITE, whatsappLink } from "@/lib/site"
import { generateQuotationPDF, generateReceiptPDF } from "@/utils/pdfGenerator"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const TYPES = [
  { id: "quotation", label: "Quotation", prefix: "RQ", example: "RQ0001", Icon: FileText },
  { id: "receipt", label: "Money receipt", prefix: "MR", example: "MR0001", Icon: Receipt },
]

export default function DownloadClient() {
  const [type, setType] = useState("quotation")
  const [id, setId] = useState("")
  const [status, setStatus] = useState("idle") // idle | fetching | generating | success | error
  const [error, setError] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const receipt = params.get("receipt")
    const quotation = params.get("quotation")
    if (receipt) {
      setType("receipt")
      setId(receipt.toUpperCase())
    } else if (quotation) {
      setType("quotation")
      setId(quotation.toUpperCase())
    }
  }, [])

  const current = TYPES.find((t) => t.id === type)
  const busy = status === "fetching" || status === "generating"

  const onSubmit = async (e) => {
    e.preventDefault()
    const ref = id.trim().toUpperCase()
    if (!ref) {
      setError("Enter the reference number printed on your document.")
      setStatus("error")
      return
    }
    setError("")
    setStatus("fetching")
    try {
      const endpoint = type === "quotation" ? `${API_URL}/api/quotations/number/${ref}` : `${API_URL}/api/money-receipts/number/${ref}`
      const res = await fetch(endpoint)
      if (!res.ok) {
        let message = `${current.label} not found. Please check the reference number.`
        try {
          const data = await res.json()
          if (data?.error) message = data.error
        } catch {}
        throw new Error(message)
      }
      const data = await res.json()
      setStatus("generating")
      if (type === "quotation") await generateQuotationPDF(data)
      else await generateReceiptPDF(data)
      setStatus("success")
    } catch (err) {
      setError(err.message || "Unable to generate the document. Please try again.")
      setStatus("error")
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <form onSubmit={onSubmit} className="card">
          <div className="border-b border-line px-6 py-5">
            <h2 className="text-[16px] font-semibold text-ink">Document details</h2>
          </div>
          <div className="space-y-6 p-6">
            <div>
              <div className="label">Document type</div>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Document type">
                {TYPES.map((t) => {
                  const active = t.id === type
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setType(t.id)
                        setStatus("idle")
                        setError("")
                      }}
                      className={`flex items-center gap-3 rounded-md border p-4 text-left transition-colors ${active ? "border-navy-700 bg-navy-50/60 ring-2 ring-navy-700/15" : "border-line hover:border-navy-200"}`}
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${active ? "bg-navy-900 text-white" : "bg-surface-3 text-muted"}`}>
                        <t.Icon size={17} />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-ink">{t.label}</div>
                        <div className="text-xs text-muted">Reference starts with {t.prefix}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="label" htmlFor="doc-ref">
                Reference number
              </label>
              <input
                id="doc-ref"
                className={`input font-mono uppercase ${status === "error" ? "input-error" : ""}`}
                value={id}
                onChange={(e) => {
                  setId(e.target.value.toUpperCase())
                  if (status === "error" || status === "success") setStatus("idle")
                }}
                placeholder={`e.g. ${current.example}`}
                disabled={busy}
                autoComplete="off"
              />
              {status === "error" ? <p className="field-error">{error}</p> : <p className="help">The reference is printed at the top right of the document and included in the WhatsApp message you received.</p>}
            </div>

            {(busy || status === "success") && (
              <div className={`flex items-center gap-3 rounded-md border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-navy-100 bg-navy-50 text-navy-800"}`}>
                {status === "success" ? <CheckCircle2 size={18} /> : <Loader2 size={18} className="animate-spin" />}
                <span>
                  {status === "fetching" && "Retrieving document details…"}
                  {status === "generating" && "Preparing your PDF…"}
                  {status === "success" && "Your PDF has been generated and downloaded."}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-line bg-surface-2 px-6 py-4">
            <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto">
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              Download {current.label.toLowerCase()} PDF
            </button>
          </div>
        </form>
      </div>

      <aside className="space-y-6 lg:col-span-5">
        <div className="card p-6">
          <h3 className="text-[16px] font-semibold text-ink">What each document contains</h3>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex gap-3">
              <FileText size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <dt className="font-semibold text-ink">Quotation</dt>
                <dd className="mt-0.5 leading-relaxed text-body">Itemised transport and service charges, applicable taxes, validity period and terms of service.</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Receipt size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <dt className="font-semibold text-ink">Money receipt</dt>
                <dd className="mt-0.5 leading-relaxed text-body">Amount received, payment mode, service date, balance payable and the linked quotation reference.</dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="card p-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-muted" />
            <div>
              <h3 className="text-[16px] font-semibold text-ink">Cannot find your reference?</h3>
              <p className="mt-1 text-sm leading-relaxed text-body">Contact the office with your registered mobile number and we will resend the document.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a href={SITE.phoneHref} className="btn btn-outline btn-sm">
              <Phone size={14} /> Call
            </a>
            <a href={whatsappLink("Hello, I need a copy of my quotation / receipt.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
          <a href={`mailto:${SITE.email}`} className="mt-3 inline-flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900">
            <Mail size={14} /> {SITE.email}
          </a>
        </div>
      </aside>
    </div>
  )
}
