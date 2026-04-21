import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Mountain, Clock, Users, ArrowRight,
  Shield, Camera, Star, ChevronRight,
} from 'lucide-react'
import { clsx } from 'clsx'
import { getAllTrips } from '@/lib/tripData'
import type { Difficulty } from '@/types'

export const metadata: Metadata = {
  title: 'Open Trip Gunung — Zona Puncak Indonesia',
  description: 'Ikuti open trip pendakian gunung terpercaya bersama Zona Puncak. Guide bersertifikat, kuota terbatas, dokumentasi profesional.',
  alternates: { canonical: '/trip' },
}

const DIFF_CFG: Record<Difficulty, { label: string; color: string; bar: string }> = {
  easy:     { label: 'Easy',     color: 'bg-success/15 text-success',  bar: 'bg-success' },
  moderate: { label: 'Moderate', color: 'bg-warning/15 text-warning',  bar: 'bg-warning' },
  hard:     { label: 'Hard',     color: 'bg-gold/15 text-gold',        bar: 'bg-gold' },
  extreme:  { label: 'Extreme',  color: 'bg-error/15 text-error',      bar: 'bg-error' },
}

const DIFF_WIDTH: Record<Difficulty, string> = {
  easy: 'w-1/4', moderate: 'w-2/4', hard: 'w-3/4', extreme: 'w-full',
}

const WHY_US = [
  { icon: Shield,  title: 'Guide Bersertifikat',    desc: 'Semua guide kami tersertifikasi BNSP dan berpengalaman minimal 5 tahun.' },
  { icon: Users,   title: 'Kuota Terbatas',          desc: 'Maksimal 10–12 peserta per trip demi kenyamanan & keamanan optimal.' },
  { icon: Camera,  title: 'Dokumentasi Profesional', desc: 'Setiap momen perjalananmu diabadikan oleh tim foto berpengalaman.' },
  { icon: Star,    title: 'Rating 4.9/5',            desc: 'Dipercaya 150+ pendaki Indonesia dengan ulasan bintang lima.' },
]

const TESTIMONIALS = [
  { name: 'Rizky P.',  trip: 'Raung Mei 2025',   rating: 5, text: 'Pengalaman paling luar biasa dalam hidup saya. Guide sangat profesional dan paham kondisi jalur secara detail.' },
  { name: 'Sari D.',   trip: 'Argopuro Apr 2025', rating: 5, text: 'Perjalanan 7 hari terasa aman dan berkesan. Konsumsi enak, tenda nyaman, dan sertifikat resminya membanggakan!' },
  { name: 'Andi F.',   trip: 'Raung Jan 2026',    rating: 5, text: 'Summit kaldera Raung adalah moment yang tidak akan pernah saya lupakan. Terima kasih Zona Puncak!' },
]

