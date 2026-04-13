'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  businessType: string;
  callVolume: string;
  source: string;
}

const INITIAL: FormData = { name: '', email: '', businessType: '', callVolume: '', source: '' };

const fieldStyle: React.CSSProperties = {
  width: '100%',
  borderBottom: '1px solid var(--border)',
  paddingBottom: '10px',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  color: 'var(--white)',
  background: 'transparent',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '9px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  display: 'block',
  marginBottom: '8px',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setForm(INITIAL);
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = () => {
    console.log('AIMS Application:', form);
    setSubmitted(true);
  };

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)', zIndex: 200 }}
          />

          {/* Panel */}
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
            transition={spring}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 201,
              width: 'min(480px, calc(100vw - 32px))',
              maxHeight: 'calc(100vh - 48px)',
              overflowY: 'auto',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              padding: '40px',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '16px', transition: 'color 0.2s', lineHeight: 1 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              ✕
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '24px 0' }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" style={{ margin: '0 auto 20px', display: 'block' }}>
                    <circle cx="20" cy="20" r="19" fill="var(--gold-muted)" stroke="var(--border-gold)" strokeWidth="1" />
                    <polyline points="12,20 18,26 28,14" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--white)', marginBottom: '16px' }}>
                    Application Received.
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
                    We will respond within 1 business day.
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontStyle: 'italic' }}>
                    — ARX Systems, Miami FL
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--white)', marginBottom: '8px' }}>
                    Apply for Integration
                  </h2>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.6 }}>
                    No commitment. Response within 1 business day.
                  </p>

                  <div style={{ height: '1px', background: 'var(--border)', marginBottom: '32px' }} />

                  <Field label="Full Name">
                    <input
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Jane Smith"
                      style={fieldStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                    />
                  </Field>

                  <Field label="Email Address">
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="jane@company.com"
                      style={fieldStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                    />
                  </Field>

                  <Field label="Business Type">
                    <select
                      value={form.businessType}
                      onChange={set('businessType')}
                      style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' as const }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <option value="">Select...</option>
                      <option value="general">General Business</option>
                      <option value="medical">Medical Practice</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="unsure">Not sure yet — help me decide</option>
                    </select>
                  </Field>

                  <Field label="Monthly Call Volume">
                    <select
                      value={form.callVolume}
                      onChange={set('callVolume')}
                      style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' as const }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <option value="">Select...</option>
                      <option value="under-100">Fewer than 100</option>
                      <option value="100-500">100 – 500</option>
                      <option value="500-2000">500 – 2,000</option>
                      <option value="2000+">2,000+</option>
                    </select>
                  </Field>

                  <Field label="How Did You Find Us?">
                    <select
                      value={form.source}
                      onChange={set('source')}
                      style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' as const }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <option value="">Select...</option>
                      <option value="referral">Referral</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="search">Search</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>

                  <motion.button
                    onClick={handleSubmit}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%',
                      background: 'var(--gold)',
                      color: 'var(--obsidian)',
                      border: 'none',
                      borderRadius: 'var(--radius-badge)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      padding: '14px',
                      cursor: 'pointer',
                      marginTop: '8px',
                    }}
                  >
                    Submit Application →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
