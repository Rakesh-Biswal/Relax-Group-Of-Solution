"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { AmountInput, Field, Modal } from "./AdminUI"
import { formatINR, toInputDate, toNumber } from "@/lib/format"
import { PAYMENT_MODES, RECEIPT_TYPES, honorific } from "@/lib/quotation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const SUGGESTED = { Advance: 0.2, "Half Payment": 0.5, "Full Payment": 1 }

export default function ReceiptForm({ open, onClose, quotation, receipt, onSaved }) {
  const mode = receipt ? "edit" : "create"
  const [form, setForm] = useState({ serviceDate: "", totalAmount: "", receiptType: "Advance", receivedAmount: "", paymentMode: "Cash", notes: "" })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    if (receipt) {
      setForm({
        serviceDate: toInputDate(receipt.serviceDate),
        totalAmount: String(receipt.totalAmount ?? ""),
        receiptType: receipt.receiptType || "Advance",
        receivedAmount: String(receipt.receivedAmount ?? ""),
        paymentMode: receipt.paymentMode || "Cash",
        notes: receipt.notes || "",
      })
    } else {
      const total = quotation?.totalAmount || 0
      setForm({ serviceDate: "", totalAmount: String(total || ""), receiptType: "Advance", receivedAmount: String(Math.round(total * SUGGESTED.Advance) || ""), paymentMode: "Cash", notes: "" })
    }
    setErrors({})
  }, [open, receipt, quotation])

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onTypeChange = (type) => {
    const total = toNumber(form.totalAmount)
    setForm((f) => ({ ...f, receiptType: type, receivedAmount: total ? String(Math.round(total * SUGGESTED[type])) : f.receivedAmount }))
  }

  const total = toNumber(form.totalAmount)
  const received = toNumber(form.receivedAmount)
  const balance = Math.max(0, total - received)

  const save = async () => {
    const e = {}
    if (!form.serviceDate) e.serviceDate = "Service date is required."
    if (total <= 0) e.totalAmount = "Total amount must be greater than zero."
    if (received <= 0) e.receivedAmount = "Received amount must be greater than zero."
    if (received > total) e.receivedAmount = "Received amount cannot exceed the total amount."
    setErrors(e)
    if (Object.keys(e).length) {
      toast.error("Please correct the highlighted fields.")
      return
    }
    setSaving(true)
    const payload = {
      quotation: quotation._id,
      serviceDate: form.serviceDate,
      totalAmount: total,
      receiptType: form.receiptType,
      receivedAmount: received,
      paymentMode: form.paymentMode,
      customer: {
        name: quotation.customer?.name,
        gender: quotation.customer?.gender,
        phone: quotation.customer?.phone,
        email: quotation.customer?.email || "",
        address: quotation.customer?.address,
      },
      fromLocation: quotation.fromLocation,
      toLocation: quotation.toLocation,
      notes: form.notes.trim(),
    }
    try {
      const url = mode === "edit" ? `${API_URL}/api/money-receipts/${receipt._id}` : `${API_URL}/api/money-receipts`
      const res = await fetch(url, { method: mode === "edit" ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), credentials: "include" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "The server rejected the receipt.")
      toast.success(mode === "edit" ? `Receipt ${data.receiptNumber} updated.` : `Receipt ${data.receiptNumber} created.`)
      onSaved(data)
      onClose()
    } catch (err) {
      toast.error(err.message || "Unable to save the receipt.")
    } finally {
      setSaving(false)
    }
  }

  if (!quotation) return null

  return (
    <Modal
      open={open}
      onClose={saving ? undefined : onClose}
      size="md"
      title={mode === "edit" ? `Edit receipt ${receipt?.receiptNumber || ""}` : "New money receipt"}
      subtitle={`Against quotation ${quotation.quotationNumber}`}
      footer={
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={saving} className="btn btn-outline">
            Cancel
          </button>
          <button type="button" onClick={save} disabled={saving} className="btn btn-primary">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {mode === "edit" ? "Save changes" : "Create receipt"}
          </button>
        </div>
      }
    >
      <div className="space-y-5 p-5 sm:p-6">
        <section className="card p-5">
          <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Reference</h3>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-muted">Customer</dt>
              <dd className="font-medium text-ink">
                {honorific(quotation.customer?.gender)} {quotation.customer?.name}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="font-medium text-ink">{quotation.customer?.phone}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Route</dt>
              <dd className="font-medium text-ink">
                {quotation.fromLocation} → {quotation.toLocation}
              </dd>
            </div>
          </dl>
        </section>

        <section className="card p-5">
          <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Payment</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Service date" htmlFor="r-date" required error={errors.serviceDate}>
              <input id="r-date" type="date" className={`input ${errors.serviceDate ? "input-error" : ""}`} value={form.serviceDate} onChange={(e) => set("serviceDate", e.target.value)} />
            </Field>
            <Field label="Total service amount" htmlFor="r-total" required error={errors.totalAmount}>
              <AmountInput id="r-total" value={form.totalAmount} onChange={(v) => set("totalAmount", v)} error={errors.totalAmount} />
            </Field>
            <Field label="Payment type" htmlFor="r-type" required>
              <select id="r-type" className="input" value={form.receiptType} onChange={(e) => onTypeChange(e.target.value)}>
                {RECEIPT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Amount received" htmlFor="r-received" required error={errors.receivedAmount} help={`Suggested: ${Math.round(SUGGESTED[form.receiptType] * 100)}% of total`}>
              <AmountInput id="r-received" value={form.receivedAmount} onChange={(v) => set("receivedAmount", v)} error={errors.receivedAmount} />
            </Field>
            <Field label="Payment mode" htmlFor="r-mode" required>
              <select id="r-mode" className="input" value={form.paymentMode} onChange={(e) => set("paymentMode", e.target.value)}>
                {PAYMENT_MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
            <div className="rounded-md border border-line bg-surface-2 p-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Received</span>
                <span className="font-medium text-ink">{formatINR(received)}</span>
              </div>
              <div className="mt-1 flex justify-between text-muted">
                <span>Balance payable</span>
                <span className={`font-semibold ${balance > 0 ? "text-brand-600" : "text-emerald-700"}`}>{formatINR(balance)}</span>
              </div>
            </div>
          </div>
          <Field label="Notes" htmlFor="r-notes" className="mt-4" help="Printed on the receipt under “Payment notes”.">
            <textarea id="r-notes" rows={2} className="input resize-none" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </Field>
        </section>
      </div>
    </Modal>
  )
}
