import * as React from "react";
import { cn } from "@/lib/utils";

function Root({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      style={{ borderCollapse: "separate", borderSpacing: 0 }}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  );
}

function Header({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

function Body({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function Row({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b border-slate-100 transition-colors hover:bg-slate-50/70",
        className
      )}
      {...props}
    />
  );
}

function Head({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-10 px-3 text-left align-middle text-xs font-semibold uppercase tracking-wider text-mist",
        className
      )}
      {...props}
    />
  );
}

function Cell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "px-3 py-3.5 align-middle text-sm text-ink/80",
        className
      )}
      {...props}
    />
  );
}

function Caption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption className={cn("mt-2 text-sm text-mist", className)} {...props} />;
}

export { Caption, Body, Cell, Container, Head, Header, Root, Row };

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative w-full overflow-auto rounded-2xl", className)}
      {...props}
    />
  );
}