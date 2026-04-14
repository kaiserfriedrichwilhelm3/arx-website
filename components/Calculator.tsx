'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000).toLocaleString()}K`;
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
  note?: string;
  noteColor?: string;
}

function SliderRow({ label, value, min, max, step, onChange, display, note, noteColor }: SliderRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--gold)', fontWeight: 500 }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {note && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: noteColor || 'var(--muted)' }}>{note}</span>}
    </div>
  );
}

export default function Calculator() {
  const shouldReduce = useReducedMotion();
  const [monthlyLeads, setMonthlyLeads] = useState(50);
  const [responseTime, setResponseTime] = useState(45);
  const [avgDeal, setAvgDeal] = useState(3000);
  const [sdrCount, setSdrCount] = useState(1);
  const [includeHumanError, setIncludeHumanError] = useState(false);
  const [showMath, setShowMath] = useState(false);

  const calc = useMemo(() => {
    const t = responseTime;
    const decayMultiplier =
      t <= 0.5  ? 1.00 :
      t <= 5    ? 0.90 :
      t <= 30   ? 0.35 :
      t <= 60   ? 0.20 :
      t <= 120  ? 0.10 : 0.05;

    const leadsLostToDecay = Math.round(monthlyLeads * (1 - decayMultiplier));
    const decayRevenueLoss = leadsLostToDecay * avgDeal * 0.25;
    const humanErrorLoss = includeHumanError ? Math.round(monthlyLeads * avgDeal * 0.08) : 0;
    const sdrCost = sdrCount * 5200;
    const totalMonthlyLoss = decayRevenueLoss + humanErrorLoss + sdrCost;
    const aimsEstCost = 499;
    const monthlyOpportunity = totalMonthlyLoss - aimsEstCost;
    const yearOneOpportunity = monthlyOpportunity * 12;
    const leadsRecoverable = Math.round(monthlyLeads * decayMultiplier * 12);
    const sdrAnnual = sdrCost * 12;
    const chartData = Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      lost: Math.round(totalMonthlyLoss * (i + 1)),
      captured: Math.round(Math.max(monthlyOpportunity, 0) * (i + 1)),
    }));

    return {
      yearOneOpportunity, leadsRecoverable, sdrAnnual, chartData,
      decayMultiplier, leadsLostToDecay, humanErrorLoss, sdrCost, monthlyOpportunity,
    };
  }, [monthlyLeads, responseTime, avgDeal, sdrCount, includeHumanError]);

  const animatedValue = useCountUp(Math.max(Math.round(calc.yearOneOpportunity), 0));

  return (
    <section id="calculator" style={{ padding: '96px 32px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Estimate Your Opportunity
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            // projection model based on industry benchmarks
          </p>
        </motion.div>

        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
            This calculator uses published industry averages to model potential value. AIMS has not yet launched. Results will vary by business.
          </span>
        </div>

        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Inputs */}
          <div style={{ background: 'var(--obsidian)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SliderRow label="Monthly Inbound Leads" value={monthlyLeads} min={10} max={500} step={5} onChange={setMonthlyLeads} display={monthlyLeads.toLocaleString()} />
            <SliderRow label="Current Lead Response Time" value={responseTime} min={1} max={240} step={1} onChange={setResponseTime} display={`${responseTime} min`}
              note="⚠  A lead called within 30 seconds is up to 100× more likely to convert than one called after 5 minutes."
              noteColor="var(--danger)" />
            <SliderRow label="Average Deal Value ($)" value={avgDeal} min={500} max={25000} step={250} onChange={setAvgDeal} display={`$${avgDeal.toLocaleString()}`} />
            <SliderRow label="Current SDR Headcount" value={sdrCount} min={0} max={10} step={1} onChange={setSdrCount} display={`${sdrCount} person${sdrCount !== 1 ? 's' : ''}`}
              note="Average fully-loaded SDR cost: ~$5,200/mo" />

            {/* Human Error Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Include Human Error Cost</span>
                <div
                  onClick={() => setIncludeHumanError(!includeHumanError)}
                  style={{
                    width: '36px', height: '20px', borderRadius: '10px', cursor: 'pointer',
                    background: includeHumanError ? 'var(--gold)' : 'var(--surface-2)',
                    border: `1px solid ${includeHumanError ? 'var(--gold)' : 'var(--border)'}`,
                    position: 'relative', transition: 'background 0.2s, border-color 0.2s',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '3px', width: '12px', height: '12px', borderRadius: '50%',
                    background: includeHumanError ? '#0A0A0A' : 'var(--muted)',
                    left: includeHumanError ? '21px' : '3px',
                    transition: 'left 0.2s, background 0.2s',
                  }} />
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
                Industry avg: ~8% of deals lost to manual errors (wrong data entry, missed follow-up, double-booking)
              </span>
              {includeHumanError && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)' }}>
                  + {fmt(calc.humanErrorLoss)}/mo added to loss column
                </span>
              )}
            </div>

            {/* Show the math */}
            <div>
              <div
                onClick={() => setShowMath(!showMath)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textDecoration: 'underline', cursor: 'pointer', marginBottom: '8px' }}
              >
                {showMath ? '▲ Hide the math' : '▼ How we calculate this'}
              </div>
              {showMath && (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-badge)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    `Lead Decay Loss = ${calc.leadsLostToDecay} leads × $${avgDeal.toLocaleString()} × 25% close rate`,
                    `Speed-to-Lead: ${responseTime}min response → ${Math.round((1 - calc.decayMultiplier) * 100)}% of leads lost`,
                    ...(includeHumanError ? [`Human Error: ${monthlyLeads} leads × $${avgDeal.toLocaleString()} × 8%`] : []),
                    `SDR Overhead: ${sdrCount} SDR(s) × $5,200/mo`,
                    `Less estimated AIMS cost: $499/mo`,
                    `Net Monthly Opportunity: ${fmt(calc.monthlyOpportunity)}`,
                  ].map((line, i) => (
                    <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6 }}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Output */}
          <div style={{ background: 'var(--obsidian)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Projected Year 1 Revenue Opportunity
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '8px' }}>
                Based on your inputs + industry benchmarks
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '56px', fontWeight: 500, color: 'var(--gold)', lineHeight: 1 }}>
                {fmt(animatedValue)}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={calc.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lostGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4444" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#FF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="capturedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => fmt(Number(v))} tick={{ fontFamily: 'monospace', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ background: '#111111', border: '1px solid var(--border-gold)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '11px', color: '#FAFAFA' }} formatter={(v) => [fmt(Number(v)), '']} />
                <Area type="monotone" dataKey="lost" stroke="#FF4444" strokeWidth={1.5} fill="url(#lostGrad)" name="Revenue Lost (Current State)" isAnimationActive />
                <Area type="monotone" dataKey="captured" stroke="#D4AF37" strokeWidth={2} fill="url(#capturedGrad)" name="Opportunity Captured (With AIMS)" isAnimationActive />
              </AreaChart>
            </ResponsiveContainer>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'Leads Recaptured / yr', val: calc.leadsRecoverable.toLocaleString() },
                { label: 'SDR Cost Eliminated', val: fmt(calc.sdrAnnual) },
                { label: 'Response Target', val: '<30 sec' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--gold)', marginTop: '2px' }}>{s.val}</div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', fontStyle: 'italic', marginTop: '4px' }}>
              Projections use published conversion research and industry cost averages. Not a performance guarantee from ARX Systems.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
