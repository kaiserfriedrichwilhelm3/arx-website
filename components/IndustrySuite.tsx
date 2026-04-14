import Link from 'next/link';
import { motion } from 'motion/react';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };
const vp = { once: true, margin: '-40px' as const };

interface IndustrySuiteProps {
  onAtlasInterest: () => void;
}

export default function IndustrySuite({ onAtlasInterest }: IndustrySuiteProps) {
  return (
    <section id="industry-suite" style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
          style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Industry-Specific Implementations
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.8 }}>
            The AIMS Brain accepts specialized Arm configurations tuned for high-stakes industries.
            Each implementation inherits the full AIMS core — with modules purpose-built for that sector.
          </p>
        </motion.div>

        <div className="suite-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Galen card */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={spring}
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--galen)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>
              Clinical Medicine
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--white)', marginBottom: '12px' }}>Galen</h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '16px' }}>
              The clinical implementation of AIMS for private medical practices. Ambient scribing,
              insurance denial management, EHR integration, and prescription logic — all on the
              AIMS deterministic core.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {['Ambient Clinical Scribing', 'Insurance Denial + Prior Auth', 'Prescription Fulfillment Logic', 'EHR Integration Layer'].map((f) => (
                <div key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>→ {f}</div>
              ))}
            </div>
            <Link href="/galen"
              style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--galen)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-badge)', padding: '8px 16px', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--galen-muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
              Explore Galen →
            </Link>
          </motion.div>

          {/* Atlas card — coming soon, dimmed */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ ...spring, delay: 0.08 }}
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', opacity: 0.65 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>
              Real Estate · Coming Soon
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--muted-2)', marginBottom: '12px' }}>Atlas</h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted-2)', lineHeight: 1.8, marginBottom: '16px' }}>
              The real estate implementation of AIMS. Designed for agencies, brokerages, and
              property management firms. Lead qualification, listing automation, and CRM
              orchestration — built on the AIMS core.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {['Listing + Lead Automation', 'Client Qualification Engine', 'Offer + Contract Tracking', 'Market Analytics Layer'].map((f) => (
                <div key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)' }}>→ {f}</div>
              ))}
            </div>
            <div
              onClick={onAtlasInterest}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted-2)', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px 12px', cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'rgba(250,250,250,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              Accepting Early Interest
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .suite-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
