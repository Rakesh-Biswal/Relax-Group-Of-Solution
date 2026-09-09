"use client"

import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { ArrowLeft, CalendarClock, Download, FileText, Loader2, Mail, MapPin, MoreHorizontal, Pencil, Phone, Plus, Receipt, Share2, Trash2, Wallet } from "lucide-react"
import { ConfirmDialog, Dropdown, EmptyState, SectionCard, StatCard } from "./AdminUI"
import ReceiptForm from "./ReceiptForm"
import { formatDate, formatINR } from "@/lib/format"
import { honorific, quotationLines, validUntil } from "@/lib/quotation"
import { SITE } from "@/lib/site"
import { generateQuotationPDF, generateReceiptPDF } from "@/utils/pdfGenerator"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

function waUrl(phone, text) {
  const digits = String(phone || "").replace(/\D/g, "")
  const target = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`
}

export default function QuotationDetail({ quotation, onBack, onEdit, onDelete }) {
  const [receipts, setReceipts] = useState([])
  const [loadingReceipts, setLoadingReceipts] = useState(true)
  const [receiptForm, setReceiptForm] = useState({ open: false, receipt: null })
  const [confirm, setConfirm] = useState(null) // { type: 'quotation' | 'receipt', receipt? }
  const [busy, setBusy] = useState(false)
  const [pdfBusy, setPdfBusy] = useState(false)

  const lines = quotationLines(quotation)
  const received = receipts.reduce((s, r) => s + (Number(r.receivedAmount) || 0), 0)
  const balance = Math.max(0, lines.total - received)
  const name = `${honorific(quotation.customer?.gender)} ${quotation.customer?.name || ""}`.trim()

  const loadReceipts = useCallback(async () => {
    setLoadingReceipts(true)
    try {
      const res = await fetch(`${API_URL}/api/money-receipts/quotation/${quotation._id}`, { credentials: "include" })
      if (res.ok) setReceipts(await res.json())
    } catch {
      /* handled by empty state */
    } finally {
      setLoadingReceipts(false)
    }
  }, [quotation._id])

  useEffect(() => {
    loadReceipts()
  }, [loadReceipts])

  const downloadQuotation = async () => {
    setPdfBusy(true)
    try {
      await generateQuotationPDF(quotation)
      toast.success(`Quotation ${quotation.quotationNumber} downloaded.`)
    } catch {
      toast.error("Unable to generate the quotation PDF.")
    } finally {
      setPdfBusy(false)
    }
  }

  const downloadReceipt = async (r) => {
    setPdfBusy(true)
    try {
      await generateReceiptPDF(r)
      toast.success(`Receipt ${r.receiptNumber} downloaded.`)
    } catch {
      toast.error("Unable to generate the receipt PDF.")
    } finally {
      setPdfBusy(false)
    }
  }

  const shareQuotation = () => {
    const text = [
      `Dear ${name},`,
      "",
      `Thank you for your enquiry. Please find your quotation from ${SITE.name} below.`,
      "",
      `Reference: ${quotation.quotationNumber}`,
      `Route: ${quotation.fromLocation} to ${quotation.toLocation}`,
      `Amount: ${formatINR(lines.total)}`,
      `Valid until: ${formatDate(validUntil(quotation))}`,
      "",
      `Download the PDF: ${SITE.url}/download-quotation?quotation=${quotation.quotationNumber}`,
      "",
      `For any query call ${SITE.phone}.`,
      `${SITE.name}`,
    ].join("\n")
    window.open(waUrl(quotation.customer?.phone, text), "_blank", "noopener,noreferrer")
  }

  const shareReceipt = (r) => {
    const text = [
      `Dear ${name},`,
      "",
      `Thank you for your payment. Your receipt details are below.`,
      "",
      `Receipt no.: ${r.receiptNumber}`,
      `Amount received: ${formatINR(r.receivedAmount)} (${r.receiptType}, ${r.paymentMode})`,
      `Service date: ${formatDate(r.serviceDate)}`,
      `Quotation reference: ${quotation.quotationNumber}`,
      Number(r.totalAmount) - Number(r.receivedAmount) > 0 ? `Balance payable: ${formatINR(Number(r.totalAmount) - Number(r.receivedAmount))}` : null,
      "",
      `Download the PDF: ${SITE.url}/download-quotation?receipt=${r.receiptNumber}`,
      "",
      `For any query call ${SITE.phone}.`,
      `${SITE.name}`,
    ]
      .filter((l) => l !== null)
      .join("\n")
    window.open(waUrl(quotation.customer?.phone, text), "_blank", "noopener,noreferrer")
  }

  const runConfirm = async () => {
    if (!confirm) return
    setBusy(true)
    try {
      if (confirm.type === "quotation") {
        await onDelete(quotation._id)
      } else {
        const res = await fetch(`${API_URL}/api/money-receipts/${confirm.receipt._id}`, { method: "DELETE", credentials: "include" })
        if (!res.ok) throw new Error("Unable to delete the receipt.")
        toast.success(`Receipt ${confirm.receipt.receiptNumber} deleted.`)
        setConfirm(null)
        loadReceipts()
      }
    } catch (err) {
      toast.error(err.message || "The action could not be completed.")
    } finally {
      setBusy(false)
    }
  }

  const receiptItems = (fn, icon) =>
    receipts.map((r) => ({ label: `Receipt ${r.receiptNumber}`, hint: formatINR(r.receivedAmount), icon, onClick: () => fn(r) }))

  return (
    <>
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-navy-900">
        <ArrowLeft size={15} /> All quotations
      </button>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-mono text-2xl font-semibold tracking-tight text-navy-700">{quotation.quotationNumber}</h1>
            <span className="badge badge-neutral">{lines.isHousehold ? "Household goods" : "Vehicle"}</span>
            <span className={`badge ${balance === 0 && received > 0 ? "badge-green" : received > 0 ? "badge-amber" : "badge-navy"}`}>
              {balance === 0 && received > 0 ? "Fully paid" : received > 0 ? "Partly paid" : "Quoted"}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            {name} · {quotation.fromLocation} → {quotation.toLocation} · issued {formatDate(quotation.quotationDate)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onEdit} className="btn btn-outline btn-sm">
            <Pencil size={14} /> Edit
          </button>
          <Dropdown
            label="Share"
            icon={Share2}
            items={[{ label: "Quotation on WhatsApp", icon: FileText, onClick: shareQuotation }, ...(receipts.length ? [{ separator: true }, ...receiptItems(shareReceipt, Receipt)] : [])]}
          />
          <Dropdown
            label={pdfBusy ? "Preparing…" : "Download"}
            icon={pdfBusy ? Loader2 : Download}
            items={[{ label: "Quotation PDF", icon: FileText, onClick: downloadQuotation }, ...(receipts.length ? [{ separator: true }, ...receiptItems(downloadReceipt, Receipt)] : [])]}
          />
          <button type="button" onClick={() => setReceiptForm({ open: true, receipt: null })} className="btn btn-primary btn-sm">
            <Plus size={14} /> Add receipt
          </button>
          <Dropdown label="" icon={MoreHorizontal} className="btn btn-outline btn-sm px-2.5" items={[{ label: "Delete quotation", icon: Trash2, danger: true, onClick: () => setConfirm({ type: "quotation" }) }]} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Quotation amount" value={formatINR(lines.total)} icon={FileText} />
        <StatCard label="Received" value={formatINR(received)} hint={`${receipts.length} receipt${receipts.length === 1 ? "" : "s"}`} icon={Wallet} tone="green" />
        <StatCard label="Balance payable" value={formatINR(balance)} icon={Wallet} tone={balance > 0 ? "brand" : "green"} />
        <StatCard label="Valid until" value={formatDate(validUntil(quotation))} hint={quotation.nextCallingDate ? `Follow-up ${formatDate(quotation.nextCallingDate)}` : "No follow-up set"} icon={CalendarClock} tone="amber" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <SectionCard title="Customer">
            <div className="text-[16px] font-semibold text-ink">{name}</div>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 shrink-0 text-muted" />
                <a href={`tel:+91${String(quotation.customer?.phone || "").replace(/\D/g, "")}`} className="text-ink hover:text-navy-700">
                  {quotation.customer?.phone}
                </a>
              </div>
              {quotation.customer?.email && (
                <div className="flex items-start gap-2.5">
                  <Mail size={15} className="mt-0.5 shrink-0 text-muted" />
                  <a href={`mailto:${quotation.customer.email}`} className="break-all text-ink hover:text-navy-700">
                    {quotation.customer.email}
                  </a>
                </div>
              )}
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-muted" />
                <span className="text-body">{quotation.customer?.address}</span>
              </div>
            </dl>
          </SectionCard>

          <SectionCard title="Move details">
            <dl>
              <div className="dl-row border-b border-line">
                <dt>From</dt>
                <dd>{quotation.fromLocation}</dd>
              </div>
              <div className="dl-row border-b border-line">
                <dt>To</dt>
                <dd>{quotation.toLocation}</dd>
              </div>
              <div className="dl-row border-b border-line">
                <dt>Consignment</dt>
                <dd>{lines.isHousehold ? "Household goods" : `Vehicle${quotation.transportation?.vehicle?.vehicleType ? ` (${quotation.transportation.vehicle.vehicleType})` : ""}`}</dd>
              </div>
              {lines.isHousehold && quotation.transportation?.householdGoods?.volume && (
                <div className="dl-row border-b border-line">
                  <dt>Volume</dt>
                  <dd>{quotation.transportation.householdGoods.volume}</dd>
                </div>
              )}
              {(lines.isHousehold ? quotation.transportation?.householdGoods?.approxDistance : quotation.transportation?.vehicle?.approxDistance) && (
                <div className="dl-row border-b border-line">
                  <dt>Distance</dt>
                  <dd>{lines.isHousehold ? quotation.transportation.householdGoods.approxDistance : quotation.transportation.vehicle.approxDistance}</dd>
                </div>
              )}
              <div className="dl-row border-b border-line">
                <dt>Quotation date</dt>
                <dd>{formatDate(quotation.quotationDate)}</dd>
              </div>
              <div className="dl-row border-b border-line">
                <dt>Follow-up</dt>
                <dd>{quotation.nextCallingDate ? formatDate(quotation.nextCallingDate) : "—"}</dd>
              </div>
              <div className="dl-row border-b border-line">
                <dt>Created</dt>
                <dd>{formatDate(quotation.createdAt)}</dd>
              </div>
              <div className="dl-row">
                <dt>Last updated</dt>
                <dd>{formatDate(quotation.updatedAt)}</dd>
              </div>
            </dl>
          </SectionCard>
        </div>

        <div className="space-y-6 lg:col-span-8">
          <section className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h3 className="text-[15px] font-semibold text-ink">Pricing statement</h3>
                <p className="text-[13px] text-muted">As issued to the customer</p>
              </div>
              <button type="button" onClick={downloadQuotation} disabled={pdfBusy} className="btn btn-outline btn-sm">
                <Download size={14} /> PDF
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Particulars</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-muted">1</td>
                    <td>
                      <div className="font-medium">{lines.transport.label}</div>
                      {lines.transport.detail && <div className="text-xs text-muted">{lines.transport.detail}</div>}
                    </td>
                    <td className="text-right tabular-nums">{formatINR(lines.transport.amount)}</td>
                  </tr>
                  {lines.services.map((s, i) => (
                    <tr key={s.key}>
                      <td className="text-muted">{i + 2}</td>
                      <td>{s.label}</td>
                      <td className="text-right tabular-nums">{formatINR(s.amount)}</td>
                    </tr>
                  ))}
                  {lines.electrical && (
                    <tr>
                      <td className="text-muted">{lines.services.length + 2}</td>
                      <td>{lines.electrical.label}</td>
                      <td className="text-right tabular-nums">{formatINR(lines.electrical.amount)}</td>
                    </tr>
                  )}
                  <tr className="bg-surface-2">
                    <td />
                    <td className="font-semibold">Subtotal</td>
                    <td className="text-right font-semibold tabular-nums">{formatINR(lines.subtotal)}</td>
                  </tr>
                  {lines.taxes.map((t) => (
                    <tr key={t.key}>
                      <td />
                      <td>
                        {t.label} @ {t.percentage}%
                      </td>
                      <td className="text-right tabular-nums">{formatINR(t.amount)}</td>
                    </tr>
                  ))}
                  <tr className="bg-navy-50">
                    <td />
                    <td className="text-[15px] font-semibold text-navy-900">Grand total</td>
                    <td className="text-right text-[15px] font-semibold tabular-nums text-navy-900">{formatINR(lines.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {quotation.notes && (
            <SectionCard title="Special instructions">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-body">{quotation.notes}</p>
            </SectionCard>
          )}

          <section className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h3 className="text-[15px] font-semibold text-ink">Money receipts</h3>
                <p className="text-[13px] text-muted">Payments recorded against this quotation</p>
              </div>
              <button type="button" onClick={() => setReceiptForm({ open: true, receipt: null })} className="btn btn-outline btn-sm">
                <Plus size={14} /> Add
              </button>
            </div>
            {loadingReceipts ? (
              <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted">
                <Loader2 size={16} className="animate-spin" /> Loading receipts…
              </div>
            ) : receipts.length === 0 ? (
              <EmptyState icon={Receipt} title="No receipts yet" text="Record the advance or full payment to issue a money receipt to the customer." />
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Receipt</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Mode</th>
                      <th className="text-right">Received</th>
                      <th className="w-12" />
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((r) => (
                      <tr key={r._id}>
                        <td className="font-mono text-[13px] font-semibold text-navy-700">{r.receiptNumber}</td>
                        <td className="whitespace-nowrap text-body">{formatDate(r.receiptDate)}</td>
                        <td>{r.receiptType}</td>
                        <td className="text-body">{r.paymentMode}</td>
                        <td className="whitespace-nowrap text-right font-semibold tabular-nums">{formatINR(r.receivedAmount)}</td>
                        <td className="text-right">
                          <Dropdown
                            label=""
                            icon={MoreHorizontal}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink hover:bg-surface-2"
                            items={[
                              { label: "Edit", icon: Pencil, onClick: () => setReceiptForm({ open: true, receipt: r }) },
                              { label: "Download PDF", icon: Download, onClick: () => downloadReceipt(r) },
                              { label: "Share on WhatsApp", icon: Share2, onClick: () => shareReceipt(r) },
                              { separator: true },
                              { label: "Delete receipt", icon: Trash2, danger: true, onClick: () => setConfirm({ type: "receipt", receipt: r }) },
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>

      <ReceiptForm open={receiptForm.open} onClose={() => setReceiptForm({ open: false, receipt: null })} quotation={quotation} receipt={receiptForm.receipt} onSaved={loadReceipts} />

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.type === "quotation" ? "Delete this quotation?" : "Delete this receipt?"}
        text={
          confirm?.type === "quotation"
            ? `Quotation ${quotation.quotationNumber} will be permanently removed. Money receipts linked to it will no longer be reachable from the console. This cannot be undone.`
            : `Receipt ${confirm?.receipt?.receiptNumber} for ${formatINR(confirm?.receipt?.receivedAmount)} will be permanently removed. This cannot be undone.`
        }
        confirmLabel="Delete"
        danger
        busy={busy}
        onConfirm={runConfirm}
        onCancel={() => setConfirm(null)}
      />
    </>
  )
}
