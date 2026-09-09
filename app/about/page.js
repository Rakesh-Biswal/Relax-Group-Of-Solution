import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, Compass, ExternalLink, MapPin, Target } from "lucide-react"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import StatsBand from "@/components/site/StatsBand"
import { CTABand, PageHero, SectionHeading } from "@/components/site/Blocks"
import { BRANCHES, LEADERSHIP, MILESTONES, SITE, WHY_US } from "@/lib/site"

export const metadata = {
  title: "About the company",
  description:
    "Relax Packers & Movers was founded in Cuttack, Odisha in 2010. Learn about our approach, leadership, milestones and branch network.",
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="About the company"
          title="A registered, certified mover built on documented process"
          text={`Founded in ${SITE.founded} in Cuttack, Relax Packers & Movers has grown from a local household moving service into a relocation company operating across 50+ Indian cities.`}
          image="/images/relax-packers-ai-image-2.jpg"
        />

        <section className="section">
          <div className="container-x">
            <StatsBand />
            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeading eyebrow="Our story" title="From one crew in Cuttack to a pan-India network" />
                <div className="prose-basic mt-6 text-[15px]">
                  <p>
                    Relax Packers & Movers was founded by <strong className="text-ink">Badal Behera</strong> in {SITE.founded} after seeing how often families were
                    quoted one price and billed another, or had their belongings handled by untrained day labour. The company was set up
                    to do the opposite: written quotations, employed crew, and a signed inventory on every job.
                  </p>
                  <p>
                    Over the following decade we opened branches across Odisha and built a partner fleet network for intercity and
                    interstate transport. Technology, led by <strong className="text-ink">Rakesh Biswal</strong>, now supports online quotation requests,
                    digital quotations and receipts, and coordinator-led tracking for long-distance consignments.
                  </p>
                  <p>
                    Today the company is GST-registered, ISO 9001:2015 certified and serves households, corporates and institutions from its
                    head office in Cuttack.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line">
                  <Image src="/images/relax-packing-image.jpg" alt="Relax Packers crew packing household goods" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-surface-2">
          <div className="container-x grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="card p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                <Target size={22} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">Mission</h3>
              <p className="mt-3 leading-relaxed text-body">
                To make relocation predictable: a written scope, a trained crew, transport you can track, and a bill that matches the
                quotation.
              </p>
            </div>
            <div className="card p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                <Compass size={22} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">Vision</h3>
              <p className="mt-3 leading-relaxed text-body">
                To be the most trusted relocation company in Eastern India, recognised for reliability, documentation and customer
                service rather than the lowest verbal estimate.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="How we work" title="Operating standards on every job" />
            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_US.map((w, i) => (
                <li key={w.title} className="border-t border-line pt-5">
                  <div className="text-xs font-semibold tracking-widest text-brand-600">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-[17px] font-semibold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{w.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section bg-navy-950 text-white">
          <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading light eyebrow="Milestones" title="Fifteen years of steady growth" />
            </div>
            <ol className="lg:col-span-8">
              {MILESTONES.map((m) => (
                <li key={m.year} className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-6 first:border-t-0 first:pt-0">
                  <div className="w-16 text-lg font-semibold text-brand-500">{m.year}</div>
                  <div>
                    <div className="text-[17px] font-semibold text-white">{m.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Leadership" title="People accountable for your move" />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:max-w-3xl">
              {LEADERSHIP.map((p) => (
                <div key={p.name} className="card flex gap-5 p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-navy-900 text-lg font-semibold text-white">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-ink">{p.name}</div>
                    <div className="text-sm text-brand-600">{p.role}</div>
                    <p className="mt-2 text-sm leading-relaxed text-body">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-surface-2">
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow="Branch network" title="Local offices across Odisha" text="Each branch provides surveys, local crews and materials. Long-distance moves are coordinated from the head office in Cuttack." />
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
                Contact details <ArrowRight size={15} />
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BRANCHES.map((b) => (
                <li key={b.city} className="card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                      {b.type === "Branch" ? <MapPin size={17} /> : <Building2 size={17} />}
                    </div>
                    <span className={`badge ${b.type === "Branch" ? "badge-neutral" : "badge-navy"}`}>{b.type}</span>
                  </div>
                  <div className="mt-4 text-[16px] font-semibold text-ink">{b.city}</div>
                  <p className="mt-1 text-sm leading-relaxed text-body">{b.address}</p>
                  {b.map && (
                    <a href={b.map} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-navy-900">
                      Open in Maps <ExternalLink size={12} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTABand />
      </main>
      <SiteFooter />
    </>
  )
}
