// Class recipes for the Magic look, as cva variants + string constants.
// Source: kargulstudio/sales-crm components/_ui/* (MIT), hard-coded hexes replaced by
// magic-tokens.css tokens so the same classes work in light and dark.
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium leading-none outline-none select-none transition-[background-color,color,box-shadow,scale] duration-150 ease-power3-out focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-primary hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground shadow-control hover:bg-muted data-popup-open:bg-muted data-[state=open]:bg-muted",
        muted: "bg-muted text-foreground shadow-control hover:bg-muted-hover",
        subtle: "bg-subtle-bg text-foreground shadow-subtle hover:bg-muted",
        ghost: "text-subtle hover:bg-hover hover:text-foreground",
        nav: "w-full justify-start rounded-lg text-sidebar-foreground hover:text-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-foreground data-[active=true]:shadow-control",
        item: "w-full items-start justify-start gap-3 rounded-lg text-left font-normal whitespace-normal text-foreground hover:bg-hover-faint",
        link: "rounded-none text-foreground underline decoration-from-font underline-offset-2 hover:text-soft",
      },
      size: {
        sm: "p-[9px] text-[12px] leading-none",
        md: "p-2 text-[14px] leading-none",
        icon: "size-[30px] p-0",
        "icon-sm": "size-6 p-0",
        none: "p-0",
      },
      press: {
        true: "active:not-disabled:scale-[0.96]",
        false: "",
      },
    },
    defaultVariants: { variant: "secondary", size: "sm", press: false },
  },
);
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export const tagVariants = cva(
  "inline-flex h-[22px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border text-[14px] leading-none",
  {
    variants: {
      tone: {
        blue: "border-(--tag-blue-border) bg-(--tag-blue-bg) text-(--tag-blue-text)",
        purple: "border-(--tag-purple-border) bg-(--tag-purple-bg) text-(--tag-purple-text)",
        green: "border-(--tag-green-border) bg-(--tag-green-bg) text-(--tag-green-text)",
        moss: "border-(--tag-moss-border) bg-(--tag-moss-bg) text-(--tag-moss-text)",
        red: "border-(--tag-red-border) bg-(--tag-red-bg) text-(--tag-red-text)",
        orange: "border-(--tag-orange-border) bg-(--tag-orange-bg) text-(--tag-orange-text)",
        amber: "border-(--tag-amber-border) bg-(--tag-amber-bg) text-(--tag-amber-text)",
        teal: "border-(--tag-teal-border) bg-(--tag-teal-bg) text-(--tag-teal-text)",
        yellow: "border-(--tag-yellow-border) bg-(--tag-yellow-bg) text-(--tag-yellow-text)",
        neutral: "border-(--tag-neutral-border) bg-(--tag-neutral-bg) text-(--tag-neutral-text)",
      },
      size: { md: "px-2", sm: "px-1.5" },
    },
    defaultVariants: { tone: "neutral", size: "md" },
  },
);
export type TagTone = NonNullable<VariantProps<typeof tagVariants>["tone"]>;

export const k = {
  countBadge:
    "caption-style inline-flex h-4 min-w-6 shrink-0 items-center justify-center rounded-full border-[0.5px] border-count-border bg-muted px-1 text-center text-chip tabular-nums shadow-count",
  statusPill:
    "caption-style inline-flex shrink-0 items-center gap-0.5 rounded-full border border-pill-border bg-muted py-[3px] pr-[5px] pl-[3px]",
  statusDot: "size-2 rounded-full bg-status m-0.5",
  unreadDot: "absolute top-[7px] right-[7px] size-1.5 rounded-full bg-danger ring-2 ring-secondary",
  inlineSeparator: "mx-[3px] h-2 w-px shrink-0 bg-hairline",
  metaDot: "size-0.5 rounded-full bg-subtle",
  kbd: "caption-style inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-line-strong bg-muted px-1.5 font-sans text-soft",
  iconTile: "flex size-6 shrink-0 items-center justify-center rounded-md bg-muted shadow-tile",
  iconTileLg: "flex size-[50px] shrink-0 items-center justify-center rounded-[12.5px] bg-muted shadow-tile-lg",
  avatar: "size-5 shrink-0 rounded-full outline-1 -outline-offset-1 outline-image-outline",

  input:
    "flex h-9 w-full min-w-0 rounded-lg border border-line-strong bg-secondary px-3 text-[16px] leading-none text-foreground outline-none transition-[border-color] duration-150 ease-power3-out placeholder:text-subtle focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-[14px]",
  label: "caption-style select-none text-soft",
  fieldHint: "caption-style block text-subtle",
  fieldError: "caption-style block text-danger",

  tableGrid: "grid min-w-max grid-cols-[repeat(var(--cols),max-content)] justify-between",
  tableRow: "col-span-full grid grid-cols-subgrid border-b border-border transition-colors duration-150 ease-power3-out",
  tableRowInteractive: "cursor-pointer hover:bg-card/60 data-[active=true]:border-card data-[active=true]:bg-card",
  tableHead: "caption-style flex h-[38px] items-center px-3 text-left font-normal whitespace-nowrap text-subtle",
  tableCell: "flex h-[42px] items-center px-3 text-[14px] leading-none whitespace-nowrap",
  tableNum: "justify-end tabular-nums",
  currencyPrefix: "text-muted-foreground",

  outlineGrid: "grid gap-px p-px",
  outlineCell: "outline-1 outline-border",
  dividerInset: "shadow-[inset_0_-1px_0_var(--line-strong)] last:shadow-none",

  popup: "rounded-lg border border-line-strong bg-popover text-popover-foreground shadow-overlay outline-none",
  popupLg: "rounded-xl border border-line-strong bg-popover text-popover-foreground shadow-overlay outline-none",
  menuItem:
    "caption-style relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-foreground outline-none select-none transition-colors duration-150 ease-power3-out data-highlighted:bg-hover data-disabled:pointer-events-none data-disabled:opacity-50",
  menuRadioItem:
    "caption-style relative flex cursor-pointer items-center gap-2 rounded-md py-2 pr-2 pl-6 text-soft outline-none select-none transition-colors duration-150 ease-power3-out data-highlighted:bg-hover data-highlighted:text-foreground data-checked:text-foreground data-[state=checked]:text-foreground",
  menuRadioDot: "block size-1.5 rounded-full bg-status",
  menuLabel: "caption-style px-2 py-1.5 text-subtle",
  menuSeparator: "-mx-1 my-1 h-px bg-line-strong",

  backdrop: "fixed inset-0 z-50 bg-overlay backdrop-blur-[6px]",
  sheetHeader: "flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line-strong px-6",
  sheetFooter: "flex h-[62px] shrink-0 items-center justify-between gap-2 border-t border-line-strong px-6",
  dialogHeader: "flex flex-col gap-2 border-b border-line-strong px-6 py-5",
  dialogFooter: "flex items-center justify-end gap-2 border-t border-line-strong px-6 py-4",
  detailSection: "flex flex-col gap-4 p-5 shadow-[inset_0_-1px_0_var(--line-strong)]",

  statTile: "flex flex-col gap-3 rounded-lg border border-line-strong p-[11px]",
  card: "flex flex-col gap-4 rounded-lg bg-card p-4 shadow-card transition-colors duration-150 ease-power3-out hover:bg-card-hover",
} as const;
