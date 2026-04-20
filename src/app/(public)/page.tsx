import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Compass, Users, Star, MapPin } from 'lucide-react'
import Hero from '@/components/ui/Hero'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `${SITE_NAME} — Open Trip Gunung Terpercaya`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
}

/* ─── Data ───────────────────────────────────────── */

const stats = [
  { value: '150+', label: 'Pendaki' },
  { value: '12+',  label: 'Gunung' },
  { value: '7+',   label: 'Tahun' },
  { value: '4.9',  label: 'Rating' },
]

const destinations = [
  {
    name: 'Gunung Raung',
    location: 'Jawa Timur',
    elevation: '3.344 mdpl',
    tag: 'Ekstrem',
    gradient: 'linear-gradient(160deg, #1a3a2f 0%, #0d1f1a 50%, #050e0c 100%)',
  },
  {
    name: 'Gunung Semeru',
    location: 'Jawa Timur',
    elevation: '3.676 mdpl',
    tag: 'Hard',
    gradient: 'linear-gradient(160deg, #1e2a1a 0%, #111a0e 50%, #080d06 100%)',
  },
  {
    name: 'Gunung Rinjani',
    location: 'Lombok, NTB',
    elevation: '3.726 mdpl',
    tag: 'Hard',
    gradient: 'linear-gradient(160deg, #1a2535 0%, #0e1520 50%, #060a10 100%)',
  },
  {
    name: 'Gunung Prau',
    location: 'Jawa Tengah',
    elevation: '2.565 mdpl',
    tag: 'Easy',
    gradient: 'linear-gradient(160deg, #252018 0%, #16130e 50%, #080705 100%)',
  },
]

const tagBadge: Record<string, string> = {
  Ekstrem: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Hard:    'bg-red-500/20    text-red-300    border-red-500/30',
  Medium:  'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Easy:    'bg-green-500/20  text-green-300  border-green-500/30',
}

const reasons = [
  {
    icon: Shield,
    title: 'Terpercaya',
    body: 'Lebih dari 150 pendaki telah kami antar dengan selamat ke puncak impian mereka.',
  },
  {
    icon: Compass,
    title: 'Rute Terkurasi',
    body: 'Setiap jalur dipilih cermat. Aman, teruji, dan tetap menantang sesuai levelmu.',
  },
  {
    icon: Users,
    title: 'Satu Partner, Satu Tujuan',
    body: 'Dari persiapan hingga turun gunung — kami ada di setiap langkahmu.',
  },
]

const testimonials = [
  {
    name: 'Rizky P.',
    trip: 'Gunung Raung',
    star: 5,
    text: 'Guide pro banget. Summit berasa nggak ngeri sama sekali.',
  },
  {
    name: 'Sari D.',
    trip: 'Gunung Rinjani',
    star: 5,
    text: 'Semua diurus rapi. Tinggal nikmati pemandangannya.',
  },
  {
    name: 'Andi F.',
    trip: 'Gunung Semeru',
    star: 5,
    text: 'Sunrise dari Mahameru bareng tim ZP — tak terlupakan.',
  },
]

/* ─── Helpers ────────────────────────────────────── */

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
      {children}
    </p>
  )
}

/* heading yang elegan — Cormorant Garamond */
function SerifHeading({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`leading-[1.1] text-white ${className}`}
      style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
    >
      {children}
    </h2>
  )
}

