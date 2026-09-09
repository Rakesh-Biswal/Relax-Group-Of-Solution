import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import FAQ from "@/components/site/FAQ"
import ServiceIcon from "@/components/site/ServiceIcon"
import StatsBand from "@/components/site/StatsBand"
import { Breadcrumb, CTABand, SectionHeading, TestimonialsSection } from "@/components/site/Blocks"
import { DISTRICTS, FAQS, SERVICES, SITE, WHY_US, whatsappLink } from "@/lib/site"

export function districtName(slug) {
  if (!slug) return ""
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}

export default function DistrictLanding({ district }) {
  const name = district ? districtName(district) : null
  const place = name || "Odisha"
  const wa = whatsappLink(`Hello, I need packers and movers service in ${place}. Please share a quotation.`)

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <Image src="/images/packing-real.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40" />
          <div className="container-x relative py-16 md:py-24">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Packers & Movers by district", href: "/packers-movers" }, ...(name ? [{ label: name }] : [])]} />
            <div className="mt-6 max-w-3xl">
              <div className="eyebrow-light">Packers & Movers in {place}</div>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
                {name ? `Professional packers and movers in ${name}` : "Packers and movers across all 30 districts of Odisha"}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                {name
                  ? `Household, office and vehicle relocation from ${name} to anywhere in Odisha or India. Local survey, trained crew, written quotation and GPS-tracked transport.`
                  : "Local crews and surveys in every district, coordinated from our head office in Cuttack. Select your district for local information and to request a quotation."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={SITE.phoneHref} className="btn btn-accent btn-lg">
                  <Phone size={16} /> Call {SITE.phone}
                </a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-lg">
                  <MessageCircle size={16} /> WhatsApp for a quotation
                </a>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-3">
                {["Same-week scheduling, subject to availability", "Local survey and itemised written quotation", "Transit insurance and signed inventory"].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-8 md:-mt-10">
          <div className="container-x">
            <StatsBand className="shadow-float" />
          </div>
        </section>

        {!name && (
          <section className="section">
            <div className="container-x">
              <SectionHeading eyebrow="Districts" title="Select your district" text="Each page carries local contact information and the services available in that district." />
              <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {DISTRICTS.map((d) => (
                  <li key={d}>
                    <Link href={`/packers-movers/${d.toLowerCase()}`} className="card flex items-center justify-between px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-navy-200 hover:bg-surface-2">
                      {d}
                      <ArrowRight size={14} className="text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className={`section ${name ? "" : "bg-surface-2"}`}>
          <div className="container-x">
            <SectionHeading eyebrow="Services" title={`Relocation services available in ${place}`} text="Every service below is itemised on your written quotation so the final bill matches what was agreed." />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <Link key={s.id} href={`/services#${s.id}`} className="card group p-6 transition-all hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-float">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="h-card mt-5">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${name ? "bg-surface-2" : ""}`}>
          <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Why Relax" title={`What to expect from our ${place} crew`} text="The same documented process applies on every move, whether it is across the district or across the country." />
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
                About the company <ArrowRight size={15} />
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-7">
              {WHY_US.map((w) => (
                <li key={w.title} className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <div className="text-[15px] font-semibold text-ink">{w.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-body">{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title={`Common questions from customers in ${place}`} />
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6">
                <MessageCircle size={15} /> Ask on WhatsApp
              </a>
            </div>
            <div className="lg:col-span-8">
              <FAQ items={FAQS} />
            </div>
          </div>
        </section>

        <TestimonialsSection title={`Feedback from moves ${name ? `in and out of ${name}` : "across Odisha"}`} />

        {name && (
          <section className="section-tight border-t border-line">
            <div className="container-x">
              <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">Other districts</div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {DISTRICTS.filter((d) => d.toLowerCase() !== district.toLowerCase()).map((d) => (
                  <li key={d}>
                    <Link href={`/packers-movers/${d.toLowerCase()}`} className="inline-block rounded-md border border-line px-3 py-1.5 text-[13px] text-body hover:border-navy-200 hover:text-navy-900">
                      {d}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <CTABand title={`Planning a move in ${place}?`} text="Call or message us with your locations and property size. A coordinator will arrange a survey and send a written quotation." />
      </main>
      <SiteFooter />
    </>
  )
}
