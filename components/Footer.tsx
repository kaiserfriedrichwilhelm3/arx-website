import { motion } from 'motion/react';

interface FooterProps {
  onApply: () => void;
}

export default function Footer({ onApply }: FooterProps) {
  const year = new Date().getFullYear();

  const col1Links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Medical', href: '#medical' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const col2Links = [
    { label: 'Apply for Integration', href: '#', onClick: onApply },
    { label: 'Secure Pilot Slot', href: '#', onClick: onApply },
    { label: 'Documentation', href: '#' },
    { label: 'Status', href: '#' },
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '80px 32px 48px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '64px',
            marginBottom: '64px',
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 88" width="24" height="26" aria-label="ARX mark">
                <path
                  d="M40 0 L80 88 L57 88 L40 64 L23 88 L0 88 Z M40 18 L63 72 L17 72 Z"
                  fill="#FFFFFF"
                  fillRule="evenodd"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--white)',
                  letterSpacing: '0.08em',
                }}
              >
                ARX SYSTEMS
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '320px',
                marginBottom: '24px',
              }}
            >
              AIMS — Agentic Intelligence Management System. One agent. Multiple execution arms. Built for enterprise revenue recovery and clinical workflow automation.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                background: 'var(--gold-muted)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-badge)',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'inline-block',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: 'var(--gold)',
                  letterSpacing: '0.08em',
                }}
              >
                ALPHA 1.0 — SLOTS OPEN
              </span>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Platform
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {col1Links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Access links */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Access
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {col2Links.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
            © {year} ARX Systems. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
            AIMS v1.0-alpha
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
