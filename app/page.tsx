"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Scene from "@/components/three/SceneWrapper";

export default function Home() {
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      nameRef.current,
      subtitleRef.current,
      bottomRightRef.current,
      taglineRef.current,
    ];

    // Start hidden
    gsap.set(elements, { opacity: 0, y: 20 });

    // Stagger in
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.1,
    });
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Top-left: Name + subtitle */}
      <div
        ref={nameRef}
        className="absolute"
        style={{ top: "80px", left: "40px" }}
      >
        <h1
          className="hero-name"
          style={{
            fontFamily: "var(--font-orbitron)",
            fontWeight: 400,
            fontSize: "clamp(42px, 5.5vw, 68px)",
            color: "#ffffff",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          TechGen_DM
        </h1>
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 300,
            fontSize: "13px",
            color: "rgba(255,255,255,0.7)",
            marginTop: "8px",
            marginBottom: 0,
            maxWidth: "360px",
            lineHeight: 1.4,
            whiteSpace: "nowrap",
          }}
        >
          Building Full-Stack &amp; AI Products That Solve Real Problems
        </p>
      </div>

      {/* Center: 3D Scene */}
      <div
        className="absolute scene-container"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "520px",
          height: "520px",
          zIndex: 10,
        }}
      >
        <Scene />
      </div>

      {/* Bottom-right: quote block */}
      <div
        ref={bottomRightRef}
        style={{
          position: 'absolute',
          bottom: '140px',
          right: '40px',
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}
      >
        <span style={{
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 300,
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.55)',
          display: 'block',
          letterSpacing: '0.02em'
        }}>
          Here&apos;s my take, whether its building
        </span>
        <span style={{
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 300,
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.55)',
          display: 'block',
          letterSpacing: '0.02em'
        }}>
          software or processes.
        </span>
      </div>

      {/* Bottom-center: Tagline */}
      <div
        ref={taglineRef}
        className="absolute hero-tagline"
        style={{
          bottom: "28px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 800,
          fontSize: "clamp(48px, 7vw, 96px)",
          color: "#ffffff",
          letterSpacing: "0.01em",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        Imagine. Engineer. Impact.
      </div>
    </div>
  );
}
