import React, { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'programming' | 'cybersecurity' | 'tools'>('programming');

  const skillsData = {
    programming: [
      { name: "Python", level: 90 },
      { name: "Java", level: 75 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "React", level: 85 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "Tailwind", level: 85 },
    ],
    cybersecurity: [
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
    ],
    tools: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
    ]
  };

  const tabs = [
    { id: 'programming', label: 'DEV_STACK' },
    { id: 'cybersecurity', label: 'SEC_OPS' },
    { id: 'tools', label: 'UTILITIES' },
  ] as const;

  return (
    <section id="skills" className="py-24 relative w-full z-10 bg-bg-primary overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title="Capabilities" subtitle="Technical Proficiency Arsenal" />

        <div className="flex flex-col items-center">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 font-mono text-sm tracking-wider uppercase transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-cyber-green' 
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 border border-cyber-green bg-cyber-green/10 rounded-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">[{tab.label}]</span>
              </button>
            ))}
          </div>

          {/* Hexagon/Badge Grid */}
          <div className="w-full max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-4 md:gap-6"
              >
                {skillsData[activeTab].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, type: "spring" }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-cyber-cyan/20 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative px-6 py-4 bg-bg-card border border-border/30 rounded-lg backdrop-blur-sm group-hover:border-cyber-cyan transition-colors duration-300 flex flex-col items-center min-w-[140px]">
                      <span className="font-sans font-medium text-white mb-2 text-center">{skill.name}</span>
                      
                      {/* Power Level Bar */}
                      <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-auto">
                        <div 
                          className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-green group-hover:shadow-[0_0_10px_rgba(0,255,135,0.8)] transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}