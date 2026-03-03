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

      <div className="text-center mb-16 md:mb-24 relative z-10">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto relative z-10">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08 }}
          >
            <LocalizedLink
              to={service.path}
              className="group block relative overflow-hidden rounded-[1.8rem] md:rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-7 md:p-10 hover:border-purple-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 md:mb-8 gap-4">
                  <span className="inline-block px-3 py-1.5 md:px-4 rounded-full bg-white/5 border border-white/5 text-[11px] md:text-xs font-medium text-white/80">
                    {service.tag}
                  </span>
                  <ArrowUpRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/55 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2.5 md:gap-3">
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
        ))}
      </div>
    </Section>
  );
}

