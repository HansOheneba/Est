"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Check } from "lucide-react";

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) out.push(new Date(d)); // closed Sundays
  }
  return out;
}

export default function ViewingForm({ home }: { home: string }) {
  // dates are computed after mount so server and client markup match
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const days = useMemo(() => (mounted ? nextDays(8) : []), [mounted]);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  // a few slots look booked so the picker feels real
  const taken = new Set([(day * 2) % times.length, (day * 3 + 1) % times.length]);

  const ready = time && name.trim().length > 1 && phone.replace(/\D/g, "").length >= 9;

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)]">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest text-white">
              <Check className="h-8 w-8" />
            </motion.div>
            <p className="mt-5 font-serif text-2xl">Viewing requested</p>
            <p className="mt-2 text-sm text-ink/60">
              {home} on {days[day]?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} at {time}. We will call {name.split(" ")[0]} to confirm.
            </p>
            <button type="button" onClick={() => { setDone(false); setTime(null); }} className="mt-6 text-sm underline">Book another time</button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (ready) setDone(true);
            }}
          >
            <p className="flex items-center gap-2 font-serif text-2xl"><CalendarCheck className="h-5 w-5 text-brass" /> Book a viewing</p>
            <div className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-2">
              {days.length === 0
                ? Array.from({ length: 8 }, (_, i) => <span key={i} className="h-[62px] w-14 shrink-0 animate-pulse rounded-2xl bg-ink/5" />)
                : null}
              {days.map((d, i) => (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => { setDay(i); setTime(null); }}
                  className={`flex w-14 shrink-0 flex-col items-center rounded-2xl border py-2.5 transition ${i === day ? "border-forest bg-forest text-white" : "border-ink/10 hover:border-ink/30"}`}
                >
                  <span className="text-[10px] uppercase">{d.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                  <span className="font-serif text-xl">{d.getDate()}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {times.map((t, i) => {
                const off = taken.has(i);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={off}
                    onClick={() => setTime(t)}
                    className={`rounded-xl border py-2 text-sm transition ${off ? "cursor-not-allowed border-transparent bg-ink/5 text-ink/25 line-through" : time === t ? "border-brass bg-brass text-white" : "border-ink/10 hover:border-ink/30"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border border-ink/10 bg-ivory px-4 py-3 text-sm outline-none focus:border-forest" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (e.g. 024 123 4567)" inputMode="tel" className="w-full rounded-xl border border-ink/10 bg-ivory px-4 py-3 text-sm outline-none focus:border-forest" />
            </div>
            <button type="submit" disabled={!ready} className="mt-4 w-full rounded-xl bg-forest py-3.5 text-sm font-semibold text-white transition enabled:hover:bg-moss disabled:opacity-40">
              {time ? `Request ${time} viewing` : "Pick a time"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
