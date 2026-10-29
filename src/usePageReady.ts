import { useEffect, useState } from 'react'
import {
  bottomProjects,
  heroSlides,
  topProjects,
  type ViewId,
} from './content'
import { images, type SiteImage } from './images'

const MINIMUM_SKELETON_MS = 300
const MAXIMUM_LOAD_MS = 1800

const aboutImages: SiteImage[] = [
  images.aboutLattice,
  images.aboutGlass,
  images.aboutAbstract,
]

const viewImages: Record<ViewId, SiteImage[]> = {
  main: [...heroSlides.map((slide) => slide.image), ...aboutImages],
  gallery: aboutImages,
  mission: [],
  vision: [],
  'quality-policy': [],
  cbl: [],
  executive: [],
  projects: [...topProjects, ...bottomProjects].map((project) => project.image),
  announcements: [],
  'learning-materials': [],
  contact: [images.contactCall],
}

const completedImages = new Set<string>()

function preloadImage(asset: SiteImage) {
  const cacheKey = asset.img.src
  if (completedImages.has(cacheKey)) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    // Preload the modern format if available, otherwise fallback
    const modernSrcSet = asset.sources.avif ?? asset.sources.webp
    if (modernSrcSet) {
      img.srcset = modernSrcSet
      img.sizes = asset.sizes
    }
    img.onload = () => {
      completedImages.add(cacheKey)
      resolve()
    }
    img.onerror = () => {
      completedImages.add(cacheKey)
      resolve()
    }
    img.src = asset.img.src
  })
}

export function usePageReady(view: ViewId) {
  const [readyView, setReadyView] = useState<ViewId | null>(null)

  useEffect(() => {
    let cancelled = false
    let maximumTimer: number | undefined

    const minimumDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MINIMUM_SKELETON_MS)
    })
    const maximumDelay = new Promise<void>((resolve) => {
      maximumTimer = window.setTimeout(resolve, MAXIMUM_LOAD_MS)
    })
    const assets = Promise.allSettled([
      ...viewImages[view].map(preloadImage),
      document.fonts.ready,
    ])

    void Promise.race([Promise.all([assets, minimumDelay]), maximumDelay]).then(() => {
      if (!cancelled) {
        setReadyView(view)
      }
    })

    return () => {
      cancelled = true
      if (maximumTimer !== undefined) {
        window.clearTimeout(maximumTimer)
      }
    }
  }, [view])

  return readyView === view
}