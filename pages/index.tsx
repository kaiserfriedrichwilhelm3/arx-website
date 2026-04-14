import { useState } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WhatIsAIMS from '@/components/WhatIsAIMS';
import HowItWorks from '@/components/HowItWorks';
import AIMAArms from '@/components/AIMAArms';
import Calculator from '@/components/Calculator';
import Pricing from '@/components/Pricing';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <>
      <Head>
        <title>AIMS — ARX Systems</title>
        <meta name="description" content="The agentic operating layer for modern business. One Brain. Multiple Arms. AIMS Alpha 1.0 now in development." />
      </Head>

      <Nav onApply={open} />

      <main>
        <Hero onApply={open} />
        <WhatIsAIMS />
        <HowItWorks />
        <AIMAArms onApply={open} />
        <Calculator />
        <Pricing onApply={open} />
        <FounderSection onApply={open} />
      </main>

      <Footer onApply={open} />
      <Modal isOpen={modalOpen} onClose={close} />
    </>
  );
}
