import Link from 'next/link'
import { Mountain, BookOpen } from 'lucide-react'

const adminNav = [
  { href: '/admin/trips', label: 'Kelola Trip', icon: Mountain },
  { href: '/admin/bookings', label: 'Kelola Booking', icon: BookOpen },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-bg-base">

      {/* Top bar — mobile & tablet (<1024px) */}
      <header className="lg:hidden bg-bg-card border-b border-border px-4 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-text-primary mr-auto">
          <Mountain className="w-5 h-5 text-forest" />
          <span className="text-sm">Admin Panel</span>
        </Link>
        <nav className="flex items-center gap-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors duration-200"
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Sidebar — laptop & desktop (≥1024px) */}
      <aside className="hidden lg:flex w-56 bg-bg-card border-r border-border flex-col py-6 shrink-0">
        <Link href="/" className="flex items-center gap-2 px-5 mb-8 font-bold text-text-primary">
          <Mountain className="w-5 h-5 text-forest" />
          <span className="text-sm">Admin Panel</span>
        </Link>
        <nav className="flex-1">
          <ul className="space-y-1 px-3">
            {adminNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
    </div>
  )
}
