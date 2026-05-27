"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

// ─── Data ─────────────────────────────────────────────────────────────────────
const workData = [
  {
    id: 1,
    title: "Full-Stack Developer",
    company: "TechGen Digital",
    type: "Freelance",
    period: "Jan 2023 – Present",
    bullets: [
      "Architected and shipped 10+ client web applications using Next.js, TypeScript, and Supabase from design to production.",
      "Integrated OpenAI & Gemini APIs to build AI-powered features including document summarization, smart search, and chat interfaces.",
      "Reduced average page load times by 40% via code-splitting, lazy loading, and CDN-level caching strategies.",
      "Established CI/CD pipelines with GitHub Actions, enabling zero-downtime deployments across staging and production environments.",
    ],
    skills: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Docker", "Tailwind", "PostgreSQL", "React"],
  },
  {
    id: 2,
    title: "AI Product Engineer",
    company: "Stealth Startup",
    type: "Contract",
    period: "Jun 2022 – Dec 2022",
    bullets: [
      "Built a RAG-based knowledge assistant that reduced internal support tickets by 60% by surfacing documentation in natural language.",
      "Designed the vector embedding pipeline using LangChain, Pinecone, and OpenAI Embeddings for a 50k-document corpus.",
      "Prototyped and A/B tested 3 distinct UX patterns for AI chat interfaces, selecting the variant with 2× session length.",
      "Collaborated with a cross-functional team of 5 to ship from prototype to beta in under 8 weeks.",
    ],
    skills: ["LangChain", "Pinecone", "FastAPI", "React", "Python", "Redis", "OpenAI", "AWS"],
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "FinEdge Solutions",
    type: "Full-time",
    period: "Mar 2021 – May 2022",
    bullets: [
      "Led the redesign of a B2B dashboard used by 200+ enterprise clients, increasing user engagement by 35%.",
      "Built a reusable component library in React + Storybook, cutting new feature dev time by 25%.",
      "Integrated real-time WebSocket data feeds for live portfolio tracking with latency under 80ms.",
      "Mentored 2 junior developers, conducting weekly code reviews and pair-programming sessions.",
    ],
    skills: ["React", "Redux", "Storybook", "WebSockets", "Figma", "Jest", "GraphQL", "Node.js"],
  },
  {
    id: 4,
    title: "Software Engineering Intern",
    company: "Infosys Limited",
    type: "Internship",
    period: "Jul 2020 – Feb 2021",
    bullets: [
      "Developed REST APIs in Node.js and Express for an internal HR automation tool used by 500+ employees.",
      "Wrote unit and integration tests achieving 82% code coverage using Mocha and Chai.",
      "Automated data migration scripts to move 1.2M records from legacy MySQL to PostgreSQL with zero data loss.",
      "Participated in agile sprints, daily standups, and sprint retrospectives across a 12-person engineering team.",
    ],
    skills: ["Node.js", "Express", "MySQL", "PostgreSQL", "Mocha", "REST APIs", "Git", "Docker"],
  },
];

// ─── Skill size tiers ─────────────────────────────────────────────────────────
const sizeTiers = [
  { size: 95, fontSize: 13 },
  { size: 95, fontSize: 13 },
  { size: 75, fontSize: 12 },
  { size: 75, fontSize: 12 },
  { size: 75, fontSize: 12 },
  { size: 58, fontSize: 11 },
  { size: 58, fontSize: 11 },
  { size: 58, fontSize: 11 },
];

// Scattered layout positions (top%, left%) for up to 8 skills inside the right panel
const skillPositions = [
  { top: "10%", left: "15%" },
  { top: "8%", left: "55%" },
  { top: "35%", left: "5%" },
  { top: "30%", left: "40%" },
  { top: "30%", left: "70%" },
  { top: "58%", left: "20%" },
  { top: "55%", left: "55%" },
  { top: "60%", left: "78%" },
];

const floatDurations = [2.4, 3.1, 2.8, 3.5, 2.2, 3.8, 2.6, 3.0];

