import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { navItems, type ViewId } from '../content'
import { pathForView } from '../routes'
import { Logo } from './Logo'
import './Header.css'

type HeaderProps = {
  activeView: ViewId | null
  onNavigate: (view: ViewId) => void
}

function Chevron() {
  return (
    <svg className="header__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Header({ activeView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsOpen(false)
    setOpenMenu(null)
  }, [activeView])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setOpenMenu(null)
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

  const closeAll = () => {
    setIsOpen(false)
    setOpenMenu(null)
  }

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, view: ViewId) => {
    event.preventDefault()
    closeAll()
    onNavigate(view)
  }

  const toggleMobileMenu = () => {
    const next = !isOpen
    setIsOpen(next)
    if (!next) setOpenMenu(null)
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <a
          className="header__logo"
          href={pathForView('main')}
          aria-label="ITSS Information Technology Student Society — home"
          onClick={(event) => handleNavigate(event, 'main')}
        >
          <Logo />
        </a>

        <button
          className="header__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={toggleMobileMenu}
        >
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav
          id="site-nav"
          ref={navRef}
          className={`header__nav${isOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          <ul className="header__nav-list">
            {navItems.map((item) => {
              const isActive =
                item.view === activeView ||
                item.children?.some((child) => child.view === activeView) === true
              const menuOpen = openMenu === item.label
              const menuId = `${item.label.toLowerCase()}-submenu`

              if (item.children) {
                return (
                  <li
                    className={`header__item header__item--has-menu${menuOpen ? ' is-open' : ''}`}
                    key={item.label}
                    onPointerEnter={(event: ReactPointerEvent<HTMLLIElement>) => {
                      if (event.pointerType === 'mouse') setOpenMenu(item.label)
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
                  </li>
                )
              }

              return (
                <li className="header__item" key={item.label}>
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
        </nav>
      </div>
    </header>
  )
}
