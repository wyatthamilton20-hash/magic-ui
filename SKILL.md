---
name: magic-ui
description: Master design skill for anything dashboard related (dashboards, consoles, ops and map views, CRM and admin UIs, KPI pages) and for slide decks in the same look (pitches, reviews, readouts via the Slides artifact type), in the Kargul Studio visual language from the MIT kargulstudio/sales-crm reference. Use when designing, building, restyling, decluttering or reviewing any dashboard, in React + Tailwind v4 or as a single HTML file or Claude artifact. Covers copy rules (fewer words, show exceptions), page anatomy, map-first floating-card and table-first layouts, fit-to-one-screen with no scrolling, KPI tiles, the sidebar shell, header tabs, dense tables, outline grids, filter menus, tags and badges, segment bars, sparklines, a cmd-K palette, overlays and motion, pill buttons with layered shadows, a measured fit audit, and process-mapping patterns (handoff map, three-state ownership, gaps panel, knowledge pages, hierarchy switcher). Ships light and dark tokens with WCAG contrast, plus a framework-free CSS version.
---

# Magic UI

A quiet, dense, near-monochrome work surface. One indigo CTA per view, color reserved for data
(tags, segment bars, sparklines, status dots), hierarchy from six grey text steps instead of size.
Everything is 12–16px, 30px controls, 42px rows, pill buttons, 8–12px radii, power3 easing.

Reference: `kargulstudio/sales-crm` (Next 16, Tailwind 4, radix-ui, cmdk, motion; dark only).
This skill makes it portable: no Next APIs, tokens in light + dark, Base UI mappings, and a plain-CSS
version for single-file pages. **For any dashboard, read `references/dashboards.md` first**: it holds the
copy rules, layouts, fit-to-screen recipe and verification that sit on top of the components.

## Pick the mode first

| The ask | Mode | Read |
|---|---|---|
| dashboard, console, admin, CRM, ops/map view, KPI page, a screen in an app | Dashboard (default) | `references/dashboards.md`, then components/tokens as needed |
| deck, slides, pitch, review, readout, one slide | Slides | `references/slides.md` + `assets/magic-deck.css` |
| About tab, docs page, long read inside a dashboard | Document | dashboards.md §2 (About) |

All modes share one palette, one type pair (Inter + IBM Plex Mono), the noise budget and `references/sources.md`.
Never mix modes in one file: a deck does not embed dashboard chrome, a dashboard does not use slide sizes.

## Files

| Path | What |
|---|---|
| `references/dashboards.md` | dashboard playbook: copy rules, page anatomy, map-first / table-first / process layouts, handoff map (§3h), three-state ownership (§3c), gaps panel (§3i), knowledge pages, hierarchy switcher, generated header sentence, sensitive subjects (§8), fit one screen, KPI tile, verification, single-file and artifact notes |
| `references/sources.md` | the 8-reference pass (2026-11): what each reference gave and where it lives; Process Atlas applied example; pulling references from X; read before inventing a new pattern |
| `references/slides.md` | slides mode: where decks go (Slides artifact type), 25-word slide budget, 5-size type scale, 11 slide kinds, motion, checks |
| `assets/magic-deck.css` | publish as `project/deck.css` in a Slides artifact: tokens, type scale, index, hero number, KPI strip, cards, pills, table, meters, footer, rise motion |
| `references/tokens.md` | every color token light↔dark with contrast ratios, tag tones, radii, spacing, shadows, easings, type scale, fonts, install steps |
| `references/components.md` | class recipes + TSX for shell, sidebar, header, table, outline grid, filter menu, tags, badges, segment bar, sparkline, command, overlays, tabs, buttons, inputs, cards; Radix → Base UI mapping |
| `references/motion.md` | curves, per-element durations, recipes, what never animates, reduced motion |
| `assets/magic-tokens.css` | drop-in Tailwind v4 block: `:root` light, `.dark` dark, `@theme inline`, easings, `@utility` type scale, reduced-motion |
| `assets/magic-variants.ts` | `buttonVariants`, `tagVariants` (cva) and `k.*` class strings |
| `assets/filter-menu.tsx` | split-label single-select menu on `@base-ui/react` Menu |
| `assets/command-palette.tsx` | cmdk + Base UI Dialog palette parts + `useCommandShortcut` |
| `assets/segment-bar.tsx`, `assets/sparkline.tsx` | data micro-visuals (plain React) |
| `assets/sliding-number.tsx` / `sliding-number-css.tsx` | odometer digits (motion spring / zero-dep CSS) |
| `assets/sidebar-resizer.tsx` | drag + keyboard resizable sidebar edge, persisted width |
| `assets/easings.ts` | power curves as bezier tuples, durations, spring |
| `assets/magic-plain.css` | tokens + core classes (`.k-card`, `.k-float`, `.k-tile`, `.k-btn`, `.k-seg`, `.k-chip`, `.k-tag`, `.k-row`, `.k-meter`, `.k-fade`) plus the reference-pass set (`.k-num`, `.k-ticks`, `.k-pips`, `.k-split`, `.k-req`, `.k-pill`, `.k-well`, `.k-drawer`, `.k-dimmable`, `.k-radio-card`, `.k-check-row`, `.k-toast`, `.k-bars`, `.k-rank`, `.k-asof`, `.k-kbd`) plus `.k-mode` (`.human|.assist|.auto`) and `.k-gap` without Tailwind |
| `assets/fit-audit.js` | `fitAudit({roots,scrollers,pairs})` in the page: page overflow, container overflow, clipped text, overlapping overlays |
| `assets/check-contrast.mjs` | `node check-contrast.mjs [tokens.css]`, which re-measures every text pair in both themes |
| `NOTICE` | MIT attribution (Kargul Studio, motion-primitives) |

