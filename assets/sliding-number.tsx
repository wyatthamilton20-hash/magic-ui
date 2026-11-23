// Odometer-style number: each digit is a 0–9 column driven by a spring.
// Adapted from kargulstudio/sales-crm components/motion-primitives/sliding-number.tsx (MIT),
// itself from motion-primitives (ibelick, MIT). Changes: no react-use-measure (own ResizeObserver),
// no layoutId, reduced-motion renders plain text, inner component no longer shadows global Number.
// Deps: motion (npm i motion). For a zero-dependency version use sliding-number-css.tsx.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, motionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";

const TRANSITION = { type: "spring" as const, stiffness: 280, damping: 18, mass: 0.3 };

function useHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => setHeight(node.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, height] as const;
}

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(value / place) % 10;
  const [initial] = useState(() => motionValue(digit));
  const animated = useSpring(initial, TRANSITION);

  useEffect(() => {
    animated.set(digit);
  }, [animated, digit]);

  return (
    <span className="relative inline-block w-[0.92ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <DigitGlyph key={i} mv={animated} glyph={i} />
      ))}
    </span>
  );
}

function DigitGlyph({ mv, glyph }: { mv: MotionValue<number>; glyph: number }) {
  const [ref, height] = useHeight<HTMLSpanElement>();
  const y = useTransform(mv, (latest) => {
    if (!height) return 0;
    const offset = (10 + glyph - (latest % 10)) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });

  if (!height) {
    return (
      <span ref={ref} className="invisible absolute">
        {glyph}
      </span>
    );
  }

  return (
    <motion.span ref={ref} style={{ y }} className="absolute inset-0 flex items-center justify-center">
      {glyph}
    </motion.span>
  );
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
  className?: string;
};

export function SlidingNumber({ value, padStart = false, decimalSeparator = ".", className }: SlidingNumberProps) {
  const reduce = useReducedMotion();
  const abs = Math.abs(value);
  const [integerPart, decimalPart] = abs.toString().split(".");
  const integerValue = parseInt(integerPart, 10);
  const padded = padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const digits = padded.split("");
  const places = digits.map((_, i) => Math.pow(10, digits.length - i - 1));

  if (reduce) {
    return (
      <span className={["tabular-nums", className].filter(Boolean).join(" ")}>
        {value < 0 && "-"}
        {padded}
        {decimalPart && `${decimalSeparator}${decimalPart}`}
      </span>
    );
  }

  return (
    <span className={["inline-flex items-center", className].filter(Boolean).join(" ")} aria-label={String(value)}>
      <span aria-hidden className="inline-flex items-center">
        {value < 0 && "-"}
        {digits.map((_, index) => (
          <Digit key={`pos-${places[index]}`} value={integerValue} place={places[index]} />
        ))}
        {decimalPart && (
          <>
            <span>{decimalSeparator}</span>
            {decimalPart.split("").map((_, index) => (
              <Digit
                key={`decimal-${index}`}
                value={parseInt(decimalPart, 10)}
                place={Math.pow(10, decimalPart.length - index - 1)}
              />
            ))}
          </>
        )}
      </span>
    </span>
  );
}
