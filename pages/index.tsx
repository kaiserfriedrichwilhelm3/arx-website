import { useState } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SystemStatus from '@/components/SystemStatus';
import GeneralAIMS from '@/components/GeneralAIMS';
import Calculator from '@/components/Calculator';
import Pricing from '@/components/Pricing';
import Changelog from '@/components/Changelog';
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
        <title>AIMS Alpha 1.0.4 — ARX Systems</title>
      </Head>

      <Nav onApply={open} />

      <main>
        <Hero onApply={open} />
        <SystemStatus />
        <GeneralAIMS />
        <Calculator />
        <Pricing onApply={open} />
        <Changelog />
        <FounderSection onApply={open} />
      </main>

      <Footer onApply={open} />
      <Modal isOpen={modalOpen} onClose={close} />
    </>
  );
}
