import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";

/**
 * Runs a GSAP setup function inside gsap.context() with automatic cleanup.
 * @param {Function} setup - (ctx, rootRef) => void | (() => void)
 * @param {Array} deps - dependency array for re-running setup
 */
export default function useScrollAnimation(setup, deps = []) {
  const rootRef = useRef(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || typeof setup !== "function") return undefined;

    const ctx = gsap.context(() => {
      setup(root);
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}
