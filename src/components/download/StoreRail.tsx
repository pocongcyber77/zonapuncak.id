'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface StoreRailProps {
  title: string
  children: React.ReactNode
}

export default function StoreRail({ title, children }: StoreRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByDir(direction: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-heading text-[32px] leading-[1.4] text-text-primary">{title}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            aria-label={`Geser ${title} ke kiri`}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-bg-card text-text-primary transition-colors duration-200 hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            aria-label={`Geser ${title} ke kanan`}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-bg-card text-text-primary transition-colors duration-200 hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex items-stretch gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </section>
  )
}
