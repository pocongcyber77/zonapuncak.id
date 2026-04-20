import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin — Kelola Booking',
  robots: {
    index: false,
    follow: false,
  },
}

const bookings = [
  { id: '1', user: 'rizky_p', trip: 'Open Trip Gunung Semeru', date: '10 Mei 2026', status: 'pending' },
  { id: '2', user: 'sari_dewi', trip: 'Open Trip Gunung Rinjani', date: '18 Mei 2026', status: 'pending' },
  { id: '3', user: 'andi_fm', trip: 'Open Trip Gunung Prau', date: '3 Mei 2026', status: 'approved' },
]

const statusConfig = {
  pending:  { label: 'Menunggu', classes: 'bg-warning/10 text-warning' },
  approved: { label: 'Dikonfirmasi', classes: 'bg-success/10 text-success' },
  rejected: { label: 'Ditolak', classes: 'bg-error/10 text-error' },
}

export default function AdminBookingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Kelola Booking</h1>

      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-section border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">User</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Trip</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Tanggal</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((booking) => {
              const config = statusConfig[booking.status as keyof typeof statusConfig]
              return (
                <tr key={booking.id} className="hover:bg-white/3 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium text-text-primary">@{booking.user}</td>
                  <td className="px-4 py-3 text-text-secondary">{booking.trip}</td>
                  <td className="px-4 py-3 text-text-muted">{booking.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.classes}`}>
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {booking.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-text-muted hover:text-success hover:bg-success/10 transition-colors duration-150">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors duration-150">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
