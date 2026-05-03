const express = require('express');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'gabrielcespedes777@gmail.com';

// In-memory rate limiter: 5 requests per hour per IP
const store = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQ = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= MAX_REQ) return false;
  entry.count++;
  return true;
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', async (req, res) => {
  const ip =
    ((req.headers['x-forwarded-for'] || '') + '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { practice, name, email, phone, specialty, volume, message } = req.body || {};

  if (!practice || !name || !email || !phone || !specialty || !volume) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const html = `
    <div style="font-family:monospace;max-width:560px;margin:0 auto;background:#F7F6F2;color:#0E1218;padding:32px;border-radius:8px;border:1px solid #E2DFD5;">
      <div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px;">
        ARX Systems — Galen Inquiry
      </div>
      <h2 style="font-family:Georgia,serif;font-size:22px;color:#0E1218;margin:0 0 24px;">${name}</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:140px;">Practice</td><td style="padding:6px 0;font-size:13px;">${practice}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:6px 0;font-size:13px;"><a href="mailto:${email}" style="color:#0A1628;">${email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:6px 0;font-size:13px;">${phone}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Specialty</td><td style="padding:6px 0;font-size:13px;">${specialty}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Call Volume</td><td style="padding:6px 0;font-size:13px;">${volume}</td></tr>
      </table>
      ${message ? `
      <div style="background:#fff;border-left:3px solid #C8A35C;padding:16px;border-radius:4px;margin-bottom:24px;">
        <div style="font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Message</div>
        <div style="font-size:14px;color:#0E1218;line-height:1.6;">"${message}"</div>
      </div>` : ''}
      <div style="font-size:10px;color:#9aa3ad;">
        Submitted ${new Date().toISOString()} · Reply-To: ${email}
      </div>
    </div>
  `;

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  if (!resend) {
    console.log('[contact] No RESEND_API_KEY — logging submission:', { practice, name, email, phone, specialty, volume, message });
    return res.status(200).json({ ok: true });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Galen by ARX Systems <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Galen Inquiry] ${name} — ${practice}`,
      html,
    });
    if (error) throw new Error(error.message);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return res.status(500).json({ error: 'Failed to send. Please email gabrielcespedes777@gmail.com directly.' });
  }
});

app.listen(PORT, () => console.log(`Galen → http://localhost:${PORT}`));
