// app/layout.jsx
export const metadata = {
  metadataBase: new URL('https://yourdomain.com'), // Replace with your actual domain
  title: {
    template: '%s | ADHR Packers and Movers',
    default: 'ADHR Packers and Movers - Professional Delivery Services',
  },
  description: 'Professional packers and movers services across Odisha with same-day delivery, GPS tracking, and affordable rates.',
}

export const viewport = {
  themeColor: "#a4723d",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}