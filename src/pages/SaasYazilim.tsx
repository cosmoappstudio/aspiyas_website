import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { CheckCircle2, Server, Shield, Cable } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../components/LocalizedLink';
import { VisualPanel } from '../components/VisualPanel';
import { supabase } from '../lib/supabase';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';

const DEFAULT = {
  header: { tag: 'B2B SaaS Yazılım Projeleri', title: 'Ölçeklenebilir SaaS çözümleri ile', titleSubline: 'iş süreçlerinizi dijitalleştiriyoruz', intro: 'Aspiyas, Türkiye ve Avrupa pazarına yönelik mikro ve makro ölçekte SaaS ürünleri geliştirir. Mimariden kullanıcı deneyimine kadar tüm süreci tek çatı altında yönetiyoruz.' },
  section: { title: 'İş hedeflerine göre tasarlanan SaaS projeleri', desc: 'İstanbul merkezli ürün ekibimiz; finans, medya, perakende ve üretim gibi farklı dikeylerde SaaS projeleri geliştiriyor. Her ürün için uzun vadeli bakım, loglama ve gözlemlenebilirlik standarttır.', bullets: ['Multi-tenant mimari ile Türkiye ve global müşterileri aynı platformda yönetebilme', 'Role-based access control (RBAC) ile güvenli kullanıcı yönetimi', 'CI/CD ve otomatik test süreçleriyle sürdürülebilir bakım'] },
  stats: [{ label: 'Uptime hedefi', value: '99.5%' }, { label: 'Veri lokasyonu', value: 'EU / TR' }, { label: '3rd party entegrasyon', value: 'API-first' }],
  visualPanel: { title: 'Uygulama mimarisi görünümü', subtitle: 'SaaS platformlarımız için kullandığımız modern, bulut tabanlı mimari yaklaşımından bir kesit.', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop', alt: 'Bulut tabanlı SaaS mimarisi gösteren diyagram' },
  asideCard: { title: 'Hangi ülkeler ve bölgeler için?', desc: 'Öncelikli hedef pazarlarımız; Türkiye, Almanya, Hollanda, Birleşik Krallık ve Körfez ülkeleri. Projeleri, KVKK ve GDPR uyumlu olacak şekilde tasarlıyoruz.', tags: ['Türkiye', 'Almanya', 'Hollanda', 'Birleşik Krallık', 'BAE', 'Suudi Arabistan'] },
  ctaCard: { title: 'Projenizi konuşalım', desc: 'Mevcut SaaS ürününüzü ölçeklemek veya sıfırdan yeni bir platform kurmak istiyorsanız, teknik olmayan ekiplerin de anlayabileceği bir roadmap çıkarıyoruz.', buttonText: 'Proje brief gönder' },
};

export default function SaasYazilimPage() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'saas-yazilim').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
      setLoading(false);
    });
  }, []);

  const c = { ...DEFAULT, ...pickLangContent(raw, lang) } as typeof DEFAULT;

  if (loading) return <Layout><div className="pt-32 text-center text-white/50">Yükleniyor...</div></Layout>;

  const { header, section, stats, visualPanel, asideCard, ctaCard } = c;

  return (
    <Layout>
      <Section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-[0.24em] uppercase text-purple-300">
              {header.tag}
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              {header.title}
              {header.titleSubline && <span className="block text-white/40">{header.titleSubline}</span>}
            </h1>
            <p className="mt-5 md:mt-6 text-sm md:text-lg text-white/60 max-w-3xl">
              {header.intro}
            </p>
          </header>

          <div className="space-y-8 md:space-y-10">
            <section aria-labelledby="saas-ne-sunuyor" className="space-y-4 md:space-y-5">
              <h2 id="saas-ne-sunuyor" className="text-xl md:text-2xl font-display font-semibold mb-1 md:mb-2">
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

            {stats?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SaasStat icon={Server} label={stats[0]?.label} value={stats[0]?.value} />
                <SaasStat icon={Shield} label={stats[1]?.label} value={stats[1]?.value} />
                <SaasStat icon={Cable} label={stats[2]?.label} value={stats[2]?.value} />
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
      </Section>
    </Layout>
  );
}

function SaasStat({ icon: Icon, label, value }: { icon: typeof Server; label?: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-5 md:py-5 flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-xs text-white/60">
        <Icon size={14} className="text-purple-300" />
        <span>{label}</span>
      </div>
      <div className="text-lg md:text-xl font-display font-semibold text-white">{value}</div>
    </div>
  );
}
