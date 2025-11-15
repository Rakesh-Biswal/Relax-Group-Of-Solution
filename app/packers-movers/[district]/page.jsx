// app/packers-movers/[district]/page.js
import { Metadata } from 'next'
import DistrictClientPage from './wrappingdistrict.client'

const DEFAULT_PHONE = '9777012315'

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

export default function Page({ params }) {
  return <DistrictClientPage params={params} />
}