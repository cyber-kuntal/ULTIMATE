import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';
import { motion } from 'framer-motion';

export default function Education() {
  const educationData = [
    {
      level: "College (Current)",
      institution: "Maulana Abul Kalam Azad University Of Technology",
      details: "B.Sc Cybersecurity · CGPA: 7.86 · Expected: 2028",
      status: "IN PROGRESS",
      color: "cyber-green"
    },
    {
      level: "Higher Secondary (Class 12)",
      institution: "Bagati Ramgopal Ghosh High School (H.S)",
      details: "West Bengal Board",
      status: "COMPLETED",
      color: "cyber-cyan"
    },
    {
      level: "Secondary (Class 10)",
      institution: "Digsui Sadhana Banga Vidyalaya (H.S)",
      details: "West Bengal Board",
      status: "COMPLETED",
      color: "cyber-purple"
    }
  ];

  return (
    <section id="education" className="py-24 relative w-full z-10 bg-bg-secondary border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionTitle title="Training_Logs" subtitle="Academic Background" />

        <div className="relative mt-12">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-green to-transparent opacity-30 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;
              const delay = index * 0.2;
              
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-[28px] md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-bg-primary border-2 border-white z-10 mt-[26px] md:mt-0" style={{ borderColor: `var(--color-${edu.color})`, boxShadow: `0 0 10px var(--color-${edu.color})` }}>
                    <div className="absolute inset-[2px] bg-white rounded-full animate-ping opacity-50" />
                  </div>

                  {/* Card Container */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay, ease: "easeOut" }}
                    >
                      <GlowCard className="p-6 relative overflow-hidden group">
                        {/* Decorative background number */}
                        <div className="absolute -right-4 -bottom-8 text-8xl font-display font-black text-white/5 pointer-events-none group-hover:text-white/10 transition-colors">
                          0{index + 1}
                        </div>

                        <div className="relative z-10">
                          <div className={`inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border rounded-sm bg-${edu.color}/10 border-${edu.color}/30 text-${edu.color}`}>
                            {edu.status}
                          </div>
                          
                          <h3 className="text-xl font-display font-bold text-white mb-2">{edu.institution}</h3>
                          
                          <div className="text-sm font-mono text-text-muted mb-4 uppercase tracking-wider">
                            // {edu.level}
                          </div>
                          
                          <p className="text-white/80 font-light border-l-2 pl-4" style={{ borderColor: `var(--color-${edu.color})` }}>
                            {edu.details}
                          </p>
                        </div>
                      </GlowCard>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}