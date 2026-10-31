import { absoluteUrl } from './site'

const ogHero = absoluteUrl('/og/hero-lorum.jpg')
const ogAbout = absoluteUrl('/og/about-lattice.jpg')
const ogContact = absoluteUrl('/og/contact-call.jpg')
const ogProjects = absoluteUrl('/og/project-wave.jpg')

export type SEOConfig = {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  twitterSite?: string
  twitterCreator?: string
}

export const routeSEO: Record<string, SEOConfig> = {
  main: {
    title: 'ITSS — Information Technology Student Society',
    description:
      'ITSS is the Information Technology Student Society — a student-led community for people who build, break and learn technology together. Workshops, hackathons, build nights, and a community for students who build with technology.',
    ogTitle: 'ITSS — Information Technology Student Society',
    ogDescription:
      'ITSS is the Information Technology Student Society — a student-led community for people who build, break and learn technology together.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  gallery: {
    title: 'About Us — ITSS',
    description:
      'ITSS is the Information Technology Student Society — a student-led community for people who build, break and learn technology together. We run hands-on workshops, hackathons and weekly build nights, and help members turn ideas into working projects.',
    ogTitle: 'About Us — ITSS',
    ogDescription:
      'ITSS is the Information Technology Student Society — a student-led community for people who build, break and learn technology together.',
    ogImage: ogAbout,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  mission: {
    title: 'Mission — ITSS',
    description:
      'To help every IT student turn curiosity into capability through hands-on learning, shared projects and a community that builds together.',
    ogTitle: 'Mission — ITSS',
    ogDescription:
      'To help every IT student turn curiosity into capability through hands-on learning, shared projects and a community that builds together.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  vision: {
    title: 'Vision — ITSS',
    description:
      'A campus where every IT student has the confidence, skills and community to shape technology for good.',
    ogTitle: 'Vision — ITSS',
    ogDescription:
      'A campus where every IT student has the confidence, skills and community to shape technology for good.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  'quality-policy': {
    title: 'Quality Policy — ITSS',
    description:
      'ITSS is committed to running relevant, accessible and well-run programs for its members and the university community.',
    ogTitle: 'Quality Policy — ITSS',
    ogDescription:
      'ITSS is committed to running relevant, accessible and well-run programs for its members and the university community.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  cbl: {
    title: 'Constitution and By-Laws — ITSS',
    description:
      'The governing document of the Information Technology Student Society. It defines our name, purpose, membership and how the organization is run.',
    ogTitle: 'Constitution and By-Laws — ITSS',
    ogDescription:
      'The governing document of the Information Technology Student Society. It defines our name, purpose, membership and how the organization is run.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  executive: {
    title: 'Organization Executive — ITSS',
    description:
      'The elected officers who lead ITSS, coordinate its programs and represent the society to the university.',
    ogTitle: 'Organization Executive — ITSS',
    ogDescription:
      'The elected officers who lead ITSS, coordinate its programs and represent the society to the university.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  projects: {
    title: 'Programs — ITSS',
    description:
      'Our Programs: CampusBuild, Hackathon 2026, Build Nights, Workshop Series, and Alumni Network. Student-led projects that solve real campus problems.',
    ogTitle: 'Programs — ITSS',
    ogDescription:
      'Our Programs: CampusBuild, Hackathon 2026, Build Nights, Workshop Series, and Alumni Network. Student-led projects that solve real campus problems.',
    ogImage: ogProjects,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  announcements: {
    title: 'News — ITSS',
    description:
      'Latest announcements from ITSS: Hackathon 2026 registration, weekly Build Nights, and more.',
    ogTitle: 'News — ITSS',
    ogDescription:
      'Latest announcements from ITSS: Hackathon 2026 registration, weekly Build Nights, and more.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  'learning-materials': {
    title: 'Learning Materials — ITSS',
    description:
      'Slides, guides and starter resources from ITSS activities, collected in one place for members.',
    ogTitle: 'Learning Materials — ITSS',
    ogDescription:
      'Slides, guides and starter resources from ITSS activities, collected in one place for members.',
    ogImage: ogHero,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
  contact: {
    title: 'Contact Us — ITSS',
    description:
      'Get in touch with ITSS. Student Union - Room 204, University Campus. Phone: (555) 012-3456. Email: itss.cvsusc@gmail.com',
    ogTitle: 'Contact Us — ITSS',
    ogDescription:
      'Get in touch with ITSS. Student Union - Room 204, University Campus. Phone: (555) 012-3456. Email: itss.cvsusc@gmail.com',
    ogImage: ogContact,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@itss_cvsusc',
  },
}

export function getSEOConfig(view: string): SEOConfig {
  return routeSEO[view] || routeSEO.main
}