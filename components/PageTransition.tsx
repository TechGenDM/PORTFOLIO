"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement>(null);
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
      return;
    }

    const tl = gsap.timeline();

    tl.set(lineRef.current, { xPercent: -100, opacity: 1 })
      .to(lineRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(lineRef.current, {
        opacity: 0,
        duration: 0.2,
      });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden">
        <div
          ref={lineRef}
          className="absolute top-1/2 left-0 w-full h-[1px] bg-white"
          style={{
            boxShadow: "0 0 20px 4px rgba(255,255,255,0.8), 0 0 60px 10px rgba(255,255,255,0.4)",
            transform: "translateX(-100%)",
            opacity: 0, // initially hidden
          }}
        />
      </div>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
