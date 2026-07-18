import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';

const secOpsSkills = [
  { name: "Linux", level: 85 },
  { name: "Windows", level: 80 },
  { name: "Networking", level: 75 },
  { name: "Wireshark", level: 80 },
  { name: "Nmap", level: 85 },
  { name: "Burp Suite", level: 70 },
  { name: "Metasploit", level: 65 },
  { name: "Digital Forensics", level: 80 },
  { name: "Cybercrime Investigation", level: 85 },
  { name: "OSINT", level: 90 },
  { name: "OWASP Top 10", level: 75 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative w-full z-10 bg-bg-deep overflow-hidden">
      {/* Decorative Circuit/Hexagon Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%2300FFC6' stroke-width='1' stroke-dasharray='5,5'/%3E%3Cpath d='M50 10v80M10 50h80' stroke='%237CFFB2' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px',
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 50%, transparent 100%)'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title="Capabilities" subtitle="Technical Proficiency Arsenal" />

        <div className="flex flex-col items-center mt-12">
          {/* Badge Grid */}
          <div className="w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {secOpsSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-neon-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative p-6 bg-bg-card/80 border border-neon-primary/30 rounded-none backdrop-blur-md group-hover:border-neon-primary group-hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <span className="font-mono font-bold text-text-primary mb-4 truncate">{skill.name}</span>
                    <div className="w-full h-1.5 bg-bg-deep mt-auto relative overflow-hidden border border-neon-primary/20">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-primary to-neon-soft group-hover:shadow-[0_0_15px_rgba(0,255,198,1)] transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-right text-[10px] font-mono text-neon-soft mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      {skill.level}% // LVL
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
