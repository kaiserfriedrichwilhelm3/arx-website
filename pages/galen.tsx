'use client';

import Head from 'next/head';
import { useRouter } from 'next/router';
import Nav from '@/components/Nav';
import GalenHero from '@/components/GalenHero';
import GalenProblem from '@/components/GalenProblem';
import GalenArms from '@/components/GalenArms';
import GalenSecurity from '@/components/GalenSecurity';
import GalenCalculator from '@/components/GalenCalculator';
import GalenAccess from '@/components/GalenAccess';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';

export default function Galen() {
  const router = useRouter();
  const inquire = () => router.push('/apply/galen');

  return (
    <>
      <Head>
        <title>Galen — Clinical AI Operating System | ARX Systems</title>
        <meta name="description" content="Galen is the clinical implementation of AIMS for private medical practices. Insurance defense, ambient scribing, EHR integration. In development by ARX Systems." />
        <meta property="og:title" key="og:title" content="Galen — Clinical AI Operating System | ARX Systems" />
        <meta property="og:description" key="og:description" content="Galen is the clinical implementation of AIMS for private medical practices. Insurance defense, ambient scribing, EHR integration. In development." />
        <meta name="twitter:title" key="twitter:title" content="Galen — Clinical AI Operating System | ARX Systems" />
        <meta name="twitter:description" key="twitter:description" content="Galen is the clinical implementation of AIMS for private medical practices. Insurance defense, ambient scribing, EHR integration." />
      </Head>

      <Nav page="galen" onApply={inquire} />

      <main>
        <GalenHero onInquire={inquire} />
        <GalenProblem />
        <GalenArms onInquire={inquire} />
        <GalenSecurity />
        <GalenCalculator />
        <GalenAccess onInquire={inquire} />
        <FounderSection onApply={inquire} />
      </main>

      <Footer onApply={inquire} />
    </>
  );
}
