export function formatINR(amount, { compact = false } = {}) {
  const n = Number(amount) || 0
  if (compact) {
    if (Math.abs(n) >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
    if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(2)} L`
  }
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
}

export function formatNumber(n) {
  return new Intl.NumberFormat("en-IN").format(Number(n) || 0)
}

export function formatDate(value, opts) {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return "—"
  return d.toLocaleDateString("en-IN", opts || { day: "2-digit", month: "short", year: "numeric" })
}

export function toInputDate(value) {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().slice(0, 10)
}

export function todayInput() {
  return toInputDate(new Date())
}

export function addDays(value, days) {
  const d = new Date(value)
  d.setDate(d.getDate() + days)
  return d
}

export function toNumber(value) {
  if (value === "" || value === null || value === undefined) return 0
  const n = parseFloat(value)
  return Number.isNaN(n) ? 0 : n
}
