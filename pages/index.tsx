import Head from 'next/head';
import { motion, useReducedMotion } from 'motion/react';
import LandingNav from '@/components/LandingNav';
import SelectorCard from '@/components/SelectorCard';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

export default function Landing() {
  const shouldReduce = useReducedMotion();

  return (
    <>
      <Head>
        <title>ARX Systems — Agentic Operating Layer for Modern Business</title>
        <meta name="description" content="ARX Systems builds AIMS — the agentic operating layer for modern business — and Galen, its clinical implementation for private medical practices. One Brain. Multiple Arms." />
      </Head>

      <div style={{ minHeight: '100vh', background: 'var(--obsidian)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <LandingNav />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 48px', textAlign: 'center' }}>

          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}
          >
            ARX SYSTEMS · ARTIFICIAL INTELLIGENCE MANAGEMENT SYSTEM
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 8vw, 72px)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            ONE BRAIN.
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.38 }}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 8vw, 72px)', fontWeight: 700, color: 'var(--gold)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '24px' }}
          >
            MULTIPLE ARMS.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.55 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '520px', marginBottom: '48px' }}
          >
            AIMS is the agentic operating layer for modern business.
            Select your implementation below.
          </motion.p>

          {/* Selector cards */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.7 }}
            className="selector-cards"
            style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}
          >
            <SelectorCard
              variant="aims"
              category="General Business"
              name="AIMS"
              tagline="The Agentic Operating Layer"
              description="AIMS connects every tool and workflow in your business into one deterministic interface. Built for professional service companies that need autonomous execution — not another chatbot."
              features={[
                { label: 'Voice + Lead Management' },
                { label: 'Revenue Intelligence' },
                { label: 'CRM Aggregation' },
              ]}
              ctaLabel="Explore AIMS →"
              href="/aims"
            />
            <SelectorCard
              variant="galen"
              category="Clinical Medicine"
              name="Galen"
              tagline="The Clinical AI Operating System"
              description="Galen is the clinical implementation of the AIMS architecture — designed for private medical practices. Ambient scribing, insurance denial management, and EHR integration. Built to give physicians their time back."
              features={[
                { label: 'Ambient Clinical Scribing' },
                { label: 'Insurance Denial Management' },
                { label: 'EHR Integration Layer' },
              ]}
              ctaLabel="Explore Galen →"
              href="/galen"
            />
          </motion.div>

          {/* Industry teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.9 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', marginBottom: '12px' }}>
              Industry-Specific Implementations:
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/galen" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--galen)', border: '1px solid var(--border-galen)', borderRadius: '999px', padding: '4px 12px', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--galen-muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                Galen · Medicine
              </a>
            </div>
          </motion.div>
        </main>

        {/* Minimal footer */}
        <footer style={{ textAlign: 'center', padding: '20px 32px', borderTop: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
            © 2026 ARX Systems · Miami, FL · AIMS Alpha 1.0 In Development
          </span>
        </footer>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .selector-cards { flex-direction: column; align-items: center; }
        }
      `}</style>
    </>
  );
}
