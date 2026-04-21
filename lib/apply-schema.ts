import { z } from 'zod';

const base = z.object({
  variant: z.enum(['aims', 'galen']),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid work email required'),
  company: z.string().min(1, 'Company / practice name is required'),
  role: z.enum(['Owner/Founder', 'Physician', 'Practice Administrator', 'Operations Lead', 'Other']),
  message: z.string().min(1, 'Please describe what you want solved first'),
  consent: z.literal(true, 'Consent is required'),
});

export const aimsSchema = base.extend({
  variant: z.literal('aims'),
  leadVolume: z.enum(['Fewer than 25', '25–100', '100–500', '500+']),
  challenge: z.enum(['Lead response speed', 'Manual data entry', 'Team overhead cost', 'Revenue visibility']),
});

export const galenSchema = base.extend({
  variant: z.literal('galen'),
  specialty: z.string().min(1, 'Specialty is required'),
  providers: z.coerce.number().int().min(1, 'At least 1 provider'),
  claims: z.coerce.number().int().min(0, 'Enter estimated monthly claims'),
});

export type AIMSFormData = z.infer<typeof aimsSchema>;
export type GalenFormData = z.infer<typeof galenSchema>;
export type ApplyFormData = AIMSFormData | GalenFormData;
