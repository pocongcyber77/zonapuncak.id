'use client'

import clsx from 'clsx'
import { useHeroBackgroundParallax } from '@/hooks/useParallax'

type ParallaxHeroBackdropProps = {
  children: React.ReactNode
  maxScroll?: number
  factor?: number
}

/**
 * Lapisan gambar hero penuh dengan parallax vertikal halus + ruang ekstra agar tidak bocor.
 */
export default function ParallaxHeroBackdrop({
  children,
  maxScroll = 520,
  factor = 0.24,
}: ParallaxHeroBackdropProps) {
  const { y, reduced } = useHeroBackgroundParallax(maxScroll, factor)

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={clsx(
          'absolute inset-0 w-full',
          reduced ? 'h-full top-0' : 'h-[120%] -top-[10%]',
          !reduced && 'will-change-transform',
        )}
        style={reduced ? undefined : { transform: `translate3d(0, ${y}px, 0)` }}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  )
}
