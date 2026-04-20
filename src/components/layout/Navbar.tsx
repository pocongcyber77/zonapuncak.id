'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { Menu, X, ChevronDown, Map, BookOpen, Info, Navigation, Award } from 'lucide-react'

/* ── Nav link groups ─────────────────────────────── */
const leftLinks = [
  { href: '/tentang', label: 'Tentang' },
  { href: '/jadwal', label: 'Jadwal' },
]

const downloadItems = [
  { href: '/download/peta-pendakian', label: 'Peta Pendakian', icon: Map, desc: 'Peta jalur & topografi gunung' },
  { href: '/download/modul-materi', label: 'Modul Materi', icon: BookOpen, desc: 'Panduan teknik pendakian' },
  { href: '/download/informasi', label: 'Informasi', icon: Info, desc: 'Info perizinan & regulasi' },
  { href: '/download/gpx', label: 'GPX', icon: Navigation, desc: 'File rute untuk GPS & aplikasi' },
  { href: '/download/sertifikat-pendakian', label: 'Sertifikat Pendakian', icon: Award, desc: 'Unduh sertifikat resmi pendakianmu' },
]

const rightLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/trip', label: 'Trip' },
]

const allLinks = [
  ...leftLinks,
  { href: '/community', label: 'Komunitas', isHighlight: true },
  ...rightLinks,
]

/* ── Social icons ────────────────────────────────── */
const SocialIcons = () => (
  <div className="flex items-center gap-3.5">
    <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors duration-200">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    </a>
    <a href="#" aria-label="TikTok" className="text-white/50 hover:text-white transition-colors duration-200">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.01 2.96-.02 4.44-.9-.15-1.89-.09-2.69.43-.97.63-1.52 1.79-1.42 2.98.09 1.28 1.13 2.42 2.39 2.71.87.19 1.79.1 2.59-.29 1.01-.53 1.65-1.64 1.67-2.77.01-4.91-.01-9.83.02-14.74z"/>
      </svg>
    </a>
    <a href="#" aria-label="X" className="text-white/50 hover:text-white transition-colors duration-200">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
    <a href="#" aria-label="Facebook" className="text-white/50 hover:text-white transition-colors duration-200">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>
  </div>
)

/* ── Download dropdown ───────────────────────────── */
function DownloadDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  const isActive = pathname.startsWith('/download')

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className={clsx(
          'flex items-center gap-1 px-3 py-1.5 text-sm tracking-wide rounded-md transition-colors duration-200',
          isActive ? 'text-white' : 'text-white/55 hover:text-white'
        )}
      >
        Download
        <ChevronDown
          className={clsx('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={clsx(
          'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56',
          'bg-bg-card/95 backdrop-blur-md border border-border rounded-xl overflow-hidden shadow-2xl',
          'transition-all duration-200 origin-top',
          open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
        )}
      >
        {/* Top accent line */}
        <div className="h-px bg-linear-to-r from-transparent via-forest to-transparent" />

        <ul className="py-2">
          {downloadItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150 group"
              >
                <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-forest/30 transition-colors duration-150">
                  <item.icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors duration-150" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/85 group-hover:text-white transition-colors duration-150 leading-none mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-white/35 group-hover:text-white/55 transition-colors duration-150 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const isSolid = !transparent || scrolled || menuOpen

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isSolid
          ? 'bg-bg-base/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-16 sm:h-20 gap-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Zona Puncak Indonesia"
              width={140}
              height={40}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop center nav ── */}
          <ul className="hidden lg:flex items-center gap-1">
            {/* Left links */}
            {leftLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    'px-3 py-1.5 text-sm tracking-wide rounded-md transition-colors duration-200',
                    pathname === link.href ? 'text-white' : 'text-white/55 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Komunitas — highlight button di tengah */}
            <li className="mx-1">
              <Link
                href="/community"
                className={clsx(
                  'px-4 py-1.5 text-sm font-semibold rounded-full border transition-all duration-200',
                  pathname === '/community'
                    ? 'bg-forest border-forest text-white'
                    : 'border-white/25 text-white/80 hover:border-white/50 hover:text-white hover:bg-white/5'
                )}
              >
                Komunitas
              </Link>
            </li>

            {/* Download dropdown */}
            <DownloadDropdown pathname={pathname} />

            {/* Right links */}
            {rightLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    'px-3 py-1.5 text-sm tracking-wide rounded-md transition-colors duration-200',
                    pathname === link.href ? 'text-white' : 'text-white/55 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop right: social + auth ── */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <SocialIcons />
            <div className="w-px h-4 bg-white/15" />
            <Link
              href="/login"
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 px-1"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-white text-bg-section px-4 py-2 rounded-full hover:bg-forest hover:text-white transition-all duration-200"
            >
              Daftar
            </Link>
          </div>

          {/* ── Mobile: auth + hamburger ── */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/register"
              className="text-xs font-semibold bg-white text-bg-section px-3.5 py-1.5 rounded-full hover:bg-forest hover:text-white transition-all duration-200"
            >
              Daftar
            </Link>
            <button
              className="p-1.5 text-white/80 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div className="lg:hidden pb-5 border-t border-white/10 pt-3 flex flex-col">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'block px-2 py-2.5 text-sm transition-colors',
                  'isHighlight' in link && link.isHighlight
                    ? 'text-white font-semibold'
                    : 'text-white/65 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Download submenu — selalu expand di mobile */}
            <div className="px-2 pt-1 pb-2">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1.5 px-0.5">Download</p>
              <div className="flex flex-col gap-0.5">
                {downloadItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-2.5 text-sm text-white/55 hover:text-white transition-colors"
            >
              Masuk
            </Link>
            <div className="pt-3 pb-1 px-2">
              <SocialIcons />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
