import type { ViewId } from '../content'
import './PageSkeleton.css'

type PageSkeletonProps = {
  view: ViewId
}

type SkeletonLinesProps = {
  count?: number
  shortLast?: boolean
}

function SkeletonLines({ count = 3, shortLast = true }: SkeletonLinesProps) {
  return (
    <div className="page-skeleton__lines">
      {Array.from({ length: count }, (_, index) => (
        <span
          className={`page-skeleton__line${
            shortLast && index === count - 1 ? ' page-skeleton__line--short' : ''
          }`}
          key={index}
        />
      ))}
    </div>
  )
}

function AboutSkeletonPanel() {
  return (
    <div className="page-skeleton__about-panel">
      <div className="page-skeleton__about-collage">
        <span className="page-skeleton__block page-skeleton__about-figure page-skeleton__about-figure--one" />
        <span className="page-skeleton__block page-skeleton__about-figure page-skeleton__about-figure--two" />
        <span className="page-skeleton__block page-skeleton__about-figure page-skeleton__about-figure--three" />
      </div>

      <div className="page-skeleton__about-copy">
        <span className="page-skeleton__line page-skeleton__line--section" />
        <SkeletonLines count={4} />
        <span className="page-skeleton__button" />
      </div>
    </div>
  )
}

function HomeSkeleton() {
  return (
    <div className="page-skeleton__page">
      <div className="container page-skeleton__hero">
        <div className="page-skeleton__hero-title">
          <span className="page-skeleton__line page-skeleton__line--eyebrow" />
          <span className="page-skeleton__line page-skeleton__line--hero" />
          <span className="page-skeleton__line page-skeleton__line--hero page-skeleton__line--short" />
        </div>

        <span className="page-skeleton__block page-skeleton__hero-media" />

        <div className="page-skeleton__hero-bottom">
          <div className="page-skeleton__controls">
            <span className="page-skeleton__control" />
            <span className="page-skeleton__control" />
          </div>
          <span className="page-skeleton__counter" />
        </div>
      </div>

      <div className="container page-skeleton__about-section">
        <AboutSkeletonPanel />
      </div>
    </div>
  )
}

function AboutSkeleton() {
  return (
    <div className="container">
      <AboutSkeletonPanel />
    </div>
  )
}

function InfoSkeleton() {
  return (
    <div className="container page-skeleton__info">
      <div className="page-skeleton__info-head">
        <div className="page-skeleton__info-heading">
          <span className="page-skeleton__line page-skeleton__line--eyebrow" />
          <span className="page-skeleton__line page-skeleton__line--title" />
        </div>
        <div className="page-skeleton__info-summary">
          <SkeletonLines count={3} />
          <span className="page-skeleton__button" />
        </div>
      </div>

      <div className="page-skeleton__info-grid">
        {Array.from({ length: 3 }, (_, index) => (
          <div className="page-skeleton__info-item" key={index}>
            <span className="page-skeleton__line page-skeleton__line--number" />
            <span className="page-skeleton__line page-skeleton__line--item-title" />
            <SkeletonLines count={3} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="page-skeleton__page page-skeleton__page--top">
      <div className="container">
        <span className="page-skeleton__line page-skeleton__line--section page-skeleton__line--projects-title" />

        <div className="page-skeleton__project-grid">
          <div className="page-skeleton__project-row page-skeleton__project-row--top">
            <span className="page-skeleton__block page-skeleton__project-card" />
            <span className="page-skeleton__block page-skeleton__project-card" />
          </div>
          <div className="page-skeleton__project-row page-skeleton__project-row--bottom">
            <span className="page-skeleton__block page-skeleton__project-card" />
            <span className="page-skeleton__block page-skeleton__project-card" />
            <span className="page-skeleton__block page-skeleton__project-card" />
          </div>
        </div>

        <span className="page-skeleton__button page-skeleton__cta" />
      </div>
    </div>
  )
}

function AnnouncementsSkeleton() {
  return (
    <div className="container page-skeleton__announcements">
      <span className="page-skeleton__line page-skeleton__line--section" />

      <div className="page-skeleton__announcement-grid">
        {Array.from({ length: 2 }, (_, index) => (
          <div className="page-skeleton__announcement-item" key={index}>
            <span className="page-skeleton__block page-skeleton__announcement-number" />
            <SkeletonLines count={index === 0 ? 4 : 3} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactSkeleton() {
  return (
    <div className="page-skeleton__page page-skeleton__page--top">
      <div className="container">
        <span className="page-skeleton__line page-skeleton__line--section" />

        <div className="page-skeleton__contact-layout">
          <div className="page-skeleton__contact-form">
            <span className="page-skeleton__field" />
            <span className="page-skeleton__field" />
            <span className="page-skeleton__field" />
            <span className="page-skeleton__field" />
            <span className="page-skeleton__field page-skeleton__field--message" />
            <span className="page-skeleton__button" />
          </div>

          <span className="page-skeleton__block page-skeleton__contact-media" />
        </div>
      </div>
    </div>
  )
}

function skeletonFor(view: ViewId) {
  if (view === 'main') return <HomeSkeleton />
  if (view === 'gallery') return <AboutSkeleton />
  if (view === 'projects') return <ProjectsSkeleton />
  if (view === 'announcements') return <AnnouncementsSkeleton />
  if (view === 'contact') return <ContactSkeleton />
  return <InfoSkeleton />
}

function variantFor(view: ViewId) {
  if (view === 'main') return 'home'
  if (view === 'gallery') return 'about'
  if (view === 'projects') return 'projects'
  if (view === 'announcements') return 'announcements'
  if (view === 'contact') return 'contact'
  return 'info'
}

export function PageSkeleton({ view }: PageSkeletonProps) {
  return (
    <div
      className={`page-skeleton page-skeleton--${variantFor(view)}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>
      <div aria-hidden="true">{skeletonFor(view)}</div>
    </div>
  )
}
