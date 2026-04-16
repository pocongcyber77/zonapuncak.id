import type { Metadata } from 'next'
import Hero from '@/components/ui/Hero'

export const metadata: Metadata = {
  title: 'Zona Puncak Indonesia — Open Trip Gunung Terpercaya',
  description:
    'Ikuti open trip pendakian gunung bersama Zona Puncak Indonesia. Semeru, Rinjani, Prau, dan banyak lagi. Aman, profesional, dan berkesan.',
}

export default function HomePage() {
  return <Hero />
}
