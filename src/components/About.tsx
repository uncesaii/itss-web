import type { MouseEvent } from 'react'
import type { ViewId } from '../content'
import { ArrowRight } from './ArrowRight'
import './About.css'

type AboutProps = {
  onNavigate: (view: ViewId) => void
  headingLevel?: 'h1' | 'h2'
}

export function About({ onNavigate, headingLevel = 'h1' }: AboutProps) {
  const Heading = headingLevel

  const isReadMore = headingLevel === 'h2'
  const ctaView: ViewId = isReadMore ? 'gallery' : 'contact'
  const ctaLabel = isReadMore ? 'Read More' : 'Contact Us'

  const handleCta = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate(ctaView)
  }

  return (
    <section className="about section" id="gallery" aria-labelledby="about-title">
      <div className="container">
        <div className="about__panel">
          <div className="about__collage">
            <figure className="about__figure about__figure--one">
              <img
                src="/images/about-lattice.jpg"
                alt="Placeholder gallery image"
                width="270"
                height="265"
                loading="lazy"
              />
            </figure>
            <figure className="about__figure about__figure--two">
              <img
                src="/images/about-glass.jpg"
                alt="Placeholder gallery image"
                width="270"
                height="345"
                loading="lazy"
              />
            </figure>
            <figure className="about__figure about__figure--three">
              <img
                src="/images/about-abstract.jpg"
                alt="Placeholder gallery image"
                width="270"
                height="140"
                loading="lazy"
              />
            </figure>
          </div>

          <div className="about__copy">
            <Heading className="section-title" id="about-title">
              About Us
            </Heading>
            <p className="about__text">
              ITSS is the Information Technology Student Society — a student-led community for
              people who build, break and learn technology together. We run hands-on workshops,
              hackathons and weekly build nights, and help members turn ideas into working
              projects. Whatever your major or experience level, there is a place here to learn in
              public, meet other builders and make something useful for campus.
            </p>
            <a className="btn btn--ghost about__cta" href={`#${ctaView}`} onClick={handleCta}>
              <span>{ctaLabel}</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
