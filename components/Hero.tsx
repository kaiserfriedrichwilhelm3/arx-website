'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import ArmNode from './ArmNode';

const ARMS = ['Voice', 'Revenue', 'Calls', 'Clinical', 'Insurance', 'Scribe'];

interface HeroProps {
  onApply: () => void;
}

export default function Hero({ onApply }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // SVG arm path extension: 0 → 1 over scroll progress 0.1 → 0.7
  const pathLength = useTransform(scrollYProgress, [0.05, 0.65], [0, 1]);
  // Arm nodes fade in after paths extend
  const armOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  // Core node pulse scale
  const coreScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);

  // Layout: 6 arms radiating from center
  // We place them in a hexagonal pattern
  const armPositions = [
    { cx: 50, cy: 12 },   // top
    { cx: 82, cy: 30 },   // top-right
    { cx: 82, cy: 68 },   // bottom-right
    { cx: 50, cy: 86 },   // bottom
    { cx: 18, cy: 68 },   // bottom-left
    { cx: 18, cy: 30 },   // top-left
  ];

  return (
    <div
      ref={containerRef}
      style={{
        height: shouldReduceMotion ? '100vh' : '250vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 32px 40px',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(250,250,250,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(250,250,250,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />

        {/* Main content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '720px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'inline-block',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              AIMS — ALPHA 1.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            One Agent.
            <br />
            <span style={{ color: 'var(--gold)' }}>Multiple Arms.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: '0 auto 40px',
            }}
          >
            AIMS is a unified agentic infrastructure layer — one core intelligence deploying specialized execution arms across revenue recovery, clinical workflow, and operational intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={onApply}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--obsidian)',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: 'var(--radius-badge)',
                padding: '12px 24px',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              APPLY FOR INTEGRATION
            </button>
            <a
              href="#platform"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--white)',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-badge)',
                padding: '12px 24px',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              SEE PLATFORM
            </a>
          </motion.div>
        </div>

        {/* SVG Arm Diagram */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            marginTop: '48px',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          >
            {/* Arm lines from center (50,50) to each position */}
            {armPositions.map((pos, i) => (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2={pos.cx}
                y2={pos.cy}
                stroke="var(--gold)"
                strokeWidth="0.5"
                strokeOpacity="0.5"
                style={shouldReduceMotion ? { opacity: 1 } : { pathLength }}
                strokeDasharray="1"
                strokeDashoffset="0"
              />
            ))}

            {/* Core node */}
            <motion.g style={shouldReduceMotion ? { transformOrigin: '50px 50px' } : { scale: coreScale, transformOrigin: '50px 50px' }}>
              <circle cx="50" cy="50" r="8" fill="var(--surface)" stroke="var(--gold)" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="3" fill="var(--gold)" />
              <text
                x="50"
                y="63"
                textAnchor="middle"
                fill="var(--muted)"
                fontSize="3.5"
                fontFamily="monospace"
              >
                AIMS CORE
              </text>
            </motion.g>

            {/* Endpoint dots */}
            {armPositions.map((pos, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={pos.cx}
                cy={pos.cy}
                r="2"
                fill="var(--gold)"
                style={shouldReduceMotion ? { opacity: 1 } : { opacity: armOpacity }}
              />
            ))}
          </svg>

          {/* Arm node labels positioned around the SVG */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr',
              pointerEvents: 'none',
              ...(shouldReduceMotion ? { opacity: 1 } : { opacity: armOpacity }),
            }}
          >
            {ARMS.map((arm, i) => {
              const gridPositions = [
                { gridColumn: '2', gridRow: '1', alignSelf: 'start', justifySelf: 'center' },
                { gridColumn: '3', gridRow: '1', alignSelf: 'start', justifySelf: 'end' },
                { gridColumn: '3', gridRow: '3', alignSelf: 'end', justifySelf: 'end' },
                { gridColumn: '2', gridRow: '3', alignSelf: 'end', justifySelf: 'center' },
                { gridColumn: '1', gridRow: '3', alignSelf: 'end', justifySelf: 'start' },
                { gridColumn: '1', gridRow: '1', alignSelf: 'start', justifySelf: 'start' },
              ];
              return (
                <div key={arm} style={gridPositions[i]}>
                  <ArmNode label={arm} index={i} active={true} accent="gold" />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
