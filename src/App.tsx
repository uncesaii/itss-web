import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InfoPage } from './components/InfoPage'
import { KollektivaHero } from './components/KollektivaHero'
import { Mission } from './components/Mission'
import { NotFound } from './components/NotFound'
import { PageSkeleton } from './components/PageSkeleton'
import { Projects } from './components/Projects'
import { infoPages, type InfoViewId, type ViewId } from './content'
import { isViewId, pathForView, viewForPath } from './routes'
import { usePageReady } from './usePageReady'
import { useSEO } from './components/SEO'
import './App.css'

function isInfoViewId(value: ViewId): value is InfoViewId {
  return value in infoPages
}

function resolveView(): ViewId | null {
  const legacyHash = window.location.hash.replace(/^#\/?/, '')
  if (isViewId(legacyHash)) {
    return legacyHash
  }

  return viewForPath(window.location.pathname)
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewId | null>(resolveView)
  const mainRef = useRef<HTMLElement>(null)
  const pageView = activeView ?? 'main'
  const isPageReady = usePageReady(pageView)

  useEffect(() => {
    const syncView = () => setActiveView(resolveView())

    window.addEventListener('popstate', syncView)

    return () => {
      window.removeEventListener('popstate', syncView)
    }
  }, [])

  useEffect(() => {
    const legacyHash = window.location.hash.replace(/^#\/?/, '')
    if (isViewId(legacyHash)) {
      history.replaceState(null, '', pathForView(legacyHash))
      return
    }

    const pathView = viewForPath(window.location.pathname)
    if (pathView && window.location.pathname !== pathForView(pathView)) {
      history.replaceState(null, '', pathForView(pathView))
    }
  }, [])

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeView])

  useSEO(activeView)

  useEffect(() => {
    if (activeView !== null) return

    document.title = 'Page not found — ITSS'

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex'

    document.querySelector('link[rel="canonical"]')?.remove()

    return () => {
      robots?.remove()
    }
  }, [activeView])

  const navigate = (view: ViewId) => {
    const path = pathForView(view)

    if (window.location.pathname !== path || window.location.search) {
      history.pushState(null, '', path)
    }

    if (view === activeView) {
      mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    setActiveView(view)
  }

  const handleSkip = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    mainRef.current?.focus({ preventScroll: true })
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  let content
  const isInfoView = activeView !== null && activeView !== 'executive' && isInfoViewId(activeView)

  if (activeView === null) {
    content = <NotFound onNavigate={navigate} />
  } else if (activeView === 'executive') {
    content = <KollektivaHero />
  } else if (isInfoView) {
    content = <InfoPage content={infoPages[activeView]} onNavigate={navigate} />
  } else if (activeView === 'gallery') {
    content = <About onNavigate={navigate} />
  } else if (activeView === 'projects') {
    content = <Projects onNavigate={navigate} />
  } else if (activeView === 'announcements') {
    content = <Mission />
  } else if (activeView === 'contact') {
    content = <Contact />
  } else {
    content = (
      <>
        <Hero onNavigate={navigate} />
        <About onNavigate={navigate} headingLevel="h2" />
      </>
    )
  }

  const viewClass = activeView ?? 'not-found'

  return (
    <div className="app">
      <a className="skip-link" href="#content" onClick={handleSkip}>
        Skip to content
      </a>
      <Header activeView={activeView} onNavigate={navigate} />
      <main
        className="app-main"
        id="content"
        ref={mainRef}
        tabIndex={-1}
      >
        <div
          className={`app-view app-view--${viewClass}${isInfoView ? ' app-view--info' : ''}`}
          key={viewClass}
        >
          <div className="app-view__body" aria-busy={activeView !== null && !isPageReady}>
            {activeView === null ? content : isPageReady ? content : <PageSkeleton view={activeView} />}
          </div>
          <Footer onNavigate={navigate} />
        </div>
      </main>
    </div>
  )
}
