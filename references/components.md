# Kargul component recipes

All class strings assume `assets/kargul-tokens.css` is loaded and `cn` = clsx + tailwind-merge
(`@/lib/utils`). Hard-coded hexes from the reference are already replaced by tokens. Ready-made strings live in
`assets/kargul-variants.ts` (`buttonVariants`, `tagVariants`, `k.*`).

## 0. Primitive mapping (reference = `radix-ui` + `cmdk`; target = `@base-ui/react` / shadcn-base)

| Reference (Radix) | Base UI equivalent | Notes |
|---|---|---|
| `DropdownMenu.Root/Trigger/Content` | `Menu.Root/Trigger/Portal/Positioner/Popup` | `sideOffset`, `align` move to `Positioner` |
| `Dialog` (dialog, sheet, command) | `Dialog.Root/Portal/Backdrop/Popup/Title/Description/Close` | Overlay → `Backdrop`; Content → `Popup`; `onCloseAutoFocus` → `finalFocus` |
| `Popover` | `Popover.Root/Trigger/Portal/Positioner/Popup` | `collisionPadding` on Positioner |
| `Select` | `Select.Root/Trigger/Value/Icon/Portal/Positioner/Popup/Item/ItemText/ItemIndicator` | trigger width var `--anchor-width` |
| `Tabs.List/Trigger/Content` | `Tabs.List/Tab/Panel` | |
| `Checkbox` | `Checkbox.Root/Indicator` | |
| `ScrollArea` | `ScrollArea.Root/Viewport/Scrollbar/Thumb` | or native `overflow-auto` + thin scrollbar (tokens set it) |
| `Slider` | `Slider.Root/Control/Track/Indicator/Thumb` | Range → Indicator |
| `asChild` | `render={<Button …/>}` | |
| `data-[state=open]` | `data-open` (popup) / `data-popup-open` (trigger) | |
| `data-[state=closed]` | `data-closed` | |
| `data-[highlighted]` | `data-highlighted` | same name |
| `data-[state=checked]` | `data-checked` | `data-unchecked`, `data-indeterminate` |
| `data-[state=active]` (tab) | `data-active` | |
| `--radix-*-content-available-height` | `--available-height` | |
| `--radix-*-content-transform-origin` | `--transform-origin` | `origin-(--transform-origin)` |
| tw-animate `animate-in/out` on state | prefer `transition-[opacity,scale]` + `data-starting-style:` / `data-ending-style:` | Base UI waits for both |
| `cmdk` `Command.Dialog` | cmdk `Command` inside Base UI `Dialog.Popup` | see `assets/command-palette.tsx` |

Plain (no primitive) in the reference: Table, Tag, CountBadge, SegmentBar, Sparkline, Button (cva), Input, Field,
Avatar, SidebarSection/NavItem, SidebarResizer, TableFooter, DetailSection, ScoreCard.
In a shadcn-base project, restyle the existing `components/ui/*` by swapping class strings; do not add a second
primitive library.

## 1. App shell

```tsx
<main className="flex h-dvh max-w-full overflow-hidden">
  <aside className="relative hidden w-(--sidebar-width) shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
    <SidebarContent />
    <SidebarResizer />           {/* assets/sidebar-resizer.tsx */}
  </aside>
  {/* < lg: same SidebarContent in a left Sheet, w-[254px] max-w-[85vw] border-sidebar-border bg-sidebar */}
  <section className="flex min-h-0 min-w-0 flex-1 flex-col">
    <Header />                   {/* shrink-0 */}
    <Toolbar />                  {/* shrink-0 */}
    <div className="flex min-h-0 flex-1 flex-col border-t border-border">
      <div className="min-h-0 flex-1 overflow-auto">{/* table */}</div>
      <TableFooter />
    </div>
  </section>
</main>
```

Only the table region scrolls; header/toolbar/footer are `shrink-0`. Detail views open as right sheets over
the table instead of navigating.

### Sidebar content

