import type { Metadata } from 'next'
import './globals.css'
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Open Trip Gunung Terpercaya`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: [
    'open trip gunung indonesia',
    'open trip pendakian',
    'wisata pendakian indonesia',
    'trip gunung semeru',
    'trip gunung rinjani',
    'zona puncak indonesia',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} — Open Trip Gunung Terpercaya`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    locale: 'id_ID',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Hero`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Open Trip Gunung Terpercaya`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  category: 'travel',
}

/* ── Noise texture data URI — reused across the site ── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        {/* Global noise texture — identical to Coming Soon page, fixed so it tiles over everything */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-9998"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundRepeat: 'repeat',
            opacity: 0.028,
          }}
        />
        {children}
      </body>
    </html>
  )
}
