import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  Compass,
  MapPin,
  Mountain,
  Quote,
  Star,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Zona Puncak Indonesia',
  description: 'Profil Zona Puncak Indonesia: misi, cara kerja operasional, pengalaman trip, dan cerita dari para pendaki.',
  alternates: { canonical: '/tentang' },
}

const CORE_REASONS = [
  { title: 'Operasional Rapi', desc: 'Rundown, estimasi waktu, dan pembagian peran disiapkan sebelum hari keberangkatan.' },
  { title: 'Batch Kecil', desc: 'Kami membatasi kuota agar ritme tim terjaga dan pendampingan tetap optimal.' },
  { title: 'Guide Berpengalaman', desc: 'Tim guide terbiasa menangani jalur teknis dan pengambilan keputusan lapangan.' },
  { title: 'Dokumentasi Layak Simpan', desc: 'Setiap trip dipotret dengan standar visual yang rapi dan konsisten.' },
]

const POPULAR_TRIPS = [
  {
    title: 'Gunung Raung via Kalibaru',
    desc: 'Trip untuk pendaki berpengalaman dengan fokus summit kaldera dan manajemen ritme pendakian yang disiplin.',
    image: '/hero-5.webp',
    href: '/jadwal/raung',
  },
  {
    title: 'Argopuro Lintas Baderan–Bremi',
    desc: 'Perjalanan lintas jalur panjang yang menekankan endurance, kerja tim, dan ketahanan logistik.',
    image: '/hero-2.webp',
    href: '/jadwal/argopuro',
  },
]

