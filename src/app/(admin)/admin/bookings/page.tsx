import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin — Kelola Booking' }

const bookings = [
  { id: '1', user: 'rizky_p', trip: 'Open Trip Gunung Semeru', date: '10 Mei 2026', status: 'pending' },
  { id: '2', user: 'sari_dewi', trip: 'Open Trip Gunung Rinjani', date: '18 Mei 2026', status: 'pending' },
  { id: '3', user: 'andi_fm', trip: 'Open Trip Gunung Prau', date: '3 Mei 2026', status: 'approved' },
]

const statusConfig = {
  pending:  { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Dikonfirmasi', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700' },
}

export default function AdminBookingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Kelola Booking</h1>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">User</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Trip</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Tanggal</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {bookings.map((booking) => {
              const config = statusConfig[booking.status as keyof typeof statusConfig]
              return (
                <tr key={booking.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-stone-900">@{booking.user}</td>
                  <td className="px-4 py-3 text-stone-600">{booking.trip}</td>
                  <td className="px-4 py-3 text-stone-500">{booking.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {booking.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-stone-400 hover:text-green-600 hover:bg-green-50 transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors">
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
