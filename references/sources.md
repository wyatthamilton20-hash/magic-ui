# Reference pass (2026-11-22)

Eight posts the owner picked as the bar. Each row says what the skill took and where it now lives. When a rule
here conflicts with an older rule, this pass wins unless the project's own docs say otherwise.

| # | Source | What it is | Taken into the skill | Lives in |
|---|---|---|---|---|
| R1 | [Puzzle · @thesamirho](https://x.com/thesamirho/status/2124533365487636771) | process view, light | KPI strip as one card split by 1px rules; value + muted unit ("4.6 days, median"); split bar "where the time goes" with names inside segments and thin accent slivers for agent time; step cards joined by arrows, selected step = 1.5px accent ring; anchored suggestion popover with a proof line ("Like step 3: about 4 min") and Cancel + ink primary that names its target ("Apply to step 2"); right rail lists with two-line right-aligned stats, amber for waiting | dashboards §1, §3c, §5, §8; components §12–§14 |
| R2 | [Pellam contract inbox · @augustasdesign](https://x.com/augustasdesign/status/2124394709556572529) | review queue, light | segmented tabs with counts; queue inside an inset grey well, selected item lifts out as a white card with a tinted ring; per-item evidence strip (pages as pips, flagged ones lit); due time amber with clock only when today; page-thumbnail grid with a dotted connector to a callout; rank bars with the active row in accent; tinted status pills; bottom action bar = ask-input with context chip + ink primary with the count ("Approve 5 redlines"); running-agent card with "p6 of 14" progress; sidebar agent list with state word on the right | dashboards §3d, §8; components §13, §15 |
| R3 | [MONABLIZ set · @MONABLIZUIUX](https://x.com/MONABLIZUIUX/status/2123662577339080832) (3 shots: logistics globe, AI ops SaaS, project timeline) | "Good dashboards don't show data. They show what to do next." | the caption is now principle 1 of the copy rules; route rows (origin · progress track with vehicle · destination); line chart with a dashed comparison series, end dot, 3 dotted gridlines; rank-bar list; timeline with day columns, today column tinted + vertical line, task bars as small cards with a status dot. Rejected: icon-in-square KPI tiles, gauge, gradient area fills, "Hello, Alex 👋" (copy cost, no decision) | dashboards §1, §3f, §9 |
| R4 | [Pitch deck templates · @MONABLIZUIUX](https://x.com/MONABLIZUIUX/status/2123845670373032110) | slide templates, not dashboards | only two things transfer: one huge numeral with a tiny label beats a sentence; numbered section index (01 / 02 / 03) for About pages. Display serif italics, condensed caps and full-bleed photos are deck language and stay out of the work surface | dashboards §5, §2 (About) |
| R5 | [Vantage network · @jubayer6910](https://x.com/jubayer6910/status/2123806070326038828) | genealogy tree, dark | tree with elbow connectors, selected path + node in accent; node = initials, name, tiny caps tier tag, right metric with tiny label prefix ("MG1 342") and a micro meter; "+ 51 more in this leg" dashed row; toolbar search with `/` kbd hint, zoom stepper, fit button; inline legend with counts ("TIERS ● Diamond 1"); minimap; detail panel 2×2 stats with delta chips "+1.9 pts vs 30.58%"; weekly bars with the running week lighter + tooltip "W31 · 75 so far"; requirement meters "596 / 600 · 4 to go" → "Met"; header "as of Fri Jul 31, 08:10" | dashboards §1, §3e, §9; components §14, §16 |
| R6 | [Drawers video · @kshvbgde](https://x.com/kshvbgde/status/2123675695402680702) | orders table → refund drawer, 30s | floating drawer (12px inset, 20px radius) instead of an edge sheet; rows behind blur ~2–3px and fade to ~45%, the chosen row stays sharp and lifts; drawer enters with fade + scale .97 + blur 6→0 (~260ms); customer quote callout; check rows with thumbnails, unchecked price struck through; radio cards with a 2px ink ring; consequence line ("Maya gets · 2 items restock", "Back on the card by Dec 2", store credit "+$9.20"); primary names the amount and destination ("Refund $92.00 to Visa") then flips to "Done"; row updates in place to "Refunded $98.00"; dark toast "✓ Refunded $98.00 to Maya · Undo"; status pills: action-needed = inverse black pill with blue dot, settled = quiet grey pill | dashboards §8; components §13, §15; motion "Act-in-place" |
| R7 | [Plotline · @Suryansh777777](https://x.com/Suryansh777777/status/2123778064928960720) | project outlook, light | header sentence with inline emphasis (bold dates, red only for the slip: "ships Tue 8 Dec, 2 working days late vs the Fri 4 Dec promise"); "At risk" tinted pill next to the title; view tabs with mono counts; KPI tile = grey header band (icon + label) over an inset white card; muted denominators "31/50", "95%"; tick meters (one tick per unit, red hatch for over); critical-path graph with mono caps column heads + count badges, red path, grey slack; "Break the path" card with one ink action; table with red left bar for critical rows, mono ID under the title, estimate-vs-spent ticks, plain-language "Why it matters" column, footer fact bar; "Synced with Linear 2 min ago" | dashboards §1, §3c, §3e, §5; components §12, §14 |
| R8 | [SF isometric, drawn in code · @kevin_t_ngo](https://x.com/kevin_t_ngo/status/2123194632670748790) | 51s illustration build, not a dashboard | only for map-first heroes and About pages: a scene may assemble tile by tile once on first load (≤1.2s, skipped on reduced motion), on a warm paper tone. Never on data surfaces | motion "One-off scene build" |

Pattern counts across R1, R2, R5, R6, R7 (the five real dashboards): ink (near-black) primary in 3 of 5 (R1, R2, R6), mono
for IDs/dates/clocks in 2 of 5 (R5, R7), display-size KPI numbers (28–34px) in 5 of 5, tinted status pills in 5 of 5,
a one-sentence state line under the title in 5 of 5.

## Applied example: Process Atlas (2026-11-22)

Process mapping dashboard (a consultant-only internal tool).
Combined R7 (framed shell, sentence headline, tick bars, red chain) + R1 (step cards, time bar, suggestion popover).
New sections it added: dashboards §2 knowledge page, hierarchy switcher, generated header sentence; §3c three-state
ownership; §3h handoff map; §3i gaps panel; §8 sensitive subjects; plain-css `.k-mode`, `.k-gap`.

## Pulling references from X

1. Use the `browser-harness` skill in the user's logged-in Chrome (X hides posts from logged-out fetches).
2. Open the post, then read images with `article img[src*="pbs.twimg.com/media"]`; request `?format=jpg&name=large`.
3. A post that looks like video often still exposes a still image in the article; take that.
4. Save to the project's `design-refs/` and add a row above (author, what it is, what was taken, where it lives).

