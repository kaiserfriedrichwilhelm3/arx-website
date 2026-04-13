import { useState } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import MedicalHero from '@/components/MedicalHero';
import CaseStudy from '@/components/CaseStudy';
import MedicalModules from '@/components/MedicalModules';
import MedicalCalculator from '@/components/MedicalCalculator';
import MedicalPricing from '@/components/MedicalPricing';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function Medical() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <>
      <Head>
        <title>AIMS Medical — ARX Systems</title>
        <meta name="description" content="AIMS Medical: AI-powered insurance defense, clinical documentation, and FHIR R4 compliance for clinical practices." />
      </Head>

      <Nav onApply={open} />

      <main>
        <MedicalHero onApply={open} />
        <CaseStudy />
        <MedicalModules />
        <MedicalCalculator />
        <MedicalPricing onApply={open} />
        <FounderSection onApply={open} />
      </main>

      <Footer onApply={open} />
      <Modal isOpen={modalOpen} onClose={close} />
    </>
  );
}
