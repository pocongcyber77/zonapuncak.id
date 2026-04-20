import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Compass, Users, Star, MapPin, TrendingUp } from 'lucide-react'
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

const mountains = [
  { name: 'Gunung Raung',   location: 'Jawa Timur', elevation: 3344, tag: 'Ekstrem' },
  { name: 'Gunung Semeru',  location: 'Jawa Timur', elevation: 3676, tag: 'Hard' },
  { name: 'Gunung Rinjani', location: 'Lombok NTB', elevation: 3726, tag: 'Hard' },
  { name: 'Gunung Prau',    location: 'Jawa Tengah', elevation: 2565, tag: 'Easy' },
]

const tagColor: Record<string, string> = {
  Ekstrem: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  Hard:    'text-red-400   border-red-400/30    bg-red-400/10',
  Medium:  'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  Easy:    'text-green-400 border-green-400/30  bg-green-400/10',
}

const reasons = [
  { icon: Shield,  title: 'Safety First',   body: 'Guide bersertifikat, P3K lengkap, koordinasi BASARNAS.' },
  { icon: Compass, title: 'Rute Terkurasi',  body: 'Jalur terpilih, aman, tetap menantang sesuai level.' },
  { icon: Users,   title: 'Komunitas Solid', body: 'Ribuan alumni pendaki yang saling support.' },
]

const testimonials = [
  { name: 'Rizky P.',   trip: 'Gunung Raung',   star: 5, text: 'Guide pro banget. Summit berasa nggak ngeri sama sekali.' },
  { name: 'Sari D.',    trip: 'Gunung Rinjani',  star: 5, text: 'Semua diurus rapi. Tinggal nikmati pemandangannya.' },
  { name: 'Andi F.',    trip: 'Gunung Semeru',   star: 5, text: 'Sunrise dari Mahameru bareng tim ZP — tak terlupakan.' },
]

/* ─── Component helpers ──────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
      style={{ color: 'var(--color-gold)' }}
    >
      {children}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-4xl sm:text-5xl uppercase leading-none text-white"
      style={{ fontFamily: 'var(--font-hero)' }}
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

      {/* ── HERO ───────────────────────────────────────── */}
      <Hero />

      {/* ── STATS ──────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--color-bg-section)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt
                  className="text-5xl leading-none"
                  style={{ fontFamily: 'var(--font-hero)', color: 'var(--color-gold)' }}
                >
                  {s.value}
                </dt>
                <dd className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── MOUNTAINS ──────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--color-bg-base)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <SectionLabel>Destinasi</SectionLabel>
            <SectionHeading>Trip Populer</SectionHeading>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mountains.map((m) => (
              <Link
                key={m.name}
                href="/coming-soon"
                className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              >
                {/* Placeholder image area */}
                <div
                  className="h-44 w-full"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-forest) 0%, var(--color-bg-section) 100%)',
                  }}
                />

                <div className="p-5 flex flex-col gap-3">
                  {/* Tag */}
                  <span
                    className={`self-start text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagColor[m.tag]}`}
                  >
                    {m.tag}
                  </span>

                  {/* Name */}
                  <p
                    className="text-xl uppercase leading-tight text-white group-hover:text-gold transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                  >
                    {m.name}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {m.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {m.elevation.toLocaleString('id-ID')} mdpl
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/coming-soon"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Lihat semua trip
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--color-bg-section)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <SectionLabel>Kenapa Kami</SectionLabel>
              <SectionHeading>
                Bukan Sekadar<br />
                Trip Organizer
              </SectionHeading>
              <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
                Kami percaya setiap pendakian adalah cerita. Tugas kami memastikan ceritamu berjalan aman dan berkesan.
              </p>
            <Link
              href="/coming-soon"
              className="mt-8 inline-flex items-center gap-2 bg-white text-bg-section hover:bg-forest hover:text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 active:scale-95"
            >
              Tentang Kami
              <ArrowRight className="w-4 h-4" />
            </Link>
            </div>

            {/* Right cards */}
            <div className="flex flex-col gap-4">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  className="flex items-start gap-5 p-6 rounded-2xl border transition-all duration-200 hover:border-forest"
                  style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-forest)', opacity: i === 0 ? 1 : 0.7 }}
                  >
                    <r.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-base text-white mb-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {r.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {r.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--color-bg-base)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <SectionLabel>Kata Mereka</SectionLabel>
            <SectionHeading>Alumni Pendaki</SectionHeading>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-7 rounded-2xl border flex flex-col gap-4"
                style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.star }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-gold)' }}>{t.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ─────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{
          background: 'linear-gradient(135deg, var(--color-forest) 0%, var(--color-bg-section) 60%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <SectionLabel>Siap Mendaki?</SectionLabel>
            <h2
              className="text-5xl sm:text-6xl uppercase leading-none text-white"
              style={{ fontFamily: 'var(--font-hero)' }}
            >
              Raih Puncak<br />
              Impianmu
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/coming-soon"
              className="inline-flex items-center justify-center gap-2 bg-white text-bg-section hover:bg-gold hover:text-bg-section font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95"
            >
              Gabung Trip
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/coming-soon"
              className="inline-flex items-center justify-center gap-2 border text-white font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Lihat Jadwal
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
