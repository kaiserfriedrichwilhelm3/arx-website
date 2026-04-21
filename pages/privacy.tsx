import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const spring = { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.2 };

const body: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  color: 'var(--muted)',
  lineHeight: 1.9,
  marginBottom: '12px',
};

const heading: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '20px',
  color: 'var(--white)',
  marginBottom: '12px',
  marginTop: '36px',
};

const EFFECTIVE_DATE = 'April 14, 2026';

export default function Privacy() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Privacy Policy — ARX Systems</title>
        <meta name="description" content="Privacy policy for ARX Systems. What we collect, how we use it, and how to request deletion." />
      </Head>

      <Nav page="aims" onApply={() => router.push('/apply')} />

      <main style={{ minHeight: '100vh', background: 'var(--obsidian)', paddingTop: '80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 32px 96px' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
              Legal
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Privacy Policy
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)', marginBottom: '48px' }}>
              Last updated: {EFFECTIVE_DATE} · Effective: {EFFECTIVE_DATE}
            </p>

            <p style={body}>
              ARX Systems LLC (&ldquo;ARX Systems,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates
              arxsystems.org and its subpages. This policy explains what information we collect when you
              visit the site, how we use it, and your rights regarding that information.
            </p>

            <h2 style={heading}>What We Collect</h2>
            <p style={body}>
              We collect information you submit voluntarily through our application forms at{' '}
              <strong style={{ color: 'var(--white)' }}>/apply</strong> and{' '}
              <strong style={{ color: 'var(--white)' }}>/apply/galen</strong>. This includes:
            </p>
            <ul style={{ ...body, paddingLeft: '20px', marginBottom: '12px' }}>
              <li>Your name and work email address</li>
              <li>Your company or practice name and your role</li>
              <li>Business context you provide (lead volume, operational challenges, specialty, provider count)</li>
              <li>Your written response to the open-ended inquiry field</li>
            </ul>
            <p style={body}>
              We do not use analytics trackers, advertising pixels, or session recording tools. We do
              not collect IP addresses beyond what is inherent in standard web server operation (used
              solely for rate-limiting form submissions). We do not use cookies beyond what Next.js
              requires to serve the site.
            </p>

            <h2 style={heading}>How We Store It</h2>
            <p style={body}>
              Form submissions are delivered via Resend (resend.com) to a private Gmail inbox operated
              by ARX Systems. We do not maintain a database of submissions. Once an email is received,
              it is stored in that inbox and subject to Google&rsquo;s standard data handling for Gmail.
              No submission data is written to any third-party CRM, analytics platform, or data broker.
            </p>

            <h2 style={heading}>How We Use It</h2>
            <p style={body}>
              Submission data is used for one purpose only: responding to your inquiry about AIMS or
              Galen pilot access. We do not use your information for marketing to third parties, do not
              sell it, and do not share it with anyone outside ARX Systems.
            </p>

            <h2 style={heading}>Who We Share It With</h2>
            <p style={body}>
              No one. Your submission goes directly to a private ARX Systems inbox. The only
              third-party processor involved is Resend, which handles email delivery only and does not
              retain submitted content beyond delivery.
            </p>

            <h2 style={heading}>Galen and Clinical Data</h2>
            <p style={body}>
              The Galen application form collects practice-level information (specialty, provider count,
              estimated claim volume) — not patient data. No protected health information (PHI) is
              collected through any form on this site. Galen is in development and has not processed
              any patient data. Clinical data handling for pilot partners will be governed by a
              separate Business Associate Agreement (BAA) executed prior to any clinical deployment.
            </p>

            <h2 style={heading}>Data Deletion</h2>
            <p style={body}>
              To request deletion of your submitted information, email{' '}
              <a href="mailto:gabrielcespedes777@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                gabrielcespedes777@gmail.com
              </a>{' '}
              with the subject line &ldquo;Data Deletion Request.&rdquo; We will confirm deletion within
              5 business days.
            </p>

            <h2 style={heading}>Changes to This Policy</h2>
            <p style={body}>
              If we materially change this policy, we will update the &ldquo;Last updated&rdquo; date
              above. Continued use of the site after a change constitutes acceptance of the updated
              policy.
            </p>

            <h2 style={heading}>Contact</h2>
            <p style={body}>
              Questions about this policy:{' '}
              <a href="mailto:gabrielcespedes777@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                gabrielcespedes777@gmail.com
              </a>
              {' '}· ARX Systems LLC · Miami, FL
            </p>
          </motion.div>
        </div>
      </main>

      <Footer onApply={() => router.push('/apply')} />
    </>
  );
}
