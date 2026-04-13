import { motion } from 'motion/react';

interface Entry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

const ENTRIES: Entry[] = [
  {
    version: 'v1.0.4',
    date: 'April 2026',
    title: 'Multi-Voice Concurrent Scaling',
    changes: [
      'Deployed parallel voice agent architecture for high-volume practices',
      'Concurrent call handling: up to 50 simultaneous inbound lines',
      'Latency reduced to <400ms average response initiation',
    ],
  },
  {
    version: 'v1.0.3',
    date: 'March 2026',
    title: 'Optimized RCM Denial Logic',
    changes: [
      'Integrated payer-specific denial pattern database',
      'Appeal letter generation: 3 templates per payer type',
      'Denial detection accuracy: 94.2% on Cespedes Cardiology dataset',
    ],
  },
  {
    version: 'v1.0.2',
    date: 'February 2026',
    title: 'Prescription Guard + Claims Audit Beta',
    changes: [
      'State machine enforcement layer for multi-step prescriptions live',
      'Claims Audit Engine: real-time CPT/ICD-10 mismatch detection',
      'Front Desk Triage module: zero-missed-call guarantee active',
    ],
  },
  {
    version: 'v1.0.1',
    date: 'February 2026',
    title: 'Cespedes Cardiology Pilot Deployment',
    changes: [
      'First clinical integration: FHIR R4 memory layer active',
      'Front desk triage module: live',
      'Live Session Scribe: beta testing with supervising physician',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'January 2026',
    title: 'AIMS Alpha 1.0 — Initial Release',
    changes: [
      'Core architecture locked: Universal Brain + Interchangeable Adapters',
      'LangGraph StateGraph state machine deployed',
      'Pinecone serverless namespace isolation active',
      'YAML/JSON config system: client-specific logic with zero code changes',
    ],
  },
];

export default function Changelog() {
  return (
    <section
      id="changelog"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 32px' }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ marginBottom: '48px' }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--white)', marginBottom: '10px' }}>
            System Changelog
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
            // AIMS Alpha 1.0.x patch history
          </p>
        </motion.div>

        {/* Entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {ENTRIES.map((entry, i) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: i * 0.07 }}
              style={{
                display: 'flex',
                gap: '24px',
                paddingBottom: i < ENTRIES.length - 1 ? '36px' : 0,
                marginBottom: i < ENTRIES.length - 1 ? '36px' : 0,
                borderBottom: i < ENTRIES.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Version + date column */}
              <div style={{ minWidth: '100px', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold)', fontWeight: 500, marginBottom: '4px' }}>
                  {entry.version}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
                  {entry.date}
                </div>
              </div>

              {/* Content */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--white)', marginBottom: '12px', fontWeight: 500 }}>
                  {entry.title}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {entry.changes.map((change) => (
                    <li key={change} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
                      <span style={{ color: 'var(--muted-2)', flexShrink: 0 }}>→</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
