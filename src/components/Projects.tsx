import { useEffect, useRef, useState, type MouseEvent } from 'react'
import {
  bottomProjects,
  topProjects,
  type Project,
  type ViewId,
} from '../content'
import { pathForView } from '../routes'
import { OptimizedImage } from './OptimizedImage'
import { ArrowRight } from './ArrowRight'
import './Projects.css'

type ProjectCardProps = {
  project: Project
  onOpen: (project: Project) => void
}

type ProjectsProps = {
  onNavigate: (view: ViewId) => void
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      className={`project${project.featured ? ' project--featured' : ''}`}
      type="button"
      aria-haspopup="dialog"
      onClick={() => onOpen(project)}
    >
      <OptimizedImage image={project.image} alt={project.alt} loading="lazy" />
      {project.featured ? (
        <span className="project__content">
          <span className="project__name">{project.name}</span>
          <span className="project__link">
            View More
            <ArrowRight />
          </span>
        </span>
      ) : (
        <span className="sr-only">View {project.name}</span>
      )}
    </button>
  )
}

export function Projects({ onNavigate }: ProjectsProps) {
  const [selected, setSelected] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (selected && !dialog.open) {
      dialog.showModal()
    }

    if (!selected && dialog.open) {
      dialog.close()
    }
  }, [selected])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [selected])

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeDialog()
    }
  }

  const handleCta = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate('contact')
  }

  const handleDialogCta = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    closeDialog()
    onNavigate('contact')
  }

  return (
    <section className="projects section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <h1 className="section-title" id="projects-title">
          Our Projects
        </h1>

        <div className="projects__grid">
          <div className="projects__row projects__row--top">
            {topProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </div>

          <div className="projects__row projects__row--bottom">
            {bottomProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </div>
        </div>

        <a className="btn btn--dark projects__cta" href={pathForView('contact')} onClick={handleCta}>
          <span>Join ITSS</span>
          <ArrowRight />
        </a>
      </div>

      <dialog
        className="project-dialog"
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        onClick={handleBackdropClick}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="project-dialog__body">
            <button
              className="project-dialog__close"
              type="button"
              onClick={closeDialog}
              aria-label="Close project details"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>

            <div className="project-dialog__media">
              <OptimizedImage image={selected.image} alt={selected.alt} loading="lazy" />
            </div>

            <div className="project-dialog__content">
              <p className="project-dialog__eyebrow">
                {selected.category} · {selected.location} · {selected.year}
              </p>
              <h3 className="project-dialog__title" id="project-dialog-title">
                {selected.name}
              </h3>
              <p className="project-dialog__text">{selected.description}</p>
              <a
                className="btn btn--dark project-dialog__cta"
                href={pathForView('contact')}
                onClick={handleDialogCta}
              >
                <span>Get Involved</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}