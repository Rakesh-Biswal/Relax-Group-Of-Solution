import { Award, BadgeCheck, MapPin, Truck } from "lucide-react"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import StatsBand from "@/components/site/StatsBand"
import { CTABand, PageHero, SectionHeading } from "@/components/site/Blocks"
import { AWARDS, MILESTONES } from "@/lib/site"

export const metadata = {
  title: "Achievements",
  description: "Milestones, certifications and recognition earned by Relax Packers & Movers since 2010.",
}

const EXTENDED_STATS = [
  { value: 12890, suffix: "+", label: "Successful moves" },
  { value: 50, suffix: "+", label: "Cities served" },
  { value: 85, suffix: "+", label: "Partner fleet vehicles" },
  { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
]

const CERTIFICATIONS = [
  { Icon: BadgeCheck, title: "ISO 9001:2015", text: "Quality management system certified for packing, transport and customer service processes." },
  { Icon: Award, title: "GST registered", text: "GSTIN 21BUQPN8897R1Z8. Every quotation and receipt is issued as a tax-compliant document." },
  { Icon: Truck, title: "Partner fleet network", text: "85+ vehicles through verified transport partners for intercity and interstate consignments." },
  { Icon: MapPin, title: "8 branch offices", text: "Local presence across Odisha and Chhattisgarh for surveys, crews and materials." },
]

export default function AchievementsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Achievements"
          title="Fifteen years of documented, measurable service"
          text="Our numbers are the result of a repeatable process: written scope, trained crews, tracked transport and signed handover on every move."
          image="/images/relax-truck.jpg"
        />

        <section className="section">
          <div className="container-x">
            <StatsBand stats={EXTENDED_STATS} />
          </div>
        </section>

        <section className="section bg-surface-2">
          <div className="container-x">
            <SectionHeading eyebrow="Certifications and capacity" title="What stands behind the numbers" />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CERTIFICATIONS.map((c) => (
                <div key={c.title} className="card p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <c.Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Recognition" title="Awards and milestones" text="Recognition received from industry bodies and internal operational milestones." />
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-line rounded-lg border border-line bg-white">
                {AWARDS.map((a) => (
                  <li key={a.title} className="flex items-center gap-5 px-6 py-5">
                    <div className="w-14 shrink-0 text-lg font-semibold text-brand-600">{a.year}</div>
                    <div>
                      <div className="text-[16px] font-semibold text-ink">{a.title}</div>
                      <div className="text-sm text-muted">{a.by}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section bg-navy-950 text-white">
          <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading light eyebrow="Timeline" title="Company milestones" />
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

        <CTABand />
      </main>
      <SiteFooter />
    </>
  )
}
