import Layout from '../components/Layout';
import Section from '../components/Section';
import { ArrowRight, PenTool, Megaphone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgencyPage() {
  return (
    <Layout>
      <Section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-[0.24em] uppercase text-purple-300">
              ASP Agency
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Kreatif ajans ve
              <span className="block text-white/40">performans odaklı pazarlama ekibi</span>
            </h1>
            <p className="mt-5 md:mt-6 text-sm md:text-lg text-white/60 max-w-3xl">
              ASP Agency, markanızın iletişim stratejisini; kreatif fikir, içerik üretimi ve performans
              pazarlama birleşiminde kurgular. İstanbul merkezli ama Türkiye ve global markalarla
              çalışıyoruz.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.4fr)] gap-8 md:gap-10">
            <section aria-labelledby="agency-hizmetler" className="space-y-6 md:space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <AgencyPill icon={PenTool} label="Kreatif konsept" />
                <AgencyPill icon={Megaphone} label="Kampanya kurgusu" />
                <AgencyPill icon={FileText} label="İçerik stratejisi" />
              </div>

              <div>
                <h2
                  id="agency-hizmetler"
                  className="text-xl md:text-2xl font-display font-semibold mb-3 md:mb-4"
                >
                  Marka ve ürünler için bütünsel yaklaşım
                </h2>
                <p className="text-sm md:text-base text-white/65 mb-4">
                  Yıl boyu süren iletişim planları, lansman kampanyaları ve dijital aktivasyonlarda
                  kreatif ve medya ekipleri aynı çatı altında çalışır. Böylece performans ve marka
                  algısı ayrışmadan yönetilir.
                </p>
              </div>
            </section>

            <aside className="space-y-5 md:space-y-6">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 via-black to-black p-5 md:p-6">
                <h2 className="text-sm font-semibold text-white mb-2">
                  Marka sunumunuzu beraber gözden geçirelim
                </h2>
                <p className="text-xs md:text-sm text-white/70 mb-4">
                  Mevcut iletişim materyallerinizi (web sitesi, sunumlar, sosyal medya) inceleyip,
                  markanız için kısa bir yön haritası çıkarabiliriz.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-2.5 text-xs md:text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-all"
                >
                  Ajans brieﬁ gönder
                  <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

interface AgencyPillProps {
  icon: typeof PenTool;
  label: string;
}

function AgencyPill({ icon: Icon, label }: AgencyPillProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-5 md:py-5 flex items-center gap-3">
      <Icon size={18} className="text-purple-300" />
      <span className="text-xs md:text-sm text-white/80">{label}</span>
    </div>
  );
}

