import { motion } from 'motion/react';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };
const vp = { once: true, margin: '-40px' as const };

const PILLARS = [
  {
    icon: '⊕',
    title: 'HIPAA-Aligned Architecture',
    body: 'Galen is architected against HIPAA Security Rule requirements — administrative, physical, and technical safeguards — with zero patient data retention, end-to-end encryption, and auditable access logging. A Business Associate Agreement (BAA) is executed with every pilot partner before any clinical data is processed. ARX Systems is building toward SOC 2 Type II certification ahead of Galen\'s clinical launch.',
    featured: true,
  },
  {
    icon: '◈',
    title: 'Zero Retention Architecture',
    body: 'Galen processes clinical session data in memory only. No patient content is written to persistent storage. Session context is cleared on session close — nothing is retained beyond the active encounter.',
  },
  {
    icon: '⬡',
    title: 'AES-256 Encryption in Transit',
    body: 'All data transmitted between Galen and connected systems is encrypted end-to-end using AES-256. No clinical data moves over unencrypted channels at any point in the pipeline.',
  },
  {
    icon: '⬢',
    title: 'OAuth 2.0 Access Control',
    body: 'Galen integrates with EHR and practice management systems via OAuth 2.0. No credentials are stored. Access tokens are scoped to minimum necessary permissions and rotated on each session.',
  },
  {
    icon: '◉',
    title: 'Audit-Ready Event Logging',
    body: 'Every integration action — reads, writes, routing decisions — is logged with timestamps and identifiers. Logs are immutable and available for practice-level review. Designed for compliance audit workflows.',
  },
  {
    icon: '◌',
    title: 'Deterministic Logic Only',
    body: 'Galen executes against defined rules, not probabilistic inference. Clinical routing, documentation structuring, and denial flagging follow deterministic paths — no black-box AI decision-making on patient data.',
  },
  {
    icon: '◎',
    title: 'SOC 2 Type II Roadmap',
    body: 'ARX Systems is building toward SOC 2 Type II certification ahead of Galen\'s clinical launch. Pilot partners will receive documentation of security controls as part of the onboarding process.',
  },
];

export default function GalenSecurity() {
  return (
    <section id="security" style={{ padding: '96px 32px', background: 'var(--obsidian)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
          style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
            Security Architecture
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Built Without Shortcuts.
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            Galen is designed from the ground up for clinical environments. The architecture reflects the
            sensitivity of the data — not as an afterthought, but as a core constraint.
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-galen)', margin: '16px auto 0' }} />
        </motion.div>

        {/* Disclaimer banner */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ ...spring, delay: 0.05 }}
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '12px 20px', marginBottom: '48px', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
            Galen is in development. The security architecture described is the design target for clinical release. No patient data has been processed. A full technical security overview and BAA are provided to pilot partners at onboarding.
          </span>
        </motion.div>

        {/* Pillars grid */}
        <div className="security-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {PILLARS.map(({ icon, title, body, featured }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ ...spring, delay: i * 0.05 }}
              style={{
                background: featured ? 'var(--surface-2)' : 'var(--surface)',
                border: `1px solid ${featured ? 'var(--border-gold)' : 'var(--border-galen)'}`,
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                gridColumn: featured ? '1 / -1' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: featured ? 'var(--gold)' : 'var(--galen)', lineHeight: 1 }}>{icon}</span>
                {featured && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.15em', border: '1px solid var(--border-gold)', borderRadius: '2px', padding: '2px 6px' }}>Required for clinical deployment</span>}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: featured ? '22px' : '18px', color: 'var(--white)', lineHeight: 1.25 }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.75 }}>{body}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture note */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ ...spring, delay: 0.1 }}
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--galen)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
            Architecture Principle
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '800px' }}>
            Clinical AI must earn trust through architecture, not policy documents. Galen&apos;s design
            ensures that the system cannot retain or expose patient data by construction — not merely by
            configuration. Pilot partners receive a full technical security overview before onboarding.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .security-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .security-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
