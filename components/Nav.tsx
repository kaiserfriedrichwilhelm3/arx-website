'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavProps {
  onApply: () => void;
}

export default function Nav({ onApply }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Medical', href: '#medical' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 88" width="24" height="26" aria-label="ARX mark">
            <path
              d="M40 0 L80 88 L57 88 L40 64 L23 88 L0 88 Z M40 18 L63 72 L17 72 Z"
              fill="#FFFFFF"
              fillRule="evenodd"
            />
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: 'var(--white)', letterSpacing: '0.08em' }}>
            ARX SYSTEMS
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hide-mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}
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
              padding: '8px 16px',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            APPLY FOR INTEGRATION
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: 'var(--white)',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                transform:
                  menuOpen && i === 0
                    ? 'translateY(6.5px) rotate(45deg)'
                    : menuOpen && i === 2
                    ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--white)',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onApply(); }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--obsidian)',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: 'var(--radius-badge)',
                padding: '10px 16px',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                alignSelf: 'flex-start',
              }}
            >
              APPLY FOR INTEGRATION
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
