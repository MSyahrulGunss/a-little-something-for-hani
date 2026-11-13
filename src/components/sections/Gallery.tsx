"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { GalleryItem } from "@/config/site";

export function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section aria-labelledby="gallery-title">
      <h2
        id="gallery-title"
        className="text-center font-[family-name:var(--font-script)] text-4xl text-rose-ink"
      >
        {siteConfig.gallery.title}
      </h2>
      <p className="mx-auto mt-2 mb-6 max-w-lg text-center text-sm text-rose-ink/55">
        {siteConfig.gallery.subtitle}
      </p>

      <div className="columns-2 gap-3 sm:columns-3">
        {siteConfig.gallery.items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(item)}
            className="mb-3 block w-full overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={800}
              className="h-auto w-full object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <span className="block px-3 py-2 text-left text-xs text-rose-ink/65">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#6b3a4a]/55 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-h-[86vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-rose-ink shadow"
                aria-label="Close photo"
              >
                <X className="size-4" />
              </button>
              <Image
                src={active.src}
                alt={active.alt}
                width={1200}
                height={900}
                className="max-h-[74vh] w-full object-contain"
              />
              <figcaption className="px-5 py-3 text-center font-serif text-rose-ink/80">
                {active.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
