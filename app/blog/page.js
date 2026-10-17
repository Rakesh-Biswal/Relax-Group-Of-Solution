import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import { CTABand, PageHero, SectionHeading } from "@/components/site/Blocks"
import JournalClient from "./JournalClient"
import PhotoGallery from "@/components/site/PhotoGallery"

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
            <SectionHeading
              eyebrow="Work gallery"
              title="Recent packing & moving work"
              text="Real photographs from recent Relax Packers & Movers jobs — furniture wrapping, loaded vehicles, two-wheeler packing and labelled consignments. Tap any photo to view it full size."
            />
            <div className="mt-10">
              <PhotoGallery />
            </div>
          </div>
        </section>
        <section className="section bg-surface-2">
          <div className="container-x">
            <SectionHeading eyebrow="Field notes" title="Move records by stage" />
            <div className="mt-8">
              <JournalClient />
            </div>
          </div>
        </section>
        <CTABand />
      </main>
      <SiteFooter />
    </>
  )
}
