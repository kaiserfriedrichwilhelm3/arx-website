'use client';

import Head from 'next/head';
import { useRouter } from 'next/router';
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

export default function AIMSPage() {
  const router = useRouter();
  const apply = () => router.push('/apply');

  return (
    <>
      <Head>
        <title>AIMS — The Agentic Operating Layer | ARX Systems</title>
        <meta name="description" content="AIMS is the agentic operating layer for modern business. Voice management, revenue intelligence, lead qualification — one deterministic system. Alpha 1.0 in development." />
        <meta property="og:title" key="og:title" content="AIMS — The Agentic Operating Layer | ARX Systems" />
        <meta property="og:description" key="og:description" content="AIMS is the agentic operating layer for modern business. Voice management, revenue intelligence, lead qualification — one deterministic system. Alpha 1.0 in development." />
        <meta name="twitter:title" key="twitter:title" content="AIMS — The Agentic Operating Layer | ARX Systems" />
        <meta name="twitter:description" key="twitter:description" content="AIMS is the agentic operating layer for modern business. Voice management, revenue intelligence, lead qualification." />
      </Head>

      <Nav page="aims" onApply={apply} />

      <main>
        <Hero onApply={apply} />
        <WhatIsAIMS />
        <HowItWorks />
        <AIMAArms onApply={apply} />
        <IndustrySuite />
        <Calculator />
        <QualificationGate onApply={apply} />
        <FounderSection onApply={apply} />
      </main>

      <Footer onApply={apply} />
    </>
  );
}
