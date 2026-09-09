import { DISTRICTS } from "@/lib/site"

const SITE_URL = "https://packers.relaxgroup.in"

export default function sitemap() {
  const now = new Date().toISOString()
  const routes = ["", "/services", "/pricing", "/about", "/tracking", "/contact", "/blog", "/achievement", "/partners", "/feedback", "/download-quotation", "/terms", "/packers-movers"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }))

  const districts = DISTRICTS.map((d) => ({
    url: `${SITE_URL}/packers-movers/${d.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...routes, ...districts]
}
