import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';
import { ExternalLink } from 'lucide-react';

import dcci from "@assets/0_DCCI_1784264564952.jpg";
import androidVuln from "@assets/0_Android_Vulnb_1784264603119.jpg";
import cisco from "@assets/0_CISCO_1784264611694.jpg";
import advAndroid from "@assets/0_professional_Advance_1784264620711.jpg";

export default function Certifications() {
  const certs = [
    {
      title: "Defronix Certified Cyber Crime Investigator",
      issuer: "Defronix",
      image: dcci,
      color: "cyber-purple"
    },
    {
      title: "Android Vulnerability Assessment & Pentesting",
      issuer: "Security Organization",
      image: androidVuln,
      color: "cyber-green"
    },
    {
      title: "Networking Basics",
      issuer: "CISCO",
      image: cisco,
      color: "cyber-cyan"
    },
    {
      title: "Professional Advance Android Ethical Hacking and Penetration Testing",
      issuer: "Advanced Security",
      image: advAndroid,
      color: "cyber-green"
    }
  ];

  return (
    <section id="certifications" className="py-24 relative w-full z-10 bg-bg-secondary border-t border-white/5">
      <div className="container mx-auto px-6">
        <SectionTitle title="Clearances" subtitle="Verified Credentials & Certifications" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {certs.map((cert, index) => (
            <GlowCard 
              key={index} 
              delay={index * 0.1}
              className="group p-2 cursor-crosshair"
            >
              <div className="relative overflow-hidden rounded-md border border-white/10 aspect-[1.4/1]">
                {/* Fallback image logic handled natively, these assets should exist */}
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800&h=600`;
                  }}
                />
                
                {/* Scanline overlay over image */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 group-hover:opacity-0 transition-opacity" />
                
                {/* Hover overlay content */}
                <div className="absolute inset-0 bg-bg-primary/90 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-full border-2 border-${cert.color} flex items-center justify-center mb-4`}>
                    <ExternalLink className={`w-5 h-5 text-${cert.color}`} />
                  </div>
                  <h4 className="text-center font-display font-bold text-white text-lg mb-2">{cert.title}</h4>
                  <p className="text-center font-mono text-sm text-text-muted uppercase tracking-wider">{cert.issuer}</p>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between border-t border-white/5 mt-2 bg-bg-card/50">
                <div className="font-mono text-xs text-text-muted truncate max-w-[80%] uppercase">
                  FILE: {cert.title.substring(0, 20).replace(/ /g, '_')}.CERT
                </div>
                <div className="flex gap-1">
                  <div className={`w-1 h-3 bg-${cert.color} rounded-sm animate-pulse`} />
                  <div className={`w-1 h-3 bg-${cert.color} rounded-sm animate-pulse delay-75`} />
                  <div className={`w-1 h-3 bg-${cert.color} rounded-sm animate-pulse delay-150`} />
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}