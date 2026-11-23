// GSAP-style power easings as cubic-bezier tuples (from kargulstudio/sales-crm lib/easings.ts, MIT).
// Same curves are exposed to Tailwind as `ease-power3-out` etc. by kargul-tokens.css.
// Use with motion/react: transition={{ duration: 0.2, ease: ease.power3Out }}

type Bezier = [number, number, number, number];

export const ease = {
  power1In: [0.11, 0, 0.5, 0],
  power1Out: [0.5, 1, 0.89, 1],
  power1InOut: [0.45, 0, 0.55, 1],

  power2In: [0.32, 0, 0.67, 0],
  power2Out: [0.33, 1, 0.68, 1],
  power2InOut: [0.65, 0, 0.35, 1],

  power3In: [0.5, 0, 0.75, 0],
  power3Out: [0.25, 1, 0.5, 1],
  power3InOut: [0.76, 0, 0.24, 1],

  power4In: [0.64, 0, 0.78, 0],
  power4Out: [0.22, 1, 0.36, 1],
  power4InOut: [0.83, 0, 0.17, 1],

  smoothInOut: [0.7, 0, 0, 1],
} satisfies Record<string, Bezier>;

export type EaseName = keyof typeof ease;

export const cssEase = (name: EaseName) => `cubic-bezier(${ease[name].join(", ")})`;

export const duration = {
  hover: 150,
  popoverIn: 200,
  popoverOut: 150,
  dialogIn: 250,
  dialogOut: 200,
  sheetIn: 350,
  sheetOut: 250,
  chevron: 200,
} as const;

export const spring = {
  slidingNumber: { type: "spring" as const, stiffness: 280, damping: 18, mass: 0.3 },
};
