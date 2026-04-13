import { useState } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import GeneralAIMS from '@/components/GeneralAIMS';
import MedicalAIMS from '@/components/MedicalAIMS';
import Calculator from '@/components/Calculator';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>ARX Systems — AIMS Agentic Hub</title>
      </Head>

      <Nav onApply={() => setModalOpen(true)} />

      <main>
        <Hero onApply={() => setModalOpen(true)} />
        <GeneralAIMS />
        <MedicalAIMS />
        <Calculator />
        <Pricing onApply={() => setModalOpen(true)} />
      </main>

      <Footer onApply={() => setModalOpen(true)} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
