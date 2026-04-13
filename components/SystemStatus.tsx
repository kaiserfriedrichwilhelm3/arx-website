export default function SystemStatus() {
  const stats = [
    { label: 'SYSTEM STATUS', value: 'AIMS Alpha 1.0.4 STABLE', dot: true },
    { label: 'UPTIME', value: '99.97%' },
    { label: 'ACTIVE DEPLOYMENTS', value: '1 CLINICAL PILOT + ACCEPTING BUSINESS APPS' },
  ];

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        overflow: 'hidden',
      }}
    >
      {/* Desktop: centered flex row */}
      <div
        className="status-desktop"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          padding: '0 32px',
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>
              {stat.label}:
            </span>
            {stat.dot && (
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            )}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)', letterSpacing: '0.06em' }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: scrolling marquee */}
      <div className="status-mobile" style={{ display: 'none', overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', width: 'max-content' }}>
          {[...stats, ...stats].map((stat, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                padding: '0 32px',
                whiteSpace: 'nowrap',
              }}
            >
              {stat.label}: {stat.value}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .status-desktop { display: none !important; }
          .status-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}
