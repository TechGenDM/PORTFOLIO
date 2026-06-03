"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
const TARGET_TEXT    = "TECHGEN_DM";
const GREETING_CHARS = ["H","e","y",","," ","N","a","m","a","s","t","e","!"];

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef     = useRef<HTMLDivElement>(null);
  const loadingPhaseRef  = useRef<HTMLDivElement>(null);
  const nameRef          = useRef<HTMLDivElement>(null);
  const tagRef           = useRef<HTMLDivElement>(null);
  const progressFillRef  = useRef<HTMLDivElement>(null);
  const counterRef       = useRef<HTMLSpanElement>(null);
  const scanLineRef      = useRef<HTMLDivElement>(null);
  const cornersRef       = useRef<(HTMLDivElement | null)[]>([]);
  const statusRef        = useRef<HTMLDivElement>(null);
  const versionRef       = useRef<HTMLDivElement>(null);
  const greetingPhaseRef = useRef<HTMLDivElement>(null);
  const greetingSpans    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let scrambleFrameId: ReturnType<typeof requestAnimationFrame>;

    function startScramble() {
      const chars    = TARGET_TEXT.split("");
      const revealed = new Array(chars.length).fill(false);
      let idx = 0, tick = 0;

      function frame() {
        if (!nameRef.current) return;
        tick++;
        if (tick % 5 === 0 && idx < chars.length) { revealed[idx] = true; idx++; }
        nameRef.current.textContent = chars
          .map((ch, i) => revealed[i] ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
          .join("");
        if (idx < chars.length) {
          scrambleFrameId = requestAnimationFrame(frame);
        } else {
          nameRef.current.textContent = TARGET_TEXT;
        }
      }
      scrambleFrameId = requestAnimationFrame(frame);
    }

    /*
      TIMELINE OVERVIEW
      ─────────────────
      0.00 – 3.00s  Phase 1: Loading UI (corners, scan line, name, progress, counter)
      3.00 – 3.35s  Cross-fade from loading → greeting
      3.35 – 4.25s  Phase 2: "Hey, Namaste!" typewriter
      4.25 – 4.60s  Greeting fades out
      4.60 – 5.00s  Entire loader slides up to reveal site
      5.00s         onComplete() → LoaderWrapper unmounts this component
    */
    const tl = gsap.timeline({ onComplete });

    // ── Phase 1 entrance ─────────────────────────────────────────

    // t=0.10  Corners pop in
    tl.fromTo(
        cornersRef.current.filter(Boolean),
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.04, ease: "back.out(2)" },
        0.10
      )

    // t=0.20  Scan line sweep
      .fromTo(scanLineRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.65, ease: "power2.inOut" },
        0.20
      )
      .to(scanLineRef.current, { opacity: 0, duration: 0.2 }, 0.85)

    // t=0.35  Name, tag, status labels fade in
      .to(
        [nameRef.current, tagRef.current, statusRef.current, versionRef.current].filter(Boolean),
        { opacity: 1, duration: 0.45, ease: "power2.out" },
        0.35
      )

    // t=0.35  Scramble starts
      .add(startScramble, 0.35)

    // t=0.50  Progress bar fills over 2.50s (linear → lands at exactly t=3.00)
      .fromTo(progressFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.50, ease: "none" },
        0.50
      )

    // t=0.50  Counter 00 → 100 linear over 2.50s
      .add(() => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: 100, duration: 2.50, ease: "none",
            onUpdate() {
              if (counterRef.current)
                counterRef.current.textContent = String(Math.round(obj.v)).padStart(2, "0");
            },
          });
        }, 0.50)

    // ── Phase 1 → Phase 2 cross-fade ─────────────────────────────

    // t=3.00  Loading phase fades out
      .to(loadingPhaseRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, 3.00)

    // t=3.35  Greeting phase fades in
      .to(greetingPhaseRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" }, 3.35)

    // t=3.45  Typewriter letters stagger in
      .to(
        greetingSpans.current.filter(Boolean),
        { opacity: 1, duration: 0.04, stagger: 0.065, ease: "none" },
        3.45
      )

    // ── Phase 2 exit + reveal ─────────────────────────────────────

    // t=4.25  Greeting fades out
      .to(greetingPhaseRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, 4.25)

    // t=4.60  Entire loader slides upward off screen
      .to(containerRef.current, {
          y: "-100%",
          duration: 0.55,
          ease: "power4.inOut",
        }, 4.60);

    return () => { tl.kill(); cancelAnimationFrame(scrambleFrameId); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         200,
        background:     "#000000",
        overflow:       "hidden",
        pointerEvents:  "none",
      }}
    >

      {/* ═══ PHASE 1 — Loading ═══════════════════════════════════ */}
      <div
        ref={loadingPhaseRef}
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >

        {/* Scan line */}
        <div
          ref={scanLineRef}
          style={{
            position:        "absolute",
            top:             "50%",
            left:            0,
            width:           "100%",
            height:          "1px",
            background:      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 20%, rgba(180,210,255,0.95) 50%, rgba(255,255,255,0.55) 80%, transparent 100%)",
            transformOrigin: "left center",
            opacity:         0,
          }}
        />

        {/* Corner brackets (8 segments) */}
        {([
          { top: 28, left: 28,   w: 20, h: 1  },
          { top: 28, left: 28,   w: 1,  h: 20 },
          { top: 28, right: 28,  w: 20, h: 1  },
          { top: 28, right: 28,  w: 1,  h: 20 },
          { bottom: 28, left: 28,  w: 20, h: 1  },
          { bottom: 28, left: 28,  w: 1,  h: 20 },
          { bottom: 28, right: 28, w: 20, h: 1  },
          { bottom: 28, right: 28, w: 1,  h: 20 },
        ] as const).map((seg, i) => {
          const { w, h, ...pos } = seg;
          return (
            <div
              key={i}
              ref={(el) => { cornersRef.current[i] = el; }}
              style={{
                position:   "absolute",
                ...pos,
                width:      w,
                height:     h,
                background: "rgba(255,255,255,0.45)",
                opacity:    0,
              }}
            />
          );
        })}

        {/* Centre content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Name */}
          <div
            ref={nameRef}
            style={{
              fontFamily:    "var(--font-orbitron)",
              fontWeight:    400,
              fontSize:      "clamp(22px, 4vw, 42px)",
              color:         "#ffffff",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              userSelect:    "none",
              marginBottom:  "10px",
              opacity:       0,
            }}
          >
            {TARGET_TEXT}
          </div>

          {/* Tag */}
          <div
            ref={tagRef}
            style={{
              fontFamily:    "var(--font-rajdhani)",
              fontWeight:    300,
              fontSize:      "11px",
              color:         "rgba(255,255,255,0.38)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              userSelect:    "none",
              marginBottom:  "28px",
              opacity:       0,
            }}
          >
            Full-Stack &amp; AI Engineer
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: "relative",
              width:    "clamp(160px, 20vw, 240px)",
              height:   "1px",
              background: "rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            <div
              ref={progressFillRef}
              style={{
                position:        "absolute",
                inset:           0,
                background:      "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, #ffffff 55%, rgba(160,195,255,1) 100%)",
                transformOrigin: "left center",
                transform:       "scaleX(0)",
              }}
            />
          </div>

          {/* Counter */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginTop: "8px" }}>
            <span
              ref={counterRef}
              style={{
                fontFamily: "var(--font-orbitron)", fontWeight: 400,
                fontSize: "12px", color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.1em", minWidth: "24px", textAlign: "right",
              }}
            >
              00
            </span>
            <span
              style={{
                fontFamily: "var(--font-orbitron)", fontWeight: 400,
                fontSize: "10px", color: "rgba(255,255,255,0.22)",
              }}
            >
              %
            </span>
          </div>
        </div>

        {/* Status labels */}
        <div
          ref={statusRef}
          style={{
            position: "absolute", bottom: "32px", left: "36px",
            fontFamily: "var(--font-rajdhani)", fontWeight: 300, fontSize: "10px",
            color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", textTransform: "uppercase",
            opacity: 0,
          }}
        >
          Initializing
        </div>
        <div
          ref={versionRef}
          style={{
            position: "absolute", bottom: "32px", right: "36px",
            fontFamily: "var(--font-rajdhani)", fontWeight: 300, fontSize: "10px",
            color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", textTransform: "uppercase",
            opacity: 0,
          }}
        >
          v2025
        </div>
      </div>

      {/* ═══ PHASE 2 — "Hey, Namaste!" ═══════════════════════════ */}
      <div
        ref={greetingPhaseRef}
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-rajdhani)", fontWeight: 300,
            fontSize: "clamp(36px, 6vw, 72px)", color: "rgba(255,255,255,0.78)",
            letterSpacing: "0.12em", margin: 0, userSelect: "none",
          }}
        >
          {GREETING_CHARS.map((ch, i) => (
            <span
              key={i}
              ref={(el) => { greetingSpans.current[i] = el; }}
              style={{ opacity: 0, display: "inline-block" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
      </div>

      {/* NO overlay div — the container itself slides up to reveal the site */}
    </div>
  );
}
