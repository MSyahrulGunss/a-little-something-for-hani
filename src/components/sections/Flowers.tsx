"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const petals = Array.from({ length: 10 }, (_, i) => ({
  left: `${8 + i * 9}%`,
  delay: `${i * 0.8}s`,
  size: 10 + (i % 3) * 4,
}));

export function Flowers() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/50 px-4 py-10 shadow-[var(--shadow)] sm:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {petals.map((petal) => (
          <span
            key={petal.left}
            className="petal absolute top-[-8%] text-rose-300"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              fontSize: petal.size,
            }}
          >
            ❀
          </span>
        ))}
      </div>

      <h2 className="relative text-center font-[family-name:var(--font-script)] text-4xl text-rose-ink sm:text-5xl">
        {siteConfig.flowers.title}
      </h2>
      <p className="relative mt-3 text-center font-serif text-lg text-rose-ink/70">
        {siteConfig.flowers.subtitle}
      </p>

      <div className="relative mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {siteConfig.flowers.blooms.map((bloom, index) => {
          return (
            <motion.figure
              key={bloom.id}
              className="bloom overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-2 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:p-3"
              style={{ animationDelay: `${index * 0.2}s` }}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 * index, duration: 0.7 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-rose-50">
                <Image
                  src={bloom.src}
                  alt={bloom.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-cover transition duration-500 hover:scale-[1.04]"
                />
              </div>
              <figcaption className="px-1 pb-2 pt-3">
                <p className="font-serif text-lg text-rose-ink sm:text-xl">{bloom.name}</p>
                <p className="mt-1 text-xs leading-5 text-rose-ink/55 sm:text-sm">{bloom.meaning}</p>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
