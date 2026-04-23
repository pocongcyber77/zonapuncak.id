import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DevBanner from '@/components/ui/DevBanner'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar transparent />
      <main className="flex-1">{children}</main>
      <Footer />
      <DevBanner />
    </>
  )
}
