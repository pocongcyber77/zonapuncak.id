import Link from 'next/link'
import { Mountain } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-emerald-700">
          <Mountain className="w-5 h-5" />
          <span>Zona Puncak</span>
        </Link>
      </div>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}
