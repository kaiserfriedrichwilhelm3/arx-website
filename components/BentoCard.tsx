import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BentoCardProps {
  title: string;
  subtitle: string;
  stat?: string;
  statLabel?: string;
  badge?: string;
  badgeVariant?: 'gold' | 'medical' | 'muted';
  accent?: 'gold' | 'medical' | 'none';
  wide?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}

export default function BentoCard({
  title,
  subtitle,
  stat,
  statLabel,
  badge,
  badgeVariant = 'muted',
  accent = 'none',
  wide = false,
  children,
  className,
  style,
  index = 0,
}: BentoCardProps) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();

  const borderColor =
    accent === 'gold' ? 'var(--border-gold)' :
    accent === 'medical' ? 'var(--border-medical)' :
    'var(--border)';

  const statColor =
    accent === 'gold' ? 'var(--gold)' :
    accent === 'medical' ? 'var(--medical)' :
    'var(--white)';

  const badgeColor =
    badgeVariant === 'gold' ? 'var(--gold)' :
    badgeVariant === 'medical' ? 'var(--medical)' :
    'var(--muted)';

  const badgeBorder =
    badgeVariant === 'gold' ? 'var(--border-gold)' :
    badgeVariant === 'medical' ? 'var(--border-medical)' :
    'var(--border)';

  const badgeBg =
    badgeVariant === 'gold' ? 'var(--gold-muted)' :
    badgeVariant === 'medical' ? 'var(--medical-muted)' :
    'transparent';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: index * 0.06 }}
      className={className}
      style={{
        gridColumn: wide ? 'span 2' : 'span 1',
        background: 'var(--surface)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-card)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        ...style,
      }}
    >
      {/* Badge */}
      {badge && (
        <span style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: badgeColor,
          background: badgeBg,
          border: `1px solid ${badgeBorder}`,
          borderRadius: 'var(--radius-badge)',
          padding: '3px 8px',
        }}>
          {badge}
        </span>
      )}

      {/* Stat */}
      {stat && (
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '42px', fontWeight: 500, color: statColor, lineHeight: 1 }}>
            {stat}
          </div>
          {statLabel && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>
              {statLabel}
            </div>
          )}
        </div>
      )}

      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--white)', lineHeight: 1.25 }}>
        {title}
      </h3>

      {/* Subtitle */}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7 }}>
        {subtitle}
      </p>

      {/* Children (decorative content) */}
      {children}
    </motion.div>
  );
}
