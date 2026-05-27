"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Phase 1: Waveform animation (0ms - 1200ms)
    // Runs immediately and repeats
    const waveAnim = gsap.to(barsRef.current, {
      height: 40,
      duration: 0.4,
      stagger: 0.05,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Master Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Phase 2: Kill waveform, fade out bars, start typewriter
    tl.add(() => waveAnim.kill(), 1.2)
      .to(barsRef.current, { opacity: 0, duration: 0.3 }, 1.2)
      .add(() => {
        if (!textRef.current) return;
        const spans = textRef.current.querySelectorAll('span');
        gsap.to(spans, {
          opacity: 1,
          duration: 0.06,
          stagger: 0.06,
          ease: 'none'
        });
      }, 1.5)
      
      // Text fades out at 2.7 (1.5 + 0.8s reveal + 0.4s hold) over 0.3s
      .to(textRef.current, { opacity: 0, duration: 0.3 }, 2.7)
      
      // Phase 3: Fade out loader div
      .to(containerRef.current, { opacity: 0, duration: 0.4 }, 3.0)
      .set(containerRef.current, { display: "none" });

    return () => {
      waveAnim.kill();
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#000000] flex items-center justify-center pointer-events-none"
    >
      <div className="absolute flex gap-[3px] items-center justify-center h-[80px]">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            className="w-[2px] h-[4px] bg-white opacity-90 rounded-full"
          />
        ))}
      </div>
      <div
        ref={textRef}
        className="absolute"
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 300,
          fontSize: "32px",
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.12em",
        }}
      >
        {['H','e','y',',',' ','N','a','m','a','s','t','e','!'].map((char, i) => (
          <span key={i} style={{ opacity: 0, display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}
