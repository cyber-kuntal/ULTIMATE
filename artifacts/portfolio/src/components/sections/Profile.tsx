import React from 'react';
import { MapPin, GraduationCap, Calendar, ShieldCheck } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';

// Using a fallback for profile photo since the provided path implies it should exist in assets
// and vite setup has alias.
import profilePhoto from '@assets/0_WhatsApp_Image_2026-07-17_at_08.44.07_1784263814949.jpeg';

export default function Profile() {
  return (
    <section id="profile" className="py-24 relative w-full z-10 bg-bg-primary">
      <div className="container mx-auto px-6">
        <SectionTitle title="Identity.dat" subtitle="Operator Profile & Classification" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo Column */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group w-64 h-64 md:w-80 md:h-80">
              {/* Cyber Frame */}
              <div className="absolute -inset-4 border border-cyber-cyan/30 bg-cyber-cyan/5 rounded-sm transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
              <div className="absolute -inset-4 border border-cyber-green/30 bg-cyber-green/5 rounded-sm transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
              
              {/* Corner Accents */}
              <div className="absolute -top-6 -left-6 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan" />
              <div className="absolute -top-6 -right-6 w-8 h-8 border-t-2 border-r-2 border-cyber-green" />
              <div className="absolute -bottom-6 -left-6 w-8 h-8 border-b-2 border-l-2 border-cyber-green" />
              <div className="absolute -bottom-6 -right-6 w-8 h-8 border-b-2 border-r-2 border-cyber-cyan" />

              {/* Image Container */}
              <div className="absolute inset-0 overflow-hidden rounded-sm bg-bg-secondary border border-white/10 z-10">
                <div className="absolute inset-0 bg-cyber-cyan/20 mix-blend-overlay z-20 group-hover:opacity-0 transition-opacity duration-500" />
                <img 
                  src={profilePhoto} 
                  alt="Kuntal Kumar" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:filter-none transition-all duration-700"
                  onError={(e) => {
                    // Fallback if asset is missing in current sandbox
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-bg-card border border-cyber-green rounded-full z-30 flex items-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(0,255,135,0.3)]">
                <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                <span className="text-cyber-green font-mono text-xs font-bold uppercase tracking-widest">Active Status</span>
              </div>
            </div>
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-8">
            <GlowCard className="p-8 md:p-10 border-l-4 border-l-cyber-cyan">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-cyber-cyan" />
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Kuntal Kumar</h3>
              </div>
              
              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-lg text-text-muted leading-relaxed font-sans font-light">
                  I am a B.Sc. Cybersecurity & Digital Forensics student passionate about securing digital systems and investigating cyber threats. 
                  Alongside my cybersecurity journey, I work as an online tutor, helping students excel in Science, Mathematics, and Computer Science 
                  across multiple education boards.
                </p>
                <p className="text-lg text-text-muted leading-relaxed font-sans font-light mt-4">
                  My mission is to operate at the intersection of defense and education — fortifying the digital frontier while empowering the next generation of technologists.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyber-cyan/10 flex items-center justify-center shrink-0 border border-cyber-cyan/20">
                    <MapPin className="w-5 h-5 text-cyber-cyan" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Base of Operations</div>
                    <div className="text-white font-medium">Hooghly, West Bengal, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyber-green/10 flex items-center justify-center shrink-0 border border-cyber-green/20">
                    <GraduationCap className="w-5 h-5 text-cyber-green" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Current Directive</div>
                    <div className="text-white font-medium">B.Sc Cybersecurity</div>
                    <div className="text-sm text-text-muted">MAKAUT</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyber-purple/10 flex items-center justify-center shrink-0 border border-cyber-purple/20">
                    <Calendar className="w-5 h-5 text-cyber-purple" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Expected Completion</div>
                    <div className="text-white font-medium">Class of 2028</div>
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