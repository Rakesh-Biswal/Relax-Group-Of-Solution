"use client"

import { useMemo, useState } from "react"
import { ArrowUpDown, CalendarClock, ChevronRight, FileText, Plus, RefreshCw, Search, Wallet } from "lucide-react"
import { EmptyState, StatCard } from "./AdminUI"
import { formatDate, formatINR } from "@/lib/format"
import { honorific } from "@/lib/quotation"

const SORTS = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "amount-desc", label: "Amount: high to low" },
  { id: "amount-asc", label: "Amount: low to high" },
  { id: "followup", label: "Follow-up date" },
]

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function followUpState(q) {
  if (!q.nextCallingDate) return null
  const today = startOfDay(new Date())
  const due = startOfDay(q.nextCallingDate)
  const diff = Math.round((due - today) / 86400000)
  if (diff < 0) return { label: "Overdue", cls: "badge-brand" }
  if (diff === 0) return { label: "Today", cls: "badge-amber" }
  if (diff <= 7) return { label: `In ${diff}d`, cls: "badge-navy" }
  return { label: formatDate(q.nextCallingDate), cls: "badge-neutral" }
}

export default function QuotationList({ quotations, loading, onRefresh, onNew, onSelect }) {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const [onlyFollowUps, setOnlyFollowUps] = useState(false)

  const stats = useMemo(() => {
    const now = new Date()
    const thisMonth = quotations.filter((q) => {
      const d = new Date(q.createdAt || q.quotationDate)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const value = quotations.reduce((s, q) => s + (Number(q.totalAmount) || 0), 0)
    const today = startOfDay(now)
    const dueSoon = quotations.filter((q) => q.nextCallingDate && startOfDay(q.nextCallingDate) - today <= 7 * 86400000)
    return { total: quotations.length, thisMonth: thisMonth.length, value, dueSoon: dueSoon.length }
  }, [quotations])

  const list = useMemo(() => {
    const q = search.trim().toLowerCase()
    const today = startOfDay(new Date())
    let out = quotations.filter((x) => {
      if (onlyFollowUps && !(x.nextCallingDate && startOfDay(x.nextCallingDate) - today <= 7 * 86400000)) return false
      if (!q) return true
      return (
        (x.customer?.name || "").toLowerCase().includes(q) ||
        (x.quotationNumber || "").toLowerCase().includes(q) ||
        (x.customer?.phone || "").includes(q) ||
        (x.fromLocation || "").toLowerCase().includes(q) ||
        (x.toLocation || "").toLowerCase().includes(q)
      )
    })
    const by = {
      newest: (a, b) => new Date(b.createdAt || b.quotationDate) - new Date(a.createdAt || a.quotationDate),
      oldest: (a, b) => new Date(a.createdAt || a.quotationDate) - new Date(b.createdAt || b.quotationDate),
      "amount-desc": (a, b) => (b.totalAmount || 0) - (a.totalAmount || 0),
      "amount-asc": (a, b) => (a.totalAmount || 0) - (b.totalAmount || 0),
      followup: (a, b) => {
        if (!a.nextCallingDate && !b.nextCallingDate) return 0
        if (!a.nextCallingDate) return 1
        if (!b.nextCallingDate) return -1
        return new Date(a.nextCallingDate) - new Date(b.nextCallingDate)
      },
    }
    return [...out].sort(by[sort])
  }, [quotations, search, sort, onlyFollowUps])

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Quotations</h1>
          <p className="mt-1 text-sm text-muted">All quotations issued to customers, with linked money receipts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onRefresh} disabled={loading} className="btn btn-outline btn-sm">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button type="button" onClick={onNew} className="btn btn-primary btn-sm">
            <Plus size={15} /> New quotation
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total quotations" value={stats.total} icon={FileText} />
        <StatCard label="Created this month" value={stats.thisMonth} icon={CalendarClock} tone="green" />
        <StatCard label="Total quoted value" value={formatINR(stats.value, { compact: true })} hint={formatINR(stats.value)} icon={Wallet} tone="brand" />
        <StatCard label="Follow-ups due (7 days)" value={stats.dueSoon} icon={CalendarClock} tone="amber" />
      </div>

      <div className="card mt-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line bg-white p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input className="input pl-9" placeholder="Search by name, phone, reference or location" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search quotations" />
          </div>
          <div className="flex items-center gap-2">
            <label className="relative">
              <ArrowUpDown size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <select className="input w-auto pl-8 pr-8" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setOnlyFollowUps((v) => !v)}
              aria-pressed={onlyFollowUps}
              className={`btn btn-sm ${onlyFollowUps ? "btn-primary" : "btn-outline"}`}
            >
              <CalendarClock size={14} /> Follow-ups
            </button>
          </div>
        </div>

        {list.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={quotations.length === 0 ? "No quotations yet" : "No matching quotations"}
            text={quotations.length === 0 ? "Create the first quotation to start issuing documents to customers." : "Adjust the search or filters to find the quotation you are looking for."}
            action={
              quotations.length === 0 ? (
                <button type="button" onClick={onNew} className="btn btn-primary btn-sm">
                  <Plus size={15} /> Create quotation
                </button>
              ) : null
            }
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Route</th>
                    <th>Quotation date</th>
                    <th>Follow-up</th>
                    <th className="text-right">Amount</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {list.map((q) => {
                    const fu = followUpState(q)
                    return (
                      <tr key={q._id} onClick={() => onSelect(q)} className="cursor-pointer">
                        <td className="font-mono text-[13px] font-semibold text-navy-700">{q.quotationNumber}</td>
                        <td>
                          <div className="font-medium">
                            {honorific(q.customer?.gender)} {q.customer?.name}
                          </div>
                          <div className="text-xs text-muted">{q.customer?.phone}</div>
                        </td>
                        <td>
                          <div className="max-w-[260px] truncate">
                            {q.fromLocation} <span className="text-muted">→</span> {q.toLocation}
                          </div>
                          <div className="text-xs text-muted">{q.transportation?.type === "vehicle" ? "Vehicle" : "Household goods"}</div>
                        </td>
                        <td className="whitespace-nowrap text-body">{formatDate(q.quotationDate)}</td>
                        <td>{fu ? <span className={`badge ${fu.cls}`}>{fu.label}</span> : <span className="text-xs text-muted">—</span>}</td>
                        <td className="whitespace-nowrap text-right font-semibold tabular-nums">{formatINR(q.totalAmount)}</td>
                        <td className="text-right text-muted">
                          <ChevronRight size={16} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-line md:hidden">
              {list.map((q) => {
                const fu = followUpState(q)
                return (
                  <li key={q._id}>
                    <button type="button" onClick={() => onSelect(q)} className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left active:bg-surface-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-navy-700">{q.quotationNumber}</span>
                          {fu && <span className={`badge ${fu.cls}`}>{fu.label}</span>}
                        </div>
                        <div className="mt-1 truncate text-[15px] font-medium text-ink">
                          {honorific(q.customer?.gender)} {q.customer?.name}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-muted">
                          {q.fromLocation} → {q.toLocation}
                        </div>
                        <div className="mt-0.5 text-xs text-muted">{formatDate(q.quotationDate)}</div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-[15px] font-semibold tabular-nums text-ink">{formatINR(q.totalAmount)}</div>
                        <ChevronRight size={16} className="ml-auto mt-1 text-muted" />
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-line bg-surface-2 px-4 py-2.5 text-xs text-muted">
              Showing {list.length} of {quotations.length} quotation{quotations.length === 1 ? "" : "s"}
            </div>
          </>
        )}
      </div>
    </>
  )
}
