import type { MouseEvent } from 'react'
import type { InfoPageContent, ViewId } from '../content'
import { ArrowRight } from './ArrowRight'
import './InfoPage.css'

type InfoPageProps = {
  content: InfoPageContent
  onNavigate: (view: ViewId) => void
}

export function InfoPage({ content, onNavigate }: InfoPageProps) {
  const handleCta = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!content.cta) return

    event.preventDefault()
    onNavigate(content.cta.view)
  }

  return (
    <section className="info section" aria-labelledby="info-title">
      <div className="container">
        <div className="info__head">
          <div className="info__heading">
            <p className="info__eyebrow">{content.eyebrow}</p>
            <h1 className="section-title" id="info-title">
              {content.title}
            </h1>
          </div>

          <div className="info__intro-wrap">
            <p className="info__intro">{content.intro}</p>
            {content.cta ? (
              <a
                className="btn btn--ghost info__cta"
                href={`#${content.cta.view}`}
                onClick={handleCta}
              >
                <span>{content.cta.label}</span>
                <ArrowRight />
              </a>
            ) : null}
          </div>
        </div>

        <ul className="info__grid">
          {content.items.map((item, index) => (
            <li className="info__item" key={item.title}>
              <span className="info__number">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="info__item-title">{item.title}</h2>
              <p className="info__item-text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
