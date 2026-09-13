import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../Logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/materials-consultancy', label: 'Materials Consultancy' },
  { to: '/production-consultancy-services', label: 'Production Consultancy' },
  { to: '/production-consultancy', label: 'Book a Consultation' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-black/25 backdrop-blur-md text-[var(--text-on-dark)]">
      <NavLink
        to="/materials-consultancy"
        className="mobile-header-action"
        aria-label="Explore materials"
        onClick={() => setMenuOpen(false)}
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="14" cy="14" r="8" />
          <path d="m20 20 7 7" />
        </svg>
      </NavLink>
      <NavLink to="/" className="site-logo" aria-label="FUCI NACCIANI home">
        <img src={logo} alt="FUCI NACCIANI" />
      </NavLink>
      <nav className="desktop-nav flex items-center gap-4 md:gap-8 text-[0.7rem] md:text-xs tracking-[0.18em] uppercase">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `transition-opacity hover:opacity-100 ${isActive ? 'opacity-100 border-b border-current' : 'opacity-60'}`
            }
            end
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className={`mobile-menu-button${menuOpen ? ' is-open' : ''}`}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="mobile-navigation"
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            tabIndex={menuOpen ? 0 : -1}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
            onClick={() => setMenuOpen(false)}
            end
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
