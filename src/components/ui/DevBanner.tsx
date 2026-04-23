'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle, Wrench } from 'lucide-react'
import { SOCIAL_URLS } from '@/components/layout/SocialLinks'

const WA_URL = 'https://wa.me/6281338391634'
const STORAGE_KEY = 'zp-dev-banner-dismissed'

export default function DevBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-6 z-40 pointer-events-none"
    >
      <div
        className="pointer-events-auto w-[300px] rounded-2xl overflow-hidden transition-all duration-500 ease-out"
        style={{
          background: 'rgba(20,20,20,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.55)',
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        {/* Top accent line */}
        <div
          aria-hidden
          className="h-px"
          style={{ background: 'linear-gradient(to right, transparent, #2F5D50 40%, #D6A75F 60%, transparent)' }}
        />

        <div className="p-4">

          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(47,93,80,0.25)' }}
              >
                <Wrench className="w-3.5 h-3.5 text-forest-text" />
              </div>
              <div>
                <p
                  className="text-xs font-semibold text-text-primary leading-none"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  DALAM PENGEMBANGAN
                </p>
                <p className="text-[10px] text-gold mt-1 leading-none">Alpha · zonapuncak.id</p>
              </div>
            </div>

            {/* Close button — min 44×44px touch target */}
            <button
              onClick={dismiss}
              aria-label="Tutup notifikasi"
              className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-200 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <p className="text-xs text-text-secondary leading-[1.6] mb-4">
            Website ini masih aktif dikembangkan. Beberapa fitur belum tersedia.
            Sementara itu, pantau info trip terbaru di IG atau hubungi kami langsung.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2">
            <a
              href={SOCIAL_URLS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', color: '#fff' }}
            >
              {/* Instagram icon — lucide tidak punya, pakai SVG inline */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @zonapuncak
            </a>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366', border: '1px solid rgba(37,211,102,0.25)' }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Hubungi via WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
