"use client";

import { sections, type SectionId } from "@/lib/types";

type PillNavProps = {
  active: SectionId | null;
  onSelect: (id: SectionId) => void;
};

export function PillNav({ active, onSelect }: PillNavProps) {
  return (
    <nav
      aria-label="Gift sections"
      className="sticky top-3 z-30 mx-auto w-full max-w-3xl px-3"
    >
      <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-white/80 bg-white/80 p-1.5 shadow-[var(--shadow)] backdrop-blur-md">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              aria-pressed={isActive}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
                isActive
                  ? "bg-[#f4b8c8] text-white shadow-sm"
                  : "text-rose-ink/70 hover:bg-rose-50"
              }`}
            >
              <span aria-hidden>{section.glyph}</span>
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
