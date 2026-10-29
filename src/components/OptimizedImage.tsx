import type { ImgHTMLAttributes } from 'react'
import type { Picture } from 'vite-imagetools'
import type { SiteImage } from '../images'

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> & {
  image: SiteImage
  sizes?: string
  width?: number
  height?: number
}

const modernFormats = new Set(['avif', 'webp'])

function getFallbackSource(sources: Picture['sources']): string | undefined {
  if (sources.jpeg) return sources.jpeg
  if (sources.jpg) return sources.jpg
  if (sources.png) return sources.png
  return undefined
}

export function OptimizedImage({
  image,
  sizes = image.sizes,
  alt,
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  ...imgProps
}: OptimizedImageProps) {
  const fallbackSrcSet = getFallbackSource(image.sources)
  const sources = Object.entries(image.sources).filter(([format]) => modernFormats.has(format))

  return (
    <picture>
      {sources.map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        {...imgProps}
        src={image.img.src}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        width={width ?? image.img.w}
        height={height ?? image.img.h}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  )
}