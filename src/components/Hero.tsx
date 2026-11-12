import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import type { ViewId } from '../content'
import { pathForView } from '../routes'
import './Hero.css'

type HeroProps = {
  onNavigate: (view: ViewId) => void
}

type HeroTransition = 'fade' | 'curtain-vertical' | 'curtain-2'

type HeroSlide = {
  id: string
  align: 'left' | 'center'
  title: string
  lead: string
  image: string
  position: string
  transition: HeroTransition
}

const slides: HeroSlide[] = [
  {
    id: 'build',
    align: 'left',
    title: 'Building the next generation of IT innovators.',
    lead: 'The Information Technology Student Society helps students learn by shipping real work - through workshops, hackathons and a community that builds together.',
    image: '/hero/hero-lorum.jpg',
    position: '50% 46%',
    transition: 'fade',
  },
  {
    id: 'community',
    align: 'center',
    title: 'Find your people. Make your mark.',
    lead: 'From weekly build nights to campus-wide projects, ITSS gives every member a place to grow, contribute and lead.',
    image: '/hero/hero-aperture.jpg',
    position: '32% 50%',
    transition: 'curtain-vertical',
  },
  {
    id: 'voices',
    align: 'center',
    title: 'We are stronger when we build together.',
    lead: 'A student-led community for people who build, break and learn technology together at Cavite State University - Silang Campus.',
    image: '/hero/hero-community.jpg',
    position: '50% 50%',
    transition: 'curtain-2',
  },
]

const SLIDE_INTERVAL = 5000
const STRIP_COUNT = 5
const STRIP_STEP = 100 / STRIP_COUNT
const TRANSITION_MS: Record<HeroTransition, number> = {
  fade: 600,
  'curtain-vertical': 1250,
  'curtain-2': 1150,
}
const STRIP_STAGGER: Record<HeroTransition, number> = {
  fade: 0,
  'curtain-vertical': 60,
  'curtain-2': 50,
}

function ExternalLinkIcon() {
  return (
    <svg
      className="hero__btn-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  )
}

type HeroCopyProps = {
  slide: HeroSlide
  interactive: boolean
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, view: ViewId) => void
}

function HeroCopy({ slide, interactive, onNavigate }: HeroCopyProps) {
  return (
    <>
      <h1 className="hero__title">{slide.title}</h1>
      <p className="hero__lead">{slide.lead}</p>
      <div className="hero__actions">
        <a
          className="btn btn--light"
          href={pathForView('contact')}
          tabIndex={interactive ? undefined : -1}
          onClick={
            interactive && onNavigate
              ? (event) => onNavigate(event, 'contact')
              : undefined
          }
        >
          <span>Contact us now</span>
          <ExternalLinkIcon />
        </a>
        <a
          className="btn btn--primary"
          href={pathForView('gallery')}
          tabIndex={interactive ? undefined : -1}
          onClick={
            interactive && onNavigate
              ? (event) => onNavigate(event, 'gallery')
              : undefined
          }
        >
          <span>About ITSS</span>
        </a>
      </div>
    </>
  )
}

type StripImageProps = {
  slide: HeroSlide
  index: number
}

function StripImage({ slide, index }: StripImageProps) {
  return (
    <img
      src={slide.image}
      alt=""
      className="hero__strip-image"
      style={{ left: `${-index * 100}%`, objectPosition: slide.position }}
      decoding="async"
    />
  )
}

