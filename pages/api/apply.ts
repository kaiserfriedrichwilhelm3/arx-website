import type { NextApiRequest, NextApiResponse } from 'next';
import { aimsSchema, galenSchema } from '@/lib/apply-schema';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendApplyEmail } from '@/lib/resend';

type ResponseData = { ok: true } | { error: string; details?: unknown };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.socket.remoteAddress ?? 'unknown';
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  const { variant } = req.body ?? {};
  const schema = variant === 'galen' ? galenSchema : aimsSchema;
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed', details: result.error.flatten() });
  }

  try {
    await sendApplyEmail(result.data);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[apply] send error:', err);
    return res.status(500).json({ error: 'Failed to send. Please email gabrielcespedes777@gmail.com directly.' });
  }
}
