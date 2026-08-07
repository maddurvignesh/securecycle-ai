"use client";

export function ChapterVisual({ index }: { index: number }) {
  switch (index) {
    case 0: return <Problem />;
    case 1: return <Detection />;
    case 2: return <Wiping />;
    case 3: return <Verification />;
    case 4: return <CertVisual />;
    case 5: return <Recycle />;
    default: return <Dashboard />;
  }
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-80 w-full max-w-md" aria-hidden>
      <div className="absolute inset-0 rounded-3xl border border-ink/6 bg-white/70 shadow-lift backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl">
        {children}
      </div>
    </div>
  );
}

function Problem() {
  return (
    <Frame>
      {/* drive chip */}
      <div className="relative">
        <div className="h-40 w-56 rounded-2xl border border-ink/10 bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-mist">SSD-2048 · decommissioned</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5v.5" /></svg>
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {["HR Records", "Passwords.kdbx", "Customers.db"].map((f, i) => (
              <div key={f} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-400/70" />
                <span className="font-mono text-[10px] text-ink/70">{f}</span>
                <span className="ml-auto font-mono text-[9px] text-rose-400">breach risk</span>
              </div>
            ))}
          </div>
          {/* crack */}
          <svg viewBox="0 0 200 40" className="absolute inset-x-0 bottom-6 opacity-70">
            <path d="M20 0l14 22-6 8 10 10" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* leaked docs */}
        {[
          { x: "-40%", y: "-10%", r: 24 },
          { x: "110%", y: "-30%", r: 30 },
          { x: "120%", y: "40%", r: 22 },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute opacity-30"
            style={{ left: "50%", top: "50%", transform: `translate(${d.x}, ${d.y}) rotate(${i * 12 - 8}deg)` }}
          >
            <div className="h-12 w-9 rounded border border-ink/10 bg-white shadow-card">
              <div className="mx-auto mt-2 h-1 w-5 rounded bg-ink/15" />
              <div className="mx-auto mt-1 h-1 w-5 rounded bg-ink/10" />
              <div className="mx-2 mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-50">
                <span className="text-[8px] text-rose-500">×</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Detection() {
  return (
    <Frame>
      <div className="relative flex items-center gap-8">
        {/* radar */}
        <div className="relative h-36 w-36">
          <div className="absolute inset-0 rounded-full border border-primary-200" />
          <div className="absolute inset-4 rounded-full border border-primary-200/70" />
          <div className="absolute inset-9 rounded-full border border-primary-200/50" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, rgb(37 99 235 / 0.35), transparent 30%)",
              animation: "spin 3.2s linear infinite",
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500" />
        </div>
        {/* doc + scan lines */}
        <div className="relative h-36 w-28 rounded-xl border border-ink/10 bg-white p-3 shadow-card">
          <div className="h-2 w-10 rounded bg-ink/20" />
          <div className="mt-3 space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-1.5 rounded-full bg-ink/10" style={{ width: `${70 - i * 10}%` }} />
            ))}
          </div>
          <div
            className="absolute inset-x-1.5 h-[2px] rounded-full bg-primary-500 shadow-[0_0_10px_rgb(37_99_235/0.8)] anim-scanline"
          />
        </div>
        {/* percent */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-5xl font-bold tracking-tight text-primary-600">98%</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mist">detected</span>
        </div>
      </div>
    </Frame>
  );
}

function Wiping() {
  return (
    <Frame>
      <div className="flex flex-col items-center">
        <div className="relative h-48 w-48">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle cx="100" cy="100" r="82" fill="none" stroke="rgb(17 24 39 / 0.07)" strokeWidth="14" />
            <circle
              cx="100" cy="100" r="82" fill="none" stroke="url(#wipeGrad)" strokeWidth="14" strokeLinecap="round"
              strokeDasharray="515" strokeDashoffset="0"
              className="anim-wipe-ring"
            />
            <defs>
              <linearGradient id="wipeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-4xl font-bold text-ink">7</span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-mist">passes</span>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-full border border-ink/8 bg-white px-4 py-2 shadow-soft">
          <span className="h-2 w-2 rounded-full bg-success-500" />
          <span className="font-mono text-xs font-semibold text-ink">NIST 800-88 · DoD 5220.22-M</span>
        </div>
      </div>
    </Frame>
  );
}

function Verification() {
  return (
    <Frame>
      <div className="relative flex h-56 w-56 items-center justify-center">
        {/* pulsing rings */}
        <div className="absolute inset-4 rounded-full border border-success-200 animate-pulse-ring" />
        <div className="absolute inset-10 rounded-full border border-success-300/70 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
        <svg viewBox="0 0 200 200" className="relative h-44 w-44">
          <path
            d="M100 18l62 24v52c0 44-26 76-62 88-36-12-62-44-62-88V42z"
            fill="rgb(34 197 94 / 0.08)"
            stroke="url(#verifGrad)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M132 76l-44 52-18-20"
            fill="none"
            stroke="#22C55E"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="anim-draw-check"
          />
          <defs>
            <linearGradient id="verifGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#22C55E" />
              <stop offset="1" stopColor="#16A34A" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-soft">
          <span className="font-mono text-xs font-bold text-success-600">0%</span>
          <span className="text-[9px] uppercase tracking-widest text-mist">recoverable</span>
        </div>
      </div>
    </Frame>
  );
}