TSX assets import `cn` from `@/lib/utils` (shadcn convention) and expect the token CSS to be loaded. Single-file
pages use `magic-plain.css` instead.

## Workflow

0. **Set the copy budget.** List every string the screen shows and cut with dashboards.md §1: show exceptions
   not normal states, one next-action sentence, one-word labels, say each thing once, explanations go to an
   About/Docs tab.
1. **Recon the target.** Find the Tailwind entry CSS, `components/ui/*`, the primitive library (Radix vs
   `@base-ui/react`), the theme switch (`.dark` class?), and the font setup. Read the project's own
   AGENTS/CLAUDE/design docs first. Project rules win where they conflict. Ask before replacing a brand
   palette the owner chose.
2. **Install tokens.** Copy `assets/magic-tokens.css` next to the entry CSS and import it after
   `tailwindcss` + `tw-animate-css`. Remove the old shadcn `:root`/`.dark`/`@theme inline` color blocks, and keep
   project-only tokens (charts, brand) in their own block. Back up any file you overwrite if the project asks.
3. **Restyle primitives in place.** Swap class strings in the existing `components/ui/*` using
   components.md. Do not add a second primitive library. Map Radix state selectors to Base UI ones (table in
   components.md §0).
4. **Compose screens** from the patterns: app bar → header (switcher, title, next-action line, live controls) →
   work area. Pick the layout in dashboards.md §3 (map-first floating cards, table-first, process). Table-first:
   toolbar (filters left, Export + primary right) → scrolling table → outline-grid footer → right sheet.
4b. **Fit one screen** for consoles and ops views (dashboards.md §4): height chain, shared-height rows, dense
   lists, cards that shed detail, clamped KPI lines, fades instead of cut lines.
5. **Verify.** Run `assets/fit-audit.js` at 1024×768, 1280×720, 1440×900, 1920×1080 and 2560×1440 plus the
   late/full state (all zeros, no clips). Run `node assets/check-contrast.mjs` after any token change, check both themes, check 320px width
   (filters collapse to a bottom sheet, sidebar becomes a sheet), and tab through every control (focus ring
   `ring-2 ring-ring/60`).

## Principles

- **Noise budget.** No small grey explainer text on the work surface: KPI tiles are label + number + one
  visual, sub-lines only for exceptions, empty cells blank, no chart captions. Keep visible words outside tables
  ≤ 40 per console screen (`fitAudit().words`). See dashboards.md §1.
- **Words are a cost.** The data talks; chrome stays quiet. Status chips appear only when something needs
  attention, labels are one or two words, and anything explanatory lives off the work surface.
- **Show what to do next, then let them do it here.** The title line states the slip and the next action; the
  primary names its result (`Refund $92.00 to Visa`); acting happens in a drawer or popover over the list, with
  the consequence visible and Undo after. See dashboards.md §8.
- **One screen.** A console never scrolls the page. Lists, cards and tiles shed detail by container size
  before anything clips, and partial lines fade instead of being cut.

- **Grey ladder, not size ladder.** Text roles: `foreground` (values) > `icon`/`chip` > `soft` (secondary copy,
  resting menu items) > `muted-foreground` (`$` prefix, meta) > `subtle` (table heads, labels, placeholders) >
  `faint` (decorative eyebrows, units, denominators). Text sizes stay at 12/14/16 (18–24 for titles). Numbers are
  the exception: KPI values are 30px/500 `.k-num` with muted units, so the eye lands on the number first.
- **Mono for machine strings.** IDs, dates, clocks, zoom %, counts in meters and column eyebrows use the mono;
  names and sentences never do.
- **One fill.** Exactly one primary action per view: indigo `#4124fb` by default, or ink (near-black,
  `.k-btn.ink`) when hue is already busy with data. Everything else is `secondary` (white/near-black pill +
  `shadow-control`), `subtle`, or `ghost`.
