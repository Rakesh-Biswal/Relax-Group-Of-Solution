// Central business data used across the public site and admin console.

export const SITE = {
  name: "Relax Packers & Movers",
  shortName: "Relax Packers",
  legalName: "Relax Group",
  url: "https://packers.relaxgroup.in",
  phone: "+91 97770 12315",
  phoneHref: "tel:+919777012315",
  phoneAlt: "+91 96920 12315",
  phoneAltHref: "tel:+919692012315",
  whatsapp: "919777012315",
  email: "bookrelaxpackers@gmail.com",
  gstin: "21BUQPN8897R1Z8",
  pan: "BUQPN8897R",
  founded: 2010,
  hours: "24/7 customer support",
  hq: {
    label: "Registered Office",
    line1: "Khata No. 313/143, Plot No. 945/1260",
    line2: "Tangarhuda, Satinagar, PO Markat Nagar, PS Bidanasi",
    city: "Cuttack",
    state: "Odisha",
    pin: "753014",
  },
  social: {
    facebook: "https://www.facebook.com/share/1XKoaHzW7t/",
    instagram: "https://www.instagram.com/relax_packers_2315",
    linkedin: "https://www.linkedin.com/company/relaxpackers",
    twitter: "https://twitter.com/relaxpackers",
  },
}

export function whatsappLink(message) {
  const text = encodeURIComponent(
    message || "Hello Relax Packers & Movers, I would like to enquire about your relocation services."
  )
  return `https://wa.me/${SITE.whatsapp}?text=${text}`
}

export const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Tracking", href: "/tracking" },
  { label: "Contact", href: "/contact" },
]

export const NAV_RESOURCES = [
  { label: "Operations Journal", href: "/blog", description: "Photo records from our daily moves" },
  { label: "Achievements", href: "/achievement", description: "Milestones and certifications" },
  { label: "Corporate Clients", href: "/partners", description: "Organisations we serve" },
  { label: "Customer Feedback", href: "/feedback", description: "Verified reviews" },
  { label: "Download Documents", href: "/download-quotation", description: "Quotation and receipt PDFs" },
  { label: "Terms & Conditions", href: "/terms", description: "Service agreement" },
]

export const SERVICES = [
  {
    id: "home-relocation",
    title: "Household Relocation",
    short: "End-to-end home shifting with professional packing, transport and placement.",
    description:
      "Complete door-to-door household relocation. Our crew surveys your home, packs every item with grade-appropriate materials, loads and secures the consignment, and re-assembles furniture at your new address.",
    bullets: ["Pre-move survey and inventory", "Fragile and electronic packing", "Furniture dismantling and re-assembly", "Transit insurance available"],
    image: "/images/relax-packing-image.jpg",
    icon: "home",
  },
  {
    id: "office-relocation",
    title: "Office & Commercial Shifting",
    short: "Planned relocation of workstations, IT assets and records with minimal downtime.",
    description:
      "We plan office moves around your business hours, label and track every asset, and coordinate with your IT and facilities teams so operations resume quickly at the new premises.",
    bullets: ["Phased move planning", "IT and server handling", "Asset labelling and tracking", "After-hours execution"],
    image: "/images/packing-real.jpg",
    icon: "building",
  },
  {
    id: "vehicle-transport",
    title: "Car & Bike Transportation",
    short: "Enclosed and open carrier transport for two- and four-wheelers across India.",
    description:
      "Vehicles are inspected, documented and secured on purpose-built carriers. Delivery is scheduled with the receiving party and condition is verified on handover.",
    bullets: ["Pre-dispatch condition report", "Secured carrier loading", "Pan-India delivery", "Doorstep pickup and drop"],
    image: "/images/bikepack.jpg",
    icon: "car",
  },
  {
    id: "packing",
    title: "Packing & Unpacking",
    short: "Material-specific packing for furniture, appliances, glassware and artwork.",
    description:
      "Corrugated boxes, bubble wrap, stretch film, corner guards and custom crates are matched to each item. Unpacking and placement at destination is included on request.",
    bullets: ["Multi-layer protection", "Custom wooden crating", "Room-wise labelling", "Debris removal"],
    image: "/images/electronic-packaging.jpg",
    icon: "package",
  },
  {
    id: "intercity",
    title: "Intercity & Interstate Moves",
    short: "Dedicated and shared-load transport to 50+ cities with GPS-tracked vehicles.",
    description:
      "Long-distance consignments move on GPS-enabled vehicles with dedicated coordinators. Transit times, documentation and route formalities are handled by our team.",
    bullets: ["Dedicated or shared load", "GPS-enabled fleet", "Documentation support", "Scheduled delivery windows"],
    image: "/images/relax-truck.jpg",
    icon: "route",
  },
  {
    id: "storage",
    title: "Storage & Warehousing",
    short: "Short- and long-term storage in secure, monitored facilities.",
    description:
      "When move-in dates do not align, your consignment is held in a covered, access-controlled warehouse with itemised inventory and scheduled release.",
    bullets: ["Itemised inventory", "Covered, access-controlled space", "Flexible tenure", "Scheduled release"],
    image: "/images/relax-ondelivery-image.jpg",
    icon: "warehouse",
  },
]

