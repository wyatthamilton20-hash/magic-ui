# Magic motion

Character: fast, quiet, GSAP "power" curves. Everything is a fade/scale/slide with power3; no bounce, no
stagger in the work surface. Blur only in two places: modal backdrops, and the act-in-place drawer below. Feedback is color first; motion only on things that appear, disappear,
rotate to show state, or count.

## Curves

| Curve | Value | Use |
|---|---|---|
| `ease-power3-out` | `cubic-bezier(.25,1,.5,1)` | default for every enter and every hover/color transition |
| `ease-power3-in` | `cubic-bezier(.5,0,.75,0)` | exits only (popup close, sheet close, backdrop out, scrollbar hide) |
| `ease-power3-in-out` | `cubic-bezier(.76,0,.24,1)` | text-link color hover (profile contact links) |
| power1/2/4, smooth-in-out | see tokens.md §6 | available; not used by the reference UI |
| spring | `{ stiffness: 280, damping: 18, mass: 0.3 }` (ζ ≈ 0.98, settles ≈ 200ms, no overshoot) | sliding number digits |

JS: `import { ease } from "./easings"` → `transition={{ duration: 0.2, ease: ease.power3Out }}` (motion/react
accepts the tuple).

## Durations

| Element | In | Out | Properties |
|---|---|---|---|
| Hover / active color on buttons, rows, nav icons, menu items | 150ms power3-out | same (transition) | `background-color, color, box-shadow` (never `all`) |
| Input / select focus border | 150ms | — | `border-color` |
| Chevron flip on open | 200ms power3-out | 200ms | `rotate-180` via `group-data-popup-open:` |
| Dropdown, select | 200ms power3-out | 150ms power3-in | opacity 0→1, scale .95→1, from `--transform-origin` |
| Popover | 200 | 150 | opacity, scale .97 |
| Command palette | 200 | 150 | opacity, scale .98 (+ backdrop fade 200/150) |
| Dialog | 250 | 200 | opacity, scale .95 (+ backdrop 250/200) |
| Sheet (right/left/bottom) | 350 | 250 | full-size slide (`translate-x-full` / `translate-y-full`) + backdrop fade 350/250 |
| Scrollbar (hover-type) | 150 fade-in power3-out | 200 fade-out power3-in, hide delay 600ms | opacity |
| Sidebar resizer line | 150 | 150 | `background-color` |
| Logo drop zone | 150 | 150 | `border-color, background-color` |
| Sliding number | spring ≈ 200ms | — | per-digit `translateY` |
| Optional button press | 150 | 150 | `scale` .96 (`press` variant) |

Exits are always shorter than enters (~75%) and use the `-in` curve, so closing feels instant and opening
feels placed.

## Recipes

Radix / tw-animate (reference):
`data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:ease-power3-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:ease-power3-in duration-200 data-[state=closed]:duration-150`

Base UI (preferred — CSS transitions are interruptible when a menu is re-opened mid-close):
`origin-(--transform-origin) transition-[opacity,scale] duration-200 ease-power3-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 data-ending-style:duration-150 data-ending-style:ease-power3-in`

Base UI with tw-animate keyframes also works (`data-open:animate-in data-closed:animate-out …`) — Base UI
waits for running animations before unmounting.

Sliding number: digits are 10-glyph columns; each column's offset is `((10 + glyph − value % 10) % 10) × h`,
wrapped to the short way (`offset > 5 → −10h`). Keys are per place value (`pos-1000`) so adding a digit
mounts a new column on the left without remounting the others. CSS version moves the whole column
`translateY(−digit × 10%)` with `transition-transform duration-[240ms] ease-power3-out`.

## Act-in-place drawer (R6)

| Step | Motion |
|---|---|
| Row picked | list children `filter: blur(0→2.5px)`, `opacity 1→.45`, 200ms power3-out; picked row gets `.k-lifted` (shadow + white) instantly |
| Drawer in | `opacity 0→1`, `scale .97→1` from the right edge, `filter blur(6px)→0`, 260ms power3-out |
| Drawer out | reverse, 180ms power3-in; list un-blurs over 200ms |
| Value change inside | totals use the sliding number; struck price is instant |
| Primary success | label cross-fades to `✓ Done` (150ms), hold 600ms, then drawer out |
| Toast | `opacity 0→1`, `translateY 8→0`, 200ms power3-out; out 150ms power3-in after 5s or on Undo |

Reduced motion: no scale, no blur; fades only (handled in `magic-plain.css`).

## One-off scene build (R8)

Map-first heroes and About pages only: a scene may assemble once on first load, tile by tile (each tile
`opacity 0→1, y 12→0`, 60ms apart, total ≤ 1.2s, power3-out). Never on data surfaces, never on revisit, never
with reduced motion.

## What does NOT animate

- Table rows: hover is a 150ms background tint; no row enter/exit, no reorder animation on sort/filter.
- Tabs: instant active state (color + border + weight, width reserved). No sliding underline.
- Nav: active background appears instantly; only icon color transitions.
- Page load: nothing staggers in. (If a one-off empty/success state needs an entrance, use the repo's better-ui
  rule: chunks staggered ~100ms, `opacity 0→1, y 12→0`, power3-out; never on high-frequency surfaces.)
- Theme switch: suppress transitions (`next-themes` `disableTransitionOnChange`) so 150ms color transitions
  don't smear the flip.

## Reduced motion

The reference has no reduced-motion handling; this skill adds it (in `magic-tokens.css`):

- tw-animate enter/exit transforms neutralized (`--tw-enter-scale: 1`, `--tw-*-translate-*: 0`), so
  popups/sheets only fade.
- Base UI `[data-starting-style]` / `[data-ending-style]` scale forced to 1 (fade only). Sheet slides need the
  `motion-reduce:` overrides shown in components.md §7 (translate isn't globally reset because dialogs use
  translate for centering).
- `scroll-behavior: auto`.
- Sliding number: motion version renders plain text when `useReducedMotion()`; CSS version uses
  `motion-reduce:transition-none`.
- Keep: 150ms color/background transitions, focus rings, chevron rotation (small, functional).
- Every animated change has a static cue (color, weight, dot, number) so nothing depends on motion.

## Performance

Animate only `opacity`, `scale`, `translate`, `rotate`, colors. Name properties explicitly
(`transition-[background-color,color,box-shadow]`). `backdrop-blur-[6px]` on modal backdrops only — never on
sticky headers or rows. During sidebar drag, `html[data-sidebar-resizing]` forces `cursor: col-resize` and
`user-select: none` globally; width is written straight to the CSS variable (no React re-render of content).
