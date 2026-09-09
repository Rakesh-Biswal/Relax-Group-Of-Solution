import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { ArrowRight, BadgeCheck, CheckCircle2, MapPin, Phone, ShieldCheck, Truck } from "lucide-react"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import QuoteForm from "@/components/site/QuoteForm"
import StatsBand from "@/components/site/StatsBand"
import FAQ from "@/components/site/FAQ"
import ServiceIcon from "@/components/site/ServiceIcon"
import { CTABand, SectionHeading, TestimonialsSection } from "@/components/site/Blocks"
import { BRANCHES, CLIENTS, FAQS, PROCESS, SERVICES, SERVICE_STATES, SITE, WHY_US } from "@/lib/site"

export const metadata = {
  title: "Relax Packers & Movers | Professional Packers & Movers in Odisha & Across India",
  description:
    "Professional household, office and vehicle relocation from Cuttack, Odisha to 50+ Indian cities. Written quotations, trained crew, GPS-tracked transport and transit insurance since 2010.",
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <Image src="/images/relax-truck.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-[0.28]" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />

          <div className="container-x relative grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
            <div className="lg:col-span-7">
              <div className="eyebrow-light">Packers & Movers · Cuttack, Odisha · Pan-India</div>
              <h1 className="h-display mt-4 text-white">
                Relocation handled with discipline, documentation and care.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Household, office and vehicle moves across 50+ Indian cities. Written quotations, trained crew, GPS-tracked transport and
                transit insurance, since {SITE.founded}.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/pricing" className="btn btn-accent btn-lg">
                  Get a quote <ArrowRight size={16} />
                </Link>
                <a href={SITE.phoneHref} className="btn btn-ghost-light btn-lg">
                  <Phone size={16} /> {SITE.phone}
                </a>
              </div>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-300 sm:grid-cols-4">
                {[
                  { Icon: BadgeCheck, label: "ISO 9001:2015" },
                  { Icon: ShieldCheck, label: "Transit insurance" },
                  { Icon: Truck, label: "GPS-tracked fleet" },
                  { Icon: MapPin, label: "8 branches in Odisha" },
                ].map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-2">
                    <Icon size={16} className="shrink-0 text-brand-500" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <QuoteForm compact className="text-ink" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative z-10 -mt-8 md:-mt-10">
          <div className="container-x">
            <StatsBand className="shadow-float" />
          </div>
        </section>

        {/* Services */}
        <section className="section" id="services">
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Services"
                title="Every stage of the move, under one written contract"
                text="From the pre-move survey to placement at your new address, each service is itemised on your quotation so you know exactly what is included."
              />
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
                All services <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={`/services#${s.id}`}
                  className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-float"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="h-card mt-5">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:text-navy-900">
                    Details <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="section bg-surface-2">
          <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line">
                <Image src="/images/packing-real.jpg" alt="Relax Packers crew loading a consignment" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <div className="card -mt-10 ml-6 mr-2 flex items-center gap-4 p-5 shadow-float sm:ml-10">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">Signed inventory at pickup and delivery</div>
                  <div className="text-xs text-muted">Every consignment is documented before it leaves your door.</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why Relax"
                title="The standards a regulated, registered mover should meet"
                text="Most complaints in this industry come from verbal estimates, untrained day labour and no paper trail. We built our process to remove each of those risks."
              />
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
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
          </div>
        </section>

        {/* Process */}
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="How it works" title="A four-step process, the same on every move" align="center" />
            <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p) => (
                <li key={p.step} className="relative border-t-2 border-navy-900 pt-5">
                  <div className="text-xs font-semibold tracking-widest text-brand-600">STEP {p.step}</div>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Coverage */}
        <section className="bg-navy-900 text-white">
          <div className="container-x grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                light
                eyebrow="Coverage"
                title="Headquartered in Cuttack. Operating across India."
                text="Eight branches in Odisha and Chhattisgarh provide local crews and surveys. Long-distance consignments move through our partner fleet network to 50+ cities."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/packers-movers" className="btn btn-white">
                  Service by district <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn btn-ghost-light">
                  Branch addresses
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="text-[13px] font-semibold uppercase tracking-wider text-slate-400">Branch offices</div>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BRANCHES.map((b) => (
                  <li key={b.city} className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                    <div className="text-sm font-semibold text-white">{b.city}</div>
                    <div className="text-xs text-slate-400">{b.type}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-[13px] font-semibold uppercase tracking-wider text-slate-400">Interstate service</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{SERVICE_STATES.join(" · ")}</p>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* Clients */}
        <section className="border-y border-line bg-white">
          <div className="container-x py-12">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">Corporate relocation partner to</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {CLIENTS.map((c) => (
                <li key={c} className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link href="/partners" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
                View corporate clients <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="FAQ"
                title="Questions we are asked before every move"
                text="If your question is not covered here, call us or send a WhatsApp message and a coordinator will respond."
              />
              <a href={SITE.phoneHref} className="btn btn-outline mt-6">
                <Phone size={15} /> {SITE.phone}
              </a>
            </div>
            <div className="lg:col-span-8">
              <FAQ items={FAQS.slice(0, 6)} />
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <SiteFooter />

      <Script src="//code.tidio.co/8p1nixmawgovhld4mgvnxrybwjfc2x2y.js" strategy="afterInteractive" />
    </>
  )
}
