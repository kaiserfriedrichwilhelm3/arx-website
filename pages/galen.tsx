import { useState } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import GalenHero from '@/components/GalenHero';
import GalenProblem from '@/components/GalenProblem';
import GalenArms from '@/components/GalenArms';
import GalenSecurity from '@/components/GalenSecurity';
import GalenCalculator from '@/components/GalenCalculator';
import GalenAccess from '@/components/GalenAccess';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';
import GalenForm from '@/components/GalenForm';

export default function Galen() {
  const [formOpen, setFormOpen] = useState(false);
  const open = () => setFormOpen(true);
  const close = () => setFormOpen(false);

  return (
    <>
      <Head>
        <title>Galen — ARX Systems</title>
        <meta name="description" content="Galen: the clinical implementation of AIMS. Insurance defense, live session scribing, claims audit, and front desk triage — in development by ARX Systems." />
      </Head>

      <Nav page="galen" onApply={open} />

      <main>
        <GalenHero onInquire={open} />
        <GalenProblem />
        <GalenArms onInquire={open} />
        <GalenSecurity />
        <GalenCalculator />
        <GalenAccess onInquire={open} />
        <FounderSection onApply={open} />
      </main>

      <Footer onApply={open} />
      <GalenForm isOpen={formOpen} onClose={close} />
    </>
  );
}
