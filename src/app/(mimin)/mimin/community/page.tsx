'use client'

import { useState } from 'react'
import { Trash2, Pin, CheckCircle, MessageSquare, Heart } from 'lucide-react'
import { clsx } from 'clsx'

type PostStatus = 'active' | 'pinned' | 'removed'

const INITIAL_POSTS = [
  { id: '1', user: 'rizky_pratama',  avatar: 'R', content: 'Baru selesai summit Raung lewat Kalibaru! Trek yang luar biasa, view kaldera menakjubkan. Terima kasih guide Zona Puncak 🔥', likes: 42, comments: 8,  status: 'active'  as PostStatus, date: '19 Apr 2026' },
  { id: '2', user: 'maya_lestari',   avatar: 'M', content: 'Ada yang punya info basecamp Argopuro terbaru? Kata teman jalur Baderan sedang ramai bulan Juni, apakah perlu booking duluan?', likes: 15, comments: 12, status: 'active'  as PostStatus, date: '18 Apr 2026' },
  { id: '3', user: 'doni_wahyu',     avatar: 'D', content: 'WARNING: Kondisi jalur Raung pos 3–4 sedang licin akibat hujan lebat kemarin. Harap berhati-hati. Prioritaskan keselamatan.', likes: 87, comments: 23, status: 'pinned'  as PostStatus, date: '17 Apr 2026' },
  { id: '4', user: 'fera_anggraini', avatar: 'F', content: 'Menjual sleeping bag Rei Flash 10 kondisi 95% mulus, hanya dipakai 2x. DM kalau minat 👍', likes: 3,  comments: 2,  status: 'active'  as PostStatus, date: '16 Apr 2026' },
  { id: '5', user: 'unknown_user',   avatar: 'U', content: 'PROMO MURAH!!! KLIK LINK DI BIO!!!', likes: 0,  comments: 0,  status: 'removed' as PostStatus, date: '15 Apr 2026' },
]

const STATUS_STYLE: Record<PostStatus, string> = {
  active:  'bg-success/15 text-success',
  pinned:  'bg-gold/15 text-gold',
  removed: 'bg-error/15 text-error',
}
const STATUS_LABEL: Record<PostStatus, string> = { active: 'Aktif', pinned: 'Dipin', removed: 'Dihapus' }

export default function MiminCommunityPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [filter, setFilter] = useState<PostStatus | 'all'>('all')

  const filtered = filter === 'all' ? posts : posts.filter(p => p.status === filter)

  function updateStatus(id: string, status: PostStatus) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  const counts = { all: posts.length, active: posts.filter(p => p.status === 'active').length, pinned: posts.filter(p => p.status === 'pinned').length, removed: posts.filter(p => p.status === 'removed').length }

  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">

      <div>
        <h1 className="text-2xl font-bold text-text-primary">Komunitas — Posts</h1>
        <p className="text-sm text-text-muted mt-0.5">Moderasi postingan komunitas</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {([['all', 'Total', 'bg-border text-text-muted'], ['active', 'Aktif', 'bg-success/15 text-success'], ['pinned', 'Dipin', 'bg-gold/15 text-gold'], ['removed', 'Dihapus', 'bg-error/15 text-error']] as [PostStatus | 'all', string, string][]).map(([val, label, style]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={clsx('bg-bg-card border rounded-xl p-3 text-center transition-all duration-150',
              filter === val ? 'border-forest' : 'border-border hover:border-white/20')}>
            <p className="text-xl font-bold text-text-primary">{counts[val]}</p>
            <p className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-1', style)}>{label}</p>
          </button>
        ))}
      </div>

      {/* Post cards */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="py-16 text-center text-text-muted text-sm">Tidak ada postingan di kategori ini.</div>
        )}
        {filtered.map((post) => (
          <div key={post.id} className={clsx('bg-bg-card border rounded-2xl p-5 transition-all',
            post.status === 'removed' ? 'border-error/30 opacity-60' : post.status === 'pinned' ? 'border-gold/30' : 'border-border')}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-forest/20 flex items-center justify-center shrink-0 text-sm font-bold text-forest">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-text-primary">@{post.user}</p>
                  <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded-full', STATUS_STYLE[post.status])}>
                    {STATUS_LABEL[post.status]}
                  </span>
                  <span className="text-[11px] text-text-muted ml-auto">{post.date}</span>
                </div>
                <p className={clsx('text-sm leading-relaxed', post.status === 'removed' ? 'text-text-muted line-through' : 'text-text-secondary')}>
                  {post.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Heart className="w-3.5 h-3.5" />{post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <MessageSquare className="w-3.5 h-3.5" />{post.comments}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    {post.status !== 'pinned' && post.status !== 'removed' && (
                      <button onClick={() => updateStatus(post.id, 'pinned')} title="Pin postingan"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-text-muted hover:text-gold hover:bg-gold/10 transition-colors">
                        <Pin className="w-3.5 h-3.5" /> Pin
                      </button>
                    )}
                    {post.status === 'pinned' && (
                      <button onClick={() => updateStatus(post.id, 'active')} title="Unpin"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-gold hover:bg-gold/10 transition-colors">
                        <Pin className="w-3.5 h-3.5" /> Unpin
                      </button>
                    )}
                    {post.status === 'removed' ? (
                      <button onClick={() => updateStatus(post.id, 'active')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-text-muted hover:text-success hover:bg-success/10 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5" /> Pulihkan
                      </button>
                    ) : (
                      <button onClick={() => updateStatus(post.id, 'removed')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-text-muted hover:text-error hover:bg-error/10 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