| Part | Classes |
|---|---|
| column | `flex h-full min-h-0 flex-col` |
| brand block | `flex shrink-0 items-center gap-2 border-b border-sidebar-border bg-sidebar-accent p-3`; logo `size-8`; title `lead-style font-medium tracking-[-0.01em] truncate`; subtitle `caption-style text-subtle truncate`; stack `flex flex-col gap-1` |
| scroll region | `min-h-0 flex-1 overflow-y-auto` with `<nav aria-label="Primary">` |
| section | `flex flex-col gap-1 p-3` + `border-b border-sidebar-border` (not on last); title `eyebrow-style block font-medium text-faint` (AA: `text-subtle`); list `<ul className="flex flex-col">` |
| nav item | `buttonVariants({variant:"nav",size:"md"})` + `group h-[30px] gap-1.5 py-0 data-[active=true]:h-8`; `<li>` gets `mb-0.75` when active; `aria-current="page"` |
| nav icon | `size-3.5 shrink-0 text-subtle transition-colors duration-150 ease-power3-out group-hover:text-icon group-data-[active=true]:text-icon` |
| nav label | `min-w-0 flex-1 truncate text-left` then optional `CountBadge` |
| quiet items (Invite, Help) | nav item + `text-subtle`, pinned below scroll region in `shrink-0 border-t border-b` section |
| footer block | `flex shrink-0 items-center justify-between gap-2 border-b border-sidebar-border bg-sidebar-accent p-4`; value `lead-style font-medium`, caption `caption-style text-subtle`, gap-2; action `muted` md button |
| pipeline dots | 12px colored dot svg as the icon slot |

```tsx
function NavItem({ icon: Icon, label, count, active }: NavItemProps) {
  return (
    <li className={cn(active && "mb-0.75")}>
      <button
        type="button"
        data-active={active}
        aria-current={active ? "page" : undefined}
        className={cn(buttonVariants({ variant: "nav", size: "md" }), "group h-[30px] gap-1.5 py-0 data-[active=true]:h-8")}
      >
        <Icon aria-hidden className="size-3.5 shrink-0 text-subtle transition-colors duration-150 ease-power3-out group-hover:text-icon group-data-[active=true]:text-icon" />
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        {count !== undefined && <span className={k.countBadge}>{count}</span>}
      </button>
    </li>
  );
}
```

Resizer: invisible 8px hit strip `absolute inset-y-0 -right-1 w-2 cursor-col-resize`, visible 1px line only on
hover/focus (`group-hover:bg-line-strong`, `group-focus-visible:bg-subtle`); arrows ±10px, Home/End = 200/400,
double-click resets 254, width persisted to `localStorage` and painted pre-hydration by an inline `<head>` script.
"Collapsible": the reference does not icon-collapse; below `lg` the sidebar becomes a Sheet. If a desktop
collapse is required, toggle `--sidebar-width` to `0px` with `transition-[width] duration-250 ease-power3-out`
on the aside plus `overflow-hidden` (not in reference).

### Header

```tsx
<header className="shrink-0">
  <div className="flex items-center justify-between gap-2 px-4 py-[14px]">
    <div className="flex min-w-0 items-center gap-2">
      <button className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "lg:hidden")} aria-label="Open navigation">…</button>
      <h1 className="h1-style truncate">Companies</h1>
      <span className={k.statusPill}><span aria-hidden className={k.statusDot} />Active</span>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <button className={buttonVariants({ variant: "secondary", size: "icon" })} aria-label="Search" aria-keyshortcuts="Meta+K Control+K">…</button>
      <button className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "relative")} aria-label="Notifications, 3 unread">
        <BellIcon className="size-3.5" /><span aria-hidden className={k.unreadDot} />
      </button>
      <button className={cn(buttonVariants({ variant: "secondary", size: "none" }), "caption-style h-[30px] gap-1.5 py-[5px] pr-[7px] pl-[5px] font-normal")}>
        <img src={avatar} alt="" className={k.avatar} /><span className="hidden sm:inline">Jensen</span>
      </button>
    </div>
  </div>
  {/* tabs row, §8 */}
</header>
```

Toolbar under the tabs: `flex shrink-0 flex-wrap items-center justify-between gap-2 px-4 py-4`; filters
`hidden min-w-0 flex-wrap gap-2 sm:flex`; actions `flex shrink-0 items-center gap-1` = secondary "Export"
(icon `size-3`) + primary "New …". Below `sm` filters collapse into one secondary "Filters" button with a
CountBadge of active filters that opens a bottom Sheet of Selects.

