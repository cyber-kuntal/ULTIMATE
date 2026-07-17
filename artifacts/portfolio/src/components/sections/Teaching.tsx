import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';
import { BookOpen, ExternalLink, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Teaching() {
  const boards = [
    {
      name: "CBSE & ICSE",
      classes: "Class 1–10",
      subjects: ["Science", "Mathematics", "Computer Science"],
      color: "cyber-cyan"
    },
    {
      name: "West Bengal Board",
      classes: "Class 1–7",
      subjects: ["All Subjects"],
      color: "cyber-green"
    },
    {
      name: "West Bengal Board",
      classes: "Class 8–10",
      subjects: ["Science Group", "Computer Science"],
      color: "cyber-purple"
    },
    {
      name: "West Bengal Board",
      classes: "Class 11–12",
      subjects: ["Computer Science"],
      color: "cyber-cyan"
    }
  ];

  return (
    <section id="teaching" className="py-24 relative w-full z-10 bg-bg-primary">
      <div className="container mx-auto px-6">
        <SectionTitle title="Knowledge_Transfer" subtitle="Mentorship & Online Tutoring" />

        <div className="mb-16">
          <GlowCard className="p-8 md:p-12 border-t-4 border-cyber-green flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-bg-card to-cyber-green/5">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyber-green/10 rounded-lg border border-cyber-green/30">
                  <Users className="w-6 h-6 text-cyber-green" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Online Tutor</h3>
                  <p className="text-cyber-green font-mono text-sm tracking-widest mt-1">Platform: mytaptutor.in</p>
                </div>
              </div>
              <p className="text-text-muted font-sans font-light leading-relaxed max-w-2xl">
                Bridging the gap between complex concepts and student understanding. I provide structured, engaging, and result-oriented tutoring across multiple boards, specializing in Science, Mathematics, and Computer Science.
              </p>
            </div>
            
            <a 
              href="https://mytaptutor.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-bg-primary border border-cyber-green text-cyber-green font-mono font-bold tracking-wider hover:bg-cyber-green hover:text-bg-primary transition-all duration-300 rounded-sm shrink-0 shadow-[0_0_15px_rgba(0,255,135,0.2)] hover:shadow-[0_0_25px_rgba(0,255,135,0.6)]"
            >
              <span>ACCESS_PLATFORM</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </GlowCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boards.map((board, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-${board.color}/10 rounded-xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100`} />
              <div className="relative h-full p-6 bg-bg-secondary border border-border/30 rounded-xl flex flex-col hover:border-white/20 transition-colors">
                <div className={`w-10 h-10 rounded-lg bg-${board.color}/10 border border-${board.color}/30 flex items-center justify-center mb-6`}>
                  <BookOpen className={`w-5 h-5 text-${board.color}`} />
                </div>
                
                <h4 className="text-xl font-display font-bold text-white mb-2">{board.name}</h4>
                <div className="text-sm font-mono text-text-muted uppercase tracking-wider mb-6 pb-4 border-b border-border/50">
                  // {board.classes}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {board.subjects.map((subject, sIdx) => (
                    <span 
                      key={sIdx} 
                      className={`text-xs font-sans font-medium px-2 py-1 rounded bg-${board.color}/5 border border-${board.color}/20 text-white/80`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}