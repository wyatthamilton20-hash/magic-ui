# Magic tokens

Source: `app/globals.css` in kargulstudio/sales-crm (dark-only). The light column is derived here; every
dark token has a light counterpart with the same job and the same rank in the hierarchy.
Drop-in CSS: **`assets/magic-tokens.css`** (`:root` = light, `.dark` = dark, `@theme inline` mapping,
`@theme static` easings, `@utility` type scale, reduced-motion block). Re-measure after any edit:
`node assets/check-contrast.mjs`.

## 1. Install into a shadcn / Tailwind v4 project

```css
/* src/index.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "./styles/magic-tokens.css";   /* copied from assets/ */
```

- If the project's `index.css` already has shadcn `:root` / `.dark` / `@theme inline` blocks, **replace** them
  (Magic defines every shadcn token: background, foreground, card, popover, primary, secondary, muted, accent,
  destructive, border, input, ring, sidebar-*). Keep project-only tokens (e.g. `--chart-*`, brand colors) in a
  separate block after the import. Do not keep two `@custom-variant dark` lines.
- `@import "shadcn/tailwind.css"` can stay; Magic tokens only set variables.
- Theme switching: `.dark` class on `<html>` (next-themes `attribute="class"`, `disableTransitionOnChange`).
  One mechanism only; do not also use `prefers-color-scheme`.
- Fonts: `npm i @fontsource-variable/inter` and `@import "@fontsource-variable/inter/opsz.css";` (Inter 4 with
  the `opsz` axis, family `'Inter Variable'`; `font-optical-sizing: auto` renders the Display cut at large
  sizes, so `--font-display` needs no extra file). Subpath confirmed in v5.x; fallback
  `@import "@fontsource-variable/inter";`. Inter is OFL-licensed; never vendor
  the reference's `InterDisplay-Medium.woff2`.

## 2. Color tokens — light ↔ dark

Contrast = WCAG 2.x ratio against `--background` (`#fcfcfc` light / `#161616` dark). "min" = worst case over
background, card, popover, muted, sidebar. Text needs 4.5 (AA body), 3.0 for ≥ 18.66px bold/24px or non-text UI.

### Surfaces (rank: page < sidebar ≈ page < card < secondary/muted fills)

| Token | Light | Dark | Role |
|---|---|---|---|
| `--background` | `#fcfcfc` | `#161616` | page, table body, sheets (`bg-background`) |
| `--sidebar` | `#f7f7f7` | `#171717` | sidebar column |
| `--sidebar-accent` | `#f2f2f2` | `#181818` | sidebar header/footer blocks (brand row, trial block) |
| `--card` | `#f3f4f6` | `#1b1d20` | selected/active table row, score cards (cool tint kept) |
| `--card-hover` | `#eceef1` | `#252525` | card hover (reference hard-coded `#252525`) |
| `--popover` | `#ffffff` | `#161616` | menus, dialogs, command, popovers |
| `--secondary` | `#ffffff` | `#1e1e1e` | default button fill, inputs, select triggers |
| `--muted` / `--accent` | `#efefef` | `#2a2a2a` | hover of secondary, count badge fill, icon tiles, open trigger |
| `--muted-hover` | `#e6e6e6` | `#333333` | hover of `muted` button (reference `#333333`) |
| `--subtle-bg` | `#f5f5f5` | `#232323` | `subtle` button fill (Cancel) |
| `--sidebar-primary` | `#ffffff` | `#2a2a2a` | active nav item fill (+ `shadow-control`) |
| `--primary` | `#4124fb` | `#4124fb` | the one filled CTA per view |
| `--primary-hover` | `#3519e0` | `#4b30ff` | hover: darker in light, lighter in dark |

### Lines (structure, not elevation)

| Token | Light | Dark | Ratio L / D | Role |
|---|---|---|---|---|
| `--border` / `--sidebar-border` | `#ebebeb` | `#232323` | 1.16 / 1.15 | table row dividers, page section lines, sidebar edges |
| `--line-strong` | `#dedede` | `#393939` | 1.31 / 1.57 | popover/dialog/sheet borders, header/footer dividers, stat tiles |
| `--input` | `#d4d4d4` | `#393939` | 1.44 / 1.57 | shadcn input border (Magic inputs use `line-strong`) |
| `--ring` / `--sidebar-ring` | `#8a8a8a` | `#676767` | 3.36 / 3.20 | focus border, `ring-ring/60` |
| `--track` | `#e4e4e4` | `#3a3a3a` | 1.24 / 1.59 | empty segment, slider track |
| `--pill-border` | `#e0e0e0` | `#363636` | — | status pill border (ref `#363636`) |
| `--count-border` | `#d9d9d9` | `#414141` | — | count badge 0.5px border (ref `#414141`) |
| `--check-empty` | `#c4c4c4` | `#323232` | — | unchecked checkbox stroke (ref `#323232`; hover → `line-strong`) |

