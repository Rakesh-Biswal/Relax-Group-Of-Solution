"use client"

import { Printer } from "lucide-react"

export default function PrintButton({ className = "btn btn-outline btn-sm", label = "Print this page" }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer size={14} /> {label}
    </button>
  )
}
