import type { NextConfig } from 'next'

const COMING_SOON = '/coming-soon'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      /* Navbar top-level */
      { source: '/tentang',   destination: COMING_SOON, permanent: false },
      { source: '/jadwal',    destination: COMING_SOON, permanent: false },
      { source: '/gallery',   destination: COMING_SOON, permanent: false },
      { source: '/trip',      destination: COMING_SOON, permanent: false },
      { source: '/community', destination: COMING_SOON, permanent: false },
      { source: '/community/:path*', destination: COMING_SOON, permanent: false },
      /* Download & semua sub-route-nya */
      { source: '/download',        destination: COMING_SOON, permanent: false },
      { source: '/download/:path*', destination: COMING_SOON, permanent: false },
    ]
  },
}

export default nextConfig
