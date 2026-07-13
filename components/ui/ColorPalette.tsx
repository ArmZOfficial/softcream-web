"use client";

interface ColorPaletteProps {
  primary: string;
  secondary: string;
  accent: string;
}

export default function ColorPalette({ primary, secondary, accent }: ColorPaletteProps) {
  const colors = [
    { color: secondary, label: "Sky Light" },
    { color: primary, label: "Periwinkle" },
    { color: accent, label: "Violet Glow" },
  ];

  return (
    <div className="fixed left-4 top-4 z-50 flex flex-col gap-2" aria-label="Color palette">
      {colors.map((c) => (
        <div
          key={c.label}
          className="h-8 w-8 rounded-full border-2 border-moon-white/30 shadow-lg transition-transform hover:scale-110"
          style={{ backgroundColor: c.color }}
          title={c.label}
        />
      ))}
    </div>
  );
}
