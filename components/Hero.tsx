'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface HeroProps {
  onApply: () => void;
}

const CX = 300;
const CY = 250;

const ARMS = [
  { id: 'voice',     label: 'VOICE',     x: 120, y: 120, type: 'gold',    range: [0.15, 0.35] as [number,number] },
  { id: 'revenue',   label: 'REVENUE',   x: 480, y: 120, type: 'gold',    range: [0.20, 0.40] as [number,number] },
  { id: 'calls',     label: 'CALLS',     x:  80, y: 280, type: 'gold',    range: [0.25, 0.45] as [number,number] },
  { id: 'clinical',  label: 'CLINICAL',  x: 520, y: 280, type: 'medical', range: [0.30, 0.50] as [number,number] },
  { id: 'insurance', label: 'INSURANCE', x: 160, y: 420, type: 'medical', range: [0.35, 0.55] as [number,number] },
  { id: 'scribe',    label: 'SCRIBE',    x: 440, y: 420, type: 'medical', range: [0.40, 0.60] as [number,number] },
];

function ArmIcon({ id }: { id: string }) {
  switch (id) {
    case 'voice':
      return <path d="M0,-7 Q5,-7 5,-2 L5,2 Q5,7 0,7 Q-5,7 -5,2 L-5,-2 Q-5,-7 0,-7 Z M0,7 L0,11 M-5,11 L5,11" stroke="currentColor" strokeWidth="1.5" fill="none" />;
    case 'revenue':
      return <><rect x="-6" y="-6" width="4" height="12" rx="1" fill="currentColor" opacity="0.7" /><rect x="-1" y="-10" width="4" height="16" rx="1" fill="currentColor" /><rect x="4" y="-3" width="4" height="9" rx="1" fill="currentColor" opacity="0.7" /></>;
    case 'calls':
      return <path d="M-6,-6 Q-6,-8 -4,-8 L-1,-8 Q1,-8 1,-6 L1,-4 Q1,-3 -1,-2 L1,2 Q2,0 3,0 L5,0 Q7,0 7,2 L7,5 Q7,7 5,7 Q-8,7 -8,-6 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />;
    case 'clinical':
      return <><rect x="-2" y="-7" width="4" height="14" rx="1" fill="currentColor" /><rect x="-7" y="-2" width="14" height="4" rx="1" fill="currentColor" /></>;
    case 'insurance':
      return <path d="M0,-9 L8,-5 L8,1 Q8,8 0,11 Q-8,8 -8,1 L-8,-5 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />;
    case 'scribe':
      return <><path d="M-3,7 L-7,7 L-7,3 L5,-9 L9,-5 Z" stroke="currentColor" strokeWidth="1.2" fill="none" /><line x1="3" y1="-7" x2="7" y2="-3" stroke="currentColor" strokeWidth="1.2" /></>;
    default:
      return <circle r="4" fill="currentColor" />;
  }
}

function StaticHero({ onApply }: HeroProps) {
  const color = (type: string) => type === 'gold' ? 'var(--gold)' : 'var(--medical)';
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 40px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(250,250,250,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '700px', marginBottom: '48px' }}>
        <HeroText onApply={onApply} />
      </div>
      <svg viewBox="0 0 600 500" style={{ width: '100%', maxWidth: '560px' }}>
        {ARMS.map((arm) => (
          <g key={arm.id}>
            <line x1={CX} y1={CY} x2={arm.x} y2={arm.y} stroke={color(arm.type)} strokeWidth={1.5} strokeDasharray={arm.type === 'medical' ? '6 4' : undefined} opacity={0.7} />
            <circle cx={arm.x} cy={arm.y} r={20} fill="var(--surface)" stroke={color(arm.type)} strokeWidth={1.5} />
            <g transform={`translate(${arm.x},${arm.y})`} color={color(arm.type)}><ArmIcon id={arm.id} /></g>
            <text x={arm.x} y={arm.y + 34} textAnchor="middle" fill={color(arm.type)} fontSize="8" fontFamily="monospace" letterSpacing="1">{arm.label}</text>
          </g>
        ))}
        <circle cx={CX} cy={CY} r={36} fill="var(--surface)" stroke="var(--gold)" strokeWidth={1.5} />
        <text x={CX} y={CY - 4} textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="monospace" letterSpacing="1">AIMS</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="monospace" letterSpacing="1">CORE</text>
      </svg>
    </div>
  );
}

