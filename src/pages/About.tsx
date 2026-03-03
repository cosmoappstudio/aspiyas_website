import { useState, useEffect, Fragment } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { VisualPanel } from '../components/VisualPanel';
import { Seo } from '../components/Seo';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../components/LocalizedLink';
import { supabase } from '../lib/supabase';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';
import {
  Building2,
  Globe2,
  Users,
  Layers3,
  Rocket,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const ACCENTS = ['from-[#FF4D00]/25 to-transparent', 'from-purple-500/25 to-transparent', 'from-blue-500/25 to-transparent', 'from-emerald-500/25 to-transparent'];

interface AboutContent {
  header: { tag: string; title: string; intro: string };
  stats: { label: string; value: string }[];
  vision: { title: string; desc: string; pillars: { title: string; desc: string }[] };
  visualPanel: { title: string; subtitle: string; imageUrl: string; alt: string };
  markets: { tag: string; title: string; desc: string; tags: string[] };
  ecosystem: { tag: string; title: string; subtitle: string; ventures: { href: string; name: string; desc: string }[] };
  faq: { title: string; label: string; items: { q: string; a: string }[] };
  cta: { tag: string; title: string; desc: string; buttonText: string };
}

const DEFAULT: AboutContent = {
  header: { tag: 'Hakkımızda', title: 'Aspiyas Teknoloji ve Ticaret A.Ş.', intro: '' },
  stats: [{ label: 'Merkez', value: 'İstanbul' }, { label: 'Hedef pazarlar', value: 'TR, EMEA, Avrupa' }, { label: 'Oluşum sayısı', value: '4+' }],
  vision: { title: '', desc: '', pillars: [{ title: '', desc: '' }, { title: '', desc: '' }, { title: '', desc: '' }] },
  visualPanel: { title: '', subtitle: '', imageUrl: '', alt: '' },
  markets: { tag: '', title: '', desc: '', tags: [] },
  ecosystem: { tag: '', title: '', subtitle: '', ventures: [] },
  faq: { title: '', label: '', items: [] },
  cta: { tag: '', title: '', desc: '', buttonText: '' },
};

export default function AboutPage() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'about').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
      setLoading(false);
    });
  }, []);

  const c = { ...DEFAULT, ...pickLangContent(raw, lang) } as AboutContent;

  if (loading) return <Layout><div className="pt-32 text-center text-white/50">Yükleniyor...</div></Layout>;

  const { header, stats, vision, visualPanel, markets, ecosystem, faq, cta } = c;

  return (
    <Layout>
      <Seo
        title={`Hakkımızda | ${header.title}`}
        description={header.intro || 'Aspiyas, İstanbul merkezli bir teknoloji holdingidir.'}
        canonicalPath="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Organization', name: header.title, url: `${typeof window !== 'undefined' ? window.location.origin : ''}/`, address: { '@type': 'PostalAddress', addressLocality: 'İstanbul', addressCountry: 'TR' }, areaServed: ['TR', 'EMEA', 'Europe'], sameAs: [] },
            { '@type': 'AboutPage', name: 'Hakkımızda', url: `${typeof window !== 'undefined' ? window.location.origin : ''}/about`, inLanguage: 'tr-TR', about: { '@type': 'Organization', name: header.title } },
          ],
        }}
      />

      <Section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <motion.header
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-[0.24em] uppercase text-purple-300">
              {header.tag}
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              {header.title}
            </h1>
            <p className="mt-5 md:mt-6 text-sm md:text-lg text-white/60 max-w-3xl">
              {header.intro}
            </p>
          </motion.header>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 md:mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 25 }}
          >
            <AboutStat icon={Building2} label={stats[0]?.label} value={stats[0]?.value} />
            <AboutStat icon={Globe2} label={stats[1]?.label} value={stats[1]?.value} />
            <AboutStat icon={Users} label={stats[2]?.label} value={stats[2]?.value} />
          </motion.div>

          <motion.div
            className="space-y-8 md:space-y-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <section aria-labelledby="about-vision" className="space-y-4 md:space-y-5">
              <h2 id="about-vision" className="text-2xl md:text-3xl font-display font-semibold">
                {vision.title}
              </h2>
              <p className="text-sm md:text-base text-white/65 max-w-3xl">
                {vision.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(vision.pillars ?? []).map((p, i) => (
                  <Fragment key={i}><Pillar icon={[Layers3, ShieldCheck, Rocket][i]} title={p.title} desc={p.desc} /></Fragment>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] gap-8 md:gap-10">
              <VisualPanel
                title={visualPanel.title}
                subtitle={visualPanel.subtitle}
                imageUrl={visualPanel.imageUrl}
                alt={visualPanel.alt}
              />

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
                <p className="text-xs font-semibold tracking-[0.24em] uppercase text-purple-300 mb-3">
                  {markets.tag}
                </p>
                <h3 className="text-lg md:text-xl font-display font-semibold mb-2">
                  {markets.title}
                </h3>
                <p className="text-sm text-white/65 mb-4">
                  {markets.desc}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-white/80">
                  {(markets.tags ?? []).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <section aria-labelledby="about-ventures" className="space-y-4 md:space-y-5">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.24em] uppercase text-purple-300 mb-2">
                    {ecosystem.tag}
                  </p>
                  <h2 id="about-ventures" className="text-2xl md:text-3xl font-display font-semibold">
                    {ecosystem.title}
                  </h2>
                </div>
                <p className="text-sm text-white/60 max-w-md">
                  {ecosystem.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(ecosystem.ventures ?? []).map((item, i) => (
                  <LocalizedLink
                    key={item.href}
                    to={item.href}
                    className="group relative rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-7 overflow-hidden hover:border-white/20 transition-colors"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${ACCENTS[i % 4]} opacity-70`} />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-display font-semibold">{item.name}</h3>
                          <p className="text-sm text-white/65 mt-2">{item.desc}</p>
                        </div>
                        <div className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 bg-black/20 text-white/80 group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </LocalizedLink>
                ))}
              </div>
            </section>

            <section aria-labelledby="about-faq" className="space-y-4 md:space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 id="about-faq" className="text-2xl md:text-3xl font-display font-semibold">
                  {faq.title}
                </h2>
                <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
                  <Sparkles size={14} className="text-purple-300" />
                  {faq.label}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {(faq.items ?? []).map((item, i) => (
                  <Fragment key={i}><FaqItem q={item.q} a={item.a} /></Fragment>
                ))}
              </div>
            </section>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/20 via-black to-black p-7 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] uppercase text-purple-200 mb-2">
                  {cta.tag}
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-semibold">
                  {cta.title}
                </h2>
                <p className="text-sm md:text-base text-white/70 mt-3 max-w-2xl">
                  {cta.desc}
                </p>
              </div>
              <LocalizedLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-all whitespace-nowrap"
              >
                {cta.buttonText || 'İletişime geç'}
                <ArrowUpRight size={16} />
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </Section>
    </Layout>
  );
}

interface AboutStatProps {
  icon: typeof Building2;
  label: string;
  value: string;
}

function AboutStat({ icon: Icon, label, value }: AboutStatProps) {
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

interface PillarProps {
  icon: typeof Layers3;
  title: string;
  desc: string;
}

function Pillar({ icon: Icon, title, desc }: PillarProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-300">
        <Icon size={18} />
      </div>
      <h3 className="mt-4 text-base md:text-lg font-display font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/65 leading-relaxed">{desc}</p>
    </div>
  );
}

interface FaqItemProps {
  q: string;
  a: string;
}

function FaqItem({ q, a }: FaqItemProps) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 open:bg-white/[0.06] transition-colors">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
        <span className="text-sm md:text-base font-semibold text-white">{q}</span>
        <span className="text-white/50 group-open:rotate-45 transition-transform">+</span>
      </summary>
      <div className="mt-3 text-sm text-white/65 leading-relaxed">{a}</div>
    </details>
  );
}

