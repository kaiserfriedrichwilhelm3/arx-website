import { motion } from 'motion/react';

const DEPLOYMENT_FACTS = [
  { label: 'Practice', value: 'Cespedes Cardiology, MD, PA' },
  { label: 'Location', value: 'Miami, FL' },
  { label: 'Specialty', value: 'Cardiology' },
  { label: 'Status', value: 'Active Pilot', highlight: true },
  { label: 'Deployment Date', value: 'February 2026' },
  { label: 'Denial Detection', value: '94.2% accuracy' },
  { label: 'FHIR Layer', value: 'R4 — Active' },
  { label: 'Session Scribe', value: 'Beta — Physician-verified' },
];

export default function CaseStudy() {
  return (
    <section id="case-study" style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
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
            Live Deployment
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Cespedes Cardiology Pilot
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // the first clinical deployment of AIMS Medical — active and verified
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-medical)', margin: '20px auto 0' }} />
        </motion.div>

        {/* Two-column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>

          {/* Left — Deployment facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              padding: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', display: 'block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Deployment Verified
              </span>
            </div>

            {DEPLOYMENT_FACTS.map((fact, i) => (
              <div
                key={fact.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '12px 0',
                  borderBottom: i < DEPLOYMENT_FACTS.length - 1 ? '1px solid var(--border)' : 'none',
                  gap: '16px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', flexShrink: 0 }}>
                  {fact.label}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: fact.highlight ? 'var(--success)' : 'var(--white)', textAlign: 'right' }}>
                  {fact.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Right — HIPAA architecture callout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* HIPAA block */}
            <div style={{
              background: 'rgba(74,158,255,0.04)',
              border: '1px solid var(--border-medical)',
              borderRadius: 'var(--radius-card)',
              padding: '28px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                HIPAA Architecture
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Data Isolation', value: 'Pinecone namespace isolation per patient' },
                  { label: 'PHI Handling', value: 'Zero PHI retained in LLM context' },
                  { label: 'Audit Trail', value: 'Full session logging — immutable' },
                  { label: 'Access Control', value: 'Role-based — physician + admin tiers' },
                  { label: 'Encryption', value: 'AES-256 at rest, TLS 1.3 in transit' },
                  { label: 'BAA', value: 'Signed — available upon request' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--medical)', fontFamily: 'var(--font-mono)', fontSize: '10px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)', lineHeight: 1.5 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results callout */}
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              padding: '28px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Pilot Results (8 weeks)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  { value: '94.2%', label: 'Denial detection rate' },
                  { value: '0', label: 'Missed front-desk calls' },
                  { value: '70%', label: 'Doc time returned' },
                  { value: '<2wk', label: 'Full FHIR deployment' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 500, color: 'var(--medical)', lineHeight: 1, marginBottom: '4px' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #case-study > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
