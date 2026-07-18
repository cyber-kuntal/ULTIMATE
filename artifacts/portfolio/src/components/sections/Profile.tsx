import React from 'react';
import { MapPin, GraduationCap, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';
import profilePhoto from '@assets/0_WhatsApp_Image_2026-07-17_at_08.44.07_1784263814949.jpeg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

const infoItems = [
  {
    icon: MapPin,
    label: 'Base of Operations',
    primary: 'Hooghly, West Bengal, India',
  },
  {
    icon: GraduationCap,
    label: 'Current Directive',
    primary: 'B.Sc Cybersecurity',
    secondary: 'MAKAUT',
  },
  {
    icon: Calendar,
    label: 'Expected Completion',
    primary: 'Class of 2028',
  },
];

export default function Profile() {
  return (
    <section id="profile" className="py-24 relative w-full z-10 bg-bg-deep">
      <div className="container mx-auto px-6">
        <SectionTitle title="Identity.dat" subtitle="Operator Profile & Classification" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Photo column ── */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 flex justify-center">
            <div className="relative group w-64 h-64 md:w-72 md:h-72">

              {/* Offset shadow layer */}
              <div
                className="absolute -inset-4 bg-bg-mid border border-neon-soft/20 z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
              />

              {/* Image */}
              <div
                className="absolute inset-0 overflow-hidden bg-bg-card z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
              >
                <div className="absolute inset-0 bg-neon-primary/15 mix-blend-overlay z-20 group-hover:opacity-0 transition-opacity duration-500" />
                <img
                  src={profilePhoto}
                  alt="Kuntal Kumar"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:filter-none transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </div>

              {/* Animated cyber frame border */}
              <div
                className="absolute inset-0 border-2 border-neon-primary z-20 pointer-events-none shadow-[0_0_20px_rgba(0,255,198,0.4)]"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
              />

              {/* Clearance badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-bg-card border border-neon-primary z-30 flex items-center gap-2 whitespace-nowrap shadow-[0_0_16px_rgba(0,255,198,0.4)] backdrop-blur-sm rotate-[-2deg]">
                <ShieldCheck className="w-3.5 h-3.5 text-neon-primary" />
                <span className="text-neon-primary font-mono text-xs font-bold uppercase tracking-widest">
                  Clearance: Alpha
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Bio column ── */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-8">
            <GlowCard className="p-8 md:p-10 border-l-4 border-l-neon-primary bg-bg-card/40 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-7 h-7 text-neon-primary shrink-0" />
                <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary uppercase tracking-wider">
                  Kuntal Kumar
                </h3>
              </div>

              <div className="space-y-4 mb-10">
                <p className="text-base text-text-primary/90 leading-relaxed font-sans font-light">
                  I am a B.Sc. Cybersecurity & Digital Forensics student passionate about securing digital
                  systems and investigating cyber threats.
                </p>
                <p className="text-base text-text-primary/90 leading-relaxed font-sans font-light">
                  My mission is to operate at the intersection of defense and education — fortifying the
                  digital frontier while empowering the next generation of technologists.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {infoItems.map(({ icon: Icon, label, primary, secondary }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 shrink-0 bg-bg-deep border border-neon-primary/40 flex items-center justify-center shadow-[0_0_8px_rgba(0,255,198,0.15)]">
                      <Icon className="w-4 h-4 text-neon-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neon-soft uppercase tracking-widest mb-0.5">
                        {label}
                      </div>
                      <div className="text-sm text-text-primary font-mono font-medium">{primary}</div>
                      {secondary && (
                        <div className="text-xs text-text-muted font-mono">{secondary}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
