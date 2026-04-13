'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

interface MedicalHeroProps {
  onApply: () => void;
}

const PROOF_STATS = [
  { value: '$0', label: 'Upfront Cost', sub: 'First 30 days free' },
  { value: '94.2%', label: 'Denial Detection Accuracy', sub: 'Cespedes Cardiology dataset' },
  { value: '40%', label: 'Lifetime v2.0 Discount', sub: 'For pilot partners' },
];

export default function MedicalHero({ onApply }: MedicalHeroProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="overview"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(74,158,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Medical accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--medical), transparent)', opacity: 0.5 }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '32px' }}
        >
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.12em' }}
          >
            ARX Systems
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', margin: '0 8px' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', letterSpacing: '0.12em' }}>AIMS Medical</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.1 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Clinical AI Operations
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            AIMS Medical.
          </h1>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 700, color: 'var(--medical)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '32px' }}>
            Built for Clinical Precision.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.9, maxWidth: '600px', margin: '0 auto 48px' }}>
            A deterministic AI system engineered for clinical practices. Insurance Defense. Documentation automation. FHIR R4 compliance. Zero hallucinations in critical clinical paths.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.3 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '72px' }}
        >
          <motion.button
            onClick={onApply}
            whileHover={shouldReduce ? {} : { background: 'var(--medical-muted)' }}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--medical)', background: 'transparent', border: '1px solid var(--medical)', borderRadius: 'var(--radius-badge)', padding: '12px 28px', cursor: 'pointer', letterSpacing: '0.06em' }}
          >
            Secure Pilot Slot →
          </motion.button>
          <a
            href="#modules"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '12px 28px', textDecoration: 'none', letterSpacing: '0.06em' }}
          >
            View Modules
          </a>
        </motion.div>

        {/* Proof stats */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.45 }}
          style={{ display: 'flex', gap: '0', justifyContent: 'center', flexWrap: 'wrap', border: '1px solid var(--border-medical)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}
        >
          {PROOF_STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                minWidth: '160px',
                padding: '28px 24px',
                textAlign: 'center',
                borderRight: i < PROOF_STATS.length - 1 ? '1px solid var(--border-medical)' : 'none',
                background: 'rgba(74,158,255,0.03)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: 500, color: 'var(--medical)', lineHeight: 1, marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--white)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
