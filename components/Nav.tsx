'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface NavProps {
  onApply: () => void;
}

const ARXMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 88" width="22" height="24" aria-hidden>
    <path d="M40 0 L80 88 L57 88 L40 64 L23 88 L0 88 Z M40 18 L63 72 L17 72 Z" fill="#FAFAFA" fillRule="evenodd" />
  </svg>
);

const HOME_LINKS = [
  { label: 'General', href: '#general' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Changelog', href: '#changelog' },
];

const MEDICAL_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Modules', href: '#modules' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Pilot Offer', href: '#pilot' },
];

export default function Nav({ onApply }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const router = useRouter();
  const isMedical = router.pathname === '/medical';
  const links = isMedical ? MEDICAL_LINKS : HOME_LINKS;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <ARXMark />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--white)', lineHeight: 1 }}>ARX</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.2em', lineHeight: 1 }}>SYSTEMS</div>
            </div>
          </Link>

          {/* Status pill — desktop only */}
          <div className="status-pill" style={{ display: 'flex', alignItems: 'center', gap: '7px', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px 12px' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--success)', display: 'block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
              AIMS Alpha 1.0.4 — STABLE
            </span>
          </div>
        </div>

        {/* Center links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {links.map((link) => (
            <a key={link.href} href={link.href}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="nav-ctas" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/medical"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--medical)', border: '1px solid var(--border-medical)', borderRadius: 'var(--radius-badge)', padding: '6px 12px', textDecoration: 'none', letterSpacing: '0.06em', transition: 'background 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--medical-muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
            AIMS Medical →
          </Link>
          <motion.button
            onClick={onApply}
            whileHover={shouldReduce ? {} : { scale: 1.02, background: 'var(--gold-muted)' }}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.06em', color: 'var(--gold)', background: 'transparent', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-badge)', padding: '6px 12px', cursor: 'pointer' }}>
            Apply for Integration
          </motion.button>

          {/* Hamburger */}
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'var(--obsidian)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {links.map((link, i) => (
              <motion.a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: shouldReduce ? 0 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
                style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--white)', textDecoration: 'none', padding: '12px 0' }}>
                {link.label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: links.length * 0.06 + 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '24px' }}>
              <Link href="/medical" onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--medical)', border: '1px solid var(--border-medical)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', textDecoration: 'none' }}>
                AIMS Medical →
              </Link>
              <button onClick={() => { setMenuOpen(false); onApply(); }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', background: 'transparent', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-badge)', padding: '12px 24px', cursor: 'pointer' }}>
                Apply for Integration
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .status-pill { display: none !important; }
          .nav-ctas > a, .nav-ctas > button:not(.hamburger) { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
