import { motion } from 'motion/react';
import BentoCard from './BentoCard';

const containerVariants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function MedicalAIMS() {
  return (
    <section
      id="medical"
      style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
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
            AIMS Medical
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // precision-tuned for clinical practice
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-medical)', margin: '20px auto 0' }} />
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}
        >
          <BentoCard
            index={0}
            title="Insurance Defense Engine"
            subtitle="Pre-authorization automation, denial pattern detection, and AI-generated appeal letters. Fights denials before they cost you."
            badge="PILOT ONLY"
            badgeVariant="medical"
            accent="medical"
            wide={false}
            style={{ gridColumn: '1', gridRow: '1 / 3' } as React.CSSProperties}
          />
          <BentoCard
            index={1}
            title="Prescription Fulfillment Guard"
            subtitle="Deterministic state machine: patient seen within configured window → auto-fill approved. Otherwise: escalate to physician. Zero hallucinations."
            badge="PILOT ONLY"
            badgeVariant="medical"
          />
          <BentoCard
            index={2}
            title="Live Session Scribe"
            subtitle="Real-time clinical note generation during patient encounters. Physician reviews and approves. Eliminates documentation debt."
            badge="PILOT ONLY"
            badgeVariant="medical"
            accent="medical"
          />
          <BentoCard
            index={3}
            title="FHIR R4 Memory Layer"
            subtitle="All patient context stored in the interoperable standard. Zero data silos. Every arm reads from the same source of truth."
            stat="R4"
            statLabel="FHIR COMPLIANT"
          />
          <BentoCard
            index={4}
            title="Claims Audit Engine"
            subtitle="Post-encounter CPT code validation against visit notes before submission. Catches undercoding and overcoding before they become denials."
            badge="PILOT ONLY"
            badgeVariant="medical"
          />
          <BentoCard
            index={5}
            title="Front Desk Triage"
            subtitle="Scheduling, intake, insurance verification, and pre-auth initiated before staff touches a single file."
            stat="<2min"
            statLabel="AVG HANDLE TIME"
          />
        </motion.div>

        {/* Proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: '48px',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            Active Pilot Partner — Cespedes Cardiology, MD, PA — Miami, FL
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #medical > div > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #medical > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
