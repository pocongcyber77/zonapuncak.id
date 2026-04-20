'use client'

import { useState } from 'react'
import { Upload, Trash2, X, ImageIcon } from 'lucide-react'
import { clsx } from 'clsx'

const HERO_SLIDES = [
  { id: 'g1', src: '/hero-1.webp', label: 'Hero 1',   tag: 'hero',    trip: 'Umum' },
  { id: 'g2', src: '/hero-2.webp', label: 'Hero 2',   tag: 'hero',    trip: 'Umum' },
  { id: 'g3', src: '/hero-3.webp', label: 'Hero 3',   tag: 'hero',    trip: 'Umum' },
  { id: 'g4', src: '/hero4.webp',  label: 'Hero 4',   tag: 'hero',    trip: 'Umum' },
  { id: 'g5', src: '/hero-5.webp', label: 'Hero 5 (Raung)', tag: 'trip', trip: 'Gunung Raung' },
  { id: 'g6', src: '/hero-6.webp', label: 'Hero 6',   tag: 'hero',    trip: 'Umum' },
]

const TAGS = ['Semua', 'hero', 'trip', 'komunitas']

export default function MiminGalleryPage() {
  const [images, setImages]     = useState(HERO_SLIDES)
  const [filter, setFilter]     = useState('Semua')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [preview, setPreview]   = useState<string | null>(null)

  const filtered = filter === 'Semua' ? images : images.filter(i => i.tag === filter)

  return (
    <div className="flex flex-col gap-6 max-w-[1400px]">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gallery</h1>
          <p className="text-sm text-text-muted mt-0.5">{images.length} foto terdaftar</p>
        </div>
        <label className="inline-flex items-center gap-2 bg-white text-bg-section font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-forest hover:text-white transition-all duration-200 cursor-pointer">
          <Upload className="w-4 h-4" /> Upload Foto
          <input type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? [])
              const newImgs = files.map((f, i) => ({
                id: Date.now() + i + '', src: URL.createObjectURL(f),
                label: f.name, tag: 'hero', trip: 'Umum',
              }))
              setImages(prev => [...prev, ...newImgs])
            }} />
        </label>
      </div>

      {/* Tag filter */}
      <div className="flex gap-2 flex-wrap">
        {TAGS.map((tag) => (
          <button key={tag} onClick={() => setFilter(tag)}
            className={clsx('px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
              filter === tag ? 'bg-forest border-forest text-white' : 'border-border text-text-muted hover:border-white/30 hover:text-text-primary')}>
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-text-muted" />
          </div>
          <p className="text-text-muted text-sm">Belum ada foto di kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((img) => (
            <div key={img.id} className="group relative bg-bg-card border border-border rounded-xl overflow-hidden aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => setPreview(img.src)}
                  className="px-3 py-1.5 bg-white text-bg-section text-xs font-semibold rounded-full hover:bg-forest hover:text-white transition-all">
                  Preview
                </button>
                <button onClick={() => setDeleteId(img.id)}
                  className="p-1.5 rounded-full bg-error/20 text-error hover:bg-error/40 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Tag */}
              <div className="absolute top-2 left-2">
                <span className="text-[9px] font-semibold bg-black/50 text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm">{img.tag}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <div className="relative max-w-3xl w-full max-h-[85vh]">
            <button onClick={() => setPreview(null)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80">
              <X className="w-4 h-4" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" className="w-full h-full object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-error/15 flex items-center justify-center mx-auto"><Trash2 className="w-5 h-5 text-error" /></div>
            <p className="text-center font-bold text-text-primary">Hapus Foto?</p>
            <p className="text-center text-sm text-text-muted">Foto akan dihapus permanen dari galeri.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-full border border-border text-sm text-text-muted">Batal</button>
              <button onClick={() => { setImages(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null) }}
                className="flex-1 py-2.5 rounded-full bg-error text-white font-semibold text-sm">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
