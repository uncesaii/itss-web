import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InfoPage } from './components/InfoPage'
import { Mission } from './components/Mission'
import { PageSkeleton } from './components/PageSkeleton'
import { Projects } from './components/Projects'
import { infoPages, viewIds, type InfoViewId, type ViewId } from './content'
import { usePageReady } from './usePageReady'
import { useSEO } from './components/SEO'
import './App.css'

function isViewId(value: string): value is ViewId {
  return (viewIds as readonly string[]).includes(value)
}

function isInfoViewId(value: ViewId): value is InfoViewId {
  return value in infoPages
}

function viewFromLocation(): ViewId {
  const value = window.location.hash.replace(/^#\/?/, '')
  return isViewId(value) ? value : 'main'
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>(viewFromLocation)
  const mainRef = useRef<HTMLElement>(null)
  const isPageReady = usePageReady(activeView)

  useEffect(() => {
    const syncView = () => setActiveView(viewFromLocation())

    window.addEventListener('hashchange', syncView)
    window.addEventListener('popstate', syncView)

    return () => {
      window.removeEventListener('hashchange', syncView)
      window.removeEventListener('popstate', syncView)
    }
  }, [])

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeView])

  useSEO(activeView)

  const navigate = (view: ViewId) => {
    if (view !== activeView) {
      history.pushState(null, '', `#${view}`)
    } else {
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
  const isInfoView = isInfoViewId(activeView)

  if (isInfoView) {
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
          className={`app-view app-view--${activeView}${isInfoView ? ' app-view--info' : ''}`}
          key={activeView}
        >
          <div className="app-view__body" aria-busy={!isPageReady}>
            {isPageReady ? content : <PageSkeleton view={activeView} />}
          </div>
          <Footer onNavigate={navigate} />
        </div>
      </main>
    </div>
  )
}
