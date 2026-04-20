import type { Metadata } from 'next'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Admin — Kelola Trip',
  robots: {
    index: false,
    follow: false,
  },
}

const trips = [
  { id: '1', title: 'Open Trip Gunung Semeru', price: 1250000, quota: 15, date: '10 Mei 2026', difficulty: 'Hard' },
  { id: '2', title: 'Open Trip Gunung Rinjani', price: 1850000, quota: 12, date: '18 Mei 2026', difficulty: 'Hard' },
  { id: '3', title: 'Open Trip Gunung Prau', price: 550000, quota: 20, date: '3 Mei 2026', difficulty: 'Easy' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}

export default function AdminTripsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Kelola Trip</h1>
        <Button size="sm">
          <Plus className="w-4 h-4" />
          Tambah Trip
        </Button>
      </div>

      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-section border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Trip</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Tanggal</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Harga</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Kuota</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-white/3 transition-colors duration-150">
                <td className="px-4 py-3 font-medium text-text-primary">{trip.title}</td>
                <td className="px-4 py-3 text-text-muted">{trip.date}</td>
                <td className="px-4 py-3 text-text-secondary">{formatPrice(trip.price)}</td>
                <td className="px-4 py-3 text-text-muted">{trip.quota} orang</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg text-text-muted hover:text-forest hover:bg-forest/10 transition-colors duration-150">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors duration-150">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
