'use client';

import { motion, useReducedMotion } from 'motion/react';
import BentoCard from './BentoCard';

interface GalenArmsProps {
  onInquire: () => void;
}

export default function GalenArms({ onInquire }: GalenArmsProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="capabilities" style={{ padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Galen Capabilities
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // six clinical modules — in development for Alpha release
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-galen)', margin: '16px auto 0' }} />
        </motion.div>

        <div className="galen-arms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

          {/* Card 1 — spans cols 1-2 */}
          <BentoCard index={0} accent="galen"
            title="Insurance Defense"
            subtitle="Designed to monitor every submitted claim, flag denial patterns before they compound, and draft appeal documentation automatically. Built to convert reactive denial management into a proactive revenue protection layer."
            badge="Alpha Stage · Limited Access" badgeVariant="muted"
            style={{ gridColumn: '1 / span 2' } as React.CSSProperties}
          />

          {/* Card 2 */}
          <BentoCard index={1} accent="galen"
            title="Prescription Guard"
            subtitle="Designed to manage refill requests, prior authorization workflows, and formulary exception submissions without pulling clinical staff into administrative loops. Built to resolve these requests faster and with fewer escalations."
            badge="Alpha Stage · Limited Access" badgeVariant="muted"
          />

          {/* Card 3 */}
          <BentoCard index={2} accent="galen"
            title="Live Session Scribe"
            subtitle="Designed to transcribe and structure clinical encounters in real time, producing compliant documentation that integrates with your EHR. Built to return the 2–3 hours per day currently lost to note-writing."
            badge="Alpha Stage · Limited Access" badgeVariant="muted"
          />

          {/* Card 4 */}
          <BentoCard index={3} accent="galen"
            title="FHIR R4 Memory"
            subtitle="A structured patient data layer built on FHIR R4 standards. Designed to maintain longitudinal context across encounters, surface relevant history at intake, and sync with existing EHR infrastructure without requiring a rip-and-replace."
            badge="Alpha Stage · Limited Access" badgeVariant="muted"
          />

          {/* Card 5 — spans cols 2-3 */}
          <BentoCard index={4} accent="galen"
            title="Claims Audit"
            subtitle="Designed to audit submitted claims for coding errors, missing modifiers, and documentation gaps before submission — reducing denial rates at the source. Built to run continuously against your active claims pipeline."
            badge="Alpha Stage · Limited Access" badgeVariant="muted"
            style={{ gridColumn: 'span 2' } as React.CSSProperties}
          />

          {/* Card 6 */}
          <BentoCard index={5} accent="galen"
            title="Front Desk Triage"
            subtitle="Designed to handle inbound patient contacts — calls, messages, appointment requests — and route them according to clinical priority rules. Built so no patient contact goes unanswered regardless of front desk capacity."
            badge="Alpha Stage · Limited Access" badgeVariant="muted"
          />
        </div>

        {/* Architecture note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.15 }}
          style={{ marginTop: '16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '20px', textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8 }}>
            Galen is built on the same Brain + Arms architecture as AIMS. Each module operates independently and connects to the Brain via a standardized adapter.
            Pilot partners select the modules relevant to their practice. No modules are bundled by default. All capabilities listed are in development — not yet available.
          </p>
        </motion.div>

        {/* Access strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.2 }}
          style={{ marginTop: '16px', background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '20px 24px' }}
        >
          <div className="galen-strip-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--white)', marginBottom: '6px' }}>Interested in Galen?</h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7 }}>
                We are selecting a limited number of clinical pilot partners ahead of launch. Pilot partners receive founding-tier pricing locked for life and direct input into the product roadmap.
              </p>
            </div>
            <motion.button
              onClick={onInquire}
              whileHover={shouldReduce ? {} : { background: 'var(--galen-muted)', scale: 1.02 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--galen)', background: 'transparent', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '10px 20px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Inquire About Galen →
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .galen-arms-grid { grid-template-columns: 1fr 1fr !important; }
          .galen-arms-grid > *[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .galen-arms-grid { grid-template-columns: 1fr !important; }
          .galen-arms-grid > *[style*="span 2"] { grid-column: span 1 !important; }
          .galen-strip-inner { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
