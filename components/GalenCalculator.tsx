'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000).toLocaleString()}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function fmtHrs(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000).toLocaleString()}K hrs`;
  return `${Math.round(n)} hrs`;
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

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  note?: string;
  noteColor?: string;
  galenRange?: boolean;
}

function SliderRow({ label, value, min, max, step, onChange, display, note, noteColor, galenRange }: SliderRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--galen)', fontWeight: 500 }}>{display}</span>
      </div>
      <input type="range" className={galenRange ? 'galen-range' : undefined} min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {note && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: noteColor || 'var(--muted)' }}>{note}</span>}
    </div>
  );
}

export default function GalenCalculator() {
  const shouldReduce = useReducedMotion();
  const [monthlyClaims, setMonthlyClaims] = useState(400);
  const [denialRate, setDenialRate] = useState(15);
  const [avgClaimValue, setAvgClaimValue] = useState(850);
  const [docHoursPerDay, setDocHoursPerDay] = useState(2);
  const [providers, setProviders] = useState(2);

  const calc = useMemo(() => {
    const deniedClaims = Math.round(monthlyClaims * (denialRate / 100));
    const monthlyDeniedRevenue = deniedClaims * avgClaimValue;
    // Estimate 40% of denials are recoverable with automated management
    const recoverableRevenue = monthlyDeniedRevenue * 0.40;
    // Documentation time reclaimed: 70% of doc hours
    const monthlyDocHours = docHoursPerDay * providers * 22; // working days
    const reclaimedDocHours = Math.round(monthlyDocHours * 0.70);
    // Assume $150/hr physician time value
    const docTimeValue = reclaimedDocHours * 150;
    const galenEstimatedCost = 0; // $0 pilot
    const monthlyOpportunity = recoverableRevenue + docTimeValue - galenEstimatedCost;
    const yearOneOpportunity = monthlyOpportunity * 12;
    const annualReclaimedHours = reclaimedDocHours * 12;
    const chartData = Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      denied: Math.round(monthlyDeniedRevenue * (i + 1)),
      recovered: Math.round(Math.max(monthlyOpportunity, 0) * (i + 1)),
    }));
    return { yearOneOpportunity, annualReclaimedHours, monthlyDeniedRevenue, chartData };
  }, [monthlyClaims, denialRate, avgClaimValue, docHoursPerDay, providers]);

  const animatedHours = useCountUp(Math.max(calc.annualReclaimedHours, 0));
  const animatedRevenue = useCountUp(Math.max(Math.round(calc.yearOneOpportunity), 0));

  return (
    <section id="calculator" style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Estimate Your Practice Opportunity
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // projection model — not a performance guarantee
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
            This tool models potential value using industry-average benchmarks. Galen has not yet launched. Results will vary based on your practice, specialty, and payer mix.
          </span>
        </div>

        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="galen-calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Inputs */}
          <div style={{ background: 'var(--obsidian)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SliderRow galenRange label="Monthly Claims Submitted" value={monthlyClaims} min={50} max={3000} step={50} onChange={setMonthlyClaims} display={monthlyClaims.toLocaleString()} />
            <SliderRow galenRange label="Current Denial Rate (%)" value={denialRate} min={1} max={40} step={1} onChange={setDenialRate} display={`${denialRate}%`}
              note="Industry average: 10–30% first-pass denial rate" />
            <SliderRow galenRange label="Average Claim Value ($)" value={avgClaimValue} min={100} max={5000} step={50} onChange={setAvgClaimValue} display={`$${avgClaimValue.toLocaleString()}`} />
            <SliderRow galenRange label="Documentation Hours / Provider / Day" value={docHoursPerDay} min={0.5} max={6} step={0.5} onChange={setDocHoursPerDay} display={`${docHoursPerDay} hrs`}
              note="Physicians spend ~2–3 hrs/day on clinical documentation" />
            <SliderRow galenRange label="Number of Providers" value={providers} min={1} max={20} step={1} onChange={setProviders} display={`${providers} provider${providers !== 1 ? 's' : ''}`} />
          </div>

          {/* Output */}
          <div style={{ background: 'var(--obsidian)', border: '1px solid var(--border-galen)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Documentation Hours Reclaimed / Year
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '8px' }}>
                Based on provider count + documentation hours entered
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '56px', fontWeight: 500, color: 'var(--galen)', lineHeight: 1 }}>
                {animatedHours.toLocaleString()}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={calc.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="galenDeniedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4444" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#FF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="galenRecoveredGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A9EFF" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#4A9EFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => fmt(Number(v))} tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ background: '#111111', border: '1px solid rgba(74,158,255,0.3)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '11px', color: '#FAFAFA' }} formatter={(v) => [fmt(Number(v)), '']} />
                <Area type="monotone" dataKey="denied" stroke="#FF4444" strokeWidth={1.5} fill="url(#galenDeniedGrad)" name="Denied Revenue (Cumulative)" isAnimationActive />
                <Area type="monotone" dataKey="recovered" stroke="#4A9EFF" strokeWidth={2} fill="url(#galenRecoveredGrad)" name="Projected Opportunity Captured" isAnimationActive />
              </AreaChart>
            </ResponsiveContainer>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'Denied Revenue / Month', val: fmt(calc.monthlyDeniedRevenue) },
                { label: 'Pilot Cost', val: '$0 upfront' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--galen)', marginTop: '2px' }}>{s.val}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '12px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Projected Year 1 Opportunity
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 500, color: 'var(--galen)', lineHeight: 1 }}>
                {fmt(animatedRevenue)}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', marginTop: '4px' }}>
                Illustrative only — not a guarantee of outcome.
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', fontStyle: 'italic' }}>
              ARX Systems does not guarantee any financial outcome. This tool models operational load, not recoverable revenue. Physician time valued at $150/hr estimate.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .galen-calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
