"use client"

import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { honorific, quotationLines, validUntil } from "@/lib/quotation"

const NAVY = "#0f1b3d"
const BRAND = "#f15a29"
const INK = "#0f172a"
const BODY = "#475569"
const MUTED = "#64748b"
const LINE = "#e2e8f0"

const COMPANY = {
  name: "RELAX PACKERS & MOVERS",
  tagline: "A unit of Relax Group",
  address: "Khata No. 313/143, Plot No. 945/1260, Tangarhuda, Satinagar, Markat Nagar, Cuttack, Odisha 753014",
  phone: "+91 97776 52315",
  email: "bookrelaxpackers@gmail.com",
  gstin: "21BUQPN8897R1Z8",
  web: "packers.relaxgroup.in",
}

const inr = (n) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(n) || 0)}`
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—")
const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>")

async function loadImage(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

function header(logo, title, meta) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        ${logo ? `<img src="${logo}" alt="" style="height:44px;width:auto;display:block;" />` : `<div style="font-size:16pt;font-weight:700;color:${NAVY};">${COMPANY.name}</div>`}
        <div style="margin-top:10px;font-size:8.5pt;line-height:1.5;color:${BODY};max-width:340px;">
          <div style="font-weight:700;color:${INK};">${COMPANY.name}</div>
          <div>${COMPANY.address}</div>
          <div>${COMPANY.phone} · ${COMPANY.email} · ${COMPANY.web}</div>
          <div>GSTIN ${COMPANY.gstin}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:20pt;font-weight:700;letter-spacing:0.08em;color:${NAVY};">${title}</div>
        <table style="margin-top:8px;margin-left:auto;font-size:8.5pt;border-collapse:collapse;">
          ${meta.map(([k, v]) => `<tr><td style="padding:2px 10px 2px 0;color:${MUTED};text-align:right;">${k}</td><td style="padding:2px 0;font-weight:600;color:${INK};text-align:right;white-space:nowrap;">${v}</td></tr>`).join("")}
        </table>
      </div>
    </div>
    <div style="height:2px;background:${NAVY};margin:14px 0 4px;"></div>
    <div style="height:2px;background:${BRAND};width:64px;margin-bottom:16px;"></div>
  `
}

function block(title, bodyHtml) {
  return `
    <div style="flex:1;">
      <div style="font-size:7.5pt;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};margin-bottom:6px;">${title}</div>
      <div style="font-size:9pt;line-height:1.5;color:${INK};">${bodyHtml}</div>
    </div>
  `
}

function footer(stamp, extraLeftHtml) {
  return `
    <div style="margin-top:auto;padding-top:14px;border-top:1px solid ${LINE};display:flex;justify-content:space-between;align-items:flex-end;">
      <div style="font-size:8pt;line-height:1.5;color:${BODY};max-width:330px;">${extraLeftHtml || ""}</div>
      <div style="text-align:center;">
        ${stamp ? `<img src="${stamp}" alt="" style="height:70px;width:auto;display:block;margin:0 auto;object-fit:contain;" />` : `<div style="height:70px;width:110px;border:1px dashed ${LINE};"></div>`}
        <div style="margin-top:4px;font-size:7.5pt;color:${MUTED};">For ${COMPANY.name}<br/>Authorised signatory</div>
      </div>
    </div>
    <div style="margin-top:12px;padding-top:8px;border-top:1px solid ${LINE};display:flex;justify-content:space-between;font-size:7.5pt;color:${MUTED};">
      <span>This is a computer-generated document and is valid without a physical signature.</span>
      <span>${COMPANY.phone} · ${COMPANY.email}</span>
    </div>
  `
}

