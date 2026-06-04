"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Scene from "@/components/three/SceneWrapper";

const stats = [
  { value: "1+", label: "Years Building" },
  { value: "36+", label: "Projects Shipped" },
  { value: "AI & Systems", label: "Focused Stack" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/TechGenDM",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://x.com/TechGen_DM",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/devasish-mishra-62546a34a/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Home() {
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -12, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 28, skewX: -3 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.7, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(
        socialsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(
        bottomRightRef.current,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.out" },
        "-=0.2"
      );
  }, []);

  return (
    <>
      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%       { transform: translateY(6px); opacity: 0.3; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.35; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 60%, rgba(120,180,255,0.9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tagline-gradient {
          background: linear-gradient(90deg, #ffffff 0%, rgba(180,200,255,0.95) 50%, rgba(120,160,255,0.85) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-divider {
          width: 1px;
          height: 28px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent);
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: rgba(255,255,255,0.5);
          color: #ffffff;
          background: rgba(255,255,255,0.06);
          transform: translateY(-2px);
        }
        .scroll-indicator {
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        .available-dot {
          animation: pulse-dot 2.4s ease-in-out infinite;
        }
        .glow-bg {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.85);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .cta-btn:hover {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.1);
          color: #ffffff;
        }
        .cta-btn-primary {
          background: rgba(255,255,255,0.92);
          color: #000000;
          border-color: transparent;
        }
        .cta-btn-primary:hover {
          background: #ffffff;
          color: #000000;
          border-color: transparent;
          box-shadow: 0 0 24px rgba(255,255,255,0.2);
        }
      `}</style>

      <div
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Ambient glow blobs */}
        <div
          className="glow-bg"
          style={{
            position: "absolute",
            top: "15%",
            left: "5%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(80,120,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(150,100,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* ── TOP-LEFT: Badge + Name + Subtitle + Stats + Socials ── */}
        <div
          style={{
            position: "absolute",
            top: "76px",
            left: "40px",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          {/* Available badge */}
          <div ref={badgeRef} style={{ marginBottom: "18px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "4px 12px 4px 8px",
                borderRadius: "50px",
                border: "1px solid rgba(80,200,120,0.3)",
                background: "rgba(80,200,120,0.06)",
                fontSize: "11px",
                color: "rgba(120,220,140,0.9)",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 500,
              }}
            >
              <span
                className="available-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(80,220,120,0.9)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              OPEN TO OPPORTUNITIES
            </span>
          </div>

          {/* Name */}
          <div ref={nameRef}>
            <h1
              className="hero-name gradient-text"
              style={{
                fontFamily: "var(--font-orbitron)",
                fontWeight: 400,
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1,
                margin: 0,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              TechGen_DM
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "10px",
              marginBottom: 0,
              maxWidth: "340px",
              lineHeight: 1.5,
              letterSpacing: "0.03em",
            }}
          >
            Full-Stack &amp; AI Engineer crafting products
            <br />
            that solve real-world problems at scale.
          </p>

          {/* Stats row */}
          <div
            ref={statsRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "24px",
            }}
          >
            {stats.map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-orbitron)",
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#ffffff",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stats.length - 1 && <div className="stat-divider" />}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}
          >
            <a href="/work" className="cta-btn cta-btn-primary"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              View Work
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/about" className="cta-btn"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              About Me
            </a>
          </div>

          {/* Social links */}
          <div
            ref={socialsRef}
            style={{ display: "flex", gap: "10px", marginTop: "20px" }}
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── CENTER: 3D Scene ── */}
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

        {/* ── BOTTOM-RIGHT: Quote block ── */}
        <div
          ref={bottomRightRef}
          style={{
            position: "absolute",
            bottom: "140px",
            right: "44px",
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            zIndex: 20,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 300,
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Philosophy
          </span>
          <span
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
              display: "block",
              letterSpacing: "0.02em",
            }}
          >
            Here&apos;s my take, whether it&apos;s building
          </span>
          <span
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
              display: "block",
              letterSpacing: "0.02em",
            }}
          >
            software or processes.
          </span>

          {/* Tech stack pills */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "14px",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              maxWidth: "220px",
              marginLeft: "auto",
            }}
          >
            {["Next.js", "Python", "AI/ML", "Web3"].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "3px 9px",
                  borderRadius: "4px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-rajdhani)",
                  letterSpacing: "0.06em",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── BOTTOM-CENTER: Tagline ── */}
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
            fontSize: "clamp(46px, 6.5vw, 92px)",
            letterSpacing: "0.01em",
            lineHeight: 1,
            userSelect: "none",
            zIndex: 20,
          }}
        >
          <span className="tagline-gradient">Imagine. Engineer. Impact.</span>
        </div>

        {/* ── BOTTOM-LEFT: Shift toggle (dummy) ── */}
        <div
          ref={scrollRef}
          style={{
            position: "absolute",
            bottom: "44px",
            left: "44px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 20,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "22px",
              borderRadius: "999px",
              border: "1.5px solid rgba(255, 255, 255, 0.9)",
              display: "flex",
              alignItems: "center",
              padding: "0 3px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.9)",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            SHIFT
          </span>
        </div>
      </div>
    </>
  );
}
