'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { useSectionParallax } from '@/hooks/useParallax'

type ParallaxFloatProps = {
  children: React.ReactNode
  intensity?: number
  className?: string
}

/**
 * Membungkus konten (biasanya Image fill) dengan geser vertikal halus mengikuti posisi di viewport.
 */
export default function ParallaxFloat({ children, intensity = 0.08, className }: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { y, reduced } = useSectionParallax(ref, intensity)

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)}>
      <div
        className={clsx(
          'absolute inset-0',
          reduced ? 'h-full top-0' : 'sm:h-[114%] sm:-top-[7%] h-full',
          !reduced && 'will-change-transform',
        )}
        style={reduced ? undefined : { transform: `translate3d(0, ${y}px, 0)` }}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  )
}
