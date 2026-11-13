"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { FloatingHearts } from "@/components/decorations/FloatingHearts";
import { Sparkles } from "@/components/decorations/Sparkles";

type SecretGateProps = {
  onUnlock: () => void;
};

export function SecretGate({ onUnlock }: SecretGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(0);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const expected = siteConfig.secretCode.trim().toLowerCase();
    const given = code.trim().toLowerCase();

    if (given === expected) {
      setError("");
      onUnlock();
      return;
    }

    setError(siteConfig.gate.error);
    setShake((value) => value + 1);
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <FloatingHearts />
      <Sparkles />

      <motion.section
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: shake === 0 ? 0 : [0, -8, 8, -5, 5, 0],
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-[28px] border border-white/70 bg-white/90 px-7 py-10 text-center shadow-[var(--shadow)] backdrop-blur-sm"
        aria-labelledby="gate-title"
      >
        <p className="mb-3 text-rose-300" aria-hidden>
          ✦ ♡ ✦
        </p>
        <h1
          id="gate-title"
          className="font-[family-name:var(--font-script)] text-4xl leading-tight text-rose-ink sm:text-5xl"
        >
          {siteConfig.gate.title}
        </h1>
        <p className="mt-3 font-serif text-lg text-rose-ink/70">
          {siteConfig.gate.subtitle}
        </p>

        {/* <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="sr-only" htmlFor="secret-code">
            Secret code
          </label>
          <input
            id="secret-code"
            type="text"
            autoComplete="off"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              if (error) setError("");
            }}
            placeholder={siteConfig.gate.placeholder}
            className="w-full rounded-full border border-[#f3c5d2] bg-[#fff9fb] px-5 py-3 text-center text-base tracking-[0.18em] text-rose-ink outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
          />
          {error ? (
            <p className="text-sm text-rose-500" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-full bg-[#e8a0b4] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#d989a2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          >
            {siteConfig.gate.enterLabel}
          </button>
        </form> */}

        {siteConfig.allowSkipSecretCode ? (
          <button
            type="button"
            onClick={onUnlock}
            className="mt-5 text-sm text-rose-ink/45 underline decoration-rose-200 underline-offset-4 transition hover:text-rose-ink/70"
          >
            {siteConfig.gate.skipLabel}
          </button>
        ) : null}
      </motion.section>
    </div>
  );
}
