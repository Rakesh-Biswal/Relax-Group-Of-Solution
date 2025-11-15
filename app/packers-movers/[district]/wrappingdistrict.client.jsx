// app/packers-movers/[district]/wrappingdistrict.jsx
'use client'
import { Metadata } from 'next'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AnimatedTagline from '../pakers_components/AnimatedTagline'
import AdCarousel from '../pakers_components/AdCarousel'
import DistrictHero from '../pakers_components/DistrictHero'
import FeaturesSection from '../pakers_components/FeaturesSection'
import Testimonials from '../pakers_components/Testimonials'
import FAQ from '../pakers_components/FAQ' 



const taglines = [    
  "Delivering Happiness In Every Mile",
  "Lightning Fast. Ultra Safe.",
  "Your Local Delivery Experts",
  "Unwrapping Joy, One Parcel at a Time",
]

// Default phone number
const DEFAULT_PHONE = '9777012315'

// Generate dynamic metadata for WhatsApp preview
export async function generateMetadata({ params }) {
  const district = params.district
  const districtName = district.charAt(0).toUpperCase() + district.slice(1)
  
  const description = `Need packers and movers in ${districtName} right now? Get up to 30% OFF on your first booking with Relax Packers & Movers! We provide fast packing, safe handling, GPS-enabled transport, and same-day shifting support. With 15 years of expertise across Odisha, we are trusted by thousands for reliable, damage-free, and affordable relocation. Call now and experience the fastest, safest way to move!`

  return {
    title: `Relax Packers & Movers in ${districtName} - ${DEFAULT_PHONE}`,
    description: description,
    openGraph: {
      title: `Relax Packers & Movers in ${districtName} - ${DEFAULT_PHONE}`,
      description: description,
      url: `https://packers.relaxgroup.in/packers-movers/${district}`,
      siteName: 'Relax Packers & Movers | ରିଲାକ୍ସ ପ୍ୟାକର୍ସ ଆଣ୍ଡ ମୁଭର୍ସ',
      images: [
        {
          url: 'https://packers.relaxgroup.in/images/packing-real.jpg',
          width: 1200,
          height: 630,
          alt: `Relax Packers and Movers in ${districtName}`,
        }
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Relax Packers & Movers in ${districtName} - ${DEFAULT_PHONE}`,
      description: description,
      images: ['https://packers.relaxgroup.in/images/packing-real.jpg'],
    }
  }
}

// Server Component (no 'use client')
export default function DistrictPage({ params }) {
  const district = params.district
  const districtName = district.charAt(0).toUpperCase() + district.slice(1)
  
  const description = `Need packers and movers in ${districtName} right now? Get up to 30% OFF on your first booking with Relax Packers & Movers! We provide fast packing, safe handling, GPS-enabled transport, and same-day shifting support. With 15 years of expertise across Odisha, we are trusted by thousands for reliable, damage-free, and affordable relocation. Call now and experience the fastest, safest way to move!`

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section id="home" className="pb-20 relative" style={{ backgroundColor: '#f8f5f1' }}>
        {/* <div className="absolute left-6 top-0 hidden md:block" style={{ zIndex: 0 }}>
          <LottiePlayer
            src="https://assets10.lottiefiles.com/packages/lf20_zbqh2bdp.json"
            style={{ height: '190px', width: '190px' }}
          />
        </div> */}

        <DistrictHero 
          districtName={districtName} 
          description={description}
          phone={DEFAULT_PHONE}
        />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 mt-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <AnimatedTagline taglines={taglines} />
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Reliable shipping services for individuals, businesses, and e-commerce clients in {districtName}.
            Experience speed, safety, and satisfaction—every single time.
          </p>

          <AdCarousel />

          <a
            href={`https://wa.me/91${DEFAULT_PHONE}?text=Hi, I need packers and movers service in ${districtName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white px-8 py-3 rounded-lg shadow-md font-semibold transition hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: '#25D366' }}
          >
            💬 Message us on WhatsApp
          </a>
        </div>
      </section>

      {/* WhatsApp Banner */}
      <section className="py-10 text-center text-white" style={{ backgroundColor: '#a4723d' }}>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Message us 24×7 on WhatsApp for Instant Booking in {districtName}
        </h2>
        <a 
          href={`https://wa.me/91${DEFAULT_PHONE}?text=Hi, I need packers and movers service in ${districtName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3 bg-white text-[#25D366] rounded-lg font-semibold shadow-lg hover:shadow-xl transition hover:scale-105"
        >
          <span className="text-3xl">💬</span>
          <div className="text-left">
            <div className="text-sm text-gray-600">WhatsApp Now</div>
            <div className="text-lg font-bold">+91 {DEFAULT_PHONE}</div>
          </div>
        </a>
      </section>



     {/* FAQ Section - NEW */}
      <FAQ districtName={districtName} />


      
      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials */}
      <Testimonials districtName={districtName} />

     

      {/* Featured On */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10" style={{ color: '#a4723d' }}>
            Featured On
          </h2>
          <div className="flex flex-wrap justify-center gap-10 grayscale opacity-80">
            {["Times of India", "Odisha News", "Startup Odisha", "ET Now"].map((name, i) => (
              <div
                key={i}
                className="text-lg font-semibold hover:scale-110 hover:opacity-100 transition duration-300"
                style={{ color: '#a4723d' }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}