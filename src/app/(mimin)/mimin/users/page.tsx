'use client'

import { useState } from 'react'
import { Search, Shield, ShieldOff, Ban, CheckCircle, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

type Role   = 'user' | 'admin'
type Status = 'active' | 'banned'

const INITIAL_USERS = [
  { id: '1', username: 'rizky_pratama',   email: 'rizky@mail.com',   role: 'user'  as Role, status: 'active' as Status, bookings: 2, joined: '10 Jan 2026' },
  { id: '2', username: 'sari_dewi',       email: 'sari@mail.com',    role: 'user'  as Role, status: 'active' as Status, bookings: 1, joined: '15 Jan 2026' },
  { id: '3', username: 'andi_firmansyah', email: 'andi@mail.com',    role: 'user'  as Role, status: 'active' as Status, bookings: 1, joined: '20 Feb 2026' },
  { id: '4', username: 'maya_lestari',    email: 'maya@mail.com',    role: 'user'  as Role, status: 'active' as Status, bookings: 1, joined: '5 Mar 2026'  },
  { id: '5', username: 'doni_wahyu',      email: 'doni@mail.com',    role: 'user'  as Role, status: 'banned' as Status, bookings: 1, joined: '12 Mar 2026' },
  { id: '6', username: 'fera_anggraini',  email: 'fera@mail.com',    role: 'user'  as Role, status: 'active' as Status, bookings: 1, joined: '1 Apr 2026'  },
  { id: '7', username: 'hendra_putra',    email: 'hendra@mail.com',  role: 'user'  as Role, status: 'active' as Status, bookings: 1, joined: '3 Apr 2026'  },
  { id: '8', username: 'admin_zona',      email: 'admin@zonapuncak.id', role: 'admin' as Role, status: 'active' as Status, bookings: 0, joined: '1 Jan 2026'  },
]

const ROLE_STYLE: Record<Role, string>   = { user: 'bg-border text-text-muted', admin: 'bg-forest/15 text-forest-text' }
const STATUS_STYLE: Record<Status, string> = { active: 'bg-success/15 text-success', banned: 'bg-error/15 text-error' }

export default function MiminUsersPage() {
  const [users, setUsers]   = useState(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole]     = useState<Role | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all')

  const filtered = users.filter((u) => {
    const matchSearch = u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = filterRole   === 'all' || u.role   === filterRole
    const matchStatus = filterStatus === 'all' || u.status === filterStatus
    return matchSearch && matchRole && matchStatus
  })

  function toggleRole(id: string) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u))
  }
  function toggleBan(id: string) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' } : u))
  }

  const counts = { total: users.length, admin: users.filter(u => u.role === 'admin').length, banned: users.filter(u => u.status === 'banned').length }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">

      <div>
        <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
        <p className="text-sm text-text-muted mt-0.5">{counts.total} pengguna · {counts.admin} admin · {counts.banned} dibanned</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[['Total Users', counts.total, 'bg-border text-text-secondary'], ['Admin', counts.admin, 'bg-forest/15 text-forest-text'], ['Dibanned', counts.banned, 'bg-error/15 text-error']].map(([label, val, style]) => (
          <div key={label as string} className="bg-bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-text-primary">{val}</p>
            <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-1', style as string)}>{label as string}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari username atau email..."
            className="w-full pl-9 pr-4 py-2.5 bg-bg-card border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest" />
        </div>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value as Role | 'all')}
          className="px-3.5 py-2.5 bg-bg-card border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-forest">
          <option value="all">Semua Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as Status | 'all')}
          className="px-3.5 py-2.5 bg-bg-card border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-forest">
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="banned">Dibanned</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-section border-b border-border">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">User</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell">Role</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Booking</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">Bergabung</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-text-muted text-sm">Tidak ada user ditemukan.</td></tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id} className={clsx('hover:bg-white/[0.02] transition-colors', u.status === 'banned' && 'opacity-60')}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                      u.role === 'admin' ? 'bg-forest/20 text-forest-text' : 'bg-bg-section text-text-muted')}>
                      {u.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">@{u.username}</p>
                      <p className="text-[11px] text-text-muted">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={clsx('text-[10px] font-semibold px-2.5 py-1 rounded-full', ROLE_STYLE[u.role])}>
                    {u.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={clsx('text-[10px] font-semibold px-2.5 py-1 rounded-full', STATUS_STYLE[u.status])}>
                    {u.status === 'active' ? 'Aktif' : 'Dibanned'}
                  </span>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell text-xs text-text-secondary">{u.bookings} booking</td>
                <td className="px-5 py-4 hidden md:table-cell text-xs text-text-muted">{u.joined}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleRole(u.id)} title={u.role === 'admin' ? 'Hapus admin' : 'Jadikan admin'}
                      className={clsx('p-1.5 rounded-lg transition-colors', u.role === 'admin'
                        ? 'text-forest-text hover:text-text-muted hover:bg-white/5'
                        : 'text-text-muted hover:text-forest hover:bg-forest/10')}>
                      {u.role === 'admin' ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    </button>
                    <button onClick={() => toggleBan(u.id)} title={u.status === 'banned' ? 'Aktifkan' : 'Ban'}
                      className={clsx('p-1.5 rounded-lg transition-colors', u.status === 'banned'
                        ? 'text-error hover:text-success hover:bg-success/10'
                        : 'text-text-muted hover:text-error hover:bg-error/10')}>
                      {u.status === 'banned' ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
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