function HeroText({ onApply }: HeroProps) {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.2 }}
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}
      >
        ONE BRAIN.
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.35 }}
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 700, color: 'var(--gold)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '32px' }}
      >
        MULTIPLE ARMS.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.5 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 36px' }}
      >
        A single deterministic AI core with modular execution arms. Deployed for any professional service business — or precision-tuned for clinical medicine. AIMS Alpha 1.0.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.65 }}
        style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <motion.button
          onClick={onApply}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', background: 'transparent', border: '1px solid var(--gold)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          Deploy General AIMS
        </motion.button>
        <motion.button
          onClick={onApply}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--white)', background: 'transparent', border: '1px solid var(--white)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          Apply for Medical Pilot
        </motion.button>
      </motion.div>
    </>
  );
}

export default function Hero({ onApply }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Text fades out early
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // Diagram appears
  const diagramOpacity = useTransform(scrollYProgress, [0.10, 0.40], [0, 1]);
  // Core pulse
  const coreScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.06]);
  // Proof bar
  const proofOpacity = useTransform(scrollYProgress, [0.60, 0.75], [0, 1]);

  // Per-arm path lengths
  const armLengths = ARMS.map((arm) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, arm.range, [0, 1])
  );
  const endpointOpacities = armLengths.map((pl) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(pl, [0.8, 1.0], [0, 1])
  );

  if (shouldReduce) {
    return <StaticHero onApply={onApply} />;
  }

  const armColor = (type: string) => type === 'gold' ? 'var(--gold)' : 'var(--medical)';

  return (
    <div ref={sectionRef} style={{ height: '280vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 40px', overflow: 'hidden' }}>

        {/* Grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(250,250,250,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        {/* Text block */}
        <motion.div
          style={{ opacity: textOpacity, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '700px', marginBottom: '48px' }}
        >
          <HeroText onApply={onApply} />
        </motion.div>

        {/* SVG diagram */}
        <motion.div
          style={{ opacity: diagramOpacity, width: '100%', maxWidth: '560px', position: 'relative', zIndex: 1 }}
        >
          <svg viewBox="0 0 600 500" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {/* Arm paths */}
            {ARMS.map((arm, i) => (
              <g key={arm.id}>
                <motion.path
                  d={`M ${CX} ${CY} L ${arm.x} ${arm.y}`}
                  stroke={armColor(arm.type)}
                  strokeWidth={1.5}
                  strokeDasharray={arm.type === 'medical' ? '6 4' : undefined}
                  fill="none"
                  opacity={0.7}
                  style={{ pathLength: armLengths[i] }}
                />
                {/* Endpoint node */}
                <motion.g style={{ opacity: endpointOpacities[i] }}>
                  <circle cx={arm.x} cy={arm.y} r={20} fill="var(--surface)" stroke={armColor(arm.type)} strokeWidth={1.5} />
                  <g transform={`translate(${arm.x},${arm.y})`} color={armColor(arm.type)}>
                    <ArmIcon id={arm.id} />
                  </g>
                  <text
                    x={arm.x}
                    y={arm.y + 34}
                    textAnchor="middle"
                    fill={armColor(arm.type)}
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    {arm.label}
                  </text>
                </motion.g>
              </g>
            ))}

            {/* Core node */}
            <motion.g style={{ scale: coreScale, transformOrigin: `${CX}px ${CY}px` }}>
              <circle cx={CX} cy={CY} r={36} fill="var(--surface)" stroke="var(--gold)" strokeWidth={1.5} />
              <text x={CX} y={CY - 4} textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="monospace" letterSpacing="1">AIMS</text>
              <text x={CX} y={CY + 10} textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="monospace" letterSpacing="1">CORE</text>
            </motion.g>

            {/* Legend */}
            <g transform="translate(20, 470)">
              <circle cx="5" cy="5" r="4" fill="var(--gold)" />
              <text x="14" y="9" fill="var(--muted)" fontSize="9" fontFamily="monospace">General AIMS</text>
            </g>
            <g transform="translate(150, 470)">
              <line x1="0" y1="5" x2="18" y2="5" stroke="var(--medical)" strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="24" y="9" fill="var(--muted)" fontSize="9" fontFamily="monospace">AIMS Medical</text>
            </g>
          </svg>
        </motion.div>

        {/* Proof bar */}
        <motion.div
          style={{ opacity: proofOpacity, position: 'absolute', bottom: '40px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            Active Pilot — Cespedes Cardiology, MD, PA — Miami, FL
          </span>
        </motion.div>
      </div>
    </div>
  );
}
