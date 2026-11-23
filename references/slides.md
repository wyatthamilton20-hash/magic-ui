# Slides mode

Magic for decks: the same quiet, near-monochrome language as the dashboards, scaled to a 1920×1080 slide.
Read this when the ask is a deck, a slide, a pitch, a review or a readout. The dashboard rules still apply
(noise budget, one accent, color = data, buttons name the result); this file adds what changes at slide scale.

Layout ideas come from the pitch-deck reference (R4: one huge numeral with a tiny label, numbered section index,
full-bleed statement slides) and the dashboards (R1 KPI strip, R6 status pills, R7 tick meters). R4's condensed
caps, serif italics and photo collages do not transfer: Magic slides use Inter + IBM Plex Mono only.

## Where it goes

- **Default: the Slides artifact type** (presentable, exports .pptx/PDF). Create it, then publish
  `project/deck.json`, `project/deck.css` (= `assets/magic-deck.css`, unchanged) and one file per slide, as the
  type's own instructions say. In `deck.json` set `faces`:
  `{"inter":{"family":"Inter","href":"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"},"ibm-plex-mono":{"family":"IBM Plex Mono","href":"https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"}}`.
- If the project has its own deck tool or the user asks for .pptx, keep these rules and map the classes by hand.

## Words (the noise budget, stricter)

- **≤ 25 visible words per slide**, tables excluded. The title is the takeaway as a sentence
  (`Refunds now settle in the row`), not a topic (`Refund flow`).
- **The explanation goes in speaker notes** (`<aside>`, the last child). Anything you would say out loud,
  any method, caveat or source detail, lives there, not on the slide.
- One idea per slide. A list of 4+ items becomes a table, cards or a big number.
- Source and page number go in the one pinned footer row (`.k-foot`), nowhere else.
- Never invent figures. Unknown numbers are `[__]` placeholders, listed in the reply.

## Type scale (five sizes, nothing under 24px)

| Role | Class / tag | Size |
|---|---|---|
| Hero numeral | `.k-num` (`.k-of` for `/50`, `%`) | 168 / 500 / -0.045em |
| Statement | `h1` | 88 / 600 / -0.03em |
| Slide title | `h2` | 56 / 600 / -0.02em |
| Body, card title | `p`, `h3` | 32 |
| Eyebrow, meta, footer | `.k-eyebrow`, `.k-meta`, `.k-foot` (mono) | 24 |

Secondary numbers on cards use `.k-num-sm` (96). Emphasis is weight or `.k-hot` (accent), never a new size.

## Surfaces and color

- Slide grounds: `--k-bg` light (default), `section.k-dark` for section openers and the close, `section.k-accent`
  (indigo, full bleed) for at most one statement per deck. Toned, never pure white or black.
- Hue = data, as on dashboards: `.k-warn` waiting/late, `.k-risk` slip, `.k-ok` good, accent = the one thing to
  look at. Status pills `.k-pill` + `.k-act | .k-wait | .k-good | .k-bad`.
- Contrast: body text ≥ 4.5:1 on its ground, 3:1 at 44px+. All pairs in `magic-deck.css` pass.

## Slide kinds (repeat the markup; headings never hop)

| Kind | Markup | Use |
|---|---|---|
| Cover | `section.k-dark` → `.k-eyebrow` (org · date) → `h1` (title as a claim) → `.k-meta` (presenter) | first slide |
| Index | `h2` + `.k-index` of `.k-index-row` (`.k-meta` 01 + `h2`), current row `.k-on` | after the cover; repeat as section openers with one row on |
| Statement | `section.k-accent.k-center` → `h1` with one `.k-hot` phrase | the one sentence they must remember |
| Hero number | `.k-eyebrow` → `.k-num` → `p` (≤ 8 words) | one metric that carries the point |
| KPI strip | `h2` → `.k-strip` of 3–4 cells (`.k-label`, `.k-num-sm`, optional `.k-ticks` or `.k-bar`) | a scorecard |
| Cards | `h2` → `.k-cards` of 3 `.k-card` (`.k-eyebrow` source, `h3`, ≤ 10-word `p`) | three changes, three options |
| Table | `h2` → `table` (≤ 6 rows, plain text cells only) | comparisons, ledgers |
| Row list | `h2` → `.k-rowlist` of rows (`p.k-key` + pill + `p`) | when a column needs pills: table cells drop them |
| Before / after | `h2` → `.k-cards` of two cards each holding an `img` (`object-fit:contain`) + `.k-meta` caption | design reviews |
| Figure | `h2` → `img.k-shot` | one screenshot, full width |
| Quote | `.k-quote` → `.k-meta` (who) | a customer's own words |
| Close / ask | `section.k-dark` → `h2` (the ask, naming the result: `Rate the 19 changes`) → `.k-meta` (where) | last slide |

Fill: a slide with one short block looks unfinished. Put `.k-fill` on the main block (cards, strip, row list) so it takes the rest of the column; cards then push their last line down, strip cells spread, rows share the height. In a filled strip use `.k-num` (168), not `.k-num-sm`. Covers use `section.k-dark.k-cover` (title bottom-left).

Grid: content starts at the top margin (128px), heading first; nothing below y 920 except `.k-foot`. Cards
share one radius (28) and one padding (44). Touching boxes share one 2px rule.

## Motion

`.k-rise` + `.k-d1/.k-d2/.k-d3` on the 1–3 blocks of a slide: 500ms power3-out rise, all in under 1s. Slide
transitions: `data-transition="fade"` only. No loops, no per-word reveals. Click steps (`class="fragment"`)
only when the speaker needs pace.

## Check before handing over

- Count words per slide (titles + body + cards, not tables or notes): ≤ 25.
- Every slide has `background` through its class, one heading at the top, and notes for anything cut.
- Preview the slides with hand-placed text or images once the deck is open.
