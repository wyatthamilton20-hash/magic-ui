// Micro bar sparkline (14px tall, 4px bars, 1px gap). Adapted from kargulstudio/sales-crm (MIT).
// Reference colored bars by a fixed decorative pattern; here emphasis is data-driven by default.
import { cn } from "@/lib/utils";

const REFERENCE_PATTERN = [false, true, true, false, true, true, false, true, false, true, false, true, true, false];

type Emphasis = "median" | "last" | "pattern" | boolean[] | ((value: number, index: number) => boolean);

type SparklineProps = {
  values: number[];
  height?: number;
  emphasis?: Emphasis;
  label?: string;
  className?: string;
};

function isEmphasized(emphasis: Emphasis, values: number[], value: number, index: number) {
  if (typeof emphasis === "function") return emphasis(value, index);
  if (Array.isArray(emphasis)) return Boolean(emphasis[index]);
  if (emphasis === "last") return index === values.length - 1;
  if (emphasis === "pattern") return REFERENCE_PATTERN[index % REFERENCE_PATTERN.length];
  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
  return value >= median;
}

export function Sparkline({ values, height = 14, emphasis = "median", label, className }: SparklineProps) {
  const max = Math.max(...values, 0);

  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("flex items-end gap-px", className)}
      style={{ height }}
    >
      {values.map((value, index) => {
        const px = max > 0 ? Math.max(1, Math.round((value / max) * height)) : 1;
        return (
          <span
            key={index}
            className={cn(
              "w-1 shrink-0 rounded-[1px]",
              isEmphasized(emphasis, values, value, index) ? "bg-trend" : "bg-trend-muted",
            )}
            style={{ height: px }}
          />
        );
      })}
    </span>
  );
}
