import { announcementItems } from '../content'
import './Mission.css'

export function Mission() {
  return (
    <section className="mission section" id="announcements" aria-labelledby="announcements-title">
      <div className="container">
        <h1 className="section-title" id="announcements-title">
          Announcements
        </h1>

        <div className="mission__grid">
          {announcementItems.map((item) => (
            <div className="mission__item" key={item.number}>
              <span className="mission__number" aria-hidden="true">
                {item.number}
              </span>
              <p className="mission__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
