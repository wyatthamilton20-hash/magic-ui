# Dashboards playbook

How to build any dashboard, console or ops view in the Magic language. Magic gives you the tokens and
components; this file adds the decisions on top of them: what text to show, how to lay out the screen,
how to fit one screen at every size, and how to prove it.

Built from a shipped console (a drone survey console, single-file HTML + three.js, published as a Claude artifact)
and the reference dashboards the owner keeps as the bar: Plotline (project outlook), Puzzle (process view),
an orders table, a network tree, and a full-bleed globe logistics view.

## 1. Words are a cost

Every string competes with the data. Default to fewer words, then cut again. A good dashboard does not
show data; it shows what to do next (R3). If the UI needs explaining, it already failed.

- **Noise budget (owner rule, 2026-11-22).** Small grey helper text is the main source of noise. Hard limits:
  - A KPI tile has a label, a number and at most one visual. A sub-line is allowed only when it holds an
    exception (`+2 days`, `6 waiting`) and never when it restates the header sentence or the number.
  - Max one secondary string per container. Option helpers are ≤ 4 words and state only the consequence
    (`Back by Dec 2`), never how the form works (`Items below are picked from…`).
  - Empty cells stay blank: no `—`, `n/a`, `None`. Context columns (`Why it matters`) fill only on rows that
    need action.
  - No chart captions (`dashed line = last week`). A legend dot, a `title` tooltip or nothing.
  - Detail moves into the drawer, a tooltip or About. If a word survives, it must change a decision.
  - Measure it: `fitAudit()` returns `words` (visible words outside tables and the drawer). Target ≤ 40 on a
    console screen; cut until you hit it.
- **Show exceptions, not normal states.** A chip that says `GNSS 7/7` or `CACHE 695 MB` when all is well is
  noise. Render status chips only when they need attention (`:not(.amber){display:none}`), or keep one
  quiet summary chip that opens a drawer.
- **One sentence tells the user what to do next.** Under the page title, one line: the headline number, the
  state, and the next action as a link (`48% searched · 6/8 drones up · 1 to review: GS-02`). No
  "Next:", no "waiting on you", no trailing period lists.
- **Labels are one or two words.** `Coverage`, `Rate`, `Activity`, `Detections`. Not `AO coverage`,
  `Area rate`, `Event log`, `Detection queue`. Drop counts the chips or list already show (`3 items`).
- **Say a thing once.** If the row's progress line shows `S1 48%`, drop the sector column. If the title is
  `Treloar Creek`, the breadcrumb does not repeat it. If the ID is `GS-01`, the meta does not add `GS`.
- **No explanations in the work surface.** Method notes ("Concealed route weights time by exposure…"),
  legal caveats, data provenance and how-it-works prose go to an About/Docs tab. The console keeps only
  warnings that change a decision (`.note.warn`).
- **Hide zero filters.** A filter chip with a count of 0 (and not active) is hidden. `All` always stays.
- **Prefer the human unit.** `ETA 43 min` beats `ETA T+01:26 (43 min)`. Put the most decision-relevant
  value first so truncation removes the least important part.
- **Coordinates, IDs and timestamps belong in the detail sheet,** not in every list row. Rows keep one meta
  line: owner/sector + time.
- **Jargon gets cut or moved.** Algorithm names (`Tobler`, `20 m grid`), sensor codes and legends that
  restate the map go to About.
- **Emphasis inside the sentence, not around it (R7).** Bold the facts (`Tue 8 Dec`), color only the one
  slip (`2 working days late` in `--danger`), keep the rest `muted-foreground`. No badges inside the sentence.
- **Buttons say the result (R1, R2, R6).** The primary names the count, amount or target:
  `Approve 5 redlines`, `Refund $92.00 to Visa`, `Apply to step 2`, `Nudge Stripe`. Never `Submit`/`Confirm`.
  After success the label flips to `✓ Done` for ~600ms, then the overlay closes.
- **Show the consequence before the click (R6).** Under a choice, ≤ 4 words say what happens and when:
  `Back by Dec 2`, `Today, +10%`. This is the one helper line a choice may keep.
- **Freshness is one quiet stamp (R5, R7).** `as of 08:10` or `Synced 2 min ago` in the header, green dot;
  amber dot + `stale 3 h` only when old. Not a banner.
