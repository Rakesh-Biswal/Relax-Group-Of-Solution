import DistrictLanding from "@/components/site/DistrictLanding"

export const metadata = {
  title: "Packers & Movers by district in Odisha",
  description:
    "Relax Packers & Movers provides household, office and vehicle relocation across all 30 districts of Odisha with local surveys, written quotations and GPS-tracked transport.",
  alternates: { canonical: "https://packers.relaxgroup.in/packers-movers" },
}

export default function PackersMoversIndexPage() {
  return <DistrictLanding district={null} />
}
