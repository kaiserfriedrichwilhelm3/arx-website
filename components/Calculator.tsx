'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

export default function Calculator() {
  const [leads, setLeads] = useState(200);
  const [closeRate, setCloseRate] = useState(15);
  const [dealValue, setDealValue] = useState(5000);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [isMedical, setIsMedical] = useState(false);
  const [monthlyPatients, setMonthlyPatients] = useState(400);

  const accentColor = isMedical ? 'var(--medical-blue)' : 'var(--gold)';

  const result = useMemo(() => {
    const convertedLeads = Math.round(leads * (closeRate / 100));
    const monthlyLeadValue = convertedLeads * dealValue;
    const monthlyTimeValue = hoursPerWeek * 4 * 75; // $75/hr opportunity cost
    const medicalBonus = isMedical ? monthlyPatients * 45 : 0; // $45 avg recovered per patient
    const total = monthlyLeadValue + monthlyTimeValue + medicalBonus;
    return { total, monthlyLeadValue, monthlyTimeValue, medicalBonus, convertedLeads };
  }, [leads, closeRate, dealValue, hoursPerWeek, isMedical, monthlyPatients]);

  const chartData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      withAIMS: Math.round(result.total * (1 + i * 0.04)),
      withoutAIMS: Math.round(result.total * 0.35 * (1 + i * 0.01)),
    }));
  }, [result.total]);

  const SliderRow = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    format,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    format: (v: number) => string;
  }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: 'var(--white)' }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', height: '4px', cursor: 'pointer' }}
      />
    </div>
  );

  return (
    <section id="calculator" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '56px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--gold)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            ROI CALCULATOR
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Model your return before you commit.
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
            Adjust the inputs below to see projected monthly value recovered by AIMS.
          </p>

          {/* Medical toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={() => setIsMedical(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 500,
                color: !isMedical ? 'var(--obsidian)' : 'var(--muted)',
                background: !isMedical ? 'var(--gold)' : 'transparent',
                border: `1px solid ${!isMedical ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-badge)',
                padding: '6px 14px',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                transition: 'all 0.2s ease',
              }}
            >
              BUSINESS
            </button>
            <button
              onClick={() => setIsMedical(true)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 500,
                color: isMedical ? 'var(--obsidian)' : 'var(--muted)',
                background: isMedical ? 'var(--medical-blue)' : 'transparent',
                border: `1px solid ${isMedical ? 'var(--medical-blue)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-badge)',
                padding: '6px 14px',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                transition: 'all 0.2s ease',
              }}
            >
              MEDICAL
            </button>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          {/* Left: sliders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            <SliderRow
              label="MONTHLY LEADS"
              value={leads}
              min={10}
              max={2000}
              step={10}
              onChange={setLeads}
              format={(v) => v.toLocaleString()}
            />
            <SliderRow
              label="CLOSE RATE"
              value={closeRate}
              min={1}
              max={50}
              step={1}
              onChange={setCloseRate}
              format={(v) => `${v}%`}
            />
            <SliderRow
              label="AVG DEAL VALUE"
              value={dealValue}
              min={500}
              max={100000}
              step={500}
              onChange={setDealValue}
              format={(v) => `$${v.toLocaleString()}`}
            />
            <SliderRow
              label="ADMIN HOURS / WEEK"
              value={hoursPerWeek}
              min={1}
              max={80}
              step={1}
              onChange={setHoursPerWeek}
              format={(v) => `${v}h`}
            />
            {isMedical && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <SliderRow
                  label="MONTHLY PATIENTS"
                  value={monthlyPatients}
                  min={50}
                  max={2000}
                  step={50}
                  onChange={setMonthlyPatients}
                  format={(v) => v.toLocaleString()}
                />
              </motion.div>
            )}

            {/* Result breakdown */}
            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {[
                { label: 'Revenue Recovery', value: result.monthlyLeadValue },
                { label: 'Time Value Recovered', value: result.monthlyTimeValue },
                ...(isMedical ? [{ label: 'Medical Billing Recovery', value: result.medicalBonus }] : []),
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--white)' }}>
                    {formatCurrency(row.value)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '12px',
                  marginTop: '4px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, color: 'var(--white)', letterSpacing: '0.06em' }}>
                  TOTAL / MONTH
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: accentColor,
                  }}
                >
                  {formatCurrency(result.total)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              padding: '32px',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                12-MONTH PROJECTION
              </span>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
              {[
                { label: 'With AIMS', color: isMedical ? 'var(--medical-blue)' : 'var(--gold)' },
                { label: 'Without AIMS', color: 'var(--muted)' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '16px', height: '2px', background: item.color, display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="aimsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isMedical ? '#4A9EFF' : '#D4AF37'}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor={isMedical ? '#4A9EFF' : '#D4AF37'}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="baseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#888888" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#888888" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,250,250,0.05)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontFamily: 'monospace', fontSize: 10, fill: '#888888' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => formatCurrency(v)}
                  tick={{ fontFamily: 'monospace', fontSize: 10, fill: '#888888' }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'var(--white)',
                  }}
                  formatter={(value) => [formatCurrency(Number(value)), '']}
                />
                <Area
                  type="monotone"
                  dataKey="withoutAIMS"
                  stroke="#888888"
                  strokeWidth={1.5}
                  fill="url(#baseGradient)"
                  strokeDasharray="4 4"
                />
                <Area
                  type="monotone"
                  dataKey="withAIMS"
                  stroke={isMedical ? '#4A9EFF' : '#D4AF37'}
                  strokeWidth={2}
                  fill="url(#aimsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
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
