// Zero-dependency sliding number: each digit is a 0–9 column moved with a CSS transform transition.
// Approximates the reference spring (stiffness 280, damping 18, mass 0.3 ≈ critically damped,
// settles in ~200ms) with 240ms power3-out. Interruptible (CSS transition). Unlike the spring
// version, 9→0 travels the long way down the column; acceptable for counters that move in steps.
// Respects prefers-reduced-motion via motion-reduce:transition-none.
import { cn } from "@/lib/utils";

type SlidingNumberProps = {
  value: number;
  format?: (value: number) => string;
  className?: string;
};

const GLYPHS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Column({ digit }: { digit: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[1ch] overflow-hidden leading-none">
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-[240ms] ease-power3-out motion-reduce:transition-none"
        style={{ transform: `translateY(-${digit * 10}%)` }}
      >
        {GLYPHS.map((glyph) => (
          <span key={glyph} className="flex h-[1em] items-center justify-center">
            {glyph}
          </span>
        ))}
      </span>
    </span>
  );
}

export function SlidingNumber({ value, format = (v) => v.toLocaleString("en-US"), className }: SlidingNumberProps) {
  const text = format(value);
  const chars = text.split("");

  return (
    <span className={cn("inline-flex items-center leading-none tabular-nums", className)} aria-label={text}>
      <span aria-hidden className="inline-flex items-center">
        {chars.map((char, index) => {
          const key = `${chars.length - index}`;
          return /\d/.test(char) ? <Column key={key} digit={Number(char)} /> : <span key={key}>{char}</span>;
        })}
      </span>
    </span>
  );
}