- **Add a "Why it matters" column (R7)** to work tables: plain language (`Sets the ship date`,
  `Waiting on Stripe sandbox keys`). It replaces three columns of codes.
- **Units are muted, numbers are loud (R1, R7).** `4.6 days, median`, `31/50`, `95%`: the unit, denominator
  and % sign are `faint`/`muted` so the eye lands on the number.
- **Clock: one.** Show mission time; hide the second clock unless the user works across zones.

## 2. Page anatomy

```
app bar   56px   logo · view tabs (Console | About) · status tag (right)
header           switcher crumb (mission/project id ▾)
                 title (20–24px, 600, -0.02em)            right: live clock pill · segmented controls
                 next-action sentence (14px, muted)
work area flex:1 the console (fills the rest of the screen)
```

- View tabs are a segmented pill (`bg-card` track + white raised active). One primary (indigo) button for the
  whole view, usually **+ New …** in the work area's top-right.
- The status tag (`Simulated data`, `Draft`, `Read-only`) is an amber tag, not a banner.
- The About tab holds every paragraph: product story, data sources and licenses, limits. It is a normal
  scrolling document capped near 1120px. Number its sections `01 / 02 / 03` with a big numeral and a short
  heading (R4).
- Title row may carry one tinted state pill (`● At risk`, `Sample data`) right after the title (R7).
- Header meta can sit inline after the title in `muted` (`Inbound Contracts  Thu 13 Nov · 39 this week`, R2)
  when there is no next action to state.
- Primary color: indigo by default; use `ink` (`.k-btn.ink`, near-black) when hue is already busy with data
  (tags, critical paths, tiers). Three of the five dashboard references use ink (R1, R2, R6). Still one per view.

### Knowledge page with backlinks (Process Atlas)

Document mode for a record the work points at (policy, system, person, term, decision). Cap the body at 65ch.

- Head: type badge (`Policy | System | Person | Glossary | Decision`, `.k-tag`, neutral), title 20/600, owner row
  (20px avatar + name) and `.k-meta` `Verified 12 Nov`; amber dot + `Verified 9 mo ago` only when stale.
- Body: ≤ 65ch, 14/1.45; `[[page]]` links render as accent underlined text, unresolved ones in `--danger` (they feed the gaps panel).
- `Used by N` eyebrow, then a plain list of `.k-row`s, one per work item that cites the page (task name, mono owner
  initials + step `Step 3`); each row links back to the item. Zero backlinks: omit the block.
- Link chips on work items (`.k-chip`, one per page, missing = `--danger` text) point to these pages; they are the
  forward half of the same link.

### Hierarchy switcher (parent org → child entity)

For firm → portfolio company, org → team. Remember the last child (`localStorage`, try/catch) and open on it.

- Trigger: 28px mark + child name 14/500 + parent 12 `subtle` + chevron. Popover (`shadow-overlay`, 320px) lists the
  parent row first, then children: name, one-word type (`Retail`), `.k-meter` 48px + mono `62%`.
- Parent view = rollup table, one row per child: name, progress meter + mono %, mono counts, and a `Top opportunity`
  column in plain language (`Payment run: 4.5 h/mo`); blank when nothing stands out (§1).

### Generated header sentence

Build the one-line state sentence from data with a template, never hand-typed:
`{n} people, {m} tasks, {pct}% mapped. {top} is the best place to start.`

- Facts (`{n}`, `{m}`, `{pct}`, `{top}`) are 500 `foreground`; connectives `muted-foreground`; max 72ch.
- Show the one exception only: swap the second sentence for the slip (`3 tasks are missing decisions`, `--danger`).
- When nothing stands out, fall back to a neutral state sentence (`Everyone is mapped. Nothing needs a read-back.`). Never a blank line, never two exceptions.

## 3. Layouts

### 3a. Map-first with floating cards (globe reference)

Use when a map, canvas or 3D scene is the subject.

- The scene fills the console edge to edge (`position:absolute; inset:0`). The console itself is a 16px-radius
  card on a light page; the scene inside can stay dark imagery even in light mode.
- Cards float on top with 14px insets and the overlay shadow: list left (~300px), detail right (~356px,
  420px when a wizard opens), KPI tiles along the bottom between them, the mode switcher as a pill centered
  at the bottom, chips + primary at the top right, layer control top-left of the open area.
