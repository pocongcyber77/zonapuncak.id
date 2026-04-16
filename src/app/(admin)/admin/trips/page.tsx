import type { Metadata } from 'next'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Admin — Kelola Trip' }

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
        <h1 className="text-2xl font-bold text-stone-900">Kelola Trip</h1>
        <Button size="sm">
          <Plus className="w-4 h-4" />
          Tambah Trip
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Trip</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Tanggal</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Harga</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Kuota</th>
              <th className="text-left px-4 py-3 font-semibold text-stone-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 py-3 font-medium text-stone-900">{trip.title}</td>
                <td className="px-4 py-3 text-stone-500">{trip.date}</td>
                <td className="px-4 py-3 text-stone-700">{formatPrice(trip.price)}</td>
                <td className="px-4 py-3 text-stone-500">{trip.quota} orang</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors">
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
