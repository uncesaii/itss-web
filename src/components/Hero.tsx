import { useState, type MouseEvent } from 'react'
import { heroSlides, type ViewId } from '../content'
import { ArrowRight } from './ArrowRight'
import './Hero.css'

type HeroProps = {
  onNavigate: (view: ViewId) => void
}

export function Hero({ onNavigate }: HeroProps) {
  const [active, setActive] = useState(0)
  const slide = heroSlides[active]
  const current = String(active + 1).padStart(2, '0')
  const total = String(heroSlides.length).padStart(2, '0')

  const changeSlide = (step: number) => {
    setActive((index) => (index + step + heroSlides.length) % heroSlides.length)
  }

  const handleCta = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate('projects')
  }

  return (
    <section className="hero" id="main" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__eyebrow">Project</span>
            <span className="hero__name">{slide.name}</span>
          </h1>

          <div className="hero__bottom">
            <div className="hero__controls" role="group" aria-label="Project slides">
              <button
                className="hero__control hero__control--prev"
                type="button"
                aria-label="Previous project"
                onClick={() => changeSlide(-1)}
              >
                <ArrowRight />
              </button>
              <button
                className="hero__control"
                type="button"
                aria-label="Next project"
                onClick={() => changeSlide(1)}
              >
                <ArrowRight />
              </button>
            </div>

            <div className="hero__counter" aria-hidden="true">
              <span className="hero__counter-current">
                {current.split('').map((digit, index) => (
                  <span key={`${digit}-${index}`}>{digit}</span>
                ))}
              </span>
              <span className="hero__counter-rule" />
              <span className="hero__counter-total">{total}</span>
            </div>
          </div>
        </div>

        <div className="hero__media">
          {heroSlides.map((item, index) => (
            <img
              key={item.id}
              className={`hero__image${index === active ? ' is-active' : ''}`}
              src={item.image}
              alt={item.alt}
              width="770"
              height="829"
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{ objectPosition: item.position }}
              aria-hidden={index !== active}
            />
          ))}

          <a className="btn btn--light hero__cta" href="#projects" onClick={handleCta}>
            <span>View Project</span>
            <ArrowRight />
          </a>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Project {slide.name}, slide {active + 1} of {heroSlides.length}
      </p>
    </section>
  )
}
