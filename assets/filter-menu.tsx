// Kargul split-label filter menu ("Sort by | Pipeline value ⌄") on @base-ui/react Menu.
// Reference (kargulstudio/sales-crm components/_common/filter-menu.tsx, MIT) used radix-ui DropdownMenu;
// mapping: data-[state=open] → data-popup-open (trigger) / data-open (popup),
// asChild → className/render, sideOffset on Content → on Positioner,
// --radix-dropdown-menu-content-available-height → --available-height, data-[state=checked] → data-checked.
import { Menu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./kargul-variants";

export type FilterOption = { value: string; label: string };

type FilterMenuProps = {
  label?: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  align?: "start" | "end";
  className?: string;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FilterMenu({ label, value, options, onChange, align = "start", className }: FilterMenuProps) {
  const current = options.find((option) => option.value === value);

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          buttonVariants({ variant: "secondary", size: "none" }),
          "group h-[30px] gap-0 overflow-hidden text-[12px] data-popup-open:bg-muted",
          className,
        )}
      >
        {label && (
          <>
            <span className="px-[9px] font-normal text-subtle">{label}</span>
            <span aria-hidden className="h-full w-px bg-hairline-soft" />
          </>
        )}
        <span className={cn("flex items-center px-[9px]", label ? "gap-1.5" : "gap-1")}>
          {current?.label ?? value}
          <ChevronDown className="size-3 text-chevron transition-transform duration-200 ease-power3-out group-data-popup-open:rotate-180" />
        </span>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} align={align} className="z-50 outline-none">
          <Menu.Popup
            className={cn(
              "min-w-[168px] origin-(--transform-origin) overflow-hidden rounded-lg border border-line-strong bg-popover text-popover-foreground shadow-overlay outline-none",
              "transition-[opacity,scale] duration-200 ease-power3-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-power3-in",
            )}
          >
            <div className="max-h-[min(360px,var(--available-height))] overflow-y-auto p-1">
              <Menu.Group>
                {label && <Menu.GroupLabel className="caption-style px-2 py-1.5 text-subtle">{label}</Menu.GroupLabel>}
                <Menu.RadioGroup value={value} onValueChange={(next) => onChange(String(next))}>
                  {options.map((option) => (
                    <Menu.RadioItem
                      key={option.value}
                      value={option.value}
                      closeOnClick
                      className="caption-style relative flex cursor-pointer items-center gap-2 rounded-md py-2 pr-2 pl-6 text-soft outline-none select-none transition-colors duration-150 ease-power3-out data-checked:text-foreground data-highlighted:bg-hover data-highlighted:text-foreground"
                    >
                      <span className="absolute left-2 flex size-2 items-center justify-center">
                        <Menu.RadioItemIndicator>
                          <span className="block size-1.5 rounded-full bg-status" />
                        </Menu.RadioItemIndicator>
                      </span>
                      {option.label}
                    </Menu.RadioItem>
                  ))}
                </Menu.RadioGroup>
              </Menu.Group>
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
