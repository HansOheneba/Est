"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm text-bone/60">{label}</span>
        <span className="font-serif text-xl">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        className="w-full"
      />
    </label>
  );
}

export default function MortgageCalculator({ initialPrice = 850000 }: { initialPrice?: number }) {
  const [price, setPrice] = useState(initialPrice);
  const [depositPct, setDepositPct] = useState(30);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(9.5);

  const { monthly, principal, interest } = useMemo(() => {
    const p = price * (1 - depositPct / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    const m = r === 0 ? p / n : (p * r) / (1 - Math.pow(1 + r, -n));
    return { monthly: m, principal: p, interest: m * n - p };
  }, [price, depositPct, years, rate]);

  const deposit = price * (depositPct / 100);
  const total = deposit + principal + interest;
  const C = 2 * Math.PI * 70;
  const segs = [
    { label: "Deposit", value: deposit, color: "var(--color-amber)" },
    { label: "Loan", value: principal, color: "var(--color-clay)" },
    { label: "Interest", value: interest, color: "#5b4f45" },
  ];
  let offset = 0;

  return (
    <section id="calculator" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid items-center gap-12 rounded-[40px] bg-surface p-6 ring-1 ring-bone/5 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:p-14">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber">Plan it</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">What would it cost each month?</h2>
          <div className="mt-10 space-y-8">
            <Slider label="Home price" value={price} min={150000} max={2500000} step={10000} onChange={setPrice} display={`$${price.toLocaleString()}`} />
            <Slider label="Deposit" value={depositPct} min={10} max={70} step={5} onChange={setDepositPct} display={`${depositPct}%`} />
            <Slider label="Term" value={years} min={5} max={25} step={1} onChange={setYears} display={`${years} years`} />
            <Slider label="Interest rate" value={rate} min={5} max={20} step={0.25} onChange={setRate} display={`${rate.toFixed(2)}%`} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <svg viewBox="0 0 180 180" className="h-72 w-72 -rotate-90">
              <circle cx="90" cy="90" r="70" fill="none" stroke="#2b2520" strokeWidth="22" />
              {segs.map((s) => {
                const len = (s.value / total) * C;
                const el = (
                  <motion.circle
                    key={s.label}
                    cx="90"
                    cy="90"
                    r="70"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="22"
                    animate={{ strokeDasharray: `${len} ${C - len}`, strokeDashoffset: -offset }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                );
                offset += len;
                return el;
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-wider text-bone/50">Monthly</span>
              <motion.span key={Math.round(monthly)} initial={{ y: 6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-4xl text-clay">
                ${Math.round(monthly).toLocaleString()}
              </motion.span>
            </div>
          </div>
          <ul className="mt-8 w-full max-w-xs space-y-3 text-sm">
            {segs.map((s) => (
              <li key={s.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: s.color }} />{s.label}</span>
                <span className="tabular-nums">${Math.round(s.value).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-xs text-bone/45">Illustrative only. Speak to us for lender introductions.</p>
        </div>
      </div>
    </section>
  );
}
