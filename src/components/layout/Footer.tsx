import Link from 'next/link'
import Image from 'next/image'
import { Share2, Phone, Mail } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-3">
              <Image
                src="/logo.png"
                alt="Zona Puncak Indonesia"
                width={140}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              Platform open trip pendakian gunung terpercaya di Indonesia. Bersama kami, setiap puncak bisa kamu raih dengan aman.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Email" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Beranda' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Akun</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/login', label: 'Masuk' },
                { href: '/register', label: 'Daftar' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Zona Puncak Indonesia. All rights reserved.</p>
          <p>Built with love... for Indonesian mountaineers.</p>
        </div>
      </Container>
    </footer>
  )
}
