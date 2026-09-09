"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, LogOut, Plus } from "lucide-react"

export default function AdminShell({ admin, onLogout, onNew, children }) {
  return (
    <div className="min-h-screen bg-surface-2">
      <header className="sticky top-0 z-30 border-b border-line bg-white">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src="/images/relax-nav-logo.png" alt="Relax Packers & Movers" width={150} height={37} className="h-8 w-auto" priority />
            <div className="hidden h-6 w-px bg-line sm:block" />
            <div className="hidden sm:block">
              <div className="text-[13px] font-semibold text-ink">Quotation console</div>
              <div className="text-[11px] text-muted">Quotations · Receipts · Documents</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onNew && (
              <button type="button" onClick={onNew} className="btn btn-primary btn-sm">
                <Plus size={15} /> <span className="hidden sm:inline">New quotation</span>
                <span className="sm:hidden">New</span>
              </button>
            )}
            <Link href="/" target="_blank" className="btn btn-outline btn-sm hidden md:inline-flex" title="Open public website">
              <ExternalLink size={14} /> Website
            </Link>
            <div className="hidden items-center gap-2 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-xs text-body lg:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {admin?.email || "Signed in"}
            </div>
            <button type="button" onClick={onLogout} className="btn btn-outline btn-sm" title="Sign out">
              <LogOut size={14} /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>
      <main className="container-x py-6 md:py-8">{children}</main>
    </div>
  )
}
