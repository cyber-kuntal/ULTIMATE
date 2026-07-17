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
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wider uppercase inline-block relative">
          {title}
          <div className="absolute -bottom-3 left-0 w-full h-[2px] bg-cyber-green shadow-[0_0_10px_rgba(0,255,135,0.8)]" />
        </h2>
        {subtitle && (
          <p className="mt-6 text-cyber-cyan font-mono text-sm uppercase tracking-widest opacity-80">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}