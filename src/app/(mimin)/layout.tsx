'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { clsx } from 'clsx'
import {
  LayoutDashboard, Mountain, CalendarDays, ClipboardList,
  FileText, ImageIcon, Download, MessageSquare, Users,
  Menu, X, ChevronRight, LogOut, Shield,
} from 'lucide-react'

/* ── Nav structure ───────────────────────────────── */
const NAV = [
  {
    section: 'Overview',
    items: [
      { href: '/mimin',           label: 'Dashboard',    icon: LayoutDashboard, exact: true },
    ],
  },
  {
    section: 'Trip & Booking',
    items: [
      { href: '/mimin/trips',     label: 'Kelola Trip',  icon: Mountain },
      { href: '/mimin/jadwal',    label: 'Jadwal Batch', icon: CalendarDays },
      { href: '/mimin/bookings',  label: 'Booking',      icon: ClipboardList },
    ],
  },
  {
    section: 'Konten',
    items: [
      { href: '/mimin/posts',     label: 'Artikel / CMS',icon: FileText },
      { href: '/mimin/gallery',   label: 'Gallery',      icon: ImageIcon },
      { href: '/mimin/downloads', label: 'Downloads',    icon: Download },
    ],
  },
  {
    section: 'Komunitas',
    items: [
      { href: '/mimin/community', label: 'Posts',        icon: MessageSquare },
      { href: '/mimin/users',     label: 'Users',        icon: Users },
    ],
  },
]

/* ── Sidebar ─────────────────────────────────────── */
function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col h-full bg-bg-primary border-r border-border w-64">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-border shrink-0">
        <Link href="/mimin" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-7 h-7 rounded-lg bg-forest flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary leading-none">Zona Puncak</p>
            <p className="text-[10px] text-text-muted leading-none mt-0.5">Admin Panel</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-text-muted hover:text-text-primary lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV.map(({ section, items }) => (
          <div key={section} className="mb-5">
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-3 mb-1.5">
              {section}
            </p>
            <ul className="space-y-0.5">
              {items.map(({ href, label, icon: Icon, ...rest }) => {
                const exact = 'exact' in rest ? (rest as { exact?: boolean }).exact : false
                const active = exact ? pathname === href : pathname.startsWith(href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                        active
                          ? 'bg-forest text-white font-medium'
                          : 'text-text-muted hover:text-text-primary hover:bg-white/5',
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{label}</span>
                      {active && <ChevronRight className="w-3 h-3 opacity-60" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1">
          <div className="w-7 h-7 rounded-full bg-forest/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-forest-text">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">Admin</p>
            <p className="text-[10px] text-text-muted truncate">zona puncak</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-text-muted hover:text-error hover:bg-error/10 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          Kembali ke Website
        </Link>
      </div>
    </aside>
  )
}

/* ── Layout ──────────────────────────────────────── */
export default function MiminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-bg-base">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={clsx(
          'lg:hidden fixed inset-y-0 left-0 z-50 transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-bg-card border-b border-border shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-text-muted hover:text-text-primary"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/mimin">
            <Image src="/logo.png" alt="Zona Puncak" width={100} height={30}
              className="h-7 w-auto brightness-0 invert opacity-80" />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
