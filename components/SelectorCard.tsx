'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface Feature {
  label: string;
}

interface SelectorCardProps {
  variant: 'aims' | 'galen';
  category: string;
  name: string;
  tagline: string;
  description: string;
  features: Feature[];
  ctaLabel: string;
  href: string;
}

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

export default function SelectorCard({
  variant, category, name, tagline, description, features, ctaLabel, href,
}: SelectorCardProps) {
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  const accentColor = variant === 'aims' ? 'var(--gold)' : 'var(--galen)';
  const accentBg = variant === 'aims' ? 'var(--gold)' : 'var(--galen)';
  const borderHover = variant === 'aims' ? 'var(--border-gold)' : 'var(--border-galen)';
  const bgHover = variant === 'aims' ? 'rgba(212,175,55,0.04)' : 'rgba(74,158,255,0.04)';

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={shouldReduce ? {} : { scale: 1.02 }}
      transition={spring}
      style={{
        background: hovered ? bgHover : 'var(--surface)',
        border: `1px solid ${hovered ? borderHover : 'var(--border)'}`,
        borderRadius: 'var(--radius-card)',
        padding: '32px',
        width: '340px',
        maxWidth: '100%',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '6px' }}>
        {category}
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--white)', lineHeight: 1.1, marginBottom: '4px' }}>
        {name}
      </h2>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '16px' }}>
        {tagline}
      </p>

      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px', overflow: 'hidden' }}
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px', marginTop: 'auto' }}>
        {features.map((f) => (
          <div key={f.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
            → {f.label}
          </div>
        ))}
      </div>

      <Link
        href={href}
        style={{
          display: 'block',
          background: accentBg,
          color: '#0A0A0A',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 500,
          textAlign: 'center',
          padding: '12px',
          borderRadius: '2px',
          textDecoration: 'none',
          letterSpacing: '0.04em',
        }}
      >
        {ctaLabel}
      </Link>
    </motion.div>
  );
}
