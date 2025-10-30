// app/sitemap.js
const SITE_URL = "https://packers.relaxgroup.in"

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/services',
    '/pricing',
    '/contact',
    '/tracking',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}