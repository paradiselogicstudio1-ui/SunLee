import StoneMatchmaker from '../components/StoneMatchmaker'
import './materials.css'

const processSteps = [
  {
    title: 'Sourcing & Selection',
    body: 'We travel to quarries across five continents, evaluating block by veining, density, and character, so every material is chosen to match what your story is telling.',
  },
  {
    title: 'Production Oversight',
    body: 'On-site, precision is everything. We supervise fabrication, templating, and fitting, coordinating with architects and contractors as one team.',
  },
  {
    title: 'Installation Mastery',
    body: 'Our installation partners are vetted for craft and care, ensuring every seam, edge, and reveal meets the standard the material deserves.',
  },
  {
    title: 'Enduring Maintenance',
    body: 'We provide care guides and ongoing support, so the surfaces you specify today remain as striking a decade from now.',
  },
]

export default function MaterialsConsultancy() {
  return (
    <main className="materials-page bg-[var(--bg-light)] text-[var(--text-on-light)]">
      {/* Hero */}
      <section className="materials-hero">
        <div className="materials-shell">
          <h1>From Quarry to Reveal, Every Slab, Considered</h1>
          <p>
            We guide architects, designers, and fabricators through the full lifecycle of natural and engineered
            stone, from first selection at the quarry to the finished surface in situ, and the years of care that
            follow.
          </p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="materials-process">
        <div className="materials-shell">
          <h2>Our Process</h2>
          <div className="process-timeline">
            {processSteps.map((step) => (
              <div key={step.title} className="process-step">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stone Matchmaker */}
      <section className="materials-matchmaker">
        <div className="materials-shell">
          <h2>Stone Matchmaker</h2>
          <p className="matchmaker-intro">
            Answer three quick questions about your project and we'll surface the materials best suited to your
            location, aesthetic, and performance needs.
          </p>
          <StoneMatchmaker />
        </div>
      </section>
    </main>
  )
}
