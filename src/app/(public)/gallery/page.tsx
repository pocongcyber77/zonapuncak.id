import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Camera, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gallery — Zona Puncak Indonesia',
  description: 'Kumpulan momen pendakian dari trip Zona Puncak Indonesia.',
  alternates: { canonical: '/gallery' },
}

const GALLERY_ITEMS = [
  { src: '/hero-1.webp', title: 'Raung — Golden Hour', category: 'Summit Moment' },
  { src: '/hero-2.webp', title: 'Argopuro — Morning Ridge', category: 'Landscape' },
  { src: '/hero-3.webp', title: 'Team Briefing', category: 'Trip Prep' },
  { src: '/hero4.webp', title: 'Camp Area', category: 'Basecamp' },
  { src: '/hero-5.webp', title: 'Raung — Kaldera Track', category: 'Trail' },
  { src: '/hero-6.webp', title: 'Community Session', category: 'Community' },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-10">
          <div className="inline-flex items-center gap-2 text-text-muted text-sm mb-3">
            <Camera className="w-4 h-4" />
            Gallery
          </div>
          <h1
            className="text-[40px] sm:text-5xl uppercase text-text-primary leading-none mb-3"
            style={{ fontFamily: 'var(--font-hero)' }}
          >
            Momen Pendakian
          </h1>
          <p className="text-text-muted max-w-lg">
            Kumpulan dokumentasi dari perjalanan trip, briefing, summit push, hingga momen komunitas.
          </p>
        </div>
      </section>

      {/* Masonry-like grid */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, idx) => {
              const tall = idx % 3 === 0
              return (
                <article
                  key={`${item.src}-${item.title}`}
                  className={`group relative overflow-hidden rounded-2xl bg-bg-card ${tall ? 'sm:row-span-2' : ''}`}
                >
                  <div className={`relative w-full ${tall ? 'h-[420px]' : 'h-[260px]'}`}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      quality={88}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(11,11,11,0.78) 0%, rgba(11,11,11,0.15) 55%, transparent 100%)',
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[11px] text-text-secondary mb-1">{item.category}</p>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
          <div className="bg-bg-card rounded-3xl px-7 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xl font-semibold text-text-primary">Ingin jadi bagian dari cerita berikutnya?</p>
              <p className="text-sm text-text-muted">Lihat trip aktif dan pilih jadwal terbaikmu.</p>
            </div>
            <Link
              href="/trip"
              className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-6 py-3 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200"
            >
              Lihat Trip
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
