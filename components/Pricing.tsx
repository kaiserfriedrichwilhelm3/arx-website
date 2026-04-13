'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PricingCardProps {
  tier: string;
  badge?: string;
  badgeColor?: string;
  armLabel: string;
  armValue: string;
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
  tier, badge, badgeColor = 'var(--gold)', armLabel, armValue,
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

        {/* Arm */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          {armLabel}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: featureColor, marginBottom: '16px' }}>
          {armValue}
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

type Sector = 'business' | 'medical';

export default function Pricing({ onApply }: PricingProps) {
  const [sector, setSector] = useState<Sector>('business');
  const shouldReduce = useReducedMotion();

  const toggleStyle = (active: boolean, color: string): React.CSSProperties => ({
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.06em',
    color: active ? 'var(--obsidian)' : 'var(--muted)',
    background: active ? color : 'transparent',
    border: `1px solid ${active ? color : 'var(--border)'}`,
    borderRadius: '999px',
    padding: '10px 24px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

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
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', marginBottom: '32px' }}>
            // select your integration path
          </p>

          {/* Sector toggle */}
          <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px' }}>
            <button onClick={() => setSector('business')} style={toggleStyle(sector === 'business', 'var(--gold)')}>
              GENERAL BUSINESS
            </button>
            <button onClick={() => setSector('medical')} style={toggleStyle(sector === 'medical', 'var(--medical)')}>
              AIMS MEDICAL
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {sector === 'business' ? (
            <motion.div
              key="business"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}
            >
              <PricingCard
                tier="General AIMS — Starter"
                armLabel="AIMS ARM"
                armValue="Arm 01 — Voice + Lead Qualification"
                monthlyValue="$499"
                monthlyColor="var(--gold)"
                monthlySuffix="/mo"
                features={[
                  'Inbound Call Manager',
                  'Lead Qualification Engine',
                  'CRM Aggregator (3 integrations)',
                  'Call Analytics Dashboard',
                  '48-hour deployment',
                ]}
                cta="Deploy Starter →"
                ctaColor="var(--gold)"
                ctaBorder="var(--gold)"
                ctaHoverBg="var(--gold-muted)"
                borderColor="var(--border)"
                onCta={onApply}
              />

              <PricingCard
                tier="General AIMS — Growth"
                badge="MOST POPULAR"
                badgeColor="var(--gold)"
                armLabel="AIMS ARMS"
                armValue="Arms 01 – 03"
                monthlyValue="$2,400"
                monthlyColor="var(--gold)"
                monthlySuffix="/mo"
                features={[
                  'Everything in Starter',
                  'Revenue Leak Detector',
                  'Client Closer module',
                  'Multi-location support',
                  'CRM integrations (unlimited)',
                  'Priority support SLA (<4hr)',
                  'Direct Founder access',
                ]}
                note="Growth includes the full SDR replacement stack. Replaces $5,200/mo in human overhead."
                cta="Apply for Growth →"
                ctaColor="var(--obsidian)"
                ctaBorder="var(--gold)"
                ctaBg="var(--gold)"
                ctaHoverBg="rgba(212,175,55,0.88)"
                borderColor="var(--gold)"
                highlight
                onCta={onApply}
              />

              <PricingCard
                tier="General AIMS — Scale"
                armLabel="AIMS ARMS"
                armValue="Full Platform"
                monthlyValue="$5,800"
                monthlyColor="var(--gold)"
                monthlySuffix="/mo"
                features={[
                  'Everything in Growth',
                  'White-Glove Integration Engineer',
                  'Custom logic per client workflow',
                  'Dedicated deployment sprint',
                  'SLA: 99.9% uptime guarantee',
                  'Quarterly strategy sessions',
                  'Direct Founder on every call',
                ]}
                note="Scale is built for firms where one missed deal costs more than the platform. Full ARX team embedded in your operations."
                cta="Apply for Scale →"
                ctaColor="var(--gold)"
                ctaBorder="var(--gold)"
                ctaHoverBg="var(--gold-muted)"
                borderColor="var(--border)"
                onCta={onApply}
              />
            </motion.div>
          ) : (
            <motion.div
              key="medical"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Medical pilot — full-width block */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
                style={{
                  background: 'rgba(74,158,255,0.04)',
                  border: '1px solid var(--border-medical)',
                  borderRadius: 'var(--radius-card)',
                  padding: '56px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '64px',
                  alignItems: 'center',
                }}
              >
                {/* Left */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
                    AIMS Medical — Pilot Program
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.1, marginBottom: '8px' }}>
                    $0
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--medical)', marginBottom: '32px' }}>
                    upfront · First 30 days free
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                    {[
                      'All 6 AIMS Medical modules',
                      'Insurance Defense Engine',
                      'Live Session Scribe',
                      'FHIR R4 Integration',
                      'Claims Audit Engine',
                      'Prescription Guard (state machine)',
                      'Front Desk Triage',
                      '40% lifetime discount on AIMS v2.0',
                    ].map((f) => (
                      <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--medical)', flexShrink: 0 }}>→</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
                      Cespedes Cardiology, MD, PA — Miami, FL — Active Pilot
                    </span>
                  </div>
                  <motion.button
                    onClick={onApply}
                    whileHover={{ background: 'var(--medical-muted)' }}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em',
                      color: 'var(--medical)', background: 'transparent', border: '1px solid var(--medical)',
                      borderRadius: 'var(--radius-badge)', padding: '13px 32px', cursor: 'pointer',
                    }}
                  >
                    Secure Pilot Slot →
                  </motion.button>
                </div>

                {/* Right */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Q3 2026 Intake
                  </div>
                  {[
                    { label: 'Pilot Duration', value: '30 days free' },
                    { label: 'Deployment Time', value: '< 2 weeks' },
                    { label: 'Post-Pilot Pricing', value: 'TBD — custom' },
                    { label: 'Lifetime v2.0 Discount', value: '40%' },
                    { label: 'Integration Support', value: 'Direct Founder' },
                    { label: 'Compliance', value: 'HIPAA-ready' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>{item.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--medical)' }}>{item.value}</span>
                    </div>
                  ))}
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted-2)', lineHeight: 1.7, marginTop: '8px', fontStyle: 'italic' }}>
                    Post-pilot pricing is negotiated after the 30-day deployment. Early pilot partners receive a 40% lifetime discount on AIMS Medical v2.0.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
          #pricing .business-grid {
            grid-template-columns: 1fr !important;
          }
          #pricing .medical-block {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