export const PROCESS = [
  { step: "01", title: "Enquiry and survey", text: "Share your requirement online or by phone. We assess volume, access and distance and issue a written quotation." },
  { step: "02", title: "Confirmation", text: "Confirm the move with a token advance. A coordinator is assigned and the crew, vehicle and materials are scheduled." },
  { step: "03", title: "Packing and loading", text: "Trained staff pack, label and load your consignment. An inventory is signed before dispatch." },
  { step: "04", title: "Transit and delivery", text: "Track the vehicle en route. At destination we unload, unpack and place items as agreed." },
]

export const STATS = [
  { value: 12890, suffix: "+", label: "Successful moves" },
  { value: 50, suffix: "+", label: "Cities served" },
  { value: 15, suffix: "+", label: "Years in operation" },
  { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
]

export const WHY_US = [
  { title: "Written, itemised quotations", text: "Every quotation lists transport, services and taxes separately. No verbal estimates and no hidden charges." },
  { title: "Trained, verified crew", text: "Packing and loading staff are employed and trained by us, not sub-contracted on the day." },
  { title: "Transit insurance", text: "Coverage options for household goods and vehicles, with documented inventory at pickup and delivery." },
  { title: "GPS-tracked fleet", text: "Long-distance consignments move on tracked vehicles with a coordinator available throughout." },
  { title: "Registered and certified", text: "GST-registered business with ISO 9001:2015 quality management certification." },
  { title: "Local presence in Odisha", text: "Head office in Cuttack and branches across the state, with Odia-speaking support staff." },
]

export const BRANCHES = [
  { city: "Cuttack", type: "Head Office", address: "Tulsipur, Biju Patnaik Chhak, Cuttack, Odisha 753008", map: "https://share.google/bTbiOIYbTVBuuliw8" },
  { city: "Bhubaneswar", type: "Regional Office", address: "Sai Mandir, Tankapani Road, Laxmi Vihar, Baragarh, Bhubaneswar 751002", map: "https://share.google/VGUxX1pvIDQhuOyFK" },
  { city: "Dhenkanal", type: "Branch", address: "Main Road, Dhenkanal, Odisha", map: "https://share.google/GnGoirDZpN3VuEjUj" },
  { city: "Angul", type: "Branch", address: "Sital Vihar, Angul, Odisha" },
  { city: "Balasore", type: "Branch", address: "Matha Sai, Balasore, Odisha" },
  { city: "Balangir", type: "Branch", address: "Brahmanipali, Balangir, Odisha" },
  { city: "Koraput", type: "Branch", address: "Similiguda, Koraput, Odisha" },
  { city: "Jagdalpur", type: "Branch", address: "Shanti Nagar, Jagdalpur, Chhattisgarh" },
]

export const SERVICE_STATES = [
  "Odisha", "West Bengal", "Chhattisgarh", "Jharkhand", "Bihar", "Andhra Pradesh", "Telangana",
  "Karnataka", "Tamil Nadu", "Kerala", "Maharashtra", "Gujarat", "Rajasthan", "Delhi NCR",
  "Uttar Pradesh", "Punjab", "Haryana", "Himachal Pradesh", "Assam", "Goa",
]

export const DISTRICTS = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam",
  "Gajapati", "Jharsuguda", "Jajpur", "Jagatsinghpur", "Khordha", "Keonjhar", "Kalahandi", "Kandhamal", "Koraput",
  "Kendrapara", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nuapada", "Nayagarh", "Puri", "Rayagada", "Sambalpur",
  "Subarnapur", "Sundargarh",
]

