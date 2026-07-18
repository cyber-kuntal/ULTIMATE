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
      status: "IN PROGRESS"
    },
    {
      level: "Higher Secondary (Class 12)",
      institution: "Bagati Ramgopal Ghosh High School (H.S)",
      details: "West Bengal Board",
      status: "COMPLETED"
    },
    {
      level: "Secondary (Class 10)",
      institution: "Digsui Sadhana Banga Vidyalaya (H.S)",
      details: "West Bengal Board",
      status: "COMPLETED"
    }
  ];

  return (
    <section id="education" className="py-24 relative w-full z-10 bg-bg-mid border-t border-neon-primary/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionTitle title="Training_Logs" subtitle="Academic Background" />

        <div className="relative mt-12">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-primary via-neon-soft to-transparent opacity-50 transform md:-translate-x-1/2" />

          <div className="space-y-16">
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;
              const delay = index * 0.15;
              
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-[28px] md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-none bg-bg-deep border-2 border-neon-primary z-10 mt-[26px] md:mt-0 shadow-[0_0_15px_rgba(0,255,198,0.8)] rotate-45">
                    <div className="absolute inset-[2px] bg-neon-primary animate-ping opacity-50" />
                  </div>

                  {/* Card Container */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay, ease: "easeOut" }}
                    >
                      <GlowCard className="p-8 relative overflow-hidden group bg-bg-card/60 backdrop-blur-md border-l-4 border-l-neon-primary border-t border-r border-b border-neon-primary/20 hover:-translate-y-1 transition-transform">
                        {/* Decorative background number */}
                        <div className="absolute -right-4 -bottom-8 text-8xl font-display font-black text-neon-primary/5 pointer-events-none group-hover:text-neon-primary/10 transition-colors">
                          0{index + 1}
                        </div>

                        <div className="relative z-10">
                          <div className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border rounded-none bg-bg-deep border-neon-primary text-neon-primary">
                            {edu.status}
                          </div>
                          
                          <h3 className="text-2xl font-display font-bold text-text-primary mb-2">{edu.institution}</h3>
                          
                          <div className="text-sm font-mono text-neon-soft mb-4 uppercase tracking-wider">
                            // {edu.level}
                          </div>
                          
                          <p className="text-text-primary/90 font-mono text-sm border-l-2 pl-4 border-neon-primary bg-bg-deep/40 py-2">
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
