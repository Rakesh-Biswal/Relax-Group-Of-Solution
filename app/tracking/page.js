import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import { CTABand, PageHero } from "@/components/site/Blocks"
import TrackingClient from "./TrackingClient"

export const metadata = {
  title: "Shipment tracking",
  description: "Check the status stages of your consignment with Relax Packers & Movers. Live GPS links are shared by your coordinator.",
}

export default function TrackingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          compact
          eyebrow="Tracking"
          title="Consignment status"
          text="Enter the reference from your quotation or receipt. Your coordinator also shares a live vehicle location link on WhatsApp for interstate moves."
        />
        <section className="section">
          <div className="container-x">
            <TrackingClient />
          </div>
        </section>
        <CTABand title="Need an update on a consignment in transit?" text="Coordinators are available 24/7 for consignments on the road." />
      </main>
      <SiteFooter />
    </>
  )
}
