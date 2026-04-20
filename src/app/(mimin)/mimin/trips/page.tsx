'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye, Search, X, Mountain } from 'lucide-react'
import { clsx } from 'clsx'
import Link from 'next/link'
import type { Difficulty } from '@/types'

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  easy:     'bg-success/15 text-success',
  moderate: 'bg-warning/15 text-warning',
  hard:     'bg-gold/15 text-gold',
  extreme:  'bg-error/15 text-error',
}
const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Easy', moderate: 'Moderate', hard: 'Hard', extreme: 'Extreme',
}

const INITIAL_TRIPS = [
  { id: '1', name: 'Gunung Raung',    slug: 'raung',    elevation: 3344, location: 'Banyuwangi, Jatim',         difficulty: 'extreme' as Difficulty, batches: 2, status: 'active' },
  { id: '2', name: 'Gunung Argopuro', slug: 'argopuro', elevation: 3088, location: 'Probolinggo–Situbondo, Jatim', difficulty: 'hard'    as Difficulty, batches: 2, status: 'active' },
]

const EMPTY_FORM = { name: '', slug: '', elevation: '', location: '', difficulty: 'hard' as Difficulty, status: 'active' }

export default function MiminTripsPage() {
  const [trips, setTrips]   = useState(INITIAL_TRIPS)
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState<'add' | 'edit' | 'delete' | null>(null)
  const [form, setForm]     = useState(EMPTY_FORM)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = trips.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()),
  )

  function openAdd() { setForm(EMPTY_FORM); setModal('add') }

  function openEdit(id: string) {
    const t = trips.find((x) => x.id === id)!
    setForm({ name: t.name, slug: t.slug, elevation: String(t.elevation), location: t.location, difficulty: t.difficulty, status: t.status })
    setEditId(id)
    setModal('edit')
  }

  function openDelete(id: string) { setDeleteId(id); setModal('delete') }

  function saveTrip() {
    if (modal === 'add') {
      setTrips((prev) => [...prev, { ...form, id: Date.now().toString(), elevation: Number(form.elevation), batches: 0 }])
    } else if (modal === 'edit' && editId) {
      setTrips((prev) => prev.map((t) => t.id === editId ? { ...t, ...form, elevation: Number(form.elevation) } : t))
    }
    setModal(null)
  }

  function confirmDelete() {
    setTrips((prev) => prev.filter((t) => t.id !== deleteId))
    setModal(null)
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Kelola Trip</h1>
          <p className="text-sm text-text-muted mt-0.5">{trips.length} gunung terdaftar</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4" /> Tambah Trip
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari gunung atau lokasi..."
          className="w-full pl-9 pr-4 py-2.5 bg-bg-card border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-section border-b border-border">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Gunung</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">Elevasi</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Lokasi</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Level</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell">Batch</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-text-muted text-sm">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
            {filtered.map((trip) => (
              <tr key={trip.id} className="hover:bg-white/3 transition-colors duration-150">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-bg-section flex items-center justify-center shrink-0">
                      <Mountain className="w-4 h-4 text-text-muted" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{trip.name}</p>
                      <p className="text-[11px] text-text-muted">/{trip.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-text-secondary hidden md:table-cell">
                  {trip.elevation.toLocaleString('id-ID')} mdpl
                </td>
                <td className="px-5 py-4 text-text-muted hidden lg:table-cell text-xs">
                  {trip.location}
                </td>
                <td className="px-5 py-4">
                  <span className={clsx('text-[10px] font-semibold px-2.5 py-1 rounded-full', DIFFICULTY_STYLE[trip.difficulty])}>
                    {DIFFICULTY_LABEL[trip.difficulty]}
                  </span>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className="text-sm text-text-secondary">{trip.batches} batch</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/jadwal/${trip.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-text-muted hover:text-forest hover:bg-forest/10 transition-colors duration-150"
                      title="Preview halaman publik"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => openEdit(trip.id)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-gold hover:bg-gold/10 transition-colors duration-150"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDelete(trip.id)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors duration-150"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal Add/Edit ────────────────────── */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-bold text-text-primary">{modal === 'add' ? 'Tambah Trip Baru' : 'Edit Trip'}</h2>
              <button onClick={() => setModal(null)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {[
                { field: 'name',      label: 'Nama Gunung',    placeholder: 'Gunung Raung' },
                { field: 'slug',      label: 'Slug URL',       placeholder: 'raung' },
                { field: 'elevation', label: 'Elevasi (mdpl)', placeholder: '3344', type: 'number' },
                { field: 'location',  label: 'Lokasi',         placeholder: 'Banyuwangi, Jawa Timur' },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">{label}</label>
                  <input
                    type={type ?? 'text'}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3.5 py-2.5 bg-bg-section border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Level Kesulitan</label>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value as Difficulty }))}
                  className="w-full px-3.5 py-2.5 bg-bg-section border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-full border border-border text-sm text-text-muted hover:text-text-primary hover:border-white/30 transition-all">
                Batal
              </button>
              <button onClick={saveTrip} className="flex-1 py-2.5 rounded-full bg-white text-bg-section font-semibold text-sm hover:bg-forest hover:text-white transition-all">
                {modal === 'add' ? 'Simpan' : 'Perbarui'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Delete ──────────────────────── */}
      {modal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-sm shadow-2xl p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-error/15 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5 text-error" />
            </div>
            <div className="text-center">
              <p className="font-bold text-text-primary mb-1">Hapus Trip?</p>
              <p className="text-sm text-text-muted">Semua data batch & jadwal terkait akan ikut terhapus. Tindakan ini tidak bisa diurungkan.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-full border border-border text-sm text-text-muted hover:text-text-primary transition-all">
                Batal
              </button>
              <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-full bg-error text-white font-semibold text-sm hover:bg-error/80 transition-all">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