### Text (rank: foreground > icon ≈ chip > soft > muted-foreground > subtle > faint)

| Token | Light | Dark | Light on bg (min) | Dark on bg (min) | Role |
|---|---|---|---|---|---|
| `--foreground` | `#111214` | `#f9fbff` | 18.27 (16.30) AA | 17.47 (13.86) AA | values, names, active labels |
| `--icon` | `#3b3f47` | `#d0d4dd` | 10.30 (9.19) AA | 12.19 (9.67) AA | active/hover nav icons, sheet title icon |
| `--chip` | `#3d3d3d` | `#cfcfcf` | 10.59 (9.45) AA | 11.62 (9.21) AA | count badge digits |
| `--soft` | `#4f4f4f` | `#a4a4a4` | 7.98 (7.12) AA | 7.26 (5.76) AA | secondary copy, menu items at rest, labels, descriptions |
| `--muted-foreground` | `#5f5f5f` | `#7f7f7f` | 6.22 (5.55) AA | 4.52 (3.58) AA on bg only | `$` prefix, footer meta, sidebar text |
| `--subtle` | `#6b6b6b` | `#676767` | 5.19 (4.63) AA | **3.20 (2.54) fails AA** | table headers, filter labels, placeholders, ghost text |
| `--faint` | `#a1a1a1` | `#454545` | 2.52 decorative | 1.89 decorative | sidebar section eyebrows (reference) |
| `--chevron` | `#6f7173` | `#898b8d` | 4.78 | 4.88 (on secondary) | dropdown chevrons |

AA-strict dark override (use when the dashboard must pass AA; keeps hierarchy):
`.dark { --muted-foreground: #8f8f8f; /* 5.60 bg, 5.22 card */ --subtle: #858585; /* 4.90 bg, 4.58 card */ }`
and use `text-subtle` instead of `text-faint` for any eyebrow a user must read.

### Status, data, accents

| Token | Light | Dark | Light on bg | Dark on bg | Role |
|---|---|---|---|---|---|
| `--success` | `#147a3b` | `#22c55e` | 5.28 AA | 7.94 AA | segment fill (green third), positive text |
| `--warning` | `#a64b07` | `#fbbf24` | 5.64 AA | 10.84 AA | segment fill (amber third) |
| `--danger` / `--destructive` | `#c81e1e` | `#f97373` | 5.59 AA | 6.66 AA | errors, unread dots, red third |
| `--trend` | `#0a9a55` | `#00b562` | 3.55 non-text | 6.71 | emphasized sparkline bars |
| `--trend-muted` | `#9fcfb5` | `#395e4d` | 1.70 | 2.48 | de-emphasized bars (contrast with `trend` carries meaning) |
| `--status` | `#0b8f70` | `#16c89e` | 3.95 non-text | 8.44 | "Active" dot, selected radio dot |
| `--check` | `#a67c00` | `#ffdb4b` | 3.72 non-text | 13.34 | checked checkbox fill (reference yellow) |

Light status hues are darkened so they pass AA as text, which also makes them read heavier as fills than the
dark originals; for big fills (segment bars) that is intended.

### Alpha overlays (were `white/N` utilities in the reference)

| Token | Light | Dark (reference) | Use |
|---|---|---|---|
| `--hover` | `rgb(17 18 20 / .045)` | `rgb(255 255 255 / .06)` | menu/command highlighted, ghost hover |
| `--hover-faint` | `/ .03` | `/ .04` | `item` button hover, unread row, segment border |
| `--meter` | `/ .06` | `/ .08` | segment bar track container |
| `--hairline` | `/ .15` | `/ .15` | inline 1px separators (`mx-[3px] h-2 w-px`) |
| `--hairline-soft` | `/ .08` | `/ .08` | filter-menu label divider |
| `--overlay` | `rgb(17 18 20 / .24)` | `rgb(0 0 0 / .6)` | dialog/sheet/command backdrop (+ `backdrop-blur-[6px]`) |
| `--image-outline` | `rgb(0 0 0 / .1)` | `rgb(255 255 255 / .1)` | avatar/logo `outline-1 -outline-offset-1` |
| `--scrollbar` / `-hover` | `/ .2` / `/ .35` | `/ .2` / `/ .35` | scrollbar thumb |

