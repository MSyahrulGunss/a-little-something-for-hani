"use client";

const sparks = [
  { top: "12%", left: "8%" },
  { top: "18%", left: "88%" },
  { top: "72%", left: "10%" },
  { top: "80%", left: "84%" },
  { top: "40%", left: "94%" },
];

export function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {sparks.map((spark, index) => (
        <span
          key={`${spark.top}-${spark.left}`}
          className="sparkle absolute text-xs text-white/80"
          style={{
            top: spark.top,
            left: spark.left,
            animationDelay: `${index * 0.4}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