- Map overlays (scale, readout, credit, compass) sit inside the **open** area, never under a card: offset them
  by the card widths (`left:328px`, `right:384px`, bottom above the tiles).
- 3D scenes: shift the projection center onto the open area with
  `camera.setViewOffset(w+2|dx|, h+2dy, dx>0?2dx:0, 2dy, w, h)` where dx/dy are half the difference of
  the covered edges, and pull the home camera back ~12%.
- Below 1180px fall back to a plain grid (list | scene | detail, tiles under). Below 900px stack.

### 3b. Table-first (orders, CRM, admin)

Header + one KPI row (3–4 tiles: label, big number, delta chip, micro sparkline) + toolbar + table that
scrolls inside its own card + right sheet for the row. Rows: avatar/initials chip, name, colored item
swatches, right-aligned money, status pill, date, channel. See components.md §2, §11.

### 3c. Process / outlook (Plotline R7, Puzzle R1)

Sidebar shell, header with title + one-line status sentence + avatars, a KPI strip whose tiles each carry a
micro meter, then a flow view (steps or a critical-path graph) and a table of what is open. Step cards carry
owner, type tag (`AI agent` / `Person`), duration and queue count. A selected step opens a popover with
suggested actions and one primary.

- Steps: 5 equal cards in a row joined by 12px `→` in `faint`. Card: eyebrow `Step 2` (12px subtle), title
  14/500, owner row (20px avatar + name), type tag, a hairline, then the big duration (20px/500) and one line
  (`6 waiting` in amber, `No queue` in muted). Selected card: `.k-sel-ring`.
- Above the steps, a split bar (`.k-split`) shows where the time goes, names inside the segments; agent time
  is a 4px accent sliver labeled underneath (`Scout 6 min`).
- Right rail (320px): Agents / People / Recent changes as plain lists; each row = avatar, name + role, and a
  right-aligned two-line stat (`6 proposals` amber / `1.4 days each` muted).
- The popover anchors to the selected step and overlays the table (z above, shadow-overlay, 360px): title,
  one context line, a `Speed this step up` eyebrow, 2 suggestion rows (icon, title, one line, the highlighted
  one gets `bg-card` and a green proof line), footer `Cancel` + ink primary `Apply to step 2`.

**Three-state ownership (Process Atlas).** When AI can partly do a step, replace binary `Person` / `AI agent` with
`Human` / `Assist` (AI drafts, a person approves) / `Auto`.

- Chips (`.k-mode.human|.assist|.auto`) always carry the word; never color alone. Split bar (`.k-split>span.human|.assist|.auto`)
  gets three segment tones: human = wide sand block with label inside, assist and auto = slivers with the label below.
- Collision: a human tone near amber reads as `waiting`. Keep human low-chroma sand (`#F6E9D6` fill) or neutral grey, and
  keep amber for queues and slips only.

### 3d. Review queue / inbox (Pellam R2)

Use when work arrives as items someone must clear (contracts, refunds, tickets, approvals).

```
[ tabs with counts: Needs review 9 | In redline 6 | Cleared 24 ]   [ document header · v3 · meta · Open in … ]
[ queue in an inset well, 380px ]                                  [ evidence view | rule callout       ]
[  selected item = lifted white card ]                             [ 3 KPI tiles                        ]
[  other items flat on the well     ]                              [ table of findings with status pills]
[ running-agent card: Reading X p6 of 14 ▬▬▬ ]                     [ ask input + context chip | ink primary with count ]
```

- Queue item: 36px monogram circle, title 14/500, meta 13 muted (`Vendor MSA · 18 pages`), right `Due Thu`
  (muted) or `◷ Due 16:00` (amber, only when today), an evidence strip (`.k-pips`: one pip per page, lit =
  flagged), right `7 flags`.
- The well (`.k-well`) is `bg-card`, 16px radius, 6px pad. Selected item: `bg-popover`, shadow-card, 1px
  accent ring. No borders between items.
- Evidence → rule: thumbnails grid, the active one ringed, a 1px dotted connector with an end dot to the callout
  card that shows the rule, the old text struck in red and the new text in accent.
- Bottom action bar spans the detail column: a 40px pill input `Ask … about this clause` with a context chip on
  the right, then the one primary, which states the count.

