import Link from 'next/link';
import { motion } from 'motion/react';

interface FooterProps {
  onApply: () => void;
}

const ARXMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 88" width="22" height="24" aria-hidden>
    <path d="M40 0 L80 88 L57 88 L40 64 L23 88 L0 88 Z M40 18 L63 72 L17 72 Z" fill="#FAFAFA" fillRule="evenodd" />
  </svg>
);

export default function Footer({ onApply }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--obsidian)', borderTop: '1px solid var(--border-gold)', padding: '56px 32px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <ARXMark />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--white)', lineHeight: 1 }}>ARX</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.2em', lineHeight: 1 }}>SYSTEMS</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6 }}>
              One Brain. Multiple Arms.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted-2)', marginTop: '4px' }}>
              AIMS Alpha 1.0 · ARX Systems · In Development
            </p>
          </div>

          {/* Col 2 — Platform */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Platform
            </div>
            <Link href="/aims"
              style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '8px', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
              AIMS
            </Link>
            <Link href="/galen"
              style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--galen)', textDecoration: 'none', marginBottom: '8px', transition: 'opacity 0.2s' }}>
              Galen — Clinical
            </Link>
            <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted-2)', marginBottom: '8px', cursor: 'default' }}>
              Atlas <em style={{ fontSize: '9px' }}>soon</em>
            </span>
            <a href="/aims#early-access"
              style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '8px', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
              Early Access
            </a>
          </div>

          {/* Col 3 — Company */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Company
            </div>
            {['LinkedIn', 'Privacy Policy', 'Terms'].map((label) => (
              <a key={label} href="#"
                style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '8px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
                {label}
              </a>
            ))}
          </div>

          {/* Col 4 — Status */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Status
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="status-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)', flexShrink: 0, display: 'block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>Alpha 1.0 — In Development</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '12px' }}>Miami, FL</p>
            <button onClick={onApply}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', textDecoration: 'none', transition: 'text-decoration 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
              Apply for Early Access →
            </button>
          </div>
        </motion.div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
            © {year} ARX Systems. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
            AIMS Alpha 1.0 · Built in Miami, FL
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
