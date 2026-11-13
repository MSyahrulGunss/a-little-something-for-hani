"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PillNav } from "@/components/PillNav";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { Flowers } from "@/components/sections/Flowers";
import { Gallery } from "@/components/sections/Gallery";
import { LoveLetter } from "@/components/sections/LoveLetter";
import { Music } from "@/components/sections/Music";
import { Notes } from "@/components/sections/Notes";
import { FloatingHearts } from "@/components/decorations/FloatingHearts";
import { ArrowDown, Sparkles } from "lucide-react";
import type { SectionId } from "@/lib/types";

type MainGiftProps = {
  section: SectionId | null;
  onSection: (id: SectionId | null) => void;
};

export function MainGift({ section, onSection }: MainGiftProps) {
  return (
    <div className="relative min-h-dvh pb-16">
      <FloatingHearts count={5} />
      <WelcomeHeader compact={Boolean(section)} onHome={() => onSection(null)} />
      <div className="mt-6">
        <PillNav active={section} onSelect={onSection} />
      </div>
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={section ?? "welcome"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {!section ? (
              <section className="relative mx-auto max-w-2xl overflow-hidden rounded-[32px] border border-white/80 bg-white/65 px-6 py-10 text-center shadow-[var(--shadow)] backdrop-blur-sm sm:px-12 sm:py-14">
                <span className="absolute -right-8 -top-8 size-36 rounded-full bg-[#f8d5de]/70 blur-2xl" aria-hidden />
                <span className="absolute -bottom-10 -left-6 size-36 rounded-full bg-[#fff3dd]/80 blur-2xl" aria-hidden />
                <div className="relative">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-rose-100 bg-white/80 text-rose-400 shadow-sm">
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-rose-400">A small thing, made with care</p>
                  <p className="mx-auto mt-4 max-w-lg font-serif text-xl leading-8 text-rose-ink/75 sm:text-2xl">
                    A few gentle words, songs, and pretty things gathered here for you.
                  </p>
                  <button
                    type="button"
                    onClick={() => onSection("letter")}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e8a0b4] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#d989a2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                  >
                    Read a little note <ArrowDown className="size-4" aria-hidden />
                  </button>
                  <p className="mt-5 text-xs text-rose-ink/45">Take your time. There&apos;s no need to respond to any of it.</p>
                </div>
              </section>
            ) : null}
            {section === "letter" ? <LoveLetter /> : null}
            {section === "music" ? <Music /> : null}
            {section === "notes" ? <Notes /> : null}
            {section === "gallery" ? <Gallery /> : null}
            {section === "flowers" ? <Flowers /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
