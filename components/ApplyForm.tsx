'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useRouter } from 'next/router';

interface ApplyFormProps {
  variant: 'aims' | 'galen';
  prefill?: {
    leadVolume?: string;
    challenge?: string;
  };
}

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

const ROLES = ['Owner/Founder', 'Physician', 'Practice Administrator', 'Operations Lead', 'Other'];
const LEAD_VOLUMES = ['Fewer than 25', '25–100', '100–500', '500+'];
const CHALLENGES = ['Lead response speed', 'Manual data entry', 'Team overhead cost', 'Revenue visibility'];

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderBottom: '1px solid var(--border)',
  borderTop: 'none', borderLeft: 'none', borderRight: 'none',
  paddingBottom: '8px',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  color: 'var(--white)',
  background: 'transparent',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '9px',
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: '8px',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  paddingRight: '24px',
};

const fieldStyle: React.CSSProperties = { marginBottom: '28px' };

const accent = (variant: 'aims' | 'galen') => variant === 'galen' ? 'var(--galen)' : 'var(--gold)';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function focusAccent(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, color: string) {
  e.target.style.borderBottomColor = color;
}
function blurReset(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderBottomColor = 'var(--border)';
}

const CheckIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
    <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="1.5" />
    <polyline points="9,16 14,21 23,11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ApplyForm({ variant, prefill }: ApplyFormProps) {
  const shouldReduce = useReducedMotion();
  const router = useRouter();
  const color = accent(variant);
  const isGalen = variant === 'galen';

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // AIMS-only
  const [leadVolume, setLeadVolume] = useState(prefill?.leadVolume ?? '');
  const [challenge, setChallenge] = useState(prefill?.challenge ?? '');

  // Galen-only
  const [specialty, setSpecialty] = useState('');
  const [providers, setProviders] = useState('');
  const [claims, setClaims] = useState('');

  const handleSubmit = async () => {
    setServerError('');
    setSubmitting(true);

    const body = isGalen
      ? { variant, name, email, company, role, message, consent, specialty, providers: Number(providers), claims: Number(claims) }
      : { variant, name, email, company, role, message, consent, leadVolume, challenge };

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? 'Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setServerError('Network error. Please try again or email gabrielcespedes777@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = name && email && company && role && message && consent &&
    (isGalen ? (specialty && providers && claims) : (leadVolume && challenge));

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="confirmed"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          style={{ textAlign: 'center', padding: '48px 0' }}
        >
          <CheckIcon color={color} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--white)', marginTop: '20px', marginBottom: '16px' }}>
            Received.
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 12px' }}>
            Gabriel will respond within 2 business days from{' '}
            <span style={{ color: 'var(--white)' }}>gabrielcespedes777@gmail.com</span>.
            If you don&apos;t see a reply, check spam or email directly.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>
            — ARX Systems, Miami FL
          </p>
        </motion.div>
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

          <Field label="Full Name">
            <input required style={inputStyle} type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              onFocus={e => focusAccent(e, color)} onBlur={blurReset} />
          </Field>

          <Field label="Work Email">
            <input required style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              onFocus={e => focusAccent(e, color)} onBlur={blurReset} />
          </Field>

          <Field label={isGalen ? 'Practice Name' : 'Company Name'}>
            <input required style={inputStyle} type="text" value={company} onChange={e => setCompany(e.target.value)}
              placeholder={isGalen ? 'Miami Cardiology Associates' : 'Acme Corp'}
              onFocus={e => focusAccent(e, color)} onBlur={blurReset} />
          </Field>

          <Field label="Your Role">
            <div style={{ position: 'relative' }}>
              <select required style={selectStyle} value={role} onChange={e => setRole(e.target.value)}
                onFocus={e => focusAccent(e, color)} onBlur={blurReset}>
                <option value="" disabled>Select your role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <span style={{ position: 'absolute', right: 0, top: 0, color: 'var(--muted)', fontSize: '10px', pointerEvents: 'none' }}>▼</span>
            </div>
          </Field>

          {!isGalen && (
            <>
              <Field label="Monthly Inbound Lead Volume">
                <div style={{ position: 'relative' }}>
                  <select required style={selectStyle} value={leadVolume} onChange={e => setLeadVolume(e.target.value)}
                    onFocus={e => focusAccent(e, color)} onBlur={blurReset}>
                    <option value="" disabled>Select range</option>
                    {LEAD_VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: 0, top: 0, color: 'var(--muted)', fontSize: '10px', pointerEvents: 'none' }}>▼</span>
                </div>
              </Field>

              <Field label="Primary Operational Challenge">
                <div style={{ position: 'relative' }}>
                  <select required style={selectStyle} value={challenge} onChange={e => setChallenge(e.target.value)}
                    onFocus={e => focusAccent(e, color)} onBlur={blurReset}>
                    <option value="" disabled>Select challenge</option>
                    {CHALLENGES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: 0, top: 0, color: 'var(--muted)', fontSize: '10px', pointerEvents: 'none' }}>▼</span>
                </div>
              </Field>
            </>
          )}

          {isGalen && (
            <>
              <Field label="Specialty">
                <input required style={inputStyle} type="text" value={specialty} onChange={e => setSpecialty(e.target.value)}
                  placeholder="e.g. Cardiology, Internal Medicine"
                  onFocus={e => focusAccent(e, color)} onBlur={blurReset} />
              </Field>

              <Field label="Number of Providers">
                <input required style={inputStyle} type="number" min={1} value={providers} onChange={e => setProviders(e.target.value)}
                  placeholder="e.g. 3"
                  onFocus={e => focusAccent(e, color)} onBlur={blurReset} />
              </Field>

              <Field label="Estimated Monthly Claims">
                <input required style={inputStyle} type="number" min={0} value={claims} onChange={e => setClaims(e.target.value)}
                  placeholder="e.g. 400"
                  onFocus={e => focusAccent(e, color)} onBlur={blurReset} />
              </Field>
            </>
          )}

          <Field label={`What would you want ${isGalen ? 'Galen' : 'AIMS'} to solve first?`}>
            <textarea required
              style={{ ...inputStyle, resize: 'none', paddingTop: '4px' }}
              rows={2} value={message} onChange={e => setMessage(e.target.value)}
              placeholder={isGalen
                ? 'e.g. Documentation time, denial rate, scheduling volume...'
                : 'e.g. Lead response speed, manual CRM entry, SDR overhead...'}
              onFocus={e => focusAccent(e, color)} onBlur={blurReset}
            />
          </Field>

          {/* Consent */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '28px' }}>
            <div
              onClick={() => setConsent(!consent)}
              style={{
                width: '16px', height: '16px', borderRadius: '3px', flexShrink: 0, marginTop: '2px',
                border: `1px solid ${consent ? color : 'var(--border)'}`,
                background: consent ? color : 'transparent',
                cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {consent && <span style={{ color: '#0A0A0A', fontSize: '10px', fontWeight: 700, lineHeight: 1 }}>✓</span>}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6, cursor: 'pointer' }}
              onClick={() => setConsent(!consent)}>
              I understand ARX Systems will contact me directly about pilot access. ARX will not share my information.
            </span>
          </div>

          {serverError && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--danger)', marginBottom: '16px', lineHeight: 1.5 }}>
              {serverError}
            </div>
          )}

          <motion.div
            onClick={canSubmit && !submitting ? handleSubmit : undefined}
            whileTap={canSubmit ? { scale: 0.97 } : {}}
            style={{
              background: canSubmit ? color : 'var(--surface-2)',
              color: canSubmit ? '#0A0A0A' : 'var(--muted-2)',
              border: `1px solid ${canSubmit ? color : 'var(--border)'}`,
              fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500,
              textAlign: 'center', padding: '14px',
              borderRadius: 'var(--radius-badge)',
              cursor: canSubmit && !submitting ? 'pointer' : 'default',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
          >
            {submitting ? 'Sending…' : (isGalen ? 'Submit Inquiry →' : 'Submit Application →')}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
