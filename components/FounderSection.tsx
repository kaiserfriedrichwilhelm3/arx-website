'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface FounderSectionProps {
  onApply: () => void;
}

interface TerminalLine {
  text: string;
  color: 'muted' | 'galen' | 'gold';
  cursor?: boolean;
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: '$ aims status',                          color: 'muted' },
  { text: 'AIMS Alpha 1.0 — In Development',        color: 'gold' },
  { text: 'Build: nominal',                         color: 'muted' },
  { text: '',                                       color: 'muted' },
  { text: '$ aims arms --list',                     color: 'muted' },
  { text: 'Arm 01: Voice Management',               color: 'gold' },
  { text: 'Arm 02: Revenue Intelligence',           color: 'gold' },
  { text: 'Arm 03: Lead Qualification',             color: 'gold' },
  { text: '+ 3 more in architecture',              color: 'muted' },
  { text: '',                                       color: 'muted' },
  { text: '$ aims founder --contact',               color: 'muted' },
  { text: 'ARX Systems — Miami, FL',                color: 'galen' },
  { text: '→ Early access applications open.',      color: 'gold' },
  { text: '█',                                      color: 'muted', cursor: true },
];

const LINE_COLOR = {
  muted: 'var(--muted)',
  galen: 'var(--galen)',
  gold: 'var(--gold)',
} as const;

export default function FounderSection({ onApply }: FounderSectionProps) {
  const termRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(termRef, { once: true, margin: '-80px' });
  const [visibleLines, setVisibleLines] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) { setVisibleLines(TERMINAL_LINES.length); return; }
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleLines(current);
      if (current >= TERMINAL_LINES.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [isInView, shouldReduce]);

  return (
    <section id="arx-standard" style={{ padding: '96px 32px', background: 'var(--obsidian)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '55fr 45fr', gap: '64px', alignItems: 'center' }}>

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '20px' }}>
            The ARX Standard
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.15, marginBottom: '32px' }}>
            Founder-Led.
            <br />Architecturally Precise.
            <br />No Intermediaries.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {[
              'Every ARX integration is built by the team that designed the system. When you work with ARX, you are working directly with the engineers making the decisions — not an account manager reading from a brief.',
              'This is not a pitch about access. It is a statement of how the work gets done. Precision requires context. Context requires directness. ARX is built on that principle.',
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.9 }}>
                {para}
              </p>
            ))}
          </div>

          <motion.button
            onClick={onApply}
            whileHover={{ background: 'var(--gold-muted)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em',
              color: 'var(--gold)', background: 'transparent',
              border: '1px solid var(--gold)', borderRadius: 'var(--radius-badge)',
              padding: '11px 22px', cursor: 'pointer',
            }}
          >
            Apply for Early Access →
          </motion.button>
        </motion.div>

        {/* Right: terminal */}
        <div ref={termRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.15 }}
            style={{ background: '#0D0D0D', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                <span key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, display: 'block' }} />
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginLeft: '8px' }}>aims-core — zsh</span>
            </div>
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '320px' }}>
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px', color: LINE_COLOR[line.color], lineHeight: 1.6,
                  minHeight: line.text === '' ? '10px' : undefined,
                }}>
                  <span className={line.cursor ? 'cursor-blink' : undefined}>{line.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #arx-standard > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
