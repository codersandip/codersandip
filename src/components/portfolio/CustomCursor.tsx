import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snap target position (equals mouse unless magnetically snapped)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Fast dot spring (tight, near 1:1)
  const dotXSpring = useSpring(dotX, { damping: 30, stiffness: 900, mass: 0.25 });
  const dotYSpring = useSpring(dotY, { damping: 30, stiffness: 900, mass: 0.25 });

  // Ring trail spring (slightly softer for elegant follow, but not laggy)
  const ringXSpring = useSpring(dotX, { damping: 22, stiffness: 350, mass: 0.4 });
  const ringYSpring = useSpring(dotY, { damping: 22, stiffness: 350, mass: 0.4 });

  const hoverRef = useRef<HoverState>(hover);
  hoverRef.current = hover;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasMousePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasMousePointer) return;

    const SNAP_DIST = 80;

    const findSnapTarget = (x: number, y: number): HTMLElement | null => {
      // Fast path: element under cursor
      const under = document.elementFromPoint(x, y) as HTMLElement | null;
      const direct = under?.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor]"
      );
      if (direct) return direct;

      // Nearby search within a bounding box
      const candidates = document.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], [data-cursor]"
      );
      let best: HTMLElement | null = null;
      let bestDist = SNAP_DIST;
      candidates.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (
          x < r.left - SNAP_DIST ||
          x > r.right + SNAP_DIST ||
          y < r.top - SNAP_DIST ||
          y > r.bottom + SNAP_DIST
        )
          return;
        const cx = Math.max(r.left, Math.min(x, r.right));
        const cy = Math.max(r.top, Math.min(y, r.bottom));
        const d = Math.hypot(x - cx, y - cy);
        if (d < bestDist) {
          bestDist = d;
          best = el;
        }
      });
      return best;
    };

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = findSnapTarget(e.clientX, e.clientY);
      if (target) {
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Magnetic pull toward center (30% pull)
        const px = e.clientX + (cx - e.clientX) * 0.25;
        const py = e.clientY + (cy - e.clientY) * 0.25;
        dotX.set(px);
        dotY.set(py);

        const label = getCursorLabel(target);
        const prev = hoverRef.current;
        if (!prev.active || prev.label !== label) {
          setHover({ active: true, label, rect });
        }
      } else {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
        if (hoverRef.current.active) {
          setHover({ active: false, label: "", rect: null });
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleDocumentLeave = () => setIsVisible(false);
    const handleDocumentEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleDocumentLeave);
    document.addEventListener("mouseenter", handleDocumentEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleDocumentLeave);
      document.removeEventListener("mouseenter", handleDocumentEnter);
    };
  }, [mouseX, mouseY, dotX, dotY, isVisible]);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  const isHovering = hover.active;
  const showLabel = isHovering && hover.label.length > 0;

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotXSpring, y: dotYSpring }}
        animate={{
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5">
          <div className="absolute inset-0 rounded-full bg-primary" />
        </div>
      </motion.div>

      {/* Expanding ring / label pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringXSpring, y: ringYSpring }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-primary/60 bg-primary/10 backdrop-blur-sm text-primary font-medium text-xs"
          animate={{
            width: showLabel ? "auto" : isHovering ? 44 : 34,
            height: showLabel ? 32 : isHovering ? 44 : 34,
            paddingLeft: showLabel ? 14 : 0,
            paddingRight: showLabel ? 14 : 0,
            backgroundColor: isHovering
              ? "hsl(var(--primary) / 0.15)"
              : "hsl(var(--primary) / 0.05)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
        >
          {showLabel ? (
            <motion.span
              key={hover.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="whitespace-nowrap flex items-center gap-1 tracking-wide uppercase"
            >
              {hover.label}
              <ArrowUpRight className="w-3 h-3" />
            </motion.span>
          ) : null}
        </motion.div>
      </motion.div>

      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};
