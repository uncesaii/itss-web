import { images, type SiteImage } from './images'

export const viewIds = [
  'main',
  'gallery',
  'mission',
  'vision',
  'quality-policy',
  'cbl',
  'executive',
  'projects',
  'announcements',
  'learning-materials',
  'contact',
] as const

export type ViewId = (typeof viewIds)[number]

export type NavLink = {
  label: string
  view: ViewId
  href: string
}

export type NavItem = {
  label: string
  view?: ViewId
  href?: string
  children?: NavLink[]
}

export const navItems: NavItem[] = [
  { label: 'Home', view: 'main', href: '#main' },
  {
    label: 'About',
    children: [
      { label: 'About Us', view: 'gallery', href: '#gallery' },
      { label: 'Mission', view: 'mission', href: '#mission' },
      { label: 'Vision', view: 'vision', href: '#vision' },
      { label: 'Quality Policy', view: 'quality-policy', href: '#quality-policy' },
      { label: 'Constitution and By-Laws', view: 'cbl', href: '#cbl' },
      { label: 'Organization Executive', view: 'executive', href: '#executive' },
    ],
  },
  { label: 'Programs', view: 'projects', href: '#projects' },
  {
    label: 'Services',
    children: [
      { label: 'Learning Materials', view: 'learning-materials', href: '#learning-materials' },
    ],
  },
  { label: 'News', view: 'announcements', href: '#announcements' },
  { label: 'Contact', view: 'contact', href: '#contact' },
]

export const footerLinks: NavLink[] = [
  { label: 'Home', view: 'main', href: '#main' },
  { label: 'About', view: 'gallery', href: '#gallery' },
  { label: 'Programs', view: 'projects', href: '#projects' },
  { label: 'Services', view: 'learning-materials', href: '#learning-materials' },
  { label: 'News', view: 'announcements', href: '#announcements' },
  { label: 'Contact', view: 'contact', href: '#contact' },
]

export type InfoPageContent = {
  eyebrow: string
  title: string
  intro: string
  items: {
    title: string
    text: string
  }[]
  cta?: {
    label: string
    view: ViewId
  }
}

export const infoPages = {
  mission: {
    eyebrow: 'About ITSS',
    title: 'Mission',
    intro:
      'To help every IT student turn curiosity into capability through hands-on learning, shared projects and a community that builds together.',
    items: [
      {
        title: 'Learn by building',
        text: 'Practical workshops, hackathons and build nights that turn ideas into working projects.',
      },
      {
        title: 'Grow together',
        text: 'A welcoming space where members share what they know and learn from each other.',
      },
      {
        title: 'Serve the campus',
        text: 'Projects that solve real problems for students and the wider university community.',
      },
    ],
  },
  vision: {
    eyebrow: 'About ITSS',
    title: 'Vision',
    intro:
      'A campus where every IT student has the confidence, skills and community to shape technology for good.',
    items: [
      {
        title: 'A connected community',
        text: 'Students across year levels and specializations learning from one another.',
      },
      {
        title: 'Ready for what is next',
        text: 'Members who leave with the technical and collaborative skills to keep growing.',
      },
      {
        title: 'Technology with impact',
        text: 'Student-built work that makes campus life better and shows what IT can do.',
      },
    ],
  },
  'quality-policy': {
    eyebrow: 'About ITSS',
    title: 'Quality Policy',
    intro:
      'ITSS is committed to running relevant, accessible and well-run programs for its members and the university community.',
    items: [
      {
        title: 'Student-centered',
        text: 'Activities are shaped around what members need to learn and achieve.',
      },
      {
        title: 'Consistent delivery',
        text: 'Plans, schedules and materials are prepared and shared clearly.',
      },
      {
        title: 'Inclusive access',
        text: 'Programs are open to members across year levels and experience.',
      },
      {
        title: 'Continuous improvement',
        text: 'Feedback is reviewed so each activity is better than the last.',
      },
    ],
  },
  cbl: {
    eyebrow: 'Our Organization',
    title: 'Constitution and By-Laws',
    intro:
      'The governing document of the Information Technology Student Society. It defines our name, purpose, membership and how the organization is run.',
    items: [
      {
        title: 'Name and Purpose',
        text: 'Establishes the official name of the society and the purpose it serves.',
      },
      {
        title: 'Membership',
        text: 'Covers eligibility, member rights and the responsibilities of membership.',
      },
      {
        title: 'Governance',
        text: 'Outlines the officers, meetings and decision-making of the organization.',
      },
      {
        title: 'Amendments',
        text: 'Explains how the Constitution and By-Laws may be reviewed and amended.',
      },
    ],
    cta: {
      label: 'Request the CBL',
      view: 'contact',
    },
  },
  executive: {
    eyebrow: 'Our Organization',
    title: 'Organization Executive',
    intro:
      'The elected officers who lead ITSS, coordinate its programs and represent the society to the university.',
    items: [
      {
        title: 'President',
        text: 'Sets direction, leads the executive team and represents the society.',
      },
      {
        title: 'Vice President',
        text: "Supports the president and coordinates the society's activities.",
      },
      {
        title: 'Secretary',
        text: 'Keeps records, minutes and the official documents of the organization.',
      },
      {
        title: 'Treasurer',
        text: 'Manages the society’s funds, budget and financial reports.',
      },
      {
        title: 'Public Relations Officer',
        text: 'Leads communications, promotions and partnerships.',
      },
      {
        title: 'Technical Lead',
        text: 'Guides technical programs, projects and workshops.',
      },
    ],
  },
  'learning-materials': {
    eyebrow: 'Services',
    title: 'Learning Materials',
    intro:
      'Slides, guides and starter resources from ITSS activities, collected in one place for members.',
    items: [
      {
        title: 'Workshop slides',
        text: 'Presentation decks and exercise files from the workshop series.',
      },
      {
        title: 'Starter guides',
        text: 'Beginner-friendly references for programming, tools and workflows.',
      },
      {
        title: 'Project templates',
        text: 'Starter repositories and documents for common project types.',
      },
      {
        title: 'Reviewer archive',
        text: 'Community-shared reviewers and practice resources.',
      },
    ],
    cta: {
      label: 'Request Materials',
      view: 'contact',
    },
  },
} satisfies Record<string, InfoPageContent>

