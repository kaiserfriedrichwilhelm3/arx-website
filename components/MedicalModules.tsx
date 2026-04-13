import { motion } from 'motion/react';
import BentoCard from './BentoCard';

const containerVariants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function MedicalModules() {
  return (
    <section id="modules" style={{ padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            AIMS Medical Modules
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // six deterministic arms — clinical precision at every layer
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-medical)', margin: '20px auto 0' }} />
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '16px' }}
        >
          {/* Row 1 */}
          <BentoCard
            index={0}
            wide={false}
            title="Insurance Defense Engine"
            subtitle="Payer-specific denial pattern recognition. Automated appeal letter generation. 94.2% denial detection accuracy on live dataset."
            stat="94.2%"
            statLabel="DENIAL DETECTION"
            badge="CORE MODULE"
            badgeVariant="medical"
            accent="medical"
            style={{ gridColumn: '1', gridRow: '1 / 3' } as React.CSSProperties}
          />
          <BentoCard
            index={1}
            title="Live Session Scribe"
            subtitle="Real-time ambient transcription and SOAP note generation. Physician-verified. Zero PHI in LLM context."
            stat="70%"
            statLabel="DOC TIME RETURNED"
            accent="medical"
          />
          <BentoCard
            index={2}
            title="FHIR R4 Memory"
            subtitle="Patient context stored in compliant namespace isolation. Persistent across sessions. Full audit trail."
            stat="R4"
            statLabel="FHIR COMPLIANT"
            accent="medical"
          />

          {/* Row 2 */}
          <BentoCard
            index={3}
            title="Claims Audit Engine"
            subtitle="Real-time CPT/ICD-10 mismatch detection before submission. Catches coding errors that cause denials."
            accent="medical"
          />
          <BentoCard
            index={4}
            title="Prescription Guard"
            subtitle="State machine enforcement for multi-step prescriptions. Drug interaction flags. No autonomous prescribing — physician remains in loop."
            accent="medical"
          />
          <BentoCard
            index={5}
            wide={true}
            title="Front Desk Triage"
            subtitle="24/7 call answering, appointment routing, and patient intake. Zero missed calls. Seamless EHR handoff on every contact."
            stat="0"
            statLabel="MISSED CALLS"
            badge="PATIENT-FACING"
            badgeVariant="medical"
            accent="medical"
          />
        </motion.div>

        {/* HIPAA architecture callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.2 }}
          style={{
            marginTop: '24px',
            background: 'rgba(74,158,255,0.04)',
            border: '1px solid var(--border-medical)',
            borderRadius: 'var(--radius-card)',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              HIPAA-Ready Architecture
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8 }}>
              Every module operates within strict PHI isolation. No patient data is retained in LLM context. All sessions are fully auditable with immutable logs.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexShrink: 0, flexWrap: 'wrap' }}>
            {['HIPAA-Ready', 'FHIR R4', 'SOC-2 Roadmap', 'BAA Available'].map((badge) => (
              <div
                key={badge}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--medical)',
                  border: '1px solid var(--border-medical)',
                  borderRadius: 'var(--radius-badge)',
                  padding: '6px 12px',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #modules > div > div:nth-child(3) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #modules > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
