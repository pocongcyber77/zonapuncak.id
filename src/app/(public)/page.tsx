import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Compass, Users, Star, MapPin } from 'lucide-react'
import Hero from '@/components/ui/Hero'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `${SITE_NAME} — Open Trip Gunung Terpercaya`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
}

/* ─── Design constants ───────────────────────────── */
const BASE  = '#0B0B0B'
const SEC   = '#111111'
const DARK  = '#07120F'

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
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=75&auto=format&fit=crop',
  },
  {
    name: 'Gunung Semeru',
    location: 'Jawa Timur',
    elevation: '3.676 mdpl',
    tag: 'Hard',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75&auto=format&fit=crop',
  },
  {
    name: 'Gunung Rinjani',
    location: 'Lombok, NTB',
    elevation: '3.726 mdpl',
    tag: 'Hard',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75&auto=format&fit=crop',
  },
  {
    name: 'Gunung Prau',
    location: 'Jawa Tengah',
    elevation: '2.565 mdpl',
    tag: 'Easy',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75&auto=format&fit=crop',
  },
]

const tagBadge: Record<string, string> = {
  Ekstrem: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Hard:    'bg-red-500/20 text-red-300 border-red-500/30',
  Medium:  'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Easy:    'bg-green-500/20 text-green-300 border-green-500/30',
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
    title: 'Satu Partner',
    body: 'Dari persiapan hingga turun gunung — kami ada di setiap langkahmu.',
  },
]

const splitImgs = {
  tall:   'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&q=75&auto=format&fit=crop',
  shortA: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=75&auto=format&fit=crop',
  shortB: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=400&q=75&auto=format&fit=crop',
}

const collageImgs = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=300&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=300&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=300&q=70&auto=format&fit=crop',
]

const testimonials = [
  { name: 'Rizky P.',  trip: 'Gunung Raung',   star: 5, text: 'Guide pro banget. Summit berasa nggak ngeri sama sekali.' },
  { name: 'Sari D.',   trip: 'Gunung Rinjani',  star: 5, text: 'Semua diurus rapi. Tinggal nikmati pemandangannya.' },
  { name: 'Andi F.',   trip: 'Gunung Semeru',   star: 5, text: 'Sunrise dari Mahameru bareng tim ZP — tak terlupakan.' },
]

/* ─── Shared helpers ─────────────────────────────── */

/** Eyebrow label — gold, tracked uppercase */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
      {children}
    </p>
  )
}

/** Section heading — Cormorant Garamond regular (not bold) */
function H2({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`leading-[1.1] text-white ${className}`}
      style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
    >
      {children}
    </h2>
  )
}

