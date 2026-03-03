import { motion } from 'motion/react';

interface VisualPanelProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  alt: string;
}

export function VisualPanel({ title, subtitle, imageUrl, alt }: VisualPanelProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 22 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-70" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-5 md:p-6 border-b border-white/10">
          <h2 className="text-sm md:text-base font-display font-semibold text-white mb-1">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-[11px] md:text-xs text-white/70 leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
        <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}

