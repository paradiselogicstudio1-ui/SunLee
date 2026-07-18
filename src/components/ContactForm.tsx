import { useEffect, useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({
  source,
  title,
  description,
  detailsLabel,
  detailsPlaceholder,
  prefillDetails,
}: {
  source: 'Materials Consultancy' | 'Production Consultancy'
  title: string
  description: string
  detailsLabel: string
  detailsPlaceholder: string
  prefillDetails?: string
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [details, setDetails] = useState(prefillDetails ?? '')

  useEffect(() => {
    if (prefillDetails) setDetails(prefillDetails)
  }, [prefillDetails])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const form = e.currentTarget
    const data = {
      source,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      details,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok || !result.ok) {
        throw new Error(result.error || 'Something went wrong.')
      }
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div id="contact" className="max-w-2xl">
      <h2 className="font-display text-4xl md:text-5xl mb-4">{title}</h2>
      <p className="opacity-70 mb-10 max-w-xl">{description}</p>

      {status === 'sent' ? (
        <div className="border border-[var(--accent)] p-8">
          <p className="font-display text-2xl mb-2">Thank you.</p>
          <p className="opacity-70">A member of our consultancy team will be in touch within one business day.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" required placeholder="Jane Doe" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="jane@studio.com" />
          </div>
          <div className="field sm:col-span-2">
            <label htmlFor="company">Company / Studio</label>
            <input id="company" name="company" type="text" placeholder="Studio name (optional)" />
          </div>
          <div className="field sm:col-span-2">
            <label htmlFor="details">{detailsLabel}</label>
            <textarea
              id="details"
              name="details"
              rows={5}
              required
              placeholder={detailsPlaceholder}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="text-xs uppercase tracking-[0.25em] border border-current px-7 py-4 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--bg-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : 'Submit Request'}
            </button>
            {status === 'error' && <p className="mt-3 text-sm text-[#c0604a]">{error}</p>}
          </div>
        </form>
      )}
    </div>
  )
}
