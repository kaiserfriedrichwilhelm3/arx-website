'use client';

import { motion, useReducedMotion } from 'motion/react';
import BentoCard from './BentoCard';

interface AIMAArmsProps {
  onApply: () => void;
}

const BADGE = 'Alpha Stage · Limited Access';

const Sparkline = () => (
  <svg viewBox="0 0 140 40" style={{ width: '100%', maxWidth: '140px', marginTop: '8px' }} aria-hidden>
    <polyline
      points="0,34 14,28 28,30 42,18 56,22 70,10 84,14 98,8 112,12 126,4 140,2"
      fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round"
    />
  </svg>
);

const INTEGRATIONS = [
  { abbr: 'SF', name: 'Salesforce' },
  { abbr: 'HB', name: 'HubSpot' },
  { abbr: 'ZD', name: 'Zendesk' },
  { abbr: 'GS', name: 'Google Sheets' },
  { abbr: 'QK', name: 'QuickBooks' },
  { abbr: 'SL', name: 'Slack' },
];

export default function AIMAArms({ onApply }: AIMAArmsProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="arms" style={{ padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            The Six Arms
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // modular execution for professional service businesses
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-gold)', margin: '16px auto 0' }} />
        </motion.div>

        <div className="arms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

          <BentoCard index={0} accent="gold"
            title="Arm 01 · Voice Management"
            subtitle="Designed to answer, triage, and route every inbound call according to your business rules. Built so no call goes unanswered — replacing the capacity ceiling of human front-desk staff. Target latency: sub-500ms response initiation."
            badge={BADGE} badgeVariant="muted"
            style={{ gridColumn: '1 / span 2' } as React.CSSProperties}
          />

          <BentoCard index={1}
            title="Arm 02 · Revenue Intelligence"
            subtitle="Built to surface revenue gaps — unanswered calls, lead decay, missed follow-ups — and quantify the cost of each gap in real time. Turns invisible losses into actionable line items."
            badge={BADGE} badgeVariant="muted"
          />

          <BentoCard index={2}
            title="Arm 03 · Lead Qualification"
            subtitle="Designed to qualify every inbound lead against your criteria within seconds of contact. Speed-to-lead is the primary conversion variable in 2026 — AIMS targets sub-30-second response for every new inquiry."
            badge={BADGE} badgeVariant="muted"
          />

          <BentoCard index={3}
            title="Arm 04 · CRM Aggregator"
            subtitle="A unified data layer connecting your CRM, scheduling, communication, and finance tools. One source of truth. Automatic sync. Zero manual data entry."
            badge={BADGE} badgeVariant="muted"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {INTEGRATIONS.map(({ abbr, name }) => (
                <span key={abbr} className="integration-tile" title={name}>
                  {abbr}
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard index={4}
            title="Arm 05 · Analytics Dashboard"
            subtitle="Call outcomes, lead conversion, revenue flow, and operational performance — surfaced in one auditable view. Built to replace the patchwork of dashboards most businesses manage manually."
            badge={BADGE} badgeVariant="muted"
          >
            <Sparkline />
          </BentoCard>

          <BentoCard index={5} accent="gold"
            title="Arm 06 · Outbound & Closing"
            subtitle="Manages follow-up sequences autonomously — moving qualified leads through your pipeline without manual intervention. Designed to close the gap between a qualified lead and a signed agreement."
            badge={BADGE} badgeVariant="muted"
            style={{ gridColumn: 'span 2' } as React.CSSProperties}
          />
        </div>

        {/* Early access strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.15 }}
          style={{ marginTop: '16px', background: 'var(--surface-2)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-card)', padding: '20px 24px' }}
        >
          <div className="strip-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--white)', marginBottom: '6px' }}>Interested in AIMS?</h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7 }}>
                We are selecting early access partners ahead of launch. Early partners receive priority onboarding and founding-tier pricing locked before public release.
              </p>
            </div>
            <motion.button
              onClick={onApply}
              whileHover={shouldReduce ? {} : { background: 'var(--gold-muted)', scale: 1.02 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', background: 'transparent', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-badge)', padding: '10px 20px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Apply for Early Access →
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .arms-grid { grid-template-columns: 1fr 1fr !important; }
          .arms-grid > *[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .arms-grid { grid-template-columns: 1fr !important; }
          .arms-grid > *[style*="span 2"] { grid-column: span 1 !important; }
          .strip-inner { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