/* ─── Page ───────────────────────────────────────── */

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══ HERO ══════════════════════════════════════════ */}
      <Hero />

      {/* ══ STATS STRIP ══════════════════════════════════ */}
      <section className="bg-bg-section border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt
                  className="text-5xl leading-none text-gold"
                  style={{ fontFamily: 'var(--font-hero)' }}
                >
                  {s.value}
                </dt>
                <dd className="text-sm text-text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ DESTINATIONS ═════════════════════════════════
          Layout ref: centered heading + 4-col photo cards
          with overlay label at bottom (like the reference)
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Centered heading */}
          <div className="text-center mb-14">
            <EyebrowLabel>Destinasi Pilihan</EyebrowLabel>
            <SerifHeading className="text-4xl sm:text-5xl lg:text-6xl">
              Jelajahi Puncak Indonesia
            </SerifHeading>
            <p className="mt-4 text-sm text-text-muted max-w-md mx-auto leading-relaxed">
              Kami kurasi gunung-gunung terbaik — dari yang mudah hingga yang hanya untuk jiwa petualang sejati.
            </p>
          </div>

          {/* 4-col photo cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {destinations.map((d) => (
              <Link
                key={d.name}
                href="/coming-soon"
                className="group relative h-72 rounded-2xl overflow-hidden flex flex-col justify-end"
                style={{ background: d.gradient }}
              >
                {/* Subtle mountain silhouette lines — decorative SVG */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <polygon points="0,200 80,60 130,120 160,80 200,200" fill="currentColor" className="text-forest" />
                  <polygon points="0,200 40,100 90,160 130,90 200,200" fill="currentColor" className="text-white" opacity="0.06" />
                </svg>

                {/* Hover shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(47,93,80,0.25) 0%, transparent 60%)' }}
                />

                {/* Bottom overlay */}
                <div className="relative z-10 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}>
                  {/* Tag */}
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2 ${tagBadge[d.tag]}`}>
                    {d.tag}
                  </span>

                  {/* Name */}
                  <p
                    className="text-lg text-white leading-tight group-hover:text-gold transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                  >
                    {d.name}
                  </p>

                  {/* Location + elevation */}
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {d.location}
                    </span>
                    <span>{d.elevation}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View all */}
          <div className="mt-10 text-center">
            <Link
              href="/coming-soon"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Lihat semua destinasi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ════════════════════════════════
          Layout ref: centered title, 3-col icons + text
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Centered heading */}
          <div className="text-center mb-16">
            <EyebrowLabel>Kenapa Kami</EyebrowLabel>
            <SerifHeading className="text-4xl sm:text-5xl">
              Alasan Memilih Zona Puncak
            </SerifHeading>
          </div>

          {/* 3 columns */}
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col items-center text-center gap-5">
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center shrink-0">
                  <r.icon className="w-7 h-7 text-white" />
                </div>

                {/* Gold underline */}
                <div className="w-8 h-px bg-gold" />

                {/* Text */}
                <div>
                  <p
                    className="text-base font-semibold text-white mb-2 uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {r.title}
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPLIT FEATURE ════════════════════════════════
          Layout ref: 2 stacked photos left | text + CTA right
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-bg-base overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — 2 stacked image cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* Tall card */}
              <div
                className="col-span-1 row-span-2 rounded-2xl min-h-[320px] lg:min-h-[420px]"
                style={{ background: 'linear-gradient(170deg, #1a3a2f 0%, #0a1a14 100%)' }}
              >
                <svg className="w-full h-full opacity-[0.12]" viewBox="0 0 100 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <polygon points="0,300 45,80 70,180 90,120 100,300" fill="white" />
                </svg>
              </div>
              {/* Two shorter cards stacked */}
              <div
                className="rounded-2xl min-h-[150px] lg:min-h-[200px]"
                style={{ background: 'linear-gradient(150deg, #111a0d 0%, #060a05 100%)' }}
              >
                <svg className="w-full h-full opacity-[0.12]" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <polygon points="0,150 55,30 100,150" fill="white" />
                </svg>
              </div>
              <div
                className="rounded-2xl min-h-[150px] lg:min-h-[200px]"
                style={{ background: 'linear-gradient(150deg, #1a2535 0%, #080e18 100%)' }}
              >
                <svg className="w-full h-full opacity-[0.12]" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <polygon points="0,150 40,50 70,100 100,150" fill="white" />
                </svg>
              </div>
            </div>

            {/* Right — copy */}
            <div className="flex flex-col gap-6">
              <EyebrowLabel>Filosofi Kami</EyebrowLabel>

              <SerifHeading className="text-4xl sm:text-5xl lg:text-[3.25rem]">
                Setiap Puncak<br />
                <em>Punya Ceritanya</em>
              </SerifHeading>

              <p className="text-text-secondary text-base leading-relaxed max-w-sm">
                Bagi kami mendaki bukan sekadar olahraga — ini tentang bertemu dirimu sendiri di ketinggian. Kami hadir memastikan perjalanan itu aman, bermakna, dan tak terlupakan.
              </p>

              <p className="text-text-muted text-sm leading-relaxed max-w-sm">
                Setiap trip dirancang bersama guide berpengalaman, jadwal logistik terstruktur, dan komunitas pendaki yang solid.
              </p>

              <div>
                <Link
                  href="/coming-soon"
                  className="inline-flex items-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95"
                >
                  Gabung Trip Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPLORE SECTION ══════════════════════════════
          Layout ref: full-width dark section, text left,
          image/map collage right
      ══════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #071410 0%, #0B1D1A 50%, #0d1a16 100%)' }}
      >
        {/* Background texture lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <polygon points="600,0 900,500 300,500" fill="white" />
          <polygon points="900,0 1200,500 600,500" fill="white" opacity="0.5" />
        </svg>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left — text */}
            <div className="flex flex-col gap-6">
              <EyebrowLabel>Mulai Petualangan</EyebrowLabel>

              <SerifHeading className="text-4xl sm:text-5xl lg:text-6xl">
                Jelajahi Alam<br />
                <em>Bersama Kami</em>
              </SerifHeading>

              <p className="text-text-secondary text-base leading-relaxed max-w-sm">
                Dari Jawa hingga Lombok — ribuan kilometer jalur gunung menanti. Bergabunglah dan jadilah bagian dari komunitas pendaki Indonesia.
              </p>

              <div className="flex flex-col gap-3 max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <p className="text-sm text-text-muted">Perencanaan perjalanan profesional dari A sampai Z</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <p className="text-sm text-text-muted">Guide lokal berpengalaman di setiap gunung</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <p className="text-sm text-text-muted">Komunitas alumni pendaki yang aktif dan suportif</p>
                </div>
              </div>

              <Link
                href="/coming-soon"
                className="self-start inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 font-medium text-sm px-6 py-3 rounded-full transition-all duration-200"
              >
                Lihat Jadwal Trip
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — image collage grid */}
            <div className="grid grid-cols-3 grid-rows-3 gap-2.5 h-[380px] lg:h-[460px]">
              {/* Large top-left */}
              <div
                className="col-span-2 row-span-2 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #2F5D50 0%, #1a3a2f 40%, #0d1f1a 100%)' }}
              />
              {/* Top-right */}
              <div
                className="col-span-1 row-span-1 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #1e2a1a 0%, #0d160a 100%)' }}
              />
              {/* Mid-right */}
              <div
                className="col-span-1 row-span-1 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #1a2535 0%, #0a1320 100%)' }}
              />
              {/* Bottom row × 3 */}
              <div
                className="col-span-1 row-span-1 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #252018 0%, #12100b 100%)' }}
              />
              <div
                className="col-span-1 row-span-1 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #1a3a2f 0%, #0d1f1a 100%)' }}
              />
              <div
                className="col-span-1 row-span-1 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #1e1a30 0%, #0d0b18 100%)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <EyebrowLabel>Kata Mereka</EyebrowLabel>
            <SerifHeading className="text-4xl sm:text-5xl">
              Suara Alumni Pendaki
            </SerifHeading>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-7 rounded-2xl border border-border bg-bg-card flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.star }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-lg leading-snug flex-1 text-white/80 italic"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs mt-0.5 text-gold">{t.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BOTTOM ════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32"
        style={{
          background: 'linear-gradient(135deg, var(--color-forest) 0%, #0d1a14 55%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <EyebrowLabel>Siap Mendaki?</EyebrowLabel>
            <SerifHeading className="text-5xl sm:text-6xl lg:text-7xl">
              Raih Puncak<br />
              <em>Impianmu</em>
            </SerifHeading>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/coming-soon"
              className="inline-flex items-center justify-center gap-2 bg-white text-bg-section hover:bg-gold font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95"
            >
              Gabung Trip
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/coming-soon"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95"
            >
              Lihat Jadwal
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
