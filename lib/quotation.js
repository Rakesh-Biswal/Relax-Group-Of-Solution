// Shared quotation calculations and labels used by the admin console and PDF generator.

export const SERVICE_LABELS = {
  packing: "Packing",
  unpacking: "Unpacking",
  loading: "Loading",
  unloading: "Unloading",
  stabilization: "Stabilisation and placement",
  additionalCharge: "Additional charges",
}

export const TAX_LABELS = {
  fov: "CGST",
  surcharge: "SGST",
  gst: "IGST",
}

export const VEHICLE_TYPES = ["Car", "Bike", "Scooter", "Truck", "Other"]
export const RECEIPT_TYPES = ["Advance", "Half Payment", "Full Payment"]
export const PAYMENT_MODES = ["Cash", "PhonePe", "Google Pay", "Paytm", "Net Banking", "UPI Transfer"]

export function honorific(gender) {
  return gender === "Female" ? "Ms." : "Mr."
}

export function validUntil(quotation, days = 30) {
  const d = new Date(quotation?.quotationDate || Date.now())
  d.setDate(d.getDate() + days)
  return d
}

function num(v) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

export function electricalLabel(es) {
  if (!es) return "Electrical service"
  if (es.disconnect && es.reconnect) return "Electrical disconnection and reconnection"
  if (es.disconnect) return "Electrical disconnection"
  if (es.reconnect) return "Electrical reconnection"
  return "Electrical service"
}

/**
 * Breaks a saved quotation into displayable lines.
 * Amounts are taken from the stored document so the view always matches what was issued.
 */
export function quotationLines(q) {
  const t = q?.transportation || {}
  const isHousehold = (t.type || "household") === "household"
  const hg = t.householdGoods || {}
  const vh = t.vehicle || {}

  const transport = isHousehold
    ? {
        label: "Household goods transportation",
        detail: [hg.volume ? `Volume: ${hg.volume}` : null, hg.approxDistance ? `Distance: ${hg.approxDistance}` : null].filter(Boolean).join(" · "),
        amount: num(hg.charge),
      }
    : {
        label: "Vehicle transportation",
        detail: [vh.vehicleType ? `Vehicle: ${vh.vehicleType}` : null, vh.approxDistance ? `Distance: ${vh.approxDistance}` : null].filter(Boolean).join(" · "),
        amount: num(vh.charge),
      }

  const s = q?.services || {}
  const services = Object.keys(SERVICE_LABELS)
    .filter((k) => num(s[k]) > 0)
    .map((k) => ({ key: k, label: SERVICE_LABELS[k], amount: num(s[k]) }))

  const es = s.electricalService
  const electrical = es && (es.disconnect || es.reconnect) && num(es.charge) > 0 ? { label: electricalLabel(es), amount: num(es.charge) } : null

  const servicesTotal = services.reduce((sum, x) => sum + x.amount, 0) + (electrical ? electrical.amount : 0)
  const subtotal = transport.amount + servicesTotal

  const tx = q?.taxes || {}
  const taxes = Object.keys(TAX_LABELS)
    .filter((k) => num(tx[k]?.amount) > 0)
    .map((k) => ({ key: k, label: TAX_LABELS[k], percentage: num(tx[k]?.percentage), amount: num(tx[k]?.amount) }))

  const taxTotal = taxes.reduce((sum, x) => sum + x.amount, 0)
  const total = q?.totalAmount != null ? num(q.totalAmount) : subtotal + taxTotal

  return { isHousehold, transport, services, electrical, servicesTotal, subtotal, taxes, taxTotal, total }
}
