"use client";

import { useEffect, useState } from "react";

export function SoftCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    document.body.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      className="soft-cursor pointer-events-none fixed z-[80] mix-blend-multiply"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden
    >
      <span className="block text-lg leading-none text-rose-400 opacity-80">
        ♡
      </span>
    </div>
  );
}
