import { useState, type FormEvent } from 'react'
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
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <h1 className="section-title" id="contact-title">
          Contact Us
        </h1>

        <div className="contact__layout">
          <form className="contact__form" onSubmit={handleSubmit} noValidate onChange={() => setSent(false)}>
            <div className="contact__field">
              <label className="sr-only" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="name"
              />
            </div>

            <div className="contact__field">
              <label className="sr-only" htmlFor="contact-phone">
                Phone Number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="Phone Number*"
                autoComplete="tel"
                required
              />
            </div>

            <div className="contact__field">
              <label className="sr-only" htmlFor="contact-email">
                E-mail
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="E-mail*"
                autoComplete="email"
                required
              />
            </div>

            <div className="contact__field">
              <label className="sr-only" htmlFor="contact-interest">
                Interested In
              </label>
              <input
                id="contact-interest"
                name="interest"
                type="text"
                placeholder="Interested In"
                autoComplete="off"
              />
            </div>

            <div className="contact__field">
              <label className="sr-only" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Message*"
                rows={5}
                required
              />
            </div>

            <button className="btn btn--dark contact__submit" type="submit">
              <span>Send Email</span>
              <ArrowRight />
            </button>

            <p className="contact__status" role="status" aria-live="polite">
              {sent ? 'Thank you. Your message has been sent — we will be in touch shortly.' : ''}
            </p>
          </form>

          <div className="contact__media">
            <OptimizedImage
              image={images.contactCall}
              alt="Placeholder contact image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}