## 2. Data table

Built as a `<table>` whose parts use CSS grid + subgrid so every column is `max-content` and the table
`justify-between`s to fill the width (no fixed widths, no colgroup):

| Part | Classes |
|---|---|
| table | `grid min-w-max grid-cols-[repeat(N,max-content)] justify-between w-full text-[14px] leading-none` (`role="table"`) |
| thead / tbody | `contents` (`role="rowgroup"`) |
| tr | `col-span-full grid grid-cols-subgrid border-b border-border transition-colors duration-150 ease-power3-out` |
| th | `caption-style flex h-[38px] items-center px-3 font-normal whitespace-nowrap text-subtle` |
| td | `flex h-[42px] items-center px-3 whitespace-nowrap` |
| numeric col (th + td) | `justify-end tabular-nums` |
| row interactive | `cursor-pointer hover:bg-card/60` |
| row selected / open-in-sheet | `data-[active=true]:bg-card data-[active=true]:border-card` (border dissolves into fill) |
| first col | `flex items-center gap-5` checkbox + name |
| money | `<span className="flex items-center gap-1"><span className="text-muted-foreground">$</span>{fmt}</span>` |
| percent + meter | `flex items-center gap-2` → `SegmentBar w-[74px]` + `<span className="w-[4ch] text-right">` |
| date + label | `flex items-center gap-1` icon `size-3.5` · `tabular-nums` date · `mx-[3px] h-2 w-px bg-hairline` · label |
| owner | ghost button `size="none" -mx-1.5 gap-1.5 px-1.5 py-1 font-normal text-foreground` + 20px avatar |
| row action | ghost `icon-sm` (24px) dots icon `size-3`, `bg-hover` while that row's sheet is open |
| empty | `<td className="caption-style col-span-full flex h-[120px] items-center justify-center text-muted-foreground">` |

Cells that contain buttons stop propagation so row click (open detail) and inner clicks don't collide.
Header checkbox is tri-state (`checked | "indeterminate" | false`) over visible rows.

Checkbox: `size-4 rounded-[4px] text-check-empty hover:text-line-strong focus-visible:ring-2 focus-visible:ring-ring/60`;
three stacked 16px icons: outline square (`currentColor`, 1.33 stroke) / filled check-square / filled minus-square in
`text-check`, toggled by `group-data-checked:` / `group-data-indeterminate:` (Radix: `group-data-[state=checked]`).

### Borders-between-items: outline grid pattern

For tiles that need 1px separators on all sides without doubled borders (table footer calculators, stat grids):

```tsx
<div className="caption-style grid shrink-0 grid-cols-2 gap-px border-b border-border bg-background p-px sm:grid-cols-4">
  <div className="flex items-center gap-2 p-3 outline-1 outline-border"><span className="text-foreground">{count}</span><span className="text-muted-foreground">Companies in view</span></div>
  <div className="flex items-center gap-2 p-3 text-muted-foreground outline-1 outline-border"><PlusIcon className="size-3" />Sum of pipeline</div>
</div>
```

`gap-px` leaves a 1px seam; each child's 1px `outline` paints into the seam, and neighbours' outlines overlap
into one line. `p-px` on the parent leaves room for the outer edge. Works at any column count, no `:nth-child`.
Related: stacked sections inside sheets use `shadow-[inset_0_-1px_0_var(--line-strong)]` (+ `last:shadow-none`)
instead of `border-b` so dividers never change layout; plain lists use `divide-y divide-border`.

## 3. Filter menu, chips, tags, count badges

Filter menu (`assets/filter-menu.tsx`, Base UI): split trigger "Label | Value ⌄".

