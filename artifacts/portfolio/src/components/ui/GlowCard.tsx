import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export default function GlowCard({ children, className, delay = 0, onClick }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "relative rounded-none overflow-hidden bg-bg-card/30 backdrop-blur-xl border border-neon-primary/20",
        "hover:border-neon-primary/80 hover:shadow-[0_0_30px_rgba(0,255,198,0.15)] transition-all duration-300",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-primary/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