function formatPrice(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

export default function TripPage() {
  const trips = getAllTrips()

  return (
    <div className="min-h-screen bg-bg-base">

      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src="/hero-6.webp"
          alt="Pendakian open trip Zona Puncak Indonesia"
          fill priority quality={92}
          draggable={false}
          className="object-cover object-center select-none"
          style={{ WebkitUserDrag: 'none' } as React.CSSProperties}
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(11,11,11,0.90) 0%, rgba(11,11,11,0.50) 50%, rgba(0,0,0,0.10) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,11,0.70) 0%, transparent 50%)' }} />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12">
            <div className="max-w-[580px] flex flex-col gap-5">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-white/80">Open Trip Tersedia</span>
              </div>

              <h1
                className="text-[clamp(2.8rem,6vw,5rem)] uppercase text-white leading-[0.95] tracking-tight"
                style={{ fontFamily: 'var(--font-hero)' }}
              >
                Raih Puncak
                <br />
                <span className="text-gold">Bersama Kami</span>
              </h1>

              <p className="text-base sm:text-xl text-text-secondary leading-relaxed max-w-[460px]">
                Open trip pendakian gunung dengan guide bersertifikat, kuota terbatas, dan pengalaman yang tak terlupakan.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="#trip-list"
                  className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-6 py-3 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200 active:scale-95"
                >
                  Lihat Semua Trip <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/jadwal"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/20 transition-all duration-200"
                >
                  Cek Jadwal
                </Link>
              </div>

              {/* Trust */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {['R','S','A','M','D'].map((c) => (
                    <div key={c} className="w-7 h-7 rounded-full bg-forest/60 flex items-center justify-center text-[10px] font-bold text-white">
                      {c}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-secondary">
                  <span className="text-white font-semibold">150+</span> pendaki telah bergabung
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── KENAPA ZONA PUNCAK ── */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-forest-text" />
                </div>
                <p className="font-semibold text-text-primary text-sm">{title}</p>
                <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRIP LIST ── */}
      <section id="trip-list" className="scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">

          <div className="mb-10">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Destinasi Kami</p>
            <h2
              className="text-[32px] sm:text-[40px] uppercase text-text-primary leading-[1.4]"
              style={{ fontFamily: 'var(--font-hero)' }}
            >
              Pilih Petualanganmu
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trips.map((trip) => {
              const diff      = DIFF_CFG[trip.difficulty]
              const batches   = trip.batches
              const openCount = batches.filter(b => b.status === 'open' || b.status === 'almost_full').length
              const nextBatch = batches.find(b => b.status === 'open' || b.status === 'almost_full')
              const totalQuota  = batches.reduce((s, b) => s + b.quota, 0)
              const totalFilled = batches.reduce((s, b) => s + b.filled, 0)

              return (
                <article
                  key={trip.slug}
                  className="group bg-bg-card rounded-3xl overflow-hidden transition-all duration-300 hover:bg-bg-section"
                >
                  {/* Cover image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={trip.cover}
                      alt={trip.name}
                      fill quality={85}
                      draggable={false}
                      className="object-cover object-center select-none group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0.3) 50%, transparent 100%)' }} />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={clsx('text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm', diff.color)}>
                        {diff.label}
                      </span>
                      {openCount > 0 && (
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm bg-success/20 text-success">
                          {openCount} Batch Buka
                        </span>
                      )}
                    </div>

                    {/* Elevation chip */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <Mountain className="w-3 h-3 text-white/60" />
                      <span className="text-[10px] font-semibold text-white">{trip.elevation.toLocaleString('id-ID')} mdpl</span>
                    </div>

                    {/* Bottom title */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3
                        className="text-2xl sm:text-[32px] uppercase text-white leading-none"
                        style={{ fontFamily: 'var(--font-hero)' }}
                      >
                        {trip.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col gap-5">

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {trip.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        {trip.duration_days} hari
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        Maks. {trip.quota_total} peserta
                      </span>
                    </div>

                    {/* Difficulty meter */}
                    <div>
                      <div className="flex justify-between text-[10px] text-text-muted mb-2">
                        <span>Tingkat Kesulitan</span>
                        <span className={clsx('font-semibold', diff.color.split(' ')[1])}>{diff.label}</span>
                      </div>
                      <div className="h-1 bg-bg-section rounded-full overflow-hidden">
                        <div className={clsx('h-full rounded-full', diff.bar, DIFF_WIDTH[trip.difficulty])} />
                      </div>
                    </div>

                    {/* Include highlights */}
                    <div className="flex flex-wrap gap-2">
                      {trip.include.slice(0, 3).map((item) => (
                        <span key={item} className="text-[10px] bg-bg-section text-text-muted px-2 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                      {trip.include.length > 3 && (
                        <span className="text-[10px] bg-bg-section text-text-muted px-2 py-1 rounded-full">
                          +{trip.include.length - 3} lainnya
                        </span>
                      )}
                    </div>

                    {/* Batch tersedia */}
                    {nextBatch && (
                      <div className="bg-bg-section rounded px-4 py-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] text-text-muted mb-1">Batch terdekat</p>
                          <p className="text-xs font-semibold text-text-primary">{nextBatch.label}</p>
                          <p className="text-[10px] text-text-muted">
                            {new Date(nextBatch.start_date + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px] text-text-muted mb-1">Mulai dari</p>
                          <p className="text-sm font-bold text-text-primary">{formatPrice(trip.price_from)}</p>
                          <p className="text-[10px] text-text-muted">/orang</p>
                        </div>
                      </div>
                    )}

                    {/* Peserta bar */}
                    <div>
                      <div className="flex justify-between text-[10px] text-text-muted mb-2">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {totalFilled}/{totalQuota} peserta semua batch
                        </span>
                        <span>{totalQuota - totalFilled} slot tersisa</span>
                      </div>
                      <div className="h-1 bg-bg-section rounded-full overflow-hidden">
                        <div
                          className={clsx('h-full rounded-full transition-all', totalFilled / totalQuota >= 0.7 ? 'bg-warning' : 'bg-forest')}
                          style={{ width: `${Math.min((totalFilled / totalQuota) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 pt-1">
                      <Link
                        href={`/jadwal/${trip.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-bg-section font-semibold py-3 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200 active:scale-95"
                      >
                        Daftar Trip
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/jadwal/${trip.slug}`}
                        className="flex items-center justify-center gap-2 bg-bg-section text-text-muted px-4 py-3 rounded-full text-sm hover:text-text-primary transition-all duration-200"
                      >
                        Jadwal
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </article>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">

          <div className="mb-10 text-center">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Kata Mereka</p>
            <h2
              className="text-[32px] uppercase text-text-primary"
              style={{ fontFamily: 'var(--font-hero)' }}
            >
              Cerita Para Pendaki
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-bg-card rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest/20 flex items-center justify-center text-xs font-bold text-forest-text shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary leading-none">{t.name}</p>
                    <p className="text-[11px] text-text-muted mt-1">{t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA BOTTOM BANNER ── */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">
          <div className="relative bg-forest/10 rounded-3xl overflow-hidden px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(47,93,80,0.15) 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <h2
                className="text-2xl sm:text-[32px] uppercase text-text-primary mb-2"
                style={{ fontFamily: 'var(--font-hero)' }}
              >
                Siap Menuju Puncak?
              </h2>
              <p className="text-text-muted text-sm max-w-md">
                Kuota terbatas. Daftar sekarang sebelum batch pilihanmu penuh.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/jadwal"
                className="inline-flex items-center justify-center gap-2 bg-white text-bg-section font-semibold px-7 py-4 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200 active:scale-95"
              >
                Lihat Jadwal <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-7 py-4 rounded-full text-sm hover:bg-white/20 transition-all duration-200"
              >
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
