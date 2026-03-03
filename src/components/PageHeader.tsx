import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageHeaderProps {
  tag?: string;
  title: ReactNode;
  intro?: string;
  className?: string;
}

export function PageHeader({ tag, title, intro, className = '' }: PageHeaderProps) {
  return (
    <motion.header
      className={`mb-10 md:mb-14 ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 22 }}
    >
      {tag && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-[0.24em] uppercase text-purple-300"
        >
          {tag}
        </motion.span>
      )}
      <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 md:mt-6 text-sm md:text-lg text-white/60 max-w-3xl">
          {intro}
        </p>
      )}
    </motion.header>
  );
}
