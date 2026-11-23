#!/usr/bin/env node
// Re-measure WCAG 2.x contrast for the Magic text tokens in both themes.
// Usage: node check-contrast.mjs [path/to/magic-tokens.css]
// Reads :root (light) and .dark blocks; prints ratio of each text token on each surface.
import { readFileSync } from "node:fs";

const file = process.argv[2] ?? new URL("./magic-tokens.css", import.meta.url);
const css = readFileSync(file, "utf8");

function block(selector) {
  // match "sel {", "sel{" and grouped selectors like ".dark,:root[data-theme=\"dark\"]{"
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = new RegExp(`(^|[\\n,])\\s*${esc}\\s*[,{]`).exec(css);
  if (!m) return {};
  const start = m.index;
  const end = css.indexOf("\n}", start);
  const vars = {};
  for (const m of css.slice(start, end).matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) vars[m[1]] = m[2];
  return vars;
}

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const f = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  if (!a || !b) return NaN; // token absent in this file
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const TEXT = ["foreground", "icon", "chip", "soft", "muted-foreground", "subtle", "faint", "danger", "success", "warning"];
const SURFACES = ["background", "card", "popover", "muted", "sidebar"];
const NON_TEXT = { status: 3, trend: 3, check: 3, ring: 3, primary: 3 };

const light = block(":root");
const dark = { ...light, ...block(".dark") };

for (const [name, t] of [["LIGHT", light], ["DARK", dark]]) {
  console.log(`\n${name}`);
  for (const tok of TEXT) {
    if (!t[tok]) continue;
    const surf = SURFACES.filter((x) => t[x]);
    const cells = surf.map((s) => `${s}:${ratio(t[tok], t[s]).toFixed(2)}`).join("  ");
    const min = Math.min(...surf.map((s) => ratio(t[tok], t[s])));
    console.log(`${tok.padEnd(17)} ${t[tok]}  ${cells}  ${min >= 4.5 ? "AA" : min >= 3 ? "AA-large" : "decorative"}`);
  }
  for (const [tok, need] of Object.entries(NON_TEXT)) {
    if (!t[tok]) continue;
    const r = ratio(t[tok], t.background);
    console.log(`${tok.padEnd(17)} ${t[tok]}  on background ${r.toFixed(2)}  ${r >= need ? "ok (non-text 3:1)" : "below 3:1"}`);
  }
  if (t["primary-foreground"]) console.log(`primary-fg/primary ${ratio(t["primary-foreground"], t.primary).toFixed(2)}`);
  for (const mode of ["human", "assist", "auto"]) {
    if (t[`${mode}-fg`]) console.log(`mode-${mode.padEnd(7)} ${ratio(t[`${mode}-fg`], t[`${mode}-bg`]).toFixed(2)}`);
  }
  for (const tone of ["blue", "purple", "green", "moss", "red", "orange", "amber", "teal", "yellow", "neutral"]) {
    if (!t[`tag-${tone}-text`]) continue;
    console.log(`tag-${tone.padEnd(8)} ${ratio(t[`tag-${tone}-text`], t[`tag-${tone}-bg`]).toFixed(2)}`);
  }
}
