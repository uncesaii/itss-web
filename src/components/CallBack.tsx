import { useEffect, useState, type FormEvent } from 'react'

type CallBackProps = {
  scrolled: boolean
  onScrollTop: () => void
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3.5 9.4 8l-1.8 1.8a14.3 14.3 0 0 0 6.6 6.6L16 14.6l4.5 2.4-.8 3.2c-.2.8-.9 1.4-1.8 1.3C9.8 20.6 3.4 14.2 2.5 6.1 2.4 5.2 3 4.5 3.8 4.3z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19V5m0 0-6 6m6-6 6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CallBack({ scrolled, onScrollTop }: CallBackProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const interest = String(data.get('interest') ?? '').trim()
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const subject = encodeURIComponent('Call back request')
    const body = encodeURIComponent(
      [
        `Area of interest: ${interest || '-'}`,
        `Name: ${name || '-'}`,
        `Phone: ${phone || '-'}`,
        '',
        'Please call me back.',
      ].join('\n'),
    )
    window.location.href = `mailto:itss.cvsusc@gmail.com?subject=${subject}&body=${body}`
    setOpen(false)
  }

  const toggle = () => setOpen((current) => !current)

  return (
    <>
      <div className={`callback${open ? ' is-open' : ''}`}>
        <button
          type="button"
          className="callback__label"
          aria-expanded={open}
          aria-controls="callback-panel"
          onClick={toggle}
        >
          <span className="callback__label-text">
            Request a <strong>Call Back</strong>
          </span>
          <span className="callback__icon" aria-hidden="true">
            <PhoneIcon />
          </span>
        </button>

        <div className="callback__body" id="callback-panel" aria-hidden={!open}>
          <form className="callback__form" onSubmit={handleSubmit}>
            <p className="callback__intro">
              Request a Call Back and our team will get in touch with you ASAP.
            </p>
            <h6 className="callback__heading">Area of Interest</h6>
            <label className="callback__field">
              <span className="sr-only">Area of interest</span>
              <input
                type="text"
                name="interest"
                placeholder="Area of Interest"
                tabIndex={open ? 0 : -1}
              />
            </label>
            <label className="callback__field">
              <span className="sr-only">First name</span>
              <input
                type="text"
                name="name"
                placeholder="First Name"
                autoComplete="given-name"
                tabIndex={open ? 0 : -1}
              />
            </label>
            <label className="callback__field">
              <span className="sr-only">Phone number</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                autoComplete="tel"
                tabIndex={open ? 0 : -1}
              />
            </label>
            <button
              type="submit"
              className="callback__submit"
              tabIndex={open ? 0 : -1}
            >
              Send Request
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        className={`scroll-top${scrolled ? ' is-visible' : ''}`}
        aria-hidden={!scrolled}
        tabIndex={scrolled ? 0 : -1}
        aria-label="Scroll back to top"
        onClick={onScrollTop}
      >
        <ArrowUpIcon />
      </button>
    </>
  )
}
