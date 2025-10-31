// app/page.js
import Header from "@/components/Header"
import ServiceBoxes from "@/components/ServiceBoxes"
import HeroAnimated from "@/components/HeroAnimated"
import FeaturesGrid from "@/components/FeaturesGrid"
import BlogRow from "@/components/BlogRow"
import Partners from "@/components/Partners"
import TrackingShowcase from "@/components/TrackingShowcase"
import StatsCounters from "@/components/StatsCounters"
import Testimonials from "@/components/Testimonials"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import Script from "next/script"

// SEO Metadata for home page
export const metadata = {
  title: "Relax Packers & Movers | Professional Packers & Movers in Odisha & Across India",
  description: "Odisha's most trusted packers and movers service. Professional home relocation, office shifting & courier services in Cuttack, Bhubaneswar & across India. Real-time tracking, insurance, 24/7 Odia support.",
  keywords: "packers and movers odisha, movers cuttack, home shifting bhubaneswar, office relocation odisha, odia packers and movers",
}

export default function HomePage() {
  return (
    <>
      {/* Schema.org Breadcrumb */}
      <Script
        id="breadcrumb-ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://packers.relaxgroup.in"
              }
            ]
          }),
        }}
      />

      <main className="mx-2 bg-background text-foreground">
        <Header />
        <ServiceBoxes />
        <ContactForm />
        <HeroAnimated />
        <TrackingShowcase />
        <FeaturesGrid />
        <BlogRow />
        <Partners />
        <StatsCounters />
        <Testimonials />
        <Footer />

        {/* Tidio Chat Script */}
        <Script
          src="//code.tidio.co/8p1nixmawgovhld4mgvnxrybwjfc2x2y.js"
          strategy="afterInteractive"
          async
        />
      </main>
    </>
  )
}