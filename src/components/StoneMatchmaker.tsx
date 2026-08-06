import { useState } from 'react'
import {
  locationOptions,
  vibeOptions,
  priorityOptions,
  matchMaterials,
  type LocationId,
  type VibeId,
  type PriorityId,
  type QuizOption,
  type Material,
} from '../data/materials'

type Answers = {
  location: LocationId | null
  vibe: VibeId | null
  priority: PriorityId | null
}

const STEPS = ['Project Location', 'Aesthetic Vibe', 'Performance Priority'] as const

function OptionGrid<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: QuizOption<T>[]
  selected: T | null
  onSelect: (id: T) => void
}) {
  return (
    <div className="matchmaker-options">
      {options.map((option) => {
        const isActive = selected === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            aria-pressed={isActive}
            className={`matchmaker-option ${isActive ? 'is-active' : ''}`}
          >
            <span className="option-copy">
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </span>
            <span className="option-arrow" aria-hidden="true">↗</span>
          </button>
        )
      })}
    </div>
  )
}

export default function StoneMatchmaker({ onConsult }: { onConsult?: (message: string) => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({ location: null, vibe: null, priority: null })

  const isComplete = answers.location && answers.vibe && answers.priority
  const results = isComplete ? matchMaterials(answers.location!, answers.vibe!, answers.priority!) : []

  function select<K extends keyof Answers>(key: K, value: NonNullable<Answers[K]>) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 200)
    } else {
      setTimeout(() => setStep(STEPS.length), 200)
    }
  }

  function reset() {
    setAnswers({ location: null, vibe: null, priority: null })
    setStep(0)
  }

  function handleConsult(material: Material) {
    if (!onConsult) return
    const locationLabel = locationOptions.find((o) => o.id === answers.location)?.label
    const vibeLabel = vibeOptions.find((o) => o.id === answers.vibe)?.label
    const priorityLabel = priorityOptions.find((o) => o.id === answers.priority)?.label

    const message = [
      `I'm interested in discussing ${material.name} (${material.tagline}) for my project.`,
      '',
      `Project location: ${locationLabel}`,
      `Aesthetic preference: ${vibeLabel}`,
      `Performance priority: ${priorityLabel}`,
      '',
      `Please share more details about sourcing ${material.name} for this application.`,
    ].join('\n')

    onConsult(message)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="matchmaker matchmaker-visual">
      {step < STEPS.length && (
        <div className="matchmaker-quiz">
          <div className="matchmaker-progress flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.25em] opacity-60">
            {STEPS.map((label, i) => (
              <span key={label} className={`flex items-center gap-3 ${i === step ? 'opacity-100 text-[var(--accent)]' : ''}`} aria-label={label}>
                <span className={`w-6 h-6 flex items-center justify-center border rounded-full ${i === step ? 'border-[var(--accent)]' : 'border-current'}`}>
                  {i + 1}
                </span>
              </span>
            ))}
          </div>

          {step > 0 && <h3 className="matchmaker-question-title">{STEPS[step]}</h3>}

          {step === 0 && (
            <OptionGrid options={locationOptions} selected={answers.location} onSelect={(id) => select('location', id)} />
          )}
          {step === 1 && (
            <OptionGrid options={vibeOptions} selected={answers.vibe} onSelect={(id) => select('vibe', id)} />
          )}
          {step === 2 && (
            <OptionGrid options={priorityOptions} selected={answers.priority} onSelect={(id) => select('priority', id)} />
          )}
        </div>
      )}

      {step >= STEPS.length && isComplete && (
        <div className="matchmaker-results">
          <div className="matchmaker-results-header">
            <p className="opacity-70 max-w-md">
              Based on your answers, here are the materials best suited to your project.
            </p>
            <button
              type="button"
              onClick={reset}
              className="text-xs uppercase tracking-[0.25em] border border-current px-5 py-3 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Retake Quiz
            </button>
          </div>

          <div className="material-results-grid">
            {results.map((material) => (
              <article key={material.id} className="material-result-card">
                <div className="material-swatch" style={{ background: material.swatch }}>
                  <span>Material study</span>
                </div>
                <div className="material-card-content">
                  <h3 className="font-display text-2xl mb-1">{material.name}</h3>
                  <p className="text-sm opacity-60 mb-4">{material.tagline}</p>

                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2">Pros</div>
                    <ul className="text-sm space-y-1.5">
                      {material.pros.map((pro) => (
                        <li key={pro} className="flex gap-2">
                          <span className="text-[var(--accent)]">+</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2">Considerations</div>
                    <ul className="text-sm space-y-1.5 opacity-70">
                      {material.cons.map((con) => (
                        <li key={con} className="flex gap-2">
                          <span>–</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {onConsult && (
                    <button
                      type="button"
                      onClick={() => handleConsult(material)}
                      className="mt-auto text-xs uppercase tracking-[0.25em] border border-current px-5 py-3 text-center hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--bg-dark)] transition-colors"
                    >
                      Consult with us on this material
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
