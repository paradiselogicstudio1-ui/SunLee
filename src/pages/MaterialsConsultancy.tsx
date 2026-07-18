import { useState } from 'react'
import StoneMatchmaker from '../components/StoneMatchmaker'
import ContactForm from '../components/ContactForm'
import './materials.css'

const processSteps = [
  {
    title: 'Sourcing & Selection',
    body: 'We travel to quarries across five continents, evaluating block by veining, density, and character — so every material is chosen to match what your story is telling.',
  },
  {
    title: 'Production Oversight',
    body: 'On-site, precision is everything. We supervise fabrication, templating, and fitting — coordinating with architects and contractors as one team.',
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
  const [prefillDetails, setPrefillDetails] = useState('')

  return (
    <main className="materials-page bg-[var(--bg-light)] text-[var(--text-on-light)]">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-40 pb-24 max-w-5xl">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Sanli — Materials Consultancy</span>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mt-6 mb-8">
          From Quarry to Reveal — Every Slab, Considered
        </h1>
        <p className="text-lg opacity-70 max-w-2xl">
          We guide architects, designers, and fabricators through the full lifecycle of natural and engineered
          stone — from first selection at the quarry to the finished surface in situ, and the years of care that
          follow.
        </p>
      </section>

      {/* Process Timeline */}
      <section className="px-6 md:px-10 py-24 border-t border-black/10">
        <h2 className="font-display text-3xl md:text-4xl mb-16">Our Process</h2>
        <div className="process-timeline grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {processSteps.map((step, i) => (
            <div key={step.title} className="process-step">
              <div className="step-number font-display text-2xl w-12 h-12 rounded-full border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mb-6">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl mb-3">{step.title}</h3>
              <p className="text-sm opacity-65 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stone Matchmaker */}
      <section className="px-6 md:px-10 py-24 border-t border-black/10 bg-[var(--stone-warm)]/15">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Interactive</span>
        <h2 className="font-display text-3xl md:text-4xl mt-4 mb-4">Stone Matchmaker</h2>
        <p className="opacity-70 max-w-2xl mb-12">
          Answer three quick questions about your project and we'll surface the materials best suited to your
          location, aesthetic, and performance needs.
        </p>
        <StoneMatchmaker onConsult={setPrefillDetails} />
      </section>

      {/* Contact Form */}
      <section className="px-6 md:px-10 py-24 border-t border-black/10">
        <ContactForm
          source="Materials Consultancy"
          title="Discuss Your Project Fleet"
          description="Whether you're sourcing a single statement slab or managing material selection across a portfolio of properties, our consultancy team can help."
          detailsLabel="Project Details"
          detailsPlaceholder="Tell us about your project — scope, locations, timeline, and any materials you're considering."
          prefillDetails={prefillDetails}
        />
      </section>
    </main>
  )
}
