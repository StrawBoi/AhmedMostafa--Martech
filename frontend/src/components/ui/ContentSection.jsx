import React from "react";
import { cn } from "@/lib/utils";

export default function ContentSection({
  eyebrow,
  title,
  intro,
  bullets,
  quote,
  children,
  className,
}) {
  return (
    <section className={cn("reveal", className)}>
      {eyebrow && <p className="overline mb-3">{eyebrow}</p>}
      {title && <h3 className="font-serif text-2xl md:text-3xl mb-4">{title}</h3>}

      {intro && <p className="text-lg leading-relaxed text-foreground/85 mb-4">{intro}</p>}

      {bullets && bullets.length > 0 && (
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground/85">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {quote && (
        <blockquote className="mt-4 p-4 bg-surface border-l-4 border-terracotta italic text-foreground/85 rounded">
          {quote}
        </blockquote>
      )}

      {children}
    </section>
  );
}
