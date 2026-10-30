import { useState, useEffect } from 'react'

interface TeamMember {
  name: string
  role: string
  image: string
  description: string
}

const team: TeamMember[] = [
  {
    name: 'Andrei Baranov',
    role: 'Design Chief',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225202_f9e684f3-dc19-469a-8142-eb391bfc601b.png&w=1280&q=85',
    description:
      'Andrei sets the visual direction of every project. He turns rough ideas into clear, confident design languages that feel effortless yet leave a lasting impression.',
  },
  {
    name: 'Daria Lebedeva',
    role: 'Interface Expert',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225149_7937e8ea-3b0a-46ab-919f-775627695a23.png&w=1280&q=85',
    description:
      'Daria crafts interfaces people understand at first glance. Every screen she designs balances clarity and character, making complex products feel simple and warm.',
  },
  {
    name: 'Ivan Sorokin',
    role: 'Concept Chief',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225153_f2b1fc04-776a-4f2e-879b-b764ea762e77.png&w=1280&q=85',
    description:
      'Ivan shapes the ideas behind the work. He digs into every brief until the core story emerges, then builds concepts that give each project its reason to exist.',
  },
  {
    name: 'Anna Fedorova',
    role: 'Brand Consultant',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225847_f456fd9c-8938-4103-836d-51b0e88a9510.png&w=1280&q=85',
    description:
      'Anna helps brands find their voice. From positioning to tone, she builds identities that stay consistent everywhere and grow stronger with every appearance.',
  },
  {
    name: 'Pavel Smirnov',
    role: 'Movement Artist',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225854_3958a522-6203-4f84-a7fa-3b3f1dcd7256.png&w=1280&q=85',
    description:
      'Pavel brings stillness to life. His motion work adds rhythm and personality to every product, guiding attention with transitions that feel natural and precise.',
  },
  {
    name: 'Olga Kravtsova',
    role: 'UX Specialist',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231111_fcefaa07-6851-4fdc-ac7b-98754ac9d5c4.png&w=1280&q=85',
    description:
      'Olga studies how people actually use what we make. Her research keeps every decision grounded in real behavior, so the work serves users and not assumptions.',
  },
  {
    name: 'Igor Zakharenko',
    role: 'Graphic Creator',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231124_9a1505aa-8c44-4046-aff8-1aa0bc7b3ef3.png&w=1280&q=85',
    description:
      'Igor gives every project its finishing touch. From typography to illustration, he sweats the visual details that separate good work from unforgettable work.',
  },
  {
    name: 'Ksenia Romanova',
    role: 'Studio Head',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_230413_62e8b331-89be-4d35-84fe-330ba9b1b64f.png&w=1280&q=85',
    description:
      'Ksenia keeps the studio moving as one. She connects people, plans, and priorities so every project ships on time without losing the craft it deserves.',
  },
]

export function KollektivaHero() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Preload all images
  useEffect(() => {
    team.forEach((member) => {
      const img = new Image()
      img.src = member.image
    })
  }, [])

  const active = team[activeIndex]

  return (
    <section
      className="relative flex min-h-[calc(100dvh-102px)] max-[900px]:min-h-[calc(100dvh-80px)] w-full flex-col overflow-hidden font-geist text-white"
      aria-label="Kollektiva team"
    >
      {/* Background portraits */}
      {team.map((member, index) => (
        <div
          key={member.name}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out"
          style={{
            backgroundImage: `url(${member.image})`,
            opacity: index === activeIndex ? 1 : 0,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/25"
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-14 lg:px-16">
        {/* Top zone — headline + bio */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Left — H1 (static) */}
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-white">
              Kollektiva is the talent you build with each&nbsp;day
            </h1>
          </div>

          {/* Right — description (changes with active slide) */}
          <div
            key={active.name}
            className="max-w-xs text-sm font-medium leading-relaxed text-white/80 sm:text-base md:pt-2 animate-fadeIn"
          >
            {active.description}
          </div>
        </div>

        {/* Bottom zone */}
        <div className="flex flex-col gap-8">
          {/* Avatar picker row */}
          <div
            className="flex items-end gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1 sm:overflow-visible sm:pb-0"
            role="tablist"
            aria-label="Team members"
          >
            {team.map((member, index) => (
              <button
                key={member.name}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${member.name}`}
                onClick={() => setActiveIndex(index)}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                {/* Active indicator dot */}
                <span
                  className="h-1 w-1 rounded-full bg-white transition-opacity duration-300"
                  style={{ opacity: index === activeIndex ? 1 : 0 }}
                  aria-hidden="true"
                />

                {/* Circular thumbnail */}
                <div className="h-10 w-10 overflow-hidden rounded-full sm:h-14 sm:w-14">
                  <img
                    src={team[index].image}
                    alt={team[index].name}
                    className="h-full w-full object-cover select-none pointer-events-none"
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Meta footer */}
          <div className="border-t border-white/20 pt-5 flex flex-wrap items-center justify-between gap-4 text-sm font-medium">
            {/* Name */}
            <div
              key={active.name}
              className="animate-fadeIn"
            >
              {active.name}
            </div>

            {/* Role */}
            <div className="hidden sm:block text-white/70">
              {active.role}
            </div>

            {/* Static tenure */}
            <div className="hidden md:block text-white/70">
              In the business since 2020
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}