'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* ── Slideshow config ────────────────────────────────
   SLIDE_INTERVAL : durasi tiap slide sebelum fade ke berikutnya
   FADE_DURATION  : durasi crossfade opacity CSS transition
   ZOOM_DURATION  : durasi animasi zoom-out sinematik
   Rumus          : zoom harus > interval agar masih bergerak
                    saat crossfade mulai → kesan seamless
── */
const SLIDES = [
  '/hero-1.webp',
  '/hero-2.webp',
  '/hero-3.webp',
  '/hero4.webp',
  '/hero-5.webp',
  '/hero-6.webp',
]
const SLIDE_INTERVAL = 7000   // 7 s per slide
const FADE_DURATION  = 1600   // 1.6 s crossfade
const ZOOM_DURATION  = 9000   // 9 s zoom-out (runs past transition → smooth)

const TRUST_AVATARS = [
  { initials: 'R', bg: '#3D6B5E' },
  { initials: 'A', bg: '#2A4A6B' },
  { initials: 'D', bg: '#6B4A2A' },
]

interface HeroProps {
  title?: string
  description?: string
  cta?: { label: string; href: string }
}

export default function Hero({
  title = 'Jelajahi Puncak\nEkstrem Indonesia',
  description = 'Dipandu guide bersertifikat, diorganisir secara profesional demi meraih puncak impianmu dengan aman dan berkesan.',
  cta = { label: 'Gabung Trip', href: '/trip' },
}: HeroProps) {
  const [current, setCurrent] = useState(0)
  const zoomRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Restart zoom animation on the active slide without remounting Image */
  useEffect(() => {
    const el = zoomRefs.current[current]
    if (!el) return
    el.style.animation = 'none'
    void el.offsetHeight                                      // force reflow
    el.style.animation = `hero-zoom-out ${ZOOM_DURATION}ms ease-out forwards`
  }, [current])

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % SLIDES.length),
      SLIDE_INTERVAL,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section className="bg-bg-base flex flex-col sm:block sm:relative sm:h-screen sm:min-h-[640px] sm:overflow-hidden">

      {/* ── SLIDESHOW ─────────────────────────────────────── */}
      <div className="relative w-full aspect-video shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:w-full sm:h-full">

        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              zIndex: i === current ? 1 : 0,
            }}
          >
            {/* Zoom wrapper — animation restarted via ref on slide change */}
            <div
              ref={(el) => { zoomRefs.current[i] = el }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`Pemandangan gunung Indonesia — slide ${i + 1}`}
                fill
                priority={i === 0}
                quality={90}
                draggable={false}
                className="object-cover object-center select-none"
                style={{ WebkitUserDrag: 'none' } as React.CSSProperties}
                sizes="100vw"
              />
            </div>
          </div>
        ))}

        {/* Anti-download shield — blocks right-click & drag on entire image area */}
        <div
          className="absolute inset-0 pointer-events-auto select-none"
          style={{ zIndex: 9 }}
          onContextMenu={(e) => e.preventDefault()}
          aria-hidden
        />

        {/* 10% blur layer — subtle cinematic softness over the images */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 9, backdropFilter: 'blur(0.8px)' }}
          aria-hidden
        />

        {/* Gradient overlays — desktop */}
        <div
          className="hidden sm:block absolute inset-0 pointer-events-none"
          style={{
            zIndex: 10,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.00) 50%, rgba(0,0,0,0.55) 100%)',
          }}
          aria-hidden
        />
        <div
          className="hidden sm:block absolute inset-0 pointer-events-none"
          style={{
            zIndex: 10,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.00) 80%)',
          }}
          aria-hidden
        />

        {/* Mobile: fade bottom ke bg-base */}
        <div
          className="sm:hidden absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
          style={{ zIndex: 10, background: 'linear-gradient(to top, #0B0B0B, transparent)' }}
          aria-hidden
        />
      </div>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <div className="relative sm:absolute sm:inset-0 sm:flex sm:items-end" style={{ zIndex: 20 }}>
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12 py-8 sm:pb-24">
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
              <p className="text-sm leading-snug text-text-secondary">
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

            {/* Description — Cormorant Garamond italic for elegant contrast */}
            <p
              className="text-lg xs:text-xl leading-relaxed max-w-[480px] text-text-secondary italic"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
            >
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

      {/* ── SLIDE INDICATORS ─── bottom-right, desktop only ── */}
      <div
        className="hidden sm:flex absolute bottom-8 right-10 lg:right-14 items-center gap-2"
        style={{ zIndex: 20 }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Tampilkan slide ${i + 1}`}
            style={{
              height: '5px',
              borderRadius: '3px',
              backgroundColor:
                i === current ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.28)',
              transition: `width ${FADE_DURATION}ms ease, background-color ${FADE_DURATION}ms ease`,
              width: i === current ? '28px' : '6px',
            }}
          />
        ))}
      </div>

      {/* Bottom vignette blend — desktop only */}
      <div
        className="hidden sm:block absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ zIndex: 15, background: 'linear-gradient(to top, #0B0B0B 0%, transparent 100%)' }}
        aria-hidden
      />

    </section>
  )
}
