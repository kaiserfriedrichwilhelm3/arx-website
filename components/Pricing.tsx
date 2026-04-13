import { motion } from 'motion/react';

interface PricingCardProps {
  tier: string;
  badge?: string;
  badgeColor?: string;
  setupLabel: string;
  setupValue: string;
  setupColor?: string;
  monthlyValue: string;
  monthlyColor?: string;
  monthlySuffix: string;
  features: string[];
  featureColor?: string;
  note?: string;
  proofNote?: string;
  cta: string;
  ctaColor: string;
  ctaBorder: string;
  ctaBg?: string;
  ctaHoverBg: string;
  borderColor: string;
  highlight?: boolean;
  onCta: () => void;
}

function PricingCard({
  tier, badge, badgeColor = 'var(--gold)', setupLabel, setupValue, setupColor = 'var(--white)',
  monthlyValue, monthlyColor = 'var(--white)', monthlySuffix, features, featureColor = 'var(--gold)',
  note, proofNote, cta, ctaColor, ctaBorder, ctaBg = 'transparent', ctaHoverBg,
  borderColor, highlight = false, onCta,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
      style={{
        background: highlight ? 'rgba(212,175,55,0.04)' : 'var(--surface)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-card)',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {badge && (
        <span style={{
          position: 'absolute', top: '16px', right: '16px',
          fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: badgeColor, background: 'transparent',
          border: `1px solid ${badgeColor}`, borderRadius: 'var(--radius-badge)', padding: '3px 10px',
        }}>
          {badge}
        </span>
      )}

      {/* Tier */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
          {tier}
        </div>

        {/* Setup */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          {setupLabel}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: setupColor, marginBottom: '16px' }}>
          {setupValue}
        </div>

        {/* Monthly */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 500, color: monthlyColor, lineHeight: 1 }}>
            {monthlyValue}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)' }}>
            {monthlySuffix}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)' }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {features.map((f) => (
          <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: featureColor, flexShrink: 0 }}>→</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Note */}
      {note && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
          {note}
        </p>
      )}

      {/* Proof */}
      {proofNote && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>{proofNote}</span>
        </div>
      )}

      {/* CTA */}
      <motion.button
        onClick={onCta}
        whileHover={{ background: ctaHoverBg }}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em',
          color: ctaColor, background: ctaBg, border: `1px solid ${ctaBorder}`,
          borderRadius: 'var(--radius-badge)', padding: '13px', cursor: 'pointer',
          width: '100%', textAlign: 'center', marginTop: 'auto',
        }}
      >
        {cta}
      </motion.button>
    </motion.div>
  );
}

interface PricingProps {
  onApply: () => void;
}

export default function Pricing({ onApply }: PricingProps) {
  return (
    <section id="pricing" style={{ padding: '96px 32px' }}>
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
            Deployment Tiers
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // select your integration path
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}>
          <PricingCard
            tier="General AIMS — Growth"
            setupLabel="One-Time Setup"
            setupValue="$499"
            monthlyValue="$299"
            monthlySuffix="/mo"
            features={[
              'Inbound Call Manager',
              'Lead Qualification Engine',
              'CRM Aggregator (5 integrations)',
              'Call Analytics Dashboard',
              'Revenue Leak Detector',
              '48-hour deployment',
            ]}
            cta="Deploy in 48hrs →"
            ctaColor="var(--gold)"
            ctaBorder="var(--gold)"
            ctaHoverBg="var(--gold-muted)"
            borderColor="var(--border)"
            onCta={onApply}
          />

          <PricingCard
            tier="General AIMS — Scale"
            badge="MOST POPULAR"
            badgeColor="var(--gold)"
            setupLabel="One-Time Setup"
            setupValue="$1,499"
            monthlyValue="$699"
            monthlySuffix="/mo"
            features={[
              'Everything in Growth',
              'Multi-location support',
              'Priority support SLA (<4hr response)',
              'Client Closer module',
              'Custom CRM integrations (unlimited)',
              'White-Glove Integration Engineer',
              'Direct Founder access',
            ]}
            note="White-Glove Integration Engineer: a dedicated ARX engineer manages your full deployment, customization, and ongoing optimization. This is the $5,200/mo SDR replacement."
            cta="Apply for Scale →"
            ctaColor="var(--obsidian)"
            ctaBorder="var(--gold)"
            ctaBg="var(--gold)"
            ctaHoverBg="rgba(212,175,55,0.88)"
            borderColor="var(--gold)"
            highlight
            onCta={onApply}
          />

          <PricingCard
            tier="AIMS Medical — Pilot"
            badge="Q3 2026 PILOT"
            badgeColor="var(--medical)"
            setupLabel="Pilot Program"
            setupValue="$0 Down"
            setupColor="var(--medical)"
            monthlyValue="TBD"
            monthlyColor="var(--medical)"
            monthlySuffix="post-pilot"
            features={[
              'All 6 AIMS Medical modules',
              'Insurance Defense Engine',
              'Live Session Scribe',
              'FHIR R4 Integration',
              'Claims Audit Engine',
              'Prescription Guard (state machine)',
              'Direct Founder integration support',
            ]}
            featureColor="var(--medical)"
            proofNote="Cespedes Cardiology, MD, PA — Miami, FL — Active Pilot"
            cta="Secure Pilot Slot →"
            ctaColor="var(--medical)"
            ctaBorder="var(--medical)"
            ctaHoverBg="var(--medical-muted)"
            borderColor="var(--border-medical)"
            onCta={onApply}
          />
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '40px', lineHeight: 1.7 }}
        >
          All tiers include: HIPAA-ready architecture · Deterministic logic layer · No LLM hallucinations in critical paths · SOC-2 roadmap
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #pricing > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
