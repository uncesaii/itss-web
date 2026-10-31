import type { MouseEvent } from 'react'
import type { ViewId } from '../content'
import { pathForView } from '../routes'
import { ArrowRight } from './ArrowRight'
import './NotFound.css'

type NotFoundProps = {
  onNavigate: (view: ViewId) => void
}

export function NotFound({ onNavigate }: NotFoundProps) {
  const handleHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate('main')
  }

  return (
    <section className="not-found section" aria-labelledby="not-found-title">
      <div className="container not-found__inner">
        <p className="not-found__eyebrow">404</p>
        <h1 className="section-title" id="not-found-title">
          Page not found
        </h1>
        <p className="not-found__text">
          The page you are looking for does not exist or has moved.
        </p>
        <a
          className="btn btn--dark not-found__cta"
          href={pathForView('main')}
          onClick={handleHome}
        >
          <span>Back to home</span>
          <ArrowRight />
        </a>
      </div>
    </section>
  )
}
