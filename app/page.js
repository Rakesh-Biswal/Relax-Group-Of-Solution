"use client"

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
import Script from "next/script"  // Import Script from next/script

export default function HomePage() {
  return (
    <main className="mx-2 bg-background text-foreground">
      <Header />
      <ServiceBoxes />
      <HeroAnimated />
      <ContactForm />
      <FeaturesGrid />
      <BlogRow />
      <Partners />
      <TrackingShowcase />
      <StatsCounters />
      <Testimonials />
      <Footer />

      {/* Tidio Chat Script */}
      <Script
        src="//code.tidio.co/8p1nixmawgovhld4mgvnxrybwjfc2x2y.js"
        strategy="afterInteractive" // loads after the page is interactive
        async
      />
    </main>
  )
}
