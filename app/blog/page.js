import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import { CTABand, PageHero } from "@/components/site/Blocks"
import JournalClient from "./JournalClient"

export const metadata = {
  title: "Operations journal",
  description: "Photo records from Relax Packers & Movers daily operations: packing, loading, transport and delivery.",
}

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          compact
          eyebrow="Operations journal"
          title="Records from the field"
          text="Photographs and notes from recent moves, organised by stage. Each entry lists the crew, materials and time taken."
        />
        <section className="section">
          <div className="container-x">
            <JournalClient />
          </div>
        </section>
        <CTABand />
      </main>
      <SiteFooter />
    </>
  )
}
