import { useState, useEffect, Fragment } from 'react';
import Layout from '../components/Layout';
import { PageSection } from '../components/PageSection';
import { PageHeader } from '../components/PageHeader';
import { CheckCircle2, BarChart3, Target, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../components/LocalizedLink';
import { supabase } from '../lib/supabase';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';

const DEFAULT = {
  header: { tag: 'Dijital Pazarlama & Performans', title: 'Veri odaklı kampanyalar ile', titleSubline: 'dijital kanallarda büyüme sağlıyoruz', intro: 'ASP Agency, markalar için performans pazarlama, içerik stratejisi ve marka iletişimini tek merkezden yönetir. SEO, medya satın alma ve içerik üretimini aynı çatı altında topluyoruz.' },
  section: { title: 'SEO, medya ve içerik stratejisi aynı planda', desc: 'İstanbul merkezli ekibimiz; Türkiye ve global pazarlarda markaların organik ve performans kanallarını dengeli şekilde büyütmesini hedefler. Teknik SEO ve kreatif içerik birlikte çalışır.', bullets: ['Anahtar kelime analizi, içerik planlama ve teknik SEO', 'Meta, Google ve programatik reklam kampanyaları', 'Şehir, ülke ve hedef kitle bazlı kampanya segmentasyonu'] },
  features: [{ label: 'Performans raporları' }, { label: 'Hedef kitle kurgusu' }, { label: 'Çoklu ülke stratejisi' }],
  asideCard: { title: 'Hangi sektörlerle çalışıyoruz?', desc: 'Teknoloji, e-ticaret, SaaS, finans ve hızlı tüketim başta olmak üzere farklı dikeylerde deneyim sahibiyiz.', tags: ['Teknoloji', 'E-ticaret', 'SaaS', 'Finans', 'FMCG', 'Start-up markaları'] },
  ctaCard: { title: 'Dijital pazarlama denetimi isteyin', desc: 'Mevcut kampanyalarınızı ve web sitenizi inceleyip kısa bir analiz raporu hazırlayabilir, gelişim alanlarınızı beraber belirleyebiliriz.', buttonText: 'Ücretsiz ön analiz talep et' },
};

export default function DijitalPazarlamaPage() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'dijital-pazarlama').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
      setLoading(false);
    });
  }, []);

  const c = { ...DEFAULT, ...pickLangContent(raw, lang) } as typeof DEFAULT;

  if (loading) return <Layout><div className="pt-32 text-center text-white/50">Yükleniyor...</div></Layout>;

  const { header, section, features, asideCard, ctaCard } = c;
  const ICONS = [BarChart3, Target, Globe2];

  return (
    <Layout>
      <PageSection className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <PageHeader tag={header.tag} title={<>{header.title}{header.titleSubline && <span className="block text-white/40">{header.titleSubline}</span>}</>} intro={header.intro} />

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.4fr)] gap-8 md:gap-10">
            <section aria-labelledby="dijital-hizmetler" className="space-y-6 md:space-y-7">
              <div>
                <h2 id="dijital-hizmetler" className="text-xl md:text-2xl font-display font-semibold mb-3 md:mb-4">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base text-white/65 mb-4">{section.desc}</p>
                <ul className="space-y-3">
                  {(section.bullets ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-[15px] text-white/75">
                      <CheckCircle2 size={18} className="mt-[2px] text-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {features?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {features.map((f, i) => (
                    <Fragment key={i}><MarketingFeature icon={ICONS[i] ?? BarChart3} label={f.label} /></Fragment>
                  ))}
                </div>
              )}
            </section>

            <aside className="space-y-5 md:space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-5 md:p-6">
                <h2 className="text-sm font-semibold text-white mb-3">{asideCard.title}</h2>
                <p className="text-xs md:text-sm text-white/65 mb-3">{asideCard.desc}</p>
                <ul className="flex flex-wrap gap-2 text-[11px] text-white/80">
                  {(asideCard.tags ?? []).map((sector) => (
                    <li key={sector} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{sector}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 via-black to-black p-5 md:p-6">
                <h2 className="text-sm font-semibold text-white mb-2">{ctaCard.title}</h2>
                <p className="text-xs md:text-sm text-white/70 mb-4">{ctaCard.desc}</p>
                <LocalizedLink to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-2.5 text-xs md:text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-all">
                  {ctaCard.buttonText}
                </LocalizedLink>
              </div>
            </aside>
          </div>
        </div>
      </PageSection>
    </Layout>
  );
}

function MarketingFeature({ icon: Icon, label }: { icon: typeof BarChart3; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-5 md:py-5 flex items-center gap-3">
      <Icon size={18} className="text-purple-300" />
      <span className="text-xs md:text-sm text-white/80">{label}</span>
    </div>
  );
}
