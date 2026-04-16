import Link from 'next/link'
import { Mountain, BookOpen } from 'lucide-react'

const adminNav = [
  { href: '/admin/trips', label: 'Kelola Trip', icon: Mountain },
  { href: '/admin/bookings', label: 'Kelola Booking', icon: BookOpen },
]


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-stone-100">
      {/* Sidebar */}
      <aside className="w-56 bg-stone-900 text-stone-300 flex flex-col py-6">
        <Link href="/" className="flex items-center gap-2 px-5 mb-8 font-bold text-white">
          <Mountain className="w-5 h-5 text-emerald-400" />
          <span className="text-sm">Admin Panel</span>
        </Link>
        <nav className="flex-1">
          <ul className="space-y-1 px-3">
            {adminNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-colors"
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
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
