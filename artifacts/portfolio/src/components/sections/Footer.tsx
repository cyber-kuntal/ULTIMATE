import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-bg-deep border-t border-neon-primary/40 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 opacity-80">
            <Shield className="w-5 h-5 text-neon-primary" />
            <span className="font-display font-bold text-sm tracking-widest text-text-primary">KUNTAL<span className="text-neon-primary">.SYS</span><span className="animate-pulse">_</span></span>
          </div>

          <div className="font-mono text-xs text-text-muted text-center md:text-left tracking-widest">
            &copy; {year} KUNTAL KUMAR. ALL SYSTEMS SECURE.
          </div>

          <div className="flex gap-4 font-mono text-xs text-neon-soft font-bold">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-primary animate-pulse" />
              STATUS: ONLINE
            </span>
            <span className="text-neon-primary/30">|</span>
            <span className="hover:text-neon-primary cursor-crosshair transition-colors">CONNECTION ACTIVE</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
