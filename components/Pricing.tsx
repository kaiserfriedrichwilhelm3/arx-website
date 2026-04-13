import { motion } from 'motion/react';

interface PricingCardProps {
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
  accent?: 'gold' | 'medical' | 'default';
  onCta?: () => void;
}

function PricingCard({
  tier,
  price,
  period,
  description,
  features,
  cta,
  badge,
  accent = 'default',
  onCta,
}: PricingCardProps) {
  const isGold = accent === 'gold';
  const isMedical = accent === 'medical';
  const accentColor = isGold ? 'var(--gold)' : isMedical ? 'var(--medical-blue)' : 'var(--muted)';
  const accentMuted = isGold ? 'var(--gold-muted)' : isMedical ? 'var(--medical-muted)' : 'rgba(250,250,250,0.06)';
  const borderAccent = isGold ? 'var(--border-gold)' : isMedical ? 'rgba(74,158,255,0.3)' : 'var(--border)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
      style={{
        background: isGold ? 'rgba(212,175,55,0.04)' : 'var(--surface)',
        border: `1px solid ${isGold || isMedical ? borderAccent : 'var(--border)'}`,
        borderRadius: 'var(--radius-card)',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      {(isGold || isMedical) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: accentColor,
            opacity: 0.6,
          }}
        />
      )}

      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              color: accentColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {tier}
          </span>
          {badge && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                color: accentColor,
                background: accentMuted,
                border: `1px solid ${borderAccent}`,
                borderRadius: 'var(--radius-badge)',
                padding: '2px 8px',
                letterSpacing: '0.06em',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '40px',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1,
            }}
          >
            {price}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            {period}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {features.map((feature) => (
          <li
            key={feature}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.5,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onCta}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 500,
          color: isGold ? 'var(--obsidian)' : isMedical ? 'var(--obsidian)' : 'var(--white)',
          background: isGold ? 'var(--gold)' : isMedical ? 'var(--medical-blue)' : 'transparent',
          border: `1px solid ${isGold || isMedical ? 'transparent' : 'var(--border)'}`,
          borderRadius: 'var(--radius-badge)',
          padding: '12px 20px',
          cursor: 'pointer',
          letterSpacing: '0.06em',
          textAlign: 'center',
          transition: 'opacity 0.2s ease',
          marginTop: 'auto',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {cta}
      </button>
    </motion.div>
  );
}

const TIERS = [
  {
    tier: 'Growth',
    price: '$2,400',
    period: '/ month',
    description: 'Voice intelligence + revenue recovery for growing B2B teams. Up to 500 monthly leads processed.',
    badge: undefined,
    accent: 'default' as const,
    features: [
      'Arm 01 — Voice Intelligence',
      'Arm 02 — Revenue Recovery',
      'Up to 500 leads/month',
      'CRM integration (HubSpot, Salesforce)',
      'Real-time analytics dashboard',
      'Email support',
    ],
    cta: 'APPLY FOR INTEGRATION',
  },
  {
    tier: 'Scale',
    price: '$5,800',
    period: '/ month',
    description: 'Full platform access. All three arms deployed. Unlimited leads. Direct engineering team access.',
    badge: 'MOST POPULAR',
    accent: 'gold' as const,
    features: [
      'All three execution arms',
      'Unlimited monthly leads',
      'Custom arm configuration',
      'Dedicated integration engineer',
      'Alpha 1.0 pricing locked in',
      'Priority support + Slack channel',
    ],
    cta: 'APPLY FOR INTEGRATION',
  },
  {
    tier: 'Medical Pilot',
    price: '$0',
    period: 'down',
    description: '$0 upfront. 30-day deployment. Pay only after measurable revenue recovery is proven at your practice.',
    badge: 'OPEN NOW',
    accent: 'medical' as const,
    features: [
      'Clinical Scribe (Arm 04)',
      'Insurance Recovery (Arm 05)',
      'Patient communication automation',
      'HIPAA-compliant infrastructure',
      'EHR integration support',
      'Revenue-share pricing after pilot',
    ],
    cta: 'SECURE PILOT SLOT',
  },
];

interface PricingProps {
  onApply: () => void;
}

export default function Pricing({ onApply }: PricingProps) {
  return (
    <section id="pricing" style={{ padding: '120px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px', maxWidth: '560px' }}
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
            PRICING
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Alpha pricing.
            <br />
            Locked in for early partners.
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
            Integration slots are limited. Teams that join during Alpha 1.0 lock in current rates permanently.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {TIERS.map((tier) => (
            <PricingCard
              key={tier.tier}
              {...tier}
              onCta={onApply}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--muted)',
            marginTop: '40px',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          All plans include a 30-day integration period. No contracts. Cancel anytime after 90 days.
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