### Tag tones (bg / border / text; text-on-bg ratio)

| Tone | Light | L ratio | Dark | D ratio |
|---|---|---|---|---|
| blue | `#eef4fe` / `#cfe0fb` / `#1d4ed8` | 6.07 | `#1d2b3e` / `#23354c` / `#bfdbfe` | 10.07 |
| purple | `#f3f1fd` / `#ddd7f7` / `#5b45c9` | 5.99 | `#231f3a` / `#4b437b` / `#b7aee9` | 7.71 |
| green | `#ecf8f0` / `#c9ebd4` / `#17733f` | 5.41 | `#1f3a2d` / `#275137` / `#b1ebc5` | 9.14 |
| moss | `#eef6ec` / `#cfe3c9` / `#3a6b2c` | 5.73 | `#23451d` / `#2e5029` / `#b1ebc5` | 8.02 |
| red | `#fdf0f1` / `#f6d0d4` / `#b42335` | 5.85 | `#3e1d1e` / `#4c2324` / `#febfc6` | 9.63 |
| orange | `#fdf3ec` / `#f2d3bd` / `#a2491a` | 5.48 | `#3e291d` / `#764d35` / `#eeb390` | 7.46 |
| amber | `#fdf5ea` / `#f1dcbc` / `#94540f` | 5.50 | `#31221b` / `#6c4830` / `#fed7aa` | 11.28 |
| teal | `#eaf7f3` / `#c4e6da` / `#0f7360` | 5.24 | `#102a27` / `#3b6149` / `#22c55e` | 6.67 |
| yellow | `#fcf8e6` / `#ece2b0` / `#7a6408` | 5.39 | `#33301a` / `#5a5228` / `#fde68a` | 10.68 |
| neutral | `#f1f1f1` / `#e0e0e0` / `#3d3d3d` | 9.62 | `#2a2a2a` / `#363636` / `#cfcfcf` | 9.21 |

Reference mapping (sales semantics): Enterprise blue, Mid-Market moss, SMB yellow, Strategic red, New Logo /
Expansion / Renewal green, Upsell purple, Pilot orange, Co-Sell amber, Land & Expand teal. Tones are categorical;
never reuse red/green tags for good/bad.

## 3. Radii

`--radius: 0.5rem` → `rounded-sm` 4px, `rounded-md` 6px, `rounded-lg` 8px, `rounded-xl` 12px.

| Element | Radius |
|---|---|
| buttons, tags, count badges, status pill, avatars | `rounded-full` |
| nav items, inputs, select triggers, menus, stat tiles, cards, command items | `rounded-lg` (8) |
| menu items, kbd, 24px icon tiles | `rounded-md` (6) |
| dialogs, popovers, command palette, bottom sheet top | `rounded-xl` (12) |
| segment container / segment / sparkline bar | `rounded-[2px]` / `rounded-[1px]` / `rounded-[1px]` |
| 50px logo tile / 56px upload tile | `rounded-[12.5px]` / `rounded-[14px]` |

Concentric rule: outer = inner + padding (menu `rounded-lg` + `p-1` → items `rounded-md`; command `rounded-xl`
+ `p-1.5` → items `rounded-lg`).

## 4. Spacing and layout tokens

| Token | <640 | ≥640 | ≥768 | ≥1024 |
|---|---|---|---|---|
| `--padding-global` | 1rem | 2rem | 2.5rem | max(4vw, 2.5rem) |
| `--padding-section-sm` | 1.5rem | 1.5rem | 1.75rem | 2.25rem |
| `--padding-section-md` | 2rem | 2rem | 2.25rem | 3.25rem |
| `--padding-section-lg` | 2.75rem | 3rem | 3.5rem | 5rem |
| `--padding-section-page` | 6rem | 6rem | 7rem | 8rem |
| `--max-width-global` | 76.25rem | | | |
| `--sidebar-width` | 254px (200–400, resizable) | | | |

These section paddings are marketing-scale; the app shell itself uses fixed `px-4` / `p-3` / `p-5` / `px-6`
(see components.md). Density constants: control height 30px, table head 38px, row 42px, sheet header 56px,
sheet footer 62px, command input 48px, command item 40/44px.

## 5. Shadows (all theme-aware via `--shadow-*-value`)

