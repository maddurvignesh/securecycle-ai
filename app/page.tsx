"use client";

import { useState } from "react";
import { IntroCinematic } from "@/components/intro/IntroCinematic";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Chapters } from "@/components/chapters/Chapters";
import { Features } from "@/components/features/Features";
import { InteractiveLaptop } from "@/components/wow/InteractiveLaptop";
import { ImpactStats } from "@/components/stats/ImpactStats";
import { FinalCTA } from "@/components/final/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <span id="top" />
      {!introDone && <IntroCinematic onComplete={() => setIntroDone(true)} />}

      <Nav active={introDone} />

      <main>
        <Hero active={introDone} />
        <Chapters />
        <Features />
        <InteractiveLaptop />
        <ImpactStats />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
