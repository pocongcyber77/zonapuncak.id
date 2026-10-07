import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Camera,
  Compass,
  Crosshair,
  Layers,
  Map,
  Mountain,
  Route,
  Ruler,
  UserRound,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import StoreRail from '@/components/download/StoreRail'

export const metadata: Metadata = {
  title: 'Zona Peta',
  description:
    'Zona Peta adalah alat navigasi dan GIS untuk Android. Peta, trek, dan foto tinggal di perangkat.',
  alternates: { canonical: '/download/app' },
}

const screenshots = [
  {
    src: '/3.turn-your-map-into-3d-topo-map.jpg',
    title: 'Medan 3D',
    caption: 'Kontur pada peta diangkat menjadi permukaan.',
  },
  {
    src: '/6.gnss-monitoring.jpg',
    title: 'Pemantau satelit',
    caption: 'Kualitas sinyal GPS tampil di perangkat.',
  },
  {
    src: '/7.magnetic-monitoring.jpg',
    title: 'Kompas',
    caption: 'Arah dan gangguan medan magnet bisa dipantau.',
  },
  {
    src: '/1.map-collection.jpg',
    title: 'Koleksi peta',
    caption: 'GeoPDF tersimpan dan dibuka tanpa jaringan.',
  },
  {
    src: '/4.multi-pages-map-import.jpg',
    title: 'Buku peta',
    caption: 'Beberapa lembar disusun dalam satu tampilan.',
  },
  {
    src: '/5.georeference-your-map.jpg',
    title: 'Georeferensi',
    caption: 'Peta diikat ke bumi lewat titik kontrol.',
  },
  {
    src: '/2.import-your-own-map.jpg',
    title: 'Peta sendiri',
    caption: 'Posisi dan jejak menempel pada lembar peta.',
  },
]

const capabilities = [
  {
    icon: Map,
    title: 'Peta sendiri dipakai offline',
    body: 'GeoPDF diimpor ke dalam aplikasi dan dibuka tanpa jaringan. Peta online tetap ada sebagai latar.',
  },
  {
    icon: Compass,
    title: 'Posisi dan arah',
    body: 'Titik GPS tampil di peta. Kompas memakai sensor ponsel, bisa dikalibrasi, dan ada pemantau medan magnet.',
  },
  {
    icon: Ruler,
    title: 'Ukur di atas peta',
    body: 'Garis lurus, rute, poligon, kotak, lingkaran, area bebas, dan area yang direkam dengan GPS.',
  },
  {
    icon: Route,
    title: 'Jejak GPX',
    body: 'Rekaman bisa jalan saat layar mati, titik jalur bisa ditambah, trek bisa dilanjutkan, lalu diekspor sebagai GPX.',
  },
  {
    icon: Crosshair,
    title: 'Georeferensi',
    body: 'Peta atau foto yang belum punya koordinat diikat ke bumi lewat titik kontrol.',
  },
  {
    icon: Layers,
    title: 'Lembar peta banyak halaman',
    body: 'Beberapa lembar bisa disusun sebagai buku peta.',
  },
  {
    icon: Mountain,
    title: 'Medan 3D',
    body: 'Kontur pada peta diangkat menjadi permukaan, dengan gambar peta menempel di atasnya.',
  },
  {
    icon: Camera,
    title: 'Kamera lapangan',
    body: 'Foto dan video membawa watermark koordinat.',
  },
  {
    icon: UserRound,
    title: 'Akun',
    body: 'Masuk dengan email atau Google. Akun Premium membuka georeferensi, multipage, 3D, dan ekspor selain GPX. Akun Regular tetap bisa impor peta tanpa batas, mengukur garis lurus, dan mengekspor GPX.',
  },
]

export default function ZonaPetaPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-20">
      <Container>
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-bg-card">
            <Image
              src="/logo.png"
              alt="Ikon Zona Peta"
              width={96}
              height={96}
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-normal text-forest-text">Alpha · Android</p>
            <h1 className="font-heading text-[40px] leading-[1.4] text-text-primary sm:text-[48px]">
              Zona Peta
            </h1>
            <p className="text-base leading-normal text-forest-text">SAR Penanggungan</p>
            <p className="mt-2 text-sm leading-normal text-text-muted">Alat navigasi dan GIS · Data di perangkat</p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-forest px-8 text-base font-semibold leading-normal text-white transition-colors duration-200 hover:bg-forest-hover"
            >
              Pasang
            </button>
            <p className="text-sm leading-normal text-text-muted">App belum tersedia</p>
            <Link
              href="/download/app/privacy"
              className="inline-flex min-h-[44px] items-center text-sm leading-normal text-forest-text"
            >
              Kebijakan Privasi
            </Link>
          </div>
        </header>

        <div className="mt-12">
          <StoreRail title="Cuplikan">
            {screenshots.map((shot) => (
              <article key={shot.src} className="flex w-[240px] shrink-0 snap-start flex-col">
                <div className="overflow-hidden rounded-2xl bg-bg-card">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={1080}
                    height={2340}
                    sizes="240px"
                    quality={90}
                    className="h-auto w-full"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-[1.4] text-text-primary">{shot.title}</h3>
                <p className="mt-2 text-sm leading-normal text-text-secondary">{shot.caption}</p>
              </article>
            ))}
          </StoreRail>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-heading text-[32px] leading-[1.4] text-text-primary">Tentang aplikasi</h2>
          <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
            <p>
              Zona Peta adalah alat navigasi dan GIS untuk Android. Pengguna membawa peta yang sudah ada, misalnya GeoPDF atau peta hasil pindai, lalu memakai GPS, kompas, pengukuran, dan rekaman jejak di atas lembar peta itu. Data peta, trek, dan foto tinggal di perangkat.
            </p>
            <p>
              Aplikasi ini masih Alpha. Build yang beredar adalah uji menuju versi lapangan pertama. Sebagian alur masih disempurnakan, dan masukan dari pemakaian langsung dipakai untuk memperbaiki perilaku aplikasi.
            </p>
          </div>
        </section>

        <div className="mt-16">
          <StoreRail title="Kemampuan">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="flex w-[320px] shrink-0 snap-start flex-col gap-4 rounded-2xl bg-bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded bg-bg-section">
                  <item.icon className="h-5 w-5 text-forest-text" aria-hidden />
                </div>
                <h3 className="text-xl font-semibold leading-[1.4] text-text-primary">{item.title}</h3>
                <p className="text-base leading-relaxed text-text-secondary">{item.body}</p>
              </article>
            ))}
          </StoreRail>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary">
            Unduh peta jadi paket dan impor paket peta belum dibuka di versi Alpha ini.
          </p>
        </div>

        <section className="mt-16 rounded-3xl bg-bg-section p-8 sm:p-12">
          <h2 className="font-heading text-[32px] leading-[1.4] text-text-primary">Yang membedakan</h2>
          <p className="mt-4 max-w-4xl text-xl leading-relaxed text-text-secondary">
            Zona Peta berpusat pada lembar peta yang dibawa pengguna. Peta itu menjadi kanvas kerja: posisi, arah, ukuran, jejak, dan foto menempel pada lembar yang sama. Hasil kerja tetap di perangkat, dan tidak diunggah ke server Zona.
          </p>
        </section>
      </Container>
    </div>
  )
}
