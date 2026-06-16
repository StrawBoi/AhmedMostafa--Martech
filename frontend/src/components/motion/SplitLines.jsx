import { useMemo } from "react";

/**
 * Splits children text into line spans for GSAP stagger targeting.
 * Pass lines as an array of strings for explicit control.
 */
export default function SplitLines({ lines, className = "", lineClassName = "" }) {
  const items = useMemo(
    () => lines.filter((line) => line !== null && line !== undefined && line !== ""),
    [lines]
  );

  return (
    <span className={className}>
      {items.map((line, i) => (
        <span
          key={`${line}-${i}`}
          className={`block overflow-hidden ${lineClassName}`}
          data-split-line
        >
          <span className="inline-block" data-split-line-inner>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
