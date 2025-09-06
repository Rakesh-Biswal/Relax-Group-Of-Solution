import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export const metadata = {
  title: "Relax Group — Packers & Movers, Courier, Smart Solutions",
  description:
    "Book professional packers & movers in minutes. Live tracking, trusted partners, and more from Relax Group.",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}
