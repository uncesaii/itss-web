import type { Picture } from 'vite-imagetools'

export type SiteImage = Picture & {
  sizes: string
}

// Hero images
import heroLorum from './assets/images/hero-lorum.jpg?w=640;960;1280;1540&format=avif;webp;jpg&as=picture'
import heroAperture from './assets/images/hero-aperture.jpg?w=480;720;940&format=avif;webp;jpg&as=picture'

// About images
import aboutLattice from './assets/images/about-lattice.jpg?w=360;540&format=avif;webp;jpg&as=picture'
import aboutGlass from './assets/images/about-glass.jpg?w=360;540&format=avif;webp;jpg&as=picture'
import aboutAbstract from './assets/images/about-abstract.jpg?w=360;540&format=avif;webp;jpg&as=picture'

// Contact image
import contactCall from './assets/images/contact-call.jpg?w=640;960;1280;1498&format=avif;webp;jpg&as=picture'

// Project images
import projectWave from './assets/images/project-wave.jpg?w=480;768;1140&format=avif;webp;jpg&as=picture'
import projectDome from './assets/images/project-dome.jpg?w=480;768;1140&format=avif;webp;jpg&as=picture'
import projectField from './assets/images/project-field.jpg?w=360;540&format=avif;webp;jpg&as=picture'
import projectResidential from './assets/images/project-residential.jpg?w=480;720;940&format=avif;webp;jpg&as=picture'
import projectBridge from './assets/images/project-bridge.jpg?w=360;540;740&format=avif;webp;jpg&as=picture'

export const images = {
  heroLorum: { ...heroLorum, sizes: '(min-width: 861px) 55vw, 100vw' },
  heroAperture: { ...heroAperture, sizes: '(min-width: 861px) 55vw, 100vw' },
  aboutLattice: { ...aboutLattice, sizes: '(min-width: 1121px) 270px, (min-width: 641px) 33vw, 50vw' },
  aboutGlass: { ...aboutGlass, sizes: '(min-width: 1121px) 345px, (min-width: 641px) 50vw, 50vw' },
  aboutAbstract: { ...aboutAbstract, sizes: '(min-width: 1121px) 270px, (min-width: 641px) 50vw, 50vw' },
  contactCall: { ...contactCall, sizes: '(min-width: 961px) 50vw, 100vw' },
  projectWave: { ...projectWave, sizes: '(min-width: 901px) 40vw, 100vw' },
  projectDome: { ...projectDome, sizes: '(min-width: 901px) 40vw, 100vw' },
  projectField: { ...projectField, sizes: '(min-width: 901px) 40vw, 100vw' },
  projectResidential: { ...projectResidential, sizes: '(min-width: 901px) 40vw, 100vw' },
  projectBridge: { ...projectBridge, sizes: '(min-width: 901px) 40vw, 100vw' },
} satisfies Record<string, SiteImage>