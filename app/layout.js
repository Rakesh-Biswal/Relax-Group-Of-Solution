import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"

// Update with your actual domain and information
const SITE_URL = "https://packers.relax.com"
const SITE_NAME = "Relax Packers & Movers"
const BUSINESS_NAME = "Relax Group"
const BUSINESS_PHONE = "+91-9777012315"
const BUSINESS_EMAIL = "bookrelaxpackers@gmail.com"
const BUSINESS_ADDRESS = {
  street: "KHATA NO- 313/143 PLOT NO- 945/1260 TANGARHUDA, SATINAGAR, MARKAT NAGAR",
  city: "Cuttack",
  state: "Odisha",
  postalCode: "753014",
  country: "IN"
}

export const metadata = {
  title: {
    default: "Relax Packers & Movers | Professional Relocation Services Across India",
    template: "%s | Relax Packers & Movers"
  },
  description: "India's most trusted packers and movers service. Get professional home relocation, office shifting, and courier services with real-time tracking, insurance coverage, and 24/7 support. Serving 50+ cities across India.",
  keywords: [
    "packers and movers",
    "moving company",
    "relocation services",
    "home shifting",
    "office relocation",
    "courier services",
    "professional movers",
    "packing services",
    "intercity moving",
    "local movers",
    "household shifting",
    "goods transportation",
    "logistics services",
    "moving solutions",
    "Relax Packers",
    "Relax Group",
    "smart relocation"
  ].join(", "),
  generator: "Next.js",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Relax Group" }],
  creator: "Relax Group",
  publisher: "Relax Group",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-IN': SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Relax Packers & Movers | Professional Relocation Services",
    description: "Trusted by 10,000+ families across India. Professional packing, moving, and courier services with real-time tracking and insurance coverage.",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/images/packing-real.jpg`,
        width: 1200,
        height: 630,
        alt: "Relax Packers & Movers - Professional Relocation Services",
        type: "image/jpeg",
      },
      {
        url: `${SITE_URL}/images/packing-real.jpg`,
        width: 800,
        height: 800,
        alt: "Relax Packers & Movers - Professional Relocation Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RelaxPackers",
    creator: "@RelaxPackers",
    title: "Relax Packers & Movers | Professional Relocation Services",
    description: "India's trusted packers and movers. Get insured relocation services with real-time tracking across 50+ cities.",
    images: [`${SITE_URL}/images/packing-real.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console code
    yandex: "your-yandex-verification-code", // Optional
    yahoo: "your-yahoo-verification-code", // Optional
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/relax-small-logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/relax-small-logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/relax-small-logo.png' },
      { url: '/images/relax-small-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/relax-small-logo.png',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      prefix="og: https://ogp.me/ns#"
    >
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetching */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preload key requests */}
        <link rel="preload" as="style" href={GeistSans.variable} />
        <link rel="preload" as="style" href={GeistMono.variable} />

        {/* Additional meta tags for better SEO */}
        <meta name="geo.region" content="IN-OD" />
        <meta name="geo.placename" content="Cuttack, Odisha, India" />
        <meta name="geo.position" content="20.4625;85.8828" />
        <meta name="ICBM" content="20.4625, 85.8828" />


        {/* Business-specific meta tags */}
        <meta name="business:contact_data:street_address" content={BUSINESS_ADDRESS.street} />
        <meta name="business:contact_data:locality" content={BUSINESS_ADDRESS.city} />
        <meta name="business:contact_data:region" content={BUSINESS_ADDRESS.state} />
        <meta name="business:contact_data:postal_code" content={BUSINESS_ADDRESS.postalCode} />
        <meta name="business:contact_data:country_name" content="India" />

        {/* Social Media Profiles */}
        <link rel="me" href="https://www.facebook.com/share/1XKoaHzW7t/" />
        <link rel="me" href="https://twitter.com/relaxpackers" />
        <link rel="me" href="https://www.instagram.com/relax_packers_2315?utm_source=qr&igsh=ejZ0aXFpMzRsMnRq" />
        <link rel="me" href="https://linkedin.com/company/relaxpackers" />
      </head>

      <body className="bg-background text-foreground font-sans">
        {children}

        {/* Structured Data for Local Business */}
        <Script
          id="local-business-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              "@id": `${SITE_URL}#movingcompany`,
              name: BUSINESS_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo.png`,
              description: "Professional packers and movers service providing relocation, packing, and courier services across India.",
              sameAs: [
                "https://www.facebook.com/share/1XKoaHzW7t/",
                "https://www.instagram.com/relax_packers_2315?utm_source=qr&igsh=ejZ0aXFpMzRsMnRq",
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
                  areaServed: "IN",
                  availableLanguage: ["en", "hi"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: BUSINESS_PHONE,
                  contactType: "booking",
                  areaServed: "IN",
                }
              ],
              areaServed: [
                {
                  "@type": "City",
                  name: "Odisha"
                },
                {
                  "@type": "City",
                  name: "Delhi NCR"
                },
                {
                  "@type": "City",
                  name: "Mumbai"
                },
                {
                  "@type": "City",
                  name: "Bangalore"
                },
                {
                  "@type": "City",
                  name: "Hyderabad"
                },
                {
                  "@type": "City",
                  name: "Chennai"
                },
                {
                  "@type": "City",
                  name: "Kolkata"
                }
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 28.6139,
                  longitude: 77.2090,
                },
                geoRadius: "2000000" // 2000km radius covering most of India
              },
              knowsAbout: [
                "Household Relocation",
                "Office Shifting",
                "Packing Services",
                "Goods Transportation",
                "Courier Services",
                "Logistics Management"
              ],
              foundingDate: "2012",
              founders: [
                {
                  "@type": "Person",
                  name: "Badal Kumar",
                }
              ],
              employee: {
                "@type": "QuantitativeValue",
                value: "50"
              },
              service: [
                {
                  "@type": "Service",
                  name: "Home Relocation",
                  description: "Professional home shifting services with packing and transportation"
                },
                {
                  "@type": "Service",
                  name: "Office Shifting",
                  description: "Commercial relocation services for businesses and offices"
                },
                {
                  "@type": "Service",
                  name: "Courier Services",
                  description: "Fast and reliable parcel delivery across India"
                }
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "12890",
                bestRating: "5",
                worstRating: "1"
              },
              priceRange: "₹₹",
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Free Quotation"
                  },
                  price: "3000",
                  priceCurrency: "INR"
                }
              ]
            }),
          }}
        />

        {/* FAQ Structured Data */}
        <Script
          id="faq-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What areas do you serve?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We serve 50+ cities across India including Delhi NCR, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, and many more."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are your services insured?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all our moving services are fully insured. We provide complete insurance coverage for your belongings during transit."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I track my shipment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can track your shipment in real-time through our website or mobile app using your unique tracking ID provided at booking."
                  }
                }
              ]
            }),
          }}
        />

        {/* Performance Monitoring Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_ID"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR_GA_ID', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  )
}