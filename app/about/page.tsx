"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const socialLinks = [
  { label: "GitHub",   href: "https://github.com/techgendm" },
  { label: "LinkedIn", href: "https://linkedin.com/in/techgendm" },
  { label: "Twitter",  href: "https://twitter.com/techgendm" },
];

export default function AboutPage() {
  const beamRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(beamRef.current, 
      { x: '100vw' }, 
      { 
        x: '-100vw', 
        duration: 0.9, 
        ease: 'power2.inOut', 
        onComplete: () => {
          gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.5 });
        } 
      }
    );
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
    >
      {/* Light beam overlay */}
      <div
        ref={beamRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: "white",
          boxShadow: "0 0 30px 8px rgba(255,255,255,0.8), 0 0 80px 20px rgba(255,255,255,0.25)",
          zIndex: 100,
          pointerEvents: "none"
        }}
      />

      {/* Page content */}
      <div
        ref={contentRef}
        className="about-content"
        style={{
          opacity: 0,
          transform: "translateY(10px)",
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 68px)",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Devashish Mishra
        </h1>

        {/* Role / subtitle */}
        <p
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 300,
            fontSize: "18px",
            color: "rgba(255,255,255,0.6)",
            marginTop: "12px",
            marginBottom: 0,
          }}
        >
          Full-Stack Engineer &amp; AI Product Builder
        </p>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            width: "120px",
            height: "1px",
            background: "rgba(255,255,255,0.2)",
            margin: "28px auto",
          }}
        />

        {/* Bio */}
        <p
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 300,
            fontSize: "15px",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.8,
            textAlign: "center",
          }}
        >
          I design and engineer digital products at the intersection of software
          and intelligence. From full-stack web applications to AI-powered
          workflows, I care deeply about building things that feel considered,
          move fast, and solve real problems. Currently open to new collaborations.
        </p>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          {socialLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                }}
              >
                {link.label}
              </a>
              {index < socialLinks.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
