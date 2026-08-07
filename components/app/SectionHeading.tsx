import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
        {desc ? <p className="mt-1 max-w-xl text-[13px] text-mist">{desc}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  desc,
  action,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  desc?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink/10 bg-cloud/40 px-6 py-16 text-center", className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 ring-1 ring-primary-100">
        {icon}
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">{title}</p>
      {desc ? <p className="mt-1 max-w-sm text-[13px] text-mist">{desc}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}