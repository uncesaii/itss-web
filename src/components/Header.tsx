import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { contactDetails, navItems, type ViewId } from '../content'
import { pathForView } from '../routes'
import { Logo } from './Logo'
import './Header.css'

type HeaderProps = {
  activeView: ViewId | null
  onNavigate: (view: ViewId) => void
  variant?: 'default' | 'sticky'
  visible?: boolean
}

type SearchPage = {
  label: string
  view: ViewId
  href: string
}

const searchPages: SearchPage[] = (() => {
  const pages: SearchPage[] = []
  const seen = new Set<ViewId>()

  for (const item of navItems) {
    if (item.view && !seen.has(item.view)) {
      seen.add(item.view)
      pages.push({
        label: item.label,
        view: item.view,
        href: item.href ?? pathForView(item.view),
      })
    }

    for (const child of item.children ?? []) {
      if (seen.has(child.view)) continue
      seen.add(child.view)
      pages.push({ label: child.label, view: child.view, href: child.href })
    }
  }

  return pages
})()

function Chevron() {
  return (
    <svg className="header__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="m15.8 15.8 4.3 4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Header({
  activeView,
  onNavigate,
  variant = 'default',
  visible = true,
}: HeaderProps) {
  const isStickyVariant = variant === 'sticky'
  const overlayMode = !isStickyVariant && activeView === 'main'
  const navId = isStickyVariant ? 'site-nav-sticky' : 'site-nav'
  const menuIdPrefix = isStickyVariant ? 'sticky-' : ''
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [line, setLine] = useState<{ left: number; width: number } | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const navListRef = useRef<HTMLUListElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const focusSearchRef = useRef(false)

  const positionLine = useCallback((target: HTMLElement | null) => {
    const nav = navRef.current
    if (!nav || !target) {
      setLine(null)
      return
    }
    const navRect = nav.getBoundingClientRect()
    const rect = target.getBoundingClientRect()
    setLine({ left: rect.left - navRect.left, width: rect.width })
  }, [])

  const resetLine = useCallback(() => {
    const list = navListRef.current
    if (!list) return
    positionLine(list.querySelector<HTMLElement>('[data-active="true"]'))
  }, [positionLine])

  useEffect(() => {
    resetLine()
    document.fonts?.ready.then(resetLine)
    const handleResize = () => resetLine()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [resetLine, activeView])

  useEffect(() => {
    const timer = window.setTimeout(resetLine, 320)
    return () => window.clearTimeout(timer)
  }, [resetLine, isStickyVariant, visible])

  const normalizedQuery = query.trim().toLowerCase()
  const results = normalizedQuery
    ? searchPages.filter((page) => page.label.toLowerCase().includes(normalizedQuery))
    : searchPages

  useEffect(() => {
    setIsOpen(false)
    setOpenMenu(null)
    setSearchOpen(false)
    setQuery('')
  }, [activeView])

  useEffect(() => {
    if (isStickyVariant && !visible) {
      setIsOpen(false)
      setOpenMenu(null)
      setSearchOpen(false)
      setQuery('')
    }
  }, [isStickyVariant, visible])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setOpenMenu(null)
        setSearchOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!openMenu) return

    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [openMenu])

  useEffect(() => {
    if (!searchOpen || !focusSearchRef.current) return

    focusSearchRef.current = false
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 40)
    return () => window.clearTimeout(timer)
  }, [searchOpen])

  const closeAll = () => {
    setIsOpen(false)
    setOpenMenu(null)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  const openSearch = () => {
    setQuery('')
    focusSearchRef.current = true
    setSearchOpen(true)
    closeAll()
  }

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, view: ViewId) => {
    event.preventDefault()
    closeAll()
    closeSearch()
    onNavigate(view)
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const first = results[0]
    if (first) {
      closeSearch()
      onNavigate(first.view)
    }
  }

  const toggleMobileMenu = () => {
    const next = !isOpen
    setIsOpen(next)
    if (!next) setOpenMenu(null)
  }

  return (
    <header
      className={`header${isStickyVariant ? ' header--sticky' : ''}${
        isStickyVariant && activeView === 'main' ? ' header--sticky-main' : ''
      }${
        !isStickyVariant && activeView === 'main' ? ' header--overlay' : ''
      }${isOpen ? ' header--menu-open' : ''}${
        activeView !== null && activeView !== 'main' ? ' header--inner' : ''
      }${
        isStickyVariant && visible ? ' is-visible' : ''
      }`}
      aria-hidden={isStickyVariant && !visible ? true : undefined}
    >
      <div className="container header__inner">
        <div className="header__side header__side--left">
          <a
            className="header__logo"
            href={pathForView('main')}
            aria-label="ITSS, Information Technology Student Society, home"
            onClick={(event) => handleNavigate(event, 'main')}
          >
            <Logo light={overlayMode} />
          </a>
        </div>

        <div className="header__side header__side--center">
          <nav
            id={navId}
            ref={navRef}
            className={`header__nav${isOpen ? ' is-open' : ''}`}
            aria-label="Primary"
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') resetLine()
            }}
          >
            <span
              className={`header__menu-line${line ? ' is-visible' : ''}`}
              aria-hidden="true"
              style={
                line
                  ? { left: `${line.left}px`, width: `${line.width}px` }
                  : undefined
              }
            />
            <div className="header__nav-clip">
            <ul className="header__nav-list" ref={navListRef}>
            {navItems.map((item) => {
              const isActive =
                item.view === activeView ||
                item.children?.some((child) => child.view === activeView) === true
              const menuOpen = openMenu === item.label
              const menuId = `${menuIdPrefix}${item.label.toLowerCase()}-submenu`

              if (item.children) {
                return (
                  <li
                    className={`header__item header__item--has-menu${menuOpen ? ' is-open' : ''}`}
                    key={item.label}
                    data-active={isActive ? 'true' : undefined}
                    onPointerEnter={(event: ReactPointerEvent<HTMLLIElement>) => {
                      if (event.pointerType === 'mouse') {
                        setOpenMenu(item.label)
                        positionLine(event.currentTarget)
                      }
                    }}
                    onPointerLeave={(event: ReactPointerEvent<HTMLLIElement>) => {
                      if (event.pointerType === 'mouse') {
                        setOpenMenu((current) => (current === item.label ? null : current))
                      }
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setOpenMenu(null)
                      }
                    }}
                  >
                    <button
                      className={`header__link header__link--toggle${isActive ? ' is-active' : ''}`}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={menuOpen}
                      aria-controls={menuId}
                      onClick={() => setOpenMenu(menuOpen ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <Chevron />
                    </button>

                    <div className="header__submenu-clip">
                    <ul
                      className={`header__submenu${menuOpen ? ' is-open' : ''}`}
                      id={menuId}
                    >
                      {item.children.map((child) => {
                        const childActive = child.view === activeView

                        return (
                          <li key={child.view}>
                            <a
                              className={`header__sublink${childActive ? ' is-active' : ''}`}
                              href={child.href}
                              aria-current={childActive ? 'page' : undefined}
                              onClick={(event) => handleNavigate(event, child.view)}
                            >
                              {child.label}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                    </div>
                  </li>
                )
              }

              return (
                <li
                  className="header__item"
                  key={item.label}
                  data-active={isActive ? 'true' : undefined}
                  onPointerEnter={(event: ReactPointerEvent<HTMLLIElement>) => {
                    if (event.pointerType === 'mouse') positionLine(event.currentTarget)
                  }}
                >
                  <a
                    className={`header__link${isActive ? ' is-active' : ''}`}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => handleNavigate(event, item.view!)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
            </div>
        </nav>
        </div>

        <div className="header__side header__side--right">
        <div className="header__aside">
          <div
            className={`header__search${searchOpen ? ' is-open' : ''}`}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setSearchOpen(true)
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') {
                const active = document.activeElement
                if (!event.currentTarget.contains(active)) {
                  closeSearch()
                }
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                closeSearch()
              }
            }}
          >
            <button
              className="header__icon-btn"
              type="button"
              aria-label="Search the site"
              aria-expanded={searchOpen}
              aria-controls={`${menuIdPrefix}search-panel`}
              onClick={openSearch}
            >
              <SearchIcon />
            </button>

            <div
              className={`header__search-panel${searchOpen ? ' is-open' : ''}`}
              id={`${menuIdPrefix}search-panel`}
            >
              <form className="search__form" role="search" onSubmit={handleSearchSubmit}>
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  className="search__input"
                  type="search"
                  name="query"
                  placeholder="Search pages…"
                  aria-label="Search pages"
                  autoComplete="off"
                  value={query}
                  tabIndex={searchOpen ? 0 : -1}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </form>

              <ul className="search__results">
                {results.map((page) => (
                  <li key={page.view}>
                    <a
                      className="search__result"
                      href={page.href}
                      tabIndex={searchOpen ? 0 : -1}
                      onClick={(event) => handleNavigate(event, page.view)}
                    >
                      <span className="search__result-label">{page.label}</span>
                      <span className="search__result-path">{page.href}</span>
                    </a>
                  </li>
                ))}
                {results.length === 0 && (
                  <li className="search__empty">No pages match “{query.trim()}”.</li>
                )}
              </ul>
            </div>
          </div>
          <span className="header__divider" aria-hidden="true" />
          <a className="header__phone" href={contactDetails.phoneHref}>
            {contactDetails.phone}
          </a>
        </div>
        </div>

        <button
          className="header__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls={navId}
          onClick={toggleMobileMenu}
        >
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

    </header>
  )
}
