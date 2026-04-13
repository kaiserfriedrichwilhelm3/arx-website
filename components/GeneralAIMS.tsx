import { motion } from 'motion/react';
import BentoCard from './BentoCard';

// Decorative sparkline SVG
const Sparkline = () => (
  <svg viewBox="0 0 140 40" style={{ width: '100%', maxWidth: '140px', marginTop: '8px' }}>
    <polyline
      points="0,34 12,28 24,30 36,18 48,22 60,10 72,14 84,8 96,12 108,4 120,8 140,2"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
    />
  </svg>
);

// Integration tiles
const INTEGRATIONS = [
  { short: 'SF', name: 'Salesforce' },
  { short: 'HB', name: 'HubSpot' },
  { short: 'ZD', name: 'Zendesk' },
  { short: 'GS', name: 'Google Sheets' },
  { short: 'QK', name: 'QuickBooks' },
  { short: 'SL', name: 'Slack' },
];

const IntegrationTiles = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
    {INTEGRATIONS.map((int) => (
      <div
        key={int.short}
        title={int.name}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '32px',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--muted)',
          letterSpacing: '0.02em',
        }}
      >
        {int.short}
      </div>
    ))}
  </div>
);

const containerVariants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function GeneralAIMS() {
  return (
    <section id="general" style={{ padding: '96px 32px' }}>
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
            General AIMS
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // autonomous operations for any professional service business
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-gold)', margin: '20px auto 0' }} />
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
            title="Inbound Call Manager"
            subtitle="Every call answered, triaged, and routed. 24/7. Zero voicemail. Zero missed opportunities."
            stat="0"
            statLabel="MISSED CALLS"
            style={{ gridColumn: '1', gridRow: '1 / 3' } as React.CSSProperties}
          />
          <BentoCard
            index={1}
            title="Revenue Leak Detector"
            subtitle="Surfaces lost pipeline from unanswered calls, dead leads, and missed follow-ups."
            stat="$12K"
            statLabel="AVG MONTHLY RECOVERY"
          />
          <BentoCard
            index={2}
            title="Lead Qualification Engine"
            subtitle="Scores and follows up every inbound lead within 60 seconds. Replaces SDR overhead."
            stat="3×"
            statLabel="CLOSE RATE LIFT"
          />

          {/* Row 2 */}
          <BentoCard
            index={3}
            title="CRM Aggregator"
            subtitle="One command interface for all your tools and data streams."
          >
            <IntegrationTiles />
          </BentoCard>

          <BentoCard
            index={4}
            title="Call Analytics Dashboard"
            subtitle="Live sentiment scoring, outcome tracking, and full transcripts. Every call auditable."
          >
            <Sparkline />
          </BentoCard>

          <BentoCard
            index={5}
            wide={true}
            title="Client Closer"
            subtitle="AIMS manages follow-up sequences autonomously to close deals. Replaces human SDR overhead entirely."
            badge="REVENUE ENGINE"
            badgeVariant="gold"
            accent="gold"
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #general > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #general > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
