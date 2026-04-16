import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const TRUST_AVATARS = [
  { initials: 'R', bg: '#3D6B5E' },
  { initials: 'A', bg: '#2A4A6B' },
  { initials: 'D', bg: '#6B4A2A' },
]

interface HeroProps {
  title?: string
  description?: string
  cta?: { label: string; href: string }
  imageSrc?: string
}

export default function Hero({
  title = 'Jelajahi Puncak\nEkstrem Indonesia',
  description = 'Dipandu guide bersertifikat, diorganisir profesional — raih puncak impianmu dengan aman dan berkesan.',
  cta = { label: 'Gabung Trip', href: '/trips' },
  imageSrc = '/hero.jpg',
}: HeroProps) {
  return (
    /**
     * Mobile  : flex-col — image block di atas, content di bawah
     * Desktop : h-screen — image jadi background fill, content overlay bottom-left
     */
    <section className="bg-bg-base flex flex-col md:block md:relative md:h-screen md:min-h-[640px] md:overflow-hidden">

      {/* ── IMAGE ─────────────────────────────────────────
          Mobile  : block dengan aspect ratio, image fit penuh tanpa crop
          Desktop : absolute fill background
      ── */}
      <div className="relative w-full aspect-video shrink-0 md:absolute md:inset-0 md:w-full md:h-full">
        <Image
          src={imageSrc}
          alt="Pendaki menuju puncak gunung Indonesia"
          fill
          priority
          quality={92}
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient overlays — desktop only */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.00) 50%, rgba(0,0,0,0.55) 100%)',
          }}
          aria-hidden
        />
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.00) 75%)',
          }}
          aria-hidden
        />

        {/* Mobile: fade bawah ke bg-base agar transisi mulus */}
        <div
          className="md:hidden absolute bottom-0 left-0 right-0 h-12"
          style={{ background: 'linear-gradient(to top, #0B1D1A, transparent)' }}
          aria-hidden
        />
      </div>

      {/* ── CONTENT ───────────────────────────────────────
          Mobile  : block biasa, di bawah image, bg-bg-base
          Desktop : absolute overlay bottom-left
      ── */}
      <div className="relative md:absolute md:inset-0 md:flex md:items-end">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12 py-8 md:pb-24">
          <div className="max-w-[560px] flex flex-col gap-5">

            {/* Trust badge */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {TRUST_AVATARS.map((a) => (
                  <div
                    key={a.initials}
                    style={{ backgroundColor: a.bg }}
                    className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0"
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <p className="text-sm leading-snug" style={{ color: '#D1D5DB' }}>
                Dipercaya <span className="text-white font-semibold">150+</span>
                <br />pendaki Indonesia
              </p>
            </div>

            {/* Heading */}
            <h1
              className="text-[clamp(2.6rem,6.5vw,5rem)] leading-none uppercase text-white"
              style={{ fontFamily: 'var(--font-hero)', letterSpacing: '0.01em' }}
            >
              {title.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg leading-relaxed max-w-[480px]" style={{ color: '#D1D5DB' }}>
              {description}
            </p>

            {/* CTA */}
            <div>
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200 active:scale-95"
              >
                {cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom blend ke page bg — desktop only */}
      <div
        className="hidden md:block absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0B1D1A 0%, transparent 100%)' }}
        aria-hidden
      />

    </section>
  )
}
