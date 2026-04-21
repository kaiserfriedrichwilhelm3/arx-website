import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ApplyForm from '@/components/ApplyForm';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

export default function ApplyGalen() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Inquire About Galen — ARX Systems</title>
        <meta name="description" content="Submit a Galen pilot inquiry. ARX Systems reviews every application directly — no account managers." />
      </Head>

      <Nav page="galen" onApply={() => {}} />

      <main style={{ minHeight: '100vh', background: 'var(--obsidian)', paddingTop: '80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '64px 32px 96px' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--galen)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
              Galen · Clinical Pilot Access
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Inquire About Galen
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              Galen is selecting a limited number of clinical pilot partners ahead of launch.
              Pilot partners receive founding-tier pricing locked for life and direct input into the product roadmap.
              Gabriel reviews every inquiry personally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            style={{ background: 'var(--surface)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '32px' }}
          >
            <ApplyForm variant="galen" />
          </motion.div>
        </div>
      </main>

      <Footer onApply={() => router.push('/apply')} />
    </>
  );
}
