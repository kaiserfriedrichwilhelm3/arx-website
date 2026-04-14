'use client';

import { motion, useReducedMotion } from 'motion/react';

interface GalenAccessProps {
  onInquire: () => void;
}

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

const FEATURES = [
  'Insurance Defense — claim monitoring, denial flagging, automated appeal drafts',
  'Prescription Guard — refill and prior auth request management',
  'Live Session Scribe — real-time transcription and EHR-ready documentation',
  'FHIR R4 Memory — longitudinal patient context layer',
  'Claims Audit — pre-submission coding and documentation review',
  'Front Desk Triage — inbound patient contact handling and routing',
  'Direct integration support from ARX Systems engineering team',
  'Founding-tier pricing locked for life on v2.0 release',
  'Direct input into the Galen product roadmap',
];

const TERMS = [
  { label: 'Upfront Cost', value: '$0' },
  { label: 'First 30 Days', value: 'Free' },
  { label: 'Pilot Duration', value: 'Flexible' },
  { label: 'Pricing Lock', value: 'Founding tier — life of product' },
];

export default function GalenAccess({ onInquire }: GalenAccessProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="access" style={{ padding: '96px 32px', background: 'var(--obsidian)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={spring}
          style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Reserve Your Pilot Access
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // galen is in development — clinical pilot partners selected ahead of launch
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-galen)', margin: '16px auto 0' }} />
        </motion.div>

        <div className="galen-access-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>

          {/* Left — offer block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={spring}
          >
            {/* Price block */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '32px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
                Clinical Pilot — Zero-Cost Entry
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '72px', fontWeight: 500, color: 'var(--galen)', lineHeight: 1, marginBottom: '4px' }}>
                $0
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
                upfront — first 30 days free
              </div>

              {/* Terms grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {TERMS.map(({ label, value }) => (
                  <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '12px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--galen)' }}>{value}</div>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={onInquire}
                whileHover={shouldReduce ? {} : { background: 'var(--galen-muted)', scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--galen)', background: 'var(--galen-muted)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '14px 24px', cursor: 'pointer', letterSpacing: '0.04em' }}
              >
                Inquire About Galen →
              </motion.button>
            </div>

            {/* Note */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '16px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
                Galen is in development. Not yet available for clinical deployment. Inquiring now places you in the founding partner cohort — you will be contacted directly by the ARX Systems team when pilot access opens.
              </p>
            </div>
          </motion.div>

          {/* Right — features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ ...spring, delay: 0.1 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px' }}>
              What Pilot Partners Receive
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {FEATURES.map((feature) => (
                <div key={feature} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--galen)', flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="status-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--galen)', letterSpacing: '0.1em' }}>DEVELOPMENT STATUS</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7 }}>
                Galen Alpha is in active development by ARX Systems. Pilot partners are selected ahead of launch and will be the first to deploy the platform. We are a founder-led team — every partner works directly with the engineers building the system.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .galen-access-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
