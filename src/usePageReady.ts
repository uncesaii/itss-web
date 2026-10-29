import { useEffect, useState } from 'react'
import {
  bottomProjects,
  heroSlides,
  topProjects,
  type ViewId,
} from './content'

const MINIMUM_SKELETON_MS = 300
const MAXIMUM_LOAD_MS = 1800

const aboutImages = [
  '/images/about-lattice.jpg',
  '/images/about-glass.jpg',
  '/images/about-abstract.jpg',
]

const viewImages: Record<ViewId, string[]> = {
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
  contact: ['/images/contact-call.jpg'],
}

const completedImages = new Set<string>()

function preloadImage(src: string) {
  if (completedImages.has(src)) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      completedImages.add(src)
      resolve()
    }
    image.onerror = () => {
      completedImages.add(src)
      resolve()
    }
    image.src = src
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
