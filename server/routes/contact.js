// POST /api/contact — Galen inquiry + Custom Project inquiry.
// Ported from the pre-rebuild server.js. The field contract and validation
// rules are unchanged — DO NOT add new validation or rename fields without
// explicit direction.
//
// Founder-directed fixes (2026-07):
//   - Public error copy never names an email address (founder direction:
//     no email in any visitor-facing error message).
//   - Every failed or unsendable submission logs the full payload
//     (UNDELIVERED SUBMISSION) so the lead stays recoverable from Railway
//     logs — prompted by a real intake submission lost to an invalid key.
//   - Missing RESEND_API_KEY in production now fails loud (503 + logged
//     payload) instead of silently returning 200 — the same policy
//     /api/memo already had (DECISIONS.md §6). Dev keeps the stub.
//   - User-supplied values are HTML-escaped before interpolation into the
//     notification email (HTML-injection fix). Subjects are plain text and
//     stay unescaped.
//   - Client IP is taken from the LAST X-Forwarded-For hop (appended by
//     the trusted edge), not the first (client-forgeable), so the rate
//     limit cannot be bypassed with a spoofed header.

const { Resend } = require('resend');
const { checkRateLimit } = require('../lib/rate-limit');
const { row, emailShell } = require('../lib/email-templates');

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'gabrielcespedes777@gmail.com';
const IS_PROD = process.env.NODE_ENV === 'production';

// Announce stub mode once at module load so it shows up in Railway logs.
if (!process.env.RESEND_API_KEY && !IS_PROD) {
  console.warn('[contact] RESEND_API_KEY not set and NODE_ENV != production — running in stub mode. Form submissions will log to stdout, not send email.');
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function clientIp(req) {
  const hops = ((req.headers['x-forwarded-for'] || '') + '')
    .split(',').map(s => s.trim()).filter(Boolean);
  return hops[hops.length - 1] || req.socket.remoteAddress || 'unknown';
}

async function contactHandler(req, res) {
  const ip = clientIp(req);

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = req.body || {};
  const { type } = body;
  let subject, html;

  if (type === 'custom') {
    const { name, email, business, website, callVolume, revenue, purpose, painPoints } = body;
    if (!name || !email || !business || !callVolume || !revenue || !purpose || !painPoints) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    subject = `[Custom Project] ${name} — ${business}`;
    const tableRows = [
      row('Email', `<a href="mailto:${esc(email)}" style="color:#0A1628">${esc(email)}</a>`),
      row('Business', esc(business)),
      row('Website', esc(website)),
      row('Call Volume', esc(callVolume)),
      row('Current Revenue', esc(revenue)),
    ].join('');
    const combined = `PURPOSE\n${purpose}\n\nPAIN POINTS\n${painPoints}`;
    html = emailShell('Custom Project Inquiry', esc(name), tableRows, 'Brief', esc(combined));
  } else {
    // Galen form (default)
    const { name, email, practice, phone, specialty, volume, message } = body;
    if (!name || !email || !practice || !phone || !specialty || !volume) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    subject = `[Galen Inquiry] ${name} — ${practice}`;
    const tableRows = [
      row('Email', `<a href="mailto:${esc(email)}" style="color:#0A1628">${esc(email)}</a>`),
      row('Practice', esc(practice)),
      row('Phone', esc(phone)),
      row('Specialty', esc(specialty)),
      row('Call Volume', esc(volume)),
    ].join('');
    html = emailShell('Galen Inquiry', esc(name), tableRows, 'Message', esc(message) || null);
  }

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const replyTo = body.email;

  if (!resend) {
    if (IS_PROD) {
      console.error('[contact] FATAL: RESEND_API_KEY missing in production. Submission rejected with 503.');
      console.error('[contact] UNDELIVERED SUBMISSION (recover from this log):', JSON.stringify(body));
      return res.status(503).json({ error: 'The contact service is temporarily unavailable. Please try again later.' });
    }
    // Dev stub.
    console.log(`[contact:${type || 'galen'}] No RESEND_API_KEY — dev stub, logging:`, body);
    return res.status(200).json({ ok: true, stub: true });
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
    console.error('[contact] UNDELIVERED SUBMISSION (recover from this log):', JSON.stringify(body));
    return res.status(500).json({ error: 'Failed to send. Please try again later.' });
  }
}

module.exports = { contactHandler };
