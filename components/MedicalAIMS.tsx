import { motion } from 'motion/react';
import BentoCard from './BentoCard';

const CARDS = [
  {
    title: 'Arm 04 — Clinical Scribe',
    body: 'Real-time ambient documentation. AIMS listens to patient encounters and generates structured SOAP notes, ICD-10 codes, and CPT suggestions instantly.',
    badge: 'PILOT',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Arm 05 — Insurance Recovery',
    body: 'AIMS identifies underpaid claims, generates appeal documentation, and tracks resubmission outcomes. Recovers revenue that disappears in manual workflows.',
    badge: 'PILOT',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Prior Auth Automation',
    body: 'Autonomous prior authorization submission, status tracking, and follow-up across payers. Cuts auth processing from days to hours.',
    badge: 'ROADMAP',
    span: 'double' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="9" y="11" width="6" height="11" rx="1" />
        <path d="M5 11V7a7 7 0 0 1 14 0v4" />
      </svg>
    ),
  },
  {
    title: 'Patient Communication',
    body: 'Appointment reminders, pre-visit instructions, post-visit follow-ups, and care gap outreach. All automated, all HIPAA-compliant.',
    badge: 'PILOT',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: '$0 Down Pilot',
    body: 'No upfront cost. No 12-month contracts. AIMS deploys into your practice in 30 days. You pay only after measurable revenue recovery is proven.',
    badge: 'OPEN NOW',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function MedicalAIMS() {
  return (
    <section id="medical" style={{ padding: '120px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px', maxWidth: '600px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--medical-blue)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            AIMS MEDICAL
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            Built for the revenue cycle.
            <br />
            <span style={{ color: 'var(--medical-blue)' }}>Proven in cardiology.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
          >
            Deployed at Cespedes Cardiology. AIMS Medical handles the documentation, coding, and payer communication that consumes 40% of clinical staff time — returning that time to patient care.
          </p>

          {/* Live pilot badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '24px',
              padding: '10px 16px',
              background: 'var(--medical-muted)',
              border: '1px solid rgba(74,158,255,0.3)',
              borderRadius: 'var(--radius-badge)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--medical-blue)',
                display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--medical-blue)',
                letterSpacing: '0.08em',
              }}
            >
              LIVE PILOT — CESPEDES CARDIOLOGY
            </span>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          {CARDS.map((card, i) => (
            <BentoCard
              key={card.title}
              title={card.title}
              body={card.body}
              badge={card.badge}
              icon={card.icon}
              span={card.span}
              accent="medical"
              index={i}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        @media (max-width: 640px) {
          #medical > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #medical > div > div:last-child > div[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
