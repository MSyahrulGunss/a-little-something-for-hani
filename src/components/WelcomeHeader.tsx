"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { siteConfig } from "@/config/site";

type WelcomeHeaderProps = {
  compact?: boolean;
  onHome: () => void;
};

export function WelcomeHeader({ compact, onHome }: WelcomeHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-5 pt-10 text-center">
      <div className="mb-4 flex justify-center">
        <button
          type="button"
          onClick={onHome}
          className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-xs text-rose-ink/70 shadow-sm transition hover:bg-white"
        >
          <Home className="size-3.5" aria-hidden />
          Back to the beginning
        </button>
      </div>
      <motion.h1
        layout
        className={`font-[family-name:var(--font-script)] text-rose-ink ${
          compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"
        }`}
      >
        {siteConfig.welcome.greeting}
      </motion.h1>
      <p className="mt-3 font-serif text-xl text-rose-ink/75 sm:text-2xl">
        {siteConfig.welcome.subheading}
      </p>
      {!compact ? (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-rose-ink/60">
          {siteConfig.welcome.note}
        </p>
      ) : null}
    </header>
  );
}
