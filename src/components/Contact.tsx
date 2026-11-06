import { useState, type FormEvent } from 'react'
import { contactDetails } from '../content'
import { ArrowRight } from './ArrowRight'
import { images } from '../images'
import { OptimizedImage } from './OptimizedImage'
import './Contact.css'

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
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__banner">
        <div className="container contact__banner-inner">
          <div>
            <p className="contact__eyebrow">Get in touch</p>
            <h1 className="contact__title" id="contact-title">
              Contact Us
            </h1>
          </div>
          <p className="contact__intro">
            Questions about membership, programs or a project idea? Send us a message and an
            officer will get back to you.
          </p>
        </div>
      </div>

      <div className="container contact__main">
        <div className="contact__layout">
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            onChange={() => setSent(false)}
          >
            <div className="contact__form-head">
              <h2 className="contact__form-title">Send us a message</h2>
              <p className="contact__form-note">Fields marked with * are required.</p>
            </div>

            <div className="contact__row">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-phone">
                  Phone number *
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="09xx xxx xxxx"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div className="contact__row">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">
                  E-mail *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-interest">
                  Interested in
                </label>
                <input
                  id="contact-interest"
                  name="interest"
                  type="text"
                  placeholder="Membership, programs, ..."
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-message">
                Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="How can we help?"
                rows={6}
                required
              />
            </div>

            <button className="btn btn--dark contact__submit" type="submit">
              <span>Send message</span>
              <ArrowRight />
            </button>

            <p className="contact__status" role="status" aria-live="polite">
              {sent ? 'Thank you. Your message has been sent — we will be in touch shortly.' : ''}
            </p>
          </form>

          <aside className="contact__aside">
            <div className="contact__media">
              <OptimizedImage
                image={images.contactCall}
                alt="An ITSS officer taking a call"
                loading="lazy"
              />
            </div>

            <div className="contact__info">
              <p className="contact__info-label">Reach us directly</p>
              <a className="contact__info-phone" href={contactDetails.phoneHref}>
                {contactDetails.phone}
              </a>
              <a className="contact__info-email" href={contactDetails.emailHref}>
                {contactDetails.email}
              </a>
              <address className="contact__info-address">
                {contactDetails.address[0]}
                <br />
                {contactDetails.address[1]}
              </address>
              <p className="contact__info-hours">
                Office hours: Monday to Friday, 9:00 AM – 5:00 PM
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