| Part | Classes |
|---|---|
| trigger | secondary, `size="none"`, `group h-[30px] gap-0 overflow-hidden text-[12px] data-popup-open:bg-muted` |
| label segment | `px-[9px] font-normal text-subtle` |
| divider | `h-full w-px bg-hairline-soft` |
| value segment | `flex items-center px-[9px] gap-1.5` (`gap-1` when no label) |
| chevron | `size-3 text-chevron transition-transform duration-200 ease-power3-out group-data-popup-open:rotate-180` |
| popup | `min-w-[168px] rounded-lg border border-line-strong bg-popover shadow-overlay`, inner `p-1`, `sideOffset 6`, max-h `min(360px, var(--available-height))` |
| group label | `caption-style px-2 py-1.5 text-subtle` (repeats the trigger label) |
| radio item | `caption-style rounded-md py-2 pr-2 pl-6 text-soft data-highlighted:bg-hover data-highlighted:text-foreground data-checked:text-foreground` |
| radio indicator | `absolute left-2 size-2` holding `size-1.5 rounded-full bg-status` dot |
| plain item | `caption-style flex gap-2 rounded-md px-2 py-2 text-foreground data-highlighted:bg-hover` |
| separator | `-mx-1 my-1 h-px bg-line-strong` |

Single-select only; sort uses the same component. A filter with no label (inside a sheet section header) shows
just the value. Active filter count goes on the mobile "Filters" button.

Tag (`tagVariants`): `inline-flex h-[22px] rounded-full border px-2 text-[14px] leading-none` (sm `px-1.5`);
rows of tags `flex items-center gap-[3px]`; show max N then `+{hidden}` neutral sm tag. Inside the command
palette and sheets use `size="sm"`.

Count badge (`k.countBadge`): `caption-style inline-flex h-4 min-w-6 rounded-full border-[0.5px] border-count-border bg-muted px-1 text-chip shadow-count`.
Used in nav items, popover titles ("Notifications 3"), mobile filter button.

Status pill (`k.statusPill`): `caption-style inline-flex items-center gap-0.5 rounded-full border border-pill-border bg-muted py-[3px] pr-[5px] pl-[3px]` with a 12px box holding an 8px `bg-status` dot.

## 4. Segment bar (`assets/segment-bar.tsx`)

Container `flex h-[14px] items-center gap-[2px] overflow-hidden rounded-[2px] bg-meter px-[2px]`; 17 segments
`h-[10px] min-w-px flex-1 rounded-[1px]`; filled = `round(pct/100 × segments)`; empty `bg-track`.
`tone="auto"`: first ⌊filled/3⌋ danger, next ⌈filled/3⌉ warning, rest success — so a high score shows a long
green tail, a low score is mostly red. Fixed tones for stage rows. Detail variant: 63 segments,
`h-3 w-full border border-hover-faint px-px`, segments `h-2`, track `bg-meter`, with a `caption-style` label row
(`flex justify-between`) above, `gap-2`. Always pair with the numeric value (`w-[4ch] text-right tabular-nums`);
`role="meter"` + `aria-valuenow`.

## 5. Sparkline (`assets/sparkline.tsx`)

`flex h-[14px] items-end gap-px`; bars `w-1 shrink-0 rounded-[1px]`, height in px 1–14; colors `bg-trend` /
`bg-trend-muted`. 14 values → 69px wide. Detail variant height 22px beside a 24px total (`flex items-baseline gap-[3px]`).
Reference colors bars by a fixed decorative pattern; the asset defaults to `emphasis="median"` (bars ≥ median
bright). Use `emphasis="last"` to spotlight the current period. Table column header centered (`justify-center`).

## 6. Command palette (`assets/command-palette.tsx`)

| Part | Classes / values |
|---|---|
| backdrop | `fixed inset-0 z-50 bg-overlay backdrop-blur-[6px]` |
| popup | `fixed top-[12dvh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[560px] rounded-xl border border-line-strong bg-popover shadow-overlay overflow-hidden` (table-style results: `max-w-[960px]`) |
| input row | `flex h-12 items-center gap-2.5 border-b border-line-strong px-4`; search icon `size-3.5 text-subtle`; input `text-[14px] placeholder:text-subtle`; trailing `<Kbd>Esc</Kbd>` |
| results header (optional) | `caption-style h-9 border-b border-line-strong px-4 text-subtle` grid matching rows; hidden when 0 results |
| list | `max-h-[min(360px,50dvh)] overflow-y-auto p-1.5`, cmdk `loop` |
| item | `flex h-10 items-center gap-3 rounded-lg px-2.5 text-[14px] text-soft data-[selected=true]:bg-hover data-[selected=true]:text-foreground`; data rows `h-11 text-foreground` |
| item icon tile | `k.iconTile` (24px, `rounded-md bg-muted shadow-tile`), glyph `size-3 text-soft` |
| group heading | `[cmdk-group-heading]`: `px-2.5 pt-2 pb-1.5 text-[12px] font-medium tracking-[1px] uppercase text-subtle` (ref: `text-faint`) |
| empty | `caption-style py-10 text-center text-subtle` — `No results for “{query}”` |
| footer | `caption-style flex h-10 items-center gap-4 border-t border-line-strong px-4 text-subtle`; hints `flex items-center gap-1.5` `<Kbd>↑</Kbd><Kbd>↓</Kbd> Navigate`, `<Kbd>↵</Kbd> Open` |
| kbd | `k.kbd` (`h-5 min-w-5 rounded-md border border-line-strong bg-muted px-1.5 text-soft`) |

