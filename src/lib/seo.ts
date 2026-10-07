export const SITE_NAME = 'Zona Puncak Indonesia'
export const SITE_DESCRIPTION =
  'Open trip pendakian gunung profesional di Indonesia. Jelajahi puncak, gabung komunitas, dan mulai petualangan aman bersama guide berpengalaman.'

const fallbackUrl = 'https://zonapuncak.id'
const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

export const SITE_URL = envUrl
  ? envUrl.startsWith('http')
    ? envUrl
    : `https://${envUrl}`
  : fallbackUrl

export const OG_IMAGE = '/hero-1.webp'
