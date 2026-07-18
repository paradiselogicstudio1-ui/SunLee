import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { sendContactEmail } from './mailer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '../dist')

const app = express()
app.use(express.json())

const VALID_SOURCES = ['Materials Consultancy', 'Production Consultancy']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.post('/api/contact', async (req, res) => {
  const { source, name, email, company, details } = req.body || {}

  if (!VALID_SOURCES.includes(source)) {
    return res.status(400).json({ ok: false, error: 'Invalid source.' })
  }
  if (!name || !email || !details) {
    return res.status(400).json({ ok: false, error: 'Name, email, and details are required.' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' })
  }

  try {
    await sendContactEmail({ source, name, email, company, details })
    res.json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    res.status(500).json({ ok: false, error: 'Failed to send email. Please try again later.' })
  }
})

// Serve the built frontend in production
app.use(express.static(distDir))
app.get('/*splat', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Sanli server listening on port ${port}`)
})
