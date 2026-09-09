import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { BRANCHES, SERVICES, SITE } from "@/lib/site"

const COMPANY_LINKS = [
  { label: "About the company", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing calculator", href: "/pricing" },
  { label: "Achievements", href: "/achievement" },
  { label: "Corporate clients", href: "/partners" },
  { label: "Operations journal", href: "/blog" },
  { label: "Customer feedback", href: "/feedback" },
  { label: "Contact", href: "/contact" },
]

const SUPPORT_LINKS = [
  { label: "Track a shipment", href: "/tracking" },
  { label: "Download quotation or receipt", href: "/download-quotation" },
  { label: "Terms & conditions", href: "/terms" },
  { label: "Packers & movers by district", href: "/packers-movers" },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-x py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image src="/images/relax-logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-md bg-white p-1" />
              <div>
                <div className="text-[15px] font-semibold text-white">Relax Packers & Movers</div>
                <div className="text-xs text-slate-400">A unit of Relax Group · Est. {SITE.founded}</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Professional packing, moving, vehicle transport and storage services headquartered in Cuttack, Odisha and operating across
              50+ Indian cities.
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">GSTIN</dt>
                <dd className="font-medium text-slate-200">{SITE.gstin}</dd>
              </div>
              <div>
                <dt className="text-slate-500">PAN</dt>
                <dd className="font-medium text-slate-200">{SITE.pan}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Certification</dt>
                <dd className="font-medium text-slate-200">ISO 9001:2015</dd>
              </div>
              <div>
                <dt className="text-slate-500">Support</dt>
                <dd className="font-medium text-slate-200">{SITE.hours}</dd>
              </div>
            </dl>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="text-slate-400 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-wider text-white">Customer support</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white">Head office</h3>
            <address className="mt-4 not-italic">
              <div className="flex gap-3 text-sm text-slate-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" />
                <span>
                  {SITE.hq.line1}, {SITE.hq.line2}, {SITE.hq.city}, {SITE.hq.state} {SITE.hq.pin}
                </span>
              </div>
              <div className="mt-3 flex gap-3 text-sm">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-500" />
                <div className="flex flex-col gap-1">
                  <a href={SITE.phoneHref} className="text-slate-200 hover:text-white">
                    {SITE.phone}
                  </a>
                  <a href={SITE.phoneAltHref} className="text-slate-400 hover:text-white">
                    {SITE.phoneAlt}
                  </a>
                </div>
              </div>
              <div className="mt-3 flex gap-3 text-sm">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-500" />
                <a href={`mailto:${SITE.email}`} className="text-slate-200 hover:text-white">
                  {SITE.email}
                </a>
              </div>
            </address>

            <div className="mt-6">
              <div className="text-[13px] font-semibold uppercase tracking-wider text-white">Branches</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{BRANCHES.map((b) => b.city).join(" · ")}</p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
                { Icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
                { Icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
                { Icon: Twitter, href: SITE.social.twitter, label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} Relax Packers & Movers. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/terms" className="hover:text-white">
              Terms & conditions
            </Link>
            <Link href="/terms#privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms#cancellation" className="hover:text-white">
              Cancellation & refunds
            </Link>
            <Link href="/admin" className="hover:text-white">
              Staff login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
