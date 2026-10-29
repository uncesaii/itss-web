import { useEffect } from 'react'
import { getSEOConfig, type SEOConfig } from '../seo'
import type { ViewId } from '../content'

function updateMetaTags(config: SEOConfig) {
  document.title = config.title

  const setMeta = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!el) {
      el = document.createElement('meta')
      el.name = name
      document.head.appendChild(el)
    }
    el.content = content
  }

  const setProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', property)
      document.head.appendChild(el)
    }
    el.content = content
  }

  setMeta('description', config.description)
  setMeta('theme-color', '#ffffff')

  if (config.ogTitle) setProperty('og:title', config.ogTitle)
  if (config.ogDescription) setProperty('og:description', config.ogDescription)
  if (config.ogImage) setProperty('og:image', config.ogImage)
  if (config.ogType) setProperty('og:type', config.ogType)
  setProperty('og:url', window.location.href)

  if (config.twitterCard) setMeta('twitter:card', config.twitterCard)
  if (config.twitterSite) setMeta('twitter:site', config.twitterSite)
  if (config.twitterCreator) setMeta('twitter:creator', config.twitterCreator)
}

export function useSEO(view: ViewId) {
  useEffect(() => {
    const config = getSEOConfig(view)
    updateMetaTags(config)
  }, [view])
}