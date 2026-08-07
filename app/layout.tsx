import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { AppProviders } from "@/components/providers/AppProviders";
import { CursorGlow } from "@/components/ui/CursorGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SecureCycle AI — Erase Data. Restore Trust. Sustain Tomorrow.",
  description:
    "AI-powered secure data wiping and trustworthy IT asset recycling. Every device has a story — we make sure it ends securely, verifiably, and sustainably.",
  metadataBase: new URL("https://securecycle.ai"),
  openGraph: {
    title: "SecureCycle AI",
    description: "Erase Data. Restore Trust. Sustain Tomorrow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrument.variable}`}>
      <body className="antialiased">
        <AppProviders>
          <ScrollProvider>
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[95] opacity-[0.022] mix-blend-multiply"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            <CursorGlow />
            {children}
          </ScrollProvider>
        </AppProviders>
      </body>
    </html>
  );
}
