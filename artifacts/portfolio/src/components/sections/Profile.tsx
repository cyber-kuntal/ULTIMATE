import React from 'react';
import { MapPin, GraduationCap, Calendar, ShieldCheck } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';

// Using a fallback for profile photo
import profilePhoto from '@assets/0_WhatsApp_Image_2026-07-17_at_08.44.07_1784263814949.jpeg';

export default function Profile() {
  return (
    <section id="profile" className="py-24 relative w-full z-10 bg-bg-deep">
      <div className="container mx-auto px-6">
        <SectionTitle title="Identity.dat" subtitle="Operator Profile & Classification" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo Column */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group w-64 h-64 md:w-80 md:h-80">
              
              {/* Animated Cyber Frame */}
              <div 
                className="absolute inset-0 border-2 border-neon-primary shadow-[0_0_20px_rgba(0,255,198,0.5)] z-20 pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
              >
                <div className="absolute inset-0 bg-neon-primary/20 animate-pulse" />
              </div>

              {/* Decorative Background Offset */}
              <div 
                className="absolute -inset-4 bg-bg-mid border border-neon-soft/30 z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
              />

              {/* Image Container */}
              <div 
                className="absolute inset-0 overflow-hidden bg-bg-card z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
              >
                <div className="absolute inset-0 bg-neon-primary/20 mix-blend-overlay z-20 group-hover:opacity-0 transition-opacity duration-500" />
                <img 
                  src={profilePhoto} 
                  alt="Kuntal Kumar" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:filter-none transition-all duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>

              {/* Clearance Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#0B4D45]/90 border border-neon-primary z-30 flex items-center gap-2 whitespace-nowrap shadow-[0_0_20px_rgba(0,255,198,0.5)] backdrop-blur-sm transform rotate-[-2deg]">
                <ShieldCheck className="w-4 h-4 text-neon-primary" />
                <span className="text-neon-primary font-mono text-sm font-bold uppercase tracking-widest">Clearance: Alpha</span>
              </div>
            </div>
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-8">
            <GlowCard className="p-8 md:p-10 border-l-4 border-l-neon-primary bg-bg-card/40 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-neon-primary" />
                <h3 className="text-3xl font-display font-bold text-text-primary uppercase tracking-wider">Kuntal Kumar</h3>
              </div>
              
              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-lg text-text-primary leading-relaxed font-sans font-light">
                  I am a B.Sc. Cybersecurity & Digital Forensics student passionate about securing digital systems and investigating cyber threats. 
                  Alongside my cybersecurity journey, I work as an online tutor, helping students excel in Science, Mathematics, and Computer Science 
                  across multiple education boards.
                </p>
                <p className="text-lg text-text-primary leading-relaxed font-sans font-light mt-4">
                  My mission is to operate at the intersection of defense and education — fortifying the digital frontier while empowering the next generation of technologists.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-none bg-bg-deep border border-neon-primary flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,255,198,0.2)]">
                    <MapPin className="w-5 h-5 text-neon-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neon-soft uppercase tracking-wider mb-1">Base of Operations</div>
                    <div className="text-text-primary font-medium font-mono">Hooghly, West Bengal, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-none bg-bg-deep border border-neon-primary flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,255,198,0.2)]">
                    <GraduationCap className="w-5 h-5 text-neon-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neon-soft uppercase tracking-wider mb-1">Current Directive</div>
                    <div className="text-text-primary font-medium font-mono">B.Sc Cybersecurity</div>
                    <div className="text-sm text-text-muted font-mono">MAKAUT</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-none bg-bg-deep border border-neon-primary flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,255,198,0.2)]">
                    <Calendar className="w-5 h-5 text-neon-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neon-soft uppercase tracking-wider mb-1">Expected Completion</div>
                    <div className="text-text-primary font-medium font-mono">Class of 2028</div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>

        </div>
      </div>
    </section>
  );
}
