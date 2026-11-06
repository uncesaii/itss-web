import { useEffect, useState, type MouseEvent } from 'react'
import type { ViewId } from '../content'
import { images } from '../images'
import { pathForView } from '../routes'
import { OptimizedImage } from './OptimizedImage'
import { ArrowRight } from './ArrowRight'
import './Hero.css'

type HeroProps = {
  onNavigate: (view: ViewId) => void
}

const slides = [
  {
    id: 'build',
    eyebrow: 'Cavite State University — Silang Campus',
    title: 'Building the next generation of IT innovators.',
    lead: 'The Information Technology Student Society helps students learn by shipping real work — through workshops, hackathons and a community that builds together.',
    image: images.heroLorum,
    position: '50% 48%',
  },
  {
    id: 'community',
    eyebrow: 'Learn · Build · Lead',
    title: 'Find your people. Make your mark.',
    lead: 'From weekly build nights to campus-wide projects, ITSS gives every member a place to grow, contribute and lead.',
    image: images.heroAperture,
    position: '32% 50%',
  },
]

export function Hero({ onNavigate }: HeroProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length)
    }, 7500)

    return () => window.clearInterval(timer)
  }, [active])

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length)
  }

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, view: ViewId) => {
    event.preventDefault()
    onNavigate(view)
  }

  return (
    <section className="hero" id="main" aria-label="ITSS introduction">
      <div className="hero__media" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            className={`hero__slide${index === active ? ' is-active' : ''}`}
            key={slide.id}
          >
            <OptimizedImage
              image={slide.image}
              alt=""
              sizes="100vw"
              loading={index === 0 ? 'eager' : 'lazy'}
              className="hero__image"
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
        <div className="hero__shade" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__copy" key={slides[active].id}>
            <p className="hero__eyebrow">{slides[active].eyebrow}</p>
            <h1 className="hero__title">{slides[active].title}</h1>
            <p className="hero__lead">{slides[active].lead}</p>
          </div>

          <div className="hero__actions">
            <a
              className="btn btn--light"
              href={pathForView('contact')}
              onClick={(event) => handleNavigate(event, 'contact')}
            >
              <span>Join the society</span>
              <ArrowRight />
            </a>
            <a
              className="btn btn--outline-light"
              href={pathForView('projects')}
              onClick={(event) => handleNavigate(event, 'projects')}
            >
              <span>Explore programs</span>
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className="hero__bar">
          <div className="hero__dots" role="group" aria-label="Choose a slide">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`hero__dot${index === active ? ' is-active' : ''}`}
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                aria-pressed={index === active}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <div className="hero__nav">
            <span className="hero__counter" aria-hidden="true">
              {String(active + 1).padStart(2, '0')}
              <span className="hero__counter-rule" />
              {String(slides.length).padStart(2, '0')}
            </span>
            <button
              className="hero__arrow hero__arrow--prev"
              type="button"
              aria-label="Previous slide"
              onClick={() => goTo(active - 1)}
            >
              <ArrowRight />
            </button>
            <button
              className="hero__arrow"
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(active + 1)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
