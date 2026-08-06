import ContactForm from '../components/ContactForm'
import './production.css'

export default function ProductionConsultancy() {
  return (
    <main className="production-page blueprint-bg text-[var(--text-on-dark)] min-h-screen">
      <section className="consultation-section">
        <div className="consultation-panel">
          <div className="consultation-kicker">
            <span>Production advisory</span>
          </div>
          <ContactForm
            source="Production Consultancy"
            title="Book a Consultation"
            description="Tell us about your facility and current setup, and our production team will scope a layout and efficiency review tailored to your operation."
            detailsLabel="Facility Details"
            detailsPlaceholder="Tell us about your facility, current machinery, floor size, throughput goals, and any pain points."
          />
        </div>
      </section>
    </main>
  )
}
