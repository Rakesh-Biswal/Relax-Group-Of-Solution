"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react"
import { Field } from "./AdminUI"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError("Enter your email address and password.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) onLogin(data)
      else setError(data.error || "Sign-in failed. Check your credentials and try again.")
    } catch {
      setError("Unable to reach the server. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden bg-navy-950 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Image src="/images/relax-truck.jpg" alt="" fill sizes="50vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <ArrowLeft size={15} /> Back to website
          </Link>
        </div>
        <div className="relative max-w-md">
          <div className="eyebrow-light">Relax Packers & Movers</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Quotation console</h1>
          <p className="mt-3 text-slate-300">Create and manage customer quotations, record payments, and issue PDF documents from a single workspace.</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-300">
            {["Itemised quotations with automatic tax calculation", "Money receipts linked to each quotation", "WhatsApp sharing and PDF download"].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative text-xs text-slate-500">Authorised personnel only. Access is logged.</div>
      </div>

      <div className="flex flex-col justify-center bg-surface-2 px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Image src="/images/relax-nav-logo.png" alt="Relax Packers & Movers" width={176} height={44} className="h-10 w-auto" priority />
          <h2 className="mt-8 text-2xl font-semibold tracking-tight text-ink">Sign in</h2>
          <p className="mt-1 text-sm text-muted">Use your staff email address and password.</p>

          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            {error && (
              <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <Field label="Email address" htmlFor="login-email">
              <div className="relative">
                <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input id="login-email" type="email" autoComplete="username" className="input pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </Field>
            <Field label="Password" htmlFor="login-password">
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input id="login-password" type={show ? "text" : "password"} autoComplete="current-password" className="input pl-9 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-ink" aria-label={show ? "Hide password" : "Show password"}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-xs text-muted">
            Trouble signing in? Contact the administrator.{" "}
            <Link href="/" className="text-navy-700 hover:text-navy-900 lg:hidden">
              Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
