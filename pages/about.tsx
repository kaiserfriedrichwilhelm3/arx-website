import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={spring}
      style={{ marginBottom: '48px' }}
    >
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--white)', marginBottom: '16px' }}>
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

const body: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  color: 'var(--muted)',
  lineHeight: 1.9,
  marginBottom: '12px',
};

export default function About() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>About ARX Systems — Founder-Led AI Infrastructure</title>
        <meta name="description" content="ARX Systems is built by one engineer in Miami. Founder-led, architecturally precise, no intermediaries." />
      </Head>

      <Nav page="aims" onApply={() => router.push('/apply')} />

      <main style={{ minHeight: '100vh', background: 'var(--obsidian)', paddingTop: '80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 32px 96px' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring} style={{ marginBottom: '56px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
              ARX Systems · About
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '24px' }}>
              ARX Systems is built by one engineer in Miami.
            </h1>
            <p style={body}>
              Gabriel Céspedes is the sole founder of ARX Systems LLC. He is building AIMS — the
              Artificial Intelligence Management System — from first principles in Miami, FL. His
              background is in AI systems architecture, and his current work centers on deterministic
              agentic infrastructure: systems that execute business logic reliably, without
              probabilistic drift or black-box decision-making.
            </p>
            <p style={body}>
              ARX Systems is not a team of twelve with a pitch deck. It is one engineer, one
              architecture, and a clear thesis: the companies that win the next decade will run on
              agentic operating layers, not manual workflows patched together with disconnected SaaS tools.
            </p>
          </motion.div>

          <div style={{ width: '100%', height: '1px', background: 'var(--border)', marginBottom: '48px' }} />

          <Section title="Why Founder-Led Matters">
            <p style={body}>
              Most enterprise software is sold by account managers who have never read the codebase.
              The person who pitches you is not the person who ships. Priorities get lost in
              translation. Integrations get handed to contractors. The original vision — the reason
              you bought in — dilutes with every layer of distance.
            </p>
            <p style={body}>
              ARX Systems does not operate this way. Every integration is built by the engineer who
              designed the architecture. When you work with ARX, you work directly with the person
              making every technical decision — not a support ticket queue, not an account manager
              with a brief, not an offshore delivery team.
            </p>
            <p style={body}>
              This is not a pitch about access. It is a statement of how the work gets done.
              Precision requires context. Context requires directness. ARX is built on that principle.
            </p>
          </Section>

          <Section title="Clinical Domain Access">
            <p style={body}>
              Galen — the clinical implementation of AIMS — is developed with direct access to an
              active cardiology practice in Miami (Edgardo Céspedes MD), which serves as the primary
              reference environment for understanding real clinical workflows, documentation burdens,
              and insurance denial patterns. No patient data has been processed. Galen is in
              development.
            </p>
            <p style={body}>
              This access means the architecture is being built against actual clinical constraints —
              not synthesized from white papers. The insurance denial logic, scribing structure, and
              EHR integration layer are all designed around how a real private practice actually
              operates.
            </p>
          </Section>

          <Section title="Contact">
            <p style={body}>
              Direct email only. No contact form — forms live at{' '}
              <Link href="/apply" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                /apply
              </Link>{' '}
              and{' '}
              <Link href="/apply/galen" style={{ color: 'var(--galen)', textDecoration: 'none' }}>
                /apply/galen
              </Link>.
            </p>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '20px', marginTop: '16px', display: 'inline-block' }}>
              <a href="mailto:gabrielcespedes777@gmail.com"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--gold)', textDecoration: 'none' }}>
                gabrielcespedes777@gmail.com
              </a>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', marginTop: '6px' }}>
                ARX Systems LLC · Miami, FL
              </div>
            </div>
          </Section>

        </div>
      </main>

      <Footer onApply={() => router.push('/apply')} />
    </>
  );
}
