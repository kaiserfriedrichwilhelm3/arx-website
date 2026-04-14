import { motion } from 'motion/react';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };
const vp = { once: true, margin: '-40px' as const };

const PROBLEMS = [
  'Claim denials that consume hours of staff time to appeal — often for preventable errors',
  'Documentation burden that pulls physicians away from patient care for 2–3 hours per day',
  'No unified view of what revenue is at risk, what is recoverable, and what is lost',
  'Front desk triage handled manually, creating bottlenecks and missed patient contacts',
  'Prescription refills and prior auth requests processed through fragmented workflows',
  'Delayed follow-up on outstanding claims with no automated escalation path',
];

const TIME_TABLE = [
  ['Claim denial management', '5–8 hrs/wk', 'Automated triage + appeal drafts', '~75%'],
  ['Clinical documentation', '10–15 hrs/wk', 'Live session transcription + structuring', '~80%'],
  ['Front desk call handling', '20+ hrs/wk', 'AI triage + routing', '~60%'],
  ['Prior auth & Rx refills', '4–6 hrs/wk', 'Automated request management', '~70%'],
  ['Insurance follow-up', '3–5 hrs/wk', 'Scheduled escalation workflows', '~80%'],
];

export default function GalenProblem() {
  return (
    <section id="the-problem" style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
          style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            The Problem in Clinical Practice
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // operational drag that compounds every week it goes unaddressed
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border-galen)', margin: '16px auto 0' }} />
        </motion.div>

        <div className="problem-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>

          {/* Left — problem list */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={spring}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>
              What Galen Is Designed to Address
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {PROBLEMS.map((problem) => (
                <div key={problem} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--galen)', flexShrink: 0, lineHeight: 1.6 }}>—</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>{problem}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '16px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
                Galen is in development. The modules listed here reflect the intended architecture, not a currently deployed system.
              </p>
            </div>
          </motion.div>

          {/* Right — time table */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ ...spring, delay: 0.1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
              Projected Time Reclaimed — Physician Practice
            </div>
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', overflow: 'hidden', marginBottom: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Function', 'Current', 'With Galen', 'Est. Gain'].map((h) => (
                      <th key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '12px 12px 8px', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIME_TABLE.map(([fn, cur, withGalen, gain], i, arr) => (
                    <tr key={fn} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)', padding: '10px 12px' }}>{fn}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', padding: '10px 12px' }}>{cur}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', padding: '10px 12px' }}>{withGalen}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--galen)', padding: '10px 12px' }}>{gain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', fontStyle: 'italic' }}>
              Estimates based on industry benchmarks. Galen is in development. Actual results will vary by practice size, specialty, and implementation.
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
