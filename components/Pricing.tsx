'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PricingProps {
  onApply: () => void;
}

type Sector = 'business' | 'galen';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };
const vp = { once: true, margin: '-40px' as const };

export default function Pricing({ onApply }: PricingProps) {
  const [sector, setSector] = useState<Sector>('business');
  const shouldReduce = useReducedMotion();

  const pillBase: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em',
    padding: '8px 20px', cursor: 'pointer', borderRadius: '999px', transition: 'all 0.2s',
    border: '1px solid',
  };

  return (
    <section id="early-access" style={{ padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
          style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Early Access
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', marginBottom: '32px' }}>
            // founding-tier pricing — locked before launch
          </p>

          <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px' }}>
            <button onClick={() => setSector('business')} style={{
              ...pillBase,
              background: sector === 'business' ? 'var(--gold)' : 'transparent',
              color: sector === 'business' ? 'var(--obsidian)' : 'var(--muted)',
              borderColor: sector === 'business' ? 'var(--gold)' : 'transparent',
              fontWeight: sector === 'business' ? 500 : 400,
            }}>
              AIMS BUSINESS
            </button>
            <button onClick={() => setSector('galen')} style={{
              ...pillBase,
              background: sector === 'galen' ? 'var(--galen)' : 'transparent',
              color: sector === 'galen' ? 'var(--obsidian)' : 'var(--muted)',
              borderColor: sector === 'galen' ? 'var(--galen)' : 'transparent',
              fontWeight: sector === 'galen' ? 500 : 400,
            }}>
              GALEN CLINICAL
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {sector === 'business' ? (
            <motion.div
              key="business"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '32px' }}>
                Founding-tier pricing is reserved now and locked before launch. No charge until AIMS goes live.
              </p>

              <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>

                {/* Arm 01 Access */}
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                      Founding Tier · Arm 01
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--white)', marginBottom: '20px' }}>Arm 01 Access</h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Founding Price</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 500, color: 'var(--white)', lineHeight: 1 }}>$499</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)' }}>/mo at launch</span>
                    </div>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border)' }} />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Voice Management (Arm 01)', 'Inbound call handling + triage', 'Lead routing and CRM write-back', 'Call transcripts and analytics'].map((f) => (
                      <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>{f}
                      </li>
                    ))}
                  </ul>
                  <motion.button onClick={onApply} whileHover={shouldReduce ? {} : { background: 'var(--gold-muted)' }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', background: 'transparent', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-badge)', padding: '13px', cursor: 'pointer', textAlign: 'center', marginTop: 'auto' }}>
                    Reserve Arm 01 →
                  </motion.button>
                </motion.div>

                {/* Growth Access — featured */}
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ ...spring, delay: 0.08 }}
                  style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid var(--gold)', borderRadius: 'var(--radius-card)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gold)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-badge)', padding: '3px 10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    MOST REQUESTED
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                      Founding Tier · Arms 01–03
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--white)', marginBottom: '20px' }}>Growth Access</h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Founding Price</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 500, color: 'var(--white)', lineHeight: 1 }}>$2,400</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)' }}>/mo at launch</span>
                    </div>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border)' }} />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Everything in Arm 01 Access', 'Revenue Intelligence (Arm 02)', 'Lead Qualification Engine (Arm 03)', 'Outbound + follow-up sequences', 'Priority onboarding'].map((f) => (
                      <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>{f}
                      </li>
                    ))}
                  </ul>
                  <motion.button onClick={onApply} whileHover={shouldReduce ? {} : { opacity: 0.88 }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, color: 'var(--obsidian)', background: 'var(--gold)', border: '1px solid var(--gold)', borderRadius: 'var(--radius-badge)', padding: '13px', cursor: 'pointer', textAlign: 'center', marginTop: 'auto' }}>
                    Reserve Growth Access →
                  </motion.button>
                </motion.div>

                {/* Full Platform */}
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ ...spring, delay: 0.16 }}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                      Founding Tier · Full Platform
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--white)', marginBottom: '20px' }}>Full Platform</h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Founding Price</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 500, color: 'var(--white)', lineHeight: 1 }}>$5,800</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)' }}>/mo at launch</span>
                    </div>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border)' }} />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['All six AIMS Arms', 'Full integration engineering', 'Custom arm configuration', 'Dedicated integration support', 'Unlimited platform connections'].map((f) => (
                      <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>{f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '12px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7 }}>
                      Full Platform includes dedicated integration engineering time from the ARX team — scoped per project, not a personal support line. Designed for businesses requiring custom arm development.
                    </p>
                  </div>
                  <motion.button onClick={onApply}
                    whileHover={shouldReduce ? {} : { borderColor: 'var(--gold)', color: 'var(--gold)' }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--white)', background: 'transparent', border: '1px solid var(--white)', borderRadius: 'var(--radius-badge)', padding: '13px', cursor: 'pointer', textAlign: 'center', marginTop: 'auto', transition: 'border-color 0.2s, color 0.2s' }}>
                    Reserve Full Platform →
                  </motion.button>
                </motion.div>
              </div>

              <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '32px' }}>
                All tiers include: Deterministic logic architecture · Modular Arm expansion · Founding-tier price lock
              </p>
            </motion.div>

          ) : (
            /* Galen view */
            <motion.div
              key="galen"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{ maxWidth: '680px', margin: '0 auto' }}
            >
              <div style={{ background: 'var(--surface)', border: '1px solid var(--galen)', borderRadius: 'var(--radius-card)', padding: '48px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--galen)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '3px 10px', letterSpacing: '0.1em' }}>GALEN</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '3px 10px', letterSpacing: '0.1em' }}>CLINICAL EDITION</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: 'var(--white)', marginBottom: '12px' }}>Galen Clinical Access</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '480px' }}>
                  Early clinical partners who join before launch receive priority integration support and founding-tier pricing locked permanently. Built for private practices that need precision, not promises.
                </p>

                <div style={{ textAlign: 'center', margin: '32px 0' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '72px', fontWeight: 700, color: 'var(--galen)', lineHeight: 1 }}>$0</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>upfront to reserve</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Founding-tier pricing locked at launch.</div>
                </div>

                <div className="galen-feat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '28px' }}>
                  {['Ambient Clinical Scribing', 'Insurance Denial Management', 'Prior Authorization Automation', 'Prescription Fulfillment Logic', 'EHR Integration Layer', 'Patient Triage + Scheduling'].map((f) => (
                    <div key={f} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--galen)', flexShrink: 0 }}>→</span>{f}
                    </div>
                  ))}
                </div>

                <div style={{ background: 'var(--galen-muted)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '16px', marginBottom: '24px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--galen)', lineHeight: 1.7 }}>
                    Clinical partners who reserve before launch receive first integration priority when Galen enters deployment.
                  </p>
                </div>

                <motion.button onClick={onApply} whileHover={shouldReduce ? {} : { opacity: 0.88 }}
                  style={{ width: '100%', background: 'var(--galen)', color: 'var(--obsidian)', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, border: 'none', borderRadius: 'var(--radius-badge)', padding: '16px', cursor: 'pointer' }}>
                  Inquire About Galen →
                </motion.button>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Link href="/galen"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--galen)', textDecoration: 'none' }}>
                    Or explore the full Galen system →
                  </Link>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '8px' }}>
                  Galen is in development. Not yet available for deployment.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .galen-feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
