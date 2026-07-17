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
        <circle cx="60" cy="60" r="56" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.6" />
        {/* Middle ring */}
        <circle cx="60" cy="60" r="40" stroke="#00ff87" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Inner ring */}
        <circle cx="60" cy="60" r="20" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.9" />
        {/* Centre dot */}
        <circle cx="60" cy="60" r="2" fill="#00ff87" fillOpacity="0.9" />

        {/* Crosshair lines — gap at centre */}
        {/* Top */}
        <line x1="60" y1="4"  x2="60" y2="38" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.8" />
        {/* Bottom */}
        <line x1="60" y1="82" x2="60" y2="116" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.8" />
        {/* Left */}
        <line x1="4"  y1="60" x2="38" y2="60"  stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.8" />
        {/* Right */}
        <line x1="82" y1="60" x2="116" y2="60" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.8" />

        {/* Corner tick marks on outer ring */}
        <line x1="60" y1="4"  x2="60" y2="10"  stroke="#00ff87" strokeWidth="1.5" />
        <line x1="60" y1="110" x2="60" y2="116" stroke="#00ff87" strokeWidth="1.5" />
        <line x1="4"  y1="60" x2="10" y2="60"  stroke="#00ff87" strokeWidth="1.5" />
        <line x1="110" y1="60" x2="116" y2="60" stroke="#00ff87" strokeWidth="1.5" />

        {/* Distance markers on crosshair */}
        <line x1="60" y1="24" x2="64" y2="24" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="60" y1="24" x2="56" y2="24" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="60" y1="96" x2="64" y2="96" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="60" y1="96" x2="56" y2="96" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="24"  y1="60" x2="24" y2="56" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="24"  y1="60" x2="24" y2="64" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="96"  y1="60" x2="96" y2="56" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="96"  y1="60" x2="96" y2="64" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const roles = [
    "Cybersecurity Engineer",
    "Cybercrime Investigator",
    "SOC Analyst",
    "Digital Forensics Analyst",
    "Security Researcher"
  ];

  const handleDownload = () => {
    // Direct download link — forces Google Drive to send the file instead of previewing it
    window.open("https://drive.google.com/uc?export=download&id=1lbpBzCpbVaHnxmWTD1e94O0uN-AdxbRn", "_blank");
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ cursor: 'none' }}
    >
      {/* 3D / CSS Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-bg-primary" />}>
        <HeroCanvas />
      </Suspense>

      {/* Sniper scope cursor */}
      <SniperScope containerRef={sectionRef as React.RefObject<HTMLElement>} />

      {/* CRT Scanline Overlay */}
      <div className="scanline" />

      {/* ── Main content — centred in the remaining space above the scroll indicator ── */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center mt-16 flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-green/30 bg-cyber-green/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-cyber-green font-mono text-xs uppercase tracking-widest">
              System Online // Secure Connection Established
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight tracking-tighter uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            I READ THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green drop-shadow-[0_0_20px_rgba(0,255,135,0.4)]">
              SIGNALS.
            </span>
            <br />
            I SECURE THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              FUTURE.
            </span>
          </h1>

          {/* Typing animation */}
          <div className="h-8 md:h-12 flex items-center justify-center text-lg md:text-2xl mb-12">
            <span className="text-text-muted font-mono mr-3">&gt;</span>
            <TypingAnimation strings={roles} typingSpeed={60} deletingSpeed={30} delayBetween={2500} />
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={handleDownload}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-cyber-green text-bg-primary font-bold font-mono tracking-wider overflow-hidden rounded-sm transition-all hover:shadow-[0_0_30px_rgba(0,255,135,0.6)] w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">DECRYPT_RESUME</span>
            </button>

            <button
              onClick={scrollToContact}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-cyber-cyan border border-cyber-cyan font-bold font-mono tracking-wider overflow-hidden rounded-sm transition-all hover:bg-cyber-cyan/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] w-full sm:w-auto"
            >
              <Terminal className="w-5 h-5" />
              <span>INITIATE_CONTACT</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator — pinned to bottom, never overlaps content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-20 pb-8 flex flex-col items-center gap-2 shrink-0"
      >
        <span className="text-text-muted font-mono text-xs uppercase tracking-widest">
          Scroll to access
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-cyber-cyan to-transparent overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-[scrollPulse_2s_ease-in-out_infinite]" />
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
