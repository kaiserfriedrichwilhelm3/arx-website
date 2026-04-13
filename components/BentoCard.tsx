import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BentoCardProps {
  title: string;
  body: string;
  accent?: 'gold' | 'medical';
  icon?: React.ReactNode;
  badge?: string;
  span?: 'single' | 'double';
  index?: number;
}

export default function BentoCard({
  title,
  body,
  accent = 'gold',
  icon,
  badge,
  span = 'single',
  index = 0,
}: BentoCardProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const accentColor = accent === 'gold' ? 'var(--gold)' : 'var(--medical-blue)';
  const accentMuted = accent === 'gold' ? 'var(--gold-muted)' : 'var(--medical-muted)';
  const borderAccent = accent === 'gold' ? 'var(--border-gold)' : 'rgba(74, 158, 255, 0.3)';

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 18,
        mass: 1.2,
        delay: index * 0.07,
      }}
      style={{
        gridColumn: span === 'double' ? 'span 2' : 'span 1',
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderRadius: 'var(--radius-card)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : { borderColor: borderAccent, transition: { duration: 0.2 } }
      }
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '28px',
          right: '28px',
          height: '1px',
          background: accentColor,
          opacity: 0.4,
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        {icon && (
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-badge)',
              background: accentMuted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accentColor,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        {badge && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 500,
              color: accentColor,
              background: accentMuted,
              border: `1px solid ${borderAccent}`,
              borderRadius: 'var(--radius-badge)',
              padding: '3px 8px',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              marginLeft: 'auto',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--white)',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--muted)',
            lineHeight: 1.65,
          }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}
