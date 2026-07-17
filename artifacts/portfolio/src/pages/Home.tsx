import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import NavBar from '@/components/ui/NavBar';
import Hero from '@/components/sections/Hero';
import Profile from '@/components/sections/Profile';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Certifications from '@/components/sections/Certifications';
import Teaching from '@/components/sections/Teaching';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-cyber-cyan/30 selection:text-white">
      <NavBar />
      
      <main>
        <Hero />
        <Profile />
        <Education />
        <Skills />
        <Certifications />
        <Teaching />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}