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

function SliderRow({ label, value, min, max, step, onChange, display, displayColor = 'var(--medical)', note, noteColor }: SliderRowProps) {
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
        style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--medical)' }}
      />
      {note && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: noteColor || 'var(--muted)' }}>{note}</span>
      )}
    </div>
  );
}

export default function MedicalCalculator() {
  const shouldReduce = useReducedMotion();
  const [monthlyClaims, setMonthlyClaims] = useState(400);
  const [denialRate, setDenialRate] = useState(12);
  const [avgClaimValue, setAvgClaimValue] = useState(350);
  const [physicianHours, setPhysicianHours] = useState(12);

  const calc = useMemo(() => {
    const deniedClaims = Math.round(monthlyClaims * (denialRate / 100));
    const recoveryRate = 0.65;
    const claimRecovery = deniedClaims * avgClaimValue * recoveryRate;
    const docDebtMonthly = physicianHours * 4.33 * 300;
    const docDebtRecovered = docDebtMonthly * 0.70;
    const monthlyRecovery = claimRecovery + docDebtRecovered;
    const yearOneRecovery = monthlyRecovery * 12;
    const annualDenialsPrevented = Math.round(deniedClaims * recoveryRate * 12);
    const annualDocHoursReturned = Math.round(physicianHours * 0.70 * 52);
    const chartData = Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      denials: Math.round(deniedClaims * avgClaimValue * (i + 1)),
      recovered: Math.round(monthlyRecovery * (i + 1)),
    }));
    return { monthlyRecovery, yearOneRecovery, annualDenialsPrevented, annualDocHoursReturned, chartData, docDebtMonthly };
  }, [monthlyClaims, denialRate, avgClaimValue, physicianHours]);

  const animatedValue = useCountUp(Math.round(calc.yearOneRecovery));

  return (
    <section id="calculator" style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
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
            // denial rate + documentation debt — see your AIMS Medical recovery
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
          <div style={{ background: 'var(--obsidian)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SliderRow label="Monthly Claim Count" value={monthlyClaims} min={50} max={3000} step={25} onChange={setMonthlyClaims} display={monthlyClaims.toLocaleString()} />
            <SliderRow
              label="Current Denial Rate"
              value={denialRate}
              min={1}
              max={40}
              step={1}
              onChange={setDenialRate}
              display={`${denialRate}%`}
              displayColor={denialRate > 15 ? 'var(--danger)' : 'var(--medical)'}
              note="Industry avg: 12–15%. Above 15% = systemic issue."
            />
            <SliderRow label="Average Claim Value" value={avgClaimValue} min={100} max={2000} step={25} onChange={setAvgClaimValue} display={`$${avgClaimValue.toLocaleString()}`} />
            <SliderRow
              label="Physician Hours / Week on Docs"
              value={physicianHours}
              min={1}
              max={30}
              step={1}
              onChange={setPhysicianHours}
              display={`${physicianHours} hrs/wk`}
              note={`At $300/hr opportunity cost = ${fmt(calc.docDebtMonthly)}/mo in documentation debt`}
            />
          </div>

          {/* Output */}
          <div style={{ background: 'var(--obsidian)', border: '1px solid var(--border-medical)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
                AIMS Medical Recovery — Year 1
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 500, color: 'var(--medical)', lineHeight: 1 }}>
                {fmt(animatedValue)}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={calc.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="denialGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#FF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="medRecGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A9EFF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4A9EFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => fmt(Number(v))} tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ background: '#0A0A0A', border: '1px solid var(--border-medical)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '11px', color: 'var(--white)' }} formatter={(v) => [fmt(Number(v)), '']} />
                <Area type="monotone" dataKey="denials" stroke="#FF4444" strokeWidth={1.5} fill="url(#denialGrad)" name="Denial Losses (Without AIMS)" isAnimationActive />
                <Area type="monotone" dataKey="recovered" stroke="#4A9EFF" strokeWidth={2} fill="url(#medRecGrad)" name="AIMS Recovered Revenue" isAnimationActive />
              </AreaChart>
            </ResponsiveContainer>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'Denials Prevented', val: calc.annualDenialsPrevented.toLocaleString() },
                { label: 'Revenue Recovered', val: fmt(calc.yearOneRecovery) },
                { label: 'Physician Hrs Returned', val: `${calc.annualDocHoursReturned} hrs` },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--medical)', marginTop: '2px' }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Burnout callout */}
            <div style={{ background: 'var(--medical-muted)', border: '1px solid var(--border-medical)', borderRadius: 'var(--radius-badge)', padding: '12px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--medical)', lineHeight: 1.6 }}>
                AIMS returns {calc.annualDocHoursReturned} hrs/yr of physician time. That is {Math.round(calc.annualDocHoursReturned / 52)} fewer documentation hours per week. Physician burnout: measurably reduced.
              </p>
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
