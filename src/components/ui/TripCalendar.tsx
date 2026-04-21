'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import type { TripBatch, AgendaItem, AgendaType } from '@/types'

/* ── Helpers ─────────────────────────────────────── */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfWeek(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7
}
function toYMD(date: Date) {
  return date.toISOString().slice(0, 10)
}
function fmt(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* ── Agenda type config ──────────────────────────── */
const AGENDA_CFG: Record<AgendaType, { label: string; dot: string; badge: string; icon: string }> = {
  briefing:  { label: 'Briefing',  dot: 'bg-gold',    badge: 'bg-gold/15 text-gold',              icon: '🗣️' },
  departure: { label: 'Berangkat', dot: 'bg-forest',  badge: 'bg-forest/20 text-white',           icon: '🚌' },
  summit:    { label: 'Summit',    dot: 'bg-white',   badge: 'bg-white/10 text-white',            icon: '🏔️' },
  descent:   { label: 'Turun',     dot: 'bg-border',  badge: 'bg-bg-section text-text-muted',     icon: '🪂' },
  finish:    { label: 'Selesai',   dot: 'bg-success', badge: 'bg-success/15 text-success',        icon: '🎉' },
  info:      { label: 'Info',      dot: 'bg-border',  badge: 'bg-bg-section text-text-secondary', icon: 'ℹ️' },
}

/* ── Props ───────────────────────────────────────── */
interface TripCalendarProps {
  batches: TripBatch[]
  selectedBatchId?: string
  onSelectBatch?: (id: string) => void
}

export default function TripCalendar({ batches, selectedBatchId, onSelectBatch }: TripCalendarProps) {
  const allAgendas = useMemo<AgendaItem[]>(
    () => batches.flatMap((b) => b.agendas),
    [batches],
  )

  const agendaMap = useMemo(() => {
    const map: Record<string, AgendaItem[]> = {}
    for (const a of allAgendas) {
      if (!map[a.date]) map[a.date] = []
      map[a.date].push(a)
    }
    return map
  }, [allAgendas])

  const today = new Date()
  const [viewYear, setViewYear]   = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(() => {
    const sorted = Object.keys(agendaMap).sort()
    return sorted[0] ?? toYMD(today)
  })

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth)
  const firstDOW     = getFirstDayOfWeek(viewYear, viewMonth)
  const todayStr     = toYMD(today)
  const DAYS_HEADER  = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
  const MONTHS       = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const selectedAgendas = selectedDate ? (agendaMap[selectedDate] ?? []) : []

  const cells: (number | null)[] = [
    ...Array(firstDOW).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/* ── Calendar grid ────────────────────────── */}
      <div className="bg-bg-card rounded-2xl p-5 shrink-0 w-full md:w-[320px]">

        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="w-11 h-11 flex items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors duration-150"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-text-primary tracking-wide">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-11 h-11 flex items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors duration-150"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS_HEADER.map((d) => (
            <div key={d} className="text-center text-[10px] font-semibold text-text-muted uppercase tracking-wider py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, idx) => {
            if (!day) return <div key={`blank-${idx}`} />

            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const agendas = agendaMap[dateStr] ?? []
            const hasAgenda = agendas.length > 0
            const isSelected = dateStr === selectedDate
            const isToday = dateStr === todayStr

            const inRange = batches.some(
              (b) => dateStr >= b.start_date && dateStr <= b.end_date,
            )

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={clsx(
                  'relative flex flex-col items-center justify-center rounded-lg min-h-[44px] text-sm transition-all duration-150',
                  isSelected
                    ? 'bg-forest text-white font-semibold'
                    : isToday
                      ? 'bg-forest/20 text-white font-medium'
                      : inRange
                        ? 'text-text-secondary hover:bg-white/10'
                        : 'text-text-muted hover:bg-white/5',
                )}
                aria-label={fmt(dateStr)}
                aria-pressed={isSelected}
              >
                <span className="leading-none">{day}</span>
                {hasAgenda && (
                  <div className="flex gap-1 mt-1">
                    {agendas.slice(0, 3).map((a) => (
                      <span
                        key={a.id}
                        className={clsx(
                          'w-1 h-1 rounded-full',
                          isSelected ? 'bg-white' : AGENDA_CFG[a.type].dot,
                        )}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 flex flex-wrap gap-x-3 gap-y-1.5">
          {(Object.keys(AGENDA_CFG) as AgendaType[]).map((type) => {
            const cfg = AGENDA_CFG[type]
            const hasType = allAgendas.some(a => a.type === type)
            if (!hasType) return null
            return (
              <div key={type} className="flex items-center gap-1">
                <span className={clsx('w-1.5 h-1.5 rounded-full', cfg.dot)} />
                <span className="text-[10px] text-text-muted">{cfg.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Agenda panel ─────────────────────────── */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold text-text-secondary">
            {selectedDate ? fmt(selectedDate) : 'Pilih tanggal'}
          </h3>
          {selectedAgendas.length > 0 && (
            <span className="text-xs text-text-muted">
              {selectedAgendas.length} agenda
            </span>
          )}
        </div>

        {selectedAgendas.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-bg-card rounded-2xl py-14 text-center gap-2">
            <span className="text-[32px] opacity-30">📅</span>
            <p className="text-sm text-text-muted">Tidak ada agenda di tanggal ini</p>
            <p className="text-xs text-text-muted/60">Pilih tanggal yang memiliki titik indikator</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {selectedAgendas
              .sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99'))
              .map((agenda) => {
                const cfg = AGENDA_CFG[agenda.type]
                return (
                  <div
                    key={agenda.id}
                    className="bg-bg-card rounded-2xl p-4 flex gap-3"
                  >
                    <div className="w-9 h-9 rounded bg-bg-section flex items-center justify-center shrink-0 text-base">
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold text-text-primary leading-normal">
                          {agenda.title}
                        </p>
                        <span className={clsx('text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap shrink-0', cfg.badge)}>
                          {cfg.label}
                        </span>
                      </div>
                      {agenda.time && (
                        <div className="flex items-center gap-1 mb-2">
                          <Clock className="w-3 h-3 text-text-muted" />
                          <span className="text-xs text-text-muted">{agenda.time} WIB</span>
                        </div>
                      )}
                      {agenda.body && (
                        <p className="text-xs text-text-muted leading-relaxed">
                          {agenda.body}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        )}

        {/* Batch selector */}
        {batches.length > 1 && (
          <div className="mt-2 pt-3">
            <p className="text-[11px] text-text-muted uppercase tracking-widest mb-2 px-1">
              Lihat jadwal batch lain
            </p>
            <div className="flex flex-wrap gap-2">
              {batches.map((batch) => (
                <button
                  key={batch.id}
                  onClick={() => {
                    onSelectBatch?.(batch.id)
                    setSelectedDate(batch.start_date)
                    const d = new Date(batch.start_date + 'T00:00:00')
                    setViewYear(d.getFullYear())
                    setViewMonth(d.getMonth())
                  }}
                  className={clsx(
                    'text-xs px-3 min-h-[44px] rounded-full transition-all duration-150 flex items-center',
                    selectedBatchId === batch.id
                      ? 'bg-forest text-white'
                      : 'bg-bg-section text-text-muted hover:text-text-primary',
                  )}
                >
                  {batch.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
