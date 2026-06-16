import useScrollAnimation from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  y = 24,
  ...props
}) {
  const ref = useScrollAnimation((root) => {
    const targets = root.querySelectorAll("[data-reveal-item]");
    const els = targets.length ? targets : [root];

    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(els, { opacity: 0, y });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      delay,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
