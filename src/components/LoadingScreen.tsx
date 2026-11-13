"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-b from-[#fde8ef] to-[#f6c9d4]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <motion.p
          className="font-[family-name:var(--font-script)] text-6xl text-rose-400"
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          ♡
        </motion.p>
        <p className="mt-4 font-serif text-xl tracking-wide text-rose-ink/80">
          just a moment
        </p>
      </div>
    </motion.div>
  );
}
