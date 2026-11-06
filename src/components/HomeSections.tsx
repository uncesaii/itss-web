import { useState, type MouseEvent, type ReactNode } from 'react'
import type { ViewId } from '../content'
import { contactDetails } from '../content'
import { images } from '../images'
import { pathForView } from '../routes'
import { ArrowRight } from './ArrowRight'
import { OptimizedImage } from './OptimizedImage'
import './Home.css'

type NavigateProps = {
  onNavigate: (view: ViewId) => void
}

function useNavigate(onNavigate: (view: ViewId) => void) {
  return (event: MouseEvent<HTMLAnchorElement>, view: ViewId) => {
    event.preventDefault()
    onNavigate(view)
  }
}

function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'left',
  light = false,
}: {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  light?: boolean
}) {
  return (
    <div className={`hs-head${align === 'center' ? ' hs-head--center' : ''}${light ? ' hs-head--light' : ''}`}>
      {eyebrow ? <p className="hs-eyebrow">{eyebrow}</p> : null}
      <h2 className="hs-title">{title}</h2>
      {lead ? <p className="hs-lead">{lead}</p> : null}
    </div>
  )
}

function IconFrame({ children }: { children: ReactNode }) {
  return <span className="feature__icon">{children}</span>
}

/* ------------------------------------------------------------------ intro */

