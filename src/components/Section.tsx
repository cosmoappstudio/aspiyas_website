import { motion } from 'motion/react';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-24 md:py-32 relative ${className}`}>
      <div className="container mx-auto px-6 relative z-10">
        {children}
      </div>
    </section>
  );
}
