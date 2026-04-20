import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Mountain, Clock, Users, ArrowRight, CalendarDays } from 'lucide-react'
import { clsx } from 'clsx'
import { getAllTrips } from '@/lib/tripData'
import type { Difficulty } from '@/types'

export const metadata: Metadata = {
  title: 'Jadwal Trip — Zona Puncak Indonesia',
  description: 'Lihat jadwal open trip pendakian gunung terpercaya di Indonesia bersama Zona Puncak.',
}

const DIFFICULTY_CFG: Record<Difficulty, { label: string; color: string }> = {
  easy:     { label: 'Easy',     color: 'bg-success/15 text-success' },
  moderate: { label: 'Moderate', color: 'bg-warning/15 text-warning' },
  hard:     { label: 'Hard',     color: 'bg-gold/15 text-gold' },
  extreme:  { label: 'Extreme',  color: 'bg-error/15 text-error' },
}

const STATUS_CFG = {
  open:        { label: 'Buka',         color: 'bg-success/15 text-success' },
  almost_full: { label: 'Hampir Penuh', color: 'bg-warning/15 text-warning' },
  full:        { label: 'Penuh',        color: 'bg-error/15 text-error' },
  closed:      { label: 'Ditutup',      color: 'bg-white/10 text-text-muted' },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function JadwalPage() {
  const trips = getAllTrips()

  /* Kumpulkan semua batch, urutkan terdekat */
  const allBatches = trips
    .flatMap((t) => t.batches.map((b) => ({ ...b, trip: t })))
    .sort((a, b) => a.start_date.localeCompare(b.start_date))

  return (
    <div className="min-h-screen bg-bg-base">

      {/* ── Header ────────────────────────────── */}
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-10">
          <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
            <CalendarDays className="w-4 h-4" />
            <span>Jadwal Trip</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl uppercase text-text-primary leading-none mb-3"
            style={{ fontFamily: 'var(--font-hero)' }}
          >
            Semua Jadwal
          </h1>
          <p className="text-text-muted text-base max-w-lg">
            Open trip pendakian gunung terpercaya. Pilih jadwal sesuai waktu dan kemampuanmu.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* ── Sidebar: Trip cards ─────────────── */}
          <div className="flex flex-col gap-4">
            <p className="text-xs text-text-muted uppercase tracking-widest px-0.5">Gunung Tersedia</p>
            {trips.map((trip) => {
              const diff = DIFFICULTY_CFG[trip.difficulty]
              const openCount = trip.batches.filter(b => b.status === 'open' || b.status === 'almost_full').length
              return (
                <Link
                  key={trip.slug}
                  href={`/jadwal/${trip.slug}`}
                  className="group relative bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-white/25 transition-all duration-200"
                >
                  <div className="relative h-32">
                    <Image
                      src={trip.cover}
                      alt={trip.name}
                      fill
                      quality={80}
                      draggable={false}
                      className="object-cover object-center select-none group-hover:scale-105 transition-transform duration-500"
                      sizes="320px"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,11,0.85) 0%, transparent 60%)' }} />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <span className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                        {trip.name}
                      </span>
                      <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full', diff.color)}>
                        {diff.label}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Mountain className="w-3 h-3" />
                        {trip.elevation.toLocaleString()} mdpl
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trip.duration_days}h
                      </span>
                    </div>
                    <span className="text-xs font-medium text-forest">
                      {openCount > 0 ? `${openCount} batch buka` : 'Lihat jadwal'}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* ── Main: Batch list timeline ───────── */}
          <div className="flex flex-col gap-6">
            <p className="text-xs text-text-muted uppercase tracking-widest px-0.5">
              {allBatches.length} Jadwal Tersedia
            </p>

            <div className="flex flex-col gap-4">
              {allBatches.map(({ trip, ...batch }) => {
                const diff = DIFFICULTY_CFG[trip.difficulty]
                const st = STATUS_CFG[batch.status]
                const sisa = batch.quota - batch.filled
                const pct = Math.round((batch.filled / batch.quota) * 100)
                const isBookable = batch.status === 'open' || batch.status === 'almost_full'

                return (
                  <div
                    key={batch.id}
                    className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row">

                      {/* Cover thumbnail */}
                      <div className="relative sm:w-44 h-36 sm:h-auto shrink-0">
                        <Image
                          src={trip.cover}
                          alt={trip.name}
                          fill
                          quality={75}
                          draggable={false}
                          className="object-cover select-none"
                          sizes="176px"
                        />
                        <div className="absolute inset-0 sm:hidden" style={{ background: 'linear-gradient(to top, rgba(26,26,26,1) 0%, transparent 50%)' }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                        <div>
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full', st.color)}>
                              {st.label}
                            </span>
                            <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full', diff.color)}>
                              {diff.label}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-bold text-text-primary mb-1">
                            {trip.name} — {batch.label}
                          </h3>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" />
                              {formatDate(batch.start_date)} – {formatDate(batch.end_date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {trip.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {trip.duration_days} hari
                            </span>
                          </div>
                        </div>

                        {/* Kuota + harga + CTA */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-col gap-1 min-w-[140px]">
                            <div className="flex items-center justify-between text-xs text-text-muted">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {batch.filled}/{batch.quota} peserta
                              </span>
                              <span>{sisa > 0 ? `${sisa} slot` : 'Penuh'}</span>
                            </div>
                            <div className="h-1.5 bg-bg-section rounded-full overflow-hidden w-36">
                              <div
                                className={clsx(
                                  'h-full rounded-full',
                                  pct >= 100 ? 'bg-error' : pct >= 70 ? 'bg-warning' : 'bg-forest',
                                )}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-base font-bold text-text-primary">{formatPrice(batch.price)}</p>
                              <p className="text-[10px] text-text-muted">/orang</p>
                            </div>
                            <Link
                              href={`/jadwal/${trip.slug}`}
                              className={clsx(
                                'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200',
                                isBookable
                                  ? 'bg-white text-bg-section hover:bg-forest hover:text-white'
                                  : 'bg-bg-section border border-border text-text-muted cursor-not-allowed',
                              )}
                            >
                              {isBookable ? 'Lihat Detail' : 'Ditutup'}
                              {isBookable && <ArrowRight className="w-3 h-3" />}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
