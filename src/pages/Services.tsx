import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../components/LocalizedLink';
import { supabase } from '../lib/supabase';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';

interface ServiceItem { slug: string; label: string; description: string; tags: string[] }
interface ProductItem { slug: string; label: string; description: string; tags: string[] }

const DEFAULT = {
  header: { tag: 'Hizmetlerimiz', title: "Aspiyas'ın hizmet portföyü", intro: 'Yazılım, medya, mobil ve pazarlama hizmetlerimizi; aynı marka stratejisi ve teknoloji yaklaşımı ile konumlandırıyoruz.' },
  services: [
    { slug: '/saas-yazilim', label: 'SaaS Yazılım Projeleri', description: 'B2B odaklı, ölçeklenebilir SaaS platformları ile iş süreçlerini dijitalleştiriyoruz.', tags: ['B2B', 'Multi-tenant', 'RBAC'] },
    { slug: '/medya-produksiyon', label: 'Medya ve Prodüksiyon', description: 'İstanbul merkezli prodüksiyon ekibimizle sosyal medya ve reklam filmleri üretiyoruz.', tags: ['4K Prodüksiyon', 'Motion', 'Ses Tasarımı'] },
    { slug: '/ai-mobil-uygulamalar', label: 'AI Destekli Mobil Uygulamalar', description: 'App Store ve Google Play için yapay zeka destekli üretkenlik ve içerik uygulamaları.', tags: ['iOS & Android', 'LLM', 'Subscription'] },
    { slug: '/dijital-pazarlama', label: 'Dijital Pazarlama', description: 'SEO, performans pazarlama ve içerik stratejisini aynı çatı altında yönetiyoruz.', tags: ['SEO', 'Paid Media', 'Analytics'] },
  ] as ServiceItem[],
  productsTag: 'Ürünlerimiz',
  products: [
    { slug: '/shoovo', label: 'Shoovo', description: 'Markalar, içerik üreticileri ve tüketicileri tek ekosistemde buluşturan sosyal alışveriş platformu.', tags: ['Social Commerce', 'Marketplace', 'Türkiye Çıkışlı'] },
  ] as ProductItem[],
};

export default function ServicesPage() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'services_page').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
      setLoading(false);
    });
  }, []);

  const content = { ...DEFAULT, ...pickLangContent(raw, lang) } as typeof DEFAULT;

  if (loading) return <Layout><div className="pt-32 text-center text-white/50">Yükleniyor...</div></Layout>;

  const { header, services, productsTag, products } = content;

  return (
    <Layout>
      <Section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 md:mb-14 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-[0.24em] uppercase text-purple-300">
              {header.tag}
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              {header.title}
            </h1>
            <p className="mt-5 md:mt-6 text-sm md:text-lg text-white/60 max-w-3xl mx-auto">
              {header.intro}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {services.map((service) => (
              <LocalizedLink
                key={service.slug}
                to={service.slug}
                className="group relative rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-8 overflow-hidden hover:border-purple-500/40 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start gap-4 mb-4 md:mb-5">
                    <h2 className="text-xl md:text-2xl font-display font-semibold group-hover:text-purple-300 transition-colors">
                      {service.label}
                    </h2>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 text-white/80 bg-black/20 group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-white/65 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-white/80">
                    {service.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                      >
                        <CheckCircle2 size={12} className="text-purple-300" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </LocalizedLink>
            ))}
          </div>

          {products.length > 0 && (
            <section className="mt-12 md:mt-16 space-y-5 md:space-y-6">
              <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                <Sparkles size={14} className="text-purple-300" />
                <span className="uppercase tracking-[0.18em]">{productsTag}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                {products.map((product) => (
                  <LocalizedLink
                    key={product.slug}
                    to={product.slug}
                    className="group relative rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-8 overflow-hidden hover:border-purple-500/40 transition-colors"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/15 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start gap-4 mb-4 md:mb-5">
                        <h2 className="text-xl md:text-2xl font-display font-semibold group-hover:text-purple-300 transition-colors">
                          {product.label}
                        </h2>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 text-white/80 bg-black/20 group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-white/65 mb-4">{product.description}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-white/80">
                        {product.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                          >
                            <CheckCircle2 size={12} className="text-purple-300" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </LocalizedLink>
                ))}
              </div>
            </section>
          )}
        </div>
      </Section>
    </Layout>
  );
}
