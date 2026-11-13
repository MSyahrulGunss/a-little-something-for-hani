"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import type { NoteColor } from "@/config/site";

const colors: Record<NoteColor, string> = {
  blush: "bg-[#f8d5de]",
  cream: "bg-[#fff3dd]",
  lilac: "bg-[#ead9f0]",
  mint: "bg-[#d8efe4]",
  peach: "bg-[#fde3d0]",
  sky: "bg-[#d7e8f7]",
};

export function Notes() {
  return (
    <section aria-labelledby="notes-title">
      <h2
        id="notes-title"
        className="mb-6 text-center font-[family-name:var(--font-script)] text-4xl text-rose-ink"
      >
        {siteConfig.notes.title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.notes.items.map((note, index) => (
          <motion.article
            key={note.text}
            initial={{ opacity: 0, y: 18 }}
            animate={{
              opacity: 1,
              y: [0, index % 2 === 0 ? -6 : 6, 0],
            }}
            transition={{
              opacity: { delay: index * 0.06, duration: 0.4 },
              y: {
                delay: 0.4,
                duration: 5 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`${colors[note.color]} rounded-2xl border border-white/70 p-5 shadow-[0_10px_24px_rgba(196,92,122,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(196,92,122,0.18)]`}
          >
            <p className="font-serif text-lg leading-7 text-rose-ink/90">{note.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
