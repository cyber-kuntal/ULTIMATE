import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'PROFILE',        id: 'profile' },
    { name: 'EDUCATION',      id: 'education' },
    { name: 'SKILLS',         id: 'skills' },
    { name: 'CERTIFICATIONS', id: 'certifications' },
    { name: 'CONTACT',        id: 'contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4',
        /* Always dark so binary rain / hero bg never bleeds through */
        'bg-[#041A1F]/90 backdrop-blur-xl border-b border-[#00FFC6]/15',
        scrolled && 'py-3 border-[#00FFC6]/30 shadow-[0_4px_24px_rgba(0,255,198,0.08)]'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="font-display font-bold text-xl tracking-wider text-[#00FFC6] drop-shadow-[0_0_8px_rgba(0,255,198,0.6)]">
            KUNTAL.SYS
          </span>
          <span className="inline-block w-[2px] h-5 bg-[#00FFC6] animate-pulse" />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="group relative text-[11px] font-mono text-[#4A9E8E] hover:text-[#7CFFB2] transition-colors duration-200 tracking-widest uppercase"
            >
              // {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00FFC6] group-hover:w-full transition-all duration-300 ease-out" />
            </button>
          ))}
        </div>

        {/* SYSTEM ONLINE badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#0B4D45]/50 border border-[#00FFC6]/25 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#00FFC6] animate-pulse shadow-[0_0_5px_rgba(0,255,198,0.9)]" />
          <span className="text-[#00FFC6] font-mono text-[10px] uppercase tracking-widest">
            SYSTEM ONLINE
          </span>
        </div>

        {/* Mobile */}
        <button
          onClick={() => scrollTo('contact')}
          className="md:hidden text-[#00FFC6] font-mono text-sm border border-[#00FFC6]/30 px-3 py-1 bg-[#00FFC6]/10"
        >
          [ CONNECT ]
        </button>
      </div>
    </nav>
  );
}
