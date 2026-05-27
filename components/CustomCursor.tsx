"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position completely off screen until first mousemove
    gsap.set(cursor, { x: -200, y: -200 });

    // quickTo gives smooth lag-following
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 6); // offset by half diameter
      yTo(e.clientY - 6);
    };

    const onEnterHoverable = () => {
      gsap.to(cursor, { scale: 2, duration: 0.2, ease: "power2.out" });
    };
    const onLeaveHoverable = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const attachHoverListeners = () => {
      document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onEnterHoverable);
        el.addEventListener("mouseleave", onLeaveHoverable);
      });
    };

    window.addEventListener("mousemove", onMove);

    // Attach hover listeners on mount and re-attach on DOM changes
    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHoverable);
        el.removeEventListener("mouseleave", onLeaveHoverable);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "white",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    />
  );
}
