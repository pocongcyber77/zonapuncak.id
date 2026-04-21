'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye, X, Search, Globe, FileText } from 'lucide-react'
import { clsx } from 'clsx'

type PostStatus = 'published' | 'draft'

const INITIAL_POSTS = [
  { id: '1', title: 'Tips Persiapan Mendaki Raung untuk Pemula',     slug: 'tips-mendaki-raung',    status: 'published' as PostStatus, author: 'Admin', date: '18 Apr 2026', views: 342 },
  { id: '2', title: 'Mengenal Jalur Baderan — Argopuro dari Utara',  slug: 'jalur-baderan-argopuro',status: 'published' as PostStatus, author: 'Admin', date: '12 Apr 2026', views: 218 },
  { id: '3', title: 'Gear Wajib Pendakian Extreme di Atas 3000 mdpl',slug: 'gear-extreme-3000',      status: 'draft'     as PostStatus, author: 'Admin', date: '10 Apr 2026', views: 0 },
  { id: '4', title: 'Panduan SIMAKSI Online Gunung Jawa Timur',       slug: 'simaksi-online-jatim',  status: 'draft'     as PostStatus, author: 'Admin', date: '5 Apr 2026',  views: 0 },
  { id: '5', title: 'Rekomendasi Basecamp Terdekat dari Banyuwangi',  slug: 'basecamp-banyuwangi',   status: 'published' as PostStatus, author: 'Admin', date: '1 Apr 2026',  views: 195 },
]

const EMPTY_FORM = { title: '', slug: '', status: 'draft' as PostStatus }

export default function MiminPostsPage() {
  const [posts, setPosts]   = useState(INITIAL_POSTS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<PostStatus | 'all'>('all')
  const [modal, setModal]   = useState<'add' | 'edit' | 'delete' | null>(null)
  const [form, setForm]     = useState(EMPTY_FORM)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  function openEdit(id: string) {
    const p = posts.find(x => x.id === id)!
    setForm({ title: p.title, slug: p.slug, status: p.status })
    setEditId(id); setModal('edit')
  }

  function savePost() {
    if (modal === 'add') {
      setPosts(prev => [...prev, { ...form, id: Date.now().toString(), author: 'Admin', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }), views: 0 }])
    } else if (modal === 'edit' && editId) {
      setPosts(prev => prev.map(p => p.id === editId ? { ...p, ...form } : p))
    }
    setModal(null)
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Artikel / CMS</h1>
          <p className="text-sm text-text-muted mt-1">{posts.filter(p => p.status === 'published').length} terbit · {posts.filter(p => p.status === 'draft').length} draft</p>
        </div>
        <button onClick={() => { setForm(EMPTY_FORM); setModal('add') }}
          className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-4 py-3 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200">
          <Plus className="w-4 h-4" /> Tulis Artikel
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari artikel..."
            className="w-full pl-9 pr-4 py-3 bg-bg-card border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest" />
        </div>
        <div className="flex gap-2">
          {([['all', 'Semua'], ['published', 'Terbit'], ['draft', 'Draft']] as [PostStatus | 'all', string][]).map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={clsx('px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150',
                filter === val ? 'bg-forest border-forest text-white' : 'border-border text-text-muted hover:border-white/30 hover:text-text-primary')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-section border-b border-border">
            <tr>
              <th className="text-left px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Judul</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell">Status</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Views</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">Tanggal</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-bg-section flex items-center justify-center shrink-0 mt-1">
                      {p.status === 'published' ? <Globe className="w-3.5 h-3.5 text-forest-text" /> : <FileText className="w-3.5 h-3.5 text-text-muted" />}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary leading-normal">{p.title}</p>
                      <p className="text-[11px] text-text-muted">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={clsx('text-[10px] font-semibold px-3 py-1 rounded-full', p.status === 'published' ? 'bg-success/15 text-success' : 'bg-border text-text-muted')}>
                    {p.status === 'published' ? 'Terbit' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell text-text-secondary text-xs">{p.views > 0 ? p.views.toLocaleString() : '—'}</td>
                <td className="px-5 py-4 hidden md:table-cell text-xs text-text-muted">{p.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button title="Preview" className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text-muted hover:text-forest hover:bg-forest/10 transition-colors"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => openEdit(p.id)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text-muted hover:text-gold hover:bg-gold/10 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => { setDeleteId(p.id); setModal('delete') }} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-bold text-text-primary">{modal === 'add' ? 'Tulis Artikel Baru' : 'Edit Artikel'}</h2>
              <button onClick={() => setModal(null)} className="text-text-muted hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {[{ field: 'title', label: 'Judul', placeholder: 'Tips Mendaki Raung...' }, { field: 'slug', label: 'Slug URL', placeholder: 'tips-mendaki-raung' }].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">{label}</label>
                  <input value={form[field as keyof typeof form]} onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder}
                    className="w-full px-4 py-3 bg-bg-section border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Status</label>
                <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as PostStatus }))}
                  className="w-full px-4 py-3 bg-bg-section border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-forest">
                  <option value="draft">Draft</option>
                  <option value="published">Terbitkan</option>
                </select>
              </div>
              <div className="bg-bg-section border border-border rounded-xl p-3 text-xs text-text-muted">
                Editor konten lengkap (rich text) akan tersedia setelah integrasi CMS.
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-full border border-border text-sm text-text-muted transition-all">Batal</button>
              <button onClick={savePost} className="flex-1 py-3 rounded-full bg-white text-bg-section font-semibold text-sm hover:bg-forest hover:text-white transition-all">
                {modal === 'add' ? 'Simpan' : 'Perbarui'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-error/15 flex items-center justify-center mx-auto"><Trash2 className="w-5 h-5 text-error" /></div>
            <p className="text-center font-bold text-text-primary">Hapus Artikel?</p>
            <p className="text-center text-sm text-text-muted">Artikel yang sudah terbit akan dihapus permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-full border border-border text-sm text-text-muted">Batal</button>
              <button onClick={() => { setPosts(prev => prev.filter(p => p.id !== deleteId)); setModal(null) }}
                className="flex-1 py-3 rounded-full bg-error text-white font-semibold text-sm">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
