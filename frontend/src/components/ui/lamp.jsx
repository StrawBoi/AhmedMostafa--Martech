import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const lampEase = [0.42, 0, 0.58, 1];

const lampTransition = (delay = 0.3) => ({
  delay,
  duration: 0.8,
  ease: lampEase,
});

export function LampContainer({ children, className }) {
  const reducedMotion = useReducedMotion();

  const beamInitial = reducedMotion
    ? { opacity: 1, width: "30rem" }
    : { opacity: 0.5, width: "15rem" };

  const beamAnimate = { opacity: 1, width: "30rem" };

  const glowInitial = reducedMotion ? { width: "16rem" } : { width: "8rem" };
  const glowAnimate = { width: "16rem" };

  const lineInitial = reducedMotion ? { width: "30rem" } : { width: "15rem" };
  const lineAnimate = { width: "30rem" };

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0B0A09] z-0",
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={beamInitial}
          whileInView={beamAnimate}
          viewport={{ once: true }}
          transition={lampTransition()}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-terracotta via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-[#0B0A09] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-[#0B0A09] [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={beamInitial}
          whileInView={beamAnimate}
          viewport={{ once: true }}
          transition={lampTransition()}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-terracotta text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-[#0B0A09] [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-[#0B0A09] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#0B0A09] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-terracotta opacity-40 blur-3xl" />

        <motion.div
          initial={glowInitial}
          whileInView={glowAnimate}
          viewport={{ once: true }}
          transition={lampTransition()}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-terracotta/80 blur-2xl"
        />

        <motion.div
          initial={lineInitial}
          whileInView={lineAnimate}
          viewport={{ once: true }}
          transition={lampTransition()}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-terracotta"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#0B0A09]" />
      </div>

      <div className="relative z-50 flex -translate-y-72 md:-translate-y-80 flex-col items-center px-5 w-full max-w-5xl">
        {children}
      </div>
    </div>
  );
}
