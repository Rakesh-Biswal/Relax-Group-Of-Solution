import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import ServiceIcon from "@/components/site/ServiceIcon"
import { CTABand, PageHero, SectionHeading } from "@/components/site/Blocks"
import { PROCESS, SERVICES } from "@/lib/site"

export const metadata = {
  title: "Services",
  description:
    "Household relocation, office shifting, car and bike transport, packing, intercity moves and storage from Relax Packers & Movers, Cuttack, Odisha.",
}

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Services"
          title="Relocation services, itemised on every quotation"
          text="Choose only the services you need. Each line below appears as a separate item on your written quotation so there are no surprises at delivery."
          image="/images/relax-packing-image.jpg"
        >
          <nav className="flex flex-wrap gap-2" aria-label="Services on this page">
            {SERVICES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-md border border-white/20 px-3 py-1.5 text-[13px] font-medium text-slate-200 hover:bg-white/10">
                {s.title}
              </a>
            ))}
          </nav>
        </PageHero>

        <section className="section">
          <div className="container-x space-y-20 md:space-y-28">
            {SERVICES.map((s, i) => (
              <article key={s.id} id={s.id} className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface-2">
                    <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{s.title}</h2>
                  <p className="mt-4 leading-relaxed text-body">{s.description}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-ink">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/pricing" className="btn btn-primary">
                      Request a quotation <ArrowRight size={15} />
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                      Talk to a coordinator
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section bg-surface-2">
          <div className="container-x">
            <SectionHeading eyebrow="Process" title="What happens after you enquire" align="center" />
            <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p) => (
                <li key={p.step} className="card p-6">
                  <div className="text-xs font-semibold tracking-widest text-brand-600">STEP {p.step}</div>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CTABand />
      </main>
      <SiteFooter />
    </>
  )
}
