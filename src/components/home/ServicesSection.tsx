import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../LocalizedLink';
import Section from '../Section';
import { supabase } from '../../lib/supabase';
import { useLanguage, pickLangContent } from '../../hooks/useLanguage';

interface ServiceItem {
  tag: string;
  title: string;
  desc: string;
  features: string[];
  path: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  { tag: 'SaaS', title: 'SaaS Yazılım Projeleri', desc: 'B2B odaklı, faydalı micro-macro SaaS yazılım projeleri üretiyoruz.', features: ['Bulut Tabanlı', 'Yüksek Güvenlik', 'API Entegrasyonu'], path: '/saas-yazilim' },
  { tag: 'Medya & Prodüksiyon', title: 'Medya ve Prodüksiyon', desc: 'Dinamik içerik optimizasyonu, tasarım ve prodüksiyon odaklı projeler.', features: ['4K Video', 'Motion Graphics', 'Ses Tasarımı'], path: '/medya-produksiyon' },
  { tag: 'Mobil Uygulama', title: 'AI Destekli Mobil Apps', desc: 'Farklı gelir modelleri içeren yapay zeka destekli üretkenlik uygulamaları.', features: ['iOS & Android', 'Machine Learning', 'User Experience'], path: '/ai-mobil-uygulamalar' },
  { tag: 'Reklam & Pazarlama', title: 'Dijital Pazarlama', desc: 'Veri bilimi odaklı performans pazarlama ve programatik reklam.', features: ['SEO/SEM', 'Veri Analizi', 'Dönüşüm Odaklı'], path: '/dijital-pazarlama' },
];

export function ServicesSection() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'services').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
    });
  }, []);

  const services = (() => {
    const picked = pickLangContent(raw, lang);
    if (Array.isArray(picked) && picked.length > 0) return picked as ServiceItem[];
    return DEFAULT_SERVICES;
  })();
  return (
    <Section className="relative overflow-hidden" id="services">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] md:w-[800px] h-[720px] md:h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        className="text-center mb-16 md:mb-24 relative z-10"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: 'spring', stiffness: 150, damping: 22 }}
      >
        <span className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 md:mb-4 block">
          Neler Yapıyoruz?
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6">
          Yenilikçi Teknolojiler
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-white/40">
          Ürünlerimizi; yazılım, medya, mobil ve pazarlama dikeylerinde birbirini besleyen bir ekosistem olarak
          konumlandırıyoruz.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto relative z-10 items-stretch">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 150, damping: 22 }}
            className="flex"
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="h-full">
            <LocalizedLink
              to={service.path}
              className="group block relative overflow-hidden rounded-[1.8rem] md:rounded-[2rem] bg-[#0A0A0A]/90 border border-white/5 p-7 md:p-10 hover:border-purple-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 w-full min-h-[280px] md:min-h-[300px] flex flex-col backdrop-blur-sm h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6 md:mb-8 gap-4">
                  <span className="inline-block px-3 py-1.5 md:px-4 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-600/5 border border-purple-500/20 text-[11px] md:text-xs font-medium text-purple-300/90">
                    {service.tag}
                  </span>
                  <ArrowUpRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/55 leading-relaxed mb-6 md:mb-8 text-sm md:text-base flex-1">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2.5 md:gap-3 mt-auto">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-sm text-white/45"
                    >
                      <CheckCircle2 size={14} className="text-purple-500/60" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </LocalizedLink>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

