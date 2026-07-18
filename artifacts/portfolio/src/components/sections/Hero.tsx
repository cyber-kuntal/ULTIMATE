import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal } from 'lucide-react';
import TypingAnimation from '@/components/ui/TypingAnimation';

const HeroCanvas = lazy(() => import('@/components/three/HeroCanvas'));

// ─── Sniper Scope Cursor ─────────────────────────────────────────────────────
function SniperScope({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute z-30"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg width="72" height="72" viewBox="0 0 120 120" fill="none">
        {/* Outer ring */}
        <circle cx="60" cy="60" r="56" stroke="#00FFC6" strokeWidth="1" strokeOpacity="0.6" />
        {/* Middle ring */}
        <circle cx="60" cy="60" r="40" stroke="#7CFFB2" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Inner ring */}
        <circle cx="60" cy="60" r="20" stroke="#00FFC6" strokeWidth="1" strokeOpacity="0.9" />
        {/* Centre dot */}
        <circle cx="60" cy="60" r="2" fill="#00FFC6" fillOpacity="0.9" />

        {/* Crosshair lines — gap at centre */}
        {/* Top */}
        <line x1="60" y1="4"  x2="60" y2="38" stroke="#00FFC6" strokeWidth="1" strokeOpacity="0.8" />
        {/* Bottom */}
        <line x1="60" y1="82" x2="60" y2="116" stroke="#00FFC6" strokeWidth="1" strokeOpacity="0.8" />
        {/* Left */}
        <line x1="4"  y1="60" x2="38" y2="60"  stroke="#00FFC6" strokeWidth="1" strokeOpacity="0.8" />
        {/* Right */}
        <line x1="82" y1="60" x2="116" y2="60" stroke="#00FFC6" strokeWidth="1" strokeOpacity="0.8" />

        {/* Corner tick marks on outer ring */}
        <line x1="60" y1="4"  x2="60" y2="10"  stroke="#00FFC6" strokeWidth="1.5" />
        <line x1="60" y1="110" x2="60" y2="116" stroke="#00FFC6" strokeWidth="1.5" />
        <line x1="4"  y1="60" x2="10" y2="60"  stroke="#00FFC6" strokeWidth="1.5" />
        <line x1="110" y1="60" x2="116" y2="60" stroke="#00FFC6" strokeWidth="1.5" />

        {/* Distance markers on crosshair */}
        <line x1="60" y1="24" x2="64" y2="24" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="60" y1="24" x2="56" y2="24" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="60" y1="96" x2="64" y2="96" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="60" y1="96" x2="56" y2="96" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="24"  y1="60" x2="24" y2="56" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="24"  y1="60" x2="24" y2="64" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="96"  y1="60" x2="96" y2="56" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="96"  y1="60" x2="96" y2="64" stroke="#00FFC6" strokeWidth="0.8" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const roles = [
    "Cybersecurity Engineer",
    "Cybercrime Investigator",
    "SOC Analyst",
    "Digital Forensics Analyst",
    "Security Researcher"
  ];

  const RESUME_URL = "https://drive.google.com/file/d/1lbpBzCpbVaHnxmWTD1e94O0uN-AdxbRn/view?usp=sharing";

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ cursor: 'none' }}
    >
      <Suspense fallback={<div className="absolute inset-0 bg-bg-deep" />}>
        <HeroCanvas />
      </Suspense>

      <SniperScope containerRef={sectionRef as React.RefObject<HTMLElement>} />

      <div className="scanline" />
      
      {/* HUD overlay grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,198,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,198,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* HUD Corner Brackets */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-neon-primary/40 pointer-events-none" />
      <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-neon-primary/40 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-neon-primary/40 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-neon-primary/40 pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center mt-16 flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Status pill */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-none border border-neon-primary bg-bg-deep/80 backdrop-blur-md mb-10 shadow-[0_0_15px_rgba(0,255,198,0.3)]">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-primary animate-pulse" />
            <span className="text-neon-primary font-mono text-xs font-bold uppercase tracking-widest">
              System Online // Access Granted
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-text-primary leading-tight tracking-tighter uppercase mb-6 drop-shadow-[0_0_15px_rgba(224,255,248,0.1)]">
            I READ THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-soft drop-shadow-[0_0_25px_rgba(0,255,198,0.5)]">
              SIGNALS.
            </span>
            <br />
            I SECURE THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-soft to-neon-primary drop-shadow-[0_0_25px_rgba(124,255,178,0.5)]">
              FUTURE.
            </span>
          </h1>

          {/* Typing animation */}
          <div className="h-8 md:h-12 flex items-center justify-center text-lg md:text-2xl mb-14">
            <span className="text-neon-primary font-mono mr-3 font-bold">&gt;</span>
            <TypingAnimation strings={roles} typingSpeed={60} deletingSpeed={30} delayBetween={2500} />
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* DECRYPT_RESUME — electric purple glassmorphism */}
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 font-bold font-mono tracking-wider overflow-hidden w-full sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.08) 100%)',
                border: '1px solid rgba(168,85,247,0.55)',
                boxShadow: '0 0 18px rgba(168,85,247,0.35), inset 0 0 18px rgba(168,85,247,0.06)',
                backdropFilter: 'blur(12px)',
                color: '#F5F7FA',
                animation: 'purpleGlow 2.5s ease-in-out infinite',
              }}
            >
              {/* Shine sweep on hover */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              {/* Cyan top-left accent line */}
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#00FFC6]/60" />
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#00FFC6]/60" />
              <Download className="w-5 h-5 relative z-10 text-[#A855F7] group-hover:text-[#D099FF] transition-colors" />
              <span className="relative z-10 text-[#F5F7FA] group-hover:text-white transition-colors">DECRYPT_RESUME</span>
            </motion.a>

            {/* INITIATE_CONTACT — electric purple outline */}
            <motion.button
              onClick={scrollToContact}
              animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
              transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 font-bold font-mono tracking-wider overflow-hidden w-full sm:w-auto"
              style={{
                background: 'rgba(168,85,247,0.06)',
                border: '1px solid rgba(168,85,247,0.40)',
                boxShadow: '0 0 10px rgba(168,85,247,0.2)',
                backdropFilter: 'blur(12px)',
                color: '#D099FF',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(168,85,247,0.15)] to-[rgba(0,255,198,0.06)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Cyan bottom-right accent line */}
              <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#00FFC6]/60" />
              <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#00FFC6]/60" />
              <Terminal className="w-5 h-5 relative z-10 text-[#A855F7] group-hover:text-[#D099FF] transition-colors" />
              <span className="relative z-10 group-hover:text-white transition-colors">INITIATE_CONTACT</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-20 pb-8 flex flex-col items-center gap-2 shrink-0"
      >
        <span className="text-neon-primary font-mono text-xs uppercase tracking-widest">
          Scroll to access
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-primary to-transparent overflow-hidden">
          <div className="w-full h-1/2 bg-neon-soft animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollPulse {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </section>
  );
}
