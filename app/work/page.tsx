"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  color: string;
}

// ─── Utilities ────────────────────────────────────────────────────────────────
const colors = ["#ff3366", "#00f0ff", "#a020f0", "#00ff88", "#ffaa00", "#ff00aa", "#f000ff"];
const getColor = (str: string) => colors[str.length % colors.length];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
      staggerChildren: 0.1,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
};

const itemVariants: Variants = {
  enter: { y: 20, opacity: 0 },
  center: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  },
};

// ─── Loading Component ────────────────────────────────────────────────────────
const LoadingRadar = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030303] w-full">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Radar Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-500/30"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 256, height: 256, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
        {/* Center Node */}
        <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_20px_#00f0ff]" />
      </div>
      <motion.p 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="font-orbitron tracking-[0.3em] text-cyan-500/80 uppercase text-sm mt-8"
      >
        Syncing with GitHub...
      </motion.p>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [languagesCache, setLanguagesCache] = useState<Record<number, string[]>>({});

  // Fetch GitHub Repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/TechGenDM/repos?sort=created&direction=desc&per_page=100");
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        
        // Transform the data
        const mappedRepos: GithubRepo[] = data
          .filter((repo: any) => !repo.fork) // Ignore forks
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name.replace(/-/g, " "),
            description: repo.description || "A stealth open-source project building the future.",
            html_url: repo.html_url,
            created_at: repo.created_at,
            language: repo.language,
            languages_url: repo.languages_url, // Added languages_url
            topics: repo.topics && repo.topics.length > 0 ? repo.topics : [],
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            color: getColor(repo.name),
          }));

        setRepos(mappedRepos);
      } catch (error) {
        console.error("GitHub Fetch Error:", error);
        // Fallback data if API rate limited
        setRepos([
          {
            id: 1, name: "student ml api", description: "A production-grade ML API built with Flask and scikit-learn, delivering real-time student performance predictions.", html_url: "https://github.com/TechGenDM/student-ml-api", created_at: "2025-12-29T08:33:46Z", language: "Python", languages_url: "", topics: ["Machine Learning", "API"], stargazers_count: 5, forks_count: 1, color: "#ff3366"
          },
          {
            id: 2, name: "NotiWave", description: "A modern notification UI system showcasing interactive alerts and smooth user experience.", html_url: "https://github.com/TechGenDM/NotiWave", created_at: "2025-12-05T15:35:59Z", language: "CSS", languages_url: "", topics: ["UI", "Animation"], stargazers_count: 12, forks_count: 3, color: "#00f0ff"
          }
        ]);
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    fetchRepos();
  }, []);

  const index = repos.length > 0 ? Math.abs(page % repos.length) : 0;
  const activeRepo = repos[index];

  // Lazy-load all languages for the currently active repo
  useEffect(() => {
    if (!activeRepo || !activeRepo.languages_url) return;
    
    // If we already fetched languages for this repo, do nothing
    if (languagesCache[activeRepo.id]) return;

    const fetchLanguages = async () => {
      try {
        const res = await fetch(activeRepo.languages_url);
        if (!res.ok) return;
        const data = await res.json();
        // The API returns an object like { "TypeScript": 1234, "CSS": 567 }
        // We just want the keys (the language names)
        const allLanguages = Object.keys(data);
        
        setLanguagesCache(prev => ({
          ...prev,
          [activeRepo.id]: allLanguages
        }));
      } catch (e) {
        console.error("Failed to fetch languages", e);
      }
    };

    fetchLanguages();
  }, [activeRepo, languagesCache]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  if (isLoading || !activeRepo) return <LoadingRadar />;

  return (
    <div className="relative min-h-screen w-full bg-[#030303] overflow-hidden flex flex-col justify-center items-center pt-20 pb-10">
      
      {/* ── BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Massive scrolling text */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeRepo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute whitespace-nowrap text-center"
            style={{
              fontFamily: "var(--font-orbitron)",
              fontSize: "clamp(10rem, 25vw, 30rem)",
              fontWeight: 900,
              color: "transparent",
              WebkitTextStroke: "2px white",
              letterSpacing: "-0.05em",
            }}
          >
            {activeRepo.name.toUpperCase()}
          </motion.div>
        </AnimatePresence>

        {/* Ambient Gradient Orb */}
        <motion.div
          animate={{
            background: `radial-gradient(circle, ${activeRepo.color}33 0%, transparent 70%)`,
          }}
          transition={{ duration: 1 }}
          className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[120px]"
        />
      </div>

      {/* ── MAIN CONTENT LAYER ── */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 mx-auto flex-grow flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
          >
            
            {/* Left Column: Repo Details */}
            <div className="w-full lg:w-1/2 flex flex-col items-start glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
              {/* Card internal glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 50% 0%, ${activeRepo.color}15, transparent 70%)`
                }}
              />

              <motion.div variants={itemVariants} className="mb-4 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] uppercase tracking-[0.2em] font-rajdhani text-white/80 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  TechGenDM Repository
                </span>
                
                {/* Metrics Badges */}
                <span className="px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-[10px] uppercase tracking-[0.1em] font-rajdhani text-yellow-500/90 flex items-center gap-1.5">
                  ⭐ {activeRepo.stargazers_count}
                </span>
                <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] uppercase tracking-[0.1em] font-rajdhani text-white/60 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18v-6a4 4 0 0 0-4-4H4"></path><path d="M16 8h4a4 4 0 0 1 4 4v6"></path><circle cx="12" cy="21" r="3"></circle><circle cx="4" cy="5" r="3"></circle><circle cx="20" cy="5" r="3"></circle></svg>
                  {activeRepo.forks_count}
                </span>
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white leading-tight mb-2 capitalize"
                style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}
              >
                {activeRepo.name}
              </motion.h2>

              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                <h3 className="text-sm md:text-base font-rajdhani text-white/50 tracking-widest uppercase">
                  Created: {formatDate(activeRepo.created_at)}
                </h3>
              </motion.div>

              <div className="w-full h-[1px] bg-white/10 mb-8" />

              <motion.div variants={itemVariants} className="w-full mb-8">
                <p className="font-rajdhani text-white/70 text-lg md:text-xl leading-relaxed font-light border-l-2 pl-4" style={{ borderColor: activeRepo.color }}>
                  {activeRepo.description}
                </p>
              </motion.div>

              {/* View Live Code Button */}
              <motion.a 
                variants={itemVariants}
                href={activeRepo.html_url}
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden group px-8 py-3 rounded-full border border-white/20 hover:border-white/50 transition-colors duration-300 flex items-center gap-3"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: activeRepo.color }}
                />
                <span className="font-orbitron text-sm tracking-widest text-white relative z-10">VIEW PROJECT</span>
                <svg className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
              </motion.a>

            </div>

            {/* Right Column: Skills Grid */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <motion.h3 
                variants={itemVariants}
                className="font-orbitron text-sm uppercase tracking-[0.3em] text-white/40 pl-2"
              >
                Tech Stack & Topics
              </motion.h3>
              
              <div className="flex flex-wrap gap-3">
                {/* Languages */}
                {(languagesCache[activeRepo?.id] || (activeRepo?.language ? [activeRepo.language] : [])).map((lang: string) => (
                  <motion.div
                    key={lang}
                    variants={itemVariants}
                    className="relative px-5 py-3 rounded-lg overflow-hidden group cursor-default"
                  >
                    <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg" />
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundColor: activeRepo.color }}
                    />
                    <span className="relative z-10 font-rajdhani text-white font-semibold tracking-wide flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeRepo.color, boxShadow: `0 0 10px ${activeRepo.color}` }} />
                      {lang}
                    </span>
                  </motion.div>
                ))}

                {/* Topics */}
                {activeRepo.topics.map((topic, i) => (
                  <motion.div
                    key={topic}
                    variants={itemVariants}
                    className="relative px-4 py-2 rounded-lg overflow-hidden group cursor-default"
                  >
                    <div className="absolute inset-0 bg-white/5 border border-white/5 rounded-lg transition-colors duration-300 group-hover:border-white/20" />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: activeRepo.color }}
                    />
                    <span className="relative z-10 font-rajdhani text-white/60 group-hover:text-white/90 transition-colors font-medium tracking-wide text-sm capitalize">
                      {topic.replace(/-/g, " ")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── NAVIGATION STRIP ── */}
      <div className="relative z-20 w-full max-w-7xl px-4 md:px-8 mx-auto mt-12 flex justify-between items-center">
        
        {/* Pagination Info */}
        <div className="flex items-center gap-4">
          <div className="font-orbitron text-xl font-bold text-white">
            0{index + 1}
          </div>
          <div className="w-12 h-[1px] bg-white/20 relative">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-white"
              initial={false}
              animate={{ width: `${((index + 1) / repos.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <div className="font-orbitron text-sm text-white/40">
            0{repos.length}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={() => paginate(-1)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            aria-label="Previous Project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            aria-label="Next Project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

      </div>

    </div>
  );
}
