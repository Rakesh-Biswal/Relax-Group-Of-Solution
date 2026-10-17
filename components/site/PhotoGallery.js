"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { GALLERY } from "@/lib/site"

export default function PhotoGallery({ items = GALLERY }) {
  const [index, setIndex] = useState(null)
  const current = index === null ? null : items[index]

  useEffect(() => {
    if (current === null) return
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null)
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length)
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [current, items.length])

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((e, i) => (
          <button
            key={e.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group card relative block aspect-square overflow-hidden text-left"
            aria-label={e.caption}
          >
            <Image
              src={e.src}
              alt={e.caption}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-3 pt-8 text-[11px] font-medium leading-snug text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
              {e.caption}
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/85 p-4 sm:p-6"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            onClick={() => setIndex(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIndex((i) => (i - 1 + items.length) % items.length)
            }}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10 sm:left-6"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIndex((i) => (i + 1) % items.length)
            }}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10 sm:right-6"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          <figure className="flex max-h-[90vh] w-full max-w-4xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image src={current.src} alt={current.caption} fill sizes="90vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-sm text-slate-200">
              {current.caption}
              <span className="ml-2 text-slate-400">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
