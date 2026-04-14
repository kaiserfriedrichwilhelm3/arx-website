import { motion } from 'motion/react';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };
const vp = { once: true, margin: '-40px' as const };

const BrainIcon = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden>
    <polygon points="20,4 35,12 35,28 20,36 5,28 5,12" stroke="var(--gold)" strokeWidth="1.5" />
    <line x1="20" y1="4" x2="20" y2="36" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
    <line x1="5" y1="12" x2="35" y2="28" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
    <line x1="35" y1="12" x2="5" y2="28" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
    <circle cx="20" cy="20" r="3" fill="var(--gold)" />
  </svg>
);

const ArmsIcon = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden>
    <circle cx="20" cy="20" r="4" stroke="var(--gold)" strokeWidth="1.5" />
    {[[20,4],[36,20],[20,36],[4,20],[8,8],[32,8]].map(([x,y],i) => (
      <line key={i} x1="20" y1="20" x2={x} y2={y} stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    ))}
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden>
    {[0,1,2].map((row) => [0,1,2].map((col) => (
      <rect key={`${row}-${col}`} x={4 + col * 12} y={4 + row * 12} width="10" height="10" rx="1.5" stroke="var(--gold)" strokeWidth="1.5" />
    )))}
  </svg>
);

const COLS = [
  {
    Icon: BrainIcon,
    title: 'The Brain',
    body: 'The universal integration and decision layer. The Brain connects to every platform your business uses and applies the logic you define. It does not guess — it executes rules precisely.',
  },
  {
    Icon: ArmsIcon,
    title: 'The Arms',
    body: 'Purpose-built modules that plug into the Brain via a standardized adapter. Voice. Revenue. Leads. Analytics. Each Arm is independent — adopt only what your business needs today, and expand when ready. No rebuilds required.',
  },
  {
    Icon: GridIcon,
    title: 'The Interface',
    body: 'One command center that surfaces everything the Brain and Arms produce. Every call, lead, metric, and action — across every platform you use — in a single auditable view.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
          style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            The Brain + Arms Model
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // one universal core. modular execution.
          </p>
        </motion.div>

        <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
          {COLS.map(({ Icon, title, body }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ ...spring, delay: i * 0.1 }}
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px' }}>
              <Icon />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--white)', marginTop: '16px', marginBottom: '12px' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8 }}>{body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ ...spring, delay: 0.2 }}
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-card)', padding: '20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8 }}>
            AIMS is built on a deterministic integration architecture. Client-specific logic lives in configuration files — not in the core system.
            Adding a new Arm or switching a module requires no changes to the Brain. This is the composable architecture the 2026 market demands.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
