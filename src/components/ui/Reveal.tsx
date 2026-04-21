'use client'

/**
 * Reveal — scroll-triggered entrance animation
 *
 * Membungkus children dalam <div> yang fade/slide masuk saat memasuki viewport.
 * Semua transisi dimatikan jika prefers-reduced-motion: reduce.
 */

import { type ReactNode, useEffect, useRef, useState, startTransition } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useParallax'

interface RevealProps {
  children: ReactNode
  /** Tailwind atau CSS classes yang diaplikasikan ke wrapper div */
  className?: string
  /** Delay sebelum animasi dimulai (ms) — untuk stagger antar item */
  delay?: number
  /** Durasi transisi (ms) */
  duration?: number
  /** Arah masuk elemen */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  /** Jarak geser awal (px) */
  distance?: number
  /** Ambang batas IntersectionObserver (0–1) */
  threshold?: number
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 700,
  direction = 'up',
  distance = 28,
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    let cancelled = false

    /* Langsung tampil jika reduced-motion aktif */
    if (reduced) {
      startTransition(() => {
        if (!cancelled) setVisible(true)
      })
      return () => {
        cancelled = true
      }
    }
    const el = ref.current
    if (!el) return () => { cancelled = true }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cancelled) return
        /*
         * Beberapa browser memanggil callback IO sinkron saat observe().
         * Tunda setState agar tidak bentrok dengan siklus commit React (console: "hasn't mounted yet").
         */
        observer.unobserve(el)
        requestAnimationFrame(() => {
          if (cancelled) return
          startTransition(() => setVisible(true))
        })
      },
      { threshold },
    )
    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [reduced, threshold])

  const translateFrom =
    direction === 'up'    ? `translateY(${distance}px)`  :
    direction === 'down'  ? `translateY(-${distance}px)` :
    direction === 'left'  ? `translateX(-${distance}px)` :
    direction === 'right' ? `translateX(${distance}px)`  :
    'none'

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduced
          ? undefined
          : {
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'none' : translateFrom,
              transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
              willChange: visible ? 'auto' : 'opacity, transform',
            }
      }
    >
      {children}
    </div>
  )
}
