import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'PROFILE', id: 'profile' },
    { name: 'EDUCATION', id: 'education' },
    { name: 'SKILLS', id: 'skills' },
    { name: 'CERTIFICATIONS', id: 'certifications' },
    { name: 'CONTACT', id: 'contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent py-4',
        scrolled && 'bg-bg-deep/85 backdrop-blur-xl py-3 border-neon-primary shadow-[0_0_20px_rgba(0,255,198,0.1)]'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="font-display font-bold text-xl tracking-wider text-neon-primary">
            KUNTAL.SYS
            <span className="inline-block w-2 h-5 ml-1 bg-neon-primary animate-pulse align-middle" />
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="group relative text-sm font-mono text-text-muted hover:text-neon-soft transition-colors tracking-widest"
            >
              // {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-primary group-hover:w-full transition-all duration-300 ease-out" />
            </button>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-bg-card/50 border border-neon-primary/30 rounded-full shadow-[0_0_10px_rgba(0,255,198,0.2)]">
          <span className="w-2 h-2 rounded-full bg-neon-primary animate-pulse shadow-[0_0_5px_rgba(0,255,198,0.8)]" />
          <span className="text-neon-primary font-mono text-[10px] uppercase tracking-widest">
            SYSTEM ONLINE
          </span>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => scrollTo('contact')}
          className="md:hidden text-neon-primary font-mono text-sm border border-neon-primary/30 px-3 py-1 bg-neon-primary/10"
        >
          [ CONNECT ]
        </button>
      </div>
    </nav>
  );
}
