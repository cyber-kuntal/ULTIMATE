import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import NavBar from '@/components/ui/NavBar';
import Hero from '@/components/sections/Hero';
import Profile from '@/components/sections/Profile';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep">
      <NavBar />
      <main>
        <Hero />
        <Profile />
        <Education />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
