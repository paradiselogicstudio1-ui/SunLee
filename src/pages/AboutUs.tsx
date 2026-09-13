import './about-us.css'

const facts = [
  { value: '50+', label: 'Years of experience' },
  { value: '02', label: 'Generations represented' },
  { value: '03', label: 'Global regions' },
]

export default function AboutUs() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-geometry" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <header className="about-heading">
          <p>About Us</p>
          <h1 id="about-title">Half a Century of Global Stone Expertise</h1>
        </header>

        <div className="about-story">
          <p>
            Representing the second and third generation of stone mastership, Chiani &amp; Soci brings over 50
            years of experience supplying and supervising premier architectural stone projects across Europe,
            the Middle East, and Africa. From mining to factory tooling optimization, we engineer reliability
            into every surface.
          </p>
        </div>

        <div className="about-facts" aria-label="Company experience">
          {facts.map((fact) => (
            <div className="about-fact" key={fact.label}>
              <span className="about-fact-value">{fact.value}</span>
              <span className="about-fact-label">{fact.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

