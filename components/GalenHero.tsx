'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

interface GalenHeroProps {
  onInquire: () => void;
}

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

const FIGURES = [
  { value: '~30%', label: 'of claims denied on first submission', note: 'industry average' },
  { value: '2–3 hrs', label: 'lost per provider per day to documentation', note: 'industry estimate' },
  { value: '$0', label: 'upfront for Galen pilot partners', note: 'founding-tier pricing' },
];

export default function GalenHero({ onInquire }: GalenHeroProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section style={{ padding: '120px 32px 96px', background: 'var(--obsidian)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}
        >
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← AIMS
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--border-galen)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--galen)' }}>Galen</span>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.05 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '6px 12px', marginBottom: '32px' }}
        >
          <span className="status-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)', display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--galen)', letterSpacing: '0.1em' }}>
            IN DEVELOPMENT · EARLY ACCESS NOW OPEN
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={spring}
          style={{ maxWidth: '720px', marginBottom: '24px' }}
        >
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px' }}>
            Galen.
          </h1>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, color: 'var(--galen)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
            The clinical implementation of AIMS.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ ...spring, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(13px, 1.5vw, 15px)', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '40px' }}
        >
          Named after Galen of Pergamon — the physician who systematized medicine. Galen is designed to
          protect clinical revenue, eliminate documentation burden, and give practice owners the operational
          clarity they currently lack. Built for the realities of clinical practice. In development now.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ ...spring, delay: 0.15 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '80px' }}
        >
          <motion.button
            onClick={onInquire}
            whileHover={shouldReduce ? {} : { background: 'var(--galen-muted)', scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--galen)', background: 'var(--galen-muted)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', cursor: 'pointer', letterSpacing: '0.04em' }}
          >
            Inquire About Galen →
          </motion.button>
          <a
            href="#the-problem"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'rgba(250,250,250,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            See the problem
          </a>
        </motion.div>

        {/* Proof figures */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ ...spring, delay: 0.2 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Industry context — estimates, not claimed results
          </div>
          <div className="galen-figures" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {FIGURES.map(({ value, label, note }) => (
              <div key={label} style={{ background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: 500, color: 'var(--galen)', lineHeight: 1, marginBottom: '8px' }}>{value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '4px' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{note}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .galen-figures { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .galen-figures { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
