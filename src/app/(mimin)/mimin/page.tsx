import Link from 'next/link'
import {
  Mountain, CalendarDays, ClipboardList, Users,
  FileText, ImageIcon, Download, MessageSquare,
  TrendingUp, ArrowRight, Clock, CheckCircle, AlertCircle,
} from 'lucide-react'

/* ── Dummy stats ─────────────────────────────────── */
const STATS = [
  { label: 'Total Trip',      value: '2',   sub: 'gunung aktif',      icon: Mountain,      color: 'bg-forest/15 text-forest-text' },
  { label: 'Booking Masuk',   value: '18',  sub: '3 menunggu konfirm', icon: ClipboardList, color: 'bg-gold/15 text-gold' },
  { label: 'Total User',      value: '142', sub: '+12 bulan ini',      icon: Users,         color: 'bg-success/15 text-success' },
  { label: 'Artikel Terbit',  value: '7',   sub: '2 draft',            icon: FileText,      color: 'bg-border text-text-muted' },
]

const RECENT_BOOKINGS = [
  { id: 'B001', user: 'rizky_pratama',  trip: 'Raung — Batch Mei 2026',     status: 'pending',  date: '19 Apr 2026' },
  { id: 'B002', user: 'sari_dewi',      trip: 'Argopuro — Batch Juni 2026', status: 'approved', date: '18 Apr 2026' },
  { id: 'B003', user: 'andi_firmansyah',trip: 'Raung — Batch Mei 2026',     status: 'pending',  date: '18 Apr 2026' },
  { id: 'B004', user: 'maya_lestari',   trip: 'Argopuro — Batch Juni 2026', status: 'approved', date: '17 Apr 2026' },
  { id: 'B005', user: 'doni_wahyu',     trip: 'Raung — Batch Juli 2026',    status: 'rejected', date: '16 Apr 2026' },
]

const QUICK_LINKS = [
  { href: '/mimin/trips',     label: 'Tambah Trip Baru',  icon: Mountain,      desc: 'Buat jadwal trip gunung' },
  { href: '/mimin/jadwal',    label: 'Kelola Batch',      icon: CalendarDays,  desc: 'Atur slot & tanggal' },
  { href: '/mimin/posts',     label: 'Tulis Artikel',     icon: FileText,      desc: 'Buat konten baru' },
  { href: '/mimin/gallery',   label: 'Upload Foto',       icon: ImageIcon,     desc: 'Tambah ke galeri' },
  { href: '/mimin/downloads', label: 'Upload File',       icon: Download,      desc: 'Peta, GPX, modul' },
  { href: '/mimin/users',     label: 'Kelola User',       icon: Users,         desc: 'Manajemen anggota' },
]

const ACTIVITY = [
  { icon: CheckCircle, color: 'text-success', msg: 'Booking B004 dikonfirmasi',         time: '2 jam lalu' },
  { icon: Users,       color: 'text-forest-text',  msg: 'User baru: hendra_pake mendaftar', time: '5 jam lalu' },
  { icon: FileText,    color: 'text-gold',    msg: 'Artikel "Tips Raung" diterbitkan', time: '1 hari lalu' },
  { icon: AlertCircle, color: 'text-warning', msg: 'Kuota Raung Mei tersisa 3 slot',   time: '1 hari lalu' },
  { icon: ImageIcon,   color: 'text-text-muted', msg: '6 foto baru diupload ke galeri', time: '2 hari lalu' },
]

const STATUS_STYLE: Record<string, string> = {
  pending:  'bg-warning/15 text-warning',
  approved: 'bg-success/15 text-success',
  rejected: 'bg-error/15 text-error',
}
const STATUS_LABEL: Record<string, string> = {
  pending: 'Menunggu', approved: 'Dikonfirmasi', rejected: 'Ditolak',
}

/* ── Shared card wrapper ─────────────────────────── */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-bg-card border border-border rounded-2xl ${className}`}>
      {children}
    </div>
  )
}

export default function MiminDashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-[1400px]">

      {/* ── Header ─────────────────────────────── */}
      <div>
        <p className="text-text-muted text-sm mb-1">Selamat datang kembali 👋</p>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
      </div>

      {/* ── Stats ──────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-text-primary leading-none mb-1">{s.value}</p>
            <p className="text-xs font-semibold text-text-primary">{s.label}</p>
            <p className="text-[11px] text-text-muted mt-1">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* ── Main grid ──────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

        {/* Booking terbaru */}
        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-text-muted" />
              Booking Terbaru
            </h2>
            <Link href="/mimin/bookings" className="text-xs text-forest-text hover:text-text-primary transition-colors flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {RECENT_BOOKINGS.map((b) => (
              <div key={b.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-7 h-7 rounded-full bg-bg-section flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-text-muted uppercase">{b.user[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">@{b.user}</p>
                  <p className="text-xs text-text-muted truncate">{b.trip}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${STATUS_STYLE[b.status]}`}>
                    {STATUS_LABEL[b.status]}
                  </span>
                  <span className="text-[10px] text-text-muted">{b.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity feed */}
        <Card>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <TrendingUp className="w-4 h-4 text-text-muted" />
            <h2 className="text-sm font-semibold text-text-primary">Aktivitas Terkini</h2>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1 shrink-0 ${a.color}`}>
                  <a.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-secondary leading-normal">{a.msg}</p>
                  <p className="text-[11px] text-text-muted flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />{a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Quick links ────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-text-muted mb-3 uppercase tracking-widest">
          Akses Cepat
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="bg-bg-card border border-border hover:border-forest/50 rounded-2xl p-4 flex flex-col gap-2 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-xl bg-bg-section flex items-center justify-center group-hover:bg-forest/20 transition-colors duration-200">
                <q.icon className="w-4 h-4 text-text-muted group-hover:text-forest transition-colors duration-200" />
              </div>
              <p className="text-xs font-semibold text-text-primary leading-tight">{q.label}</p>
              <p className="text-[10px] text-text-muted leading-normal">{q.desc}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
