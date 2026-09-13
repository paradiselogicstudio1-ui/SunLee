import './production-services.css'

const services = [
  {
    title: 'Machinery Optimization',
    description: 'Selecting optimal machinery aligned with production targets and facility layout.',
  },
  {
    title: 'Tooling Selection',
    description: 'Pairing production materials and tooling to achieve high-performance output.',
  },
  {
    title: 'Production Line Streamlining',
    description: 'Improving throughput by removing bottlenecks without compromising craftsmanship.',
  },
]

const phases = [
  {
    phase: 'Phase I',
    title: 'Material Selection',
    description: 'Curating the exact geological match for the architectural design intent. Translating aesthetics into geological specifications.',
  },
  {
    phase: 'Phase II',
    title: 'Sourcing & Quarrying',
    description: 'Choosing quarries and specific quarry sections that meet project requirements and prevent defects.',
  },
  {
    phase: 'Phase III',
    title: 'Production Supervision',
    description: 'Curating the exact geological match for the architectural design intent. Translating aesthetics into geological specifications.',
  },
  {
    phase: 'Phase IV',
    title: 'Installation Supervision',
    description: 'Technical oversight of substrates, complex mechanical anchoring and placement logistics on the active construction site.',
  },
  {
    phase: 'Phase V',
    title: 'Maintenance',
    description: 'Establishing precise, chemistry-specific, post-handover care protocols to prevent long-term degradation and protect the asset.',
  },
]

export default function ProductionServices() {
  return (
    <main className="production-services-page">
      <section className="production-blueprint" aria-labelledby="production-consultancy-title">
        <header className="production-blueprint-heading">
          <span aria-hidden="true" />
          <h1 id="production-consultancy-title">Production Consultancy:</h1>
        </header>

        <div className="production-blueprint-layout">
          <figure className="production-blueprint-visual">
            <img
              src="/images/production-floor.png"
              alt="Isometric technical drawing of a stone production facility with cutting, CNC, tooling, and conveyor stations"
            />
          </figure>

          <div className="production-blueprint-services">
            {services.map((service) => (
              <article className="production-blueprint-card" key={service.title}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="production-lifecycle" aria-labelledby="production-lifecycle-title">
        <header className="production-lifecycle-heading">
          <p>Production consultancy</p>
          <h2 id="production-lifecycle-title">Five phases. One continuous standard.</h2>
        </header>

        <div className="production-phase-track">
          {phases.map((item, index) => (
            <article className="production-phase" key={item.phase}>
              <div className="production-phase-marker" aria-hidden="true">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="production-phase-content">
                <p className="production-phase-label">{item.phase}</p>
                <h3>{item.title}</h3>
                <p className="production-phase-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
