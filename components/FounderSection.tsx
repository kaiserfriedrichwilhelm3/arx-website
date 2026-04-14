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
  { text: '$ aims status',                              color: 'muted' },
  { text: 'AIMS Alpha 1.0 — In Development',           color: 'gold' },
  { text: 'Build progress: nominal',                   color: 'muted' },
  { text: '',                                          color: 'muted' },
  { text: '$ aims config --show',                      color: 'muted' },
  { text: 'Brain: architecture complete',              color: 'galen' },
  { text: 'Arms: modules in development',              color: 'galen' },
  { text: 'Interface: UI layer in progress',           color: 'galen' },
  { text: '→ Early access cohort: open',               color: 'gold' },
  { text: '',                                          color: 'muted' },
  { text: '$ aims founder --contact',                  color: 'muted' },
  { text: 'ARX Systems — Miami, FL',                   color: 'galen' },
  { text: '→ Founders work directly with you.',        color: 'gold' },
  { text: '█',                                         color: 'muted', cursor: true },
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
    <section
      id="standard"
      style={{ padding: '96px 32px', background: 'var(--obsidian)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '64px', alignItems: 'center' }}>

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
            Built by Founders.
            <br />Launched with Founders.
            <br />No Intermediaries.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {[
              'AIMS is being built by a founder-led team at ARX Systems. Every early access partner works directly with the engineers building the platform — no account managers, no support tickets, no escalation chains.',
              'Early access partners shape the product roadmap. Your workflows, your edge cases, your integration requirements inform what gets built next. This is the advantage of joining before launch.',
              'ARX Systems operates out of Miami, FL. We are selective about who we bring in during Alpha. If AIMS fits your business, we want to hear from you directly.',
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
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.06em',
              color: 'var(--gold)',
              background: 'transparent',
              border: '1px solid var(--gold)',
              borderRadius: 'var(--radius-badge)',
              padding: '11px 22px',
              cursor: 'pointer',
            }}
          >
            Join the Alpha →
          </motion.button>
        </motion.div>

        {/* Right: terminal */}
        <div ref={termRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.15 }}
            style={{
              background: '#0D0D0D',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
            }}
          >
            {/* Terminal header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                <span key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, display: 'block' }} />
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginLeft: '8px' }}>
                aims-core — bash
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '320px' }}>
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: LINE_COLOR[line.color],
                    lineHeight: 1.6,
                    animation: line.cursor ? 'blink 1s ease-in-out infinite' : undefined,
                    minHeight: line.text === '' ? '10px' : undefined,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #standard > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
