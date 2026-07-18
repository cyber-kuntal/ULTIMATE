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
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-neon-primary text-bg-deep font-bold font-mono tracking-wider overflow-hidden rounded-none transition-shadow hover:shadow-[0_0_30px_rgba(0,255,198,0.8)] w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-full h-full bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">DECRYPT_RESUME</span>
            </motion.a>

            <button
              onClick={scrollToContact}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-bg-deep/50 text-neon-primary border border-neon-primary font-bold font-mono tracking-wider overflow-hidden rounded-none transition-all hover:bg-neon-primary hover:text-bg-deep hover:shadow-[0_0_20px_rgba(0,255,198,0.4)] w-full sm:w-auto backdrop-blur-sm"
            >
              <Terminal className="w-5 h-5 group-hover:text-bg-deep" />
              <span>INITIATE_CONTACT</span>
            </button>
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
