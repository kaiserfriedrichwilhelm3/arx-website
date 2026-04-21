import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ApplyForm from '@/components/ApplyForm';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

export default function ApplyAIMS() {
  const router = useRouter();
  const { leads, challenge } = router.query;

  return (
    <>
      <Head>
        <title>Apply for AIMS Early Access — ARX Systems</title>
        <meta name="description" content="Apply for founding-tier access to AIMS. ARX Systems reviews every application directly." />
      </Head>

      <Nav page="aims" onApply={() => {}} />

      <main style={{ minHeight: '100vh', background: 'var(--obsidian)', paddingTop: '80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '64px 32px 96px' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
              AIMS · Early Access
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Apply for Early Access
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              ARX Systems is accepting a limited number of founding-tier partners before AIMS launches.
              Every application is reviewed directly by Gabriel. No charge until the product goes live.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '32px' }}
          >
            <ApplyForm
              variant="aims"
              prefill={{
                leadVolume: typeof leads === 'string' ? leads : undefined,
                challenge: typeof challenge === 'string' ? challenge : undefined,
              }}
            />
          </motion.div>
        </div>
      </main>

      <Footer onApply={() => router.push('/apply')} />
    </>
  );
}
