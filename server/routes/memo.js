// POST /api/memo — strategy memo request.
//
// Behavior:
//   - Validates the three-field payload (name, practice, email) plus an optional reason.
//   - Rate-limits 5/hr per IP via the shared limiter.
//   - In production, requires RESEND_API_KEY. If missing, returns 503 + logs loudly.
//     Silently swallowing form submissions is unacceptable for an inbound channel
//     that may be the only way a cold-pitched physician reaches the firm.
//   - In development, falls back to a stub that prints the payload to stdout and
//     returns 200 — so the form can be exercised locally without a Resend account.
//     The stub mode is announced on boot via warnIfStub() so prod cannot fall into
//     it by accident.
//   - On success: sends a notification email to CONTACT_EMAIL and a confirmation
//     email to the requester containing the permanent MEMO_URL link (if set).
//     No signed URLs. No time-limited tokens. The link is normal HTTPS.
//   - Send results are checked explicitly (resend v4 returns {data,error}
//     rather than throwing): a failed founder notification is a loud 500 with
//     the payload logged for recovery; a failed visitor confirmation alone
//     still returns 200 (the lead is captured) but logs for manual follow-up.
//
// Env vars:
//   RESEND_API_KEY   required in production
//   CONTACT_EMAIL    optional; defaults to gabrielcespedes777@gmail.com
//   MEMO_URL         optional; permanent download URL for the PDF
//                    If unset, the confirmation email says the memo will arrive
//                    within one business day and the founder follows up manually.
//   NODE_ENV         'production' enables strict env checks; anything else allows stub mode.

const { Resend } = require('resend');
const { checkRateLimit } = require('../lib/rate-limit');

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'gabrielcespedes777@gmail.com';
const VALID_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const IS_PROD = process.env.NODE_ENV === 'production';

// Announce stub mode once at module load so it shows up in Railway logs.
// In prod with a missing key, this NEVER fires — we only reach this line when
// the key is genuinely absent, and prod's strict path rejects requests upstream.
if (!process.env.RESEND_API_KEY && !IS_PROD) {
  console.warn('[memo] RESEND_API_KEY not set and NODE_ENV != production — running in stub mode. Form submissions will log to stdout, not send email.');
}

async function memoHandler(req, res) {
  // Last X-Forwarded-For hop (appended by the trusted edge), not the first
  // (client-forgeable) — a spoofed header must not bypass the rate limit.
  const hops = ((req.headers['x-forwarded-for'] || '') + '')
    .split(',').map(s => s.trim()).filter(Boolean);
  const ip = hops[hops.length - 1] || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, practice, email, reason } = req.body || {};
  if (!name || !practice || !email) {
    return res.status(400).json({ error: 'Name, practice, and email are required.' });
  }
  if (typeof name !== 'string' || typeof practice !== 'string' || typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid field types.' });
  }
  if (!VALID_EMAIL.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (name.length > 120 || practice.length > 160 || email.length > 200) {
    return res.status(400).json({ error: 'One or more fields exceeded length limits.' });
  }
  const safeReason = typeof reason === 'string' ? reason.slice(0, 240) : '';

  // Strict missing-env behavior in prod.
  if (!process.env.RESEND_API_KEY) {
    if (IS_PROD) {
      console.error('[memo] FATAL: RESEND_API_KEY missing in production. Form submission rejected with 503.');
      console.error('[memo] UNDELIVERED SUBMISSION (recover from this log):', JSON.stringify({ name, practice, email, reason: safeReason, ip }));
      return res.status(503).json({ error: 'The memo service is temporarily unavailable. Please try again later.' });
    }
    // Dev stub.
    console.log('[memo:stub]', { name, practice, email, reason: safeReason, ip });
    return res.status(200).json({ ok: true, stub: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const memoUrl = process.env.MEMO_URL || '';

  const notifHtml = `
    <div style="font-family:Inter,system-ui,sans-serif;color:#14110d;background:#f4efe6;padding:32px;">
      <h2 style="font-family:Fraunces,Georgia,serif;font-weight:400;color:#1d3a2c;">Memo request</h2>
      <p><strong>${escapeHtml(name)}</strong> &middot; ${escapeHtml(practice)}</p>
      <p>Email: <a href="mailto:${escapeHtml(email)}" style="color:#1d3a2c;">${escapeHtml(email)}</a></p>
      ${safeReason ? `<p>Reason: ${escapeHtml(safeReason)}</p>` : ''}
      <p style="color:#6e6557;font-size:12px;margin-top:24px;">IP: ${escapeHtml(ip)}</p>
    </div>
  `;

  const confirmHtml = memoUrl
    ? `
      <div style="font-family:Inter,system-ui,sans-serif;color:#14110d;background:#f4efe6;padding:32px;max-width:560px;">
        <h2 style="font-family:Fraunces,Georgia,serif;font-weight:400;color:#1d3a2c;margin:0 0 16px;">The ARX strategy memo</h2>
        <p style="margin:0 0 16px;">Thank you for the request. The memo is here:</p>
        <p style="margin:0 0 24px;"><a href="${escapeHtml(memoUrl)}" style="color:#1d3a2c;text-decoration:underline;">${escapeHtml(memoUrl)}</a></p>
        <p style="margin:0 0 16px;">If anything in it needs clarification, reply directly to this email.</p>
        <p style="margin:24px 0 0;">&mdash;<br/>Gabriel Cespedes &middot; ARX Systems</p>
      </div>
    `
    : `
      <div style="font-family:Inter,system-ui,sans-serif;color:#14110d;background:#f4efe6;padding:32px;max-width:560px;">
        <h2 style="font-family:Fraunces,Georgia,serif;font-weight:400;color:#1d3a2c;margin:0 0 16px;">The ARX strategy memo</h2>
        <p style="margin:0 0 16px;">Thank you for the request. The memo will reach you within one business day.</p>
        <p style="margin:24px 0 0;">&mdash;<br/>Gabriel Cespedes &middot; ARX Systems</p>
      </div>
    `;

  try {
    const [notif, confirm] = await Promise.all([
      resend.emails.send({
        from: 'ARX Systems <onboarding@resend.dev>',
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `[Memo request] ${name} — ${practice}`,
        html: notifHtml,
      }),
      resend.emails.send({
        from: 'ARX Systems <onboarding@resend.dev>',
        to: email,
        subject: 'The ARX strategy memo',
        html: confirmHtml,
      }),
    ]);
    // resend v4 RETURNS {data,error} on API failure — it does not throw.
    // Unchecked, a rejected send would pass through as a silent 200.
    if (notif.error) {
      console.error('[memo] Founder notification failed:', notif.error);
      console.error('[memo] UNDELIVERED SUBMISSION (recover from this log):', JSON.stringify({ name, practice, email, reason: safeReason }));
      return res.status(500).json({ error: 'Failed to send. Please try again later.' });
    }
    if (confirm.error) {
      // The lead IS captured (founder notified) — only the visitor's
      // confirmation failed, so return 200 and follow up manually. Note:
      // the onboarding@resend.dev test sender rejects any recipient other
      // than the Resend account owner, so this fires on every request
      // until a sending domain is verified.
      console.error('[memo] Visitor confirmation failed (lead captured — follow up manually):', confirm.error, JSON.stringify({ email }));
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[memo] Resend error:', err);
    console.error('[memo] UNDELIVERED SUBMISSION (recover from this log):', JSON.stringify({ name, practice, email, reason: safeReason }));
    return res.status(500).json({ error: 'Failed to send. Please try again later.' });
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

module.exports = { memoHandler };
