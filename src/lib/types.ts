export type SectionId = "letter" | "music" | "notes" | "gallery" | "flowers";

export const sections: {
  id: SectionId;
  label: string;
  glyph: string;
}[] = [
  { id: "letter", label: "Love Letter", glyph: "♡" },
  { id: "music", label: "Music", glyph: "♫" },
  { id: "notes", label: "Notes", glyph: "♧" },
  { id: "gallery", label: "Gallery", glyph: "♡" },
  { id: "flowers", label: "Flowers", glyph: "✿" },
];
