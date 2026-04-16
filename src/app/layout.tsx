import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Zona Puncak Indonesia — Open Trip Gunung Terpercaya',
    template: '%s | Zona Puncak Indonesia',
  },
  description:
    'Platform open trip pendakian gunung terpercaya di Indonesia. Daftar, pilih trip, dan raih puncak bersama kami.',
  keywords: ['open trip', 'pendakian gunung', 'gunung Indonesia', 'wisata alam', 'zona puncak'],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Zona Puncak Indonesia',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-stone-900">{children}</body>
    </html>
  )
}
