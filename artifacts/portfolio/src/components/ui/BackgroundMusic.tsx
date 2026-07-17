import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false); // browser blocked autoplay
  const [showHint, setShowHint] = useState(false);

  // Try autoplay on mount; if browser blocks it, surface the hint
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.loop = true;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
      } catch {
        // Autoplay blocked — show the hint badge so user can click to enable
        setBlocked(true);
        setShowHint(true);
        // Auto-hide the hint after 6 s
        setTimeout(() => setShowHint(false), 6000);
      }
    };

    // Small delay so the page finishes painting first
    const t = setTimeout(tryPlay, 800);
    return () => clearTimeout(t);
  }, []);

  // Also try to play on first user interaction anywhere on page (one-shot)
  useEffect(() => {
    if (!blocked) return;
    const unlock = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
      } catch { /* still blocked */ }
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
    };
  }, [blocked]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/bg-music.mpeg" preload="auto" />

      {/* Floating control — bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

        {/* "Click to enable music" hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-3 py-1.5 bg-bg-card border border-cyber-green/40 rounded-sm font-mono text-xs text-cyber-green whitespace-nowrap backdrop-blur-md"
            >
              🎵 Click anywhere to enable music
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.9 }}
          title={playing ? 'Mute music' : 'Play music'}
          className={`relative w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            playing
              ? 'border-cyber-green bg-cyber-green/10 shadow-[0_0_18px_rgba(0,255,135,0.4)]'
              : 'border-border/50 bg-bg-card/60 hover:border-cyber-green/60'
          }`}
        >
          {/* Animated sound bars when playing */}
          {playing ? (
            <span className="flex items-end gap-[2px] h-4">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[3px] bg-cyber-green rounded-full"
                  style={{
                    height: `${40 + i * 15}%`,
                    animation: `soundBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                  }}
                />
              ))}
            </span>
          ) : (
            /* Muted icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-text-muted">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </motion.button>
      </div>

      <style>{`
        @keyframes soundBar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}