/** Gradient divider — blends two adjacent section colours */
function Fade({ from, to, h = 80 }: { from: string; to: string; h?: number }) {
  return (
    <div
      aria-hidden
      style={{
        height: h,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
        marginTop: -1,   // prevent 1-px gap on some screens
        marginBottom: -1,
      }}
    />
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

      {/* Hero → Stats fade (base → section) */}
      <Fade from={BASE} to={SEC} h={64} />

      {/* ══ STATS STRIP ══════════════════════════════════ */}
      <section style={{ backgroundColor: SEC }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
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

      {/* Stats → Destinations fade (section → base) */}
      <Fade from={SEC} to={BASE} h={80} />

      {/* ══ DESTINATIONS ══════════════════════════════════ */}
      <section style={{ backgroundColor: BASE }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">

          {/* Centered heading */}
          <div className="text-center mb-14">
            <Label>Destinasi Pilihan</Label>
            <H2 className="text-4xl sm:text-5xl lg:text-6xl">
              Jelajahi Puncak Indonesia
            </H2>
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
              >
                {/* Photo */}
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.30) 50%, transparent 100%)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-5">
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2 ${tagBadge[d.tag]}`}
                  >
                    {d.tag}
                  </span>
                  <p
                    className="text-lg text-white leading-tight transition-colors duration-200 group-hover:text-gold"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                  >
                    {d.name}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-white/60">
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

      {/* Destinations → Why Us fade (base → section) */}
      <Fade from={BASE} to={SEC} h={80} />

      {/* ══ WHY CHOOSE US ════════════════════════════════ */}
      <section style={{ backgroundColor: SEC }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">

          <div className="text-center mb-16">
            <Label>Kenapa Kami</Label>
            <H2 className="text-4xl sm:text-5xl">
              Alasan Memilih Zona Puncak
            </H2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-14">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col items-center text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center shrink-0">
                  <r.icon className="w-7 h-7 text-white" />
                </div>
                <div className="w-8 h-px bg-gold" />
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

      {/* Why Us → Split fade (section → base) */}
      <Fade from={SEC} to={BASE} h={80} />

      {/* ══ SPLIT FEATURE ════════════════════════════════ */}
      <section style={{ backgroundColor: BASE }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — 2-col image grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Tall left card */}
              <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden min-h-[320px] lg:min-h-[420px]">
                <Image
                  src={splitImgs.tall}
                  alt="Pemandangan gunung"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              {/* Short top-right */}
              <div className="relative rounded-2xl overflow-hidden min-h-[150px] lg:min-h-[200px]">
                <Image
                  src={splitImgs.shortA}
                  alt="Pendakian gunung"
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </div>
              {/* Short bottom-right */}
              <div className="relative rounded-2xl overflow-hidden min-h-[150px] lg:min-h-[200px]">
                <Image
                  src={splitImgs.shortB}
                  alt="Alam pegunungan"
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right — copy */}
            <div className="flex flex-col gap-6">
              <Label>Filosofi Kami</Label>

              <H2 className="text-4xl sm:text-5xl lg:text-[3.25rem]">
                Setiap Puncak<br />
                <em>Punya Ceritanya</em>
              </H2>

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

      {/* Split → Explore fade (base → deep dark) */}
      <Fade from={BASE} to={DARK} h={96} />

      {/* ══ EXPLORE ══════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left — text */}
            <div className="flex flex-col gap-6">
              <Label>Mulai Petualangan</Label>

              <H2 className="text-4xl sm:text-5xl lg:text-6xl">
                Jelajahi Alam<br />
                <em>Bersama Kami</em>
              </H2>

              <p className="text-text-secondary text-base leading-relaxed max-w-sm">
                Dari Jawa hingga Lombok — ribuan kilometer jalur gunung menanti. Bergabunglah dan jadilah bagian dari komunitas pendaki Indonesia.
              </p>

              <div className="flex flex-col gap-3 max-w-xs">
                {[
                  'Perencanaan perjalanan profesional dari A sampai Z',
                  'Guide lokal berpengalaman di setiap gunung',
                  'Komunitas alumni pendaki yang aktif dan suportif',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <p className="text-sm text-text-muted">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/coming-soon"
                className="self-start inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 font-medium text-sm px-6 py-3 rounded-full transition-all duration-200"
              >
                Lihat Jadwal Trip
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — photo collage */}
            <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[380px] lg:h-[460px]">
              {/* Large top-left (spans 2×2) */}
              <div className="relative col-span-2 row-span-2 rounded-xl overflow-hidden">
                <Image
                  src={collageImgs[0]}
                  alt="Alam pegunungan Indonesia"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              {/* Top-right */}
              <div className="relative col-span-1 row-span-1 rounded-xl overflow-hidden">
                <Image
                  src={collageImgs[1]}
                  alt="Pemandangan gunung"
                  fill
                  sizes="10vw"
                  className="object-cover"
                />
              </div>
              {/* Mid-right */}
              <div className="relative col-span-1 row-span-1 rounded-xl overflow-hidden">
                <Image
                  src={collageImgs[2]}
                  alt="Pendakian"
                  fill
                  sizes="10vw"
                  className="object-cover"
                />
              </div>
              {/* Bottom row × 3 */}
              {collageImgs.slice(2, 5).map((src, i) => (
                <div key={i} className="relative col-span-1 row-span-1 rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt="Gunung Indonesia"
                    fill
                    sizes="10vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore → Testimonials fade (deep dark → base) */}
      <Fade from={DARK} to={BASE} h={80} />

      {/* ══ TESTIMONIALS ═════════════════════════════════ */}
      <section style={{ backgroundColor: BASE }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">

          <div className="text-center mb-14">
            <Label>Kata Mereka</Label>
            <H2 className="text-4xl sm:text-5xl">Suara Alumni Pendaki</H2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-7 rounded-2xl border border-border bg-bg-card flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.star }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p
                  className="text-xl leading-snug flex-1 text-white/80 italic"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs mt-0.5 text-gold">{t.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials → CTA fade (base → forest) */}
      <Fade from={BASE} to="#1a3a2f" h={96} />

      {/* ══ CTA BOTTOM ════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2F5D50 0%, #0d1a14 60%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-24 lg:py-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <Label>Siap Mendaki?</Label>
            <H2 className="text-5xl sm:text-6xl lg:text-7xl">
              Raih Puncak<br />
              <em>Impianmu</em>
            </H2>
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
