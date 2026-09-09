"use client"

import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import AdminLogin from "@/components/admin/AdminLogin"
import AdminShell from "@/components/admin/AdminShell"
import QuotationList from "@/components/admin/QuotationList"
import QuotationDetail from "@/components/admin/QuotationDetail"
import QuotationForm from "@/components/admin/QuotationForm"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function AdminPage() {
  const [checking, setChecking] = useState(true)
  const [admin, setAdmin] = useState(null)
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ open: false, quotation: null })

  const fetchQuotations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/quotations`, { credentials: "include" })
      if (!res.ok) throw new Error("Unable to load quotations.")
      const data = await res.json()
      setQuotations(Array.isArray(data) ? data : [])
    } catch (err) {
      toast.error(err.message || "Unable to load quotations.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/check`, { credentials: "include" })
        if (res.ok) {
          const data = await res.json().catch(() => ({}))
          if (!cancelled) {
            setAdmin(data.admin || {})
            fetchQuotations()
          }
        }
      } catch {
        /* not signed in */
      } finally {
        if (!cancelled) setChecking(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [fetchQuotations])

  const handleLogin = () => {
    setAdmin({})
    fetchQuotations()
    fetch(`${API_URL}/api/admin/check`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.admin && setAdmin(d.admin))
      .catch(() => {})
  }

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/admin/logout`, { method: "POST", credentials: "include" })
    } catch {
      /* ignore */
    }
    setAdmin(null)
    setQuotations([])
    setSelected(null)
    toast.success("Signed out.")
  }

  const handleSaved = (q) => {
    setQuotations((prev) => {
      const exists = prev.some((x) => x._id === q._id)
      return exists ? prev.map((x) => (x._id === q._id ? q : x)) : [q, ...prev]
    })
    if (selected && selected._id === q._id) setSelected(q)
  }

  const handleDelete = async (id) => {
    const res = await fetch(`${API_URL}/api/quotations/${id}`, { method: "DELETE", credentials: "include" })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || "Unable to delete the quotation.")
    }
    setQuotations((prev) => prev.filter((q) => q._id !== id))
    setSelected(null)
    toast.success("Quotation deleted.")
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-2">
        <div className="flex items-center gap-3 text-sm text-muted">
          <Loader2 size={18} className="animate-spin" /> Checking session…
        </div>
      </div>
    )
  }

  if (!admin) return <AdminLogin onLogin={handleLogin} />

  return (
    <AdminShell admin={admin} onLogout={handleLogout} onNew={selected ? null : () => setForm({ open: true, quotation: null })}>
      {selected ? (
        <QuotationDetail key={selected._id} quotation={selected} onBack={() => setSelected(null)} onEdit={() => setForm({ open: true, quotation: selected })} onDelete={handleDelete} />
      ) : (
        <QuotationList quotations={quotations} loading={loading} onRefresh={fetchQuotations} onNew={() => setForm({ open: true, quotation: null })} onSelect={setSelected} />
      )}

      <QuotationForm open={form.open} onClose={() => setForm({ open: false, quotation: null })} quotation={form.quotation} onSaved={handleSaved} />
    </AdminShell>
  )
}