export const TESTIMONIALS = [
  { name: "Priya Sharma", route: "Mumbai to Bangalore", service: "Household relocation", rating: 5, text: "The team handled our entire 3 BHK shift with care. Everything arrived without a single scratch and the inventory made handover straightforward." },
  { name: "Rajesh Kumar", route: "Delhi to Hyderabad", service: "Office relocation", rating: 5, text: "They worked after hours to keep our disruption to a minimum. Workstations and servers were set up at the new office the next morning." },
  { name: "Vikram Singh", route: "Kolkata to Delhi", service: "Vehicle transport", rating: 5, text: "My car was transported without damage. GPS tracking was active throughout and the coordinator sent regular updates." },
  { name: "Meera Nair", route: "Bangalore to Chennai", service: "Packing service", rating: 5, text: "Professional packing crew with quality materials. Delicate items were packed separately and nothing was broken in transit." },
  { name: "Anita Patel", route: "Cuttack to Pune", service: "Household relocation", rating: 4, text: "Transparent pricing and an on-time crew. The quotation matched the final bill exactly, which is rare in this industry." },
  { name: "Arjun Mehta", route: "Hyderabad to Mumbai", service: "Storage", rating: 4, text: "Used their storage for two months between moves. Clean, secure and every item was in the same condition when released." },
]

export const CLIENTS = ["Tata Steel", "JSW Steel", "State Bank of India", "HDFC Bank", "Konark Cement", "Reliance Industries", "Mahindra Group", "Hindustan Unilever"]

export const FAQS = [
  { q: "How is the cost of a move calculated?", a: "Pricing depends on the volume of goods, distance, access at both addresses and the services you select (packing, unpacking, electrical work). We issue an itemised written quotation after a survey or a detailed phone assessment." },
  { q: "Do you provide packing materials?", a: "Yes. Boxes, bubble wrap, stretch film, corner guards and crates for fragile items are included in our packing service. Materials are matched to the item being packed." },
  { q: "Are my goods insured during transit?", a: "Transit insurance is available for household goods and vehicles. Coverage limits and terms are stated on your quotation. A signed inventory is prepared at pickup and verified at delivery." },
  { q: "How much notice do you need?", a: "We recommend two to three days for local moves and five to seven days for interstate relocations. Same-day and next-day moves are accommodated subject to crew and vehicle availability." },
  { q: "How long does an interstate move take?", a: "Most interstate consignments are delivered within three to seven business days depending on distance and route. Your coordinator confirms a delivery window before dispatch." },
  { q: "What payment methods do you accept?", a: "Cash, UPI, bank transfer and major digital wallets. A token advance confirms the booking; the balance is settled before delivery unless agreed otherwise." },
  { q: "Can you handle electrical disconnection and reconnection?", a: "Yes. Air conditioners, geysers and similar appliances can be disconnected at origin and reconnected at destination for a stated charge on your quotation." },
  { q: "Do you move plants and pets?", a: "Indoor plants can be relocated with appropriate care. For pets we recommend specialised pet transport services and can provide referrals." },
]

export const MILESTONES = [
  { year: "2010", title: "Founded in Cuttack", text: "Relax Packers & Movers began as a local household moving service in Odisha." },
  { year: "2014", title: "1,000 families served", text: "Crossed one thousand completed household relocations across the state." },
  { year: "2018", title: "Pan-India network", text: "Extended intercity and interstate services to 50+ cities through partner fleets." },
  { year: "2022", title: "ISO 9001:2015 certification", text: "Quality management system certified for packing, transport and customer service processes." },
  { year: "2023", title: "Industry recognition", text: "Recognised as a leading packers and movers service in Eastern India." },
]

export const AWARDS = [
  { year: "2023", title: "Best Packers & Movers, Eastern India", by: "Industry recognition" },
  { year: "2022", title: "ISO 9001:2015 Certified", by: "Quality management" },
  { year: "2021", title: "50+ Cities Network Expansion", by: "Operations milestone" },
  { year: "2020", title: "10,000 Relocations Completed", by: "Operations milestone" },
]

export const LEADERSHIP = [
  { name: "Badal Behera", role: "Founder & Managing Director", text: "Founded the company in 2010 with a focus on disciplined, documented moving practices." },
  { name: "Rakesh Biswal", role: "Technology & Marketing Lead", text: "Leads the digital platform, quotation systems and customer-facing tools." },
]
