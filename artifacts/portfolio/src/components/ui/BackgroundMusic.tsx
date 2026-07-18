import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

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
        setBlocked(true);
        setShowHint(true);
        setTimeout(() => setShowHint(false), 6000);
      }
    };

    const t = setTimeout(tryPlay, 800);
    return () => clearTimeout(t);
  }, []);

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
      <audio ref={audioRef} src="/bg-music.mpeg" preload="auto" />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 py-2 bg-bg-deep border border-neon-primary/40 rounded-none font-mono text-xs text-neon-primary whitespace-nowrap backdrop-blur-md shadow-[0_0_10px_rgba(0,255,198,0.2)]"
            >
              [ SYSTEM ALERT ] AUDIO COMMS PENDING AUTHORIZATION
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.9 }}
          title={playing ? 'Mute music' : 'Play music'}
          className={`relative w-12 h-12 rounded-none border flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            playing
              ? 'border-neon-primary bg-neon-primary/10 shadow-[0_0_20px_rgba(0,255,198,0.5)]'
              : 'border-neon-primary/30 bg-bg-deep/80 hover:border-neon-primary/80'
          }`}
        >
          {playing ? (
            <span className="flex items-end gap-[3px] h-5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-1 bg-neon-primary shadow-[0_0_5px_rgba(0,255,198,0.8)]"
                  style={{
                    height: `${40 + i * 15}%`,
                    animation: `soundBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                  }}
                />
              ))}
            </span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
