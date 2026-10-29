import type { MouseEvent } from 'react'
import { contactDetails, footerLinks, socialLinks, type ViewId } from '../content'
import { Logo } from './Logo'
import './Footer.css'

type FooterProps = {
  onNavigate: (view: ViewId) => void
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3.5 9.4 8l-1.8 1.8a14.3 14.3 0 0 0 6.6 6.6L16 14.6l4.5 2.4-.8 3.2c-.2.8-.9 1.4-1.8 1.3C9.8 20.6 3.4 14.2 2.5 6.1 2.4 5.2 3 4.5 3.8 4.3z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

const socialPaths: Record<string, string> = {
  Instagram:
    'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.2.7-.3.3-.5.7-.7 1.2-.1.4-.3 1-.3 2.1-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c0 1.1.2 1.7.3 2.1.2.5.4.9.7 1.2.3.3.7.5 1.2.7.4.1 1 .3 2.1.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.2-.7.3-.3.5-.7.7-1.2.1-.4.3-1 .3-2.1.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.7-1.2-.3-.3-.7-.5-1.2-.7-.4-.1-1-.3-2.1-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm6.3-3.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z',
  X: 'M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.4L2.8 2h6.5l4.4 5.8L18.9 2zm-1.1 18h1.7L8.3 3.9H6.5L17.8 20z',
  LinkedIn:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z',
  GitHub:
    'M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.3 9.3 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z',
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear()

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, view: ViewId) => {
    event.preventDefault()
    onNavigate(view)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <a
            className="footer__brand"
            href="#main"
            aria-label="ITSS Information Technology Student Society — home"
            onClick={(event) => handleNavigate(event, 'main')}
          >
            <Logo light />
          </a>

          <div className="footer__col">
            <h2 className="footer__heading">Information</h2>
            <ul className="footer__links">
              {footerLinks.map((link) => (
                <li key={link.view}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavigate(event, link.view)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Contacts</h2>
            <address className="footer__contact">
              <p className="footer__contact-item">
                <LocationIcon />
                <span>
                  {contactDetails.address[0]}
                  <br />
                  {contactDetails.address[1]}
                </span>
              </p>
              <p className="footer__contact-item">
                <PhoneIcon />
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              </p>
              <p className="footer__contact-item">
                <MailIcon />
                <a href={contactDetails.emailHref}>{contactDetails.email}</a>
              </p>
            </address>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Social Media</h2>
            <ul className="footer__socials">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${social.label} (opens in a new tab)`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={socialPaths[social.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} ITSS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
