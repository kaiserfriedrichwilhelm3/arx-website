'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface NavProps {
  page: 'aims' | 'galen';
  onApply: () => void;
}

const ARXMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 88" width="22" height="24" aria-hidden>
    <path d="M40 0 L80 88 L57 88 L40 64 L23 88 L0 88 Z M40 18 L63 72 L17 72 Z" fill="#FAFAFA" fillRule="evenodd" />
  </svg>
);

const AIMS_LINKS = [
  { label: 'AIMS', href: '#what-is-aims' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Early Access', href: '#early-access' },
];

const GALEN_LINKS = [
  { label: 'Overview', href: '#top' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Security', href: '#security' },
  { label: 'Access', href: '#access' },
];

export default function Nav({ page, onApply }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  const links = page === 'galen' ? GALEN_LINKS : AIMS_LINKS;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const primaryCTALabel = page === 'galen' ? 'Inquire About Galen' : 'Apply for Early Access';
  const primaryCTAColor = page === 'galen' ? 'var(--galen)' : 'var(--gold)';
  const primaryCTABorder = page === 'galen' ? 'var(--border-galen)' : 'var(--border-gold)';
  const primaryCTAHoverBg = page === 'galen' ? 'var(--galen-muted)' : 'var(--gold-muted)';

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '64px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 32px',
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Left — back link + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← ARX
          </Link>

          <Link href={page === 'aims' ? '/aims' : '/galen'} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <ARXMark />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--white)', lineHeight: 1 }}>ARX</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.2em', lineHeight: 1 }}>SYSTEMS</div>
            </div>
          </Link>

          <div className="nav-status" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px 12px' }}>
            <span className="status-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)', display: 'block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
              AIMS Alpha 1.0 — In Development
            </span>
          </div>
        </div>

        {/* Center links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {links.map((link) =>
            link.href.startsWith('/') ? (
              <Link key={link.href} href={link.href}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Right CTAs */}
        <div className="nav-ctas" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {page === 'galen' ? (
            <Link href="/aims"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '6px 12px', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
              ← AIMS
            </Link>
          ) : (
            <Link href="/galen"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--galen)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '6px 12px', textDecoration: 'none', letterSpacing: '0.06em', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--galen-muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
              Galen →
            </Link>
          )}

          <motion.button
            onClick={onApply}
            whileHover={shouldReduce ? {} : { background: primaryCTAHoverBg }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.06em', color: primaryCTAColor, background: 'transparent', border: `1px solid ${primaryCTABorder}`, borderRadius: 'var(--radius-badge)', padding: '6px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {primaryCTALabel}
          </motion.button>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none', flexDirection: 'column', gap: '5px' }}
            aria-label="Toggle menu">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block', width: '20px', height: '1.5px', background: 'var(--white)',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen && i === 0 ? 'translateY(6.5px) rotate(45deg)' : menuOpen && i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'var(--obsidian)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <button onClick={() => setMenuOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '18px' }}>
              ✕
            </button>
            <motion.div initial={{ opacity: 0, y: shouldReduce ? 0 : -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0, type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}>
              <Link href="/" onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', padding: '8px 0', display: 'block' }}>
                ← ARX Systems
              </Link>
            </motion.div>
            {links.map((link, i) => (
              link.href.startsWith('/') ? (
                <motion.div key={link.href}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.06, type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--white)', textDecoration: 'none', padding: '12px 0', display: 'block' }}>
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.06, type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--white)', textDecoration: 'none', padding: '12px 0' }}>
                  {link.label}
                </motion.a>
              )
            ))}
            <motion.button onClick={() => { setMenuOpen(false); onApply(); }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: links.length * 0.06 + 0.1 }}
              style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: primaryCTAColor, background: 'transparent', border: `1px solid ${primaryCTABorder}`, borderRadius: 'var(--radius-badge)', padding: '12px 32px', cursor: 'pointer' }}>
              {primaryCTALabel} →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links  { display: none !important; }
          .nav-status { display: none !important; }
          .nav-ctas > a, .nav-ctas > button:not(.hamburger) { display: none !important; }
          .hamburger  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
