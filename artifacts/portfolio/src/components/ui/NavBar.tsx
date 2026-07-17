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
    { name: 'Profile', id: 'profile' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent py-4',
        scrolled && 'bg-bg-primary/80 backdrop-blur-md border-cyber-cyan/20 py-3 shadow-[0_0_20px_rgba(0,212,255,0.05)]'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Shield className="w-6 h-6 text-cyber-green group-hover:text-cyber-cyan transition-colors" />
          <span className="font-display font-bold text-lg tracking-wider text-white">KUNTAL<span className="text-cyber-cyan">.SYS</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-mono text-text-muted hover:text-cyber-green transition-colors tracking-wide"
            >
              // {link.name}
            </button>
          ))}
        </div>
        
        {/* Mobile menu button could go here, keeping simple for now */}
        <button 
          onClick={() => scrollTo('contact')}
          className="md:hidden text-cyber-cyan font-mono text-sm"
        >
          [ CONNECT ]
        </button>
      </div>
    </nav>
  );
}