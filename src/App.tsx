import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent } from 'react'
import { About } from './components/About'
import { CallBack } from './components/CallBack'
import './components/CallBack.css'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import {
  ContactBand,
  Features,
  Intro,
  LearningBand,
  NewsGrid,
  Showcase,
  Stats,
  Voices,
  WhatWeDo,
} from './components/HomeSections'
import { InfoPage } from './components/InfoPage'
import { KollektivaHero } from './components/KollektivaHero'
import { Mission } from './components/Mission'
import { NotFound } from './components/NotFound'
import { PageSkeleton } from './components/PageSkeleton'
import { Projects } from './components/Projects'
import { infoPages, type InfoViewId, type ViewId } from './content'
import { learningBooks } from './learningBooks'
import { isViewId, pathForView, viewForPath } from './routes'
import { usePageReady } from './usePageReady'
import { useSEO } from './components/SEO'
import './App.css'

const BooksShowcase = lazy(() => import('./components/BooksShowcase'))

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
  const [isSticky, setIsSticky] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
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
    setIsSticky(false)
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeView])

  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return

    const syncSticky = () => {
      const topHeader = scroller.querySelector<HTMLElement>(':scope > .header')
      const threshold = topHeader?.offsetHeight ?? 100
      setIsSticky(scroller.scrollTop >= threshold)
      setIsScrolled(scroller.scrollTop >= 460)
    }
    syncSticky()
    scroller.addEventListener('scroll', syncSticky, { passive: true })
    window.addEventListener('resize', syncSticky)

    return () => {
      scroller.removeEventListener('scroll', syncSticky)
      window.removeEventListener('resize', syncSticky)
    }
  }, [])

  useSEO(activeView)

  useEffect(() => {
    if (!isPageReady) return

    const scroller = scrollRef.current
    if (!scroller) return

    const sections = Array.from(
      scroller.querySelectorAll<HTMLElement>('.app-view--main .app-view__body > .hs'),
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { root: scroller, rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top < scroller.clientHeight * 0.92 && rect.bottom > 0) {
        section.classList.add('is-in')
      } else {
        observer.observe(section)
      }
    })
    scroller.classList.add('reveal-enabled')

    return () => {
      observer.disconnect()
      scroller.classList.remove('reveal-enabled')
      sections.forEach((section) => section.classList.remove('is-in'))
    }
  }, [activeView, isPageReady])

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
      scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    setActiveView(view)
  }

  const handleSkip = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    mainRef.current?.focus({ preventScroll: true })
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  let content
  const isInfoView =
    activeView !== null &&
    activeView !== 'executive' &&
    activeView !== 'learning-materials' &&
    isInfoViewId(activeView)

  if (activeView === null) {
    content = <NotFound onNavigate={navigate} />
  } else if (activeView === 'executive') {
    content = <KollektivaHero onNavigate={navigate} />
  } else if (activeView === 'learning-materials') {
    content = (
      <InfoPage content={infoPages['learning-materials']} onNavigate={navigate}>
        <Suspense fallback={<div className="min-h-[560px] w-full bg-[#001147]" aria-hidden="true" />}>
          <BooksShowcase
            books={learningBooks}
            heroTitle="Books"
            showNav={false}
            className="after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:z-[5] after:bg-gradient-to-b after:from-transparent after:to-white after:content-['']"
            themeColors={{
              bg: '#001147',
              bgLight: '#001147',
              foregroundLight: '#ffffff',
              foregroundDark: '#ffffff',
              hero: '#ffffff',
            }}
          />
        </Suspense>
      </InfoPage>
    )
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
        <Intro onNavigate={navigate} />
        <Features />
        <WhatWeDo />
        <LearningBand onNavigate={navigate} />
        <Showcase onNavigate={navigate} />
        <Stats />
        <Voices />
        <NewsGrid onNavigate={navigate} />
        <ContactBand onNavigate={navigate} />
      </>
    )
  }

  const viewClass = activeView ?? 'not-found'

  return (
    <div className="app">
      <a className="skip-link" href="#content" onClick={handleSkip}>
        Skip to content
      </a>
      <Header
        variant="sticky"
        visible={isSticky}
        activeView={activeView}
        onNavigate={navigate}
      />
      <CallBack
        scrolled={isScrolled}
        onScrollTop={() => scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      />
      <div className="app-scroll" ref={scrollRef}>
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
    </div>
  )
}

