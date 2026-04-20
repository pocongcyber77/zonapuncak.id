import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Hammer } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Segera Hadir',
  description: 'Halaman ini sedang dalam tahap pengembangan.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen bg-bg-base flex flex-col items-center justify-center overflow-hidden px-6">

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(47,93,80,0.12) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full gap-8">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Zona Puncak Indonesia"
            width={160}
            height={50}
            className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-200"
          />
        </Link>

        {/* Icon badge */}
        <div className="flex items-center gap-2 bg-white/5 border border-border rounded-full px-4 py-2">
          <Hammer className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase text-text-muted">
            Dalam Pengembangan
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-5xl xs:text-6xl uppercase text-text-primary leading-none"
            style={{ fontFamily: 'var(--font-hero)' }}
          >
            Segera
            <br />
            <span className="text-gold">Hadir</span>
          </h1>
          <p className="text-base xs:text-lg leading-relaxed text-text-muted">
            Hei, pendaki! Halaman ini masih kami persiapkan dengan sepenuh hati.
            Kami bekerja keras agar setiap fitur hadir sempurna untukmu.
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-border" />

        {/* Info card */}
        <div className="w-full bg-bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest/15 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-forest" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-secondary mb-0.5">Apa yang sedang dibangun?</p>
              <p className="text-sm leading-relaxed text-text-muted">
                Fitur ini sedang dalam tahap development aktif. Tim kami
                sedang memastikan pengalaman terbaik sebelum dirilis.
              </p>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm">🏔️</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-secondary mb-0.5">Sementara itu...</p>
              <p className="text-sm leading-relaxed text-text-muted">
                Pantau terus perkembangan kami. Zona Puncak Indonesia
                akan segera hadir dengan pengalaman pendakian terbaik.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

      </div>

      {/* Footer note */}
      <p className="absolute bottom-6 text-xs text-border">
        © {new Date().getFullYear()} Zona Puncak Indonesia
      </p>
    </div>
  )
}
