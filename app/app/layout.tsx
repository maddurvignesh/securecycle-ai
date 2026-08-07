import { AppShell } from "@/components/app-shell/AppShell";

export const metadata = {
  title: "SecureCycle AI — Platform",
  description: "Enterprise AI platform for secure data wiping & IT asset recycling.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}