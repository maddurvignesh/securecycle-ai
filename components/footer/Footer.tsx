import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Product",
    links: ["Secure Wiping", "AI Risk Assessment", "Certificates", "Asset Lifecycle", "Analytics"],
  },
  {
    title: "Compliance",
    links: ["NIST 800-88", "DoD 5220.22-M", "ISO 27001", "GDPR", "R2 / e-Stewards"],
  },
  {
    title: "Company",
    links: ["About", "Sustainability", "Careers", "Press", "Contact"],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-ink/8 bg-cloud/60">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            AI-powered secure data wiping and trustworthy IT asset recycling. Every device has a
            story — we make sure it ends securely.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {["x", "in", "gh"].map((s) => (
              <a
                key={s}
                href="#top"
                aria-label={`SecureCycle on ${s}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/8 bg-white text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-600"
              >
                <span className="font-mono text-xs font-bold uppercase">{s}</span>
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((c) => (
          <div key={c.title}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">{c.title}</h4>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#top"
                    className="text-sm text-mist transition-colors hover:text-primary-600"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/8">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-mist sm:flex-row">
          <p>© 2026 SecureCycle AI · Erase Data. Restore Trust. Sustain Tomorrow.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            Systems operational · 99.99% uptime
          </p>
        </div>
      </div>

      {/* giant wordmark */}
      <div
        className="pointer-events-none select-none overflow-hidden text-center"
        aria-hidden
      >
        <span
          className="block font-semibold leading-[0.8] tracking-tighter text-ink/5"
          style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
        >
          SecureCycle
        </span>
      </div>
    </footer>
  );
}
