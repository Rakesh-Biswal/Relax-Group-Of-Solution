"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { AmountInput, Field, Modal, PercentInput, Segmented } from "./AdminUI"
import { formatINR, toInputDate, toNumber, todayInput } from "@/lib/format"
import { SERVICE_LABELS, TAX_LABELS, VEHICLE_TYPES } from "@/lib/quotation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const empty = () => ({
  customer: { name: "", gender: "Male", phone: "", email: "", address: "" },
  transportation: {
    type: "household",
    householdGoods: { volume: "", approxDistance: "", charge: "" },
    vehicle: { vehicleType: "", approxDistance: "", charge: "" },
  },
  services: {
    packing: "",
    unpacking: "",
    loading: "",
    unloading: "",
    stabilization: "",
    additionalCharge: "",
    electricalService: { disconnect: false, reconnect: false, charge: "" },
  },
  taxes: { fov: "", surcharge: "", gst: "" },
  fromLocation: "",
  toLocation: "",
  quotationDate: todayInput(),
  nextCallingDate: "",
  notes: "",
})

const str = (v) => (v === null || v === undefined ? "" : String(v))

function fromQuotation(q) {
  return {
    customer: {
      name: q.customer?.name || "",
      gender: q.customer?.gender || "Male",
      phone: q.customer?.phone || "",
      email: q.customer?.email || "",
      address: q.customer?.address || "",
    },
    transportation: {
      type: q.transportation?.type || "household",
      householdGoods: {
        volume: q.transportation?.householdGoods?.volume || "",
        approxDistance: q.transportation?.householdGoods?.approxDistance || "",
        charge: str(q.transportation?.householdGoods?.charge || ""),
      },
      vehicle: {
        vehicleType: q.transportation?.vehicle?.vehicleType || "",
        approxDistance: q.transportation?.vehicle?.approxDistance || "",
        charge: str(q.transportation?.vehicle?.charge || ""),
      },
    },
    services: {
      packing: str(q.services?.packing || ""),
      unpacking: str(q.services?.unpacking || ""),
      loading: str(q.services?.loading || ""),
      unloading: str(q.services?.unloading || ""),
      stabilization: str(q.services?.stabilization || ""),
      additionalCharge: str(q.services?.additionalCharge || ""),
      electricalService: {
        disconnect: !!q.services?.electricalService?.disconnect,
        reconnect: !!q.services?.electricalService?.reconnect,
        charge: str(q.services?.electricalService?.charge || ""),
      },
    },
    taxes: {
      fov: str(q.taxes?.fov?.percentage || ""),
      surcharge: str(q.taxes?.surcharge?.percentage || ""),
      gst: str(q.taxes?.gst?.percentage || ""),
    },
    fromLocation: q.fromLocation || "",
    toLocation: q.toLocation || "",
    quotationDate: toInputDate(q.quotationDate) || todayInput(),
    nextCallingDate: toInputDate(q.nextCallingDate),
    notes: q.notes || "",
  }
}

function setPath(obj, path, value) {
  const keys = path.split(".")
  const clone = { ...obj }
  let cur = clone
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = { ...cur[keys[i]] }
    cur = cur[keys[i]]
  }
  cur[keys[keys.length - 1]] = value
  return clone
}

