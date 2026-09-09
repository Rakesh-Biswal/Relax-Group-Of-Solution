"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

export default function FAQ({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="text-[15px] font-medium text-ink">{item.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted">
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>
            {isOpen && <div className="px-5 pb-5 text-[15px] leading-relaxed text-body sm:px-6">{item.a}</div>}
          </div>
        )
      })}
    </div>
  )
}
