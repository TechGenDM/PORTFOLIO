"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════ */

const journey = [
  {
    year: "2022",
    title: "The Spark",
    desc: "Started building my first web projects — fell in love with turning ideas into interactive experiences.",
  },
  {
    year: "2023",
    title: "Going Full-Stack",
    desc: "Dove deep into backend engineering, databases, APIs, and shipping end-to-end products that real users depend on.",
  },
  {
    year: "2024",
    title: "The AI Pivot",
    desc: "Began integrating AI into everything — from intelligent automation to building products powered by LLMs and ML pipelines.",
  },
  {
    year: "2025",
    title: "Building at Scale",
    desc: "Shipping production-grade products, open-sourcing tools, and mentoring the next wave of builders.",
  },
];

const skillCategories = [
  {
    title: "Languages",
    icon: "🌐",
    skills: [
      { name: "JAVASCRIPT", color: "bg-[#ff6b81] text-white" },
      { name: "TYPESCRIPT", color: "bg-[#ff9f43] text-white" },
      { name: "PYTHON", color: "bg-[#feca57] text-black" },
      { name: "JAVA", color: "bg-[#f1c40f] text-black" },
      { name: "HTML5", color: "bg-[#78e08f] text-black" },
      { name: "CSS3", color: "bg-[#82ccdd] text-black" },
      { name: "RUST", color: "bg-[#ff6b81] text-white" },
    ]
  },
  {
    title: "Frontend",
    icon: "⚛️",
    skills: [
      { name: "REACT.JS", color: "bg-[#ff6b81] text-white" },
      { name: "REACT NATIVE", color: "bg-[#ff9f43] text-white" },
      { name: "REACT HOOKS", color: "bg-[#feca57] text-black" },
      { name: "NEXT.JS", color: "bg-[#f1c40f] text-black" },
      { name: "TAILWIND CSS", color: "bg-[#78e08f] text-black" },
      { name: "BOOTSTRAP", color: "bg-[#82ccdd] text-black" },
      { name: "VERCEL V0", color: "bg-[#a29bfe] text-white" },
      { name: "MONACO EDITOR", color: "bg-[#ff9ff3] text-black" },
      { name: "WEBASSEMBLY", color: "bg-[#ff6b81] text-white" },
      { name: "INDEXEDDB", color: "bg-[#ff9f43] text-white" },
    ]
  },
  {
    title: "Backend & Databases",
    icon: "🛠️",
    skills: [
      { name: "NODE.JS", color: "bg-[#ff6b81] text-white" },
      { name: "EXPRESS.JS", color: "bg-[#ff9f43] text-white" },
      { name: "FLASK", color: "bg-[#feca57] text-black" },
      { name: "SOCKET.IO", color: "bg-[#f1c40f] text-black" },
      { name: "ELECTRON.JS", color: "bg-[#78e08f] text-black" },
      { name: "ZOD", color: "bg-[#82ccdd] text-black" },
      { name: "MONGODB", color: "bg-[#a29bfe] text-white" },
      { name: "MYSQL", color: "bg-[#ff9ff3] text-black" },
      { name: "SQLITE", color: "bg-[#ff6b81] text-white" },
    ]
  },
  {
    title: "AI / ML & LLMs",
    icon: "🤖",
    skills: [
      { name: "LARGE LANGUAGE MODELS", color: "bg-[#ff6b81] text-white" },
      { name: "RAG", color: "bg-[#ff9f43] text-white" },
      { name: "DEEPSEEK", color: "bg-[#feca57] text-black" },
      { name: "DEEP LEARNING", color: "bg-[#f1c40f] text-black" },
      { name: "NEURAL NETWORKS", color: "bg-[#78e08f] text-black" },
      { name: "MACHINE LEARNING", color: "bg-[#82ccdd] text-black" },
      { name: "SCIKIT-LEARN", color: "bg-[#a29bfe] text-white" },
      { name: "VERTEX AI", color: "bg-[#ff9ff3] text-black" },
      { name: "GOOGLE CLOUD RUN", color: "bg-[#ff6b81] text-white" },
    ]
  },
  {
    title: "Data Science",
    icon: "📊",
    skills: [
      { name: "DATA SCIENCE", color: "bg-[#ff9f43] text-white" },
      { name: "DATA ANALYSIS", color: "bg-[#feca57] text-black" },
      { name: "PANDAS", color: "bg-[#f1c40f] text-black" },
      { name: "NUMPY", color: "bg-[#78e08f] text-black" },
      { name: "MATPLOTLIB", color: "bg-[#82ccdd] text-black" },
      { name: "SEABORN", color: "bg-[#a29bfe] text-white" },
      { name: "JUPYTER", color: "bg-[#ff9ff3] text-black" },
    ]
  },
  {
    title: "Tools & DevOps",
    icon: "🔧",
    skills: [
      { name: "GIT", color: "bg-[#ff6b81] text-white" },
      { name: "GITHUB", color: "bg-[#ff9f43] text-white" },
      { name: "VERCEL", color: "bg-[#feca57] text-black" },
      { name: "WORDPRESS", color: "bg-[#f1c40f] text-black" },
      { name: "VS CODE", color: "bg-[#a29bfe] text-white" },
      { name: "DESKTOP APP DEV", color: "bg-[#ff9ff3] text-black" },
      { name: "DOCKER", color: "bg-[#ff6b81] text-white" },
      { name: "NIX", color: "bg-[#ff9f43] text-white" },
    ]
  },
  {
    title: "Distributed Systems & Systems Engineering",
    icon: "🔗",
    skills: [
      { name: "CRDTS", color: "bg-[#ff6b81] text-white" },
      { name: "LOCAL-FIRST ARCHITECTURE", color: "bg-[#ff9f43] text-white" },
      { name: "PEER-TO-PEER SYNC", color: "bg-[#feca57] text-black" },
      { name: "OFFLINE-FIRST SYSTEMS", color: "bg-[#f1c40f] text-black" },
      { name: "EVENTUAL CONSISTENCY", color: "bg-[#78e08f] text-black" },
      { name: "CONFLICT RESOLUTION", color: "bg-[#82ccdd] text-black" },
      { name: "STORAGE ENGINE DESIGN", color: "bg-[#a29bfe] text-white" },
      { name: "DISTRIBUTED SYSTEMS", color: "bg-[#ff9ff3] text-black" },
      { name: "REPLICATION PROTOCOLS", color: "bg-[#ff6b81] text-white" },
      { name: "VECTOR CLOCKS", color: "bg-[#ff9f43] text-white" },
      { name: "DATABASE INTERNALS", color: "bg-[#feca57] text-black" },
      { name: "PROPERTY-BASED TESTING", color: "bg-[#f1c40f] text-black" },
      { name: "SYSTEMS PROGRAMMING (RUST)", color: "bg-[#78e08f] text-black" },
      { name: "OLTP ENGINE DESIGN", color: "bg-[#82ccdd] text-black" },
    ]
  }
];

