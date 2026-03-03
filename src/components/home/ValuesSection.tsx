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
    <Section className="bg-[#050505]" id="values">
      <div className="text-center mb-16 md:mb-24">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
        >
          {header.tag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
        {values.map((item, index) => {
          const IconComponent = getIcon(item.icon);
          return (
          <motion.article
            key={item.title + index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 md:p-7 rounded-3xl bg-[#050505] border border-white/8 hover:border-white/20 transition-colors flex flex-col gap-3"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-white/5 flex items-center justify-center text-purple-300">
              <IconComponent size={22} />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold mb-2 md:mb-3">{item.title}</h3>
            <p className="text-white/60 text-sm md:text-[15px] leading-relaxed">{item.desc}</p>
          </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