⌘K/Ctrl+K toggles (ignore with Alt/Shift); header search button carries `aria-keyshortcuts`. Clear the query
on close; when an item ran an action, skip focus-return to the trigger (Base UI `finalFocus={false}` when
`actionRan`). Results grid columns collapse with breakpoints (2 → 4 → 6 columns).

## 7. Overlays: sheet, dialog, popover, dropdown, select

| Surface | Container | Motion (in / out) |
|---|---|---|
| Dropdown / Select | `rounded-lg border border-line-strong bg-popover shadow-overlay`, `p-1`, offset 6 | fade + scale .95, 200ms power3-out / 150ms power3-in |
| Popover | `rounded-xl` …, align end, offset 8, collision padding 16, `origin-(--transform-origin)` | fade + scale .97, 200 / 150 |
| Dialog | `fixed top-1/2 left-1/2 -translate-1/2 w-[calc(100%-2rem)] max-w-[480px] rounded-xl border border-line-strong bg-popover shadow-overlay flex flex-col overflow-hidden`; content scroll `max-h-[calc(100dvh-2rem)]` | fade + scale .95, 250 / 200 |
| Command | see §6 | fade + scale .98, 200 / 150 |
| Sheet right/left | `fixed inset-y-0 right-0 h-dvh w-full sm:w-[560px] (detail) / sm:w-[480px] (profile) border-l border-line-strong bg-background flex flex-col` | slide full width, 350ms power3-out / 250ms power3-in |
| Sheet bottom (mobile) | `inset-x-0 bottom-0 max-h-[85dvh] rounded-t-xl border-t border-line-strong shadow-overlay` | slide from bottom, 350 / 250 |
| Backdrop (all modal) | `bg-overlay backdrop-blur-[6px]` | fade; dialog 250/200, sheet 350/250, command 200/150 |

Inner layout:
- Sheet header `h-14 border-b border-line-strong px-6 flex items-center justify-between gap-2`: left `flex items-center gap-2` = 14px `text-icon` glyph + `lead-style` title; right ghost `icon-sm` close `-mr-1` with `size-4` X.
- Sheet body `min-h-0 flex-1 overflow-y-auto`; entity hero `flex items-start gap-3 p-5` + inset divider: 50px tile `k.iconTileLg` + `h2-style truncate` + tag row (`gap-[3px]`, `gap-3` below title).
- Sheet section `flex flex-col gap-4 p-5 shadow-[inset_0_-1px_0_var(--line-strong)]`; title `<h4 className="eyebrow-style font-normal">`; with an action: `flex h-[30px] items-center justify-between gap-2`.
- Sheet footer `h-[62px] border-t border-line-strong px-6 flex items-center justify-between`: left `link` button, right `subtle` Cancel + `primary` Save (`gap-2`, size sm).
- Dialog header `flex flex-col gap-2 border-b border-line-strong px-6 py-5` (`h2-style` title, `caption-style text-soft` description); close `absolute top-4 right-4` ghost icon-sm; footer `flex justify-end gap-2 border-t border-line-strong px-6 py-4`; form sections `fieldset flex flex-col gap-4 px-6 py-5` + inset divider, legend `eyebrow-style text-soft`.
- Popover (notifications) `w-[min(400px,calc(100vw-2rem))]`: header `flex h-14 items-center justify-between px-4` (`h2-style` + CountBadge, ghost sm "Mark all as read" `-mr-1.5`); tabs `border-b border-line-strong px-4`, triggers `py-3`; list `flex flex-col gap-0.5 p-1.5`, max-h `min(420px,60dvh)`; item = `item` button `p-3`, unread `bg-hover-faint` + 6px `bg-danger` dot at `top-4 right-3`.
- Empty state: `flex flex-col items-center gap-2 px-6 py-12 text-center`; 40px circle `bg-muted shadow-tile` with 16px `text-soft` icon; `lead-style mt-1 font-medium` title; `caption-style text-subtle` line.

