'use client'

import { type RefObject, useEffect, useState, useSyncExternalStore } from 'react'

function subscribeReducedMotion(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

/** Membaca prefers-reduced-motion tanpa setState di useEffect (hindari race dengan mount). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
}

/**
 * Parallax untuk hero / fold atas: geser mengikuti scrollY (subtil, terbatas).
 */
export function useHeroBackgroundParallax(
  maxScroll = 520,
  factor = 0.26,
): { y: number; reduced: boolean } {
  const [y, setY] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const sy = window.scrollY
        setY(Math.min(sy, maxScroll) * factor)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    const t = requestAnimationFrame(onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(t)
    }
  }, [reduced, maxScroll, factor])

  return { y: reduced ? 0 : y, reduced }
}

/**
 * Parallax berbasis posisi elemen relatif tengah viewport (kedalaman saat scroll).
 */
export function useSectionParallax(
  ref: RefObject<HTMLElement | null>,
  intensity = 0.1,
): { y: number; reduced: boolean } {
  const [y, setY] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    let raf = 0
    const tick = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const mid = r.top + r.height / 2
      setY((vh / 2 - mid) * intensity)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    const t = requestAnimationFrame(onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(t)
    }
  }, [ref, intensity, reduced])

  return { y: reduced ? 0 : y, reduced }
}
