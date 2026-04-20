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
  { icon: Shield,  title: 'Terpercaya',     body: '150+ pendaki. Selamat sampai puncak.' },
  { icon: Compass, title: 'Rute Terkurasi', body: 'Aman, teruji, sesuai levelmu.' },
  { icon: Users,   title: 'Satu Partner',   body: 'Dari persiapan hingga turun gunung.' },
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
  { name: 'Rizky P.',  trip: 'Gunung Raung',  star: 5, text: 'Guide pro banget. Summit berasa nggak ngeri sama sekali.' },
  { name: 'Sari D.',   trip: 'Gunung Rinjani', star: 5, text: 'Semua diurus rapi. Tinggal nikmati pemandangannya.' },
  { name: 'Andi F.',   trip: 'Gunung Semeru',  star: 5, text: 'Sunrise dari Mahameru bareng tim ZP — tak terlupakan.' },
]

/* ─── Helpers ────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
      {children}
    </p>
  )
}

function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`leading-[1.1] text-white ${className}`}
      style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
    >
      {children}
    </h2>
  )
}

/**
 * Radial green glow — sama persis style dari Coming Soon page.
 * cx/cy = posisi pusat glow dalam persen (misalnya "20% 80%").
 * intensity = opacity multiplier (default 1 = 0.14)
 */
