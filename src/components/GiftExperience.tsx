"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MainGift } from "@/components/MainGift";
import { SecretGate } from "@/components/SecretGate";
import { SoftCursor } from "@/components/decorations/SoftCursor";
import { siteConfig } from "@/config/site";
import type { SectionId } from "@/lib/types";

type Phase = "loading" | "gate" | "main";

export function GiftExperience() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [section, setSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const already =
      typeof window !== "undefined" &&
      sessionStorage.getItem(siteConfig.unlockStorageKey) === "1";
    const params = new URLSearchParams(window.location.search);
    const skip =
      siteConfig.allowSkipSecretCode &&
      (params.get("skip") === "1" || already);

    const timer = window.setTimeout(() => {
      setPhase(skip ? "main" : "gate");
    }, 1100);

    return () => window.clearTimeout(timer);
  }, []);

  const unlock = () => {
    sessionStorage.setItem(siteConfig.unlockStorageKey, "1");
    setPhase("main");
  };

  return (
    <>
      <SoftCursor />
      <AnimatePresence>{phase === "loading" ? <LoadingScreen /> : null}</AnimatePresence>
      {phase === "gate" ? <SecretGate onUnlock={unlock} /> : null}
      {phase === "main" ? (
        <MainGift section={section} onSection={setSection} />
      ) : null}
    </>
  );
}
