import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Masuk' }

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Masuk</h1>
        <p className="text-stone-500 text-sm mb-6">Masuk untuk melanjutkan ke Zona Puncak</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email@kamu.com"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <Button fullWidth>Masuk</Button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-4">
          Belum punya akun?{' '}
          <Link href="/register" className="text-emerald-700 font-semibold hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  )
}