function CurtainVerticalLayer({ to }: { to: HeroSlide }) {
  return (
    <div className="hero__strips" aria-hidden="true">
      {Array.from({ length: STRIP_COUNT }, (_, index) => {
        const delay = index * STRIP_STAGGER['curtain-vertical']
        return (
          <div
            className="hero__strip"
            key={index}
            style={{ left: `${index * STRIP_STEP}%` }}
          >
            <div className="hero__strip-slide" style={{ animationDelay: `${delay}ms` }}>
              <StripImage slide={to} index={index} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CurtainTwoLayer({ from, to }: { from: HeroSlide; to: HeroSlide }) {
  return (
    <div className="hero__strips hero__strips--curtain" aria-hidden="true">
      {Array.from({ length: STRIP_COUNT }, (_, index) => {
        const delay = (STRIP_COUNT - 1 - index) * STRIP_STAGGER['curtain-2']
        return (
          <div
            className="hero__strip"
            key={index}
            style={{ left: `${index * STRIP_STEP}%` }}
          >
            <div
              className="hero__curtain hero__curtain--out"
              style={{ animationDelay: `${delay}ms` }}
            >
              <StripImage slide={from} index={index} />
            </div>
            <div
              className="hero__curtain hero__curtain--in"
              style={{ animationDelay: `${delay}ms` }}
            >
              <StripImage slide={to} index={index} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Hero({ onNavigate }: HeroProps) {
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState<number | null>(null)
  const activeRef = useRef(0)
  const lockRef = useRef(false)
  const cleanupRef = useRef<number | null>(null)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    slides.forEach((item) => {
      const image = new Image()
      image.src = item.image
      image.decode?.().catch(() => undefined)
    })
  }, [])

  useEffect(
    () => () => {
      if (cleanupRef.current) window.clearTimeout(cleanupRef.current)
    },
    [],
  )

  const advance = useCallback((resolveNext: (current: number) => number) => {
    if (lockRef.current) return

    const prev = activeRef.current
    const next = ((resolveNext(prev) % slides.length) + slides.length) % slides.length
    if (next === prev) return

    lockRef.current = true
    setLeaving(prev)
    setActive(next)

    if (cleanupRef.current) window.clearTimeout(cleanupRef.current)
    cleanupRef.current = window.setTimeout(() => {
      setLeaving(null)
      lockRef.current = false
      cleanupRef.current = null
    }, TRANSITION_MS[slides[next].transition])
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(
      () => advance((current) => current + 1),
      SLIDE_INTERVAL,
    )
    return () => window.clearInterval(timer)
  }, [advance, active])

  const goTo = (index: number) => {
    const next = (index + slides.length) % slides.length
    if (next === activeRef.current) return
    advance(() => next)
  }

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, view: ViewId) => {
    event.preventDefault()
    onNavigate(view)
  }

  const slide = slides[active]

  return (
    <section className="hero" id="main" aria-label="ITSS introduction">
      <div
        className={`hero__media${
          leaving !== null && slide.transition !== 'fade' ? ' is-curtain' : ''
        }`}
        aria-hidden="true"
      >
        {slides.map((item, index) => (
          <div
            className={`hero__slide hero__slide--${item.transition}${
              index === active ? ' is-active' : ''
            }${index === leaving ? ' is-leaving' : ''}`}
            key={item.id}
          >
            <img
              src={item.image}
              alt=""
              className="hero__image"
              style={{ objectPosition: item.position }}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
        {leaving !== null && slide.transition === 'curtain-vertical' ? (
          <CurtainVerticalLayer to={slide} />
        ) : null}
        {leaving !== null && slide.transition === 'curtain-2' ? (
          <CurtainTwoLayer from={slides[leaving]} to={slide} />
        ) : null}
        <div className="hero__shade" />
      </div>

      <div className="container hero__inner">
        <div className={`hero__content hero__content--${slide.align}`}>
          {leaving !== null ? (
            <div
              className={`hero__copy hero__copy--leaving hero__copy--${slides[leaving].align}`}
              aria-hidden="true"
              key={`leave-${slides[leaving].id}`}
            >
              <HeroCopy slide={slides[leaving]} interactive={false} />
            </div>
          ) : null}

          <div key={`copy-${slide.id}`} className="hero__copy">
            <HeroCopy slide={slide} interactive onNavigate={handleNavigate} />
          </div>
        </div>

        <div className="hero__dots" role="group" aria-label="Choose a slide">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`hero__dot${index === active ? ' is-active' : ''}`}
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-pressed={index === active}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}