import { motion } from 'motion/react';
import Section from '../Section';

interface FounderItem {
  name: string;
  role: string;
  image: string;
}

const FOUNDERS: FounderItem[] = [
  {
    name: 'Fetih Önal',
    role: 'Kurucu Ortak - CEO',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Göktürk Ülker',
    role: 'Kurucu Ortak - CMO',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Feyza Nur Acar',
    role: 'Kurucu Ortak - CDO',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
  },
];

export function FoundersSection() {
  return (
    <Section className="bg-[#050505]" id="founders">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">
          Liderlik Ekibi
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-base text-white/40">
          Aspiyas ekosisteminin arkasında, teknolojiyi iş hedefleriyle dengeleyen multidisipliner bir
          kurucu ekip bulunuyor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8 max-w-5xl mx-auto">
        {FOUNDERS.map((founder, index) => (
          <motion.article
            key={founder.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08 }}
            className="text-center group"
          >
            <div className="relative mb-6 md:mb-8 overflow-hidden rounded-3xl aspect-[3/4] mx-auto w-full max-w-xs bg-zinc-900">
              <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
              <img
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-1 md:mb-2">
              {founder.name}
            </h3>
            <p className="text-purple-400 text-xs md:text-sm font-medium tracking-wide uppercase">
              {founder.role}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

