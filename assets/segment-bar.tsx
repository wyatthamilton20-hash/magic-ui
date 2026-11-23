// Segmented meter (win probability, pipeline health). Adapted from kargulstudio/sales-crm (MIT).
// Requires magic-tokens.css (bg-danger/warning/success, bg-track, bg-meter) and a shadcn `cn`.
import { cn } from "@/lib/utils";

type SegmentTone = "auto" | "danger" | "warning" | "success";

type SegmentBarProps = {
  percent: number;
  segments?: number;
  tone?: SegmentTone;
  label?: string;
  className?: string;
  segmentClassName?: string;
  trackClassName?: string;
};

const TONE_CLASS: Record<Exclude<SegmentTone, "auto">, string> = {
  danger: "bg-danger",
  warning: "bg-warning",
  success: "bg-success",
};

function autoTone(index: number, filled: number) {
  const red = Math.floor(filled / 3);
  const amber = Math.ceil(filled / 3);
  if (index < red) return TONE_CLASS.danger;
  if (index < red + amber) return TONE_CLASS.warning;
  return TONE_CLASS.success;
}

export function SegmentBar({
  percent,
  segments = 17,
  tone = "auto",
  label,
  className,
  segmentClassName,
  trackClassName = "bg-track",
}: SegmentBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const filled = Math.round((clamped / 100) * segments);

  return (
    <span
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(
        "flex h-[14px] items-center gap-[2px] overflow-hidden rounded-[2px] bg-meter px-[2px]",
        className,
      )}
    >
      {Array.from({ length: segments }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-[10px] min-w-px flex-1 rounded-[1px]",
            segmentClassName,
            index < filled
              ? tone === "auto"
                ? autoTone(index, filled)
                : TONE_CLASS[tone]
              : trackClassName,
          )}
        />
      ))}
    </span>
  );
}

// Large variant used in detail sheets:
// <SegmentBar percent={v} segments={63} tone="success"
//   className="h-3 w-full border border-hover-faint px-px" segmentClassName="h-2" trackClassName="bg-meter" />
