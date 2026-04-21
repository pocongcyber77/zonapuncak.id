import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Masuk',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-bg-card rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Masuk</h1>
        <p className="text-text-muted text-sm mb-6">Masuk untuk melanjutkan ke Zona Puncak</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="email@kamu.com"
              className="w-full px-4 py-2.5 rounded-lg bg-bg-section text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-bg-section text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200 text-sm"
            />
          </div>
          <Button fullWidth>Masuk</Button>
        </form>

        <div className="h-px bg-white/5 my-5" />

        <p className="text-center text-sm text-text-muted">
          Belum punya akun?{' '}
          <Link href="/register" className="text-forest-text hover:text-forest-hover font-semibold transition-colors duration-200">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  )
}
