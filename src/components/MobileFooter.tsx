import logo from '../../Logo.png'
import './mobile-footer.css'

export default function MobileFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mobile-site-footer">
      <div className="mobile-footer-brand">
        <img src={logo} alt="Chiani e Soci" />
        <p>Stone consultancy, from quarry to final maintenance.</p>
      </div>

      <button type="button" className="mobile-footer-top" onClick={scrollToTop}>
        To top <span aria-hidden="true" />
      </button>

      <div className="mobile-footer-social" aria-label="Social media">
        <span className="mobile-footer-social-icon" title="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.5 8.25H3.25V20H6.5V8.25ZM4.88 3A1.9 1.9 0 1 0 4.88 6.8 1.9 1.9 0 0 0 4.88 3ZM20.75 13.27c0-3.54-1.89-5.19-4.41-5.19-2.04 0-2.95 1.12-3.46 1.9V8.25H9.63V20h3.25v-5.82c0-1.53.29-3.01 2.19-3.01 1.87 0 1.89 1.75 1.89 3.11V20h3.25l.54-6.73Z" />
          </svg>
          <span className="sr-only">LinkedIn</span>
        </span>
        <span className="mobile-footer-social-icon" title="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" className="instagram-dot" />
          </svg>
          <span className="sr-only">Instagram</span>
        </span>
      </div>

      <div className="mobile-footer-legal">
        <p>© 2026 Sanly Kyanian</p>
        <p className="mobile-footer-vat">P. IVA IT02580410500</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  )
}
