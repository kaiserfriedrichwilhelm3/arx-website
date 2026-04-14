const ARXMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 88" width="22" height="24" aria-hidden>
    <path d="M40 0 L80 88 L57 88 L40 64 L23 88 L0 88 Z M40 18 L63 72 L17 72 Z" fill="#FAFAFA" fillRule="evenodd" />
  </svg>
);

export default function LandingNav() {
  return (
    <nav style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      height: '64px', display: 'flex', alignItems: 'center',
      padding: '0 32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ARXMark />
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--white)', lineHeight: 1 }}>ARX</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.2em', lineHeight: 1 }}>SYSTEMS</div>
        </div>
      </div>
    </nav>
  );
}
