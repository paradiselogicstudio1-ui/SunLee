import FactoryEfficiencySimulator from '../components/FactoryEfficiencySimulator'
import ContactForm from '../components/ContactForm'
import './production.css'

const serviceBlocks = [
  {
    code: '01',
    title: 'Machinery & Tooling Procurement',
    body: 'We specify and source bridge saws, CNC routers, polishing lines, and tooling matched to your material mix and throughput targets — vetted against real-world performance data, not brochures.',
  },
  {
    code: '02',
    title: 'Facility Layout & Workflow Design',
    body: 'From slab storage to dispatch, we engineer the floor plan around material flow — minimizing handling, cutting travel distance, and removing the hidden delays that compound across a shift.',
  },
  {
    code: '03',
    title: 'Efficiency & Performance Audits',
    body: 'We instrument and analyze existing operations, station by station, to surface bottlenecks, idle time, and capacity mismatches — then deliver a prioritized roadmap for upgrades.',
  },
]

export default function ProductionConsultancy() {
  return (
    <main className="production-page blueprint-bg text-[var(--text-on-dark)] min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-40 pb-24 max-w-5xl">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Sanli — Production Consultancy</span>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mt-6 mb-8">
          Engineering the Factory Floor for Stone
        </h1>
        <p className="text-lg opacity-70 max-w-2xl">
          We help fabrication shops and stone yards run leaner — pairing the right machinery with a floor plan
          designed around how material actually moves, from raw slab to finished piece.
        </p>
      </section>

      {/* Service Blocks */}
      <section className="px-6 md:px-10 py-24 border-t border-[var(--text-on-dark)]/10">
        <h2 className="font-display text-3xl md:text-4xl mb-16">Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceBlocks.map((block) => (
            <div key={block.code} className="tech-card">
              <div className="font-display text-3xl text-[var(--accent)] mb-6">{block.code}</div>
              <h3 className="font-display text-xl mb-3">{block.title}</h3>
              <p className="text-sm opacity-65 leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Factory Efficiency Simulator */}
      <section className="px-6 md:px-10 py-24 border-t border-[var(--text-on-dark)]/10">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Interactive</span>
        <h2 className="font-display text-3xl md:text-4xl mt-4 mb-4">Factory Efficiency Simulator</h2>
        <p className="opacity-70 max-w-2xl mb-12">
          Adjust your shop's configuration below to see how bottlenecks shift across the production line — from
          slab storage through saws, edge polishing, and hand finishing.
        </p>
        <FactoryEfficiencySimulator />
      </section>

      {/* Contact Form */}
      <section className="px-6 md:px-10 py-24 border-t border-[var(--text-on-dark)]/10">
        <ContactForm
          source="Production Consultancy"
          title="Book a Consultation"
          description="Tell us about your facility and current setup, and our production team will scope a layout and efficiency review tailored to your operation."
          detailsLabel="Facility Details"
          detailsPlaceholder="Tell us about your facility — current machinery, floor size, throughput goals, and any pain points."
        />
      </section>
    </main>
  )
}