async function render(html, fileName) {
  const container = document.createElement("div")
  Object.assign(container.style, {
    width: "210mm",
    minHeight: "297mm",
    padding: "14mm 14mm 12mm",
    boxSizing: "border-box",
    background: "#ffffff",
    position: "absolute",
    left: "-10000px",
    top: "0",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "9.5pt",
    color: INK,
    lineHeight: "1.35",
  })
  container.innerHTML = `<div style="min-height:273mm;display:flex;flex-direction:column;">${html}</div>`
  document.body.appendChild(container)
  try {
    const canvas = await html2canvas(container, { scale: 2.5, useCORS: true, allowTaint: true, backgroundColor: "#ffffff", logging: false, windowWidth: container.scrollWidth, windowHeight: container.scrollHeight })
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const pageW = 210
    const pageH = 297
    const imgH = (canvas.height * pageW) / canvas.width
    const img = canvas.toDataURL("image/jpeg", 0.95)
    if (imgH <= pageH + 0.5) {
      pdf.addImage(img, "JPEG", 0, 0, pageW, imgH)
    } else {
      // Split tall content across pages
      let y = 0
      while (y < imgH) {
        if (y > 0) pdf.addPage()
        pdf.addImage(img, "JPEG", 0, -y, pageW, imgH)
        y += pageH
      }
    }
    pdf.save(fileName)
  } finally {
    document.body.removeChild(container)
  }
}

export const generateQuotationPDF = async (q) => {
  if (typeof window === "undefined") throw new Error("PDF generation is only available in the browser")
  const [logo, stamp, qr] = await Promise.all([loadImage("/images/relax-nav-logo.png"), loadImage("/images/relax-brand-stamp.png"), loadImage("/images/relax-qr-code.png")])
  const lines = quotationLines(q)
  const name = `${honorific(q.customer?.gender)} ${q.customer?.name || ""}`.trim()

  const rows = []
  let n = 1
  rows.push([n++, `<strong>${esc(lines.transport.label)}</strong>${lines.transport.detail ? `<div style="font-size:8pt;color:${MUTED};margin-top:2px;">${esc(lines.transport.detail)}</div>` : ""}`, inr(lines.transport.amount)])
  lines.services.forEach((s) => rows.push([n++, esc(s.label), inr(s.amount)]))
  if (lines.electrical) rows.push([n++, esc(lines.electrical.label), inr(lines.electrical.amount)])

  const td = (content, extra = "") => `<td style="padding:7px 10px;border-bottom:1px solid ${LINE};vertical-align:top;${extra}">${content}</td>`

  const html = `
    ${header(logo, "QUOTATION", [
      ["Reference", esc(q.quotationNumber)],
      ["Date", fmtDate(q.quotationDate)],
      ["Valid until", fmtDate(validUntil(q))],
    ])}

    <div style="display:flex;gap:28px;margin-bottom:16px;">
      ${block("Prepared for", `<div style="font-weight:700;">${esc(name)}</div><div style="color:${BODY};">${esc(q.customer?.address)}</div><div style="color:${BODY};">${esc(q.customer?.phone)}${q.customer?.email ? ` · ${esc(q.customer.email)}` : ""}</div>`)}
      ${block("Move details", `
        <table style="border-collapse:collapse;font-size:9pt;">
          <tr><td style="padding:1px 12px 1px 0;color:${MUTED};">From</td><td style="padding:1px 0;">${esc(q.fromLocation)}</td></tr>
          <tr><td style="padding:1px 12px 1px 0;color:${MUTED};">To</td><td style="padding:1px 0;">${esc(q.toLocation)}</td></tr>
          <tr><td style="padding:1px 12px 1px 0;color:${MUTED};">Consignment</td><td style="padding:1px 0;">${lines.isHousehold ? "Household goods" : `Vehicle${q.transportation?.vehicle?.vehicleType ? ` (${esc(q.transportation.vehicle.vehicleType)})` : ""}`}</td></tr>
          ${lines.isHousehold && q.transportation?.householdGoods?.volume ? `<tr><td style="padding:1px 12px 1px 0;color:${MUTED};">Volume</td><td style="padding:1px 0;">${esc(q.transportation.householdGoods.volume)}</td></tr>` : ""}
        </table>`)}
    </div>

    <p style="margin:0 0 14px;font-size:9pt;color:${BODY};line-height:1.55;">
      Dear ${esc(name)}, thank you for your enquiry regarding the transportation of your ${lines.isHousehold ? "household goods" : "vehicle"}.
      We are pleased to quote the following rates for the services listed below.
    </p>

    <table style="width:100%;border-collapse:collapse;font-size:9pt;">
      <thead>
        <tr style="background:${NAVY};color:#fff;">
          <th style="padding:8px 10px;text-align:left;width:34px;font-weight:600;">#</th>
          <th style="padding:8px 10px;text-align:left;font-weight:600;">Particulars</th>
          <th style="padding:8px 10px;text-align:right;width:120px;font-weight:600;">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(([i, label, amt]) => `<tr>${td(i, `color:${MUTED};`)}${td(label)}${td(amt, "text-align:right;font-weight:600;white-space:nowrap;")}</tr>`).join("")}
        <tr style="background:#f8fafc;">${td("")}${td("<strong>Subtotal</strong>")}${td(`<strong>${inr(lines.subtotal)}</strong>`, "text-align:right;white-space:nowrap;")}</tr>
        ${lines.taxes.map((t) => `<tr>${td("")}${td(`${t.label} @ ${t.percentage}%`)}${td(inr(t.amount), "text-align:right;white-space:nowrap;")}</tr>`).join("")}
        <tr style="background:#f2f5fb;">
          <td style="padding:10px;"></td>
          <td style="padding:10px;font-size:10.5pt;font-weight:700;color:${NAVY};">Grand total</td>
          <td style="padding:10px;font-size:11pt;font-weight:700;color:${NAVY};text-align:right;white-space:nowrap;">${inr(lines.total)}</td>
        </tr>
      </tbody>
    </table>

    ${q.notes ? `<div style="margin-top:14px;padding:10px 12px;border:1px solid ${LINE};border-left:3px solid ${BRAND};background:#fffaf7;"><div style="font-size:7.5pt;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};margin-bottom:4px;">Special instructions</div><div style="font-size:9pt;line-height:1.5;color:${INK};">${esc(q.notes)}</div></div>` : ""}

    <div style="margin-top:16px;">
      <div style="font-size:7.5pt;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};margin-bottom:6px;">Terms and conditions</div>
      <div style="display:flex;gap:24px;font-size:8.5pt;line-height:1.55;color:${BODY};">
        <ul style="margin:0;padding-left:16px;flex:1;">
          <li>This quotation is valid for 30 days from the date of issue.</li>
          <li>Booking is confirmed on receipt of the advance; balance is payable before unloading.</li>
          <li>Packing materials are included where packing is listed above.</li>
          <li>Service is door-to-door subject to access at both addresses.</li>
        </ul>
        <ul style="margin:0;padding-left:16px;flex:1;">
          <li>Transit insurance cover up to ₹1,00,000 subject to terms and conditions.</li>
          <li>Interstate transit time is typically 3–7 business days.</li>
          <li>Electrical work is carried out only where listed above.</li>
          <li>Disputes are subject to Cuttack, Odisha jurisdiction.</li>
        </ul>
      </div>
    </div>

    ${footer(
      stamp,
      `<div style="display:flex;gap:12px;align-items:center;">
        ${qr ? `<img src="${qr}" alt="" style="width:64px;height:64px;border:1px solid ${LINE};" />` : ""}
        <div><div style="font-weight:700;color:${INK};">Confirm your booking</div><div>Pay a token advance of ₹1,000 by UPI to reserve your preferred moving date, then call ${COMPANY.phone} to schedule the survey.</div></div>
      </div>`
    )}
  `
  await render(html, `Quotation-${q.quotationNumber}.pdf`)
}

