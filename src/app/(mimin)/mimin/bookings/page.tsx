'use client'

import { useState } from 'react'
import { Check, X, Search, Filter, Eye } from 'lucide-react'
import { clsx } from 'clsx'

const ALL_BOOKINGS = [
  { id: 'B001', user: 'rizky_pratama',   email: 'rizky@mail.com',   trip: 'Gunung Raung',    batch: 'Batch Mei 2026',     amount: 2850000, status: 'pending',  date: '19 Apr 2026' },
  { id: 'B002', user: 'sari_dewi',       email: 'sari@mail.com',    trip: 'Gunung Argopuro', batch: 'Batch Juni 2026',    amount: 1950000, status: 'approved', date: '18 Apr 2026' },
  { id: 'B003', user: 'andi_firmansyah', email: 'andi@mail.com',    trip: 'Gunung Raung',    batch: 'Batch Mei 2026',     amount: 2850000, status: 'pending',  date: '18 Apr 2026' },
  { id: 'B004', user: 'maya_lestari',    email: 'maya@mail.com',    trip: 'Gunung Argopuro', batch: 'Batch Juni 2026',    amount: 1950000, status: 'approved', date: '17 Apr 2026' },
  { id: 'B005', user: 'doni_wahyu',      email: 'doni@mail.com',    trip: 'Gunung Raung',    batch: 'Batch Juli 2026',    amount: 2850000, status: 'rejected', date: '16 Apr 2026' },
  { id: 'B006', user: 'fera_anggraini',  email: 'fera@mail.com',    trip: 'Gunung Argopuro', batch: 'Batch Agustus 2026', amount: 1950000, status: 'pending',  date: '15 Apr 2026' },
  { id: 'B007', user: 'hendra_putra',    email: 'hendra@mail.com',  trip: 'Gunung Raung',    batch: 'Batch Juli 2026',    amount: 2850000, status: 'approved', date: '14 Apr 2026' },
]

type Status = 'pending' | 'approved' | 'rejected'
const STATUS_STYLE: Record<Status, string> = {
  pending:  'bg-warning/15 text-warning',
  approved: 'bg-success/15 text-success',
  rejected: 'bg-error/15 text-error',
}
const STATUS_LABEL: Record<Status, string> = { pending: 'Menunggu', approved: 'Dikonfirmasi', rejected: 'Ditolak' }

function formatPrice(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

export default function MiminBookingsPage() {
  const [bookings, setBookings] = useState(ALL_BOOKINGS)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState<Status | 'all'>('all')

  const filtered = bookings.filter((b) => {
    const matchSearch = b.user.toLowerCase().includes(search.toLowerCase()) || b.trip.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || b.status === filter
    return matchSearch && matchFilter
  })

  function updateStatus(id: string, status: Status) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b))
  }

  const counts = { all: bookings.length, pending: bookings.filter(b => b.status === 'pending').length, approved: bookings.filter(b => b.status === 'approved').length, rejected: bookings.filter(b => b.status === 'rejected').length }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">

      <div>
        <h1 className="text-2xl font-bold text-text-primary">Kelola Booking</h1>
        <p className="text-sm text-text-muted mt-0.5">{counts.pending} menunggu konfirmasi</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {([['all', 'Semua'], ['pending', 'Menunggu'], ['approved', 'Dikonfirmasi'], ['rejected', 'Ditolak']] as [Status | 'all', string][]).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={clsx('px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
              filter === val ? 'bg-forest border-forest text-white' : 'border-border text-text-muted hover:border-white/30 hover:text-text-primary')}>
            {label} {val !== 'all' && <span className="ml-1 opacity-70">{counts[val]}</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari user atau trip..."
          className="w-full pl-9 pr-4 py-2.5 bg-bg-card border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest" />
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-section border-b border-border">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">ID</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">User</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">Trip</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Nominal</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell">Tanggal</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-text-muted text-sm">Tidak ada booking.</td></tr>
            )}
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-white/[0.02] transition-colors duration-150">
                <td className="px-5 py-4 font-mono text-xs text-text-muted">{b.id}</td>
                <td className="px-5 py-4">
                  <p className="font-medium text-text-primary">@{b.user}</p>
                  <p className="text-[11px] text-text-muted">{b.email}</p>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <p className="text-text-secondary">{b.trip}</p>
                  <p className="text-[11px] text-text-muted">{b.batch}</p>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell font-semibold text-text-primary">{formatPrice(b.amount)}</td>
                <td className="px-5 py-4 hidden sm:table-cell text-xs text-text-muted">{b.date}</td>
                <td className="px-5 py-4">
                  <span className={clsx('text-[10px] font-semibold px-2.5 py-1 rounded-full', STATUS_STYLE[b.status as Status])}>
                    {STATUS_LABEL[b.status as Status]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    {b.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(b.id, 'approved')} title="Konfirmasi"
                          className="p-1.5 rounded-lg text-text-muted hover:text-success hover:bg-success/10 transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(b.id, 'rejected')} title="Tolak"
                          className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button title="Detail" className="p-1.5 rounded-lg text-text-muted hover:text-forest hover:bg-forest/10 transition-colors">
                      <Eye className="w-4 h-4" />
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
