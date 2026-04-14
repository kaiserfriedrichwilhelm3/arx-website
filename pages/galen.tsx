import { useState } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import GalenHero from '@/components/GalenHero';
import GalenProblem from '@/components/GalenProblem';
import GalenArms from '@/components/GalenArms';
import GalenCalculator from '@/components/GalenCalculator';
import GalenAccess from '@/components/GalenAccess';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function Galen() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <>
      <Head>
        <title>Galen — ARX Systems</title>
        <meta name="description" content="Galen: the clinical implementation of AIMS. Insurance defense, live session scribing, claims audit, and front desk triage — in development by ARX Systems." />
      </Head>

      <Nav onApply={open} galenPage />

      <main>
        <GalenHero onInquire={open} />
        <GalenProblem />
        <GalenArms onInquire={open} />
        <GalenCalculator />
        <GalenAccess onInquire={open} />
        <FounderSection onApply={open} />
      </main>

      <Footer onApply={open} />
      <Modal isOpen={modalOpen} onClose={close} galenMode />
    </>
  );
}