Base UI popup recipe (interruptible transitions instead of keyframes):

```tsx
<Popover.Positioner sideOffset={8} align="end" collisionPadding={16} className="z-50">
  <Popover.Popup className="origin-(--transform-origin) overflow-hidden rounded-xl border border-line-strong bg-popover text-popover-foreground shadow-overlay outline-none transition-[opacity,scale] duration-200 ease-power3-out data-starting-style:scale-[0.97] data-starting-style:opacity-0 data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-power3-in">
```

Sheet (Base UI Dialog): `transition-[translate] duration-350 ease-power3-out data-starting-style:translate-x-full data-ending-style:translate-x-full data-ending-style:duration-250 data-ending-style:ease-power3-in motion-reduce:transition-opacity motion-reduce:data-starting-style:translate-x-0 motion-reduce:data-starting-style:opacity-0 motion-reduce:data-ending-style:translate-x-0 motion-reduce:data-ending-style:opacity-0`.
(shadcn-base sheet ships `translate-x-[2.5rem]` + fade at 200ms ease-in-out — replace with the above to get the Kargul full-width slide.)

## 8. Tabs (underline)

```tsx
<Tabs.List className="flex items-center gap-4 border-b border-border px-4">
  <Tabs.Tab value="companies" className="group caption-style -mb-px grid cursor-pointer border-b border-transparent py-4 text-center text-subtle outline-none select-none transition-[color,border-color] duration-150 ease-power3-out hover:text-soft focus-visible:text-foreground data-active:border-foreground data-active:text-foreground">
    <span aria-hidden className="invisible col-start-1 row-start-1 font-medium">Companies</span>
    <span className="col-start-1 row-start-1 group-data-active:font-medium">Companies</span>
  </Tabs.Tab>
</Tabs.List>
```

The invisible medium-weight twin reserves the bold width, so activating a tab never shifts its neighbours.
Underline sits on the list's bottom border (`-mb-px`). No sliding indicator, no pill. Compact variant in
popovers: `py-3`, list border `border-line-strong`.

## 9. Buttons (`buttonVariants`)

Base: `inline-flex items-center justify-center gap-1.5 rounded-full font-medium leading-none whitespace-nowrap select-none transition-[background-color,color,box-shadow,scale] duration-150 ease-power3-out focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50`.

| Variant | Rest | Hover / state | Use |
|---|---|---|---|
| `primary` | `bg-primary text-primary-foreground shadow-primary` | `bg-primary-hover` | one per view ("New Company", "Save Update") |
| `secondary` | `bg-secondary shadow-control` | `bg-muted`; open trigger `bg-muted` | default: toolbar, icon buttons, filter triggers |
| `muted` | `bg-muted shadow-control` | `bg-muted-hover` | action inside a tinted block (sidebar footer) |
| `subtle` | `bg-subtle-bg shadow-subtle` | `bg-muted` | Cancel next to primary |
| `ghost` | `text-subtle` | `bg-hover text-foreground` | close X, row action, "Mark all as read", owner chip |
| `nav` | `w-full justify-start rounded-lg text-sidebar-foreground` | `text-foreground`; `data-[active=true]:bg-sidebar-primary shadow-control` | sidebar |
| `item` | `w-full items-start gap-3 rounded-lg text-left font-normal whitespace-normal` | `bg-hover-faint` | list rows that are buttons (notifications) |
| `link` | `rounded-none underline decoration-from-font underline-offset-2` | `text-soft` | footer help link |

