import { Building2, Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import QuoteForm from "@/components/site/QuoteForm"
import { PageHero, SectionHeading } from "@/components/site/Blocks"
import { BRANCHES, SERVICE_STATES, SITE, whatsappLink } from "@/lib/site"

export const metadata = {
  title: "Contact",
  description: "Contact Relax Packers & Movers, Cuttack, Odisha. Phone, WhatsApp, email, head office address and branch locations.",
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          compact
          eyebrow="Contact"
          title="Speak with a relocation coordinator"
          text="Phone lines and WhatsApp are attended around the clock. For written quotations, use the enquiry form and we will respond with an itemised estimate."
        />

        <section className="section">
          <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 gap-4">
                <a href={SITE.phoneHref} className="card flex items-center gap-4 p-5 transition-colors hover:border-navy-200">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <Phone size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-muted">Call</div>
                    <div className="text-[16px] font-semibold text-ink">{SITE.phone}</div>
                    <div className="text-xs text-muted">Alternate: {SITE.phoneAlt}</div>
                  </div>
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition-colors hover:border-navy-200">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                    <MessageCircle size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-muted">WhatsApp</div>
                    <div className="text-[16px] font-semibold text-ink">{SITE.phone}</div>
                    <div className="text-xs text-muted">Fastest for quotations and photos</div>
                  </div>
                </a>
                <a href={`mailto:${SITE.email}`} className="card flex items-center gap-4 p-5 transition-colors hover:border-navy-200">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-muted">Email</div>
                    <div className="truncate text-[16px] font-semibold text-ink">{SITE.email}</div>
                    <div className="text-xs text-muted">Corporate enquiries and documentation</div>
                  </div>
                </a>
              </div>

              <div className="card mt-6 p-6">
                <div className="flex items-start gap-3">
                  <Building2 size={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">{SITE.hq.label}</div>
                    <address className="mt-1 not-italic text-sm leading-relaxed text-ink">
                      {SITE.hq.line1}
                      <br />
                      {SITE.hq.line2}
                      <br />
                      {SITE.hq.city}, {SITE.hq.state} {SITE.hq.pin}
                    </address>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-3 border-t border-line pt-5">
                  <Clock size={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <div className="text-sm text-ink">
                    <div className="font-medium">Office hours: Monday to Sunday, 8:00 AM to 8:00 PM</div>
                    <div className="text-muted">Phone and WhatsApp support available 24/7</div>
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5 text-[13px]">
                  <div>
                    <dt className="text-muted">GSTIN</dt>
                    <dd className="font-medium text-ink">{SITE.gstin}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">PAN</dt>
                    <dd className="font-medium text-ink">{SITE.pan}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="lg:col-span-7">
              <QuoteForm title="Send an enquiry" />
            </div>
          </div>
        </section>

        <section className="section bg-surface-2">
          <div className="container-x">
            <SectionHeading eyebrow="Branch offices" title="Local offices for surveys and pickup" />
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BRANCHES.map((b) => (
                <li key={b.city} className="card p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] font-semibold text-ink">{b.city}</div>
                    <span className={`badge ${b.type === "Branch" ? "badge-neutral" : "badge-navy"}`}>{b.type}</span>
                  </div>
                  <p className="mt-2 flex gap-2 text-sm leading-relaxed text-body">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-muted" />
                    {b.address}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-semibold">
                    <a href={SITE.phoneHref} className="text-navy-700 hover:text-navy-900">
                      {SITE.phone}
                    </a>
                    {b.map && (
                      <a href={b.map} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-navy-700 hover:text-navy-900">
                        Maps <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-line pt-8">
              <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">Interstate service areas</div>
              <p className="mt-3 text-sm leading-relaxed text-body">{SERVICE_STATES.join(" · ")}</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