// ─── Component ────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef  = useRef<HTMLDivElement>(null);
  const skillsRef   = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const job = workData[currentIndex];

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const nextIndex = (currentIndex + dir + workData.length) % workData.length;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // Animate out
      tl.to([contentRef.current, skillsRef.current], {
        opacity: 0,
        x: dir * -20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setCurrentIndex(nextIndex),
      })
      // Animate in (runs after React re-renders with new content)
      .set([contentRef.current, skillsRef.current], { x: dir * 20 })
      .to([contentRef.current, skillsRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [currentIndex]
  );

  // Reset opacity/x on first mount
  useEffect(() => {
    gsap.set([contentRef.current, skillsRef.current], { opacity: 1, x: 0 });
  }, []);

  return (
    <div
      className="work-page-root relative w-full overflow-hidden bg-black"
      style={{ height: "100vh", paddingTop: "80px" }}
    >
      {/* Vertical divider */}
      <div
        className="work-divider absolute top-0 bottom-0"
        style={{
          left: "60%",
          width: "1px",
          background: "rgba(255,255,255,0.1)",
        }}
      />

      {/* ── LEFT PANEL ──────────────────────────────────────────────────── */}
      <div
        className="work-left-panel absolute top-0 bottom-0"
        style={{ left: 0, width: "60%", paddingTop: "60px" }}
      >
        {/* Left arrow */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous job"
          className="absolute"
          style={{
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "white",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          ‹
        </button>

        {/* Right arrow */}
        <button
          onClick={() => navigate(1)}
          aria-label="Next job"
          className="absolute"
          style={{
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background: "white",
            color: "black",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          ›
        </button>

        {/* Animated content */}
        <div
          ref={contentRef}
          style={{
            padding: "0 80px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* Role */}
          <h2
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              fontSize: "28px",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {job.title}
          </h2>

          {/* Company */}
          <p
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              fontSize: "18px",
              color: "#ffffff",
              margin: "6px 0 4px",
            }}
          >
            {job.company}
          </p>

          {/* Type + period */}
          <p
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 300,
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {job.type} &nbsp;·&nbsp; {job.period}
          </p>

          {/* Experience section */}
          <h3
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 600,
              fontSize: "20px",
              color: "#ffffff",
              marginTop: "24px",
              marginBottom: "12px",
            }}
          >
            Experience
          </h3>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {job.bullets.map((bullet, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "10px",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 300,
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: "#ffffff", flexShrink: 0, marginTop: "1px" }}>›</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dot indicators */}
        <div
          className="absolute"
          style={{
            bottom: "36px",
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {workData.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                const dir = i > currentIndex ? 1 : -1;
                if (i !== currentIndex) navigate(dir);
              }}
              style={{
                cursor: "pointer",
                borderRadius: "9999px",
                background: "white",
                transition: "all 0.3s ease",
                width:  i === currentIndex ? "24px" : "6px",
                height: "6px",
                opacity: i === currentIndex ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────────────────── */}
      <div
        className="work-right-panel absolute top-0 bottom-0"
        style={{ left: "60%", right: 0, paddingTop: "80px" }}
      >
        <div
          ref={skillsRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            padding: "32px 32px 0",
          }}
        >
          {/* Heading */}
          <p
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 0 0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Technical Skills
          </p>

          {/* Floating skill circles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              top: "60px",
            }}
          >
            {job.skills.map((skill, i) => {
              const tier = sizeTiers[i] ?? { size: 58, fontSize: 11 };
              const pos  = skillPositions[i] ?? { top: "50%", left: "50%" };
              const dur  = floatDurations[i] ?? 3;

              return (
                <div
                  key={`${job.id}-${skill}`}
                  style={{
                    position: "absolute",
                    top:  pos.top,
                    left: pos.left,
                    width:  `${tier.size}px`,
                    height: `${tier.size}px`,
                    borderRadius: "50%",
                    background: "white",
                    color: "black",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 600,
                    fontSize: `${tier.fontSize}px`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "4px",
                    animation: `float ${dur}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
