import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Dekoratif arka plan: gradient blob + grid */
  decorative?: boolean;
}

export function PageSection({ children, className = '', id, decorative = true }: PageSectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-24 md:py-32 relative ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {decorative && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[720px] h-[600px] md:h-[720px] bg-purple-600/5 rounded-full blur-[120px] -z-[1]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/4 rounded-full blur-[100px] -z-[1]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)] -z-[1]" />
        </div>
      )}
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {children}
      </div>
    </motion.section>
  );
}
