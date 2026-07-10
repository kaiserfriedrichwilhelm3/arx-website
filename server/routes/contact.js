// POST /api/contact — Galen inquiry + Custom Project inquiry.
// Ported verbatim from the pre-rebuild server.js. Behavior, validation
// rules, and env-var contract are identical to the live endpoint.
// DO NOT add new validation, rename fields, or "improve" error handling
// without explicit direction.
//
// Two founder-directed changes (2026-07): public error copy uses the
// branded gabriel@arxsystems.co (never the personal gmail), and a failed
// Resend call logs the full submission so the lead stays recoverable
// from Railway logs.

const { Resend } = require('resend');
const { checkRateLimit } = require('../lib/rate-limit');
const { row, emailShell } = require('../lib/email-templates');

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'gabrielcespedes777@gmail.com';

async function contactHandler(req, res) {
  const ip =
    ((req.headers['x-forwarded-for'] || '') + '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { type } = req.body || {};
  let subject, html;

  if (type === 'custom') {
    const { name, email, business, website, callVolume, revenue, purpose, painPoints } = req.body;
    if (!name || !email || !business || !callVolume || !revenue || !purpose || !painPoints) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    subject = `[Custom Project] ${name} — ${business}`;
    const tableRows = [
      row('Email', `<a href="mailto:${email}" style="color:#0A1628">${email}</a>`),
      row('Business', business),
      row('Website', website),
      row('Call Volume', callVolume),
      row('Current Revenue', revenue),
    ].join('');
    const combined = `PURPOSE\n${purpose}\n\nPAIN POINTS\n${painPoints}`;
    html = emailShell('Custom Project Inquiry', name, tableRows, 'Brief', combined);
  } else {
    // Galen form (default)
    const { name, email, practice, phone, specialty, volume, message } = req.body;
    if (!name || !email || !practice || !phone || !specialty || !volume) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    subject = `[Galen Inquiry] ${name} — ${practice}`;
    const tableRows = [
      row('Email', `<a href="mailto:${email}" style="color:#0A1628">${email}</a>`),
      row('Practice', practice),
      row('Phone', phone),
      row('Specialty', specialty),
      row('Call Volume', volume),
    ].join('');
    html = emailShell('Galen Inquiry', name, tableRows, 'Message', message || null);
  }

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const replyTo = req.body.email;

  if (!resend) {
    console.log(`[contact:${type || 'galen'}] No RESEND_API_KEY — logging:`, req.body);
    return res.status(200).json({ ok: true });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'ARX Systems <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo,
      subject,
      html,
    });
    if (error) throw new Error(error.message);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    console.error('[contact] UNDELIVERED SUBMISSION (recover from this log):', JSON.stringify(req.body));
    return res.status(500).json({ error: 'Failed to send. Please email gabriel@arxsystems.co directly.' });
  }
}

module.exports = { contactHandler };
