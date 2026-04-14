import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ARX Systems — AIMS + Galen" />
        <meta property="og:description" content="The agentic AI operating layer for modern business and clinical medicine. One Brain. Multiple Arms. AIMS Alpha 1.0 in development." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ARX Systems — AIMS + Galen" />
        <meta name="twitter:description" content="One Brain. Multiple Arms. The agentic AI operating layer for business and medicine." />
        {/* CDN fonts — next/font/google causes 403 in Railway build sandbox */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          :root {
            --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
            --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
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
