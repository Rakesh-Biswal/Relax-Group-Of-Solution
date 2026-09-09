import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import { CTABand, PageHero } from "@/components/site/Blocks"
import FeedbackClient from "./FeedbackClient"

export const metadata = {
  title: "Customer feedback",
  description: "Verified reviews from households and businesses that moved with Relax Packers & Movers, and a form to share your own experience.",
}

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          compact
          eyebrow="Customer feedback"
          title="Reviews from completed moves"
          text="Feedback is collected at handover and published with the customer's consent. Ratings shown are unedited."
        />
        <section className="section">
          <div className="container-x">
            <FeedbackClient />
          </div>
        </section>
        <CTABand />
      </main>
      <SiteFooter />
    </>
  )
}
