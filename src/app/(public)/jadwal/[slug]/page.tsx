'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, use } from 'react'
import { ArrowLeft, MapPin, Mountain, Users, Clock, ArrowRight, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { clsx } from 'clsx'
import TripCalendar from '@/components/ui/TripCalendar'
import { getTripBySlug } from '@/lib/tripData'
import type { Difficulty } from '@/types'

/* ── Helpers ─────────────────────────────────────── */
const DIFFICULTY_CFG: Record<Difficulty, { label: string; color: string }> = {
  easy:     { label: 'Easy',        color: 'bg-success/15 text-success' },
  moderate: { label: 'Moderate',    color: 'bg-warning/15 text-warning' },
  hard:     { label: 'Hard',        color: 'bg-gold/15 text-gold' },
  extreme:  { label: 'Extreme',     color: 'bg-error/15 text-error' },
}

const STATUS_CFG = {
  open:        { label: 'Pendaftaran Buka',    color: 'bg-success/15 text-success' },
  almost_full: { label: 'Hampir Penuh',        color: 'bg-warning/15 text-warning' },
  full:        { label: 'Penuh',               color: 'bg-error/15 text-error' },
  closed:      { label: 'Ditutup',             color: 'bg-white/10 text-text-muted' },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* ── Page ────────────────────────────────────────── */
export default function JadwalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const trip = getTripBySlug(slug)
  if (!trip) notFound()

  const [selectedBatchId, setSelectedBatchId] = useState(trip.batches[0]?.id ?? '')
  const [showReqs, setShowReqs] = useState(false)

  const selectedBatch = trip.batches.find((b) => b.id === selectedBatchId) ?? trip.batches[0]
  const diff = DIFFICULTY_CFG[trip.difficulty]
  const statusCfg = STATUS_CFG[selectedBatch?.status ?? 'open']

  return (
    <div className="min-h-screen bg-bg-base">

      {/* ── Hero ─────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <Image
          src={trip.cover}
          alt={trip.name}
          fill
          priority
          quality={90}
          draggable={false}
          className="object-cover object-center select-none"
          style={{ WebkitUserDrag: 'none' } as React.CSSProperties}
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,11,0.95) 0%, rgba(11,11,11,0.4) 50%, rgba(0,0,0,0.2) 100%)' }} />

        {/* Back */}
        <div className="absolute top-6 left-0 right-0 max-w-[1200px] mx-auto px-6 lg:px-12">
          <Link
            href="/jadwal"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Semua Jadwal
          </Link>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1200px] mx-auto px-6 lg:px-12 pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full', diff.color)}>
              {diff.label}
            </span>
            <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full', statusCfg.color)}>
              {statusCfg.label}
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl uppercase text-white leading-none mb-2"
            style={{ fontFamily: 'var(--font-hero)' }}
          >
            {trip.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {trip.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5" />
              {trip.elevation.toLocaleString('id-ID')} mdpl
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {trip.duration_days} hari
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* ── Kiri: Kalender + jadwal ─────────── */}
          <div className="flex flex-col gap-8">

            {/* Section heading */}
            <div>
              <h2
                className="text-2xl uppercase text-text-primary mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Jadwal Kegiatan
              </h2>
              <p className="text-sm text-text-muted">
                Pilih tanggal di kalender untuk melihat agenda harian trip.
              </p>
            </div>

            <TripCalendar
              batches={trip.batches}
              selectedBatchId={selectedBatchId}
              onSelectBatch={setSelectedBatchId}
            />

            {/* Include / Exclude */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Sudah Termasuk</h3>
                <ul className="flex flex-col gap-2">
                  {trip.include.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Tidak Termasuk</h3>
                <ul className="flex flex-col gap-2">
                  {trip.exclude.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                      <XCircle className="w-4 h-4 text-error mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Syarat — collapsible */}
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-text-primary hover:bg-white/5 transition-colors duration-150"
                onClick={() => setShowReqs((v) => !v)}
              >
                <span>Persyaratan Peserta</span>
                {showReqs
                  ? <ChevronUp className="w-4 h-4 text-text-muted" />
                  : <ChevronDown className="w-4 h-4 text-text-muted" />
                }
              </button>
              {showReqs && (
                <div className="px-5 pb-5 border-t border-border">
                  <ul className="flex flex-col gap-2 pt-4">
                    {trip.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ── Kanan: Sticky summary card ──────── */}
          <div className="flex flex-col gap-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-4">

              {/* Batch cards */}
              {trip.batches.map((batch) => {
                const st = STATUS_CFG[batch.status]
                const isSelected = batch.id === selectedBatchId
                const sisa = batch.quota - batch.filled
                const pct = Math.round((batch.filled / batch.quota) * 100)
                return (
                  <button
                    key={batch.id}
                    onClick={() => setSelectedBatchId(batch.id)}
                    className={clsx(
                      'w-full text-left bg-bg-card border rounded-2xl p-5 transition-all duration-200',
                      isSelected ? 'border-forest ring-1 ring-forest/40' : 'border-border hover:border-white/20',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-sm font-semibold text-text-primary">{batch.label}</span>
                      <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0', st.color)}>
                        {st.label}
                      </span>
                    </div>

                    {/* Tanggal */}
                    <div className="text-xs text-text-muted mb-3">
                      {formatDate(batch.start_date)} — {formatDate(batch.end_date)}
                    </div>

                    {/* Kuota bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-text-muted mb-1">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {batch.filled}/{batch.quota} peserta
                        </span>
                        <span>{sisa > 0 ? `${sisa} slot tersisa` : 'Penuh'}</span>
                      </div>
                      <div className="h-1.5 bg-bg-section rounded-full overflow-hidden">
                        <div
                          className={clsx(
                            'h-full rounded-full transition-all duration-500',
                            pct >= 100 ? 'bg-error' : pct >= 70 ? 'bg-warning' : 'bg-forest',
                          )}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Harga */}
                    <div className="text-base font-bold text-text-primary">
                      {formatPrice(batch.price)}
                      <span className="text-xs font-normal text-text-muted"> /orang</span>
                    </div>
                  </button>
                )
              })}

              {/* CTA */}
              {selectedBatch && selectedBatch.status !== 'full' && selectedBatch.status !== 'closed' ? (
                <Link
                  href="/coming-soon"
                  className="flex items-center justify-center gap-2 w-full bg-white text-bg-section font-semibold py-3.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200 active:scale-95"
                >
                  Daftar {selectedBatch.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex items-center justify-center w-full bg-bg-section border border-border text-text-muted font-semibold py-3.5 rounded-full text-sm cursor-not-allowed">
                  Pendaftaran Ditutup
                </div>
              )}

              {/* Meeting point */}
              <div className="bg-bg-card border border-border rounded-2xl p-4 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-forest mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-text-muted mb-0.5">Meeting Point</p>
                  <p className="text-sm text-text-primary font-medium">{trip.meeting_point}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
