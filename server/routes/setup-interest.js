// POST /api/setup-interest — interim setup-wizard placeholder endpoint.
// Captures the partial config a visitor builds on /setup, emails it to
// the founder, and emails a confirmation back to the visitor. Lives
// until the full Next.js portal (sibling repo arx-portal) is deployed
// and proxied at /setup/*. Ported verbatim from the pre-rebuild
// server.js — same validation, same envelope, same TIER_LABEL strings.

const { Resend } = require('resend');
const { checkRateLimit } = require('../lib/rate-limit');
const { row, emailShell } = require('../lib/email-templates');

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'gabrielcespedes777@gmail.com';

const TIER_LABEL = {
  starter: 'The Receptionist ($400/mo + $500 setup)',
  pro: 'The Command Center ($900/mo + $1,500 setup)',
  custom: 'The Full Stack (Quoted + $3,000 setup)',
};

async function setupInterestHandler(req, res) {
  const ip =
    ((req.headers['x-forwarded-for'] || '') + '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { tier, practice, specialty, description, name, email, phone } = req.body || {};
  if (!tier || !practice || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  if (!TIER_LABEL[tier]) {
    return res.status(400).json({ error: 'Invalid tier.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const tierLabel = TIER_LABEL[tier];

  const founderRows = [
    row('Name', name),
    row('Email', `<a href="mailto:${email}" style="color:#0A1628">${email}</a>`),
    row('Phone', phone),
    row('Practice', practice),
    row('Specialty', specialty),
    row('Tier', tierLabel),
  ].join('');
  const founderHtml = emailShell(
    'Setup Interest',
    name,
    founderRows,
    description ? 'Description' : '',
    description || '',
  );

  const userHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;background:#F7F6F2;color:#0E1218;padding:32px;border-radius:8px;border:1px solid #E2DFD5;">
      <div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.18em;margin-bottom:16px;">ARX Systems · Galen</div>
      <h2 style="font-family:Georgia,serif;font-size:24px;color:#0A1628;margin:0 0 16px;font-weight:600;">You&rsquo;re on the list.</h2>
      <p style="font-size:15px;line-height:1.6;color:#3a3f47;margin:0 0 16px;">Hi ${name},</p>
      <p style="font-size:15px;line-height:1.6;color:#3a3f47;margin:0 0 16px;">Thanks for reserving your spot. Your founding-tier pricing for <strong>${tierLabel}</strong> is locked. We&rsquo;ll email you the day the full setup wizard is live so you can finish onboarding and deploy your phone number.</p>
      <p style="font-size:15px;line-height:1.6;color:#3a3f47;margin:0 0 16px;">If anything changes about your practice in the meantime — hours, services, anything — just reply to this email and we&rsquo;ll update your record.</p>
      <p style="font-size:14px;color:#6b7280;margin:24px 0 0;">— The ARX Systems team</p>
    </div>
  `;

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  if (!resend) {
    console.log(`[setup-interest] No RESEND_API_KEY — logging:`, req.body);
    return res.status(200).json({ ok: true });
  }

  try {
    const founderResult = await resend.emails.send({
      from: 'ARX Systems <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Setup Interest · ${tier}] ${name} — ${practice}`,
      html: founderHtml,
    });
    if (founderResult.error) throw new Error(founderResult.error.message);

    // Confirmation to the visitor — best-effort, never block on failure
    // (the founder already has the lead).
    try {
      const userResult = await resend.emails.send({
        from: 'ARX Systems <onboarding@resend.dev>',
        to: email,
        subject: 'Your Galen spot is reserved',
        html: userHtml,
      });
      if (userResult.error) console.error('[setup-interest] confirmation failed:', userResult.error);
    } catch (confErr) {
      console.error('[setup-interest] confirmation send threw:', confErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[setup-interest] Resend error:', err);
    return res.status(500).json({ error: 'Failed to send. Please email gabrielcespedes777@gmail.com directly.' });
  }
}

module.exports = { setupInterestHandler };
