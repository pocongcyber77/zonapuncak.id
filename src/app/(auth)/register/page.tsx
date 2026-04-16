import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Daftar',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Buat Akun</h1>
        <p className="text-stone-500 text-sm mb-6">Bergabung dan mulai petualanganmu</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-stone-700 mb-1">Username</label>
            <input
              id="username"
              type="text"
              placeholder="username_kamu"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
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
              placeholder="Min. 8 karakter"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <Button fullWidth>Daftar Sekarang</Button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-4">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-emerald-700 font-semibold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}
