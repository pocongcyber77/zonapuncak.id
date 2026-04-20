'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, CalendarDays, Users } from 'lucide-react'
import { clsx } from 'clsx'
import { getAllTrips } from '@/lib/tripData'
import type { TripBatch } from '@/types'

const STATUS_STYLE = {
  open:        'bg-success/15 text-success',
  almost_full: 'bg-warning/15 text-warning',
  full:        'bg-error/15 text-error',
  closed:      'bg-border text-text-muted',
}
const STATUS_LABEL = {
  open: 'Buka', almost_full: 'Hampir Penuh', full: 'Penuh', closed: 'Ditutup',
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
function formatPrice(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

const EMPTY_FORM = { label: '', start_date: '', end_date: '', quota: '10', price: '', status: 'open' as TripBatch['status'] }

export default function MiminJadwalPage() {
  const trips = getAllTrips()

  type BatchRow = TripBatch & { tripSlug: string; tripName: string }
  const initialBatches: BatchRow[] = trips.flatMap((t) =>
    t.batches.map((b) => ({ ...b, tripSlug: t.slug, tripName: t.name })),
  )

  const [batches, setBatches] = useState<BatchRow[]>(initialBatches)
  const [modal, setModal]     = useState<'add' | 'edit' | 'delete' | null>(null)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [formTrip, setFormTrip]   = useState(trips[0]?.slug ?? '')
  const [editId, setEditId]   = useState<string | null>(null)
  const [deleteId, setDeleteId]   = useState<string | null>(null)
  const [filterTrip, setFilterTrip] = useState('all')

  const filtered = filterTrip === 'all' ? batches : batches.filter(b => b.tripSlug === filterTrip)

  function openAdd() { setForm(EMPTY_FORM); setFormTrip(trips[0]?.slug ?? ''); setModal('add') }

  function openEdit(id: string) {
    const b = batches.find(x => x.id === id)!
    setForm({ label: b.label, start_date: b.start_date, end_date: b.end_date, quota: String(b.quota), price: String(b.price), status: b.status })
    setFormTrip(b.tripSlug)
    setEditId(id)
    setModal('edit')
  }

  function saveBatch() {
    if (modal === 'add') {
      const trip = trips.find(t => t.slug === formTrip)!
      const newBatch: BatchRow = {
        id: Date.now().toString(), label: form.label,
        start_date: form.start_date, end_date: form.end_date,
        quota: Number(form.quota), filled: 0, price: Number(form.price),
        status: form.status, agendas: [],
        tripSlug: formTrip, tripName: trip.name,
      }
      setBatches(prev => [...prev, newBatch])
    } else if (modal === 'edit' && editId) {
      setBatches(prev => prev.map(b => b.id === editId
        ? { ...b, label: form.label, start_date: form.start_date, end_date: form.end_date, quota: Number(form.quota), price: Number(form.price), status: form.status }
        : b))
    }
    setModal(null)
  }

  function confirmDelete() {
    setBatches(prev => prev.filter(b => b.id !== deleteId))
    setModal(null)
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Jadwal Batch</h1>
          <p className="text-sm text-text-muted mt-0.5">{batches.length} batch terdaftar</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200">
          <Plus className="w-4 h-4" /> Tambah Batch
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {[{ slug: 'all', name: 'Semua' }, ...trips.map(t => ({ slug: t.slug, name: t.name }))].map((t) => (
          <button
            key={t.slug}
            onClick={() => setFilterTrip(t.slug)}
            className={clsx(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
              filterTrip === t.slug ? 'bg-forest border-forest text-white' : 'border-border text-text-muted hover:border-white/30 hover:text-text-primary',
            )}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((batch) => {
          const pct = Math.round((batch.filled / batch.quota) * 100)
          const sisa = batch.quota - batch.filled
          return (
            <div key={batch.id} className="bg-bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-text-muted mb-1">{batch.tripName}</p>
                  <p className="font-bold text-text-primary text-sm">{batch.label}</p>
                </div>
                <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0', STATUS_STYLE[batch.status])}>
                  {STATUS_LABEL[batch.status]}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-muted">
                <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                {formatDate(batch.start_date)} — {formatDate(batch.end_date)}
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1.5">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {batch.filled}/{batch.quota} peserta
                  </span>
                  <span>{sisa > 0 ? `${sisa} slot tersisa` : 'Penuh'}</span>
                </div>
                <div className="h-1.5 bg-bg-section rounded-full overflow-hidden">
                  <div className={clsx('h-full rounded-full transition-all', pct >= 100 ? 'bg-error' : pct >= 70 ? 'bg-warning' : 'bg-forest')}
                    style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold text-text-primary text-sm">{formatPrice(batch.price)}<span className="text-xs font-normal text-text-muted"> /orang</span></p>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(batch.id)} className="p-1.5 rounded-lg text-text-muted hover:text-gold hover:bg-gold/10 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setDeleteId(batch.id); setModal('delete') }} className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Modal Add/Edit ── */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-bg-card">
              <h2 className="font-bold text-text-primary">{modal === 'add' ? 'Tambah Batch' : 'Edit Batch'}</h2>
              <button onClick={() => setModal(null)} className="text-text-muted hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {modal === 'add' && (
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Trip / Gunung</label>
                  <select value={formTrip} onChange={(e) => setFormTrip(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-bg-section border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-forest">
                    {trips.map(t => <option key={t.slug} value={t.slug}>{t.name}</option>)}
                  </select>
                </div>
              )}
              {[
                { field: 'label',      label: 'Nama Batch',      placeholder: 'Batch Mei 2026' },
                { field: 'start_date', label: 'Tanggal Mulai',   placeholder: '', type: 'date' },
                { field: 'end_date',   label: 'Tanggal Selesai', placeholder: '', type: 'date' },
                { field: 'quota',      label: 'Kuota Peserta',   placeholder: '10', type: 'number' },
                { field: 'price',      label: 'Harga (IDR)',     placeholder: '2850000', type: 'number' },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">{label}</label>
                  <input type={type ?? 'text'} value={form[field as keyof typeof form]}
                    onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3.5 py-2.5 bg-bg-section border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Status</label>
                <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as TripBatch['status'] }))}
                  className="w-full px-3.5 py-2.5 bg-bg-section border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-forest">
                  <option value="open">Buka</option>
                  <option value="almost_full">Hampir Penuh</option>
                  <option value="full">Penuh</option>
                  <option value="closed">Ditutup</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-full border border-border text-sm text-text-muted hover:text-text-primary transition-all">Batal</button>
              <button onClick={saveBatch} className="flex-1 py-2.5 rounded-full bg-white text-bg-section font-semibold text-sm hover:bg-forest hover:text-white transition-all">
                {modal === 'add' ? 'Simpan' : 'Perbarui'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Delete ── */}
      {modal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-error/15 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5 text-error" />
            </div>
            <p className="text-center font-bold text-text-primary">Hapus Batch?</p>
            <p className="text-center text-sm text-text-muted">Agenda di batch ini juga akan terhapus.</p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-full border border-border text-sm text-text-muted transition-all">Batal</button>
              <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-full bg-error text-white font-semibold text-sm transition-all">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
