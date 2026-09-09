import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, Star } from "lucide-react"
import { SITE, TESTIMONIALS } from "@/lib/site"

export function SectionHeading({ eyebrow, title, text, align = "left", light = false, className = "" }) {
  const alignCls = align === "center" ? "mx-auto text-center" : ""
  return (
    <div className={`max-w-2xl ${alignCls} ${className}`}>
      {eyebrow && <div className={light ? "eyebrow-light" : "eyebrow"}>{eyebrow}</div>}
      <h2 className={`h-section mt-3 ${light ? "text-white" : ""}`}>{title}</h2>
      {text && <p className={`mt-4 text-[17px] leading-relaxed ${light ? "text-slate-300" : "text-body"}`}>{text}</p>}
    </div>
  )
}

export function PageHero({ eyebrow, title, text, image, children, compact = false }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        </>
      )}
      <div className={`container-x relative ${compact ? "py-14 md:py-16" : "py-16 md:py-24"}`}>
        <div className="max-w-3xl">
          {eyebrow && <div className="eyebrow-light">{eyebrow}</div>}
          <h1 className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{text}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}

export function Stars({ rating = 5, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
      ))}
    </div>
  )
}

export function TestimonialCard({ item }) {
  return (
    <figure className="card flex h-full flex-col p-6">
      <Stars rating={item.rating} />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-body">“{item.text}”</blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <div className="text-sm font-semibold text-ink">{item.name}</div>
        <div className="text-xs text-muted">
          {item.service} · {item.route}
        </div>
      </figcaption>
    </figure>
  )
}

export function TestimonialsSection({ items = TESTIMONIALS, limit = 3, title = "What customers say after the move", eyebrow = "Customer feedback" }) {
  const list = items.slice(0, limit)
  return (
    <section className="section bg-surface-2">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="flex items-center gap-3 text-sm text-body">
            <Stars rating={5} size={16} />
            <span>
              <span className="font-semibold text-ink">4.9 / 5</span> from 1,200+ verified reviews
            </span>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {list.map((t) => (
            <TestimonialCard key={t.name} item={t} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/feedback" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
            Read all customer feedback <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function CTABand({
  title = "Planning a move? Get a written quotation today.",
  text = "Share your requirement and we will respond with an itemised quotation, usually within 30 minutes during working hours.",
}) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-x flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-slate-300">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/pricing" className="btn btn-accent btn-lg">
            Get a quote <ArrowRight size={16} />
          </Link>
          <a href={SITE.phoneHref} className="btn btn-ghost-light btn-lg">
            <Phone size={16} /> {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-white">
                {it.label}
              </Link>
            ) : (
              <span className="text-slate-300">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