export function Intro({ onNavigate }: NavigateProps) {
  const go = useNavigate(onNavigate)

  return (
    <section className="hs hs-intro" aria-labelledby="intro-title">
      <div className="container">
        <div className="hs-head hs-head--center hs-intro__head">
          <img
            className="hs-intro__badge"
            src="/itss-logo.png"
            alt=""
            width="512"
            height="512"
          />
          <p className="hs-eyebrow">Who we are</p>
          <h2 className="hs-title hs-intro__title" id="intro-title">
            A student society built around doing the work.
          </h2>
          <p className="hs-lead hs-intro__lead">
            ITSS is the official organization of the Information Technology Department at
            Cavite State University — Silang Campus. We bring students together to learn
            practical skills, build real projects and support one another from first year
            to graduation.
          </p>
          <a
            className="btn btn--ghost hs-intro__cta"
            href={pathForView('gallery')}
            onClick={(event) => go(event, 'gallery')}
          >
            <span>Discover ITSS</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- features */

const features = [
  {
    title: 'A community that has your back',
    text: 'Meet classmates across year levels, join study groups and find people who build alongside you.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="12" cy="11" r="4.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 26c.6-4.4 3.7-7 7.5-7s6.9 2.6 7.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M21 7.6a4 4 0 0 1 0 6.8M23.5 19.2c2.3.7 3.8 2.9 4.1 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Turn ideas into shipped work',
    text: 'Hackathons, build nights and hands-on workshops that take you from tutorial to a working project.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="m11.5 10-6 6 6 6M20.5 10l6 6-6 6M18 6l-4 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Grow beyond the classroom',
    text: 'Mentoring, portfolio reviews and industry talks that prepare you for internships and your first role.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="m16 8.5 1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M11 18.5 9 29l7-3.6L23 29l-2-10.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function Features() {
  return (
    <section className="hs hs-features" aria-labelledby="features-title">
      <div className="container">
        <div className="hs-head hs-head--center">
          <p className="hs-eyebrow">Why ITSS</p>
          <h2 className="hs-title" id="features-title">
            More than a club. A place to become.
          </h2>
          <p className="hs-lead">
            Everything we run is designed to move you from curious to capable — with people
            who are figuring it out alongside you.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature, index) => (
            <article className="feature" key={feature.title}>
              <IconFrame>{feature.icon}</IconFrame>
              <span className="feature__index">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__text">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- what we do */

const programs = [
  {
    title: 'Workshops & bootcamps',
    text: 'Practical sessions on Git, web development, cloud, data and security, each ending with something you can keep building on.',
  },
  {
    title: 'Hackathons & build nights',
    text: 'Weekend sprints and weekly work sessions where teams scope an idea, build it and present what they made.',
  },
  {
    title: 'Capstone support',
    text: 'Peer reviews, technical advice and accountability for students working through their culminating projects.',
  },
  {
    title: 'Industry talks',
    text: 'Conversations with alumni and practitioners about careers, portfolios and the realities of the tech industry.',
  },
  {
    title: 'Community outreach',
    text: 'Tech literacy drives and campus service projects that put student skills to work for the wider community.',
  },
  {
    title: 'Publications & research',
    text: 'Shared notes, write-ups and research support that help members document and publish what they learn.',
  },
]

export function WhatWeDo() {
  return (
    <section className="hs hs-program" aria-labelledby="program-title">
      <div className="hs-program__bg" aria-hidden="true">
        <OptimizedImage image={images.heroAperture} alt="" sizes="100vw" />
      </div>

      <div className="container hs-program__inner">
        <SectionHead
          eyebrow="What we do"
          title="Programs built for real skills."
          lead="Our calendar is shaped around one question: what should an IT student be able to do by the end of the year? Here is how we answer it."
          light
        />

        <div className="program__grid">
          {programs.map((program, index) => (
            <article className="program__item" key={program.title}>
              <span className="program__number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="program__title">{program.title}</h3>
              <p className="program__text">{program.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- learning */

export function LearningBand({ onNavigate }: NavigateProps) {
  const go = useNavigate(onNavigate)

  return (
    <section className="hs hs-learning" aria-labelledby="learning-title">
      <div className="hs-learning__bg" aria-hidden="true">
        <OptimizedImage image={images.projectBridge} alt="" sizes="100vw" />
      </div>

      <div className="container hs-learning__inner">
        <div className="hs-learning__copy">
          <SectionHead
            eyebrow="Services"
            title="Learning materials, open to every member."
            lead="Slides, starter guides, project templates and community reviewers — collected in one place so you always have somewhere to begin."
            light
          />
          <div className="hs-learning__actions">
            <a
              className="btn btn--dark"
              href={pathForView('learning-materials')}
              onClick={(event) => go(event, 'learning-materials')}
            >
              <span>Browse the library</span>
              <ArrowRight />
            </a>
            <a
              className="btn btn--outline-light"
              href={pathForView('contact')}
              onClick={(event) => go(event, 'contact')}
            >
              <span>Request a resource</span>
            </a>
          </div>
        </div>

        <div className="learning__device" aria-hidden="true">
          <div className="learning__device-screen">
            <div className="learning__device-head">
              <img src="/itss-logo.png" alt="" width="512" height="512" />
              <span>ITSS Learn</span>
            </div>
            <div className="learning__device-search" />
            <div className="learning__device-card">
              <span className="learning__device-tag" />
              <span className="learning__device-line" />
              <span className="learning__device-line learning__device-line--short" />
            </div>
            <div className="learning__device-card">
              <span className="learning__device-tag" />
              <span className="learning__device-line" />
              <span className="learning__device-line learning__device-line--short" />
            </div>
            <div className="learning__device-rows">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- showcase */

const showcase = [
  {
    title: 'CampusBuild',
    meta: 'Community · 2026',
    image: images.projectWave,
    alt: 'CampusBuild student project',
  },
  {
    title: 'Hackathon 2026',
    meta: 'Event · 2026',
    image: images.projectDome,
    alt: 'Hackathon 2026',
  },
  {
    title: 'Workshop Series',
    meta: 'Learning · 2026',
    image: images.projectResidential,
    alt: 'ITSS Workshop Series',
  },
]

export function Showcase({ onNavigate }: NavigateProps) {
  const go = useNavigate(onNavigate)

  return (
    <section className="hs hs-showcase" aria-labelledby="showcase-title">
      <div className="container">
        <div className="hs-showcase__head">
          <SectionHead
            eyebrow="Student work"
            title="Selected projects."
            lead="A look at what members are building — from campus tools to weekend prototypes."
          />
          <a
            className="hs-link"
            href={pathForView('projects')}
            onClick={(event) => go(event, 'projects')}
          >
            <span>View all projects</span>
            <ArrowRight />
          </a>
        </div>

        <div className="showcase__grid">
          {showcase.map((item) => (
            <a
              className="showcase__card"
              key={item.title}
              href={pathForView('projects')}
              onClick={(event) => go(event, 'projects')}
            >
              <span className="showcase__media">
                <OptimizedImage image={item.image} alt={item.alt} sizes="(min-width: 901px) 33vw, 100vw" />
              </span>
              <span className="showcase__overlay" aria-hidden="true" />
              <span className="showcase__body">
                <span className="showcase__meta">{item.meta}</span>
                <span className="showcase__title">{item.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ stats */

const stats = [
  { value: '150+', label: 'Active members' },
  { value: '30+', label: 'Events each year' },
  { value: '12', label: 'Shipped projects' },
  { value: '6', label: 'Years of ITSS' },
]

export function Stats() {
  return (
    <section className="hs hs-stats" aria-label="ITSS by the numbers">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat__value">{stat.value}</span>
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- voices */

const voices = [
  {
    quote:
      'ITSS gave me the push to build things I never thought I could finish. Build nights turned classmates into collaborators — and my portfolio into something real.',
    name: 'Mika Santos',
    role: 'BSIT · Web Development',
  },
  {
    quote:
      'I joined as a first-year student with no idea where to start. The workshops and the people around me made the whole degree feel possible.',
    name: 'Jomar Reyes',
    role: 'BSIT · Cybersecurity',
  },
  {
    quote:
      'The society is where I learned to present my work, take feedback and lead a team. Those are the skills I actually use every day now.',
    name: 'Paula Cruz',
    role: 'BSIT · Data & Analytics',
  },
]

export function Voices() {
  const [active, setActive] = useState(0)
  const voice = voices[active]

  return (
    <section className="hs hs-voices" aria-labelledby="voices-title">
      <div className="hs-voices__bg" aria-hidden="true">
        <OptimizedImage image={images.aboutAbstract} alt="" sizes="100vw" />
      </div>

      <div className="container hs-voices__inner">
        <p className="hs-eyebrow hs-eyebrow--light">Member voices</p>
        <h2 className="hs-voices__title" id="voices-title">
          What ITSS feels like.
        </h2>

        <blockquote className="voice">
          <p className="voice__quote" key={voice.name}>
            “{voice.quote}”
          </p>
          <footer className="voice__author">
            <span className="voice__name">{voice.name}</span>
            <span className="voice__role">{voice.role}</span>
          </footer>
        </blockquote>

        <div className="hs-voices__dots" role="group" aria-label="Choose a testimonial">
          {voices.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`voice__dot${index === active ? ' is-active' : ''}`}
              aria-label={`Show testimonial from ${item.name}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- news */

const announcements = [
  {
    title: 'Hackathon 2026 registration is open',
    date: 'January 12, 2026',
    excerpt:
      'Form a team, pick a campus challenge and ship something useful in one weekend. No prior experience needed.',
  },
  {
    title: 'Build nights resume this Friday',
    date: 'January 9, 2026',
    excerpt:
      'Every Friday at 5 PM in the Student Union. Bring an idea, meet other members and get feedback on your work.',
  },
]

const newsItems = [
  {
    title: 'ITSS welcomes its new executive board',
    date: 'December 18, 2025',
    image: images.aboutGlass,
    alt: 'ITSS executive board',
  },
  {
    title: 'Workshop series wraps with 120 attendees',
    date: 'November 30, 2025',
    image: images.projectField,
    alt: 'ITSS workshop session',
  },
  {
    title: 'CampusBuild team ships the student portal',
    date: 'November 12, 2025',
    image: images.projectWave,
    alt: 'CampusBuild project',
  },
]

export function NewsGrid({ onNavigate }: NavigateProps) {
  const go = useNavigate(onNavigate)

  return (
    <section className="hs hs-news" aria-labelledby="news-title">
      <div className="container">
        <h2 className="sr-only" id="news-title">
          News and announcements
        </h2>

        <div className="news__grid">
          <div className="news__col">
            <div className="news__col-head">
              <h3 className="news__col-title">Announcements</h3>
              <a
                className="hs-link hs-link--small"
                href={pathForView('announcements')}
                onClick={(event) => go(event, 'announcements')}
              >
                <span>View all</span>
                <ArrowRight />
              </a>
            </div>

            <ul className="announcements">
              {announcements.map((item, index) => (
                <li className="announcement" key={item.title}>
                  <span className="announcement__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="announcement__date">{item.date}</p>
                    <h4 className="announcement__title">{item.title}</h4>
                    <p className="announcement__text">{item.excerpt}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="news__col">
            <div className="news__col-head">
              <h3 className="news__col-title">Society news</h3>
              <a
                className="hs-link hs-link--small"
                href={pathForView('announcements')}
                onClick={(event) => go(event, 'announcements')}
              >
                <span>View all</span>
                <ArrowRight />
              </a>
            </div>

            <ul className="news-list">
              {newsItems.map((item) => (
                <li className="news-item" key={item.title}>
                  <a
                    href={pathForView('announcements')}
                    className="news-item__link"
                    onClick={(event) => go(event, 'announcements')}
                  >
                    <span className="news-item__thumb">
                      <OptimizedImage image={item.image} alt={item.alt} sizes="96px" />
                    </span>
                    <span className="news-item__body">
                      <span className="news-item__date">{item.date}</span>
                      <span className="news-item__title">{item.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- contact */

export function ContactBand({ onNavigate }: NavigateProps) {
  const go = useNavigate(onNavigate)

  return (
    <section className="hs hs-contact" aria-labelledby="contact-band-title">
      <div className="container">
        <div className="contact-band">
          <div className="contact-band__panel">
            <p className="hs-eyebrow hs-eyebrow--light">Get involved</p>
            <h2 className="hs-title hs-title--light" id="contact-band-title">
              Ready to build with us?
            </h2>
            <p className="hs-lead hs-lead--light">
              Whether you are joining your first organization or looking for a team to build
              with, there is a place for you in ITSS.
            </p>
            <a
              className="btn btn--light"
              href={pathForView('contact')}
              onClick={(event) => go(event, 'contact')}
            >
              <span>Contact the society</span>
              <ArrowRight />
            </a>
          </div>

          <div className="contact-band__info">
            <p className="contact-band__label">Talk to us directly</p>
            <a className="contact-band__phone" href={contactDetails.phoneHref}>
              {contactDetails.phone}
            </a>
            <a className="contact-band__email" href={contactDetails.emailHref}>
              {contactDetails.email}
            </a>
            <address className="contact-band__address">
              {contactDetails.address[0]}
              <br />
              {contactDetails.address[1]}
            </address>
            <p className="contact-band__hours">
              Office hours: Monday to Friday, 9:00 AM – 5:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