| Utility | Dark (reference) | Light (derived) | Used on |
|---|---|---|---|
| `shadow-overlay` | `0 16px 40px rgba(0,0,0,.5), 0 0 0 1px #0e0e0e` | `0 16px 40px -8px rgba(17,18,20,.16), 0 0 0 1px rgba(17,18,20,.06)` | menus, popovers, dialogs, command, bottom sheet |
| `shadow-control` | `0 0 0 1px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1), inset 0 0 0 1px rgba(255,255,255,.06)` | `0 0 0 1px rgba(17,18,20,.1), 0 1px 2px rgba(17,18,20,.06), inset 0 -1px 0 rgba(17,18,20,.04)` | secondary/muted buttons, active nav item |
| `shadow-primary` | 5 layers incl. `inset 0 4px 6px rgba(255,255,255,.2)`, `inset 0 -8px 14px rgba(0,0,0,.15)` | `0 1px 2px rgba(65,36,251,.25), 0 0 0 1px #3519e0, inset 0 1px 0 rgba(255,255,255,.2), inset 0 -8px 14px rgba(0,0,0,.12)` | primary button |
| `shadow-subtle` | `0 0 0 1px #333` | `0 0 0 1px #e0e0e0` | subtle button |
| `shadow-card` | `0 4px 4px rgba(42,42,42,.32), 0 0 0 1px #0e0e0e, inset 0 1px 0 rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.08)` | `0 1px 2px rgba(17,18,20,.06), 0 0 0 1px rgba(17,18,20,.08)` | score cards |
| `shadow-tile` / `shadow-tile-lg` | `0 0 0 1px #232323` / `+ 0 6.25px 6.25px rgba(15,15,15,.24)` | `0 0 0 1px #e6e6e6` / `+ 0 4px 6px rgba(17,18,20,.06)` | logo / icon tiles |
| `shadow-count` | `0 0 0 .5px #0e0e0e` | `0 0 0 .5px rgba(17,18,20,.04)` | count badge |
| `shadow-thumb` | `0 2px 6px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4)` | `0 1px 3px rgba(17,18,20,.2), 0 0 0 1px rgba(17,18,20,.12)` | slider thumb |

Rule: shadows for elevation (buttons, cards, overlays), borders for structure (rows, dividers, inputs).

## 6. Easings (`@theme static`, utilities `ease-power3-out` etc.)

| Name | cubic-bezier |
|---|---|
| power1 in / out / in-out | `.11,0,.5,0` / `.5,1,.89,1` / `.45,0,.55,1` |
| power2 in / out / in-out | `.32,0,.67,0` / `.33,1,.68,1` / `.65,0,.35,1` |
| **power3 in / out / in-out** | `.5,0,.75,0` / `.25,1,.5,1` / `.76,0,.24,1` |
| power4 in / out / in-out | `.64,0,.78,0` / `.22,1,.36,1` / `.83,0,.17,1` |
| smooth-in-out | `.7,0,0,1` |

power3-out is the house curve; power3-in only on exits. Durations and usage: motion.md.

## 7. Type scale (`@utility`, usable with variants: `sm:caption-style`)

| Utility | Size / line-height / weight | Extra | Used for |
|---|---|---|---|
| `h1-style` | 16 / 1 / 500 | | page title in header |
| `h2-style` | 16 / 1 / 600 | | dialog/popover/entity titles |
| `h3-style` | 16 / 1 / 400 | | card titles |
| `h4-style` | 14 / 1 / 500 | | small headings |
| `p-style` | 14 / 1.15 / 400 | | 1–2 line copy |
| `lead-style` | 14 / 1 / 400 | | sheet titles, stat values, sidebar brand (`font-medium tracking-[-0.01em]`) |
| `caption-style` | 12 / 1 / 400 | | table heads, labels, meta, menu items, badges |
| `eyebrow-style` | 12 / 1 / 400 | `tracking-[1px] uppercase` | section titles (sheet sections, sidebar groups) |
| `stat-style` | 24 / 1 / 500 display | tabular-nums | KPI value next to sparkline |
| `stat-lg-style` | 28 / 1 / 600 display | tabular-nums | headline percentage |

Body default 14px, table cells `text-[14px] leading-none`, buttons sm 12px / md 14px. Only weights 400/500/600.
Any text that wraps to 3+ lines: override to `leading-[1.45]` (reference `leading-none` breaks there).
Inputs 16px below `sm` (iOS zoom), 14px from `sm`.

Fonts: reference README says "Inter + local Inter Display"; its `layout.tsx` actually loads **Geist**
(`--font-geist`). This skill standardizes on Inter for body/UI and Inter Display (`--font-display`) for ≥ 20px
numbers and headings, with Geist in the fallback stack.