### 3e. Graph / tree / path (Vantage R5, Plotline R7)

- Canvas with a dotted 16px grid (`radial-gradient(var(--border) 1px, transparent 1px) 0 0/16px 16px`).
- Nodes are 48–56px cards: initials, name 14/500, caps tier tag (10px, tinted), right metric with tiny label
  prefix (`MG1 342`) and a 3px micro meter. Connectors: 1px `line-strong` elbows with 4px end dots; the
  selected path turns accent 1.5px.
- Columns (process path): mono caps heads `BUILD` + count badge, dashed 1px column rules, red 2px curve for the
  critical path, grey 1px for slack; legend top-right in words (`— Critical path  — Has slack  ▨ Blocked`).
- Long branches end with a dashed placeholder row `+ 51 more in this leg`.
- Toolbar: search with `/` kbd, zoom stepper `− 100% +` (mono), fit button; inline legend with counts on the
  right (`TIERS ● Diamond 1 ● Emerald 3`). Minimap 200×130 bottom-left at 60% opacity.
- Detail panel: 2×2 stats with delta chips (`+1.9 pts` green tint, then `vs 30.58%` muted), weekly bars,
  requirement meters, footer `Open` (secondary) + primary.

### 3f. Timeline (Proline R3)

Day columns with mono day labels; today's column tinted `--hover` with a 1.5px accent line and a dot at the top;
task bars are small white cards (title 13/500, one muted line, status dot right). Hover opens a popover card
with members, tags, status pill and deadline. Rows are tasks, not people.

### 3g. Panel gutter (every layout)

Pick one inner gutter for every side panel and card (16px) and hold it everywhere: panel headers, section
headers, list rows, form groups, and the first and last table cells (`tr>:first-child{padding-left:16px}`).
A table inside a panel is not a second card: no radius, no shadow, just top and bottom hairlines, sans text
with `tabular-nums` (mono only where digits must align as code). Table headers are sentence case
(`Range`, not `RANGE`; keep acronyms like `ID`, `LOS`). Numbers and ranks use `subtle`, never the accent.
When a table is wider than its panel, drop the least decision-relevant columns before shrinking type.

### 3h. Handoff map (cross-person process graph)

Use when tasks pass work between people. Columns are departments plus a final `Handoff to` column for external or other
recipients, so every edge runs left to right or straight down, never backwards.

- Column: mono caps head + count badge, dashed 1px `--border` rule between columns, 264px wide.
- Node (task card): 216 × 56, `.k-card`, 24px initials avatar, task name 14/500 (one line, ellipsis), right mono
  `4.5 h/mo` in `muted-foreground`. Selected: `.k-sel-ring`.
- Edges: soft cubic beziers, right-middle to left-middle, horizontal tangents, 1.5px `line-strong`, no arrowheads.
  Same-column edges run vertically (bottom-middle to top-middle). The heaviest chain is 2px `--danger`, drawn last.
- Rank rule: with no wait-time data, rank chains by volume (minutes × runs/month) and say so in the legend
  (`— Heaviest chain (h/mo)`, `— Handoff`). Never call it "critical path" or "bottleneck".
- Selected node opens a small detail card (240px, `shadow-overlay`): task, owner, `h/mo`, receives from / feeds into, one link.
- Always render a handoff table under the graph as the keyboard and screen-reader equivalent: `From`, `To`, `What`,
  mono `h/mo`; the heaviest rows carry `.k-crit`. Nodes are buttons; arrow keys follow edges.
- Narrow: the graph scrolls inside its own `overflow-x:auto` container with a `min-width` (columns × 264); never scale text.

### 3i. Gaps panel (data completeness)

Right rail (320px; under the content below 1080px) that turns missing data into questions to ask.

- Head: title + mono count, `.k-meter` + mono `72%`. Rollup line: hours accounted vs a baseline bar (`26 of ~160 h`, `.k-ticks`).
- Score: an empty core section caps it (no steps ⇒ ≤ 20%), so "not started" never looks nearly done.
- Items (`.k-gap`) grouped `Missing` (3px `--danger` rail) then `Weak` (`--warning` rail). Each is the exact question to ask a person
  (`What is the exact cash floor, and who sets it?`), with a mono `Step 3` chip prefix where it belongs to a step, and a checkbox.
