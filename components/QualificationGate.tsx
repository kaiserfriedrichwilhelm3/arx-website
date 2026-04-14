'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface QualificationGateProps {
  onApply: () => void;
}

type Option = string;

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

const Q1_OPTIONS = ['Fewer than 25', '25–100', '100–500', '500+'];
const Q2_OPTIONS = ['Professional Services', 'Agency / Consultancy', 'SaaS / Tech', 'Other'];
const Q3_OPTIONS = ['Lead response speed', 'Manual data entry', 'Team overhead cost', 'Revenue visibility'];

function OptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        padding: '10px 16px',
        borderRadius: 'var(--radius-badge)',
        border: `1px solid ${selected ? 'var(--gold)' : 'var(--border)'}`,
        background: selected ? 'var(--gold)' : 'transparent',
        color: selected ? '#0A0A0A' : 'var(--muted)',
        cursor: 'pointer',
        transition: 'color 0.15s, background 0.15s, border-color 0.15s',
        userSelect: 'none',
      }}
    >
      {label}
    </motion.div>
  );
}

export default function QualificationGate({ onApply }: QualificationGateProps) {
  const shouldReduce = useReducedMotion();
  const [q1, setQ1] = useState<Option | null>(null);
  const [q2, setQ2] = useState<Option | null>(null);
  const [q3, setQ3] = useState<Option | null>(null);
  const [result, setResult] = useState<'idle' | 'qualified' | 'waitlist'>('idle');

  const allAnswered = q1 !== null && q2 !== null && q3 !== null;
  const qualified = q1 !== null && q1 !== 'Fewer than 25';

  const handleCheck = () => {
    if (!allAnswered) return;
    setResult(qualified ? 'qualified' : 'waitlist');
  };

  if (result === 'qualified') {
    return (
      <AnimatePresence>
        <motion.div
          key="qualified"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          <QualifiedPricing onApply={onApply} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section id="early-access" style={{ padding: '96px 32px', background: 'var(--obsidian)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={spring}
          style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Is AIMS Right For You?
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8 }}>
            We work with a limited number of integration partners each quarter.
            Answer three questions to see if you qualify for early access.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '48px' }}>
          {/* Q1 */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.05 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--white)', marginBottom: '16px' }}>
              What is your current monthly inbound lead volume?
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Q1_OPTIONS.map((opt) => (
                <OptionButton key={opt} label={opt} selected={q1 === opt} onClick={() => setQ1(opt)} />
              ))}
            </div>
          </motion.div>

          {/* Q2 */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--white)', marginBottom: '16px' }}>
              Which best describes your business?
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Q2_OPTIONS.map((opt) => (
                <OptionButton key={opt} label={opt} selected={q2 === opt} onClick={() => setQ2(opt)} />
              ))}
            </div>
          </motion.div>

          {/* Q3 */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.15 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--white)', marginBottom: '16px' }}>
              What is your primary operational challenge?
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Q3_OPTIONS.map((opt) => (
                <OptionButton key={opt} label={opt} selected={q3 === opt} onClick={() => setQ3(opt)} />
              ))}
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {result === 'waitlist' ? (
            <motion.div key="waitlist" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring}
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--white)', marginBottom: '12px' }}>
                You&apos;re a fit for our Waitlist.
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '20px', maxWidth: '480px', margin: '0 auto 20px' }}>
                AIMS is optimized for businesses handling 25+ monthly leads. Your current volume
                is a better fit for our standard waitlist — we&apos;ll reach out when a self-serve tier
                becomes available.
              </p>
              <motion.div
                onClick={onApply}
                whileHover={{ background: 'var(--gold-muted)' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-badge)', padding: '10px 24px', cursor: 'pointer', letterSpacing: '0.04em' }}
              >
                Join the Waitlist →
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="cta"
              style={{ display: 'flex', justifyContent: 'center' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div
                onClick={allAnswered ? handleCheck : undefined}
                whileHover={allAnswered ? { scale: 1.02 } : {}}
                whileTap={allAnswered ? { scale: 0.97 } : {}}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500,
                  background: allAnswered ? 'var(--gold)' : 'var(--surface-2)',
                  color: allAnswered ? '#0A0A0A' : 'var(--muted-2)',
                  borderRadius: 'var(--radius-badge)', padding: '14px 40px',
                  cursor: allAnswered ? 'pointer' : 'default',
                  transition: 'background 0.2s, color 0.2s',
                  border: `1px solid ${allAnswered ? 'var(--gold)' : 'var(--border)'}`,
                  maxWidth: '360px', width: '100%', textAlign: 'center',
                }}
              >
                Check My Eligibility →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function QualifiedPricing({ onApply }: { onApply: () => void }) {
  const shouldReduce = useReducedMotion();
  const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

  const CARDS = [
    {
      tag: 'Founding Tier · Arm 01',
      name: 'Arm 01 Access',
      price: '$499',
      period: '/mo at launch',
      features: ['Voice Management (Arm 01)', 'Inbound call handling + triage', 'Lead routing + CRM write-back', 'Call transcripts + analytics'],
      featured: false,
    },
    {
      tag: 'Founding Tier · Arms 01–03',
      name: 'Growth Access',
      price: '$2,400',
      period: '/mo at launch',
      badge: 'MOST REQUESTED',
      features: ['Everything in Arm 01', 'Revenue Intelligence (Arm 02)', 'Lead Qualification Engine (Arm 03)', 'Outbound + follow-up sequences', 'Priority onboarding'],
      featured: true,
    },
    {
      tag: 'Founding Tier · Full Platform',
      name: 'Full Platform',
      price: '$5,800',
      period: '/mo at launch',
      features: ['All six AIMS Arms', 'Full integration engineering', 'Custom arm configuration', 'Unlimited platform connections'],
      note: 'Full Platform includes scoped integration engineering from the ARX team — not a personal support line. Designed for businesses requiring custom arm development.',
      featured: false,
    },
  ];

  return (
    <section id="pricing" style={{ padding: '0 32px 96px', background: 'var(--obsidian)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--success)' }}>
            ✓ You qualify for AIMS Early Access Founding Tiers
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic', textAlign: 'center', marginBottom: '40px' }}>
          Founding-tier pricing is reserved now and locked before launch. No charge until AIMS goes live.
        </p>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {CARDS.map(({ tag, name, price, period, badge, features, note, featured }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.05 }}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${featured ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                position: 'relative',
              }}
            >
              {badge && (
                <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#0A0A0A', fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: '2px', padding: '3px 8px', whiteSpace: 'nowrap' }}>
                  {badge}
                </span>
              )}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{tag}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--white)' }}>{name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '44px', fontWeight: 500, color: 'var(--white)', lineHeight: 1 }}>{price}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>{period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {features.map((f) => (
                  <div key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>→ {f}</div>
                ))}
              </div>
              {note && (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '12px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6 }}>{note}</p>
                </div>
              )}
              <motion.div
                onClick={onApply}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500,
                  background: featured ? 'var(--gold)' : 'transparent',
                  color: featured ? '#0A0A0A' : 'var(--gold)',
                  border: featured ? 'none' : '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-badge)', padding: '12px',
                  cursor: 'pointer', textAlign: 'center',
                }}
              >
                Apply for Early Access →
              </motion.div>
            </motion.div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.8 }}>
          All tiers: Deterministic logic architecture · Modular Arm expansion · Founding-tier price lock before public launch
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
