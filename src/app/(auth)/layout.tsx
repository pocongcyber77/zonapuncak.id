import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <div className="p-5 border-b border-border">
        <Link href="/" className="inline-flex">
          <Image
            src="/logo.png"
            alt="Zona Puncak Indonesia"
            width={120}
            height={36}
            className="h-8 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
          />
        </Link>
      </div>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <p className="text-center text-xs text-text-muted py-4">
        © {new Date().getFullYear()} Zona Puncak Indonesia
      </p>
    </div>
  )
}
