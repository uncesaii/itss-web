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
        <div className="exec__grid">
          {team.map((member) => (
            <article className="exec-card" key={member.name}>
              <div className="exec-card__media">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  onContextMenu={(event) => event.preventDefault()}
                  onDragStart={(event) => event.preventDefault()}
                />
              </div>
              <div className="exec-card__body">
                <span className="exec-card__role">{member.role}</span>
                <h2 className="exec-card__name">{member.name}</h2>
              </div>
            </article>
          ))}
        </div>

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