export default function QuotationForm({ open, onClose, quotation, onSaved }) {
  const mode = quotation ? "edit" : "create"
  const [form, setForm] = useState(empty())
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    setForm(quotation ? fromQuotation(quotation) : empty())
    setErrors({})
  }, [open, quotation])

  const update = (path, value) => {
    setForm((f) => setPath(f, path, value))
    if (errors[path]) setErrors((e) => ({ ...e, [path]: undefined }))
  }

  const totals = useMemo(() => {
    const t = form.transportation
    const transport = t.type === "household" ? toNumber(t.householdGoods.charge) : toNumber(t.vehicle.charge)
    const s = form.services
    const services =
      toNumber(s.packing) + toNumber(s.unpacking) + toNumber(s.loading) + toNumber(s.unloading) + toNumber(s.stabilization) + toNumber(s.additionalCharge) + toNumber(s.electricalService.charge)
    const subtotal = transport + services
    const fov = Math.round(subtotal * (toNumber(form.taxes.fov) / 100))
    const surcharge = Math.round(subtotal * (toNumber(form.taxes.surcharge) / 100))
    const gst = Math.round(subtotal * (toNumber(form.taxes.gst) / 100))
    return { transport, services, subtotal, fov, surcharge, gst, total: subtotal + fov + surcharge + gst }
  }, [form])

  const validate = () => {
    const e = {}
    if (!form.customer.name.trim()) e["customer.name"] = "Customer name is required."
    if (!/^\d{10}$/.test(form.customer.phone.replace(/\D/g, ""))) e["customer.phone"] = "Enter a 10-digit mobile number."
    if (form.customer.email && !/^\S+@\S+\.\S+$/.test(form.customer.email)) e["customer.email"] = "Enter a valid email address."
    if (!form.customer.address.trim()) e["customer.address"] = "Address is required."
    if (!form.fromLocation.trim()) e["fromLocation"] = "Origin is required."
    if (!form.toLocation.trim()) e["toLocation"] = "Destination is required."
    if (!form.quotationDate) e["quotationDate"] = "Quotation date is required."
    if (form.transportation.type === "household") {
      if (!toNumber(form.transportation.householdGoods.charge)) e["transportation.householdGoods.charge"] = "Enter the transportation charge."
    } else {
      if (!form.transportation.vehicle.vehicleType) e["transportation.vehicle.vehicleType"] = "Select the vehicle type."
      if (!toNumber(form.transportation.vehicle.charge)) e["transportation.vehicle.charge"] = "Enter the transportation charge."
    }
    const es = form.services.electricalService
    if ((es.disconnect || es.reconnect) && !toNumber(es.charge)) e["services.electricalService.charge"] = "Enter the electrical service charge."
    return e
  }

  const save = async () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      toast.error("Please correct the highlighted fields.")
      return
    }
    setSaving(true)
    const payload = {
      customer: {
        name: form.customer.name.trim(),
        gender: form.customer.gender,
        phone: form.customer.phone.replace(/\D/g, ""),
        email: form.customer.email.trim(),
        address: form.customer.address.trim(),
      },
      transportation: {
        type: form.transportation.type,
        householdGoods: {
          volume: form.transportation.householdGoods.volume.trim(),
          approxDistance: form.transportation.householdGoods.approxDistance.trim(),
          charge: toNumber(form.transportation.householdGoods.charge),
        },
        vehicle: {
          vehicleType: form.transportation.vehicle.vehicleType.trim(),
          approxDistance: form.transportation.vehicle.approxDistance.trim(),
          charge: toNumber(form.transportation.vehicle.charge),
        },
      },
      services: {
        packing: toNumber(form.services.packing),
        unpacking: toNumber(form.services.unpacking),
        loading: toNumber(form.services.loading),
        unloading: toNumber(form.services.unloading),
        stabilization: toNumber(form.services.stabilization),
        additionalCharge: toNumber(form.services.additionalCharge),
        electricalService: {
          disconnect: form.services.electricalService.disconnect,
          reconnect: form.services.electricalService.reconnect,
          charge: toNumber(form.services.electricalService.charge),
        },
      },
      taxes: {
        fov: { percentage: toNumber(form.taxes.fov), amount: totals.fov },
        surcharge: { percentage: toNumber(form.taxes.surcharge), amount: totals.surcharge },
        gst: { percentage: toNumber(form.taxes.gst), amount: totals.gst },
      },
      fromLocation: form.fromLocation.trim(),
      toLocation: form.toLocation.trim(),
      quotationDate: form.quotationDate,
      nextCallingDate: form.nextCallingDate || undefined,
      notes: form.notes.trim(),
      totalAmount: totals.total,
    }
    try {
      const url = mode === "edit" ? `${API_URL}/api/quotations/${quotation._id}` : `${API_URL}/api/quotations`
      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "The server rejected the quotation.")
      toast.success(mode === "edit" ? `Quotation ${data.quotationNumber} updated.` : `Quotation ${data.quotationNumber} created.`)
      onSaved(data)
      onClose()
    } catch (err) {
      toast.error(err.message || "Unable to save the quotation.")
    } finally {
      setSaving(false)
    }
  }

  const isHousehold = form.transportation.type === "household"

  return (
    <Modal
      open={open}
      onClose={saving ? undefined : onClose}
      size="xl"
      title={mode === "edit" ? `Edit quotation ${quotation?.quotationNumber || ""}` : "New quotation"}
      subtitle={mode === "edit" ? "Changes are saved to the existing reference." : "A reference number is assigned when the quotation is saved."}
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted">
            Grand total: <span className="font-semibold text-ink">{formatINR(totals.total)}</span>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} disabled={saving} className="btn btn-outline">
              Cancel
            </button>
            <button type="button" onClick={save} disabled={saving} className="btn btn-primary">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {mode === "edit" ? "Save changes" : "Create quotation"}
            </button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          {/* Customer */}
          <section className="card p-5">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Customer</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-6">
              <Field label="Full name" htmlFor="q-name" required error={errors["customer.name"]} className="sm:col-span-4">
                <input id="q-name" className={`input ${errors["customer.name"] ? "input-error" : ""}`} value={form.customer.name} onChange={(e) => update("customer.name", e.target.value)} />
              </Field>
              <Field label="Title" htmlFor="q-gender" className="sm:col-span-2">
                <select id="q-gender" className="input" value={form.customer.gender} onChange={(e) => update("customer.gender", e.target.value)}>
                  <option value="Male">Mr.</option>
                  <option value="Female">Ms.</option>
                </select>
              </Field>
              <Field label="Mobile number" htmlFor="q-phone" required error={errors["customer.phone"]} className="sm:col-span-3">
                <input id="q-phone" type="tel" inputMode="numeric" className={`input ${errors["customer.phone"] ? "input-error" : ""}`} value={form.customer.phone} onChange={(e) => update("customer.phone", e.target.value)} />
              </Field>
              <Field label="Email" htmlFor="q-email" error={errors["customer.email"]} className="sm:col-span-3">
                <input id="q-email" type="email" className={`input ${errors["customer.email"] ? "input-error" : ""}`} value={form.customer.email} onChange={(e) => update("customer.email", e.target.value)} />
              </Field>
              <Field label="Address" htmlFor="q-address" required error={errors["customer.address"]} className="sm:col-span-6">
                <textarea id="q-address" rows={2} className={`input resize-none ${errors["customer.address"] ? "input-error" : ""}`} value={form.customer.address} onChange={(e) => update("customer.address", e.target.value)} />
              </Field>
            </div>
          </section>

          {/* Move details */}
          <section className="card p-5">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Move details</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="From" htmlFor="q-from" required error={errors["fromLocation"]}>
                <input id="q-from" className={`input ${errors["fromLocation"] ? "input-error" : ""}`} value={form.fromLocation} onChange={(e) => update("fromLocation", e.target.value)} placeholder="City / area" />
              </Field>
              <Field label="To" htmlFor="q-to" required error={errors["toLocation"]}>
                <input id="q-to" className={`input ${errors["toLocation"] ? "input-error" : ""}`} value={form.toLocation} onChange={(e) => update("toLocation", e.target.value)} placeholder="City / area" />
              </Field>
              <Field label="Quotation date" htmlFor="q-date" required error={errors["quotationDate"]}>
                <input id="q-date" type="date" className={`input ${errors["quotationDate"] ? "input-error" : ""}`} value={form.quotationDate} onChange={(e) => update("quotationDate", e.target.value)} />
              </Field>
              <Field label="Follow-up date" htmlFor="q-follow" help="Internal reminder; not printed on the quotation.">
                <input id="q-follow" type="date" className="input" value={form.nextCallingDate} onChange={(e) => update("nextCallingDate", e.target.value)} />
              </Field>
            </div>
          </section>

          {/* Transportation */}
          <section className="card p-5">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Transportation</h3>
            <div className="mt-4">
              <Segmented
                value={form.transportation.type}
                onChange={(v) => update("transportation.type", v)}
                options={[
                  { value: "household", label: "Household goods", hint: "Furniture, appliances, belongings" },
                  { value: "vehicle", label: "Vehicle", hint: "Car, bike, scooter" },
                ]}
              />
            </div>
            {isHousehold ? (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Volume" htmlFor="q-volume" help="e.g. 850 cu ft">
                  <input id="q-volume" className="input" value={form.transportation.householdGoods.volume} onChange={(e) => update("transportation.householdGoods.volume", e.target.value)} />
                </Field>
                <Field label="Approx. distance" htmlFor="q-hdist" help="e.g. 420 km">
                  <input id="q-hdist" className="input" value={form.transportation.householdGoods.approxDistance} onChange={(e) => update("transportation.householdGoods.approxDistance", e.target.value)} />
                </Field>
                <Field label="Transportation charge" htmlFor="q-hcharge" required error={errors["transportation.householdGoods.charge"]}>
                  <AmountInput id="q-hcharge" value={form.transportation.householdGoods.charge} onChange={(v) => update("transportation.householdGoods.charge", v)} error={errors["transportation.householdGoods.charge"]} />
                </Field>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Vehicle type" htmlFor="q-vtype" required error={errors["transportation.vehicle.vehicleType"]}>
                  <select id="q-vtype" className={`input ${errors["transportation.vehicle.vehicleType"] ? "input-error" : ""}`} value={form.transportation.vehicle.vehicleType} onChange={(e) => update("transportation.vehicle.vehicleType", e.target.value)}>
                    <option value="">Select</option>
                    {VEHICLE_TYPES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Approx. distance" htmlFor="q-vdist" help="e.g. 420 km">
                  <input id="q-vdist" className="input" value={form.transportation.vehicle.approxDistance} onChange={(e) => update("transportation.vehicle.approxDistance", e.target.value)} />
                </Field>
                <Field label="Transportation charge" htmlFor="q-vcharge" required error={errors["transportation.vehicle.charge"]}>
                  <AmountInput id="q-vcharge" value={form.transportation.vehicle.charge} onChange={(v) => update("transportation.vehicle.charge", v)} error={errors["transportation.vehicle.charge"]} />
                </Field>
              </div>
            )}
          </section>

          {/* Services */}
          <section className="card p-5">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Supporting services</h3>
            <p className="mt-1 text-[13px] text-muted">Leave a field blank if the service is not included.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Object.keys(SERVICE_LABELS).map((k) => (
                <Field key={k} label={SERVICE_LABELS[k]} htmlFor={`q-svc-${k}`}>
                  <AmountInput id={`q-svc-${k}`} value={form.services[k]} onChange={(v) => update(`services.${k}`, v)} />
                </Field>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-5">
              <div className="text-[13px] font-medium text-ink">Electrical service</div>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
                <label className="flex items-center gap-2.5 text-sm text-ink">
                  <input type="checkbox" className="h-4 w-4 rounded border-line accent-navy-800" checked={form.services.electricalService.disconnect} onChange={(e) => update("services.electricalService.disconnect", e.target.checked)} />
                  Disconnection at origin
                </label>
                <label className="flex items-center gap-2.5 text-sm text-ink">
                  <input type="checkbox" className="h-4 w-4 rounded border-line accent-navy-800" checked={form.services.electricalService.reconnect} onChange={(e) => update("services.electricalService.reconnect", e.target.checked)} />
                  Reconnection at destination
                </label>
                <Field label="Electrical charge" htmlFor="q-elec" error={errors["services.electricalService.charge"]}>
                  <AmountInput
                    id="q-elec"
                    value={form.services.electricalService.charge}
                    onChange={(v) => update("services.electricalService.charge", v)}
                    error={errors["services.electricalService.charge"]}
                    disabled={!form.services.electricalService.disconnect && !form.services.electricalService.reconnect}
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Taxes and notes */}
          <section className="card p-5">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Taxes</h3>
            <p className="mt-1 text-[13px] text-muted">Percentages are applied to the subtotal. Use CGST and SGST for intra-state moves, IGST for interstate.</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {Object.keys(TAX_LABELS).map((k) => (
                <Field key={k} label={TAX_LABELS[k]} htmlFor={`q-tax-${k}`}>
                  <PercentInput id={`q-tax-${k}`} value={form.taxes[k]} onChange={(v) => update(`taxes.${k}`, v)} />
                </Field>
              ))}
            </div>
            <Field label="Notes and special instructions" htmlFor="q-notes" help="Printed on the quotation under “Special instructions”." className="mt-5">
              <textarea id="q-notes" rows={3} className="input resize-none" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
            </Field>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="card sticky top-0 overflow-hidden">
            <div className="border-b border-line bg-white px-5 py-4">
              <h3 className="text-[14px] font-semibold uppercase tracking-wider text-muted">Summary</h3>
            </div>
            <dl className="px-5 py-2">
              <div className="dl-row border-b border-line">
                <dt>Transportation</dt>
                <dd>{formatINR(totals.transport)}</dd>
              </div>
              <div className="dl-row border-b border-line">
                <dt>Services</dt>
                <dd>{formatINR(totals.services)}</dd>
              </div>
              <div className="dl-row border-b border-line">
                <dt className="font-medium text-ink">Subtotal</dt>
                <dd>{formatINR(totals.subtotal)}</dd>
              </div>
              {totals.fov > 0 && (
                <div className="dl-row border-b border-line">
                  <dt>CGST ({toNumber(form.taxes.fov)}%)</dt>
                  <dd>{formatINR(totals.fov)}</dd>
                </div>
              )}
              {totals.surcharge > 0 && (
                <div className="dl-row border-b border-line">
                  <dt>SGST ({toNumber(form.taxes.surcharge)}%)</dt>
                  <dd>{formatINR(totals.surcharge)}</dd>
                </div>
              )}
              {totals.gst > 0 && (
                <div className="dl-row border-b border-line">
                  <dt>IGST ({toNumber(form.taxes.gst)}%)</dt>
                  <dd>{formatINR(totals.gst)}</dd>
                </div>
              )}
            </dl>
            <div className="flex items-center justify-between bg-navy-900 px-5 py-4 text-white">
              <span className="text-sm font-medium">Grand total</span>
              <span className="text-xl font-semibold tabular-nums">{formatINR(totals.total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </Modal>
  )
}
