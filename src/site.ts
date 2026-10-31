export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://itss.cvsusc.org'
).replace(/\/+$/, '')

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
