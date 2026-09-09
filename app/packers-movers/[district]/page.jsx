import DistrictLanding, { districtName } from "@/components/site/DistrictLanding"
import { DISTRICTS, SITE } from "@/lib/site"

export function generateStaticParams() {
  return DISTRICTS.map((d) => ({ district: d.toLowerCase() }))
}

export const dynamicParams = true

export async function generateMetadata({ params }) {
  const name = districtName(params.district)
  const title = `Packers & Movers in ${name} | ${SITE.phone}`
  const description = `Professional packers and movers in ${name}. Household, office and vehicle relocation with local survey, itemised written quotation, trained crew, GPS-tracked transport and transit insurance. Call ${SITE.phone}.`
  const url = `${SITE.url}/packers-movers/${params.district}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: `${SITE.url}/images/packing-real.jpg`, width: 1200, height: 630, alt: `Relax Packers & Movers in ${name}` }],
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE.url}/images/packing-real.jpg`] },
  }
}

export default function DistrictPage({ params }) {
  return <DistrictLanding district={params.district} />
}