const OPERATION_FLOW = [
  {
    step: '01',
    title: 'Screening Peserta',
    desc: 'Memastikan kesiapan fisik, pengalaman dasar, dan pemahaman risiko jalur.',
    image: '/hero-3.webp',
  },
  {
    step: '02',
    title: 'Briefing & Final Check',
    desc: 'Finalisasi alat, role tim, dan simulasi keputusan saat kondisi cuaca berubah.',
    image: '/hero4.webp',
  },
  {
    step: '03',
    title: 'Eksekusi di Lapangan',
    desc: 'Pendakian berjalan dengan interval monitoring, evaluasi ritme, dan kontrol energi tim.',
    image: '/hero-1.webp',
  },
]

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero cinematic */}
      <section className="relative h-[72vh] min-h-[560px] overflow-hidden border-b border-border">
        <Image
          src="/hero-6.webp"
          alt="Panorama lembah pegunungan Indonesia"
          fill
          priority
          quality={92}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.45) 0%, rgba(11,11,11,0.72) 60%, rgba(11,11,11,0.92) 100%)' }}
        />
        <div className="absolute inset-0 max-w-[1200px] mx-auto px-6 lg:px-12 pt-28 pb-10 flex flex-col justify-between">
          <div className="text-center mt-2">
            <p className="text-[11px] uppercase tracking-[0.34em] text-text-secondary mb-3">Travel Vibe</p>
            <h1 className="text-[clamp(2.8rem,7vw,5.6rem)] uppercase text-white leading-none" style={{ fontFamily: 'var(--font-hero)' }}>
              Zona Puncak
            </h1>
            <p className="text-xs text-text-muted mt-2">Open Trip Gunung Indonesia</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Mountain, label: 'Rute Aktif', value: '12 Jalur' },
              { icon: Users, label: 'Pendaki Join', value: '150+' },
              { icon: Camera, label: 'Trip Terarsip', value: '40+ Batch' },
            ].map((item) => (
              <div key={item.label} className="bg-bg-primary/60 backdrop-blur-sm border border-border rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </div>
                <p className="text-sm font-semibold text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + purpose strip */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg-card border border-border rounded-2xl p-6 lg:p-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">01 Mission & Direction</p>
              <h2 className="text-xl uppercase text-text-primary mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Membangun Trip yang Aman dan Punya Rasa
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Kami fokus pada pendakian yang tertata: persiapan jelas, komunikasi terbuka, dan eksekusi lapangan yang disiplin.
                Trip kami tidak mengejar ramai, tetapi kualitas pengalaman tim.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">02 Vision</p>
              <h2 className="text-xl uppercase text-text-primary mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Standar Open Trip yang Lebih Serius
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Kami ingin peserta merasa: sejak briefing sampai pulang, semuanya terurus dengan baik.
                Summit adalah bonus; keselamatan dan ritme tim tetap prioritas utama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature visual strip */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
          <div className="relative rounded-2xl overflow-hidden border border-border h-[360px]">
            <Image src="/hero-1.webp" alt="Visual pendakian Zona Puncak" fill className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,11,0.82) 0%, rgba(11,11,11,0.1) 70%)' }} />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/20 bg-black/40 text-white/80 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/20 bg-black/40 text-white/80 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
                “Yang kami bangun bukan cuma perjalanan ke puncak, tapi pengalaman tim yang terasa terarah dari langkah pertama.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted mb-2">What Makes Us Different</p>
              <h2 className="text-4xl uppercase text-gold mb-6 leading-none" style={{ fontFamily: 'var(--font-hero)' }}>
                4 Alasan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CORE_REASONS.map((item) => (
                  <article key={item.title} className="bg-bg-card border border-border rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="relative min-h-[340px] hidden lg:block">
              <div className="absolute inset-0 rounded-full border border-border/70" />
              <div className="absolute inset-[12%] rounded-full border border-border/50" />
              <div className="absolute inset-[26%] rounded-full border border-border/40" />
              <div className="absolute top-10 left-8 w-36 h-36 rounded-full overflow-hidden border border-border">
                <Image src="/hero-2.webp" alt="Orbit visual 1" fill className="object-cover" sizes="200px" />
              </div>
              <div className="absolute bottom-12 right-8 w-24 h-24 rounded-full overflow-hidden border border-border">
                <Image src="/hero4.webp" alt="Orbit visual 2" fill className="object-cover" sizes="130px" />
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full overflow-hidden border border-border">
                <Image src="/hero-3.webp" alt="Orbit visual 3" fill className="object-cover" sizes="80px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular trips */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <p className="text-xs uppercase tracking-widest text-text-muted mb-2">Popular Trips</p>
          <h2 className="text-2xl uppercase text-text-primary mb-7" style={{ fontFamily: 'var(--font-heading)' }}>
            Perjalanan Favorit
          </h2>
          <div className="space-y-5">
            {POPULAR_TRIPS.map((trip) => (
              <article key={trip.title} className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
                  <div className="relative h-[220px] md:h-full">
                    <Image src={trip.image} alt={trip.title} fill className="object-cover object-center" sizes="260px" />
                  </div>
                  <div className="p-5 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{trip.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{trip.desc}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                        <Mountain className="w-3.5 h-3.5" />
                        Open Trip
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                        <CalendarDays className="w-3.5 h-3.5" />
                        Batch berjalan
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                        <MapPin className="w-3.5 h-3.5" />
                        Jawa Timur
                      </span>
                      <Link
                        href={trip.href}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-white transition-colors"
                      >
                        Lihat Jadwal
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Operation timeline */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <p className="text-xs uppercase tracking-widest text-text-muted mb-2">Operational Story</p>
          <h2 className="text-2xl uppercase text-text-primary mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            Bagaimana Trip Dibentuk
          </h2>

          <div className="relative">
            <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {OPERATION_FLOW.map((item, idx) => {
                const isRight = idx % 2 === 1
                return (
                  <article key={item.step} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center relative">
                    <div className={isRight ? 'md:order-2' : ''}>
                      <div className="bg-bg-card border border-border rounded-2xl p-5">
                        <p className="text-[11px] font-semibold text-gold mb-1">Step {item.step}</p>
                        <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                        <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className={isRight ? 'md:order-1' : ''}>
                      <div className="relative h-[190px] rounded-2xl overflow-hidden border border-border">
                        <Image src={item.image} alt={item.title} fill className="object-cover object-center" sizes="500px" />
                      </div>
                    </div>
                    <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gold border-2 border-bg-base" />
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial spotlight */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <div className="relative rounded-3xl overflow-hidden border border-border min-h-[280px]">
            <Image src="/hero-1.webp" alt="Testimoni pendaki" fill className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.5) 55%, rgba(11,11,11,0.2) 100%)' }} />
            <div className="relative z-10 px-6 py-8 sm:p-10 max-w-[760px]">
              <p className="text-xs uppercase tracking-widest text-gold mb-3">Ulasan Pendaki</p>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-4">
                “Yang saya suka dari Zona Puncak adalah cara timnya membaca kondisi jalur. Mereka tidak memaksa tempo,
                tapi tetap menjaga target. Jadi kita merasa aman tanpa kehilangan semangat petualangan.”
              </p>
              <div className="text-sm text-text-primary font-semibold">— Sari Dewi, Peserta Argopuro</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog-like section */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <p className="text-xs uppercase tracking-widest text-text-muted mb-2">Insight</p>
          <h2 className="text-2xl uppercase text-text-primary mb-7" style={{ fontFamily: 'var(--font-heading)' }}>
            Catatan dari Jalur
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'Checklist Persiapan 7 Hari Sebelum Naik',
                image: '/hero-2.webp',
                excerpt: 'Langkah praktis agar fisik, mental, dan perlengkapanmu siap sebelum keberangkatan.',
              },
              {
                title: 'Manajemen Ritme Tim Saat Jalur Panjang',
                image: '/hero-6.webp',
                excerpt: 'Cara membagi energi, jeda, dan komunikasi agar seluruh tim tetap stabil hingga finish.',
              },
            ].map((post) => (
              <article key={post.title} className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                <div className="relative h-52">
                  <Image src={post.image} alt={post.title} fill className="object-cover object-center" sizes="600px" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-text-primary mb-2">{post.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <Image src="/hero-5.webp" alt="Call to action Zona Puncak" fill className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-bg-primary/78 backdrop-blur-[2px]" />

            <div className="relative z-10 p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-end">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold mb-2">Call to Adventure</p>
                <h2 className="text-2xl sm:text-3xl uppercase text-text-primary leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Siap Mulai Perjalananmu?
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                  Pilih trip yang paling sesuai dengan levelmu, cek jadwal terdekat, lalu amankan slot sebelum batch penuh.
                </p>
              </div>

              <div className="bg-bg-card/90 border border-border rounded-2xl p-4 flex flex-col gap-3">
                <p className="text-xs font-semibold text-text-primary">Mulai dari sini</p>
                <div className="text-xs text-text-muted border border-border rounded-lg px-3 py-2">Pilih destinasi</div>
                <div className="text-xs text-text-muted border border-border rounded-lg px-3 py-2">Pilih bulan keberangkatan</div>
                <Link
                  href="/trip"
                  className="inline-flex items-center justify-center gap-2 bg-white text-bg-section font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200"
                >
                  Lihat Trip Aktif
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
