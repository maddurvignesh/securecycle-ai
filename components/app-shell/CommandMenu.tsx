"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@/components/app-ui/command";
import {
  BarChart3,
  FileText,
  HardDrive,
  ShieldCheck,
  Sparkles,
  ScrollText,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

const NAV = [
  { href: "/app/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/app/assets", label: "Assets", icon: HardDrive },
  { href: "/app/secure-wipe", label: "Secure Wipe", icon: ShieldCheck },
  { href: "/app/risk", label: "Risk Assessment", icon: Sparkles },
  { href: "/app/certificates", label: "Certificates", icon: ScrollText },
  { href: "/app/reports", label: "Reports", icon: FileText },
];

export function CommandMenu() {
  const router = useRouter();
  const { assets, unreadCount } = useApp();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onCustom = () => setOpen(true);
    window.addEventListener("keydown", down);
    window.addEventListener("app-open-search", onCustom);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("app-open-search", onCustom);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Search">
      <CommandInput placeholder="Search assets, actions, pages…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {NAV.map((n) => (
            <CommandItem key={n.href} onSelect={() => go(n.href)}>
              <n.icon className="text-mist" />
              {n.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Assets">
          {assets.slice(0, 6).map((a) => (
            <CommandItem key={a.id} onSelect={() => go("/app/assets")}>
              <HardDrive className="text-mist" />
              <span>{a.name}</span>
              <CommandShortcut>{a.serial}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => go("/app/secure-wipe")}>
            <ShieldCheck className="text-success-500" />
            Start a new secure wipe
            <CommandShortcut>↩</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => go("/app/risk")}>
            <AlertTriangle className="text-amber-500" />
            Review {unreadCount || 0} open risk flags
          </CommandItem>
          <CommandItem onSelect={() => go("/app/reports")}>
            <FileText className="text-primary-500" />
            Generate a compliance report
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}