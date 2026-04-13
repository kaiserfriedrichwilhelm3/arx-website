import { motion } from 'motion/react';
import BentoCard from './BentoCard';

const CARDS = [
  {
    title: 'Arm 01 — Voice Intelligence',
    body: 'Inbound/outbound voice agents that qualify leads, handle objections, and route high-value prospects to human closers. No scripts. Adaptive reasoning.',
    badge: 'LIVE',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
  },
  {
    title: 'Arm 02 — Revenue Recovery',
    body: 'Automated follow-up sequences that re-engage cold leads, recover abandoned pipelines, and turn stale CRM data into closed revenue.',
    badge: 'ALPHA',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Arm 03 — Outbound Calls',
    body: 'Autonomous outbound call campaigns with real-time objection handling. Scales to thousands of simultaneous conversations without headcount.',
    badge: 'ALPHA',
    span: 'double' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: 'Unified Memory Layer',
    body: 'Every arm shares a persistent memory graph. Context from a Monday call informs a Friday follow-up. Intelligence compounds across the entire system.',
    badge: 'CORE',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Analytics',
    body: 'Live dashboards showing call outcomes, revenue recovered, lead velocity, and conversion rates. No manual reporting. Data surfaces automatically.',
    badge: 'LIVE',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Alpha 1.0 Access',
    body: 'Limited integration slots open now. Early partners get direct access to the engineering team, custom arm configurations, and locked-in Alpha pricing.',
    badge: 'LIMITED',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function GeneralAIMS() {
  return (
    <section id="platform" style={{ padding: '120px 32px', maxWidth: '1200px', margin: '0 auto' }}>
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
            color: 'var(--gold)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          AIMS PLATFORM
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
          One core. Six execution arms.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          Most AI tools are isolated point solutions. AIMS is an architecture — a single intelligence that coordinates across voice, revenue, and operations simultaneously.
        </p>
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
            accent="gold"
            index={i}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #platform > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #platform > div:last-child > div[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
