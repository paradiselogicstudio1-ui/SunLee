import nodemailer from 'nodemailer'

let transporter

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    })
  }
  return transporter
}

export async function sendContactEmail({ source, name, email, company, details }) {
  const to = process.env.MAIL_TO
  // Use the submitter's own address as the From header, so it shows up directly
  // in the recipient's inbox as coming from them.
  const from = `"${name}" <${email}>`

  if (!to) {
    throw new Error('MAIL_TO must be set in the server config')
  }

  const subject = `New ${source} inquiry — ${name}`
  const text = [
    `Source: ${source}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '—'}`,
    '',
    'Message:',
    details,
  ].join('\n')

  const html = `
    <h2>New ${escapeHtml(source)} inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company || '—')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(details).replace(/\n/g, '<br />')}</p>
  `

  await getTransporter().sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
  })
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