| Size | Classes | Box |
|---|---|---|
| `sm` | `p-[9px] text-[12px]` | 30px tall with 12px icon (`size-3`) |
| `md` | `p-2 text-[14px]` | 30px tall (nav) |
| `icon` | `size-[30px]` | icon `size-3.5` |
| `icon-sm` | `size-6` | icon `size-3`/`size-4` (close) |
| `none` | `p-0` | caller sets padding (pills, filter trigger) |

Always pass an explicit `variant`. Icon + label gap 6px (`gap-1.5`). Optional press feedback
`press: true` → `active:not-disabled:scale-[0.96]` (from the repo's better-ui skill; reference buttons do not
scale). 24px targets (`icon-sm`) are the WCAG 2.5.8 floor — keep ≥ 4px between them.

Inputs: `k.input` (`h-9 rounded-lg border border-line-strong bg-secondary px-3 placeholder:text-subtle focus-visible:border-ring`); select trigger identical + chevron; field `flex flex-col gap-2`, label `caption-style text-soft` (required `*` in `text-subtle`), hint `caption-style text-subtle`, error `caption-style text-danger` with `role="alert"`, wire `aria-describedby`.
Slider: root `h-5`, track `h-1.5 rounded-full bg-track`, range `bg-soft`, thumb `size-4 rounded-full bg-foreground shadow-thumb`, focus `0 0 0 4px` hover-tint ring.

## 10. Sliding number

`assets/sliding-number.tsx` (motion spring 280/18/0.3) or `assets/sliding-number-css.tsx` (zero-dep, 240ms
power3-out). Use for KPI values that change while the user watches (filter changes, live sync), not for static
table cells. Wrap in the KPI style: `stat-style` (24px) or `stat-lg-style` (28px semibold), `tabular-nums`.
The reference ships the component but never renders it — usage is this skill's extension.

## 11. Cards and stat tiles

- Stat tile: `flex flex-col gap-3 rounded-lg border border-line-strong p-[11px]` (11px + 1px border = 12px
  optical inset); label `caption-style flex items-center gap-1 text-soft` + `size-3` icon; value `lead-style`.
  Grid `grid grid-cols-2 gap-2 sm:grid-cols-4`.
- KPI block: `flex flex-col gap-1` → `flex items-baseline gap-[3px]` (24px value + sparkline `h-[22px]`) → caption `text-soft`.
- Score card: `k.card` (`rounded-lg bg-card p-4 shadow-card hover:bg-card-hover`, `gap-4`); title `h3-style`,
  body `p-style text-soft`, meta row `caption-style flex flex-wrap justify-between gap-2`, star rating pill
  `rounded-full border border-hover-faint bg-hover px-[3px] py-[2px] gap-px` with 10px stars.

## 12. Display numbers, units, mono meta (R1, R5, R7)

- Number: `text-[30px] leading-none font-medium tracking-[-0.03em] tabular-nums` in `flex items-baseline gap-[5px]`.
  Denominator / `%`: same size, `font-normal text-subtle` (`31<span class="font-normal text-subtle">/50</span>`; faint fails 3:1). Word unit:
  `text-[14px] font-normal tracking-normal text-muted-foreground` (`4.6 days, median`).
- Mono meta (IDs, dates, zoom %, clocks, column eyebrows): `font-mono text-[12px] text-muted-foreground tabular-nums`;
  eyebrow `font-mono text-[11px] uppercase tracking-[0.06em] text-subtle`. Mono never for names or sentences.
- Freshness stamp: `inline-flex items-center gap-1.5 text-[12px] text-subtle` + 6px `bg-status` dot
  (`bg-warning` when stale). Plain CSS: `.k-asof` / `.k-asof.stale`.
- Kbd hint inside search: `.k-kbd` (`/`, `⌘K`), 18px, inset 1px `line-strong` ring.

## 13. Status pills by urgency (R6, R2, R7)

| Kind | Classes | Example |
|---|---|---|
| needs you | `h-[22px] rounded-full bg-foreground px-[9px] text-[12px] font-medium text-background` + 6px `bg-sky-400` dot | `● Return requested` |
| waiting | `bg-tag-amber-bg text-tag-amber-text` + dot | `● Review`, `Blocked 3d` |
| at risk / over | `bg-tag-red-bg text-tag-red-text` + dot | `● At risk`, `3d over` |
| ready / on track | `bg-tag-blue-bg text-tag-blue-text` + dot | `● Ready`, `On the path` |
| settled | `bg-card text-soft`, no dot, optional 12px icon | `Fulfilled`, `↺ Refunded $98.00` |

