import { useState, type FormEvent, type ReactNode } from 'react'
import { contactDetails } from '../content'
import './Contact.css'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M6.3 3.8 9 3.1l1.9 4.6-2.1 1.4a12 12 0 0 0 6.1 6.1l1.4-2.1 4.6 1.9-.7 2.7a1.6 1.6 0 0 1-1.7 1.2C11.2 18.1 5.9 12.8 5.1 5.5a1.6 1.6 0 0 1 1.2-1.7Z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.4" />
      <path d="m3.8 6.6 8.2 6.2 8.2-6.2" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.7 12h16.6M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5s1.2-6.2 3.4-8.5Z" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="1.2" />
      <path d="m3.4 6.6 8.6 6.2 8.6-6.2" />
    </svg>
  )
}

type ContactCard = {
  title: string
  icon: ReactNode
  value: ReactNode
}

const cards: ContactCard[] = [
  {
    title: 'Telephone',
    icon: <PhoneIcon />,
    value: <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>,
  },
  {
    title: 'Address',
    icon: <PinIcon />,
    value: (
      <address>
        {contactDetails.address[0]},<br />
        {contactDetails.address[1]}
      </address>
    ),
  },
  {
    title: 'E-Mail',
    icon: <MailIcon />,
    value: <a href={contactDetails.emailHref}>{contactDetails.email}</a>,
  },
  {
    title: 'Website',
    icon: <GlobeIcon />,
    value: (
      <a href="https://cvsu.edu.ph" target="_blank" rel="noreferrer">
        www.cvsu.edu.ph
      </a>
    ),
  },
]

export function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setSent(true)
    form.reset()
  }

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="contact-page__head">
        <div className="container">
          <h1 className="contact-page__title" id="contact-title">
            Contacts
          </h1>
          <p className="contact-page__subtitle">
            Reach Out to Us Anytime and We Will Happily Assist You
          </p>
        </div>
      </div>

      <div className="container contact-page__body">
        <div className="contact-page__map">
          <iframe
            title="Cavite State University - Silang Campus map"
            src="https://www.google.com/maps?q=Cavite+State+University+Silang+Campus&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <ul className="contact-cards">
          {cards.map((card) => (
            <li className="contact-card" key={card.title}>
              <span className="contact-card__icon">{card.icon}</span>
              <h2 className="contact-card__title">{card.title}</h2>
              <div className="contact-card__value">{card.value}</div>
            </li>
          ))}
        </ul>

        <h2 className="contact-page__form-title">Get in Touch</h2>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          onChange={() => setSent(false)}
        >
          <div className="contact-form__row">
            <label className="sr-only" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Name *"
              autoComplete="name"
              required
            />

            <label className="sr-only" htmlFor="contact-email">
              E-Mail
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="E-Mail *"
              autoComplete="email"
              required
            />

            <label className="sr-only" htmlFor="contact-phone">
              Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Phone *"
              autoComplete="tel"
              required
            />
          </div>

          <label className="sr-only" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Message"
            rows={5}
            required
          />

          <button className="contact-form__submit" type="submit">
            <EnvelopeIcon />
            <span>Send Message</span>
          </button>

          <p className="contact-form__status" role="status" aria-live="polite">
            {sent ? 'Thank you. Your message has been sent — we will be in touch shortly.' : ''}
          </p>
        </form>
      </div>
    </section>
  )
}
