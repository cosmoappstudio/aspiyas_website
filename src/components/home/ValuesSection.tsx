import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Section from '../Section';
import { getIcon } from '../../lib/iconMap';
import { supabase } from '../../lib/supabase';
import { useLanguage, pickLangContent } from '../../hooks/useLanguage';

interface ValueItem {
  icon: string;
  title: string;
  desc: string;
}

const DEFAULT_VALUES: ValueItem[] = [
  { icon: 'Zap', title: 'Hız', desc: 'En hızlı çözümlerle rakiplerinizin önüne geçin.' },
  { icon: 'Users', title: 'Güçlü Ortaklıklar', desc: 'Sektör liderleriyle stratejik işbirlikleri.' },
  { icon: 'TrendingUp', title: 'Ölçeklenebilirlik', desc: 'Büyüyen işinizle birlikte genişleyen altyapı.' },
  { icon: 'DollarSign', title: 'Karlılık', desc: 'Yatırım getirisini maksimize eden stratejiler.' },
  { icon: 'Heart', title: 'Sosyal Fayda', desc: 'Topluma değer katan projeler.' },
  { icon: 'Leaf', title: 'Sürdürülebilirlik', desc: 'Gelecek nesiller için çevre dostu teknolojiler.' },
];

export function ValuesSection() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'values').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
    });
  }, []);

  const [headerRaw, setHeaderRaw] = useState<unknown>(null);
  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'values_section_header').single().then(({ data }) => {
      if (data?.content) setHeaderRaw(data.content);
    });
  }, []);
  const header = pickLangContent<{ tag: string; title: string; titleSubline: string; intro: string }>(headerRaw, lang) ?? { tag: 'Değerlerimiz', title: 'Teknoloji Odaklı Yaratıcı', titleSubline: 'Sürdürülebilir Büyüme', intro: 'Aspiyas olarak kararlarımızı; hız, ölçeklenebilirlik ve toplumsal etki ekseninde şekillendiriyoruz.' };

  const values = (() => {
    const picked = pickLangContent(raw, lang);
    if (Array.isArray(picked) && picked.length > 0) return picked as ValueItem[];
    return DEFAULT_VALUES;
  })();
  return (
    <Section className="bg-[#050505] relative overflow-hidden" id="values">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

      <div className="text-center mb-16 md:mb-24 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
        >
          {header.tag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 leading-tight"
        >
          {header.title}
          <br />
          <span className="text-white/40">{header.titleSubline}</span>
        </motion.h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-white/40">
          {header.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto relative z-10">
        {values.map((item, index) => {
          const IconComponent = getIcon(item.icon);
          return (
          <motion.article
            key={item.title + index}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 25 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative p-6 md:p-7 rounded-3xl bg-[#080808]/80 border border-white/[0.08] hover:border-purple-500/25 transition-all duration-300 flex flex-col items-center text-center gap-3 overflow-hidden backdrop-blur-sm"
          >
            {/* Card gradient accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-px -right-px w-20 h-20 rounded-bl-3xl border-t border-r border-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="absolute top-4 right-4 text-[10px] font-mono font-bold text-white/20 group-hover:text-purple-400/50 transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-500/25 via-purple-600/15 to-transparent border border-white/10 flex items-center justify-center text-purple-300 shrink-0 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)] transition-shadow">
              <IconComponent size={24} />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold">{item.title}</h3>
            <p className="text-white/60 text-sm md:text-[15px] leading-relaxed">{item.desc}</p>
          </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