const capabilities = [
  {
    icon: "⚡",
    title: "Full-Stack Engineering",
    desc: "End-to-end web applications with modern frameworks, scalable backends, and polished UIs.",
  },
  {
    icon: "🧠",
    title: "AI Integration",
    desc: "Building intelligent products with LLMs, RAG pipelines, fine-tuning, and custom AI agents.",
  },
  {
    icon: "🎨",
    title: "Creative Development",
    desc: "Immersive 3D experiences, WebGL, generative art, and design systems that feel alive.",
  },
  {
    icon: "🚀",
    title: "Product Thinking",
    desc: "From idea to launch — user research, rapid prototyping, and shipping fast with quality.",
  },
];

const socialLinks = [
  { label: "GitHub",   href: "https://github.com/TechGenDM",               icon: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devasish-mishra-62546a34a/",    icon: "LI" },
  { label: "Twitter",  href: "https://x.com/TechGen_DM",              icon: "TW" },
];

/* ═══════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  const heroRef       = useRef<HTMLDivElement>(null);
  const heroNameRef   = useRef<HTMLHeadingElement>(null);
  const heroTagRef    = useRef<HTMLParagraphElement>(null);
  const heroLineRef   = useRef<HTMLDivElement>(null);
  const heroBioRef    = useRef<HTMLParagraphElement>(null);
  const scrollCueRef  = useRef<HTMLDivElement>(null);
  const timelineRef   = useRef<HTMLDivElement>(null);
  const skillsRef     = useRef<HTMLDivElement>(null);
  const capRef        = useRef<HTMLDivElement>(null);
  const quoteRef      = useRef<HTMLDivElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const connectRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Hero entrance ─────────────────────────────────────── */
      const htl = gsap.timeline({ delay: 0.2 });
      htl
        .fromTo(heroNameRef.current,
          { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" })
        .fromTo(heroTagRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(heroLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.3")
        .fromTo(heroBioRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power1.out" }, "-=0.2");

      /* ── Hero parallax + fade on scroll ──────────────────── */
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 120,
        opacity: 0.3,
      });

      /* ── Journey / Timeline ────────────────────────────────── */
      const timelineItems = timelineRef.current?.querySelectorAll(".journey-card");
      if (timelineItems) {
        timelineItems.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
            {
              opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      /* ── Timeline vertical line grows ──────────────────────── */
      const timelineLine = timelineRef.current?.querySelector(".timeline-line");
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1, ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: true,
            },
          }
        );
      }

      /* ── Skills section ─────────────────────────────────────── */
      const skillPills = skillsRef.current?.querySelectorAll(".skill-box");
      if (skillPills) {
        gsap.fromTo(skillPills,
          { opacity: 0, scale: 0.9, y: 15 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.3, stagger: 0.02, ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* ── Capabilities cards ─────────────────────────────────── */
      const capCards = capRef.current?.querySelectorAll(".cap-card");
      if (capCards) {
        gsap.fromTo(capCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.6, stagger: 0.12, ease: "power3.out",
            scrollTrigger: {
              trigger: capRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* ── Big quote reveal ──────────────────────────────────── */
      gsap.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.92, filter: "blur(12px)" },
        {
          opacity: 1, scale: 1, filter: "blur(0px)",
          duration: 1.2, ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Stats counter animation ────────────────────────────── */
      const statNums = statsRef.current?.querySelectorAll(".stat-num");
      if (statNums) {
        statNums.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 2, ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              (el as HTMLElement).textContent = Math.round(obj.v) + "+";
            },
          });
        });
      }

      /* ── Connect section ───────────────────────────────────── */
      gsap.fromTo(connectRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: connectRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }); // end gsap.context

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden selection:bg-blue-500/30">

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes scroll-line {
          0%   { transform: translateY(-8px); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes pulse-green {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
          50%      { opacity: 0.7; box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
        }
        .scroll-line-anim {
          animation: scroll-line 2s ease-in-out infinite;
        }
        .gradient-text-hero {
          background: linear-gradient(135deg, #ffffff 10%, rgba(140,180,255,0.85) 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text-accent {
          background: linear-gradient(90deg, #ffffff, rgba(100,160,255,0.95));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          transition: border-color 0.4s ease, transform 0.3s ease, box-shadow 0.4s ease;
        }
        .glass-card:hover {
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(80,120,255,0.06);
        }
        .skill-box {
          padding: 6px 14px;
          border-radius: 4px;
          font-family: var(--font-rajdhani);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: default;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .skill-box:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          filter: brightness(1.1);
        }
        .cap-card {
          padding: 36px 32px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.06);
          background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          backdrop-filter: blur(12px);
          transition: all 0.35s ease;
        }
        .cap-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-6px);
          box-shadow: 0 12px 50px rgba(0,0,0,0.4);
        }
        .section-label {
          font-family: var(--font-rajdhani);
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 16px;
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          AMBIENT BACKGROUND GLOWS
      ════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{ position: "absolute", top: "5%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(40,80,220,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "40%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,60,220,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(40,120,200,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO (full viewport)
      ════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ height: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", zIndex: 2 }}
      >
        {/* Status badge */}
        <div style={{ position: "absolute", top: 80, left: 40, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulse-green 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "var(--font-rajdhani)", fontSize: 12, color: "rgba(34,197,94,0.8)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Available for Projects
          </span>
        </div>

        <h1
          ref={heroNameRef}
          className="gradient-text-hero"
          style={{
            fontFamily: "var(--font-orbitron)", fontWeight: 400,
            fontSize: "clamp(42px, 7vw, 100px)", lineHeight: 1,
            margin: 0, textAlign: "center", letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Devasish<br />Mishra
        </h1>

        <p
          ref={heroTagRef}
          style={{
            fontFamily: "var(--font-rajdhani)", fontWeight: 300,
            fontSize: "clamp(14px, 2vw, 20px)", color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.3em", textTransform: "uppercase",
            marginTop: 20, textAlign: "center",
          }}
        >
          Full-Stack Engineer &amp; AI Product Builder
        </p>

        <div
          ref={heroLineRef}
          style={{ width: 80, height: 1, background: "rgba(255,255,255,0.2)", margin: "32px 0", transformOrigin: "center" }}
        />

        <p
          ref={heroBioRef}
          style={{
            fontFamily: "var(--font-rajdhani)", fontWeight: 300,
            fontSize: "clamp(14px, 1.4vw, 17px)", color: "rgba(255,255,255,0.5)",
            maxWidth: 520, textAlign: "center", lineHeight: 1.8,
          }}
        >
          🚀 AI &amp; Tech enthusiast <br/> Crafting intelligent solutions with code ✨ <br/> Innovating tomorrow, today.
        </p>

        {/* Scroll cue */}
        <div ref={scrollCueRef} style={{ position: "absolute", bottom: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 1, height: 32, overflow: "hidden" }}>
            <div className="scroll-line-anim" style={{ width: 1, height: 16, background: "rgba(255,255,255,0.4)" }} />
          </div>
          <span style={{ fontFamily: "var(--font-rajdhani)", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — JOURNEY TIMELINE
      ════════════════════════════════════════════════════════ */}
      <section ref={timelineRef} style={{ position: "relative", padding: "120px 24px", maxWidth: 900, margin: "0 auto", zIndex: 2 }}>
        <div className="section-label" style={{ textAlign: "center" }}>The Journey</div>
        <h2 style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(24px, 3.5vw, 40px)", color: "#fff", textAlign: "center", marginBottom: 80, letterSpacing: "0.05em" }}>
          How I Got Here
        </h2>

        {/* Vertical centre line */}
        <div
          className="timeline-line"
          style={{
            position: "absolute", left: "50%", top: 180, bottom: 60,
            width: 1, background: "linear-gradient(180deg, transparent, rgba(100,160,255,0.3), transparent)",
            transformOrigin: "top center",
          }}
        />

        {journey.map((item, i) => (
          <div
            key={item.year}
            className="journey-card"
            style={{
              display: "flex",
              justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
              marginBottom: 64,
              position: "relative",
            }}
          >
            {/* Dot on timeline */}
            <div style={{
              position: "absolute", left: "50%", top: 18, transform: "translateX(-50%)",
              width: 12, height: 12, borderRadius: "50%",
              background: "rgba(100,160,255,0.4)", border: "2px solid rgba(100,160,255,0.7)",
            }} />

            <div className="glass-card" style={{ width: "42%", padding: "28px 32px" }}>
              <span style={{ fontFamily: "var(--font-orbitron)", fontSize: 13, color: "rgba(100,160,255,0.8)", letterSpacing: "0.1em" }}>
                {item.year}
              </span>
              <h3 style={{ fontFamily: "var(--font-rajdhani)", fontSize: 22, fontWeight: 600, color: "#fff", margin: "8px 0 10px" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: "var(--font-rajdhani)", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — STATS COUNTERS
      ════════════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{ padding: "80px 24px", zIndex: 2, position: "relative" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(40px, 8vw, 100px)", flexWrap: "wrap" }}>
          {[
            { num: 1, label: "Years Building" },
            { num: 36, label: "Projects Shipped" },
            { num: 50, label: "Technologies Used" },
            { num: 10, label: "Happy Clients" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                className="stat-num"
                data-target={s.num}
                style={{
                  fontFamily: "var(--font-orbitron)", fontWeight: 400,
                  fontSize: "clamp(40px, 5vw, 60px)", color: "#fff",
                  lineHeight: 1,
                }}
              >
                0+
              </div>
              <div style={{
                fontFamily: "var(--font-rajdhani)", fontWeight: 300,
                fontSize: 12, color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 8,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — SKILLS / ARSENAL
      ════════════════════════════════════════════════════════ */}
      <section ref={skillsRef} style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto", zIndex: 2, position: "relative" }}>
        <div className="section-label" style={{ textAlign: "center" }}>Technical Arsenal</div>
        <h2 style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(22px, 3vw, 36px)", color: "#fff", textAlign: "center", marginBottom: 20, letterSpacing: "0.04em" }}>
          Tools I Build With
        </h2>
        <p style={{ fontFamily: "var(--font-rajdhani)", fontSize: 15, color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: 64, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
          From frontend frameworks to AI infrastructure — a curated stack for building modern, intelligent products.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 style={{
                fontFamily: "var(--font-rajdhani)", fontSize: 20, fontWeight: 600,
                color: "#fff", marginBottom: 16, display: "flex", alignItems: "center", gap: 10
              }}>
                <span style={{ fontSize: 20 }}>{category.icon}</span> {category.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {category.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`skill-box ${s.color}`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginTop: 32 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — PHILOSOPHY QUOTE (full viewport)
      ════════════════════════════════════════════════════════ */}
      <section
        ref={quoteRef}
        style={{
          height: "70vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 24px", zIndex: 2, position: "relative",
        }}
      >
        <div className="section-label">Philosophy</div>
        <blockquote style={{
          fontFamily: "var(--font-orbitron)", fontWeight: 400,
          fontSize: "clamp(28px, 5vw, 64px)", textAlign: "center",
          lineHeight: 1.3, color: "rgba(255,255,255,0.85)",
          maxWidth: 800, margin: 0,
        }}>
          &ldquo;Imagine. Engineer.{" "}
          <span className="gradient-text-accent">Impact.</span>&rdquo;
        </blockquote>
        <p style={{
          fontFamily: "var(--font-rajdhani)", fontSize: 14, fontWeight: 300,
          color: "rgba(255,255,255,0.3)", marginTop: 24,
          letterSpacing: "0.15em", textTransform: "uppercase",
        }}>
          — The motto I build by
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — WHAT I DO (capabilities)
      ════════════════════════════════════════════════════════ */}
      <section ref={capRef} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", zIndex: 2, position: "relative" }}>
        <div className="section-label" style={{ textAlign: "center" }}>Capabilities</div>
        <h2 style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(22px, 3vw, 36px)", color: "#fff", textAlign: "center", marginBottom: 60, letterSpacing: "0.04em" }}>
          What I Bring to the Table
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {capabilities.map((c) => (
            <div key={c.title} className="cap-card">
              <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "var(--font-rajdhani)", fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 10 }}>
                {c.title}
              </h3>
              <p style={{ fontFamily: "var(--font-rajdhani)", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — CONNECT (Visme Form)
      ════════════════════════════════════════════════════════ */}
      <section ref={connectRef} style={{ padding: "100px 24px 140px", textAlign: "center", zIndex: 2, position: "relative", minHeight: "100vh" }}>
        
        {/* Visme Form Embed */}
        <div 
          className="visme_d" 
          data-title="Animated Online Contact Form" 
          data-url="6vz0z647-animated-online-contact-form" 
          data-domain="forms" 
          data-full-page="false" 
          data-min-height="900px" 
          data-form-id="183937"
        ></div>
        <Script src="https://static-bundles.visme.co/forms/vismeforms-embed.js" strategy="lazyOnload" />

        {/* Closing signature */}
        <div style={{ marginTop: 80 }}>
          <div style={{
            width: 40, height: 1,
            background: "rgba(255,255,255,0.15)",
            margin: "0 auto 20px",
          }} />
          <p style={{
            fontFamily: "var(--font-rajdhani)", fontSize: 12, fontWeight: 300,
            color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase",
          }}>
            Designed &amp; Built by TechGen_DM · 2025
          </p>
        </div>
      </section>

    </div>
  );
}
