import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import { PageSection } from '../components/PageSection';
import { PageHeader } from '../components/PageHeader';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
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
      <PageSection className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <PageHeader tag={header.tag} title={header.title} intro={header.intro} className="text-center [&_p]:mx-auto" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 180, damping: 25 }}
              >
              <LocalizedLink
                key={service.slug}
                to={service.slug}
                className="group block relative rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-8 overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              </motion.div>
            ))}
          </div>

          {products.length > 0 && (
            <motion.section
              className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            >
              <div className="mb-8 md:mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-[0.24em] uppercase text-purple-300">
                  <Sparkles size={12} />
                  {productsTag}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                {products.map((product, index) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: index * 0.08, type: 'spring', stiffness: 180, damping: 25 }}
                  >
                  <LocalizedLink
                    key={product.slug}
                    to={product.slug}
                    className="group block relative rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-8 overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF4D00]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </PageSection>
    </Layout>
  );
}
