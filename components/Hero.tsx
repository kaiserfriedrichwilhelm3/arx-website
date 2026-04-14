'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface HeroProps {
  onApply: () => void;
}

const CX = 300;
const CY = 250;

const ARMS = [
  { id: 'voice',     label: 'VOICE',     x: 115, y: 115, color: 'var(--gold)',  dash: undefined,  range: [0.15, 0.35] as [number, number] },
  { id: 'revenue',   label: 'REVENUE',   x: 485, y: 115, color: 'var(--gold)',  dash: undefined,  range: [0.20, 0.40] as [number, number] },
  { id: 'leads',     label: 'LEADS',     x:  75, y: 280, color: 'var(--gold)',  dash: undefined,  range: [0.25, 0.45] as [number, number] },
  { id: 'scribing',  label: 'SCRIBING',  x: 525, y: 280, color: 'var(--galen)', dash: '6 4',      range: [0.30, 0.50] as [number, number] },
  { id: 'insurance', label: 'INSURANCE', x: 155, y: 425, color: 'var(--galen)', dash: '6 4',      range: [0.35, 0.55] as [number, number] },
  { id: 'triage',    label: 'TRIAGE',    x: 445, y: 425, color: 'var(--galen)', dash: '6 4',      range: [0.40, 0.60] as [number, number] },
];

function StaticHero({ onApply }: HeroProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 40px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(250,250,250,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <HeroText onApply={onApply} />
      <svg viewBox="0 0 600 500" style={{ width: '100%', maxWidth: '560px', marginTop: '48px' }}>
        {ARMS.map((arm) => (
          <g key={arm.id}>
            <line x1={CX} y1={CY} x2={arm.x} y2={arm.y} stroke={arm.color} strokeWidth={1.5} strokeDasharray={arm.dash} opacity={0.7} />
            <circle cx={arm.x} cy={arm.y} r={22} fill="var(--surface)" stroke={arm.color} strokeWidth={1.5} />
            <text x={arm.x} y={arm.y + 36} textAnchor="middle" fill={arm.color} fontSize="9" fontFamily="monospace" letterSpacing="1">{arm.label}</text>
          </g>
        ))}
        <circle cx={CX} cy={CY} r={38} fill="var(--surface)" stroke="var(--gold)" strokeWidth={1.5} className="core-pulse" />
        <text x={CX} y={CY - 4} textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="monospace" letterSpacing="1">AIMS</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="monospace" letterSpacing="1">CORE</text>
      </svg>
    </div>
  );
}

function HeroText({ onApply: _ }: HeroProps) {
  return (
    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '720px' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.2 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}
      >
        Artificial Intelligence Management System · Alpha 1.0
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.35 }}
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
      >
        ONE BRAIN.
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.5 }}
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 700, color: 'var(--gold)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '28px' }}
      >
        MULTIPLE ARMS.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.65 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, maxWidth: '600px', margin: '0 auto 24px' }}
      >
        AIMS is the agentic operating layer for modern business. It connects every tool,
        workflow, and data source in your organization into one deterministic interface —
        moving from manual oversight to autonomous execution. Not a chatbot. A system.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.8 }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)', borderRadius: '999px', padding: '6px 16px', marginBottom: '32px' }}
      >
        <span className="status-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)', display: 'block', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
          Alpha 1.0 — In Development · Early Access Now Open
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.95 }}
        style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <a href="#what-is-aims"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.06em' }}>
          Explore AIMS
        </a>
        <Link href="/galen"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--galen)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.06em' }}>
          Explore Galen →
        </Link>
      </motion.div>
    </div>
  );
}

export default function Hero({ onApply }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const diagramOpacity = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  const statusOpacity = useTransform(scrollYProgress, [0.62, 0.75], [0, 1]);

  const armLengths = ARMS.map((arm) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, arm.range, [0, 1])
  );
  const endpointOpacities = armLengths.map((pl) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(pl, [0.85, 1.0], [0, 1])
  );

  if (shouldReduce) return <StaticHero onApply={onApply} />;

  return (
    <div ref={sectionRef} id="top" style={{ height: '280vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 40px', overflow: 'hidden' }}>

        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(250,250,250,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        <motion.div style={{ opacity: textOpacity, position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <HeroText onApply={onApply} />
        </motion.div>

        <motion.div style={{ opacity: diagramOpacity, width: '100%', maxWidth: '560px', position: 'absolute', zIndex: 1 }}>
          <svg viewBox="0 0 600 500" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {ARMS.map((arm, i) => (
              <g key={arm.id}>
                <motion.line
                  x1={CX} y1={CY} x2={arm.x} y2={arm.y}
                  stroke={arm.color} strokeWidth={1.5} strokeLinecap="round"
                  strokeDasharray={arm.dash}
                  opacity={0.7}
                  style={{ pathLength: armLengths[i] }}
                />
                <motion.g style={{ opacity: endpointOpacities[i] }}>
                  <circle cx={arm.x} cy={arm.y} r={22} fill="var(--surface)" stroke={arm.color} strokeWidth={1.5} />
                  <text x={arm.x} y={arm.y + 36} textAnchor="middle" fill={arm.color} fontSize="9" fontFamily="monospace" letterSpacing="1">{arm.label}</text>
                </motion.g>
              </g>
            ))}

            <circle cx={CX} cy={CY} r={38} fill="var(--surface)" stroke="var(--gold)" strokeWidth={1.5} className="core-pulse" />
            <text x={CX} y={CY - 4} textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="monospace" letterSpacing="1">AIMS</text>
            <text x={CX} y={CY + 10} textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="monospace" letterSpacing="1">CORE</text>

            <g transform="translate(20,475)">
              <line x1="0" y1="5" x2="18" y2="5" stroke="var(--gold)" strokeWidth="1.5" />
              <text x="24" y="9" fill="var(--muted)" fontSize="9" fontFamily="monospace">General AIMS</text>
            </g>
            <g transform="translate(160,475)">
              <line x1="0" y1="5" x2="18" y2="5" stroke="var(--galen)" strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="24" y="9" fill="var(--muted)" fontSize="9" fontFamily="monospace">Galen (Clinical)</text>
            </g>
          </svg>
        </motion.div>

        <motion.div style={{ opacity: statusOpacity, position: 'absolute', bottom: '40px', left: 0, right: 0, textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            AIMS Alpha 1.0 In Development · Early Access Applications Open
          </span>
        </motion.div>
      </div>
    </div>
  );
}
