import { useState } from "react";
import { Download, Clock } from "lucide-react";
import { profile } from "@/lib/data";
import { track, Events } from "@/lib/analytics";

/**
 * CVButton renders either a real download link (when the PDF is uploaded
 * and `profile.cvAvailable` is true) or a polished disabled "Coming soon"
 * state — never a dead `#` link.
 *
 * variant: "primary" | "ghost" | "header" | "footer" | "inverted"
 */
export default function CVButton({
  variant = "ghost",
  source = "unknown",
  testId = "cv-button",
  className = "",
}) {
  const [hover, setHover] = useState(false);
  const available = profile.cvAvailable && profile.cvUrl;

  const baseStyles = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    header:
      "inline-flex items-center gap-2 border border-foreground/80 px-4 py-2 text-sm transition-all",
    footer: "inline-flex items-center gap-1.5",
    inverted:
      "inline-flex items-center justify-between gap-4 border border-background/30 hover:border-background text-background px-6 py-5 transition-colors",
  };

  const handleClick = () => {
    track(Events.CV_DOWNLOAD, { source, variant });
  };

  if (available) {
    const isInverted = variant === "inverted";
    return (
      <a
        href={profile.cvUrl}
        download
        onClick={handleClick}
        data-testid={testId}
        className={`${baseStyles[variant]} ${
          variant === "header" ? "hover:bg-foreground hover:text-background" : ""
        } ${className}`}
      >
        {isInverted ? (
          <>
            <span className="inline-flex items-center gap-3 text-sm">
              <Download size={16} /> Download CV
            </span>
          </>
        ) : (
          <>
            <Download size={14} /> Download CV
          </>
        )}
      </a>
    );
  }

  // Disabled "Coming soon" state — visible, polished, never a dead link.
  const disabledClass =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 bg-muted text-foreground/55 px-6 py-3 text-sm font-medium tracking-wide cursor-not-allowed border border-hairline"
      : variant === "ghost"
      ? "inline-flex items-center justify-center gap-2 border border-hairline text-foreground/55 px-6 py-3 text-sm font-medium tracking-wide cursor-not-allowed"
      : variant === "header"
      ? "inline-flex items-center gap-2 border border-hairline text-foreground/55 px-4 py-2 text-sm cursor-not-allowed"
      : variant === "inverted"
      ? "inline-flex items-center justify-between gap-4 border border-background/15 text-background/45 px-6 py-5 cursor-not-allowed"
      : "inline-flex items-center gap-1.5 text-foreground/55 cursor-not-allowed";

  const Icon = hover ? Clock : Download;
  const label = hover ? "Coming soon" : "Download CV";

  if (variant === "inverted") {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="CV coming soon — please use the contact form"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-testid={testId}
        className={`${disabledClass} ${className}`}
      >
        <span className="inline-flex items-center gap-3 text-sm">
          <Icon size={16} /> {label}
        </span>
        <span className="text-[10px] uppercase tracking-overline opacity-70">
          Soon
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="CV coming soon — please use the contact form"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-testid={testId}
      className={`${disabledClass} ${className}`}
    >
      <Icon size={14} /> {label}
      {variant === "footer" || variant === "header" ? (
        <span className="text-[10px] uppercase tracking-overline opacity-70 ml-1">
          Soon
        </span>
      ) : null}
    </button>
  );
}
