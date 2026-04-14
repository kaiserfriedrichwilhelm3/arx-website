import { motion } from 'motion/react';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };
const vp = { once: true, margin: '-60px' as const };

export default function WhatIsAIMS() {
  return (
    <section id="what-is-aims" style={{ padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
          style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            What Is AIMS?
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-gold)', margin: '16px auto 0' }} />
        </motion.div>

        <div className="aims-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>

          {/* Left — definition */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={spring}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--white)', marginBottom: '24px', lineHeight: 1.25 }}>
              A Digital Nervous System for Your Business.
            </h3>
            {[
              'AIMS — Artificial Intelligence Management System — is a unified operating layer that connects every tool, data stream, and workflow in your business into a single agentic interface. Not another chatbot. Not a wrapper around an LLM. A deterministic system built to execute.',
              'The 2026 market has moved past AI that answers questions. Businesses now need AI that gets things done — qualifying leads, routing calls, reconciling data, managing follow-up — without waiting for a human to prompt it. AIMS is built for this shift.',
              'AIMS operates through a modular Brain + Arms architecture. The Brain is the integration and reasoning layer. Each Arm is a purpose-built module for a specific business function. Add only what you need. Expand when ready. No rebuilds.',
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '20px' }}>
                {para}
              </p>
            ))}
            <div style={{ borderLeft: '2px solid var(--border-gold)', paddingLeft: '16px', marginTop: '24px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
                AIMS Alpha 1.0 is currently in development. We are accepting early access partners ahead of launch.
              </p>
            </div>
          </motion.div>

          {/* Right — problems */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ ...spring, delay: 0.1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>
              The Problems AIMS Is Built to Solve
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                'Calls going unanswered and revenue leaking through the gaps',
                'Leads decaying in your CRM because no one responded in time',
                'Disconnected tools that require manual data entry to stay in sync',
                'No unified view of what\'s actually happening in your business',
                'Manual overhead that consumes time you should spend on growth',
                'AI tools that add complexity instead of removing it',
              ].map((problem) => (
                <div key={problem} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--gold)', flexShrink: 0, lineHeight: 1.6 }}>—</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>{problem}</span>
                </div>
              ))}
            </div>

            {/* Time savings table */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                Projected Time Reclaimed
              </div>
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Function', 'Current', 'With AIMS', 'Gain'].map((h) => (
                        <th key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '12px 12px 8px', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Lead Qualification', '10–15 hrs/wk', '<1 hr/wk', '~90%'],
                      ['CRM Data Entry', '8 hrs/wk', 'Automated', '~100%'],
                      ['Customer Follow-up', '10 hrs/wk', '2 hrs/wk', '~80%'],
                      ['Financial Tracking', '5 hrs/wk', '30 min/wk', '~90%'],
                    ].map(([fn, cur, with_, gain], i, arr) => (
                      <tr key={fn} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)', padding: '10px 12px' }}>{fn}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', padding: '10px 12px' }}>{cur}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', padding: '10px 12px' }}>{with_}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold)', padding: '10px 12px' }}>{gain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', fontStyle: 'italic', marginTop: '8px' }}>
                Estimates based on industry benchmarks. Actual results vary.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .aims-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
