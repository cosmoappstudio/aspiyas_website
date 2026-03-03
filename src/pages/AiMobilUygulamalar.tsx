import { useState, useEffect, Fragment } from 'react';
import Layout from '../components/Layout';
import { PageSection } from '../components/PageSection';
import { PageHeader } from '../components/PageHeader';
import { CheckCircle2, Smartphone, BrainCircuit, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../components/LocalizedLink';
import { VisualPanel } from '../components/VisualPanel';
import { supabase } from '../lib/supabase';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';

const DEFAULT = {
  header: { tag: 'AI Destekli Mobil Uygulamalar', title: 'Mobilde yapay zeka ile', titleSubline: 'üretkenlik ve gelir odaklı deneyimler', intro: "ASP App Studio ekibi; App Store ve Google Play için AI destekli üretkenlik, içerik ve iş yönetimi uygulamaları geliştirir. Türkiye'de başlayıp global pazarda büyüyen ürünler hedefliyoruz." },
  section: { title: 'Türkiye çıkışlı global uygulamalar', desc: 'Ürünlerimizi; kullanıcı araştırmaları, pazar validasyonu ve gelir modeli analizleri ile birlikte kurguluyoruz. Freemium, subscription veya usage-based modellerle çalışabiliyoruz.', bullets: ['App Store ve Google Play için native deneyim odaklı tasarım', 'AI / LLM entegrasyonlarıyla kişiselleştirilmiş kullanıcı akışları', 'Analitik ve A/B testleri ile sürekli optimizasyon'] },
  features: [{ label: 'iOS & Android' }, { label: 'LLM & ML entegrasyonu' }, { label: 'Gelir modeli kurgusu' }],
  visualPanel: { title: 'Mobil ürün önizlemesi', subtitle: 'ASP App Studio tarafından geliştirilen AI destekli mobil deneyimlerden bir ekran görüntüsü.', imageUrl: 'https://images.unsplash.com/photo-1551817958-20204d6ab8f6?q=80&w=1200&auto=format&fit=crop', alt: 'Yapay zeka destekli mobil uygulama arayüzü' },
  asideCard: { title: 'Hangi pazarlara odaklanıyoruz?', desc: 'Ürünlerimizi; Türkiye, Avrupa ve Kuzey Amerika ağırlıklı pazarlar için lokal ihtiyaçlara göre konumlandırıyoruz.', tags: ['Türkiye', 'Avrupa', 'Kuzey Amerika', 'Orta Doğu', 'İngilizce konuşulan pazarlar'] },
  ctaCard: { title: 'Beraber ürün geliştirmek ister misiniz?', desc: 'Şirket içi ihtiyaçlarınız için white-label bir uygulama geliştirebilir veya birlikte yeni bir ürün şirketi kurabiliriz.', buttonText: 'Ürün fikrini paylaş' },
};

export default function AiMobilUygulamalarPage() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'ai-mobil-uygulamalar').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
      setLoading(false);
    });
  }, []);

  const c = { ...DEFAULT, ...pickLangContent(raw, lang) } as typeof DEFAULT;

  if (loading) return <Layout><div className="pt-32 text-center text-white/50">Yükleniyor...</div></Layout>;

  const { header, section, features, visualPanel, asideCard, ctaCard } = c;
  const ICONS = [Smartphone, BrainCircuit, LineChart];

  return (
    <Layout>
      <PageSection className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <PageHeader tag={header.tag} title={<>{header.title}{header.titleSubline && <span className="block text-white/40">{header.titleSubline}</span>}</>} intro={header.intro} />

          <div className="space-y-8 md:space-y-10">
            <section aria-labelledby="ai-mobil" className="space-y-4 md:space-y-5">
              <h2 id="ai-mobil" className="text-xl md:text-2xl font-display font-semibold mb-1 md:mb-2">
                {section.title}
              </h2>
              <p className="text-sm md:text-base text-white/65">{section.desc}</p>
              <ul className="space-y-3 mt-3">
                {(section.bullets ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-[15px] text-white/75">
                    <CheckCircle2 size={18} className="mt-[2px] text-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {features?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map((f, i) => (
                  <Fragment key={i}><AiFeature icon={ICONS[i] ?? Smartphone} label={f.label} /></Fragment>
                ))}
              </div>
            )}

            {visualPanel?.imageUrl && (
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] gap-8 md:gap-10">
                <VisualPanel title={visualPanel.title} subtitle={visualPanel.subtitle} imageUrl={visualPanel.imageUrl} alt={visualPanel.alt} />
                <aside className="space-y-5 md:space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-5 md:p-6">
                    <h2 className="text-sm font-semibold text-white mb-3">{asideCard.title}</h2>
                    <p className="text-xs md:text-sm text-white/65 mb-3">{asideCard.desc}</p>
                    <ul className="flex flex-wrap gap-2 text-[11px] text-white/80">
                      {(asideCard.tags ?? []).map((region) => (
                        <li key={region} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{region}</li>
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
            )}
          </div>
        </div>
      </PageSection>
    </Layout>
  );
}

function AiFeature({ icon: Icon, label }: { icon: typeof Smartphone; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-5 md:py-5 flex items-center gap-3">
      <Icon size={18} className="text-purple-300" />
      <span className="text-xs md:text-sm text-white/80">{label}</span>
    </div>
  );
}
