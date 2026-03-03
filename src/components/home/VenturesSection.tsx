import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../LocalizedLink';
import Section from '../Section';
import { supabase } from '../../lib/supabase';
import { useLanguage, pickLangContent } from '../../hooks/useLanguage';

interface VentureItem {
  name: string;
  tag: string;
  description: string;
  accent: string;
  href: string;
  ctaText?: string;
}

interface VenturesContent {
  header: { tag: string; title: string; titleSubline: string; intro: string };
  ventures: VentureItem[];
}

const DEFAULT: VenturesContent = {
  header: {
    tag: 'Aspiyas Ekosistemi',
    title: 'Tek Holding, Birden Fazla',
    titleSubline: 'Dijital Girişim',
    intro: 'Her bir oluşum, aynı vizyonun farklı bir yansıması. Tutarlı bir marka mimarisi altında, farklı iş modelleri üretiyoruz.',
  },
  ventures: [
    { name: 'Shoovo', tag: 'Social Commerce', description: 'Markalar, içerik üreticileri ve tüketicileri tek platformda buluşturan yeni nesil sosyal alışveriş deneyimi.', accent: 'from-[#FF4D00] to-[#FF0000]', href: '/shoovo', ctaText: 'Detaylı incele' },
    { name: 'ASP Agency', tag: 'Creative & Strategy', description: 'Markalar için uçtan uca kreatif strateji, kampanya kurgusu ve performans odaklı pazarlama çözümleri.', accent: 'from-[#5B21FF] to-[#22D3EE]', href: '/asp-agency', ctaText: 'Detaylı incele' },
    { name: 'ASP Production', tag: 'Media Production', description: '4K prodüksiyon, motion design ve post prodüksiyon süreçlerini tek çatı altında toplayan prodüksiyon stüdyosu.', accent: 'from-[#F97316] to-[#FACC15]', href: '/asp-production', ctaText: 'Detaylı incele' },
    { name: 'ASP App Studio', tag: 'Product Studio', description: 'Yapay zeka destekli mobil ve web ürünleri geliştiren, deney odaklı dijital ürün stüdyosu.', accent: 'from-[#22C55E] to-[#0EA5E9]', href: '/asp-app-studio', ctaText: 'Detaylı incele' },
  ],
};

export function VenturesSection() {
  const lang = useLanguage();
  const [content, setContent] = useState<VenturesContent | null>(null);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'ventures').single().then(({ data }) => {
      if (data?.content) setContent(pickLangContent<VenturesContent>(data.content, lang));
    });
  }, [lang]);

  const c = content ?? DEFAULT;
  const ventures = c.ventures ?? [];

  return (
    <Section className="bg-[#050505] border-y border-white/5" id="ventures">
      <motion.div
        className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-purple-400 mb-3">
            {c.header.tag}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-3 md:mb-0">
            {c.header.title}
            <span className="block text-white/40">{c.header.titleSubline}</span>
          </h2>
        </div>
        <p className="text-sm md:text-base text-white/40 max-w-md md:text-right">
          {c.header.intro}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-7 items-stretch">
        {ventures.map((venture, index) => (
          <motion.div
            key={venture.name}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 180, damping: 22 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="flex"
          >
          <LocalizedLink
            to={venture.href}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#050505] hover:border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 flex flex-col w-full min-h-[280px]"
          >
            <div
              className={`absolute inset-0 opacity-60 md:opacity-80 bg-gradient-to-br ${venture.accent} mix-blend-normal`}
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-35 mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/65 group-hover:bg-black/55 transition-colors" />

            <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col flex-1 gap-4 md:gap-5">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm">
                  {venture.tag}
                </span>
                <h3 className="mt-4 text-2xl md:text-3xl font-display font-bold tracking-tight text-white">
                  {venture.name}
                </h3>
              </div>

              <p className="text-sm md:text-[15px] text-white/80 leading-relaxed flex-1">
                {venture.description}
              </p>

              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-white/80 mt-auto shrink-0">
                <span className="group-hover:translate-x-0.5 transition-transform">
                  {venture.ctaText ?? 'Detaylı incele'}
                </span>
                <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 shrink-0" />
              </div>
            </div>
          </LocalizedLink>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

