import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import { CTABand, PageHero } from "@/components/site/Blocks"
import PartnersClient from "./PartnersClient"

export const metadata = {
  title: "Corporate clients",
  description: "Organisations that use Relax Packers & Movers for employee relocation, office shifting and equipment transport.",
}

export default function PartnersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          compact
          eyebrow="Corporate clients"
          title="Relocation partner to organisations across India"
          text="Employee transfers, branch set-ups and plant equipment moves delivered under service agreements with documented scope and single-point coordination."
        />
        <section className="section">
          <div className="container-x">
            <PartnersClient />
          </div>
        </section>
        <CTABand
          title="Set up a corporate relocation agreement"
          text="We provide rate cards, a dedicated coordinator and consolidated monthly invoicing for organisations with recurring relocation needs."
        />
      </main>
      <SiteFooter />
    </>
  )
}
