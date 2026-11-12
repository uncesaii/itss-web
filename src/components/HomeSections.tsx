import { useEffect, useState, type FormEvent, type MouseEvent } from 'react'
import type { ViewId } from '../content'
import { contactDetails } from '../content'
import { images } from '../images'
import { pathForView } from '../routes'
import { OptimizedImage } from './OptimizedImage'
import { LogoMark } from './LogoMark'
import { StatsCounter } from './StatsCounter'
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
      <h2 className={`hs-title${light ? ' hs-title--light' : ''}`}>{title}</h2>
      {lead ? <p className="hs-lead">{lead}</p> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ intro */

export function Intro({ onNavigate }: NavigateProps) {
  const go = useNavigate(onNavigate)

  return (
    <section className="hs hs-intro" aria-labelledby="intro-title">
      <div className="container">
        <div className="hs-head hs-head--center hs-intro__head">
          <LogoBadge />
          <h2 className="hs-title hs-intro__title" id="intro-title">
            Information Technology Student Society.
          </h2>
          <p className="hs-lead hs-intro__lead">
            ITSS is the official organization of the Information Technology Department at
            Cavite State University - Silang Campus. We bring students together to learn
            practical skills, build real projects and support one another from first year
            to graduation.
          </p>
          <a
            className="btn btn--ghost hs-intro__cta"
            href={pathForView('gallery')}
            onClick={(event) => go(event, 'gallery')}
          >
            <span>About ITSS</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function LogoBadge() {
  return (
    <span className="hs-intro__badge" aria-hidden="true">
      <img src="/itss-logo.png" alt="" width="512" height="512" />
    </span>
  )
}

/* --------------------------------------------------------------- features */

const featureItems = [
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
            Everything we run is designed to move you from curious to capable - with people
            who are figuring it out alongside you.
          </p>
        </div>

        <div className="features__grid">
          {featureItems.map((feature) => (
            <article className="feature" key={feature.title}>
              <span className="feature__icon">{feature.icon}</span>
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
          {programs.map((program) => (
            <article className="program__item" key={program.title}>
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
            lead="Slides, starter guides, project templates and community reviewers - collected in one place so you always have somewhere to begin."
            light
          />
          <div className="hs-learning__actions">
            <a
              className="btn btn--dark"
              href={pathForView('learning-materials')}
              onClick={(event) => go(event, 'learning-materials')}
            >
              <span>Browse the library</span>
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
    meta: 'Community - 2026',
    image: images.projectWave,
    alt: 'CampusBuild student project',
  },
  {
    title: 'Hackathon 2026',
    meta: 'Event - 2026',
    image: images.projectDome,
    alt: 'Hackathon 2026',
  },
  {
    title: 'Workshop Series',
    meta: 'Learning - 2026',
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
            lead="A look at what members are building - from campus tools to weekend prototypes."
          />
          <a
            className="hs-link"
            href={pathForView('projects')}
            onClick={(event) => go(event, 'projects')}
          >
            <span>View all projects</span>
            <ArrowGlyph />
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
              <span className="showcase__body">
                <span className="showcase__title">{item.title}</span>
                <span className="showcase__meta">{item.meta}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h16m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ stats */

const stats = [
  {
    value: 150,
    suffix: '+',
    label: 'Active members',
    icon: <UsersIcon />,
  },
  {
    value: 30,
    suffix: '+',
    label: 'Events each year',
    icon: <CalendarIcon />,
  },
  {
    value: 12,
    suffix: '',
    label: 'Shipped projects',
    icon: <CubeIcon />,
  },
  {
    value: 6,
    suffix: '',
    label: 'Years of ITSS',
    icon: <ClockIcon />,
  },
]

export function Stats() {
  return (
    <section className="hs hs-stats" aria-label="ITSS by the numbers">
      <div className="hs-stats__bg" aria-hidden="true">
        <img src="/bg/stats.jpg" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat__icon">{stat.icon}</span>
              <StatsCounter
                value={stat.value}
                suffix={stat.suffix}
                className="stat__value"
              />
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UsersIcon() {
  return (
    <span className="stat__glyph" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="13" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 27c.8-5.2 4.6-8.5 9-8.5s8.2 3.3 9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22.5 6.8a5.6 5.6 0 0 1 0 8.4M25 20.5c2.4.9 4 3 4.4 5.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function CalendarIcon() {
  return (
    <span className="stat__glyph" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="4" y="7" width="24" height="21" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 13h24M10.5 4.5V9M21.5 4.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 19h4M17 19h4M11 23.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function CubeIcon() {
  return (
    <span className="stat__glyph" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 3.5 27 9.5v13L16 28.5 5 22.5v-13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 9.5 16 15.5l11-6M16 15.5v13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function ClockIcon() {
  return (
    <span className="stat__glyph" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 9.5V16l5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

/* ----------------------------------------------------------------- voices */

const voices = [
  {
    quote:
      'ITSS gave me the push to build things I never thought I could finish. Build nights turned classmates into collaborators - and my portfolio into something real.',
    name: 'Mika Santos',
    role: 'BSIT, Web Development',
  },
  {
    quote:
      'I joined as a first-year student with no idea where to start. The workshops and the people around me made the whole degree feel possible.',
    name: 'Jomar Reyes',
    role: 'BSIT, Cybersecurity',
  },
  {
    quote:
      'The society is where I learned to present my work, take feedback and lead a team. Those are the skills I actually use every day now.',
    name: 'Paula Cruz',
    role: 'BSIT, Data & Analytics',
  },
]

export function Voices() {
  const [active, setActive] = useState(0)
  const voice = voices[active]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % voices.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hs hs-voices" aria-labelledby="voices-title">
      <div className="hs-voices__bg" aria-hidden="true">
        <OptimizedImage image={images.aboutAbstract} alt="" sizes="100vw" />
      </div>

      <div className="container hs-voices__inner">
        <h2 className="hs-voices__title" id="voices-title">
          Member voices.
        </h2>

        <div className="hs-voices__rule" aria-hidden="true" />

        <blockquote className="voice">
          <p className="voice__quote" key={voice.name}>
            {voice.quote}
          </p>
          <footer className="voice__author">
            by <span className="voice__name">{voice.name}</span>
            <span className="voice__role">, {voice.role}</span>
          </footer>
          <div className="voice__badge" aria-hidden="true">
            <LogoMark className="voice__badge-mark" />
          </div>
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

type NewsEntry = {
  title: string
  excerpt: string
  date: string
  author: string
  comments: number
  image: (typeof images)['projectWave']
  alt: string
}

const alertEntries: NewsEntry[] = [
  {
    title: 'Hackathon 2026 registration is open',
    excerpt:
      'Form a team, pick a campus challenge and ship something useful in one weekend. No prior experience needed.',
    date: 'January 12, 2026',
    author: 'BY ITSS',
    comments: 0,
    image: images.projectDome,
    alt: 'Hackathon 2026',
  },
  {
    title: 'Build nights resume this Friday',
    excerpt:
      'Every Friday at 5 PM in the Student Union. Bring an idea, meet other members and get feedback on your work.',
    date: 'January 9, 2026',
    author: 'BY ITSS',
    comments: 0,
    image: images.projectField,
    alt: 'ITSS build night',
  },
  {
    title: 'Mentor rotation opens for second years',
    excerpt:
      'Paring with senior members for one-on-one reviews of your repos, resumes and capstone plans.',
    date: 'January 5, 2026',
    author: 'BY ITSS',
    comments: 0,
    image: images.aboutLattice,
    alt: 'ITSS mentors',
  },
]

const recentEntries: NewsEntry[] = [
  {
    title: 'ITSS welcomes its new executive board',
    excerpt:
      'The incoming officers outline the program calendar for the academic year and thank the outgoing board.',
    date: 'December 18, 2025',
    author: 'BY ITSS',
    comments: 0,
    image: images.aboutGlass,
    alt: 'ITSS executive board',
  },
  {
    title: 'Workshop series wraps with 120 attendees',
    excerpt:
      'Three weeks of Git, web and cloud sessions closed with showcase demos from participants.',
    date: 'November 30, 2025',
    author: 'BY ITSS',
    comments: 0,
    image: images.projectResidential,
    alt: 'ITSS workshop session',
  },
  {
    title: 'CampusBuild team ships the student portal',
    excerpt:
      'A member-built portal that consolidates student handbooks, schedules and event sign-ups.',
    date: 'November 12, 2025',
    author: 'BY ITSS',
    comments: 0,
    image: images.projectWave,
    alt: 'CampusBuild project',
  },
]

function NewsColumn({
  heading,
  entries,
  onNavigate,
}: {
  heading: string
  entries: NewsEntry[]
  onNavigate: (view: ViewId) => void
}) {
  const maxStart = entries.length - 2
  const [start, setStart] = useState(0)
  const visible = entries.slice(start, start + 2)

  return (
    <div className="news__col">
      <div className="news__col-head">
        <h3 className="news__col-title">{heading}</h3>
        <div className="news__arrows">
          <button
            type="button"
            className="news__arrow"
            aria-label={`Previous ${heading.toLowerCase()}`}
            disabled={start === 0}
            onClick={() => setStart((current) => Math.max(0, current - 1))}
          >
            <ArrowGlyph />
          </button>
          <button
            type="button"
            className="news__arrow"
            aria-label={`Next ${heading.toLowerCase()}`}
            disabled={start >= maxStart}
            onClick={() => setStart((current) => Math.min(maxStart, current + 1))}
          >
            <ArrowGlyph />
          </button>
        </div>
      </div>

      <ul className="news-list">
        {visible.map((item) => (
          <li className="news-item" key={item.title}>
            <a
              href={pathForView('announcements')}
              className="news-item__link"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('announcements')
              }}
            >
              <span className="news-item__thumb">
                <OptimizedImage image={item.image} alt={item.alt} sizes="130px" />
              </span>
              <span className="news-item__body">
                <span className="news-item__meta">
                  <span>{item.author}</span>
                  <span aria-hidden="true" className="news-item__meta-sep" />
                  <span>{item.date}</span>
                  <span aria-hidden="true" className="news-item__meta-sep" />
                  <span>{item.comments} comments</span>
                </span>
                <span className="news-item__title">{item.title}</span>
                <span className="news-item__excerpt">{item.excerpt}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function NewsGrid({ onNavigate }: NavigateProps) {
  return (
    <section className="hs hs-news" aria-labelledby="news-title">
      <div className="hs-news__bg" aria-hidden="true">
        <img src="/bg/news.jpg" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="container">
        <h2 className="sr-only" id="news-title">
          News and announcements
        </h2>

        <div className="news__grid">
          <NewsColumn heading="Announcements" entries={alertEntries} onNavigate={onNavigate} />
          <NewsColumn heading="Recent News" entries={recentEntries} onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- contact */

export function ContactBand({ onNavigate }: NavigateProps) {
  const go = useNavigate(onNavigate)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `${data.get('name')} - ${data.get('subject') || 'Website inquiry'}`
    const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`
    window.location.href = `${contactDetails.emailHref}?subject=${encodeURIComponent(
      String(subject),
    )}&body=${encodeURIComponent(String(body))}`
  }

  return (
    <section className="hs hs-contact" aria-labelledby="contact-band-title">
      <div className="contact-band">
        <div className="contact-band__panel">
          <div className="contact-band__bg" aria-hidden="true">
            <img src="/bg/contact.jpg" alt="" loading="lazy" decoding="async" />
          </div>

          <h2 className="hs-title hs-title--light" id="contact-band-title">
            Free case evaluation? Just say hi.
          </h2>
          <p className="hs-lead hs-lead--light">
            Tell us what you want to build, join or learn. A board member will get back to
            you within two working days.
          </p>

          <form className="contact-band__form" onSubmit={handleSubmit}>
            <label className="contact-band__field">
              <span className="sr-only">Your name</span>
              <input name="name" type="text" placeholder="Name *" required />
            </label>
            <label className="contact-band__field">
              <span className="sr-only">Your email</span>
              <input name="email" type="email" placeholder="E-Mail *" required />
            </label>
            <label className="contact-band__field">
              <span className="sr-only">Subject</span>
              <input name="subject" type="text" placeholder="Subject" />
            </label>
            <label className="contact-band__field">
              <span className="sr-only">Message</span>
              <textarea name="message" rows={3} placeholder="Message" />
            </label>
            <button className="btn btn--light" type="submit">
              <span>Send message</span>
            </button>
          </form>
        </div>

        <div className="contact-band__info">
          <p className="contact-band__label">
            If you would like to speak with someone directly
          </p>
          <h3 className="contact-band__phone-title">Call Us Toll Free</h3>
          <LogoBadge />
          <a className="contact-band__phone" href={contactDetails.phoneHref}>
            {contactDetails.phone}
          </a>
          <a className="contact-band__email" href={contactDetails.emailHref}>
            {contactDetails.email}
          </a>
          <p className="contact-band__hours">
            Office hours: Monday to Friday, 9:00 AM - 5:00 PM
          </p>
          <a
            className="hs-link contact-band__more"
            href={pathForView('contact')}
            onClick={(event) => go(event, 'contact')}
          >
            <span>Contacts page</span>
            <ArrowGlyph />
          </a>
        </div>
      </div>
    </section>
  )
}
