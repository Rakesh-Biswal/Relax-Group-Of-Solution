import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"
import { Toaster } from "sonner"

const SITE_URL = "https://packers.relaxgroup.in"
const SITE_NAME = "Relax Packers & Movers"
const BUSINESS_NAME = "Relax Group"
const BUSINESS_PHONE = "+91-9777012315"
const BUSINESS_EMAIL = "bookrelaxpackers@gmail.com"
const BUSINESS_ADDRESS = {
  street: "KHATA NO- 313/143 PLOT NO- 945/1260 TANGARHUDA, SATINAGAR, MARKAT NAGAR",
  city: "Cuttack",
  state: "Odisha",
  postalCode: "753014",
  country: "IN",
}

export const metadata = {
  title: {
    default: "Relax Packers & Movers | Professional Packers & Movers in Odisha & Across India",
    template: "%s | Relax Packers & Movers",
  },
  description:
    "Professional packers and movers headquartered in Cuttack, Odisha. Household relocation, office shifting, vehicle transport and storage across 50+ Indian cities with written quotations, trained crew and transit insurance. ଓଡିଶାର ବିଶ୍ୱସ୍ତ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ ସେବା |",
  keywords: [
    "packers and movers", "moving company", "relocation services", "home shifting", "office relocation",
    "vehicle transportation", "packers and movers in odisha", "packers and movers cuttack",
    "packers and movers bhubaneswar", "ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ", "ଘର ବଦଳ", "Relax Packers", "Relax Group",
  ].join(", "),
  generator: "Next.js",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Relax Group" }],
  creator: "Relax Group",
  publisher: "Relax Group",
  formatDetection: { email: true, address: true, telephone: true },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL, "or-IN": SITE_URL },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Relax Packers & Movers | Professional Packers & Movers in Odisha & Across India",
    description:
      "Trusted by 10,000+ families across India. Professional packing, moving and vehicle transport with written quotations and transit insurance.",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [{ url: `${SITE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: "Relax Packers & Movers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RelaxPackers",
    creator: "@RelaxPackers",
    title: "Relax Packers & Movers | Odisha's Trusted Movers",
    description: "Professional packers and movers with written quotations, trained crew and transit insurance across 50+ cities.",
    images: [{ url: `${SITE_URL}/images/twitter-card.jpg`, width: 1200, height: 600, alt: "Relax Packers & Movers" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/images/apple-touch-icon.png" },
      { url: "/images/apple-touch-icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/images/apple-touch-icon-167.png", sizes: "167x167", type: "image/png" },
    ],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: SITE_NAME },
  category: "moving and storage services",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0f1b3d",
}

const organisationLd = [
  {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${SITE_URL}#movingcompany`,
    name: BUSINESS_NAME,
    alternateName: ["ରିଲାକ୍ସ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ", "Relax Packers Odisha"],
    url: SITE_URL,
    logo: `${SITE_URL}/images/relax-logo.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      "Professional packers and movers providing relocation, packing, vehicle transport and storage services across India with a head office in Cuttack, Odisha.",
    sameAs: [
      "https://www.facebook.com/share/17LfsV2eD7/",
      "https://www.instagram.com/relax.packersmovers",
      "https://twitter.com/relaxpackers",
      "https://linkedin.com/company/relaxpackers",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.city,
      addressRegion: BUSINESS_ADDRESS.state,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE,
        contactType: "customer service",
        areaServed: ["IN", "IN-OD"],
        availableLanguage: ["en", "hi", "or"],
        hoursAvailable: "Mo-Su 00:00-23:59",
      },
    ],
    areaServed: ["Odisha", "Cuttack", "Bhubaneswar", "Puri", "Sambalpur", "Rourkela", "Berhampur", "Delhi", "Mumbai", "Bangalore"].map(
      (name) => ({ "@type": "Place", name })
    ),
    foundingDate: "2010",
    founder: { "@type": "Person", name: "Badal Behera" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "12890", bestRating: "5", worstRating: "1" },
    priceRange: "₹₹",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving Services",
      itemListElement: ["Household Relocation", "Office Shifting", "Vehicle Transportation", "Packing Services", "Storage"].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@type": "Organization", name: BUSINESS_NAME },
  },
]

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="geo.region" content="IN-OD" />
        <meta name="geo.placename" content="Cuttack, Odisha, India" />
        <meta name="geo.position" content="20.4625;85.8828" />
        <meta name="ICBM" content="20.4625, 85.8828" />
        <meta name="business:contact_data:street_address" content={BUSINESS_ADDRESS.street} />
        <meta name="business:contact_data:locality" content={BUSINESS_ADDRESS.city} />
        <meta name="business:contact_data:region" content={BUSINESS_ADDRESS.state} />
        <meta name="business:contact_data:postal_code" content={BUSINESS_ADDRESS.postalCode} />
        <meta name="business:contact_data:country_name" content="India" />
        <meta name="business:contact_data:email" content={BUSINESS_EMAIL} />
        <meta name="business:contact_data:telephone" content={BUSINESS_PHONE} />
        <link rel="alternate" hrefLang="en-IN" href={SITE_URL} />
        <link rel="alternate" hrefLang="or-IN" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      </head>
      <body className="min-h-screen bg-white text-body">
        {children}

        <Toaster position="top-right" richColors closeButton toastOptions={{ style: { fontFamily: "inherit" } }} />

        <Script
          id="organisation-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationLd) }}
        />

        {/* Google Ads tag */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17692104354" strategy="afterInteractive" />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-17692104354');`,
          }}
        />
      </body>
    </html>
  )
}
