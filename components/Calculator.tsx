'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ── helpers ──────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000).toLocaleString()}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function useCountUp(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

// ── sub-components ────────────────────────────────────────────────────
interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  displayColor?: string;
  note?: string;
  noteColor?: string;
}

function SliderRow({ label, value, min, max, step, onChange, display, displayColor = 'var(--gold)', note, noteColor }: SliderRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: displayColor, fontWeight: 500 }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', cursor: 'pointer' }}
      />
      {note && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: noteColor || 'var(--muted)' }}>{note}</span>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────
export default function Calculator() {
  const shouldReduce = useReducedMotion();
  const [monthlyLeads, setMonthlyLeads] = useState(50);
  const [responseTime, setResponseTime] = useState(45);
  const [avgDeal, setAvgDeal] = useState(3000);
  const [sdrCount, setSdrCount] = useState(1);

  const calc = useMemo(() => {
    const decayMultiplier =
      responseTime <= 5 ? 1.0 :
      responseTime <= 30 ? 0.35 :
      responseTime <= 60 ? 0.20 :
      responseTime <= 120 ? 0.10 : 0.05;
    const monthlyLeadsLost = Math.round(monthlyLeads * (1 - decayMultiplier));
    const revenueFromDecay = monthlyLeadsLost * avgDeal * 0.25;
    const sdrCost = sdrCount * 5200;
    const aimsMonthly = 499;
    const monthlyRecovery = revenueFromDecay + sdrCost - aimsMonthly;
    const yearOneNet = monthlyRecovery * 12;
    const leadsRecovered = Math.round(monthlyLeads * decayMultiplier * 12);
    const sdrSavings = sdrCost * 12;
    const chartData = Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      lost: Math.round(revenueFromDecay * (i + 1)),
      recovered: Math.round(Math.max(monthlyRecovery, 0) * (i + 1)),
    }));
    return { monthlyRecovery, yearOneNet, leadsRecovered, sdrSavings, chartData };
  }, [monthlyLeads, responseTime, avgDeal, sdrCount]);

  const animatedValue = useCountUp(Math.max(calc.yearOneNet, 0));

  return (
    <section id="calculator" style={{ padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Calculate Your Recovery
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // live projection — adjust inputs to see your number
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
        >
          {/* Inputs */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SliderRow label="Monthly Inbound Leads" value={monthlyLeads} min={10} max={500} step={5} onChange={setMonthlyLeads} display={monthlyLeads.toLocaleString()} />
            <SliderRow
              label="Lead Response Time"
              value={responseTime}
              min={1}
              max={240}
              step={1}
              onChange={setResponseTime}
              display={`${responseTime} min`}
              note="⚠ After 5 minutes, conversion probability drops 80%"
              noteColor="var(--danger)"
            />
            <SliderRow label="Average Deal Value" value={avgDeal} min={500} max={25000} step={250} onChange={setAvgDeal} display={`$${avgDeal.toLocaleString()}`} />
            <SliderRow
              label="SDR Headcount"
              value={sdrCount}
              min={0}
              max={10}
              step={1}
              onChange={setSdrCount}
              display={`${sdrCount} person${sdrCount !== 1 ? 's' : ''}`}
              note="Avg SDR cost $5,200/mo fully loaded"
            />
          </div>

          {/* Output */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>Year 1 Net Recovery</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 500, color: 'var(--gold)', lineHeight: 1 }}>
                {fmt(animatedValue)}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={calc.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lostGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#FF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => fmt(v)} tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-gold)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '11px', color: 'var(--white)' }} formatter={(v) => [fmt(Number(v)), '']} />
                <Area type="monotone" dataKey="lost" stroke="#FF4444" strokeWidth={1.5} fill="url(#lostGrad)" name="Revenue Lost to Delay" isAnimationActive />
                <Area type="monotone" dataKey="recovered" stroke="#D4AF37" strokeWidth={2} fill="url(#recGrad)" name="Revenue Captured by AIMS" isAnimationActive />
              </AreaChart>
            </ResponsiveContainer>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'Leads Recovered / yr', val: calc.leadsRecovered.toLocaleString() },
                { label: 'SDR Cost Saved', val: fmt(calc.sdrSavings) },
                { label: 'Response Time', val: 'Instant' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--gold)', marginTop: '2px' }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #calculator > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