function CertVisual() {
  return (
    <Frame>
      <div className="relative mx-auto w-72 rounded-2xl border border-ink/10 bg-white p-5 shadow-lift">
        <div className="absolute inset-1.5 rounded-xl border border-[#D97706]/25" />
        <div className="relative flex items-center justify-between">
          <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-ink/60">Certificate of Erasure</span>
          <span className="rounded-full bg-success-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-success-600 ring-1 ring-success-200">
            Passed
          </span>
        </div>
        <div className="relative mt-4 flex items-center gap-3">
          <div className="flex-1 space-y-1.5">
            {["MacBook Pro 14\"", "NIST 800-88 · 3-pass", "06 Aug 2026"].map((r) => (
              <div key={r} className="flex items-center justify-between border-b border-dashed border-ink/10 pb-1 text-[9px]">
                <span className="text-mist">{r.split(" · ")[0]}</span>
                <span className="font-medium text-ink">{r.split(" · ")[1] ?? r.split(" · ")[0]}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1">
            <svg viewBox="0 0 60 60" className="h-12 w-12">
              <circle cx="30" cy="30" r="27" fill="none" stroke="#D97706" strokeWidth="2" />
              <path d="M30 20l3 6 6.8 1-4.9 4.8 1.1 6.8L30 35.8l-6 3.2 1.1-6.8-4.9-4.8 6.8-1z" fill="#D97706" />
            </svg>
            <div className="grid h-9 w-9 grid-cols-5 gap-px rounded border border-ink/10 bg-white p-0.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} className={i % 3 === 0 ? "bg-ink" : "bg-ink/5"} />
              ))}
            </div>
          </div>
        </div>
        <div className="relative mt-3 text-[8px] text-primary-600">verify.securecycle.ai/SC-24D-88731</div>
      </div>
    </Frame>
  );
}

function Recycle() {
  return (
    <Frame>
      <div className="relative flex items-center justify-center">
        <div className="relative h-48 w-48">
          <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
            <g fill="none" stroke="url(#rcv)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
              <path d="M100 34a66 66 0 0 1 55 32M155 66l4-30-31 7" />
              <path d="M100 166a66 66 0 0 1-55-32M45 134l-4 30 31-7" />
              <path d="M45 100a66 66 0 0 1 55-32" />
            </g>
            <circle cx="100" cy="100" r="18" fill="url(#rcv)" />
            <defs>
              <linearGradient id="rcv" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute -right-6 top-0 h-24 w-24 animate-float">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="88" fill="#2563EB" opacity="0.9" />
            <path d="M96 40c-20 8-30 30-24 48 4 14 16 22 12 38-3 16-16 22-18 36" fill="none" stroke="#4ADE80" strokeWidth="10" strokeLinecap="round" />
            <circle cx="90" cy="90" r="16" fill="rgb(74 222 128 / 0.5)" />
          </svg>
        </div>
        <div className="absolute -left-10 bottom-0 flex items-end gap-1.5">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 60 90" className="w-8">
              <line x1="30" y1="88" x2="30" y2="52" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
              <path d="M30 16c-8 7-13 15-11 25-7 3-10 9-8 16 1 8 8 11 13 10-3 8 2 12 6 12s9-4 6-12c5 1 13-2 14-10 2-7-1-13-8-16-2-10-7-18-12-25z" fill="#22C55E" />
            </svg>
          ))}
        </div>
        <div className="absolute -right-8 -bottom-4 rounded-2xl border border-ink/8 bg-white px-4 py-2 text-center shadow-soft">
          <span className="font-mono text-lg font-bold text-success-600">245T</span>
          <p className="text-[8px] uppercase tracking-widest text-mist">CO₂e saved</p>
        </div>
      </div>
    </Frame>
  );
}

function Dashboard() {
  const bars = [34, 58, 42, 76, 52, 88, 64, 96];
  return (
    <Frame>
      <div className="w-80 rounded-2xl border border-ink/8 bg-white p-4 shadow-lift">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-success-400" />
          </div>
          <span className="font-mono text-[9px] text-mist">securecycle.ai/ops</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Devices", "4,521"],
            ["Wipe rate", "98%"],
            ["CO₂e saved", "245T"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-ink/6 bg-cloud p-2.5">
              <p className="font-mono text-base font-bold text-ink">{v}</p>
              <p className="text-[8px] uppercase tracking-wider text-mist">{k}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-ink/6 bg-cloud p-3">
          <div className="flex items-center justify-between text-[9px] text-mist">
            <span>Wipe throughput</span>
            <span className="flex items-center gap-1 text-success-600">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500" /> live
            </span>
          </div>
          <div className="mt-2 flex h-14 items-end gap-1.5">
            {bars.map((b, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary-600 to-primary-400"
                style={{ height: `${b}%`, animation: `float-y ${2 + (i % 3)}s ease-in-out ${i * 0.12}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
