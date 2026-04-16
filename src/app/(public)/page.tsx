import type { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `${SITE_NAME} — Open Trip Gunung Terpercaya`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/hero.jpg`,
    logo: `${SITE_URL}/logo.png`,
    areaServed: 'Indonesia',
    sameAs: [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD for richer search result eligibility.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
    </>
  )
}
