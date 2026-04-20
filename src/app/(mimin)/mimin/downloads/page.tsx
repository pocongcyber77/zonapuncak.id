'use client'

import { useState } from 'react'
import { Plus, Trash2, Download, X, FileText, Map, Navigation, Award, BookOpen, Info } from 'lucide-react'
import { clsx } from 'clsx'

type FileCategory = 'peta' | 'modul' | 'gpx' | 'sertifikat' | 'informasi'

const CATEGORY_CFG: Record<FileCategory, { label: string; icon: React.ElementType; color: string }> = {
  peta:        { label: 'Peta Pendakian',    icon: Map,       color: 'bg-forest/15 text-forest' },
  modul:       { label: 'Modul Materi',      icon: BookOpen,  color: 'bg-gold/15 text-gold' },
  gpx:         { label: 'GPX',               icon: Navigation,color: 'bg-success/15 text-success' },
  sertifikat:  { label: 'Sertifikat',        icon: Award,     color: 'bg-border text-text-secondary' },
  informasi:   { label: 'Informasi',         icon: Info,      color: 'bg-warning/15 text-warning' },
}

const INITIAL_FILES = [
  { id: '1', name: 'Peta Jalur Raung — Kalibaru',       category: 'peta'       as FileCategory, size: '2.4 MB', downloads: 128, trip: 'Gunung Raung',    date: '15 Mar 2026' },
  { id: '2', name: 'Peta Jalur Argopuro — Baderan',     category: 'peta'       as FileCategory, size: '1.8 MB', downloads: 94,  trip: 'Gunung Argopuro', date: '10 Mar 2026' },
  { id: '3', name: 'Modul Teknik Pendakian Extreme',    category: 'modul'      as FileCategory, size: '5.1 MB', downloads: 67,  trip: 'Umum',            date: '1 Mar 2026'  },
  { id: '4', name: 'GPX Rute Raung via Kalibaru',       category: 'gpx'        as FileCategory, size: '0.3 MB', downloads: 215, trip: 'Gunung Raung',    date: '14 Mar 2026' },
  { id: '5', name: 'GPX Rute Argopuro Baderan–Bremi',   category: 'gpx'        as FileCategory, size: '0.4 MB', downloads: 183, trip: 'Gunung Argopuro', date: '9 Mar 2026'  },
  { id: '6', name: 'Info Perizinan Taman Nasional',     category: 'informasi'  as FileCategory, size: '1.2 MB', downloads: 52,  trip: 'Umum',            date: '20 Feb 2026' },
]

const EMPTY_FORM = { name: '', category: 'peta' as FileCategory, size: '', trip: 'Umum' }

export default function MiminDownloadsPage() {
  const [files, setFiles]   = useState(INITIAL_FILES)
  const [modal, setModal]   = useState<'add' | 'delete' | null>(null)
  const [form, setForm]     = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FileCategory | 'all'>('all')

  const filtered = filter === 'all' ? files : files.filter(f => f.category === filter)

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Downloads</h1>
          <p className="text-sm text-text-muted mt-0.5">{files.length} file tersedia</p>
        </div>
        <button onClick={() => { setForm(EMPTY_FORM); setModal('add') }}
          className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200">
          <Plus className="w-4 h-4" /> Upload File
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {([['all', 'Semua'], ...Object.entries(CATEGORY_CFG).map(([k, v]) => [k, v.label])] as [FileCategory | 'all', string][]).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={clsx('px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
              filter === val ? 'bg-forest border-forest text-white' : 'border-border text-text-muted hover:border-white/30 hover:text-text-primary')}>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-section border-b border-border">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">File</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell">Kategori</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Trip</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">Ukuran</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Diunduh</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((f) => {
              const cfg = CATEGORY_CFG[f.category]
              return (
                <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center shrink-0', cfg.color)}>
                        <cfg.icon className="w-4 h-4" />
                      </div>
                      <p className="font-medium text-text-primary">{f.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={clsx('text-[10px] font-semibold px-2.5 py-1 rounded-full', cfg.color)}>{cfg.label}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-xs text-text-muted">{f.trip}</td>
                  <td className="px-5 py-4 hidden md:table-cell text-xs text-text-secondary">{f.size}</td>
                  <td className="px-5 py-4 hidden lg:table-cell text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" />{f.downloads.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => { setDeleteId(f.id); setModal('delete') }}
                      className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      {modal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-bold text-text-primary">Upload File Baru</h2>
              <button onClick={() => setModal(null)} className="text-text-muted hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Nama File</label>
                <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Peta Jalur Raung..."
                  className="w-full px-3.5 py-2.5 bg-bg-section border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Kategori</label>
                <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value as FileCategory }))}
                  className="w-full px-3.5 py-2.5 bg-bg-section border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-forest">
                  {Object.entries(CATEGORY_CFG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 text-text-muted">
                <FileText className="w-6 h-6" />
                <p className="text-sm">Drag & drop file atau klik untuk pilih</p>
                <p className="text-xs opacity-60">PDF, GPX, WebP, PNG — max 20MB</p>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-full border border-border text-sm text-text-muted">Batal</button>
              <button onClick={() => {
                if (!form.name) return
                setFiles(prev => [...prev, { ...form, id: Date.now().toString(), size: '–', downloads: 0, date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }])
                setModal(null)
              }} className="flex-1 py-2.5 rounded-full bg-white text-bg-section font-semibold text-sm hover:bg-forest hover:text-white transition-all">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-error/15 flex items-center justify-center mx-auto"><Trash2 className="w-5 h-5 text-error" /></div>
            <p className="text-center font-bold text-text-primary">Hapus File?</p>
            <p className="text-center text-sm text-text-muted">File tidak bisa dipulihkan setelah dihapus.</p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-full border border-border text-sm text-text-muted">Batal</button>
              <button onClick={() => { setFiles(prev => prev.filter(f => f.id !== deleteId)); setModal(null) }}
                className="flex-1 py-2.5 rounded-full bg-error text-white font-semibold text-sm">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