Plain CSS: `.k-pill` + `.act | .wait | .risk | .ok`. Critical table row: `.k-crit` (3px red inset bar on the first
cell). These are status, so they are allowed to use tone; categorical tags (`.k-tag`) still carry no status.

## 14. Meters: ticks, pips, split, requirement (R7, R2, R1, R5)

- Tick meter `.k-ticks`: 14px tall, 2px ticks every 5px on `--track`; fill `> i` with `width:%`; over-budget
  `> i.over` (red); marker `> b` at `left:%`. Mono value to the right (`62%`, `12 / 10d`).
- Pips `.k-pips`: 9×12px, 3px gap, lit = accent, warn = amber tint. Use for small counts (≤ 20): pages, steps,
  auto-fixed `5 / 7`.
- Split bar `.k-split`: 22px, 3px gaps, segments `flex-grow` by share, labels inside (`Marco, 1.4 days`); agent
  slivers 4px accent with the label below.
- Requirement `.k-req`: label + `n to go` on one row, 5px meter under; done → `Met` in `text-success`.
- Tailwind: tick fill = `bg-[repeating-linear-gradient(90deg,var(--primary)_0_2px,transparent_2px_5px)]`.

## 15. Floating drawer, check rows, radio cards, toast (R6)

- Drawer: `fixed inset-y-3 right-3 w-[min(400px,calc(100vw-24px))] rounded-[20px] bg-popover shadow-overlay flex flex-col overflow-hidden`.
  Header `px-5 pt-4 pb-3` eyebrow row (12px icon + `Refund · #3021` in `text-subtle`, `Edited · Reset` in
  `text-primary`, close X), identity block `px-5` (40px monogram `bg-tag-teal-bg`, name `text-[18px] font-semibold`),
  body `px-5 flex flex-col gap-4 overflow-auto`, footer `p-4` with a full-width ink primary `h-10 rounded-xl`.
- Behind it: list parent `.k-dimmable.is-dimmed` (children `blur-[2.5px] opacity-45 pointer-events-none`
  except `.k-lifted`). Close on Esc, X, or click on a dimmed row (which also picks that row).
- Check row `.k-check-row`: 36px rounded-lg thumbnail (item color), title 14/500 + 12px muted variant, price
  right (`line-through text-faint` when unchecked), 20px rounded-md checkbox `bg-foreground` when checked.
- Radio card `.k-radio-card`: `rounded-[14px] bg-card p-3`; checked = `bg-popover ring-2 ring-foreground`;
  content = 18px radio, 16px method icon, title + consequence line, amount right (bonus `+$9.20` in `text-success`).
- Callout `.k-callout`: the customer's own words in quotes. Nothing else.
- Toast `.k-toast`: bottom center, `bg-[#111214] text-[#f9fbff] rounded-xl pl-3.5 pr-1.5 py-1.5`, check icon in
  green, message with the amount and person, `Undo` button `bg-white/10 rounded-lg h-7`. 5s, pauses on hover.

## 16. Inset well queue, selection ring, tree nodes (R2, R1, R5)

- Well `.k-well`: `rounded-2xl bg-card p-1.5 flex flex-col gap-0.5`; items `rounded-xl px-3.5 py-3`, flat;
  selected `bg-popover shadow-card ring-1 ring-primary/35`.
- Selected step/node card: `.k-sel-ring` = `ring-[1.5px] ring-primary` over `shadow-card`.
- Tree node: `h-14 rounded-xl bg-popover shadow-card px-3 grid grid-cols-[36px_1fr_auto] items-center gap-3`;
  connectors are absolutely positioned 1px `border-line-strong` elbows with `size-1.5` end dots; the open
  path uses `border-primary`.
- Placeholder row: `h-10 rounded-xl border border-dashed border-line-strong text-[13px] text-muted-foreground`
  (`+ 51 more in this leg`).
