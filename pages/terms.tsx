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

export default function Terms() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Terms of Service — ARX Systems</title>
        <meta name="description" content="Terms of service for ARX Systems. Informational site, pre-launch product, no warranties on calculator projections." />
      </Head>

      <Nav page="aims" onApply={() => router.push('/apply')} />

      <main style={{ minHeight: '100vh', background: 'var(--obsidian)', paddingTop: '80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 32px 96px' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
              Legal
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Terms of Service
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)', marginBottom: '48px' }}>
              Last updated: {EFFECTIVE_DATE} · Effective: {EFFECTIVE_DATE}
            </p>

            <h2 style={{ ...heading, marginTop: 0 }}>Who We Are</h2>
            <p style={body}>
              ARX Systems LLC is a Florida limited liability company headquartered in Miami, FL.
              These Terms of Service govern your use of arxsystems.org and any subpages operated
              by ARX Systems LLC (&ldquo;ARX Systems,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;).
              By accessing the site, you agree to these terms.
            </p>

            <h2 style={heading}>Nature of This Site</h2>
            <p style={body}>
              This website is informational only. AIMS and Galen are products in development. No
              product or service is currently available for purchase, subscription, or deployment.
              Nothing on this site constitutes an offer to sell or a binding commitment to deliver
              any product or service.
            </p>
            <p style={body}>
              Submitting an application or inquiry through this site does not create a contract,
              guarantee access, or establish any business relationship. It signals your interest,
              which ARX Systems will respond to directly.
            </p>

            <h2 style={heading}>ROI Calculator and Financial Projections</h2>
            <p style={body}>
              The revenue opportunity calculators on /aims and /galen use published industry averages
              and user-provided inputs to model potential operational and financial impact.{' '}
              <strong style={{ color: 'var(--white)' }}>
                These projections are illustrative only and are not guarantees of any financial
                outcome.
              </strong>{' '}
              ARX Systems does not warrant the accuracy of the underlying benchmarks or the
              applicability of the outputs to any specific business. Results will vary based on
              your industry, team, tools, and market conditions.
            </p>
            <p style={body}>
              No output from any calculator on this site should be relied upon as the basis for a
              financial decision. ARX Systems accepts no liability for decisions made based on
              calculator outputs.
            </p>

            <h2 style={heading}>No Warranties</h2>
            <p style={body}>
              This site and all content on it are provided &ldquo;as is&rdquo; without warranty of
              any kind, express or implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or non-infringement. ARX Systems
              does not warrant that the site will be error-free, uninterrupted, or free of
              security vulnerabilities.
            </p>

            <h2 style={heading}>Limitation of Liability</h2>
            <p style={body}>
              To the fullest extent permitted by applicable law, ARX Systems LLC and its founder
              shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising out of or related to your use of this site or reliance on any content
              herein, even if advised of the possibility of such damages. ARX Systems&rsquo; total
              liability for any claim arising from your use of this site shall not exceed one
              hundred US dollars ($100).
            </p>

            <h2 style={heading}>Pilot Agreements</h2>
            <p style={body}>
              Any pilot access to AIMS or Galen will be governed by a separate, signed pilot
              agreement between ARX Systems LLC and the partner. These Terms of Service do not
              constitute or imply any terms of a pilot or commercial agreement. Pricing, scope,
              and obligations will be defined in those separate contracts.
            </p>

            <h2 style={heading}>Intellectual Property</h2>
            <p style={body}>
              All content on this site — including copy, design, architecture diagrams, and brand
              marks — is the property of ARX Systems LLC. You may not reproduce, distribute, or
              create derivative works from any content on this site without prior written permission.
            </p>

            <h2 style={heading}>Governing Law</h2>
            <p style={body}>
              These Terms are governed by the laws of the State of Florida, without regard to its
              conflict-of-law provisions. Any disputes arising from these Terms or your use of this
              site shall be resolved in the courts of Miami-Dade County, Florida.
            </p>

            <h2 style={heading}>Changes to These Terms</h2>
            <p style={body}>
              We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date
              above reflects the most recent revision. Continued use of the site after any change
              constitutes your acceptance of the updated Terms.
            </p>

            <h2 style={heading}>Contact</h2>
            <p style={body}>
              Questions about these Terms:{' '}
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
