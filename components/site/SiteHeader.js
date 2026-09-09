"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, LayoutDashboard, Mail, Menu, MessageCircle, Phone, X } from "lucide-react"
import { NAV_PRIMARY, NAV_RESOURCES, SITE, whatsappLink } from "@/lib/site"

function isActive(pathname, href) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setResourcesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onClick = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) setResourcesOpen(false)
    }
    const onKey = (e) => {
      if (e.key === "Escape") {
        setResourcesOpen(false)
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const resourcesActive = NAV_RESOURCES.some((r) => isActive(pathname, r.href))

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Utility bar */}
      <div className="hidden bg-navy-950 text-[12.5px] text-slate-300 md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Phone size={13} className="text-brand-500" />
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Mail size={13} className="text-brand-500" />
              {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden lg:inline">GSTIN {SITE.gstin} · ISO 9001:2015 certified</span>
            <Link href="/download-quotation" className="transition-colors hover:text-white">
              Download documents
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1.5 border-l border-white/15 pl-6 transition-colors hover:text-white">
              <LayoutDashboard size={13} className="text-brand-500" />
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={`border-b bg-white transition-shadow ${scrolled ? "border-line shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.25)]" : "border-transparent"}`}>
        <div className="container-x flex h-[68px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Relax Packers & Movers home">
            <Image src="/images/relax-nav-logo.png" alt="Relax Packers & Movers" width={176} height={44} priority className="h-9 w-auto sm:h-10" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_PRIMARY.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${active ? "text-navy-900" : "text-body hover:text-navy-900"}`}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-brand-500" />}
                </Link>
              )
            })}

            <div ref={resourcesRef} className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen((v) => !v)}
                aria-expanded={resourcesOpen}
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${resourcesActive || resourcesOpen ? "text-navy-900" : "text-body hover:text-navy-900"}`}
              >
                Resources
                <ChevronDown size={15} className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {resourcesOpen && (
                <div role="menu" className="absolute right-0 top-full mt-2 w-[320px] rounded-lg border border-line bg-white p-2 shadow-float">
                  {NAV_RESOURCES.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      role="menuitem"
                      className="block rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2"
                    >
                      <div className="text-[14px] font-medium text-ink">{r.label}</div>
                      <div className="text-xs text-muted">{r.description}</div>
                    </Link>
                  ))}
                  <div className="my-1 h-px bg-line" />
                  <Link href="/admin" role="menuitem" className="flex items-center gap-2.5 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2">
                    <LayoutDashboard size={16} className="text-navy-700" />
                    <div>
                      <div className="text-[14px] font-medium text-ink">Admin dashboard</div>
                      <div className="text-xs text-muted">Staff sign-in for quotations</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <a href={SITE.phoneHref} className="hidden items-center gap-2 text-[14px] font-semibold text-ink xl:inline-flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                <Phone size={15} />
              </span>
              {SITE.phone}
            </a>
            <Link href="/pricing" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-navy-950/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-float transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex h-[68px] items-center justify-between border-b border-line px-5">
            <Image src="/images/relax-nav-logo.png" alt="Relax Packers & Movers" width={150} height={37} className="h-8 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="scroll-thin flex-1 overflow-y-auto px-5 py-4">
            <nav className="flex flex-col" aria-label="Mobile primary">
              {NAV_PRIMARY.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between border-b border-line py-3.5 text-[15px] font-medium ${active ? "text-navy-900" : "text-ink"}`}
                  >
                    {item.label}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6">
              <div className="eyebrow mb-2">Resources</div>
              <nav className="flex flex-col" aria-label="Mobile resources">
                {NAV_RESOURCES.map((r) => (
                  <Link key={r.href} href={r.href} className="py-2.5 text-[14.5px] text-body hover:text-navy-900">
                    {r.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <Link href="/admin" className="flex items-center gap-2.5 rounded-md border border-line px-3.5 py-3 text-[14.5px] font-medium text-ink hover:border-navy-200 hover:bg-surface-2">
                <LayoutDashboard size={17} className="text-navy-700" />
                Admin dashboard
              </Link>
            </div>
          </div>

          <div className="border-t border-line bg-surface-2 p-5">
            <div className="grid grid-cols-2 gap-3">
              <a href={SITE.phoneHref} className="btn btn-primary btn-sm">
                <Phone size={15} /> Call
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
            <Link href="/pricing" className="btn btn-outline btn-sm mt-3 w-full">
              Get a written quotation
            </Link>
            <p className="mt-4 text-center text-xs text-muted">
              {SITE.phone} · {SITE.hours}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
