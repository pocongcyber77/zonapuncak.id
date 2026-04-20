import Link from 'next/link'
import Image from 'next/image'
import { Share2, Phone, Mail } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-border">
      <Container>
        <div className="py-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-3">
              <Image
                src="/logo.png"
                alt="Zona Puncak Indonesia"
                width={140}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert opacity-80"
              />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Open Trip dan Komunitas pendakian gunung terpercaya di Indonesia. Bersama kami, setiap puncak bisa kamu raih dengan aman.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="text-text-muted hover:text-forest transition-colors duration-200">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-text-muted hover:text-forest transition-colors duration-200">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Email" className="text-text-muted hover:text-forest transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-text-primary font-semibold mb-3 text-sm uppercase tracking-wide">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Beranda' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-forest transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun */}
          <div>
            <h3 className="text-text-primary font-semibold mb-3 text-sm uppercase tracking-wide">Akun</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/login', label: 'Masuk' },
                { href: '/register', label: 'Daftar' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-forest transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-4 flex flex-col xs:flex-row items-center justify-between gap-2 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} Zona Puncak Indonesia. All rights reserved.</p>
          <p>Built with love... for Indonesian mountaineers.</p>
        </div>
      </Container>
    </footer>
  )
}
