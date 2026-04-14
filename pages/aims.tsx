'use client';

import { useState } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WhatIsAIMS from '@/components/WhatIsAIMS';
import HowItWorks from '@/components/HowItWorks';
import AIMAArms from '@/components/AIMAArms';
import IndustrySuite from '@/components/IndustrySuite';
import Calculator from '@/components/Calculator';
import QualificationGate from '@/components/QualificationGate';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';
import AIMSForm from '@/components/AIMSForm';

export default function AIMSPage() {
  const [formOpen, setFormOpen] = useState(false);
  const open = () => setFormOpen(true);
  const close = () => setFormOpen(false);

  return (
    <>
      <Head>
        <title>AIMS — ARX Systems</title>
        <meta name="description" content="AIMS: the agentic operating layer for modern business. Voice management, revenue intelligence, lead qualification, and more. Alpha 1.0 in development by ARX Systems." />
      </Head>

      <Nav page="aims" onApply={open} />

      <main>
        <Hero onApply={open} />
        <WhatIsAIMS />
        <HowItWorks />
        <AIMAArms onApply={open} />
        <IndustrySuite onAtlasInterest={open} />
        <Calculator />
        <QualificationGate onApply={open} />
        <FounderSection onApply={open} />
      </main>

      <Footer onApply={open} />
      <AIMSForm isOpen={formOpen} onClose={close} />
    </>
  );
}
