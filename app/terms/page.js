import Link from "next/link"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import { PageHero } from "@/components/site/Blocks"
import PrintButton from "@/components/site/PrintButton"
import { SITE } from "@/lib/site"

export const metadata = {
  title: "Terms & conditions",
  description: "Terms and conditions governing the packing, moving, transport and storage services of Relax Packers & Movers.",
}

const SECTIONS = [
  {
    id: "agreement",
    title: "Service agreement",
    body: [
      "Relax Packers & Movers (“the Company”) provides packing, loading, transportation, unloading, unpacking, vehicle transport and storage services. A confirmed booking, whether by written acceptance of a quotation or by payment of the advance, constitutes a service agreement between the customer and the Company on these terms.",
      "The scope of services is limited to the items listed on the quotation. Additional services requested on the day of the move are charged at the rates stated on the quotation or, where not stated, at the Company's prevailing rates.",
    ],
  },
  {
    id: "booking",
    title: "Booking and payment",
    body: [
      "A booking is confirmed on receipt of the advance stated on the quotation. The balance is payable before unloading at the destination unless a different arrangement is recorded in writing.",
      "Payments are accepted in cash, by UPI, bank transfer and other methods agreed at the time of booking. A money receipt is issued for every payment and can be downloaded from this website using the receipt reference.",
      "Quotations are valid for 30 days from the date of issue. Prices may be revised if the volume, access conditions or route differ materially from the information provided at the time of quotation.",
    ],
  },
  {
    id: "customer",
    title: "Customer responsibilities",
    body: [
      "The customer must provide accurate information on the items to be moved, the pickup and delivery addresses, and any access constraints such as stairs, lift availability, parking restrictions or narrow approaches. Undisclosed constraints may result in additional charges or rescheduling.",
      "Valuables including cash, jewellery, documents and medicines should be carried personally. The customer or an authorised representative must be present at pickup and delivery to sign the inventory and delivery note.",
    ],
  },
  {
    id: "insurance",
    title: "Insurance and liability",
    body: [
      "Transit insurance is available at the rate stated on the quotation and is recommended for all consignments. Where insurance is not opted for, the Company's liability for loss or damage is limited to the amount stated on the quotation.",
      "The Company is not liable for loss or damage arising from natural events, accidents beyond its control, actions of third-party carriers where disclosed, items packed by the customer, inherent defects, or items excluded under these terms. Claims must be notified at the time of delivery and recorded on the delivery note.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation and refunds",
    body: [
      "Cancellations must be communicated in writing at least 24 hours before the scheduled pickup. Refunds of the advance, where applicable, are processed within seven working days after deduction of booking and administrative charges.",
      "Cancellations within 24 hours of the scheduled pickup, or after the crew has been dispatched, may attract partial or no refund depending on costs already incurred.",
    ],
  },
  {
    id: "delays",
    title: "Delays and rescheduling",
    body: [
      "Delivery windows are estimates. Delays caused by traffic, weather, strikes, checkpoint procedures or other events outside the Company's control do not entitle the customer to compensation. The coordinator will keep the customer informed and agree a revised window.",
      "Rescheduling requested by the customer is subject to crew and vehicle availability. Where the consignment must be held, storage charges may apply.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited items",
    body: [
      "Hazardous or flammable materials, explosives, compressed gases, perishable food, live animals, illegal goods and any item restricted under applicable law will not be carried. The Company may refuse or discontinue carriage of any such item discovered during packing or transit.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "Personal information collected for quotations, bookings and receipts is used solely to provide the service and meet statutory requirements. It is shared only with transport partners engaged for the consignment and with authorities where required by law. Data is stored securely and is not sold or used for unrelated marketing.",
    ],
  },
  {
    id: "dispute",
    title: "Dispute resolution",
    body: [
      "The Company will attempt to resolve any complaint amicably through its customer service team. Unresolved disputes are subject to the exclusive jurisdiction of the courts at Cuttack, Odisha and are governed by the laws of India.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [`For queries, support or claims, contact ${SITE.name}: ${SITE.phone}, ${SITE.email}, ${SITE.hq.line1}, ${SITE.hq.line2}, ${SITE.hq.city}, ${SITE.hq.state} ${SITE.hq.pin}.`],
  },
]

export default function TermsPage() {
  const year = new Date().getFullYear()
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero compact eyebrow="Legal" title="Terms & conditions" text={`These terms govern all services provided by ${SITE.name}. By confirming a booking you accept them in full.`} />
        <section className="section">
          <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="no-print lg:sticky lg:top-24">
                <div className="card p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">On this page</div>
                  <ol className="mt-3 space-y-1.5 text-sm">
                    {SECTIONS.map((s, i) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="flex gap-2 text-body hover:text-navy-900">
                          <span className="w-5 shrink-0 text-muted">{i + 1}.</span>
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 border-t border-line pt-4 text-xs text-muted">Last updated: {year}</div>
                  <PrintButton className="btn btn-outline btn-sm mt-4 w-full" />
                </div>
              </div>
            </aside>
            <article className="lg:col-span-9">
              <div className="card p-6 sm:p-10">
                {SECTIONS.map((s, i) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0">
                    <h2 className="text-xl font-semibold text-ink">
                      {i + 1}. {s.title}
                    </h2>
                    {s.body.map((p, j) => (
                      <p key={j} className="mt-3 text-[15px] leading-relaxed text-body">
                        {p}
                      </p>
                    ))}
                  </section>
                ))}
                <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                  <p>These terms may be updated from time to time. Continued use of our services after an update constitutes acceptance of the revised terms.</p>
                  <Link href="/contact" className="btn btn-primary btn-sm no-print shrink-0">
                    Contact support
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