function Glow({
  cx = '50%',
  cy = '100%',
  rx = '80%',
  ry = '60%',
  intensity = 1,
}: {
  cx?: string
  cy?: string
  rx?: string
  ry?: string
  intensity?: number
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse ${rx} ${ry} at ${cx} ${cy}, rgba(47,93,80,${(0.14 * intensity).toFixed(2)}) 0%, transparent 70%)`,
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

      {/* ══ STATS ════════════════════════════════════════
          Glow: bottom-center, seperti Coming Soon.
          Border tipis memisahkan dari hero tanpa harsh cut.
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0d1a14' }}>
        {/* Separator line top */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(47,93,80,0.4), transparent)' }} aria-hidden />
        <Glow cx="50%" cy="120%" rx="100%" ry="80%" intensity={1.2} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt
                  className="text-5xl lg:text-6xl leading-none text-gold"
                  style={{ fontFamily: 'var(--font-hero)' }}
                >
                  {s.value}
                </dt>
                <dd className="text-sm text-text-muted mt-1">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Fade ke base */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0B0B0B)' }}
        />
      </section>

      {/* ══ DESTINATIONS ══════════════════════════════════
          Glow: top-left, menyebar ke kanan — memberi kesan
          pencahayaan dramatis dari pojok.
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bg-base pt-20 pb-24 lg:pt-28 lg:pb-32">
        <Glow cx="0%" cy="0%" rx="90%" ry="70%" intensity={0.9} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <Label>Destinasi Pilihan</Label>
            <H2 className="text-4xl sm:text-5xl lg:text-6xl">Jelajahi Puncak Indonesia</H2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {destinations.map((d) => (
              <Link
                key={d.name}
                href="/coming-soon"
                className="group relative h-72 rounded-2xl overflow-hidden flex flex-col justify-end"
              >
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }}
                />
                <div className="relative z-10 p-5">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2 ${tagBadge[d.tag]}`}>
                    {d.tag}
                  </span>
                  <p
                    className="text-lg text-white leading-tight transition-colors duration-200 group-hover:text-gold"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                  >
                    {d.name}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-white/55">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{d.location}</span>
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
              Lihat semua destinasi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ════════════════════════════════
          Glow: bottom-center mirip Coming Soon — hangat
          dari bawah naik ke atas.
      ════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32"
        style={{ backgroundColor: '#0d1a14' }}
      >
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(47,93,80,0.3), transparent)' }}
        />
        <Glow cx="50%" cy="100%" rx="80%" ry="60%" intensity={1.4} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <Label>Kenapa Kami</Label>
            <H2 className="text-4xl sm:text-5xl">Alasan Memilih Zona Puncak</H2>
          </div>

          <div className="grid sm:grid-cols-3 gap-10 lg:gap-16">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col items-center text-center gap-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'radial-gradient(circle, rgba(47,93,80,0.5) 0%, rgba(47,93,80,0.2) 100%)', border: '1px solid rgba(47,93,80,0.5)' }}
                >
                  <r.icon className="w-7 h-7 text-white" />
                </div>
                <div className="w-8 h-px bg-gold opacity-60" />
                <div>
                  <p className="text-base font-semibold text-white mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
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
          Glow: kanan-bawah — cahaya dari balik foto.
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bg-base pt-20 pb-24 lg:pt-28 lg:pb-32">
        <Glow cx="100%" cy="80%" rx="70%" ry="60%" intensity={1.0} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left image grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden min-h-[320px] lg:min-h-[420px]" style={{ border: '1px solid rgba(47,93,80,0.25)' }}>
                <Image src={splitImgs.tall} alt="Pemandangan gunung" fill sizes="25vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,18,12,0.6) 0%, transparent 50%)' }} />
              </div>
              <div className="relative rounded-2xl overflow-hidden min-h-[150px] lg:min-h-[200px]" style={{ border: '1px solid rgba(47,93,80,0.2)' }}>
                <Image src={splitImgs.shortA} alt="Pendakian gunung" fill sizes="15vw" className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden min-h-[150px] lg:min-h-[200px]" style={{ border: '1px solid rgba(47,93,80,0.2)' }}>
                <Image src={splitImgs.shortB} alt="Alam pegunungan" fill sizes="15vw" className="object-cover" />
              </div>
            </div>

            {/* Right copy */}
            <div className="flex flex-col gap-6">
              <Label>Filosofi Kami</Label>
              <H2 className="text-4xl sm:text-5xl lg:text-[3.25rem]">
                Setiap Puncak<br /><em>Punya Ceritanya</em>
              </H2>
              <p className="text-text-secondary text-base leading-relaxed max-w-sm">
                Mendaki adalah tentang bertemu dirimu sendiri di ketinggian.
              </p>
              <div>
                <Link
                  href="/coming-soon"
                  className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95"
                  style={{ background: 'rgba(47,93,80,0.85)', color: '#fff', border: '1px solid rgba(47,93,80,0.6)' }}
                >
                  Gabung Trip Sekarang <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPLORE ══════════════════════════════════════
          Glow: center paling kuat — ini section paling
          "forest" di halaman, seperti di dalam hutan.
      ════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32"
        style={{ backgroundColor: '#07120F' }}
      >
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(47,93,80,0.5), transparent)' }}
        />
        {/* Strong center glow */}
        <Glow cx="50%" cy="50%" rx="100%" ry="80%" intensity={1.8} />
        {/* Secondary edge glows */}
        <Glow cx="0%"   cy="100%" rx="60%" ry="50%" intensity={0.7} />
        <Glow cx="100%" cy="0%"   rx="50%" ry="40%" intensity={0.5} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left text */}
            <div className="flex flex-col gap-6">
              <Label>Mulai Petualangan</Label>
              <H2 className="text-4xl sm:text-5xl lg:text-6xl">
                Jelajahi Alam<br /><em>Bersama Kami</em>
              </H2>
              <p className="text-text-secondary text-base leading-relaxed max-w-sm">
                Dari Jawa hingga Lombok — jalur terbaik menanti.
              </p>
              <div className="flex flex-col gap-3 max-w-xs">
                {[
                  'Persiapan A–Z oleh tim profesional',
                  'Guide lokal berpengalaman',
                  'Komunitas alumni yang solid',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0 opacity-80" />
                    <p className="text-sm text-text-muted">{item}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/coming-soon"
                className="self-start inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full transition-all duration-200"
                style={{ border: '1px solid rgba(214,167,95,0.35)', color: 'rgba(214,167,95,0.9)' }}
              >
                Lihat Jadwal Trip <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right collage */}
            <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[380px] lg:h-[460px]">
              <div className="relative col-span-2 row-span-2 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(47,93,80,0.3)' }}>
                <Image src={collageImgs[0]} alt="Alam pegunungan" fill sizes="25vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,18,12,0.4) 0%, transparent 60%)' }} />
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ border: '1px solid rgba(47,93,80,0.2)' }}>
                <Image src={collageImgs[1]} alt="Pemandangan gunung" fill sizes="10vw" className="object-cover" />
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ border: '1px solid rgba(47,93,80,0.2)' }}>
                <Image src={collageImgs[2]} alt="Pendakian" fill sizes="10vw" className="object-cover" />
              </div>
              {collageImgs.slice(2, 5).map((src, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden" style={{ border: '1px solid rgba(47,93,80,0.15)' }}>
                  <Image src={src} alt="Gunung Indonesia" fill sizes="10vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0B0B0B)' }}
        />
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════
          Glow: top-right — cahaya sisa dari Explore.
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bg-base pt-20 pb-24 lg:pt-28 lg:pb-32">
        <Glow cx="100%" cy="0%" rx="70%" ry="55%" intensity={0.8} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <Label>Kata Mereka</Label>
            <H2 className="text-4xl sm:text-5xl">Suara Alumni Pendaki</H2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-7 rounded-2xl flex flex-col gap-4"
                style={{
                  background: 'rgba(13,26,20,0.6)',
                  border: '1px solid rgba(47,93,80,0.25)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.star }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p
                  className="text-xl leading-snug flex-1 text-white/75 italic"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(47,93,80,0.25)' }}>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs mt-0.5 text-gold opacity-80">{t.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════
          Glow terkuat di halaman — double ellipse dari
          bawah + kiri, mirip aurora/sunrise.
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#050e0a' }}>
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(47,93,80,0.6), transparent)' }}
        />
        {/* Primary glow — bottom-center */}
        <Glow cx="50%" cy="100%" rx="90%" ry="70%" intensity={2.0} />
        {/* Secondary — top-left */}
        <Glow cx="0%"  cy="30%"  rx="60%" ry="50%" intensity={1.0} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 py-28 lg:py-36 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <div>
            <Label>Siap Mendaki?</Label>
            <H2 className="text-5xl sm:text-6xl lg:text-7xl">
              Raih Puncak<br /><em>Impianmu</em>
            </H2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/coming-soon"
              className="inline-flex items-center justify-center gap-2 bg-white text-bg-base font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 hover:bg-gold"
            >
              Gabung Trip <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/coming-soon"
              className="inline-flex items-center justify-center gap-2 font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
            >
              Lihat Jadwal
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
