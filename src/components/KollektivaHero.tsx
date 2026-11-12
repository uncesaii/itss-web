import type { MouseEvent } from 'react'
import type { ViewId } from '../content'
import { pathForView } from '../routes'
import { ArrowRight } from './ArrowRight'
import './KollektivaHero.css'

type KollektivaHeroProps = {
  onNavigate?: (view: ViewId) => void
}

type TeamMember = {
  name: string
  role: string
  image: string
}

const team: TeamMember[] = [
  {
    name: 'Mika Santos',
    role: 'President',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225202_f9e684f3-dc19-469a-8142-eb391bfc601b.png&w=960&q=82',
  },
  {
    name: 'Jomar Reyes',
    role: 'Vice President',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225149_7937e8ea-3b0a-46ab-919f-775627695a23.png&w=960&q=82',
  },
  {
    name: 'Paula Cruz',
    role: 'Secretary',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225153_f2b1fc04-776a-4f2e-879b-b764ea762e77.png&w=960&q=82',
  },
  {
    name: 'Nathan Lim',
    role: 'Treasurer',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225847_f456fd9c-8938-4103-836d-51b0e88a9510.png&w=960&q=82',
  },
  {
    name: 'Bea Villanueva',
    role: 'Public Relations Officer',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225854_3958a522-6203-4f84-a7fa-3b3f1dcd7256.png&w=960&q=82',
  },
  {
    name: 'Gabriel Mendoza',
    role: 'Technical Lead',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231111_fcefaa07-6851-4fdc-ac7b-98754ac9d5c4.png&w=960&q=82',
  },
  {
    name: 'Sofia Ramirez',
    role: 'Creatives Lead',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231124_9a1505aa-8c44-4046-aff8-1aa0bc7b3ef3.png&w=960&q=82',
  },
  {
    name: 'Eli Navarro',
    role: 'Community Lead',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_230413_62e8b331-89be-4d35-84fe-330ba9b1b64f.png&w=960&q=82',
  },
]

const CONTACT_EMAIL = 'itss.cvsusc@gmail.com'
const CONTACT_PHONE = '(555) 012-3456'

function downloadVcard(member: TeamMember, event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${member.name}`,
    `TITLE:${member.role}`,
    'ORG:ITSS - Cavite State University Silang Campus',
    `EMAIL;TYPE=work:${CONTACT_EMAIL}`,
    `TEL;TYPE=work:${CONTACT_PHONE}`,
    'END:VCARD',
  ]
  const url = URL.createObjectURL(
    new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' }),
  )
  const link = document.createElement('a')
  link.href = url
  link.download = `${member.name.replace(/\s+/g, '-').toLowerCase()}.vcf`
  link.click()
  URL.revokeObjectURL(url)
}

export function KollektivaHero({ onNavigate }: KollektivaHeroProps) {
  const handleContact = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return
    event.preventDefault()
    onNavigate('contact')
  }

  return (
    <section className="exec" aria-labelledby="exec-title">
      <div className="exec__banner">
        <div className="container exec__banner-inner">
          <div>
            <p className="exec__eyebrow">Our organization</p>
            <h1 className="exec__title" id="exec-title">
              The Executive Board
            </h1>
          </div>
          <p className="exec__intro">
            The elected officers who lead the society, coordinate its programs and represent
            IT students to the university.
          </p>
        </div>
      </div>

      <div className="container exec__main">
        <ul className="exec__grid">
          {team.map((member) => (
            <li className="exec-card" key={member.name}>
              <div className="exec-card__media">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  onContextMenu={(event) => event.preventDefault()}
                  onDragStart={(event) => event.preventDefault()}
                />
                <span className="exec-card__cover" aria-hidden="true" />
                <div className="exec-card__box">
                  <h2 className="exec-card__title">
                    <span className="exec-card__name">{member.name}</span>
                    <span className="exec-card__role"> - {member.role}</span>
                  </h2>
                  <div className="exec-card__details">
                    <p className="exec-card__address">
                      Student Union - Room 204
                      <br />
                      Cavite State University, Silang Campus
                    </p>
                    <div className="exec-card__links">
                      <span className="exec-card__phone">{CONTACT_PHONE}</span>
                      <a
                        className="exec-card__link"
                        href="#"
                        onClick={(event) => downloadVcard(member, event)}
                      >
                        vCard
                      </a>
                      <a className="exec-card__link" href={`mailto:${CONTACT_EMAIL}`}>
                        E-Mail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="exec__cta">
          <div>
            <h2 className="exec__cta-title">Want to serve on the board?</h2>
            <p className="exec__cta-text">
              Elections open every academic year. Talk to any officer to learn how the process
              works.
            </p>
          </div>
          <a
            className="btn btn--dark"
            href={pathForView('contact')}
            onClick={handleContact}
          >
            <span>Ask an officer</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}
