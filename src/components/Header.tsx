import { NavLink } from 'react-router-dom'
import logo from '../../Logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/materials-consultancy', label: 'Materials Consultancy' },
  { to: '/production-consultancy', label: 'Book a Consultation' },
]

export default function Header() {
  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-black/25 backdrop-blur-md text-[var(--text-on-dark)]">
      <NavLink to="/" className="site-logo" aria-label="FUCI NACCIANI home">
        <img src={logo} alt="FUCI NACCIANI" />
      </NavLink>
      <nav className="flex items-center gap-4 md:gap-8 text-[0.7rem] md:text-xs tracking-[0.18em] uppercase">
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
    </header>
  )
}
