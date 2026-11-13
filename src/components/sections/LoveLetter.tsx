"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const letter = siteConfig.letter;

  return (
    <section aria-labelledby="letter-title" className="mx-auto max-w-2xl">
      <h2 id="letter-title" className="sr-only">
        {letter.title}
      </h2>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="envelope"
            type="button"
            onClick={() => setOpened(true)}
            className="group relative mx-auto block w-full max-w-md text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            aria-label={`${letter.title}. ${letter.envelopeLabel}`}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-[#f0c3d0] bg-[#fde8ef] shadow-[var(--shadow)]">
              <div className="absolute inset-x-0 top-0 h-[46%] origin-top bg-[#f4b8c8] [clip-path:polygon(0_0,50%_78%,100%_0)] transition duration-500 group-hover:brightness-105" />
              <div className="relative flex min-h-[240px] flex-col items-center justify-end px-6 pb-8 pt-24">
                <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-white text-xl text-rose-400 shadow-sm">
                  ♡
                </span>
                <p className="font-[family-name:var(--font-script)] text-3xl text-rose-ink">
                  {letter.title}
                </p>
                <p className="mt-2 text-sm text-rose-ink/60">{letter.envelopeLabel}</p>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.article
            key="letter"
            initial={{ opacity: 0, y: 40, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="paper-grain relative overflow-hidden rounded-[28px] border border-[#ead9c6] px-7 py-10 shadow-[var(--shadow)] sm:px-12 sm:py-12"
          >
            <p className="text-center font-[family-name:var(--font-script)] text-4xl text-rose-ink">
              {letter.title}
            </p>
            <p className="mt-8 font-[family-name:var(--font-script)] text-3xl text-rose-400">
              {letter.greeting}
            </p>
            <div className="mt-6 space-y-5 font-serif text-lg leading-8 text-rose-ink/85">
              {letter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 text-right font-[family-name:var(--font-script)] text-2xl text-rose-400">
              {siteConfig.senderSignOff}
            </p>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
