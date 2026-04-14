import { motion, useReducedMotion } from 'motion/react';

interface BentoCardProps {
  title: string;
  subtitle: string;
  stat?: string;
  statLabel?: string;
  badge?: string;
  badgeVariant?: 'gold' | 'galen' | 'muted';
  accent?: 'gold' | 'galen' | 'none';
  wide?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}

export default function BentoCard({
  title, subtitle, stat, statLabel, badge, badgeVariant = 'muted',
  accent = 'none', wide = false, children, className, style, index = 0,
}: BentoCardProps) {
  const shouldReduce = useReducedMotion();

  const borderColor =
    accent === 'gold'  ? 'var(--border-gold)'  :
    accent === 'galen' ? 'var(--border-galen)' :
    'var(--border)';

  const statColor =
    accent === 'gold'  ? 'var(--gold)'  :
    accent === 'galen' ? 'var(--galen)' :
    'var(--white)';

  const badgeColor =
    badgeVariant === 'gold'  ? 'var(--gold)'  :
    badgeVariant === 'galen' ? 'var(--galen)' :
    'var(--muted-2)';

  const badgeBorder =
    badgeVariant === 'gold'  ? 'var(--border-gold)'  :
    badgeVariant === 'galen' ? 'var(--border-galen)' :
    'var(--border)';

  const badgeBg =
    badgeVariant === 'gold'  ? 'var(--gold-muted)'  :
    badgeVariant === 'galen' ? 'var(--galen-muted)' :
    'transparent';

  return (
    <motion.div
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
      {badge && (
        <span style={{
          position: 'absolute', top: '16px', right: '16px',
          fontFamily: 'var(--font-mono)', fontSize: '8px',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: badgeColor, background: badgeBg,
          border: `1px solid ${badgeBorder}`,
          borderRadius: 'var(--radius-badge)', padding: '3px 8px',
        }}>
          {badge}
        </span>
      )}

      {stat && (
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '44px', fontWeight: 500, color: statColor, lineHeight: 1 }}>
            {stat}
          </div>
          {statLabel && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>
              {statLabel}
            </div>
          )}
        </div>
      )}

      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--white)', lineHeight: 1.25 }}>
        {title}
      </h3>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.75 }}>
        {subtitle}
      </p>

      {children}
    </motion.div>
  );
}
