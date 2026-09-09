"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Loader2, X } from "lucide-react"

export function Field({ label, htmlFor, required, error, help, children, className = "" }) {
  return (
    <div className={className}>
      {label && (
        <label className="label" htmlFor={htmlFor}>
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>
      )}
      {children}
      {error ? <p className="field-error">{error}</p> : help ? <p className="help">{help}</p> : null}
    </div>
  )
}

export function AmountInput({ value, onChange, placeholder = "0", id, error, disabled }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">₹</span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const v = e.target.value
          if (v === "" || /^\d*\.?\d*$/.test(v)) onChange(v)
        }}
        placeholder={placeholder}
        className={`input pl-7 text-right tabular-nums ${error ? "input-error" : ""}`}
      />
    </div>
  )
}

export function PercentInput({ value, onChange, id }) {
  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const v = e.target.value
          if (v === "" || /^\d*\.?\d*$/.test(v)) onChange(v)
        }}
        placeholder="0"
        className="input pr-8 text-right tabular-nums"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">%</span>
    </div>
  )
}

const SIZES = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" }

export function Modal({ open, onClose, title, subtitle, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && onClose?.()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/60 p-0 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={`flex max-h-[95vh] w-full ${SIZES[size]} flex-col overflow-hidden rounded-t-lg bg-white shadow-float sm:rounded-lg`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-[16px] font-semibold text-ink">{title}</h2>
            {subtitle && <p className="text-[13px] text-muted">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-ink hover:bg-surface-2" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="scroll-thin flex-1 overflow-y-auto bg-surface-2">{children}</div>
        {footer && <div className="border-t border-line bg-white px-5 py-4 sm:px-6">{footer}</div>}
      </div>
    </div>
  )
}

export function ConfirmDialog({ open, title, text, confirmLabel = "Confirm", danger = false, busy = false, onConfirm, onCancel }) {
  return (
    <Modal
      open={open}
      onClose={busy ? undefined : onCancel}
      title={title}
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} disabled={busy} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={busy} className={`btn btn-sm ${danger ? "btn-danger" : "btn-primary"}`}>
            {busy && <Loader2 size={14} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      }
    >
      <div className="bg-white px-6 py-5 text-sm leading-relaxed text-body">{text}</div>
    </Modal>
  )
}

export function Dropdown({ label, icon: Icon, items, align = "right", className = "btn btn-outline btn-sm" }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} className={className} aria-haspopup="menu" aria-expanded={open}>
        {Icon && <Icon size={15} />}
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div role="menu" className={`absolute top-full z-30 mt-1.5 min-w-[220px] rounded-md border border-line bg-white p-1 shadow-float ${align === "right" ? "right-0" : "left-0"}`}>
          {items.map((it, i) =>
            it.separator ? (
              <div key={i} className="my-1 h-px bg-line" />
            ) : (
              <button
                key={i}
                type="button"
                role="menuitem"
                disabled={it.disabled}
                onClick={() => {
                  setOpen(false)
                  it.onClick?.()
                }}
                className={`flex w-full items-center gap-2.5 rounded px-3 py-2 text-left text-[13.5px] disabled:opacity-40 ${it.danger ? "text-red-600 hover:bg-red-50" : "text-ink hover:bg-surface-2"}`}
              >
                {it.icon && <it.icon size={15} className={it.danger ? "text-red-500" : "text-muted"} />}
                <span className="flex-1">{it.label}</span>
                {it.hint && <span className="text-xs text-muted">{it.hint}</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

export function StatCard({ label, value, hint, icon: Icon, tone = "navy" }) {
  const tones = {
    navy: "bg-navy-50 text-navy-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    brand: "bg-brand-50 text-brand-600",
  }
  return (
    <div className="card flex items-start justify-between gap-4 p-5">
      <div className="min-w-0">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-muted">{label}</div>
        <div className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-ink tabular-nums">{value}</div>
        {hint && <div className="mt-1 text-xs text-muted">{hint}</div>}
      </div>
      {Icon && (
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${tones[tone]}`}>
          <Icon size={19} />
        </div>
      )}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-3 text-muted">
          <Icon size={22} />
        </div>
      )}
      <h3 className="mt-4 text-[16px] font-semibold text-ink">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-body">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Spinner({ label = "Loading…" }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-muted">
      <Loader2 size={18} className="animate-spin" />
      {label}
    </div>
  )
}

export function SectionCard({ title, description, actions, children, className = "" }) {
  return (
    <section className={`card ${className}`}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            {title && <h3 className="text-[15px] font-semibold text-ink">{title}</h3>}
            {description && <p className="text-[13px] text-muted">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}

export function Segmented({ value, onChange, options }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }} role="radiogroup">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`rounded-md border px-4 py-3 text-left transition-colors ${active ? "border-navy-700 bg-navy-50/70 ring-2 ring-navy-700/15" : "border-line bg-white hover:border-navy-200"}`}
          >
            <div className="text-[14px] font-semibold text-ink">{o.label}</div>
            {o.hint && <div className="text-xs text-muted">{o.hint}</div>}
          </button>
        )
      })}
    </div>
  )
}
