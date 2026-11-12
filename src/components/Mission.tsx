import { announcementItems } from '../content'
import './Mission.css'

export function Mission() {
  return (
    <section className="mission" id="announcements" aria-labelledby="announcements-title">
      <div className="mission__banner">
        <div className="container mission__banner-inner">
          <div>
            <p className="mission__eyebrow">Newsroom</p>
            <h1 className="mission__title" id="announcements-title">
              News &amp; Announcements
            </h1>
          </div>
          <p className="mission__intro">
            The latest from the society — registration windows, schedules and updates for
            members and the campus community.
          </p>
        </div>
      </div>

      <div className="container mission__main">
        {announcementItems.length ? (
          <ul className="mission__grid">
            {announcementItems.map((item) => (
              <li className="mission__item" key={item.number}>
                <span className="mission__number" aria-hidden="true">
                  {item.number.padStart(2, '0')}
                </span>
                <div className="mission__content">
                  <p className="mission__date">{item.date}</p>
                  <h2 className="mission__item-title">{item.title}</h2>
                  <p className="mission__text">{item.text}</p>
                  <span className="mission__tag">Announcement</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mission__empty">No announcements right now. Check back soon.</p>
        )}
      </div>
    </section>
  )
}
