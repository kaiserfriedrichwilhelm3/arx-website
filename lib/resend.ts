import { Resend } from 'resend';
import type { ApplyFormData } from './apply-schema';

const client = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'gabrielcespedes777@gmail.com';

export async function sendApplyEmail(data: ApplyFormData): Promise<void> {
  const isGalen = data.variant === 'galen';
  const subject = isGalen
    ? `[Galen Inquiry] ${data.name} — ${(data as { company: string }).company}`
    : `[AIMS Apply] ${data.name} — ${(data as { company: string }).company}`;

  const variantFields = isGalen
    ? `
      <tr><td style="padding:4px 0;color:#666;font-size:13px;">Specialty</td><td style="padding:4px 0;font-size:13px;">${(data as { specialty: string }).specialty}</td></tr>
      <tr><td style="padding:4px 0;color:#666;font-size:13px;">Providers</td><td style="padding:4px 0;font-size:13px;">${(data as { providers: number }).providers}</td></tr>
      <tr><td style="padding:4px 0;color:#666;font-size:13px;">Monthly claims</td><td style="padding:4px 0;font-size:13px;">${(data as { claims: number }).claims.toLocaleString()}</td></tr>`
    : `
      <tr><td style="padding:4px 0;color:#666;font-size:13px;">Monthly leads</td><td style="padding:4px 0;font-size:13px;">${(data as { leadVolume: string }).leadVolume}</td></tr>
      <tr><td style="padding:4px 0;color:#666;font-size:13px;">Primary challenge</td><td style="padding:4px 0;font-size:13px;">${(data as { challenge: string }).challenge}</td></tr>`;

  const html = `
    <div style="font-family:monospace;max-width:560px;margin:0 auto;background:#111;color:#fafafa;padding:32px;border-radius:8px;">
      <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px;">
        ARX Systems — New ${isGalen ? 'Galen Inquiry' : 'AIMS Application'}
      </div>
      <h2 style="font-family:Georgia,serif;font-size:22px;color:#fafafa;margin:0 0 24px;">${data.name}</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:4px 0;color:#666;font-size:13px;width:140px;">Email</td><td style="padding:4px 0;font-size:13px;"><a href="mailto:${data.email}" style="color:#D4AF37;">${data.email}</a></td></tr>
        <tr><td style="padding:4px 0;color:#666;font-size:13px;">${isGalen ? 'Practice' : 'Company'}</td><td style="padding:4px 0;font-size:13px;">${data.company}</td></tr>
        <tr><td style="padding:4px 0;color:#666;font-size:13px;">Role</td><td style="padding:4px 0;font-size:13px;">${data.role}</td></tr>
        ${variantFields}
      </table>
      <div style="background:#161616;border-left:2px solid #D4AF37;padding:16px;border-radius:4px;margin-bottom:24px;">
        <div style="font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">What they want solved first</div>
        <div style="font-size:13px;color:#fafafa;line-height:1.6;">"${data.message}"</div>
      </div>
      <div style="font-size:10px;color:#444;">
        Consent confirmed · ${new Date().toISOString()} · Reply-To: ${data.email}
      </div>
    </div>
  `;

  if (!client) {
    console.log('[apply] RESEND_API_KEY not set — logging submission instead:');
    console.log({ subject, to: CONTACT_EMAIL, data });
    return;
  }

  const { error } = await client.emails.send({
    from: 'ARX Systems <onboarding@resend.dev>',
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject,
    html,
  });

  if (error) throw new Error(error.message);
}
