import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-bg-primary border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 opacity-50">
            <Shield className="w-4 h-4 text-cyber-green" />
            <span className="font-display font-bold text-sm tracking-wider text-white">KUNTAL<span className="text-cyber-cyan">.SYS</span></span>
          </div>

          <div className="font-mono text-xs text-text-muted text-center md:text-left">
            &copy; {year} KUNTAL KUMAR. ALL SYSTEMS SECURE.
          </div>

          <div className="flex gap-4 font-mono text-xs text-text-muted">
            <span className="hover:text-cyber-cyan cursor-pointer transition-colors">STATUS: ONLINE</span>
            <span>|</span>
            <span className="hover:text-cyber-green cursor-pointer transition-colors">LATENCY: 12ms</span>
          </div>

        </div>
      </div>
    </footer>
  );
}