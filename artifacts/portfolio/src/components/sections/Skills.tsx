import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';

const secOpsSkills = [
  { name: 'Linux',                    level: 85 },
  { name: 'Windows',                  level: 80 },
  { name: 'Networking',               level: 75 },
  { name: 'Wireshark',                level: 80 },
  { name: 'Nmap',                     level: 85 },
  { name: 'Burp Suite',               level: 70 },
  { name: 'Metasploit',               level: 65 },
  { name: 'Digital Forensics',        level: 80 },
  { name: 'Cybercrime Investigation', level: 85 },
  { name: 'OSINT',                    level: 90 },
  { name: 'OWASP Top 10',             level: 75 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative w-full z-10 bg-bg-deep overflow-hidden">

      {/* Subtle circuit grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' fill='none' stroke='%2300FFC6' stroke-width='0.5' stroke-dasharray='4,4'/%3E%3Cline x1='40' y1='0' x2='40' y2='80' stroke='%237CFFB2' stroke-width='0.3'/%3E%3Cline x1='0' y1='40' x2='80' y2='40' stroke='%237CFFB2' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title="Capabilities" subtitle="Technical Proficiency Arsenal" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12 max-w-5xl mx-auto">
          {secOpsSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: 'easeOut' }}
              className="group relative"
            >
              {/* Glow bloom behind card */}
              <div className="absolute inset-0 bg-neon-primary/10 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-400 pointer-events-none" />

              <div className="relative p-5 bg-bg-card/70 border border-neon-primary/20 backdrop-blur-md group-hover:border-neon-primary group-hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                {/* Skill name */}
                <span
                  className="font-mono font-semibold text-sm text-text-primary mb-4 leading-snug"
                  title={skill.name}
                >
                  {skill.name}
                </span>

                {/* Animated bar */}
                <div
                  className="w-full h-1 bg-bg-deep mt-auto overflow-hidden border border-neon-primary/15"
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency ${skill.level}%`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 + 0.3, duration: 0.9, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-neon-primary to-neon-soft group-hover:shadow-[0_0_12px_rgba(0,255,198,0.9)]"
                  />
                </div>

                <div className="text-right text-[10px] font-mono text-neon-soft/60 mt-1.5 group-hover:text-neon-soft transition-colors">
                  {skill.level}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
