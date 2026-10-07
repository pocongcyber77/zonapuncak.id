import type { NextConfig } from 'next'

const COMING_SOON = '/coming-soon'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 88, 90, 92],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      /* Navbar top-level */
      // '/tentang', '/jadwal', '/trip', '/gallery' sudah live
      { source: '/community', destination: COMING_SOON, permanent: false },
      { source: '/community/:path*', destination: COMING_SOON, permanent: false },
      /* Download masih segera hadir. /download/app dan /download/app/privacy tetap hidup. */
      { source: '/download', destination: COMING_SOON, permanent: false },
      { source: '/download/peta-pendakian', destination: COMING_SOON, permanent: false },
      { source: '/download/modul-materi', destination: COMING_SOON, permanent: false },
      { source: '/download/informasi', destination: COMING_SOON, permanent: false },
      { source: '/download/gpx', destination: COMING_SOON, permanent: false },
      { source: '/download/sertifikat-pendakian', destination: COMING_SOON, permanent: false },
    ]
  },
}

export default nextConfig