- **Color = data.** Hue appears only in tags (categorical), status pills (tone by urgency), meters and charts,
  status dot (teal), danger dot (unread), and the selection ring. Amber means waiting, red means the promise
  slips, accent means selected or an agent at work. Never decorate chrome with hue.
- **Loud only when it needs you.** A status that needs action is the one inverse ink pill on the row; settled
  states are quiet grey pills with no dot.
- **Shadows elevate, borders structure.** Buttons/cards/overlays use layered shadows; rows, dividers,
  inputs and overlay edges use 1px `border`/`line-strong`. Inside sheets, dividers are
  `shadow-[inset_0_-1px_0_var(--line-strong)]` so they never move layout.
- **Density constants.** Controls 30px (`h-[30px]`, `size-[30px]`, `p-[9px]` + 12px text), icon buttons 24/30,
  table head 38 / row 42, sheet header 56 / footer 62, command input 48 / item 40. Gutters `px-4` (page),
  `p-3` (sidebar), `p-5` (sheet sections), `px-6` (sheet/dialog chrome). Tag gap 3px.
- **Pills and concentric radii.** Buttons, tags, badges `rounded-full`; menus/inputs/cards `rounded-lg`; dialogs,
  popovers, command `rounded-xl`; items inside a padded container step down one radius.
- **Width-stable states.** Tabs reserve bold width with an invisible twin; numbers use `tabular-nums`;
  percent columns `w-[4ch] text-right`; sliding numbers keep fixed digit widths.
- **Motion is short and asymmetric.** Enter 200ms power3-out, exit 150ms power3-in (dialogs 250/200, sheets
  350/250). Hover is a 150ms color change. Nothing staggers, bounces, or animates rows.
- **Overlays over navigation.** Row click opens a floating drawer (400px, 12px inset, 20px radius) over a
  blurred, dimmed list with the picked row lifted; use the edge sheet (560px) only for long read-only detail. Owner chip opens a
  profile sheet. ⌘K opens the palette. Mobile filters open a bottom sheet with a "Show N results" primary.

## Do

- Use the tokens (`bg-hover`, `bg-overlay`, `text-chevron`, `shadow-control`) instead of `white/6`, `#898b8d`, raw
  shadows, so light mode works.
- Name transition properties: `transition-[background-color,color,box-shadow] duration-150 ease-power3-out`.
- Right-align numeric columns with `justify-end tabular-nums`; prefix currency with a `text-muted-foreground` `$`.
- Pair every segment bar/sparkline with the number it encodes, and give meters `role="meter"` + `aria-valuenow`.
- Give icon-only buttons `aria-label`; keep `sr-only` titles/descriptions on sheets, dialogs and command.
- Use the outline-grid pattern (`grid gap-px p-px` + children `outline-1 outline-border`) for tiled footers and
  stat grids, and `divide-y` for plain stacked lists.
- Keep icons 12px (`size-3`) in sm buttons and meta rows, 14px (`size-3.5`) in nav/icon buttons/inputs, and 16px
  (`size-4`) for close X and checkboxes. Use one stroke family with `currentColor`.
- Use `text-[16px] sm:text-[14px]` on inputs (iOS zoom) and `leading-[1.45]` on any text that wraps 3+ lines.
- In dark mode, if AA matters, apply the strict overrides in tokens.md (`--subtle: #858585`,
  `--muted-foreground: #8f8f8f`).

## Don't

- Don't use `next/image`, `next/font`, `next/link`, SVGR imports or the reference's `Asset`/Rive/Lottie stack. Use
  plain `<img>`/inline SVG/lucide at the sizes above.
- Don't add a second accent color, gradients, glows, or glassmorphism. Blur only modal backdrops and the rows
  behind an act-in-place drawer.
- Don't write `Submit`, `Confirm` or `Save` on a primary when you can name the result with its number.
- Don't use icon-in-a-square KPI tiles, gauges, or greetings (`Hello, Alex 👋`); they cost space and decide nothing.
- Don't use `transition-all`, spring/bounce on popups, staggered row entrances, or sliding tab indicators.
- Don't use `text-faint` or `text-subtle` for information a user must read on `card`/`muted` surfaces in dark
  mode (2.5–3.0:1).
- Don't put borders on buttons or cards for depth (use the shadow tokens), and don't double borders between tiles.
- Don't make tags carry status semantics. Tag hues are categories. Status uses segment tones/dots + text.
- Don't scale fonts up for hierarchy. Change the grey step or the weight (400/500/600 only).
- Don't copy Inter/InterDisplay font files from the reference (OFL, separate license). Install via
  `@fontsource-variable/inter`.
- Don't publish numbers, targets or new screens in a client project without that project's approval rules.