- Primary `Copy 6 follow-ups` (count in the label, changes with the checks). Copy in the click handler with
  `navigator.clipboard.writeText`; fallback selects a hidden `<textarea>` and `execCommand('copy')`. Label flips to `✓ Copied` ~1.5s.
- Empty: one sentence, `Nothing missing.`

## 4. Fit one screen (no page scroll)

Required for consoles and ops views at 1024×768 through 2560×1440. Documents (About) scroll normally.

1. **Height chain.** When the console view is visible:
   `html, body {height:100%}`, page = flex column `height:100%`, `main` flex column `flex:1;min-height:0`,
   console `flex:1;min-height:0`. Use `100%`, not `100vh`, so it fits an artifact frame. Header padding uses
   `clamp(10px,2vh,20px)`.
2. **Lists share height.** Fixed-count lists (a fleet of 10) are flex columns whose rows are
   `flex:1 1 0; min-height:30px; max-height:78px; container-type:size`, and rows drop their second and third
   lines with `@container (max-height:64px)` / `(max-height:42px)`.
3. **Growing lists go dense.** For lists that grow (detections), cap them (`max-height:46%`, 36% on short
   screens) and after each render run
   `L.classList.toggle('dense', L.scrollHeight > L.clientHeight+1)` (also on resize). `.dense` rows lose
   their meta line and tighten padding.
4. **Detail cards shed detail, not content.** Make the card `container-type:size` and a flex column with
   `> * {flex:none}`; let the longest list inside (`.cues`) be `flex:0 1 auto; min-height:0; overflow:hidden`
   with a bottom fade mask. Then step down with container queries: hide the summary paragraph, the secondary
   chart, the provenance line; at very short heights show key stats as a 3-up row instead of image + list.
   Never let a card show only blank space; never hide the actions.
5. **KPI tiles clamp lines.** Tiles are `container-type:size`; the sub line uses
   `display:-webkit-box; -webkit-line-clamp:N` with N from container queries (3 → 2 → 1). Header: label
   `flex:none`, value `min-width:0` with ellipsis, so the label never truncates first.
6. **Fade, don't chop.** Feeds and lists that can exceed their box get
   `mask-image: linear-gradient(#000 calc(100% - 14–22px), transparent)` instead of a half-cut line.
7. **Avoid restart flicker.** If code re-sets `aria-current`/`aria-pressed` every tick, remove transitions on
   those elements or the active state renders mid-fade.

## 5. KPI tile recipe

```
label            12–13px/500 muted, one or two words   value-right: 11px mono subtle, ellipsis
NUMBER           30px/500 (.k-num), tabular, -0.03em; unit 14px muted, denominator / % in subtle at 400
micro visual     tick meter, pips, split bar, segment bar or sparkline — paired with the number it encodes
one line         OPTIONAL, exceptions only, ≤ 4 words, colored (+2 days red, 6 waiting amber); omit when all is normal
```

On a scene, tiles are white floating cards. On a page pick one of three shells:

- **Strip (R1):** one card, tiles split by 1px vertical rules, 20–24px padding. Quietest; default.
- **Banded (R7):** each tile is a `bg-card` card with a 36px header band (14px icon + label), and an inset white
  card (`rounded-lg shadow-card`) holding the number, line and meter.
- **Inline (R6):** number and context side by side in one row (`1  waiting, avg. 1.4 days  [ML AT LB]`) when
  the tile is short.

Rules: same baseline for every tile in a row; the number never wraps; one huge numeral with a tiny label beats a
sentence (R4). Numbers are the one place the size ladder is allowed to climb.

## 6. Verify like a machine

Screens lie at small zoom; measure. Run `assets/fit-audit.js` in the page (paste into devtools or a
browser tool) at 1024×768, 1280×720, 1440×900, 1920×1080, 2560×1440:

- page vertical/horizontal overflow must be 0,
- each scroll-sensitive container (`scrollHeight - clientHeight`) must be 0,
- the clip list (text cut by an overflow-hidden ancestor, minus faded feeds) must be empty,
- the overlap pairs (overlay vs card) must be empty.

Also test the **late state** (end of mission, full lists, longest strings), every mode/tab, open drawers and
wizards, and use a cache-busting query (`?v=N`) on every reload, because local servers cache.