export type InfoViewId = keyof typeof infoPages

export type HeroSlide = {
  id: string
  name: string
  image: SiteImage
  alt: string
  position: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'campusbuild',
    name: 'CampusBuild',
    image: images.heroLorum,
    alt: 'Placeholder visual for the CampusBuild initiative',
    position: '50% 50%',
  },
  {
    id: 'hackathon',
    name: 'Hackathon',
    image: images.heroAperture,
    alt: 'Placeholder visual for the ITSS Hackathon',
    position: '28% 50%',
  },
]

export type AnnouncementItem = {
  number: string
  text: string
}

export const announcementItems: AnnouncementItem[] = [
  {
    number: '1',
    text: 'Hackathon 2026 registration is open. Form a team, pick a campus challenge, and ship something useful in one weekend. No prior experience needed.',
  },
  {
    number: '2',
    text: 'Build nights happen every Friday at 5 PM in the Student Union. Bring an idea, meet other members, and get feedback on what you are working on.',
  },
]

export type Project = {
  id: string
  name: string
  image: SiteImage
  alt: string
  category: string
  location: string
  year: string
  description: string
  featured?: boolean
}

export const topProjects: Project[] = [
  {
    id: 'campusbuild',
    name: 'CampusBuild',
    image: images.projectWave,
    alt: 'Placeholder visual for the CampusBuild project',
    category: 'Community',
    location: 'University Campus',
    year: '2026',
    description:
      'A student-led build programme that pairs small teams with campus problems. Members scope, prototype and ship practical tools for the university community.',
    featured: true,
  },
  {
    id: 'hackathon-2026',
    name: 'Hackathon 2026',
    image: images.projectDome,
    alt: 'Placeholder visual for Hackathon 2026',
    category: 'Event',
    location: 'Student Union',
    year: '2026',
    description:
      'A weekend of fast prototypes, peer learning and demos. Teams choose a campus challenge, build together and present their work to students and staff.',
  },
]

export const bottomProjects: Project[] = [
  {
    id: 'build-nights',
    name: 'Build Nights',
    image: images.projectField,
    alt: 'Placeholder visual for the weekly Build Nights',
    category: 'Weekly',
    location: 'Room 204',
    year: 'Ongoing',
    description:
      'A relaxed weekly session for members to work on projects, ask questions and learn from each other. Bring a laptop or just come and listen.',
  },
  {
    id: 'workshop-series',
    name: 'Workshop Series',
    image: images.projectResidential,
    alt: 'Placeholder visual for the ITSS Workshop Series',
    category: 'Learning',
    location: 'Hybrid',
    year: '2026',
    description:
      'Hands-on sessions covering Git, web development, cloud basics, data and security. Each workshop ends with something members can keep building on.',
  },
  {
    id: 'alumni-network',
    name: 'Alumni Network',
    image: images.projectBridge,
    alt: 'Placeholder visual for the ITSS Alumni Network',
    category: 'Community',
    location: 'Global',
    year: '2025',
    description:
      'A growing network of former members who share advice, review portfolios and help current students take their next step into industry.',
  },
]

export const contactDetails = {
  address: ['Student Union - Room 204', 'University Campus'],
  phone: '(555) 012-3456',
  phoneHref: 'tel:+15550123456',
  email: 'itss.cvsusc@gmail.com',
  emailHref: 'mailto:itss.cvsusc@gmail.com',
}

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'X', href: 'https://x.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/' },
]