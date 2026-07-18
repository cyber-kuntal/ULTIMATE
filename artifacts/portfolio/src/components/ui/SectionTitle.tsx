import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-16", className)}>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-black text-neon-primary tracking-wider uppercase inline-block relative drop-shadow-[0_0_10px_rgba(0,255,198,0.3)]">
          {title}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            className="absolute -bottom-3 left-0 h-[2px] bg-gradient-to-r from-neon-primary to-transparent shadow-[0_0_15px_rgba(0,255,198,1)]" 
          />
        </h2>
        {subtitle && (
          <p className="mt-6 text-neon-soft font-mono text-sm uppercase tracking-widest opacity-90 flex items-center gap-2">
            <span className="text-neon-primary font-bold">&gt;&gt;</span> {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
