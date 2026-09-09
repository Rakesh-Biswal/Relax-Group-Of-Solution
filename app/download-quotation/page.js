import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import { PageHero } from "@/components/site/Blocks"
import DownloadClient from "./DownloadClient"

export const metadata = {
  title: "Download quotation or receipt",
  description: "Download a PDF copy of your Relax Packers & Movers quotation or money receipt using the reference number.",
}

export default function DownloadPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          compact
          eyebrow="Documents"
          title="Download your quotation or receipt"
          text="Enter the reference number shared with you on WhatsApp or email to generate a PDF copy of the document."
        />
        <section className="section">
          <div className="container-x">
            <DownloadClient />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
