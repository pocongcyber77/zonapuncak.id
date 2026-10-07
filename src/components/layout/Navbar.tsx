'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { Menu, X, ChevronDown, Map, BookOpen, Info, Navigation, Award, Mountain, CalendarDays, Smartphone } from 'lucide-react'
import SocialLinks from '@/components/layout/SocialLinks'

/* ── Nav link groups ─────────────────────────────── */
const leftLinks = [
  { href: '/tentang', label: 'Tentang' },
]

const jadwalItems = [
  {
    href: '/jadwal/raung',
    label: 'Gunung Raung',
    icon: Mountain,
    desc: '3.344 mdpl · Via Kalibaru · Grade V',
  },
  {
    href: '/jadwal/argopuro',
    label: 'Gunung Argopuro',
    icon: Mountain,
    desc: '3.088 mdpl · Lintas Baderan - Bremi · Grade IV',
  },
  {
    href: '/jadwal',
    label: 'Lihat Semua Jadwal',
    icon: CalendarDays,
    desc: 'Cek seluruh trip yang tersedia',
  },
]

const downloadItems = [
  { href: '/download/app', label: 'App', icon: Smartphone, desc: 'Zona Peta untuk Android' },
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

/* ── Jadwal dropdown ─────────────────────────────── */
function JadwalDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  const isActive = pathname.startsWith('/jadwal')

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={clsx(
          'flex items-center gap-1 px-3 py-2 text-sm tracking-wide rounded-md transition-colors duration-200',
          isActive ? 'text-white' : 'text-white/55 hover:text-white'
        )}
      >
        Jadwal
        <ChevronDown
          className={clsx('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={clsx(
          'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60',
          'bg-bg-card/95 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl',
          'transition-all duration-200 origin-top',
          open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
        )}
      >
        <div className="h-px bg-linear-to-r from-transparent via-forest to-transparent" />

        <ul className="py-2">
          {jadwalItems.map((item, idx) => (
            <li key={item.href}>
              {idx === jadwalItems.length - 1 && (
                <div className="mx-4 my-1.5" />
              )}
              <Link
                href={item.href}
                className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150 group"
              >
                <div className="mt-0.5 w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-forest/30 transition-colors duration-150">
                  <item.icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors duration-150" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/85 group-hover:text-white transition-colors duration-150 leading-none mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-white/55 group-hover:text-white/75 transition-colors duration-150 leading-normal">
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
          'flex items-center gap-1 px-3 py-2 text-sm tracking-wide rounded-md transition-colors duration-200',
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
          'bg-bg-card/95 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl',
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
                <div className="mt-0.5 w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-forest/30 transition-colors duration-150">
                  <item.icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors duration-150" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/85 group-hover:text-white transition-colors duration-150 leading-none mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-white/55 group-hover:text-white/75 transition-colors duration-150 leading-normal">
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
          ? 'bg-bg-base/95 backdrop-blur-sm'
          : 'bg-transparent'
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
                    'px-3 py-2 text-sm tracking-wide rounded-md transition-colors duration-200',
                    pathname === link.href ? 'text-white' : 'text-white/55 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Jadwal dropdown */}
            <JadwalDropdown pathname={pathname} />

            {/* Komunitas — highlight button di tengah */}
            <li className="mx-1">
              <Link
                href="/community"
                className={clsx(
                  'px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200',
                  pathname === '/community'
                    ? 'bg-forest text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
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
                    'px-3 py-2 text-sm tracking-wide rounded-md transition-colors duration-200',
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
            <SocialLinks />
            <div className="w-px h-4 bg-transparent" />
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
              className="text-xs font-semibold bg-white text-bg-section px-4 min-h-[44px] flex items-center rounded-full hover:bg-forest hover:text-white transition-all duration-200"
            >
              Daftar
            </Link>
            <button
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div className="lg:hidden pb-5 pt-3 flex flex-col">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'block px-2 py-3 text-sm transition-colors',
                  'isHighlight' in link && link.isHighlight
                    ? 'text-white font-semibold'
                    : 'text-white/65 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Jadwal submenu — selalu expand di mobile */}
            <div className="px-2 pt-1 pb-2">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1.5 px-0.5">Jadwal Trip</p>
              <div className="flex flex-col gap-0.5">
                {jadwalItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Download submenu — selalu expand di mobile */}
            <div className="px-2 pt-1 pb-2">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1.5 px-0.5">Download</p>
              <div className="flex flex-col gap-0.5">
                {downloadItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
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
              <SocialLinks />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
