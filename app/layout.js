import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"

// Update with your actual domain and information
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
  country: "IN"
}

// Bilingual metadata
export const metadata = {
  title: {
    default: "Relax Packers & Movers | Professional Packers & Movers in Odisha & Across India | ରିଲାକ୍ସ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ",
    template: "%s | Relax Packers & Movers"
  },
  description: "India's most trusted Odia-owned packers and movers service. Professional home relocation, office shifting & courier services in Odisha & pan-India. Real-time tracking, insurance coverage, 24/7 support. ଓଡିଶାର ବିଶ୍ୱସ୍ତ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ ସେବା |",
  keywords: [
    // English Keywords
    "packers and movers", "moving company", "relocation services", "home shifting",
    "office relocation", "courier services", "professional movers", "packing services",
    "intercity moving", "local movers", "household shifting", "goods transportation",
    "logistics services", "moving solutions", "Relax Packers", "Relax Group",

    // Odia/Local Keywords
    "packers and movers in odisha", "packers and movers cuttack", "packers and movers bhubaneswar",
    "packers and movers in odia", "ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ", "ଘର ବଦଳ", "ଅଫିସ୍ ବଦଳ",
    "ସମାନ ବହନ", "ଟ୍ରାକିଂ ସେବା", "ରିଲାକ୍ସ ପ୍ୟାକର୍ସ", "ଓଡିଶା ପ୍ୟାକର୍ସ",
    "best packers in odisha", "odia packers and movers", "reliable movers odisha",

    // Additional SEO Keywords
    "affordable packers and movers", "insured moving services", "house shifting services",
    "commercial relocation", "packers and movers near me", "goods transport services",
    "packing and moving company", "professional relocation services", "safe moving services"
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
      'or-IN': SITE_URL, // Odia language
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Relax Packers & Movers | Professional Packers & Movers in Odisha & Across India",
    description: "Trusted by 10,000+ families across India. Professional packing, moving, and courier services with real-time tracking and insurance coverage. ଓଡିଶାର ନମ୍ବର ୧ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ |",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/images/og-image1.jpg`, // Required: 1200x630px
        width: 1200,
        height: 630,
        alt: "Relax Packers & Movers - Professional Relocation Services in Odisha & Across India",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RelaxPackers",
    creator: "@RelaxPackers",
    title: "Relax Packers & Movers | Odisha's Trusted Movers",
    description: "Odisha's most trusted packers and movers. Get insured relocation services with real-time tracking across 50+ cities. ଓଡିଶାର ବିଶ୍ୱସ୍ତ ପ୍ୟାକର୍ସ ସେବା |",
    images: [
      {
        url: `${SITE_URL}/images/twitter-card.jpg`, // Required: 1200x600px
        width: 1200,
        height: 600,
        alt: "Relax Packers & Movers - Professional Moving Services",
      }
    ],
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
    google: "your-google-search-console-verification-code", // Add your Google Search Console code
  },
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Standard favicon in root
      { url: '/images/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png' }, // 180x180px for iOS
      { url: '/images/apple-touch-icon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/images/apple-touch-icon-167.png', sizes: '167x167', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/safari-pinned-tab.svg',
        color: '#a4723dff', // Your brand color
      },
    ],
  },
  manifest: '/manifest.json', // For PWA
  themeColor: '#a4723dff', // Your brand color
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5, // Allow more zoom for accessibility
    userScalable: true, // Allow zoom for accessibility
  },
  category: 'moving and storage services', // Industry category
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      prefix="og: https://ogp.me/ns#"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <head>
        {/* Character Encoding */}
        <meta charSet="utf-8" />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetching for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Language Alternatives for SEO */}
        <link rel="alternate" hreflang="en-IN" href={SITE_URL} />
        <link rel="alternate" hreflang="or-IN" href={SITE_URL} />
        <link rel="alternate" hreflang="x-default" href={SITE_URL} />
        <link rel="alternate" hreflang="en" href={SITE_URL} />
        <link rel="alternate" hreflang="or" href={SITE_URL} />

        {/* Enhanced Local Business Meta */}
        <meta name="geo.region" content="IN-OD" />
        <meta name="geo.placename" content="Cuttack, Odisha, India" />
        <meta name="geo.position" content="20.4625;85.8828" />
        <meta name="ICBM" content="20.4625, 85.8828" />

        {/* Local Business Keywords */}
        <meta name="location" content="Cuttack, Odisha, India" />
        <meta name="town" content="Cuttack" />
        <meta name="state" content="Odisha" />
        <meta name="country" content="India" />

        {/* Business-specific meta tags */}
        <meta name="business:contact_data:street_address" content={BUSINESS_ADDRESS.street} />
        <meta name="business:contact_data:locality" content={BUSINESS_ADDRESS.city} />
        <meta name="business:contact_data:region" content={BUSINESS_ADDRESS.state} />
        <meta name="business:contact_data:postal_code" content={BUSINESS_ADDRESS.postalCode} />
        <meta name="business:contact_data:country_name" content="India" />
        <meta name="business:contact_data:email" content={BUSINESS_EMAIL} />
        <meta name="business:contact_data:telephone" content={BUSINESS_PHONE} />

        {/* Additional SEO Meta Tags */}
        <meta name="classification" content="Moving and Storage Services" />
        <meta name="author" content="Relax Group" />
        <meta name="copyright" content={`Copyright ${new Date().getFullYear()} ${BUSINESS_NAME}`} />
        <meta name="designer" content="Relax Group" />
        <meta name="rating" content="safe for kids" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="company" content={BUSINESS_NAME} />

        {/* Social Media Profiles */}
        <link rel="me" href="https://www.facebook.com/share/17LfsV2eD7/" />
        <link rel="me" href="https://twitter.com/relaxpackers" />
        <link rel="me" href="https://www.instagram.com/relax.packersmovers?igsh=MWVwYTIzYm16ODBkdQ==" />
        <link rel="me" href="https://www.linkedin.com/posts/relax-packers-movers_packersandmovers-relocationexperts-logisticsindia-activity-7389352784480989185-MyGp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEtv_IAB-yx3Eor6C3BKIXXxeCGm9fTm5ek" />

        {/* Preload key images */}
        <link rel="preload" href="/images/relax-logo.png" as="image" />
        <link rel="preload" href="/images/og-image.jpg" as="image" />

        {/* Additional Open Graph for better social sharing */}
        <meta property="og:email" content={BUSINESS_EMAIL} />
        <meta property="og:phone_number" content={BUSINESS_PHONE} />
        <meta property="og:latitude" content="20.4625" />
        <meta property="og:longitude" content="85.8828" />
        <meta property="og:street-address" content={BUSINESS_ADDRESS.street} />
        <meta property="og:locality" content={BUSINESS_ADDRESS.city} />
        <meta property="og:region" content={BUSINESS_ADDRESS.state} />
        <meta property="og:postal-code" content={BUSINESS_ADDRESS.postalCode} />
        <meta property="og:country-name" content="India" />

        {/* Twitter Additional Meta */}
        <meta name="twitter:label1" content="Established" />
        <meta name="twitter:data1" content="2010" />
        <meta name="twitter:label2" content="Services" />
        <meta name="twitter:data2" content="Home & Office Relocation" />

        {/* Additional Performance Optimizations */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-title" content="Relax Packers" />

        {/* Google Tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17692104354"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17692104354');
            `,
          }}
        />
      </head>

      <body className="bg-background text-foreground font-sans" itemScope itemType="https://schema.org/WebPage">
        {/* Google Tag Manager (noscript) for when JavaScript is disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* Enhanced Structured Data for Local Business */}
        <Script
          id="local-business-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "MovingCompany",
                "@id": `${SITE_URL}#movingcompany`,
                name: BUSINESS_NAME,
                alternateName: ["ରିଲାକ୍ସ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ", "Relax Packers Odisha"],
                url: SITE_URL,
                logo: `${SITE_URL}/images/relax-logo.png`, // Recommended: 300x100px
                image: `${SITE_URL}/images/og-image.jpg`, // Recommended: 1200x630px
                description: "Professional packers and movers service providing relocation, packing, and courier services across India with special focus on Odisha. ଓଡିଶାର ବିଶ୍ୱସ୍ତ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ ସେବା |",
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
                  }
                ],
                areaServed: [
                  {
                    "@type": "State",
                    name: "Odisha"
                  },
                  {
                    "@type": "City",
                    name: "Cuttack"
                  },
                  {
                    "@type": "City",
                    name: "Bhubaneswar"
                  },
                  {
                    "@type": "City",
                    name: "Puri"
                  },
                  {
                    "@type": "City",
                    name: "Sambalpur"
                  },
                  {
                    "@type": "City",
                    name: "Rourkela"
                  },
                  {
                    "@type": "City",
                    name: "Berhampur"
                  },
                  {
                    "@type": "City",
                    name: "Delhi"
                  },
                  {
                    "@type": "City",
                    name: "Mumbai"
                  },
                  {
                    "@type": "City",
                    name: "Bangalore"
                  }
                ],
                knowsAbout: [
                  "Household Relocation",
                  "Office Shifting",
                  "Packing Services",
                  "Goods Transportation",
                  "Courier Services",
                  "Logistics Management",
                  "ଘର ବଦଳ ସେବା",
                  "ଅଫିସ୍ ବଦଳ ସେବା",
                  "ପ୍ୟାକିଂ ସେବା",
                  "Insurance Services",
                  "Real-time Tracking"
                ],
                foundingDate: "2010",
                founder: {
                  "@type": "Person",
                  name: "Badal Behera",
                },
                employee: {
                  "@type": "QuantitativeValue",
                  value: "50",
                  unitText: "employees"
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  ratingCount: "12890",
                  bestRating: "5",
                  worstRating: "1",
                  reviewCount: "12890"
                },
                priceRange: "₹₹",
                makesOffer: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Free Quotation"
                    },
                    price: "3400",
                    priceCurrency: "INR"
                  }
                ],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Moving Services",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Home Relocation"
                      }
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Office Shifting"
                      }
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Courier Services"
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                url: SITE_URL,
                name: "Relax Packers & Movers",
                alternateName: ["ରିଲାକ୍ସ ପ୍ୟାକର୍ସ", "Relax Packers Odisha"],
                description: "Professional packers and movers service in Odisha and across India",
                publisher: {
                  "@type": "Organization",
                  name: "Relax Group"
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${SITE_URL}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: BUSINESS_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}/images/relax-logo.png`,
                sameAs: [
                  "https://www.facebook.com/share/17LfsV2eD7/",
                  "https://www.instagram.com/relax.packersmovers",
                  "https://twitter.com/relaxpackers",
                  "https://linkedin.com/company/relaxpackers",
                ]
              }
            ]),
          }}
        />

        {/* Enhanced FAQ Structured Data */}
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
                  "name": "What areas in Odisha do you serve?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We serve all major cities in Odisha including Cuttack, Bhubaneswar, Puri, Sambalpur, Rourkela, Berhampur, and surrounding areas. ଆମେ ଓଡିଶାର ସମସ୍ତ ପ୍ରମୁଖ ସହରରେ ସେବା ପ୍ରଦାନ କରୁଛୁ |"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are your services insured?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all our moving services are fully insured. We provide complete insurance coverage for your belongings during transit. ହଁ, ଆମର ସମସ୍ତ ସେବା ଇନ୍ସୁରାନ୍ସ ସହିତ ଉପଲବ୍ଧ |"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide Odia-speaking staff?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we have Odia-speaking customer support and moving staff to ensure clear communication and better service experience. ହଁ, ଆମର ଓଡିଆ କଥା କହିବା ସହାୟକ ଦଳ ଅଛି |"
                  }
                },
                {
                  "@type": "Question",
                  "name": "How quickly can you start the moving process?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We can start the moving process within 24 hours of booking. For emergency relocations, we offer same-day services. ଆମେ ବୁକିଂର ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ମୁଭିଂ ପ୍ରକ୍ରିୟା ଆରମ୍ଭ କରିପାରିବା |"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide packing materials?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide all necessary packing materials including boxes, bubble wrap, packing tape, and protective covers at no extra cost. ହଁ, ଆମେ ସମସ୍ତ ଆବଶ୍ୟକୀୟ ପ୍ୟାକିଂ ସାମଗ୍ରୀ ଯୋଗାଇଥାଉ |"
                  }
                }
              ]
            }),
          }}
        />

        {/* Breadcrumb Structured Data */}
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
                  "item": SITE_URL
                }
              ]
            }),
          }}
        />

        {/* Google Analytics - Update with your actual ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
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
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
                transport_type: 'beacon',
                anonymize_ip: true
              });
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </body>
    </html>
  )
}