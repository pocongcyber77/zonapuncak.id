import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi Zona Peta',
  description:
    'Kebijakan privasi Zona Peta. Peta, trek, foto, dan video disimpan di perangkat dan tidak dijual.',
  alternates: { canonical: '/download/app/privacy' },
}

const SUPPORT_EMAIL = 'nathaillah29@gmail.com'

export default function ZonaPetaPrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-20">
      <Container narrow>
        <p className="text-sm font-semibold leading-normal text-forest-text">Zona Peta</p>
        <h1 className="mt-2 font-heading text-[40px] leading-[1.4] text-text-primary">
          Kebijakan Privasi Zona Peta
        </h1>
        <p className="mt-2 text-sm leading-normal text-text-muted">Terakhir diperbarui: 7 Oktober 2026</p>

        <div className="mt-8 flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
          <p>
            Zona Peta (com.zona) adalah aplikasi pemetaan lapangan untuk Android. Aplikasi ini masih Alpha: build yang beredar adalah uji menuju versi lapangan pertama.
          </p>
          <p>
            Zona Peta berorientasi lokal. Peta, pengukuran, trek, foto, dan video disimpan di perangkat. Zona Peta tidak menjual data pribadi dan tidak menampilkan iklan pihak ketiga.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Siapa yang bertanggung jawab</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Pengembang Zona Peta. Pertanyaan privasi dikirim ke{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-forest-text">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Data yang diproses</h2>
          <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
            <p>
              <span className="font-semibold text-text-primary">Akun. </span>
              Nama tampilan, email, dan cara masuk (email atau Google). Kata sandi akun email disimpan di perangkat sebagai hash ber-salt, bukan sebagai teks terbuka. Tidak ada server akun Zona.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Email verifikasi. </span>
              Saat pendaftaran dengan email dan kata sandi, aplikasi meminta izin Google gmail.send untuk mengirim satu email ke alamat yang diisi. Isi email hanya kode verifikasi 6 digit. Aplikasi tidak membaca, mengubah, atau menghapus isi Gmail. Izin itu hanya untuk pesan pendaftaran itu.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Lokasi. </span>
              Lokasi akurat dan perkiraan untuk posisi di peta, watermark kamera, rekaman trek GPX, dan pengukuran area GPS. Lokasi latar belakang hanya berjalan setelah rekaman trek atau area dimulai, termasuk saat layar mati.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Sensor. </span>
              Kompas, magnetometer, giroskop, dan sensor gerak untuk arah dan orientasi peta. Pengenalan aktivitas dipakai untuk membedakan gerak dan diam saat rekaman, supaya pemakaian baterai lebih hemat. Getaran dipakai untuk umpan balik sentuh.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Kamera, mikrofon, dan media. </span>
              Foto serta video saat Kamera Lapangan dipakai. Mikrofon merekam suara video. Berkas yang dipilih sendiri (peta, lampiran, logo) dibaca lewat pemilih berkas Android. Foto dan video bisa disimpan di galeri perangkat jika pengguna mengekspornya.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Bluetooth. </span>
              Opsional, hanya jika penerima GPS eksternal dihubungkan.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Jaringan. </span>
              Koneksi internet dipakai untuk masuk Google, mengirim email verifikasi, dan mengunduh ubin peta online saat fitur peta online dipakai. Status jaringan dan Wi-Fi dibaca untuk mengetahui apakah perangkat tersambung.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Notifikasi. </span>
              Status impor peta dan rekaman yang sedang berjalan.
            </p>
            <p>
              <span className="font-semibold text-text-primary">Diagnostik. </span>
              Log teknis tetap di perangkat untuk menelusuri gangguan. Log itu tidak dikirim otomatis ke server Zona Peta.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Untuk apa data itu dipakai</h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-6 text-base leading-relaxed text-text-secondary">
            <li>Membuka fitur peta setelah pengguna masuk.</li>
            <li>Menempatkan posisi, arah, ukuran, jejak, dan foto pada lembar peta.</li>
            <li>Menyimpan hasil kerja di perangkat, atau di folder yang dipilih saat mengekspor.</li>
            <li>Mengirim satu kode verifikasi pendaftaran.</li>
            <li>Menjaga rekaman dan impor tetap berjalan lewat layanan latar depan, dengan notifikasi.</li>
            <li>Mengenali tingkat akun (Regular atau Premium) di perangkat dari email yang sedang masuk.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Yang tidak dilakukan</h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-6 text-base leading-relaxed text-text-secondary">
            <li>Peta, trek, foto, dan video tidak diunggah ke server Zona.</li>
            <li>Isi kotak Gmail tidak dibaca.</li>
            <li>Data tidak dijual dan tidak dibagikan ke jaringan iklan.</li>
            <li>ID iklan tidak dipakai.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Pihak lain</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Masuk akun dan pengiriman email verifikasi diproses oleh Google sesuai kebijakan Google. Unduhan peta online mengirim permintaan ke penyedia ubin peta saat fitur itu dipakai, sebatas untuk menampilkan peta. Jika pengguna mengekspor atau membagikan berkas lewat aplikasi lain, pemrosesan mengikuti kebijakan layanan tersebut.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Penyimpanan</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Data tetap di perangkat sampai aplikasi dihapus, berkas dihapus, akun dihapus dari perangkat, atau penyimpanan aplikasi dibersihkan. Keluar akun mengakhiri sesi dan tetap menyimpan daftar akun email di perangkat. Hapus akun permanen menghapus akun lokal itu dari perangkat sehingga akun tersebut tidak bisa masuk lagi. Akun Google sendiri tetap ada di Google. Peta, trek, dan foto tetap di perangkat sampai dihapus terpisah. Cadangan sistem Android dapat mencakup data aplikasi sesuai pengaturan perangkat.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Izin yang sensitif</h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-6 text-base leading-relaxed text-text-secondary">
            <li>Lokasi latar belakang: melanjutkan rekaman GPX atau area GPS setelah aplikasi ditinggalkan.</li>
            <li>Layanan latar depan: notifikasi saat impor peta atau rekaman aktif.</li>
            <li>Pengecualian hemat baterai: opsional, agar rekaman tidak diputus oleh sistem pada sebagian perangkat.</li>
            <li>Kamera dan mikrofon: Kamera Lapangan.</li>
            <li>Bluetooth: penerima GPS eksternal, jika dihubungkan.</li>
            <li>Mulai setelah perangkat dinyalakan ulang: melanjutkan sesi rekaman yang masih berjalan.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Anak-anak</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Zona Peta ditujukan untuk pengguna dewasa dan kerja lapangan. Aplikasi tidak ditujukan untuk anak di bawah 13 tahun, atau di bawah usia minimum yang berlaku di wilayah pengguna.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Perubahan</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Kebijakan ini dapat diperbarui. Tanggal di bagian atas menunjukkan revisi terbaru.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl leading-[1.4] text-text-primary">Kontak</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex min-h-[44px] items-center text-forest-text">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </section>

        <Link
          href="/download/app"
          className="mt-12 inline-flex min-h-[44px] items-center text-base leading-normal text-forest-text"
        >
          Kembali ke Zona Peta
        </Link>
      </Container>
    </div>
  )
}
