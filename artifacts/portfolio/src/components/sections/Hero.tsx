import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal } from 'lucide-react';
import TypingAnimation from '@/components/ui/TypingAnimation';

const HeroCanvas = lazy(() => import('@/components/three/HeroCanvas'));

export default function Hero() {
  const roles = [
    "Cybersecurity Engineer",
    "Cybercrime Investigator",
    "SOC Analyst",
    "Digital Forensics Analyst",
    "Security Researcher"
  ];

  const handleDownload = () => {
    window.open("https://drive.google.com/file/d/1lbpBzCpbVaHnxmWTD1e94O0uN-AdxbRn/view?usp=drive_link", "_blank");
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-bg-primary" />}>
        <HeroCanvas />
      </Suspense>

      {/* CRT Scanline Overlay */}
      <div className="scanline" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-green/30 bg-cyber-green/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-cyber-green font-mono text-xs uppercase tracking-widest">System Online // Secure Connection Established</span>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight tracking-tighter uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            I READ THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green drop-shadow-[0_0_20px_rgba(0,255,135,0.4)]">SIGNALS.</span><br/>
            I SECURE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">FUTURE.</span>
          </h1>

          <div className="h-8 md:h-12 flex items-center justify-center text-lg md:text-2xl mb-12">
            <span className="text-text-muted font-mono mr-3">&gt;</span>
            <TypingAnimation strings={roles} typingSpeed={60} deletingSpeed={30} delayBetween={2500} />
          </div>

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

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-text-muted font-mono text-xs uppercase tracking-widest">Scroll to access</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyber-cyan to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll_2s_ease-in-out_infinite]" />
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </section>
  );
}