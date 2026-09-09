import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import FAQ from "@/components/site/FAQ"
import { CTABand, PageHero, SectionHeading } from "@/components/site/Blocks"
import { FAQS } from "@/lib/site"
import PricingCalculator from "./PricingCalculator"

export const metadata = {
  title: "Pricing calculator",
  description:
    "Get an instant, indicative estimate for your move based on vehicle size and distance. Distance-based discounts apply automatically. Final quotations are issued in writing after a survey.",
}

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          compact
          eyebrow="Pricing"
          title="Instant estimate for your move"
          text="Select the vehicle size that matches your home and enter the approximate distance. The estimate updates as you type and can be sent to us on WhatsApp for a written quotation."
        />
        <section className="section">
          <div className="container-x">
            <PricingCalculator />
          </div>
        </section>
        <section className="section bg-surface-2">
          <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Pricing questions" title="How the final quotation is prepared" text="Estimates are indicative. The written quotation itemises transport, services and taxes after we confirm volume and access." />
            </div>
            <div className="lg:col-span-8">
              <FAQ items={[FAQS[0], FAQS[1], FAQS[2], FAQS[5], FAQS[6]]} />
            </div>
          </div>
        </section>
        <CTABand title="Prefer a survey-based quotation?" text="A coordinator can assess your home by phone or in person and issue an itemised written quotation." />
      </main>
      <SiteFooter />
    </>
  )
}
