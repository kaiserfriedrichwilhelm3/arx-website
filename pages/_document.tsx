import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="AIMS — Agentic Intelligence Management System. One agent. Multiple execution arms. Built for enterprise revenue recovery and clinical workflow automation." />
        <meta name="theme-color" content="#0A0A0A" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ARX Systems — AIMS Agentic Hub" />
        <meta property="og:description" content="One Agent. Multiple Arms. Enterprise-grade agentic infrastructure for revenue recovery, clinical automation, and operational intelligence." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ARX Systems — AIMS" />
        <meta name="twitter:description" content="One Agent. Multiple Arms." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          :root {
            --font-playfair: 'Playfair Display', Georgia, 'Times New Roman', serif;
            --font-jetbrains: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
          }
        `}</style>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