export const generateReceiptPDF = async (r) => {
  if (typeof window === "undefined") throw new Error("PDF generation is only available in the browser")
  const [logo, stamp] = await Promise.all([loadImage("/images/relax-nav-logo.png"), loadImage("/images/relax-brand-stamp.png")])
  const name = `${honorific(r.customer?.gender)} ${r.customer?.name || ""}`.trim()
  const total = Number(r.totalAmount) || 0
  const received = Number(r.receivedAmount) || 0
  const balance = Math.max(0, total - received)
  const full = balance === 0

  const td = (content, extra = "") => `<td style="padding:8px 10px;border-bottom:1px solid ${LINE};vertical-align:top;${extra}">${content}</td>`

  const html = `
    ${header(logo, "MONEY RECEIPT", [
      ["Receipt no.", esc(r.receiptNumber)],
      ["Date", fmtDate(r.receiptDate)],
      ["Service date", fmtDate(r.serviceDate)],
    ])}

    <div style="display:flex;gap:28px;margin-bottom:16px;">
      ${block("Received from", `<div style="font-weight:700;">${esc(name)}</div><div style="color:${BODY};">${esc(r.customer?.address)}</div><div style="color:${BODY};">${esc(r.customer?.phone)}${r.customer?.email ? ` · ${esc(r.customer.email)}` : ""}</div>`)}
      ${block("Service", `
        <table style="border-collapse:collapse;font-size:9pt;">
          <tr><td style="padding:1px 12px 1px 0;color:${MUTED};">Service</td><td style="padding:1px 0;">Packers and movers</td></tr>
          <tr><td style="padding:1px 12px 1px 0;color:${MUTED};">Route</td><td style="padding:1px 0;">${esc(r.fromLocation)} to ${esc(r.toLocation)}</td></tr>
          <tr><td style="padding:1px 12px 1px 0;color:${MUTED};">Payment mode</td><td style="padding:1px 0;">${esc(r.paymentMode)}</td></tr>
          <tr><td style="padding:1px 12px 1px 0;color:${MUTED};">Payment type</td><td style="padding:1px 0;">${esc(r.receiptType)}</td></tr>
        </table>`)}
    </div>

    <p style="margin:0 0 14px;font-size:9pt;color:${BODY};line-height:1.55;">
      Received with thanks from ${esc(name)} the sum of <strong style="color:${INK};">${inr(received)}</strong> by ${esc(r.paymentMode)}
      as ${esc(String(r.receiptType).toLowerCase())} towards relocation services from ${esc(r.fromLocation)} to ${esc(r.toLocation)}.
    </p>

    <table style="width:100%;border-collapse:collapse;font-size:9pt;">
      <thead>
        <tr style="background:${NAVY};color:#fff;">
          <th style="padding:8px 10px;text-align:left;font-weight:600;">Particulars</th>
          <th style="padding:8px 10px;text-align:right;width:140px;font-weight:600;">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>${td("Total service amount as per quotation")}${td(inr(total), "text-align:right;white-space:nowrap;")}</tr>
        <tr style="background:#f2f5fb;">${td(`<strong style="color:${NAVY};">Amount received (${esc(r.receiptType)})</strong>`)}${td(`<strong style="color:${NAVY};font-size:10.5pt;">${inr(received)}</strong>`, "text-align:right;white-space:nowrap;")}</tr>
        <tr>${td("Balance payable before delivery")}${td(`<strong style="color:${balance > 0 ? BRAND : "#047857"};">${inr(balance)}</strong>`, "text-align:right;white-space:nowrap;")}</tr>
      </tbody>
    </table>

    <div style="margin-top:12px;display:inline-block;padding:5px 12px;border-radius:3px;font-size:8pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#fff;background:${full ? "#047857" : BRAND};">
      ${full ? "Full payment received" : "Partial payment received"}
    </div>

    ${r.notes ? `<div style="margin-top:14px;padding:10px 12px;border:1px solid ${LINE};border-left:3px solid ${BRAND};background:#fffaf7;"><div style="font-size:7.5pt;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};margin-bottom:4px;">Payment notes</div><div style="font-size:9pt;line-height:1.5;color:${INK};">${esc(r.notes)}</div></div>` : ""}

    <div style="margin-top:16px;">
      <div style="font-size:7.5pt;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};margin-bottom:6px;">Payment terms</div>
      <ul style="margin:0;padding-left:16px;font-size:8.5pt;line-height:1.55;color:${BODY};">
        <li>This receipt is issued for accounting purposes against the quotation referenced above.</li>
        <li>Service is scheduled on receipt of the advance; any balance is payable before delivery.</li>
        <li>Cancellation charges apply as per the terms stated on the quotation.</li>
        <li>Please quote the receipt number in any correspondence regarding this payment.</li>
      </ul>
    </div>

    ${footer(stamp, `<div style="font-weight:700;color:${INK};">Payment confirmed</div><div>For payment queries call ${COMPANY.phone} or email ${COMPANY.email}.</div>`)}
  `
  await render(html, `Receipt-${r.receiptNumber}.pdf`)
}
