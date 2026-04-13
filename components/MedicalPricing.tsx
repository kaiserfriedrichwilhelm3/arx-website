'use client';

import { motion, useReducedMotion } from 'motion/react';

interface MedicalPricingProps {
  onApply: () => void;
}

export default function MedicalPricing({ onApply }: MedicalPricingProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="pilot" style={{ padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Q3 2026 Pilot Intake
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Pilot Offer
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // early partner terms — limited slots available
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-medical)', margin: '20px auto 0' }} />
        </motion.div>

        {/* Full-width pilot block */}
        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{
            background: 'rgba(74,158,255,0.04)',
            border: '1px solid var(--border-medical)',
            borderRadius: 'var(--radius-card)',
            padding: '56px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
              AIMS Medical — Pilot Program
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: 'var(--white)', lineHeight: 1, marginBottom: '8px' }}>
              $0
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--medical)', marginBottom: '40px' }}>
              upfront · First 30 days free
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {[
                'All 6 AIMS Medical modules — fully deployed',
                'Insurance Defense Engine with payer-specific logic',
                'Live Session Scribe — physician-verified output',
                'FHIR R4 Integration — full patient context layer',
                'Claims Audit Engine — pre-submission CPT/ICD-10 check',
                'Prescription Guard — state machine enforcement',
                'Front Desk Triage — zero missed calls',
                '40% lifetime discount on AIMS Medical v2.0',
              ].map((f) => (
                <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '10px', alignItems: 'flex-start', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--medical)', flexShrink: 0, marginTop: '2px' }}>→</span>
                  {f}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
                Cespedes Cardiology, MD, PA — Miami, FL — Active Pilot
              </span>
            </div>

            <motion.button
              onClick={onApply}
              whileHover={shouldReduce ? {} : { background: 'var(--medical-muted)' }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: '0.06em',
                color: 'var(--medical)',
                background: 'transparent',
                border: '1px solid var(--medical)',
                borderRadius: 'var(--radius-badge)',
                padding: '14px 36px',
                cursor: 'pointer',
              }}
            >
              Secure Your Pilot Slot →
            </motion.button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Pilot Terms
            </div>
            {[
              { label: 'Pilot Duration', value: '30 days free' },
              { label: 'Deployment Time', value: '< 2 weeks' },
              { label: 'Modules Included', value: 'All 6' },
              { label: 'Post-Pilot Pricing', value: 'TBD — custom' },
              { label: 'Lifetime v2.0 Discount', value: '40%' },
              { label: 'Integration Support', value: 'Direct Founder' },
              { label: 'Compliance', value: 'HIPAA-ready' },
              { label: 'BAA', value: 'Available on request' },
              { label: 'Minimum Commitment', value: 'None during pilot' },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '12px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                  gap: '16px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--medical)', textAlign: 'right' }}>{item.value}</span>
              </div>
            ))}

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted-2)', lineHeight: 1.7, marginTop: '8px', fontStyle: 'italic' }}>
              Post-pilot pricing is negotiated after the 30-day deployment based on practice size, specialty, and module usage. Early pilot partners receive a 40% lifetime discount on AIMS Medical v2.0.
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '40px', lineHeight: 1.7 }}
        >
          HIPAA-ready architecture · FHIR R4 compliance · Deterministic clinical logic · No autonomous prescribing or diagnosis
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #pilot > div > div:last-child {
            grid-template-columns: 1fr !important;
            padding: 32px !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
