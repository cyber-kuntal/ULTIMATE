import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import dcci from "@assets/0_DCCI_1784264564952.jpg";
import androidVuln from "@assets/0_Android_Vulnb_1784264603119.jpg";
import cisco from "@assets/0_CISCO_1784264611694.jpg";
import advAndroid from "@assets/0_professional_Advance_1784264620711.jpg";

export default function Certifications() {
  const certs = [
    {
      title: "Defronix Certified Cyber Crime Investigator",
      issuer: "Defronix",
      image: dcci
    },
    {
      title: "Android Vulnerability Assessment & Pentesting",
      issuer: "Security Organization",
      image: androidVuln
    },
    {
      title: "Networking Basics",
      issuer: "CISCO",
      image: cisco
    },
    {
      title: "Professional Advance Android Ethical Hacking and Penetration Testing",
      issuer: "Advanced Security",
      image: advAndroid
    }
  ];

  return (
    <section id="certifications" className="py-24 relative w-full z-10 bg-bg-mid border-t border-neon-primary/20">
      <div className="container mx-auto px-6">
        <SectionTitle title="Clearances" subtitle="Verified Credentials & Certifications" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <GlowCard className="group p-0 cursor-crosshair border-neon-primary/30 rounded-none bg-bg-card">
                <div className="relative overflow-hidden aspect-[1.4/1]">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800&h=600`;
                    }}
                  />
                  
                  {/* Neon overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-transparent opacity-90" />
                  
                  {/* Verified Stamp Badge */}
                  <div className="absolute top-4 right-4 border-2 border-neon-primary text-neon-primary px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(0,255,198,0.5)] bg-bg-deep/80 backdrop-blur-sm flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> VERIFIED
                  </div>

                  {/* Content over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-display font-bold text-text-primary text-xl mb-2 leading-tight">{cert.title}</h4>
                    <p className="font-mono text-sm text-neon-soft uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 bg-neon-primary rounded-full animate-pulse" />
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Hover icon overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-none border-2 border-neon-primary bg-bg-deep/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(0,255,198,0.5)]">
                    <ExternalLink className="w-6 h-6 text-neon-primary" />
                  </div>
                </div>
                
                <div className="p-3 flex items-center justify-between border-t border-neon-primary/30 bg-bg-deep">
                  <div className="font-mono text-xs text-text-muted truncate max-w-[80%] uppercase">
                    FILE: {cert.title.substring(0, 20).replace(/ /g, '_')}.CERT
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-neon-primary animate-[pulse_1s_ease-in-out_infinite]" />
                    <div className="w-1 h-3 bg-neon-soft animate-[pulse_1s_ease-in-out_infinite_0.2s]" />
                    <div className="w-1 h-3 bg-neon-primary animate-[pulse_1s_ease-in-out_infinite_0.4s]" />
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