## 7. Single-file pages and Claude artifacts

When there is no Tailwind (one HTML file, a Claude artifact, a demo):

- Load `assets/magic-plain.css` tokens and classes inline, plus Inter from Google Fonts (mono: IBM Plex Mono
  for data). Light only is fine when the owner asks; then set every color explicitly and give `body` a
  background.
- Layer overrides at the end of the stylesheet in named blocks (`/* ===== polish ===== */`) instead of
  rewriting earlier rules; IDs beat classes, so scope `#strip>div:not(#cMesh)` style rules carefully.
- Embed data (`data:` images, base64 typed arrays) so the page works offline and in the artifact sandbox.
- Keep the artifact and the local file in sync from one source (strip the wrapper to publish).

## 8. Act in place (R1, R2, R6, R7)

The best references never navigate away to act. The pattern:

1. **Pick.** Row click → floating drawer (`.k-drawer`, 400px, 12px inset, 20px radius). The list behind gets
   `.is-dimmed` (rows blur 2.5px, opacity .45); the picked row gets `.k-lifted` and stays sharp.
2. **Decide with the consequence visible.** Drawer anatomy, top to bottom: eyebrow row (`↺ Refund · #3021`,
   right `Edited · Reset` in accent once changed, close X) → identity (40px monogram, name 18/600, one meta
   line) → the customer's own words in a `.k-callout` (quote only, no explainer line) → `What's coming back` check rows (`.k-check-row`,
   unchecked price struck) → `Where the money goes` radio cards (`.k-radio-card`, consequence line under each,
   bonus in green `+$9.20`) → summary line + big total (`Maya gets      $92.00`) →
   full-width ink primary that names the result.
3. **Confirm in place.** Primary flips to `✓ Done`, drawer closes, the row's status pill updates in place,
   and a dark toast (`.k-toast`) says the result with `Undo` for 5s. No modal "Are you sure?" when Undo exists.
4. **Suggest the fix where the problem is.** A stuck step or a slipping path gets an inline card with one
   action and its effect (`Nudge Stripe for the sandbox keys · 8 Dec → 4 Dec · unblocks 2 tasks`).

Status pills follow urgency (R6): needs-you = inverse ink pill with a blue dot (`● Return requested`); waiting =
amber tint; at risk = red tint; good/ready = blue tint with dot; settled = quiet grey pill with no dot
(`Fulfilled`, `↺ Refunded $98.00`). Only the first kind may be loud.

**Sensitive subjects.** When the screen is about people's own work (process mapping, performance, workload):

- The suggestion popover's primary records instead of applying: `Note as opportunity`, with a footer line `Records only` (≤ 3 words). It still names its result.
- Copy never uses headcount or replacement language (`saves 1 FTE`, `replace`, `reduce`). Use time back: `Gives back 4.5 h/mo`.
- Never rank people. Rank tasks and handoffs.

## 9. Charts (R3, R5, R2)

Charts are small, single-purpose and paired with the number they explain. No chart without a takeaway in the
card title or the number itself; never in a caption.

- **Period bars (R5):** `.k-bars`. Rounded-full 14–16px bars on a full-height track, accent fill, the running
  period at 55% with a bold label and a dark tooltip pill `W31 · 75 so far`. Title right: `-50% vs W24–27`.
- **Line (R3):** 1.5px accent line, comparison series 1.5px dashed `subtle`, area fill ≤8% accent (no gradient
  rainbow), 3 dotted gridlines, 11px `subtle` axis labels, legend as two dots top-left, a 6px end dot on the
  latest point, a period select pill top-right.
- **Rank bars (R2, R3):** `.k-rank`. Mono label, 6px bar on a track, value right; the row in focus turns accent.
- **Split bar (R1):** `.k-split` for "where the time goes" — two to five segments, labels inside.
- **Tick meter (R7):** `.k-ticks` for counts with a budget (tasks, days, hours): one tick per unit, red hatch
  past the budget, a 2px marker for today/limit, mono value right (`12 / 10d`, `44 → 50`).
- **Requirement meter (R5):** `.k-req` for goals: `596 / 600 active subs` left, `4 to go` right, `Met` in green.
- Never: 3D, pie with >3 slices, dual y-axes without labels, gauges for a single percentage (use the number).
