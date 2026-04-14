'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { createPortal } from 'react-dom';

interface AIMSFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  techStack: string;
  problem: string;
  other: string;
}

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <circle cx="14" cy="14" r="13" stroke="var(--gold)" strokeWidth="1.5" />
    <polyline points="8,14 12,18 20,10" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AIMSForm({ isOpen, onClose }: AIMSFormProps) {
  const shouldReduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', company: '', techStack: '', problem: '', other: '',
  });

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    console.log('AIMS Form submission:', form);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', techStack: '', problem: '', other: '' }); }, 400);
  };

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

  const fieldStyle: React.CSSProperties = { marginBottom: '24px' };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
          style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            transition={spring}
            style={{
              width: '100%', maxWidth: '520px', margin: '0 16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              padding: '32px',
              maxHeight: '90vh', overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button
              onClick={handleClose}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1, padding: '4px' }}
              aria-label="Close"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              ✕
            </button>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--white)', marginBottom: '6px' }}>
                    Apply for AIMS Early Access
                  </h2>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '28px' }}>
                    All fields are required.
                  </p>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Full Name</label>
                    <input style={inputStyle} type="text" value={form.name} onChange={set('name')} placeholder="Your full name"
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')} />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')} />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <input style={inputStyle} type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (305) 000-0000"
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')} />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Business or Company Name</label>
                    <input style={inputStyle} type="text" value={form.company} onChange={set('company')} placeholder="Acme Corp"
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')} />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Current Tech Stack</label>
                    <input style={inputStyle} type="text" value={form.techStack} onChange={set('techStack')} placeholder="e.g. Salesforce, HubSpot, Google Workspace, QuickBooks..."
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')} />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Key Problem You Are Trying to Solve</label>
                    <textarea
                      style={{ ...inputStyle, resize: 'none', paddingTop: '4px' }}
                      rows={3} value={form.problem} onChange={set('problem')}
                      placeholder="Describe the main operational challenge AIMS would address"
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')}
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Anything Else We Should Know</label>
                    <textarea
                      style={{ ...inputStyle, resize: 'none', paddingTop: '4px' }}
                      rows={2} value={form.other} onChange={set('other')}
                      placeholder="Optional — any context, timeline, or questions"
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--border)')}
                    />
                  </div>

                  <motion.div
                    onClick={handleSubmit}
                    whileTap={{ scale: 0.97 }}
                    style={{ background: 'var(--gold)', color: '#0A0A0A', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, textAlign: 'center', padding: '14px', borderRadius: 'var(--radius-badge)', cursor: 'pointer', letterSpacing: '0.04em', marginTop: '8px' }}
                  >
                    Submit Application →
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key="confirmed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckIcon />
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--white)', marginTop: '16px', marginBottom: '12px' }}>
                    Application Received.
                  </h2>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '8px' }}>
                    We&apos;ll review your application and respond within one business day.
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>
                    — ARX Systems, Miami FL
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
