"use client";

const hearts = [
  { left: "8%", delay: "0s", size: 14 },
  { left: "18%", delay: "2.2s", size: 10 },
  { left: "32%", delay: "1.1s", size: 16 },
  { left: "47%", delay: "3.4s", size: 11 },
  { left: "61%", delay: "0.6s", size: 13 },
  { left: "74%", delay: "2.8s", size: 9 },
  { left: "86%", delay: "1.7s", size: 15 },
];

export function FloatingHearts({ count = 7 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.slice(0, count).map((heart) => (
        <span
          key={`${heart.left}-${heart.delay}`}
          className="heart-float absolute bottom-[-24px] text-rose-400/70"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            fontSize: heart.size,
          }}
        >
          ♡
        </span>
      ))}
    </div>
  );
}
